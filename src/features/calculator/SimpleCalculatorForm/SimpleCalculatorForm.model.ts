import type { CalculationResult } from '@shared/utils/storageCalculation'

export type SimpleCalculatorFormProps = {
  onResult: (result: CalculationResult) => void
}
