import { cn } from '../../../utils/cn'

import type { ProductCardProps } from './ProductCard.model'

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80',
  'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&q=80',
  'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=300&q=80',
]

const getPlaceholder = (id: string) => {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return PLACEHOLDER_IMAGES[hash % PLACEHOLDER_IMAGES.length]
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const imgSrc =
    product.imageUrl && product.imageUrl.startsWith('http')
      ? product.imageUrl
      : getPlaceholder(product.id)

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300 flex flex-col',
        className,
      )}
    >
      <div className="relative aspect-[4/3] bg-[var(--color-surface)] overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = getPlaceholder(product.id)
          }}
        />
        <div className="absolute top-2.5 right-2.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-primary)] text-white">
            {product.capacityGb >= 1024 ? `${product.capacityGb / 1024} ТБ` : `${product.capacityGb} ГБ`}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight mb-1 line-clamp-2">
          {product.name}
        </h3>

        {product.rating && (
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn('w-3.5 h-3.5', i < Math.round(product.rating ?? 0) ? 'text-amber-400' : 'text-gray-200')}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-[var(--color-text-muted)]">
              {product.reviewCount?.toLocaleString('ru')} оценок
            </span>
          </div>
        )}

        <p className="text-xs text-[var(--color-text-secondary)] mb-3 flex-1 line-clamp-2">
          {product.recommendReason}
        </p>

        <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-[var(--color-border)]">
          <span className="text-lg font-bold text-[var(--color-text-primary)]">
            {product.priceFormatted}
          </span>
          <a
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-semibold hover:bg-[var(--color-accent)] transition-colors duration-150 whitespace-nowrap"
          >
            Купить
          </a>
        </div>
      </div>
    </div>
  )
}
