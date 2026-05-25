import { Link } from 'react-router-dom'

import { FAQItem } from '@features/faq'
import { FAQ_PREVIEW_ITEMS } from '@shared/constants/homeData'
import { ROUTES } from '@shared/constants/routes'
import { Container } from '@shared/ui'
import { motion } from 'motion/react'

export const FAQPreviewSection = () => (
  <section className="py-20 md:py-28 bg-[var(--color-surface)]">
    <Container>
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FAQ
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Частые вопросы
          </motion.h2>
          <motion.p
            className="text-[var(--color-text-secondary)] mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ответы на главные вопросы о расчётах, точности и выборе карт памяти. Полный список — на странице FAQ.
          </motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
              <span className="text-2xl">🔒</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">Без регистрации</p>
                <p className="text-xs text-[var(--color-text-muted)]">Данные не сохраняются на сервере</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)]">
              <span className="text-2xl">📐</span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">Industry-standard формулы</p>
                <p className="text-xs text-[var(--color-text-muted)]">На основе документации HIKVISION, Dahua</p>
              </div>
            </div>
          </motion.div>

          <Link
            to={ROUTES.FAQ}
            className="inline-flex items-center gap-2 mt-8 text-sm font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
          >
            Все вопросы и ответы
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <motion.div
          className="bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] px-4 sm:px-6 divide-y divide-[var(--color-border)] shadow-[var(--shadow-card)]"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {FAQ_PREVIEW_ITEMS.map((item) => (
            <FAQItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </motion.div>
      </div>
    </Container>
  </section>
)
