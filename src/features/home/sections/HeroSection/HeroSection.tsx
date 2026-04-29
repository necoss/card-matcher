import { Link } from "react-router-dom"

import { ROUTES } from "@shared/constants/routes.ts"
import { motion } from "motion/react"

import type {CardSize} from "./HeroSection.model";

const CARD_SIZES: CardSize[] = [
  { label: "64" },
  { label: "128" },
  { label: "256" },
  { label: "512", isDefault: true },
]

export const HeroSection = () => (
  <section className="relative overflow-hidden bg-white pt-16 pb-24 md:pt-24 md:pb-32">
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface)] via-white to-white pointer-events-none" />

    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-6">📹 Видеонаблюдение</span>
          </motion.div>

          <motion.h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[var(--color-text-primary)] tracking-tight leading-[1.1] mb-6" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}>
            Выберите карту памяти <span className="text-[var(--color-accent)]">без ошибок</span>
          </motion.h1>

          <motion.p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-lg" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}>
            Калькулятор CardMatcher точно рассчитает необходимую ёмкость карт памяти для вашей системы видеонаблюдения. Никаких сюрпризов — только цифры.
          </motion.p>

          <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}>
            <Link to={ROUTES.CALCULATOR} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[10px] bg-[var(--color-primary)] text-white text-base font-semibold hover:bg-[var(--color-primary-light)] active:scale-[0.98] transition-all duration-150">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Начать расчёт
            </Link>
            <Link
              to={ROUTES.FAQ}
              className="inline-flex items-center px-7 py-3.5 rounded-[10px] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-base font-semibold border border-[var(--color-border)] hover:bg-[var(--color-surface-dark)] active:scale-[0.98] transition-all duration-150"
            >
              Узнать больше
            </Link>
          </motion.div>

          <motion.div className="mt-10 flex items-center gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
            <div>
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">99%</div>
              <div className="text-xs text-[var(--color-text-muted)]">Точность расчёта</div>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div>
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">10+</div>
              <div className="text-xs text-[var(--color-text-muted)]">Форматов видео</div>
            </div>
            <div className="w-px h-8 bg-[var(--color-border)]" />
            <div>
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">0 BYN</div>
              <div className="text-xs text-[var(--color-text-muted)]">Полностью бесплатно</div>
            </div>
          </motion.div>
        </div>

        <motion.div className="hidden lg:flex items-center justify-center" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}>
          <div className="relative flex gap-3 items-end">
            {CARD_SIZES.map((card, idx) => {
              const heights = ["h-36", "h-44", "h-52", "h-58"]
              const isHighlighted = !!card.isDefault
              return (
                <motion.div
                  key={card.label}
                  className={`relative flex flex-col items-center justify-between p-4 rounded-2xl ${heights[idx]} w-24 overflow-hidden ${isHighlighted ? "bg-[var(--color-primary)]" : "bg-white border-2 border-[var(--color-border)]"}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                  style={{ boxShadow: isHighlighted ? "var(--shadow-float)" : "var(--shadow-card)" }}
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isHighlighted ? "bg-[var(--color-accent)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-secondary)]"}`}>{card.label} GB</span>

                  <div className={`w-14 h-16 rounded-lg border-2 ${isHighlighted ? "border-white/30 bg-white/10" : "border-[var(--color-border)] bg-[var(--color-surface)]"} flex items-center justify-center relative`}>
                    <div className={`text-2xl font-black ${isHighlighted ? "text-white" : "text-[var(--color-primary)]"}`}>SD</div>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className={`w-1.5 h-3 rounded-sm ${isHighlighted ? "bg-[var(--color-accent)]" : "bg-[var(--color-border)]"}`} />
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
)
