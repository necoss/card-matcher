import { useRef, useState } from 'react'

import { ToggleSwitch } from '@shared/ui'
import type { CalculationResult } from '@shared/utils'
import { AnimatePresence, motion } from 'motion/react'

import { AdvancedCalculatorForm } from './AdvancedCalculatorForm'
import type { Mode } from './Calculator.model'
import { CalculatorResults } from './CalculatorResult'
import { SimpleCalculatorForm } from './SimpleCalculatorForm'

export const Calculator = () => {
  const [mode, setMode] = useState<Mode>('simple')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const handleResult = (r: CalculationResult) => {
    setResult(r)
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setResult(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
          Калькулятор ёмкости
        </h1>
        <p className="text-[var(--color-text-secondary)] text-sm">
          Рассчитайте необходимый объём карты памяти для вашей системы видеонаблюдения
        </p>
      </div>

      <div className="mb-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Режим калькулятора</p>
            <p className="text-xs text-[var(--color-text-muted)]">Выберите подходящий уровень детализации</p>
          </div>
          <ToggleSwitch
            className="w-full sm:max-w-xs sm:ml-auto"
            options={[
              { value: 'simple', label: '✦ Простой' },
              { value: 'advanced', label: '⚙ Продвинутый' },
            ]}
            value={mode}
            onChange={handleModeChange}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 sm:p-6 md:p-8 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {mode === 'simple' ? (
            <motion.div
              key="simple"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <SimpleCalculatorForm onResult={handleResult} />
            </motion.div>
          ) : (
            <motion.div
              key="advanced"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AdvancedCalculatorForm onResult={handleResult} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <div ref={resultsRef}>
              <CalculatorResults result={result} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
