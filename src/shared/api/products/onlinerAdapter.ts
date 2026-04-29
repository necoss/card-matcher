import type { Product, ProductAdapter, ProductListParams } from '../../types/product'
import { roundUpToCardSize } from '../../utils/storageCalculation'
import { apiClient } from '../api'
import { API_ROUTES } from '../apiRoutes'

import type { OnlinerResponse } from './products.model'

/**
 * Onliner catalog adapter for memory cards (SD/microSD)
 *
 * Uses Onliner's unofficial but publicly accessible catalog API.
 * Endpoint: https://catalog.onliner.by/sdcard
 *
 * Note: Onliner's API is not officially documented and may change.
 * The adapter is wrapped in try/catch so we can fall back to mock.
 */

const parseCapacityGb = (name: string): number | null => {
  const match = name.match(/(\d+)\s*(?:GB|ГБ|TB|ТБ)/i)
  if (!match) return null
  const value = parseInt(match[1], 10)
  const isTb = /TB|ТБ/i.test(name.slice(name.indexOf(match[0])))
  return isTb ? value * 1024 : value
}

export const onlinerProductAdapter: ProductAdapter = {
  getProducts: async (params: ProductListParams): Promise<Product[]> => {
    const minCard = roundUpToCardSize(params.minCapacityGb)

    const response = await apiClient.get(
      API_ROUTES.onliner.sdCards,
      {
        searchParams: {
          'page[limit]': 30,
          'page[offset]': 0,
        },
      },
    )

    const data = await response.json<OnlinerResponse>()

    return data.products
      .map((p): Product | null => {
        const capacity = parseCapacityGb(p.full_name || p.name)
        if (!capacity || capacity < minCard) return null

        const price = p.prices?.price_min
        return {
          id: String(p.id),
          name: p.full_name || p.name,
          capacityGb: capacity,
          priceFormatted: price ? `${price.amount} ${price.currency}` : 'Уточните цену',
          priceValue: price ? parseFloat(price.amount) : 0,
          currency: price?.currency ?? 'BYN',
          imageUrl: p.images?.header,
          productUrl: p.html_url ?? API_ROUTES.onliner.catalog,
          shopName: 'Онлайнер',
          rating: p.reviews?.rating,
          reviewCount: p.reviews?.count,
          recommendReason: `Подходит по объёму (${capacity} ГБ ≥ ${minCard} ГБ)`,
        }
      })
      .filter((p): p is Product => p !== null)
      .sort((a, b) => a.priceValue - b.priceValue)
  },
}
