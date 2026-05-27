/**
 * CCTV Storage Calculation Utilities
 *
 * Industry-standard formula (sourced from Reolink, Zositech, HIKVISION docs):
 *   Storage (GB) = Bitrate_Mbps × 0.45 × HoursPerDay × Cameras × Days / 1000
 *
 * Derivation:
 *   Bitrate_Mbps × 1_000_000 bps / 8 = bytes/sec
 *   × 3600 = bytes/hour
 *   × hoursPerDay × cameras × days = total bytes
 *   / 1_000_000_000 = GB
 *   simplified: Bitrate_Mbps × 450 × hours × cams × days / 1_000_000
 *
 * Recommended = Minimum × 1.15 (15% overhead buffer for OS, metadata, VBR spikes)
 */

export type SimpleCalculatorInput = {
  cameras: number
  resolution: Resolution
  recordingMode: RecordingMode
  storageDays: number
}

export type AdvancedCalculatorInput = {
  cameras: number
  resolution: ResolutionFps
  bitrateMbps: number
  codec: Codec
  videoQuality: QualityLevel
  sceneActivity: SceneActivity
  hoursPerDay: number
  storageDays: number
}

export type Resolution = '480p' | '720p' | '1080p' | '2K' | '4K'
export type ResolutionFps = '480p_15' | '480p_30' | '720p_15' | '720p_30' | '1080p_15' | '1080p_30' | '2K_15' | '2K_30' | '4K_15' | '4K_30'
export type Codec = 'MJPEG' | 'H.264' | 'H.265' | 'H.265+' | 'AV1'
export type QualityLevel = 'high' | 'medium' | 'low'
export type SceneActivity = 'high' | 'medium' | 'low'
export type RecordingMode = 'continuous' | 'motion'

export type CalculationResult = {
  minimumGb: number
  recommendedGb: number
  minimumLabel: string
  recommendedLabel: string
  minimumCardSizeGb: CardSizeGb
  recommendedCardSizeGb: CardSizeGb
  minimumCardLabel: string
  recommendedCardLabel: string
  details: string
}

/**
 * Default H.264 bitrates (Mbps) per resolution
 * Based on industry-standard camera specs (HIKVISION, Dahua, Reolink)
 */
export const DEFAULT_BITRATES: Record<Resolution, { high: number; medium: number; low: number }> = {
  '480p':  { high: 1.0,  medium: 0.7,  low: 0.4 },
  '720p':  { high: 2.0,  medium: 1.5,  low: 0.8 },
  '1080p': { high: 4.0,  medium: 3.0,  low: 1.5 },
  '2K':    { high: 8.0,  medium: 6.0,  low: 3.0 },
  '4K':    { high: 16.0, medium: 12.0, low: 6.0 },
}

/**
 * Codec compression multipliers relative to H.264
 * H.265 compresses ~50% better, H.265+ ~60%, AV1 ~65%
 * MJPEG is far less efficient (~6× worse than H.264)
 */
export const CODEC_MULTIPLIERS: Record<Codec, number> = {
  'MJPEG':  6.0,
  'H.264':  1.0,
  'H.265':  0.5,
  'H.265+': 0.4,
  'AV1':    0.35,
}

/**
 * Quality level multipliers applied to bitrate
 */
export const QUALITY_MULTIPLIERS: Record<QualityLevel, number> = {
  high:   1.0,
  medium: 0.75,
  low:    0.5,
}

/**
 * Scene activity multipliers (affects VBR effective bitrate)
 * High activity = constant motion, Low = mostly static scene
 */
export const ACTIVITY_MULTIPLIERS: Record<SceneActivity, number> = {
  high:   1.0,
  medium: 0.7,
  low:    0.4,
}

/**
 * Recording mode effective multipliers (fraction of 24h with actual recording)
 */
export const RECORDING_MODE_HOURS: Record<RecordingMode, number> = {
  continuous: 24,
  motion: 6, // ~25% of 24h — typical for motion-triggered CCTV
}

/**
 * Standard SD/microSD card sizes in GB
 */
export const STANDARD_CARD_SIZES = [8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192] as const
export type CardSizeGb = (typeof STANDARD_CARD_SIZES)[number]

/**
 * Core storage calculation formula
 * @param bitrateMbps - Camera bitrate in Megabits per second
 * @param cameras - Number of cameras
 * @param hoursPerDay - Active recording hours per day
 * @param days - Number of days to store footage
 * @returns Storage in GB
 */
export const calculateStorageGb = (
  bitrateMbps: number,
  cameras: number,
  hoursPerDay: number,
  days: number,
): number =>
  (bitrateMbps * 125_000 * 3600 * hoursPerDay * cameras * days) / 1_000_000_000

/**
 * Round up to next standard card size
 */
export const roundUpToCardSize = (gb: number): CardSizeGb =>
  (STANDARD_CARD_SIZES.find((size) => size >= gb) ?? 8192) as CardSizeGb

const TB_THRESHOLD_GB = 1000
const GB_PER_TB = 1000

/**
 * Format storage volume for display (GB or TB with 2 decimal places)
 */
export const formatStorageVolume = (gb: number): string => {
  if (gb > TB_THRESHOLD_GB) {
    return `${(gb / GB_PER_TB).toFixed(2)} ТБ`
  }
  return `${Math.ceil(gb)} ГБ`
}

export const formatGb = (gb: number): string => formatStorageVolume(gb)

/**
 * Get label for a card size (rounds up to next standard)
 */
export const getRecommendedCardLabel = (gb: number): string =>
  formatStorageVolume(roundUpToCardSize(gb))

const camerasWord = (n: number): string => {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'камер'
  if (mod10 === 1) return 'камера'
  if (mod10 >= 2 && mod10 <= 4) return 'камеры'
  return 'камер'
}

/**
 * Simple mode calculation
 * Uses default H.264 bitrates, derives everything from resolution + recording mode
 */
export const calculateSimple = (input: SimpleCalculatorInput): CalculationResult => {
  const { cameras, resolution, recordingMode, storageDays } = input
  const bitrateMbps = DEFAULT_BITRATES[resolution].medium
  const hoursPerDay = RECORDING_MODE_HOURS[recordingMode]

  const rawMinimumGb = calculateStorageGb(bitrateMbps, cameras, hoursPerDay, storageDays)
  const rawRecommendedGb = rawMinimumGb * 1.15

  const minimumGb = Math.ceil(rawMinimumGb)
  const recommendedGb = Math.ceil(rawRecommendedGb)

  const recordingModeLabel = recordingMode === 'continuous' ? 'постоянная запись' : 'запись по движению'

  const minimumCardSizeGb = roundUpToCardSize(minimumGb)
  const recommendedCardSizeGb = roundUpToCardSize(recommendedGb)

  return {
    minimumGb,
    recommendedGb,
    minimumLabel: formatStorageVolume(minimumGb),
    recommendedLabel: formatStorageVolume(recommendedGb),
    minimumCardSizeGb,
    recommendedCardSizeGb,
    minimumCardLabel: getRecommendedCardLabel(minimumGb),
    recommendedCardLabel: getRecommendedCardLabel(recommendedGb),
    details: `${cameras} ${camerasWord(cameras)} · ${resolution} · ${hoursPerDay}ч/сут · ${storageDays} дн · ${recordingModeLabel}`,
  }
}

/**
 * Advanced mode calculation
 * Uses explicit bitrate input with codec and quality adjustments
 */
export const calculateAdvanced = (input: AdvancedCalculatorInput): CalculationResult => {
  const { cameras, bitrateMbps, codec, videoQuality, sceneActivity, hoursPerDay, storageDays, resolution } = input

  const codecMultiplier = CODEC_MULTIPLIERS[codec]
  const qualityMultiplier = QUALITY_MULTIPLIERS[videoQuality]
  const activityMultiplier = ACTIVITY_MULTIPLIERS[sceneActivity]

  const effectiveBitrate = bitrateMbps * codecMultiplier * qualityMultiplier * activityMultiplier

  const rawMinimumGb = calculateStorageGb(effectiveBitrate, cameras, hoursPerDay, storageDays)
  const rawRecommendedGb = rawMinimumGb * 1.15

  const minimumGb = Math.ceil(rawMinimumGb)
  const recommendedGb = Math.ceil(rawRecommendedGb)

  const [resLabel] = resolution.split('_')

  const minimumCardSizeGb = roundUpToCardSize(minimumGb)
  const recommendedCardSizeGb = roundUpToCardSize(recommendedGb)

  return {
    minimumGb,
    recommendedGb,
    minimumLabel: formatStorageVolume(minimumGb),
    recommendedLabel: formatStorageVolume(recommendedGb),
    minimumCardSizeGb,
    recommendedCardSizeGb,
    minimumCardLabel: getRecommendedCardLabel(minimumGb),
    recommendedCardLabel: getRecommendedCardLabel(recommendedGb),
    details: `${cameras} ${camerasWord(cameras)} · ${resLabel} · ${codec} · ${bitrateMbps} Мбит/с · ${hoursPerDay}ч/сут · ${storageDays} дн`,
  }
}
