export type ToggleSwitchProps<T extends string> = {
  options: { value: T; label: string }[]
  value: T
  onChange: (value: T) => void
  className?: string
}
