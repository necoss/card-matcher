import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/constants/routes'
import { Container } from '@shared/ui/Layout/Container'
import { motion } from 'motion/react'

const CTA_FEATURES = ['Без регистрации', 'Мгновенный результат', 'Два режима расчёта']

export const CTASection = () => (
  <section className="py-20 md:py-28 bg-[var(--color-primary)] relative overflow-hidden">
    <div
      className="absolute inset-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 50%, var(--color-accent) 0%, transparent 50%)',
      }}
      aria-hidden
    />

    <Container>
      <motion.div
        className="relative text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-on-primary)] mb-4 text-balance">
          Готовы рассчитать нужный объём?
        </h2>
        <p className="text-[var(--color-on-primary)]/60 text-base sm:text-lg mb-6">
          Получите минимальный и рекомендуемый объём за несколько секунд — и покупайте карту без переплаты
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CTA_FEATURES.map((feature) => (
            <span
              key={feature}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--color-on-primary)]/10 text-[var(--color-on-primary)]/80 border border-[var(--color-on-primary)]/10"
            >
              <svg className="w-3 h-3 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {feature}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to={ROUTES.CALCULATOR}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-[var(--color-accent)] text-[var(--color-on-primary)] text-base font-semibold hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all duration-150 w-full sm:w-auto justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Перейти к калькулятору
          </Link>
          <Link
            to={ROUTES.FAQ}
            className="inline-flex items-center px-8 py-4 rounded-[10px] text-[var(--color-on-primary)]/80 text-base font-semibold border border-[var(--color-on-primary)]/20 hover:bg-[var(--color-on-primary)]/10 active:scale-[0.98] transition-all duration-150 w-full sm:w-auto justify-center"
          >
            Читать FAQ
          </Link>
        </div>
      </motion.div>
    </Container>
  </section>
)
