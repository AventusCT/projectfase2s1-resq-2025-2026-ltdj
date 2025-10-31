"use client"

import type { Reservation } from "@/types/product"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

interface ReservationListProps {
  reservations: Reservation[]
}

export function ReservationList({ reservations }: ReservationListProps) {
  if (reservations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Geen reserveringen gevonden</p>
        <p className="text-sm text-muted-foreground mt-2">Scan een QR-code om een product te reserveren</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Mijn Reserveringen</h2>
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground mb-1">{reservation.productName}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Ophalen:</span>
                    {format(reservation.pickupDateTime, "d MMMM yyyy 'om' HH:mm", { locale: nl })}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Locatie:</span>
                    {reservation.location}
                  </p>
                </div>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold">
                Actief
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
