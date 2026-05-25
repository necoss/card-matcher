import { Link } from 'react-router-dom'

import { HERO_BENEFITS } from '@shared/constants/homeData'
import { ROUTES } from '@shared/constants/routes'
import { motion } from 'motion/react'

import type { CardSize } from './HeroSection.model'

const CARD_SIZES: CardSize[] = [
  { label: '64', archiveDays: '~7 дн.', status: 'Мало', filledBars: 2, speedClass: 'U1' },
  { label: '128', archiveDays: '~14 дн.', status: 'Базовый', filledBars: 3, speedClass: 'U1' },
  { label: '256', archiveDays: '~21 дн.', status: 'Норма', filledBars: 4, speedClass: 'U3' },
  { label: '512', archiveDays: '30+ дн.', status: 'Рекомендуем', filledBars: 6, speedClass: 'U3', isDefault: true },
]

const BAR_HEIGHTS = [10, 14, 18, 22, 26, 30]

const SdCardVisual = ({ highlighted, compact }: { highlighted: boolean; compact?: boolean }) => (
  <div
    className={`relative flex flex-col shrink-0 rounded-xl border-2 ${
      compact ? 'w-[4.25rem]' : 'w-[5rem]'
    } ${
      highlighted ? 'border-[var(--color-on-primary)]/30 bg-[var(--color-on-primary)]/10' : 'border-[var(--color-border)] bg-[var(--color-surface)]'
    }`}
  >
    <div className={`flex flex-1 flex-col items-center justify-center gap-1 px-1 ${compact ? 'py-3 min-h-[3.5rem]' : 'py-4 min-h-[4.5rem]'}`}>
      <span
        className={`font-black leading-none ${compact ? 'text-xl' : 'text-2xl'} ${highlighted ? 'text-[var(--color-on-primary)]' : 'text-[var(--color-text-primary)]'}`}
      >
        SD
      </span>
      <span
        className={`text-[8px] font-bold uppercase tracking-wide leading-none ${
          highlighted ? 'text-[var(--color-on-primary)]/50' : 'text-[var(--color-text-muted)]'
        }`}
      >
        XC I
      </span>
    </div>
    <div
      className={`flex items-end justify-center gap-px px-2 py-1.5 h-5 rounded-b-[8px] ${
        highlighted ? 'bg-[var(--color-on-primary)]/10' : 'bg-[var(--color-border)]/40'
      }`}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={`w-0.5 rounded-sm ${highlighted ? 'bg-[var(--color-accent-light)]' : 'bg-[var(--color-accent)]/70'}`}
          style={{ height: `${6 + (i % 3) * 2}px` }}
        />
      ))}
    </div>
  </div>
)

const CapacityCard = ({
  card,
  idx,
  compact,
}: {
  card: CardSize
  idx: number
  compact?: boolean
}) => {
  const minHeights = compact
    ? ['min-h-[11rem]', 'min-h-[12rem]', 'min-h-[13rem]', 'min-h-[14rem]']
    : ['min-h-[13rem]', 'min-h-[14.5rem]', 'min-h-[16rem]', 'min-h-[17.5rem]']
  const isHighlighted = !!card.isDefault

  return (
    <motion.div
      className={`relative flex flex-col items-center justify-between gap-2 sm:gap-3 p-3 sm:p-4 pt-4 sm:pt-5 pb-3 sm:pb-4 rounded-2xl shrink-0 snap-center ${
        compact ? 'w-[5.5rem] sm:w-[6.25rem]' : 'w-[7rem]'
      } ${minHeights[idx]} ${
        isHighlighted
          ? 'bg-[var(--color-primary)] ring-2 ring-[var(--color-accent)]/60 ring-offset-2 sm:ring-offset-4 ring-offset-[var(--color-surface)] z-10'
          : 'bg-[var(--color-bg)]/90 border-2 border-[var(--color-border)] backdrop-blur-sm'
      }`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35 + idx * 0.08 }}
      style={{ boxShadow: isHighlighted ? 'var(--shadow-float)' : 'var(--shadow-card)' }}
    >
      {isHighlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] sm:text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-on-primary)] shadow-md">
          Endurance
        </span>
      )}

      <div className="flex flex-col items-center gap-1 w-full shrink-0">
        <span
          className={`text-xs sm:text-sm font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
            isHighlighted ? 'bg-[var(--color-accent)] text-[var(--color-on-primary)]' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
          }`}
        >
          {card.label} GB
        </span>
        <span
          className={`text-[10px] sm:text-[11px] leading-none whitespace-nowrap ${isHighlighted ? 'text-[var(--color-on-primary)]/65' : 'text-[var(--color-text-muted)]'}`}
        >
          {card.archiveDays}
        </span>
      </div>

      <SdCardVisual highlighted={isHighlighted} compact={compact} />

      <div className="w-full space-y-1.5 sm:space-y-2 shrink-0">
        <div className="flex items-end justify-center gap-0.5 sm:gap-1 h-7 sm:h-8">
          {BAR_HEIGHTS.map((h, i) => (
            <div
              key={i}
              className={`w-1.5 sm:w-2 rounded-sm transition-colors ${
                i < card.filledBars
                  ? isHighlighted
                    ? 'bg-[var(--color-accent)]'
                    : 'bg-[var(--color-accent)]/70'
                  : isHighlighted
                    ? 'bg-[var(--color-on-primary)]/15'
                    : 'bg-[var(--color-border)]'
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-1">
          <span
            className={`text-[9px] sm:text-[10px] font-medium leading-tight text-center ${
              isHighlighted ? 'text-[var(--color-on-primary)]/75' : 'text-[var(--color-text-muted)]'
            }`}
          >
            {card.status}
          </span>
          {card.speedClass && (
            <span
              className={`text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded leading-none ${
                isHighlighted ? 'bg-[var(--color-on-primary)]/15 text-[var(--color-on-primary)]/85' : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
              }`}
            >
              {card.speedClass}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const CapacityComparisonPanel = ({ compact }: { compact?: boolean }) => (
  <div className="relative w-full">
    <div
      className="absolute -inset-2 sm:-inset-3 rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br from-[var(--color-accent)]/15 via-[var(--color-surface)] to-[var(--color-primary)]/10 blur-sm"
      aria-hidden
    />
    <div
      className="absolute inset-0 rounded-[1.25rem] sm:rounded-[1.75rem] border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-bg)] to-[var(--color-accent-muted)] shadow-[var(--shadow-elevated)]"
      aria-hidden
    />
    <div className="relative rounded-[1.25rem] sm:rounded-[1.75rem] border border-[var(--color-bg)]/60 overflow-hidden">
      <div className="px-4 sm:px-8 pt-5 sm:pt-8 pb-2 flex flex-col min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between gap-3 border-b border-[var(--color-border)]/80 bg-[var(--color-bg)]/50 backdrop-blur-sm">
        <div className="min-w-0">
          <p className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Сравнение ёмкостей</p>
          <p className="text-xs text-[var(--color-text-muted)]">1 камера · 1080p 30fps · H.265 · 24/7</p>
        </div>
        <span className="self-start shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wide bg-[var(--color-primary)] text-[var(--color-on-primary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Пример расчёта
        </span>
      </div>

      <div className={`relative py-6 sm:py-10 ${compact ? 'px-2' : 'px-6 sm:px-10'}`}>
        <div
          className={`flex items-end justify-center ${
            compact
              ? 'gap-2.5 overflow-x-auto pb-2 -mx-2 px-2 snap-x snap-mandatory scrollbar-thin'
              : 'gap-4 sm:gap-5'
          }`}
        >
          {CARD_SIZES.map((card, idx) => (
            <CapacityCard key={card.label} card={card} idx={idx} compact={compact} />
          ))}
        </div>
      </div>

      <motion.div
        className="mx-4 sm:mx-6 mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-[var(--color-bg)]/80 border border-[var(--color-border)] backdrop-blur-sm shadow-[var(--shadow-card)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl gradient-accent flex items-center justify-center shrink-0 shadow-md">
          <svg className="w-5 h-5 text-[var(--color-on-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">
            512 GB — рекомендуемый объём
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            +15% запас · архив 30+ дней
          </p>
        </div>
      </motion.div>
    </div>
  </div>
)

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-[var(--color-bg)] pt-16 pb-20 md:pt-24 md:pb-28">
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none" />
    <div
      className="absolute inset-0 opacity-[0.35] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden
    />
    <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)]/8 blur-3xl pointer-events-none" aria-hidden />
    <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[var(--color-primary)]/5 blur-3xl pointer-events-none" aria-hidden />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center lg:items-stretch">
        <div className="flex flex-col justify-center min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              Калькулятор для видеонаблюдения
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-[56px] font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6 text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            Выберите карту памяти{' '}
            <span className="text-[var(--color-accent)]">без ошибок</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-6 max-w-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            CardMatcher рассчитает минимальный и рекомендуемый объём хранилища для вашей системы — с учётом
            разрешения, кодека, режима записи и срока архива.
          </motion.p>

          <motion.ul
            className="flex flex-col gap-2 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {HERO_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <svg className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {benefit}
              </li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <Link
              to={ROUTES.CALCULATOR}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-[10px] bg-[var(--color-accent)] text-[var(--color-on-primary)] text-base font-semibold hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all duration-150"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Начать расчёт
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center w-full sm:w-auto px-7 py-3.5 rounded-[10px] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-base font-semibold border border-[var(--color-border)] hover:bg-[var(--color-surface-dark)] active:scale-[0.98] transition-all duration-150"
            >
              Как это работает
            </a>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-1 min-[420px]:grid-cols-3 gap-3 sm:flex sm:items-center sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {[
              { value: '99%', label: 'Точность расчёта' },
              { value: '10+', label: 'Форматов видео' },
              { value: '0 BYN', label: 'Полностью бесплатно' },
            ].map((stat, i) => (
              <div key={stat.label} className="flex sm:items-center gap-0 sm:gap-8">
                {i > 0 && <div className="hidden sm:block w-px h-8 bg-[var(--color-border)]" />}
                <div className="p-3 sm:p-0 rounded-xl sm:rounded-none bg-[var(--color-surface)] sm:bg-transparent border border-[var(--color-border)] sm:border-0">
                  <div className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">{stat.value}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="lg:hidden w-full min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <CapacityComparisonPanel compact />
        </motion.div>

        <motion.div
          className="hidden lg:flex w-full min-h-[32rem] items-center justify-center min-w-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative w-full max-w-xl">
            <div className="absolute -top-6 -right-4 w-40 h-40 rounded-full bg-[var(--color-accent)]/12 blur-3xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-8 -left-6 w-48 h-48 rounded-full bg-[var(--color-primary)]/8 blur-3xl pointer-events-none" aria-hidden />
            <CapacityComparisonPanel />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)
