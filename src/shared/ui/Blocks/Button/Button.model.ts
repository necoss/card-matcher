import { Button as BaseButton } from '@base-ui/react/button'

export type ButtonProps = React.ComponentProps<typeof BaseButton> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}
