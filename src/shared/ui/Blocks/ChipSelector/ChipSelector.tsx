import { Toggle } from '@base-ui/react/toggle'
import { ToggleGroup } from '@base-ui/react/toggle-group'

import { cn } from '../../../utils/cn'

import type { ChipSelectorProps } from './ChipSelector.model'

export const ChipSelector = <T extends string | number>({
  options,
  value,
  onChange,
  className,
}: ChipSelectorProps<T>) => (
  <ToggleGroup
    value={[String(value)] as readonly string[]}
    onValueChange={(values: readonly string[]) => {
      const strVal = values.find((v) => v !== String(value)) ?? values[0]
      if (strVal == null) return
      const matched = options.find((o) => String(o.value) === strVal)
      if (matched) onChange(matched.value)
    }}
    className={cn('flex flex-wrap gap-2', className)}
  >
    {options.map((option) => (
      <Toggle
        key={String(option.value)}
        value={String(option.value)}
        aria-label={option.label}
        className={cn('chip-selector', value === option.value && 'active')}
      >
        {option.label}
      </Toggle>
    ))}
  </ToggleGroup>
)
