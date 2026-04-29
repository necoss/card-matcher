import { Link } from 'react-router-dom'

import { ROUTES } from '@shared/constants/routes.ts'
import { Container } from '@shared/ui/Layout/Container'
import { motion } from 'motion/react'

export const CTASection = () => (
  <section className="py-20 md:py-28 bg-[var(--color-primary)]">
    <Container>
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Готовы рассчитать нужный объём?
        </h2>
        <p className="text-white/60 text-lg mb-8">
          Получите точный расчёт за несколько секунд и сразу перейдите к покупке
        </p>
        <Link
          to={ROUTES.CALCULATOR}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[10px] bg-[var(--color-accent)] text-white text-base font-semibold hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all duration-150"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Перейти к калькулятору
        </Link>
      </motion.div>
    </Container>
  </section>
)
