export type NumberInputProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  hint?: string
  className?: string
}
