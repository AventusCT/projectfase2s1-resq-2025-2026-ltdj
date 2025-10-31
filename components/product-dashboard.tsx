"use client"

import type { Product } from "@/types/product"
import { ProductCard } from "@/components/product-card"

interface ProductDashboardProps {
  products: Product[]
  onScanProduct: (productId: string) => void
}

export function ProductDashboard({ products, onScanProduct }: ProductDashboardProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onScan={onScanProduct} />
      ))}
    </div>
  )
}
