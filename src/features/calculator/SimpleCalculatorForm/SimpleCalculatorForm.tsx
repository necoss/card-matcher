import { useState } from 'react'

import { RESOLUTIONS, STORAGE_DAYS_OPTIONS } from '@shared/constants/calculatorData'
import { Button, ChipSelector, Stepper, ToggleSwitch } from '@shared/ui'
import { Label } from '@shared/ui/Typography'
import type { RecordingMode, Resolution } from '@shared/utils/storageCalculation'
import { calculateSimple } from '@shared/utils/storageCalculation'

import type { SimpleCalculatorFormProps } from './SimpleCalculatorForm.model'

export const SimpleCalculatorForm = ({ onResult }: SimpleCalculatorFormProps) => {
  const [cameras, setCameras] = useState(1)
  const [resolution, setResolution] = useState<Resolution>('1080p')
  const [recordingMode, setRecordingMode] = useState<RecordingMode>('continuous')
  const [storageDays, setStorageDays] = useState(30)

  const handleCalculate = () => {
    const result = calculateSimple({ cameras, resolution, recordingMode, storageDays })
    onResult(result)
  }

  return (
    <div className="space-y-7">
      <div>
        <Label>Количество камер</Label>
        <Stepper value={cameras} onChange={setCameras} min={1} max={64} />
      </div>

      <div>
        <Label>Разрешение камеры</Label>
        <ChipSelector options={RESOLUTIONS} value={resolution} onChange={setResolution} />
      </div>

      <div>
        <Label>Режим записи</Label>
        <ToggleSwitch
          options={[
            { value: 'continuous', label: 'Постоянная' },
            { value: 'motion', label: 'По движению' },
          ]}
          value={recordingMode}
          onChange={setRecordingMode}
        />
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          {recordingMode === 'motion'
            ? 'Запись активна ~25% времени — существенно экономит место'
            : 'Камера записывает непрерывно 24/7'}
        </p>
      </div>

      <div>
        <Label>Длительность хранения</Label>
        <ChipSelector options={STORAGE_DAYS_OPTIONS} value={storageDays} onChange={setStorageDays} />
      </div>

      <Button size="lg" className="w-full mt-2" onClick={handleCalculate}>
        Рассчитать объём
      </Button>
    </div>
  )
}
