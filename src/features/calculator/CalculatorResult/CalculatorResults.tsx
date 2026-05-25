import { AnimatePresence, motion } from 'motion/react'

import type { CalculatorResultsProps } from './CalculatorResults.model'

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col justify-center min-h-[10rem] sm:min-h-[11rem] p-6 sm:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] min-w-0">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wide mb-3">
            Минимальный объём
          </p>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2 break-words">
            {result.minimumLabel}
          </div>
          <p className="text-xs text-[var(--color-text-muted)] break-words">{result.details}</p>
        </div>

        <div className="flex flex-col justify-center min-h-[10rem] sm:min-h-[11rem] p-6 sm:p-8 rounded-2xl bg-[var(--color-primary)] text-[var(--color-on-primary)] min-w-0">
          <p className="text-xs font-medium text-[var(--color-on-primary)]/60 uppercase tracking-wide mb-3">
            Рекомендуемый объём
          </p>
          <div className="text-2xl sm:text-3xl font-bold text-[var(--color-on-primary)] mb-2 break-words">
            {result.recommendedLabel}
          </div>
          <p className="text-xs text-[var(--color-on-primary)]/50 break-words">{result.details}</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-[var(--color-text-muted)]">
        Рекомендуемый объём включает запас +15% для файловой системы и пиков битрейта
      </p>
    </motion.div>
  </AnimatePresence>
)
