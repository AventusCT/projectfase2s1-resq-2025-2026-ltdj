export type ProductStatus = "available" | "reserved" | "defect"

export interface Product {
  id: string
  name: string
  location: string
  status: ProductStatus
}

export interface Reservation {
  id: string
  productId: string
  productName: string
  location: string
  pickupDateTime: Date
}
