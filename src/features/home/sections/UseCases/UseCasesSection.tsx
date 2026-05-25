import { USE_CASES } from '@shared/constants/homeData'
import { Container } from '@shared/ui'
import { motion } from 'motion/react'

export const UseCasesSection = () => (
  <section className="py-20 md:py-28 bg-[var(--color-bg)]">
    <Container>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
        <div className="max-w-xl">
          <motion.span
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Сценарии использования
          </motion.span>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Для любого проекта видеонаблюдения
          </motion.h2>
          <motion.p
            className="text-[var(--color-text-secondary)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            От домашней камеры до промышленной системы — калькулятор адаптируется под вашу задачу
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-start sm:gap-3 px-4 sm:px-5 py-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] w-full sm:w-auto lg:shrink-0"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-3xl font-bold text-[var(--color-accent)]">5</div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Кодеков видео</p>
              <p className="text-xs text-[var(--color-text-muted)]">от MJPEG до AV1</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-10 bg-[var(--color-border)] shrink-0" />
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-3xl font-bold text-[var(--color-accent)]">5</div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">Разрешений</p>
              <p className="text-xs text-[var(--color-text-muted)]">от 480p до 4K</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {USE_CASES.map((useCase, idx) => (
          <motion.div
            key={useCase.id}
            className="group relative rounded-2xl p-6 bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/40 hover:shadow-[var(--shadow-elevated)] transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                {useCase.icon}
              </div>
              <span className="shrink-0 max-w-[45%] truncate text-xs font-medium px-2.5 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                {useCase.tag}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              {useCase.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {useCase.description}
            </p>
          </motion.div>
        ))}
      </div>
    </Container>
  </section>
)
