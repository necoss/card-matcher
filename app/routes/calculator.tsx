import type { MetaFunction } from "react-router";

import { Calculator } from "@features/calculator";
import { Container } from "@shared/ui/Layout/Container";

export const meta: MetaFunction = () => {
  return [
    { title: "Калькулятор ёмкости карт памяти" },
    { name: "description", content: "Рассчитайте необходимый объём карт памяти для систем видеонаблюдения." },
  ];
};

export default function CalculatorRoute() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-[var(--color-surface)] min-h-[calc(100vh-64px)]">
      <Container>
        <Calculator />
      </Container>
    </section>
  );
}
