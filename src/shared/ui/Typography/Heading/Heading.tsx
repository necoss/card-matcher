import { cn } from '../../../utils/cn'

import type { HeadingProps } from './Heading.model'

export const Heading = ({ children, level = 2, className, ...props }: HeadingProps) => {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4'
  const styles = {
    1: "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight",
    2: "text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight",
    3: "text-xl sm:text-2xl font-semibold",
    4: "text-lg font-semibold",
  }
  return (
    <Tag className={cn(styles[level], className)} {...props}>
      {children}
    </Tag>
  )
}
