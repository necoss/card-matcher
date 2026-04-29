import { useState } from 'react'

import { cn } from '@shared/utils'
import { AnimatePresence,motion } from 'motion/react'

import type { FAQItemProps } from './FAQItem.model'

export const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--color-border)] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full py-4 flex items-center justify-between text-left gap-4 hover:text-[var(--color-accent)] transition-colors"
      >
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{question}</span>
        <span
          className={cn(
            'flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] transition-transform duration-200',
            open && 'rotate-45 border-[var(--color-accent)] text-[var(--color-accent)]',
          )}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
