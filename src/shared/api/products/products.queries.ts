import { useQuery } from '@tanstack/react-query'

import { roundUpToCardSize } from '../../utils/storageCalculation'

import { fetchProducts } from './productService'

/**
 * Centralized query keys for the products domain.
 * Stable, serializable, and reusable.
 */
export const productKeys = {
  all: ['products'] as const,
  byMinCapacity: (minCapacityGb: number) =>
    [...productKeys.all, roundUpToCardSize(minCapacityGb)] as const,
}

/**
 * Fetches products matching the minimum capacity requirement.
 * Query is disabled when minimumGb <= 0.
 */
export const useProducts = (minimumGb: number) => {
  const minCard = roundUpToCardSize(minimumGb)

  return useQuery({
    queryKey: productKeys.byMinCapacity(minimumGb),
    queryFn: () => fetchProducts({ minCapacityGb: minCard }),
    enabled: minimumGb > 0,
  })
}
