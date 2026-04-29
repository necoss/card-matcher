import { Select as BaseSelect } from '@base-ui/react/select'

import { cn } from '../../../utils/cn'

import type { SelectProps } from './Select.model'

const ChevronIcon = (props: React.ComponentProps<'svg'>) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M1 3.5L5 7L9 3.5" />
  </svg>
)

const CheckIcon = (props: React.ComponentProps<'svg'>) => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" {...props}>
    <path d="M9.16 1.12a.75.75 0 0 1 0 1.07L4.14 8.66a.75.75 0 0 1-1.14.04L1.19 5.95a.75.75 0 1 1 1.06-1.07l1.32 1.31L8.12 1.12a.75.75 0 0 1 1.04 0Z" />
  </svg>
)

export const Select = ({ value, onChange, options, placeholder, className }: SelectProps) => (
  <BaseSelect.Root
    value={value}
    onValueChange={(v) => { if (v) onChange(v) }}
    items={options}
  >
    <BaseSelect.Trigger
      className={cn(
        'w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition-colors cursor-pointer',
        className,
      )}
    >
      <BaseSelect.Value placeholder={placeholder} />
      <BaseSelect.Icon className="ml-2 text-[var(--color-text-muted)]">
        <ChevronIcon />
      </BaseSelect.Icon>
    </BaseSelect.Trigger>

    <BaseSelect.Portal>
      <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false}>
        <BaseSelect.Popup className="z-50 min-w-[var(--anchor-width)] rounded-lg border border-[var(--color-border)] bg-white shadow-lg py-1 overflow-auto max-h-60">
          <BaseSelect.List>
            {options.map((option) => (
              <BaseSelect.Item
                key={option.value}
                value={option.value}
                className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] cursor-pointer data-[highlighted]:bg-[var(--color-surface)] outline-none"
              >
                <BaseSelect.ItemIndicator className="w-4 flex-shrink-0 text-[var(--color-primary)]">
                  <CheckIcon />
                </BaseSelect.ItemIndicator>
                <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
              </BaseSelect.Item>
            ))}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  </BaseSelect.Root>
)
