import type { CalculationResult } from '@shared/utils/storageCalculation.ts'

export type SimpleCalculatorFormProps = {
  onResult: (result: CalculationResult) => void
}
