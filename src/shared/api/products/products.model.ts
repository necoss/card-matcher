/**
 * Domain-specific API types for the products module.
 * These map to external API response shapes (Onliner).
 */

export type OnlinerProduct = {
  id: number
  name: string
  full_name: string
  prices?: {
    price_min: {
      amount: string
      currency: string
    }
  }
  images?: {
    header?: string
  }
  html_url: string
  description: string
  reviews?: {
    rating: number
    count: number
  }
}

export type OnlinerResponse = {
  products: OnlinerProduct[]
}
