import type { CalculationResult } from '@shared/utils/storageCalculation.ts'

export type AdvancedCalculatorFormProps = {
  onResult: (result: CalculationResult) => void
}
