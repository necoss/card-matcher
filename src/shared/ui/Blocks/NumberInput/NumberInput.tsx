import { NumberField } from '@base-ui/react/number-field'

import type { NumberInputProps } from './NumberInput.model'

export const NumberInput = ({ value, onChange, min = 0, max = 999, step = 1, hint, className }: NumberInputProps) => (
  <div className={className}>
    <NumberField.Root
      value={value}
      onValueChange={(v) => { if (v !== null) onChange(v) }}
      min={min}
      max={max}
      step={step}
    >
      <NumberField.Group className="flex">
        <NumberField.Input
          className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors"
        />
      </NumberField.Group>
    </NumberField.Root>
    {hint && <p className="mt-1 text-xs text-[var(--color-text-muted)]">{hint}</p>}
  </div>
)

