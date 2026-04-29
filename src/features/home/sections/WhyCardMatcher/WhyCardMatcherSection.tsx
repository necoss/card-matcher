import { WHY_FEATURES } from "@shared/constants/"
import { useAutoRotate } from "@shared/hooks/"
import { Container } from "@shared/ui/"
import { motion } from "motion/react"

export const WhyCardMatcherSection = () => {
  const { activeIndex, setHoveredIndex } = useAutoRotate(WHY_FEATURES.length, 3000)

  return (
    <section className="py-20 md:py-28 bg-[var(--color-surface)]">
      <Container>
        <div className="text-center mb-14">
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            Почему CardMatcher?
          </motion.h2>
          <motion.p className="text-[var(--color-text-secondary)] text-base" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            Профессиональный подход к выбору накопителей
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {WHY_FEATURES.map((feature, idx) => {
            const isActive = activeIndex === idx

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="rounded-2xl p-6 cursor-default overflow-hidden transition-[background-color,box-shadow,transform] duration-300"
                style={{
                  background: isActive ? "var(--color-primary)" : "white",
                  boxShadow: isActive ? "var(--shadow-elevated)" : "var(--shadow-card)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4 transition-colors duration-300" style={{ background: isActive ? "rgba(255,255,255,0.15)" : "var(--color-surface)" }}>
                  {feature.icon}
                </div>

                <h3 className="text-base font-semibold mb-2 transition-colors duration-300" style={{ color: isActive ? "white" : "var(--color-text-primary)" }}>
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: isActive ? "rgba(255,255,255,0.75)" : "var(--color-text-secondary)" }}>
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
