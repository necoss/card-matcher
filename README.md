# CardMatcher

Калькулятор ёмкости карт памяти для систем видеонаблюдения. Рассчитывает минимальный и рекомендуемый объём хранилища по параметрам камер.

## Стек

- React 19, TypeScript, Vite
- React Router 7 (framework mode)
- Tailwind CSS 4
- Base UI, Motion

## Структура

```
app/              — маршруты и корневой layout
src/features/     — калькулятор, главная, FAQ
src/shared/       — UI, утилиты расчёта, константы
```

## Команды

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
pnpm lint
```

## Формула расчёта

```
Storage (GB) = Bitrate_Mbps × 125_000 × 3600 × HoursPerDay × Cameras × Days / 1_000_000_000
```

Рекомендуемый объём = минимальный × 1.15 (запас под ФС и пики VBR).
