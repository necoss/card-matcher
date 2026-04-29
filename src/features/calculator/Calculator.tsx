import { useState } from "react"

import { ProductList } from "@features/products"
import { ToggleSwitch } from "@shared/ui"
import type { CalculationResult } from "@shared/utils"
import { AnimatePresence, motion } from "motion/react"

import { AdvancedCalculatorForm } from "./AdvancedCalculatorForm/AdvancedCalculatorForm.tsx"
import { CalculatorResults } from "./CalculatorResult/CalculatorResults.tsx"
import { SimpleCalculatorForm } from "./SimpleCalculatorForm/SimpleCalculatorForm.tsx"
import type { Mode } from "./Calculator.model"

export const Calculator = () => {
  const [mode, setMode] = useState<Mode>("simple")
  const [result, setResult] = useState<CalculationResult | null>(null)

  const handleResult = (r: CalculationResult) => {
    setResult(r)
    setTimeout(() => {
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 100)
  }

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode)
    setResult(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">Калькулятор ёмкости</h1>
        <p className="text-[var(--color-text-secondary)] text-sm">Рассчитайте необходимый объём карты памяти для вашей системы видеонаблюдения</p>
      </div>

      <div className="mb-8 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">Режим калькулятора</p>
            <p className="text-xs text-[var(--color-text-muted)]">Выберите подходящий уровень детализации</p>
          </div>
          <ToggleSwitch
            options={[
              { value: "simple", label: "✦ Простой" },
              { value: "advanced", label: "⚙ Продвинутый" },
            ]}
            value={mode}
            onChange={handleModeChange}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-8">
        <AnimatePresence mode="wait">
          {mode === "simple" ? (
            <motion.div key="simple" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
              <SimpleCalculatorForm onResult={handleResult} />
            </motion.div>
          ) : (
            <motion.div key="advanced" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
              <AdvancedCalculatorForm onResult={handleResult} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {result && (
            <div id="results-section">
              <CalculatorResults result={result} />
            </div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <ProductList calculatedGb={result.recommendedGb} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
