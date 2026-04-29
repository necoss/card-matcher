import { cn } from '../../../utils/cn'

import type { LabelProps } from './Label.model'

export const Label = ({ children, className }: LabelProps) => (
  <label className={cn('block text-sm font-medium text-[var(--color-text-primary)] mb-1.5', className)}>
    {children}
  </label>
)
