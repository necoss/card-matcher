import { cn } from '../../../utils/cn'

import type { TextProps } from './Text.model'

export const Text = ({ children, variant = 'body', muted, className }: TextProps) => {
  const styles = {
    body: 'text-base leading-relaxed',
    caption: 'text-sm leading-relaxed',
    small: 'text-xs leading-normal',
  }
  return (
    <p
      className={cn(
        styles[variant],
        muted && 'text-[var(--color-text-secondary)]',
        className,
      )}
    >
      {children}
    </p>
  )
}
