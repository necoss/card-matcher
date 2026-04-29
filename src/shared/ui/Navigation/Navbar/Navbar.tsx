import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { AnimatePresence,motion } from 'motion/react'

import { ROUTES } from '../../../constants/routes'
import { useScrollDirection } from '../../../hooks/useScrollDirection'
import { cn } from '../../../utils/cn'
import { Button } from '../../Blocks/Button'

const navLinks = [
  { label: 'Главная', to: ROUTES.HOME },
  { label: 'Калькулятор', to: ROUTES.CALCULATOR },
  { label: 'FAQ', to: ROUTES.FAQ },
]

export const Navbar = () => {
  const scrollDir = useScrollDirection()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHidden = scrollDir === 'down' && !mobileOpen

  return (
    <motion.header
      animate={{ y: isHidden ? -100 : 0, opacity: isHidden ? 0 : 1 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--color-border)]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-sm font-bold group-hover:bg-[var(--color-accent)] transition-colors duration-200">
              CM
            </div>
            <span className="font-bold text-[var(--color-text-primary)] text-base tracking-tight">
              CardMatcher
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150',
                  location.pathname === link.to
                    ? 'text-[var(--color-text-primary)] bg-[var(--color-surface)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]',
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.CALCULATOR}
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-primary-light)] transition-colors duration-150"
            >
              Калькулятор
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Меню"
            >
              <span className={cn('block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all', mobileOpen && 'rotate-45 translate-y-2')} />
              <span className={cn('block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all', mobileOpen && 'opacity-0')} />
              <span className={cn('block w-5 h-0.5 bg-[var(--color-text-primary)] transition-all', mobileOpen && '-rotate-45 -translate-y-2')} />
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)] bg-white"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    location.pathname === link.to
                      ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)]',
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={ROUTES.CALCULATOR}
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold text-center hover:bg-[var(--color-primary-light)] transition-colors"
              >
                Калькулятор
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
