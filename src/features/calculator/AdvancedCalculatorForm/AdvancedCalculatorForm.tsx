import { useEffect, useState } from "react"

import { ACTIVITY_OPTIONS, BITRATE_HINTS, CODEC_OPTIONS, QUALITY_OPTIONS, RESOLUTION_FPS_OPTIONS } from "@shared/constants/calculatorData.ts"
import { Button } from "@shared/ui/Blocks/Button"
import { ChipSelector } from "@shared/ui/Blocks/ChipSelector"
import { NumberInput } from "@shared/ui/Blocks/NumberInput"
import { Select } from "@shared/ui/Blocks/Select"
import { ToggleSwitch } from "@shared/ui/Blocks/ToggleSwitch"
import { Label } from "@shared/ui/Typography"
import type { Codec, QualityLevel, ResolutionFps, SceneActivity } from "@shared/utils/storageCalculation.ts"
import { calculateAdvanced } from "@shared/utils/storageCalculation.ts"

import type { AdvancedCalculatorFormProps } from "./AdvancedCalculatorForm.model.ts"

export const AdvancedCalculatorForm = ({ onResult }: AdvancedCalculatorFormProps) => {
  const [cameras, setCameras] = useState(1)
  const [resolution, setResolution] = useState<ResolutionFps>("1080p_30")
  const [codec, setCodec] = useState<Codec>("H.264")
  const [videoQuality, setVideoQuality] = useState<QualityLevel>("medium")
  const [sceneActivity, setSceneActivity] = useState<SceneActivity>("medium")
  const [bitrateMbps, setBitrateMbps] = useState(4)
  const [hoursPerDay, setHoursPerDay] = useState(8)
  const [storageDays, setStorageDays] = useState(30)

  const resolutionLabel = RESOLUTION_FPS_OPTIONS.find((r) => r.value === resolution)
  const bitrateHint = resolutionLabel ? (BITRATE_HINTS[resolutionLabel.label.split(" ")[0]] ?? undefined) : undefined

  useEffect(() => {
    const opt = RESOLUTION_FPS_OPTIONS.find((r) => r.value === resolution)
    if (opt) setBitrateMbps(opt.bitrate)
  }, [resolution])

  const handleCalculate = () => {
    const result = calculateAdvanced({
      cameras,
      resolution,
      bitrateMbps,
      codec,
      videoQuality,
      sceneActivity,
      hoursPerDay,
      storageDays,
    })
    onResult(result)
  }

  return (
    <div className="space-y-7">
      <div>
        <Label>Формат видео (кодек)</Label>
        <ChipSelector options={CODEC_OPTIONS.map((o) => ({ value: o.value, label: o.label }))} value={codec} onChange={(v) => setCodec(v as Codec)} />
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{CODEC_OPTIONS.find((c) => c.value === codec)?.description}</p>
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Label className="mb-0">Качество видео</Label>
          <span title="Влияет на эффективный битрейт записи" className="cursor-help text-[var(--color-text-muted)] text-xs">
            ⓘ
          </span>
        </div>
        <ToggleSwitch options={QUALITY_OPTIONS} value={videoQuality} onChange={setVideoQuality} />
      </div>

      <div>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Label className="mb-0">Активность в кадре</Label>
          <span title="Насыщенность движением в кадре — влияет на VBR" className="cursor-help text-[var(--color-text-muted)] text-xs">
            ⓘ
          </span>
        </div>
        <ToggleSwitch options={ACTIVITY_OPTIONS.map((a) => ({ value: a.value, label: a.label }))} value={sceneActivity} onChange={setSceneActivity} />
        <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">{ACTIVITY_OPTIONS.find((a) => a.value === sceneActivity)?.hint}</p>
      </div>

      <div>
        <Label>Разрешение и частота кадров</Label>
        <Select
          value={resolution}
          onChange={(v) => setResolution(v as ResolutionFps)}
          options={RESOLUTION_FPS_OPTIONS.map((o) => ({
            value: o.value,
            label: `${o.label} (базов. ${o.bitrate} Мбит/с)`,
          }))}
        />
      </div>

      <div>
        <Label>Битрейт (Мбит/с)</Label>
        <NumberInput value={bitrateMbps} onChange={setBitrateMbps} min={0.1} max={200} step={0.5} hint={bitrateHint ? `Типичный диапазон: ${bitrateHint}` : undefined} />
      </div>

      <div>
        <Label>Число камер</Label>
        <NumberInput value={cameras} onChange={setCameras} min={1} max={128} step={1} />
      </div>

      <div>
        <Label>Часов работы в сутки</Label>
        <NumberInput value={hoursPerDay} onChange={setHoursPerDay} min={1} max={24} step={1} hint="24 — непрерывная запись" />
      </div>

      <div>
        <Label>Длительность хранения, дней</Label>
        <NumberInput value={storageDays} onChange={setStorageDays} min={1} max={365} step={1} />
      </div>

      <Button size="lg" className="w-full" onClick={handleCalculate}>
        Рассчитать объём
      </Button>
    </div>
  )
}
