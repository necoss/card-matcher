import { NumberField } from '@base-ui/react/number-field'

import { cn } from '../../../utils/cn'

import type { StepperProps } from './Stepper.model'

export const Stepper = ({ value, onChange, min = 1, max = 128, className }: StepperProps) => (
  <NumberField.Root
    value={value}
    onValueChange={(v) => { if (v !== null) onChange(v) }}
    min={min}
    max={max}
    step={1}
    className={cn('flex items-center gap-3', className)}
  >
    <NumberField.Group className="flex items-center gap-3">
      <NumberField.Decrement
        className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] font-bold text-lg flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
      >
        −
      </NumberField.Decrement>
      <NumberField.Input
        className="w-10 text-center text-base font-semibold text-[var(--color-text-primary)] bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <NumberField.Increment
        className="w-9 h-9 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-primary)] font-bold text-lg flex items-center justify-center hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
      >
        +
      </NumberField.Increment>
    </NumberField.Group>
  </NumberField.Root>
)
