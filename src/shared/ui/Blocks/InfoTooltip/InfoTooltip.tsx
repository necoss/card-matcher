import { cn } from '../../../utils/cn'

import type { InfoTooltipProps } from './InfoTooltip.model'

export const InfoTooltip = ({ content, className }: InfoTooltipProps) => (
  <span className={cn('relative inline-flex group', className)}>
    <button
      type="button"
      tabIndex={0}
      aria-label={content}
      className="inline-flex size-5 shrink-0 items-center justify-center rounded-full text-[var(--color-text-muted)] text-xs cursor-help hover:text-[var(--color-text-primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
      ⓘ
    </button>
    <span
      role="tooltip"
      className="absolute left-0 top-full z-50 mt-1.5 px-2.5 py-1.5 w-max max-w-[16rem] rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xs leading-snug shadow-md opacity-0 invisible transition-[opacity,visibility] duration-150 pointer-events-none group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
    >
      {content}
    </span>
  </span>
)
