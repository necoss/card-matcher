import type { Product, ProductListParams } from '../../types/product'

import { onlinerProductAdapter } from './onlinerAdapter'

/**
 * Product service.
 * Fetches products from Onliner API. 
 * Does not silently fallback to fake data upon failure.
 */

export const fetchProducts = async (params: ProductListParams): Promise<Product[]> => {
  try {
    const products = await onlinerProductAdapter.getProducts(params)
    return products
  } catch (error) {
    console.error('[ProductService] Failed to fetch products from Onliner:', error)
    throw new Error('Onliner API unavailable')
  }
}
