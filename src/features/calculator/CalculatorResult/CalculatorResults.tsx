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

      <div className="mt-4 flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl gradient-accent flex items-center justify-center shrink-0 shadow-md">
          <svg
            className="w-5 h-5 text-[var(--color-on-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            Купите карту памяти на {result.recommendedCardLabel}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {result.minimumCardSizeGb !== result.recommendedCardSizeGb
              ? `По минимальному расчёту — ${result.minimumCardLabel}, по рекомендуемому — ${result.recommendedCardLabel}`
              : 'Округление до ближайшего стандартного объёма карты (в большую сторону)'}
          </p>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
)
