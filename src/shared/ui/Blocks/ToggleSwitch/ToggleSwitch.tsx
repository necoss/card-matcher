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
      'flex w-full max-w-full p-1 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)]',
      options.length > 2 ? 'flex-wrap sm:flex-nowrap' : 'flex-nowrap',
      className,
    )}
  >
    {options.map((option) => (
      <Toggle
        key={option.value}
        value={option.value}
        aria-label={option.label}
        className={cn(
          'flex-1 min-w-0 px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium text-center transition-all duration-150 cursor-pointer',
          value === option.value
            ? 'bg-[var(--color-accent)] text-[var(--color-on-primary)] shadow-sm'
            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
        )}
      >
        {option.label}
      </Toggle>
    ))}
  </ToggleGroup>
)
