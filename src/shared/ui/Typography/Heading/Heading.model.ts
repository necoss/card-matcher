import type { HTMLAttributes } from 'react'

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  level?: 1 | 2 | 3 | 4
}
