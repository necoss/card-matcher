import type { MetaFunction } from "react-router";

import { FAQItem } from "@features/faq";
import { FAQ_ITEMS } from '@shared/constants/calculatorData'
import { Container } from "@shared/ui/Layout";
import { motion } from "motion/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Часто задаваемые вопросы | CardMatcher" },
    { name: "description", content: "Ответы на самые популярные вопросы о CardMatcher и выборе карт памяти." },
  ];
};

export default function FAQRoute() {
  return (
    <section className="py-12 sm:py-16 md:py-24 min-h-[calc(100vh-64px)]">
      <Container narrow>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Часто задаваемые вопросы
          </h1>
          <p className="text-[var(--color-text-secondary)]">
            Ответы на самые популярные вопросы о CardMatcher и выборе карт памяти
          </p>
        </motion.div>

        <div className="space-y-10">
          {FAQ_ITEMS.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: si * 0.08 }}
            >
              <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">
                {section.category}
              </h2>
              <div className="bg-[var(--color-bg)] rounded-2xl border border-[var(--color-border)] px-4 sm:px-6 divide-y divide-[var(--color-border)]">
                {section.items.map((item) => (
                  <FAQItem
                    key={item.question}
                    question={item.question}
                    answer={item.answer}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
