export type Product = {
  id: string
  name: string
  capacityGb: number
  priceFormatted: string
  priceValue: number
  currency: string
  imageUrl?: string
  productUrl: string
  shopName: string
  rating?: number
  reviewCount?: number
  recommendReason: string
}

export type ProductListParams = {
  minCapacityGb: number
  maxCapacityGb?: number
}

export type ProductAdapter = {
  getProducts: (params: ProductListParams) => Promise<Product[]>
}
