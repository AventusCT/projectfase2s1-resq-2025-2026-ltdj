"use client"

import type { Product } from "@/types/product"
import { QRCodeSVG } from "qrcode.react"

interface ProductCardProps {
  product: Product
  onScan: (productId: string) => void
}

const statusConfig = {
  available: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-500",
    text: "text-emerald-700 dark:text-emerald-400",
    label: "Beschikbaar",
  },
  reserved: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-500",
    text: "text-amber-700 dark:text-amber-400",
    label: "Gereserveerd",
  },
  defect: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-500",
    text: "text-red-700 dark:text-red-400",
    label: "Defect",
  },
}

export function ProductCard({ product, onScan }: ProductCardProps) {
  const config = statusConfig[product.status]

  const handleClick = () => {
    if (product.status === "available") {
      onScan(product.id)
    }
  }

  return (
    <div
      className={`${config.bg} ${config.border} border-2 rounded-lg p-4 flex flex-col items-center gap-3 transition-all ${
        product.status === "available" ? "cursor-pointer hover:scale-105" : "opacity-75"
      }`}
      onClick={handleClick}
    >
      <div className="bg-white p-2 rounded">
        <QRCodeSVG value={product.id} size={80} />
      </div>

      <div className="text-center w-full">
        <h3 className="font-semibold text-sm text-foreground leading-tight mb-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{product.location}</p>
        <span className={`${config.text} text-xs font-bold uppercase tracking-wide`}>{config.label}</span>
      </div>
    </div>
  )
}
