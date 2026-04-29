import { useCallback, useEffect, useState } from 'react'

import { useProducts } from '@shared/api/products'
import { ProductCard } from '@shared/ui'
import { getRecommendedCardLabel } from '@shared/utils/storageCalculation'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'motion/react'

import type { ProductListProps } from './ProductList.model'

export const ProductList = ({ calculatedGb }: ProductListProps) => {
  const formattedMinCard = getRecommendedCardLabel(calculatedGb)
  const { data, isLoading, isError } = useProducts(calculatedGb)
  
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  })
  
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  if (isLoading) {
    return (
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Рекомендуемые товары</h3>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] rounded-2xl bg-[var(--color-surface)] h-[380px] animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mt-10 p-6 rounded-2xl bg-red-50 border border-red-100 dark:bg-red-950/20 dark:border-red-900/30 text-center">
        <p className="text-red-600 dark:text-red-400 font-medium">Не удалось загрузить рекомендации.</p>
        <p className="text-red-500/80 text-sm mt-1">Сервис Onliner временно недоступен.</p>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="mt-10 p-6 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] text-center">
        <p className="text-[var(--color-text-primary)] font-medium">Нет подходящих карт памяти</p>
        <p className="text-[var(--color-text-muted)] text-sm mt-1">Для ёмкости {formattedMinCard} не найдено предложений</p>
      </div>
    )
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-1">Рекомендуемые товары</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Карты памяти ёмкостью от {formattedMinCard}, подходящие для вашей системы
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <button 
            type="button" 
            onClick={scrollPrev} 
            disabled={prevBtnDisabled}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-hover)] transition-colors"
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            type="button" 
            onClick={scrollNext} 
            disabled={nextBtnDisabled}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-primary)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-hover)] transition-colors"
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y -ml-4">
          {data.map((product, idx) => (
            <motion.div
              className="flex-[0_0_85%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] pl-4 min-w-0"
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
            >
              <ProductCard product={product} className="h-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
