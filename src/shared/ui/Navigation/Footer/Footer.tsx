import { Link } from 'react-router-dom'

import { ROUTES } from '../../../constants/routes'

export const Footer = () => (
  <footer className="bg-[var(--color-primary)] text-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold">
              CM
            </div>
            <span className="font-bold text-white text-base">CardMatcher</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Помогаем выбрать правильную карту памяти для систем видеонаблюдения. Точные расчёты — без лишних затрат.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">Навигация</h4>
          <ul className="space-y-2.5">
            <li><Link to={ROUTES.HOME} className="text-white/60 hover:text-white text-sm transition-colors">Главная</Link></li>
            <li><Link to={ROUTES.CALCULATOR} className="text-white/60 hover:text-white text-sm transition-colors">Калькулятор</Link></li>
            <li><Link to={ROUTES.FAQ} className="text-white/60 hover:text-white text-sm transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wide mb-4">Поддержка</h4>
          <ul className="space-y-2.5">
            <li><span className="text-white/60 text-sm">help@cardmatcher.by</span></li>
            <li><Link to={ROUTES.FAQ} className="text-white/60 hover:text-white text-sm transition-colors">Часто задаваемые вопросы</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/40 text-xs">© 2026 CardMatcher. Все права защищены.</p>
        <p className="text-white/40 text-xs">Данные носят справочный характер</p>
      </div>
    </div>
  </footer>
)
