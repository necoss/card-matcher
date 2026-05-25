import { HOW_IT_WORKS_STEPS } from '@shared/constants/homeData'
import { Container } from '@shared/ui'
import { motion } from 'motion/react'

export const HowItWorksSection = () => (
  <section id="how-it-works" className="py-20 md:py-28 bg-[var(--color-bg)]">
    <Container>
      <div className="text-center mb-16">
        <motion.span
          className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Как это работает
        </motion.span>
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3 text-balance"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          От параметров до готового результата
        </motion.h2>
        <motion.p
          className="text-[var(--color-text-secondary)] max-w-xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Четыре шага — и вы точно знаете, какую карту памяти заказывать
        </motion.p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {HOW_IT_WORKS_STEPS.map((item, idx) => (
          <motion.div
            key={item.step}
            className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
          >
            <div className="relative mb-5">
              <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-2xl shadow-[var(--shadow-card)]">
                {item.icon}
              </div>
              <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[var(--color-accent)] text-[var(--color-on-primary)] text-xs font-bold flex items-center justify-center">
                {item.step}
              </span>
            </div>

            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
)
