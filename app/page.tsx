"use client"

import { useState } from "react"
import { ProductDashboard } from "@/components/product-dashboard"
import { ReservationList } from "@/components/reservation-list"
import type { Product, Reservation } from "@/types/product"

// Mock product data
const initialProducts: Product[] = [
  { id: "1", name: "Laptop Dell XPS 15", location: "Kast A - Plank 1", status: "available" },
  { id: "2", name: 'Monitor Samsung 27"', location: "Kast A - Plank 2", status: "available" },
  { id: "3", name: "Toetsenbord Logitech", location: "Kast B - Plank 1", status: "reserved" },
  { id: "4", name: "Muis Wireless", location: "Kast B - Plank 2", status: "available" },
  { id: "5", name: "Webcam HD", location: "Kast C - Plank 1", status: "defect" },
  { id: "6", name: "Headset Jabra", location: "Kast C - Plank 2", status: "available" },
  { id: "7", name: "Docking Station", location: "Kast A - Plank 3", status: "available" },
  { id: "8", name: "USB-C Kabel", location: "Kast B - Plank 3", status: "reserved" },
  { id: "9", name: "HDMI Adapter", location: "Kast C - Plank 3", status: "available" },
  { id: "10", name: "Laptop Tas", location: "Kast A - Plank 4", status: "available" },
  { id: "11", name: "Powerbank", location: "Kast B - Plank 4", status: "defect" },
  { id: "12", name: "Tablet iPad Pro", location: "Kast C - Plank 4", status: "available" },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [showReservations, setShowReservations] = useState(false)

  const handleScanProduct = (productId: string) => {
    const product = products.find((p) => p.id === productId)

    if (!product) return

    if (product.status === "available") {
      // Create reservation
      const pickupDate = new Date()
      pickupDate.setHours(pickupDate.getHours() + 2) // 2 hours from now

      const newReservation: Reservation = {
        id: `res-${Date.now()}`,
        productId: product.id,
        productName: product.name,
        location: product.location,
        pickupDateTime: pickupDate,
      }

      setReservations([...reservations, newReservation])

      // Update product status
      setProducts(products.map((p) => (p.id === productId ? { ...p, status: "reserved" } : p)))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Product Dashboard</h1>
          <button
            onClick={() => setShowReservations(!showReservations)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            {showReservations ? "Dashboard" : `Mijn Reserveringen (${reservations.length})`}
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {showReservations ? (
          <ReservationList reservations={reservations} />
        ) : (
          <ProductDashboard products={products} onScanProduct={handleScanProduct} />
        )}
      </main>
    </div>
  )
}
