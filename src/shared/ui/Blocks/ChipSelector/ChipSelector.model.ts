export type ChipOption<T extends string | number> = {
  value: T
  label: string
}

export type ChipSelectorProps<T extends string | number> = {
  options: ChipOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}
