import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import { cn } from '../../../utils/cn'

import type { ToggleSwitchProps } from './ToggleSwitch.model'

export const ToggleSwitch = <T extends string>({
  options,
  value,
  onChange,
  className,
}: ToggleSwitchProps<T>) => (
  <ToggleGroup
    value={[value] as readonly string[]}
    onValueChange={(values: readonly string[]) => {
      const next = values.find((v) => v !== value) ?? values[0]
      if (next) onChange(next as T)
    }}
    className={cn(
      'inline-flex p-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]',
      className,
    )}
  >
    {options.map((option) => (
      <Toggle
        key={option.value}
        value={option.value}
        aria-label={option.label}
        className={cn(
          'px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer',
          value === option.value
            ? 'bg-[var(--color-primary)] text-white shadow-sm'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        )}
      >
        {option.label}
      </Toggle>
    ))}
  </ToggleGroup>
)
