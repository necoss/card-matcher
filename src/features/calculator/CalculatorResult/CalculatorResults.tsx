import { AnimatePresence,motion } from 'motion/react'

import type { CalculatorResultsProps } from './CalculatorResults.model.ts'

export const CalculatorResults = ({ result }: CalculatorResultsProps) => (
  <AnimatePresence>
    <motion.div
      key={result.details}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8"
    >
      <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
        Необходимый объём хранилища
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
            Минимальный объём
          </p>
          <div className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
            {result.minimumLabel}
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{result.details}</p>
        </div>

        <div className="p-5 rounded-2xl bg-[var(--color-primary)] text-white">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-2">
            Рекомендуемый объём
          </p>
          <div className="text-3xl font-bold text-white mb-1">
            {result.recommendedLabel}
          </div>
          <p className="text-xs text-white/50">{result.details}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Рекомендуемый объём включает запас +15% для файловой системы и пиков битрейта
      </p>
    </motion.div>
  </AnimatePresence>
)
