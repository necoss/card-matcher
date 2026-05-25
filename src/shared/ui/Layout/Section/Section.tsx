import { cn } from '../../../utils/cn'

import type { SectionProps } from './Section.model'

export const Section = ({ children, className, dark }: SectionProps) => (
  <section
    className={cn(
      'py-16 md:py-24',
      dark ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)]' : 'bg-[var(--color-bg)]',
      className,
    )}
  >
    {children}
  </section>
)
