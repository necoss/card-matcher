import { Link } from 'react-router-dom'

import { CALCULATOR_MODES } from '@shared/constants/homeData'
import { Container } from '@shared/ui'
import { motion } from 'motion/react'

export const CalculatorModesSection = () => (
  <section className="py-20 md:py-28 bg-[var(--color-surface)]">
    <Container>
      <div className="text-center mb-14">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Режимы калькулятора
        </motion.span>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Выберите свой уровень детализации
        </motion.h2>
        <motion.p
          className="text-[var(--color-text-secondary)]"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          Оба режима бесплатны — переключайтесь в любой момент
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {CALCULATOR_MODES.map((mode, idx) => (
          <motion.article
            key={mode.id}
            className={`relative rounded-2xl p-5 sm:p-8 overflow-hidden ${mode.accent ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]' : 'bg-[var(--color-bg)] border border-[var(--color-border)]'}`}
            style={{ boxShadow: mode.accent ? 'var(--shadow-float)' : 'var(--shadow-card)' }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.12 }}
          >
            {mode.accent && (
              <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[var(--color-accent)]/20 blur-3xl pointer-events-none"
                aria-hidden
              />
            )}

            <span
              className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
                mode.accent
                  ? 'bg-[var(--color-on-primary)]/15 text-[var(--color-on-primary)]/90'
                  : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
              }`}
            >
              {mode.badge}
            </span>

            <h3 className="text-xl font-bold mb-2 relative">{mode.label}</h3>
            <p
              className={`text-sm leading-relaxed mb-6 relative ${mode.accent ? 'text-[var(--color-on-primary)]/70' : 'text-[var(--color-text-secondary)]'}`}
            >
              {mode.description}
            </p>

            <ul className="space-y-2.5 mb-8 relative">
              {mode.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <svg
                    className="w-4 h-4 flex-shrink-0 mt-0.5 text-[var(--color-accent)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className={mode.accent ? 'text-[var(--color-on-primary)]/85' : 'text-[var(--color-text-primary)]'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              to={mode.to}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-[10px] text-sm font-semibold transition-all duration-150 active:scale-[0.98] relative bg-[var(--color-accent)] text-[var(--color-on-primary)] hover:bg-[var(--color-accent-hover)]"
            >
              {mode.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.article>
        ))}
      </div>
    </Container>
  </section>
)
