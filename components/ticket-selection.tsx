"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface Ticket {
  type: string
  price: number
  quantity: number
  id: string
  available: number
  description: string
}

interface TicketSelectionProps {
  onSelectTicket?: (ticket: Ticket) => void
}

const TICKET_DESCRIPTIONS: { [key: string]: string } = {
  REGULAR: "Access to Monster Energy Drink, Sticker Set, Balloon Clapper, Poro Keychain, and Foil Ticket, Tyvec, and Raffle Entry",
  VIP: "Access to Monster Energy Drink, Sticker Set, Balloon Clapper, Poro Keychain, and Foil Ticket, Tyvec, and Raffle Entry + Shirt",
  "ULTRA VIP": "Access to Monster Energy Drink, Sticker Set, Balloon Clapper, Poro Keychain, and Foil Ticket, Tyvec, and Raffle Entry + Jersey",
}

const TICKET_PRICES: { [key: string]: number } = {
  REGULAR: 599,
  VIP: 1499,
  "ULTRA VIP": 2200,
}

const TICKET_IMAGES: { [key: string]: string } = {
  REGULAR: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PCqjQ92yNICf5mphCu8Nrfi6IL3it6.png",
  VIP: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0p9EUBLz7ov1gEAqobobC0xJcg4Rsj.png",
  "ULTRA VIP": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-JOluN02D6KTsSZWoA2hc3xMwM4HvXD.png",
}

const TICKET_COLORS: { [key: string]: { bg: string; border: string } } = {
  REGULAR: { bg: "bg-blue-600", border: "border-blue-600" },
  VIP: { bg: "bg-white", border: "border-white" },
  "Ultra VIP": { bg: "bg-black", border: "border-gray-700" },
}

export default function TicketSelection({ onSelectTicket }: TicketSelectionProps) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("/api/tickets/availability")
        if (!response.ok) throw new Error("Failed to fetch tickets")
        const data = await response.json()
        setTickets(
          data.map((t: any, idx: number) => ({
            ...t,
            id: `ticket-${idx}`,
            quantity: 1,
            description: TICKET_DESCRIPTIONS[t.type] || "",
            price: TICKET_PRICES[t.type] || t.price,
          })),
        )
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load tickets")
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    const ticket = tickets.find((t) => t.id === ticketId)
    if (ticket) {
      setSelectedQuantities((prev) => ({
        ...prev,
        [ticketId]: Math.max(1, Math.min(quantity, ticket.available)),
      }))
    }
  }

  const handleSelectTicket = (ticket: Ticket) => {
    const quantity = selectedQuantities[ticket.id] || 1
    if (quantity > ticket.available) {
      setError(`Only ${ticket.available} seats left for ${ticket.type}. Please adjust your selection.`)
      return
    }
    if (onSelectTicket) {
      onSelectTicket({
        ...ticket,
        quantity,
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block mb-4">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-white text-lg font-semibold">Summoning your tickets...</p>
        </div>
      </div>
    )
  }

  if (error && error.includes("Failed to load")) {
    return (
      <div className="min-h-screen bg-black p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      </div>
    )
  }

  return (
    
    <div className="min-h-screen bg-[#1F1F1F] w-full">
       <div className="text-center mb-16 relative w-full">
          <div className="absolute inset-0 opacity-100">
            <img src="/ticket-header.png" alt="" className="w-full h-full object-cover " />
            
          </div>
          
          
          <h1 style={{ fontFamily: "Anton" }} className=" text-[150px] md:text-[200px] pt-[100px] text-white mb-8 relative z-10">
            
            WATCH PARTY
          </h1>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12 relative z-10 py-20">
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                LOL
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                ESPORTS
              </p>
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                WATCH PARTY &
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                MINI FAN FEST
              </p>
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                MEET AND
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                GREETS
              </p>
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                EXCLUSIVE
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                MERCH
              </p>
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                NOVEMBER
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                9TH
              </p>
            </div>
            <div className="text-left">
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                EARN YOUR
              </p>
              <p style={{ fontFamily: "Montserrat" }} className="text-xs text-[#CBAD90] uppercase tracking-widest">
                LEGACY
              </p>
            </div>
          </div>
        </div>

      <div className="w-full flex-col flex justify-center items-center" >
       
        {error && !error.includes("Failed to load") && (
          <div className="bg-red-500/10 border border-red-500/20  p-4 mb-8">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-8 my-20 max-w-7xl " >
          {tickets.map((ticket, idx) => {

            const textColor = ticket.type === "VIP" ? "text-white" : "text-white"
            const labelColor = ticket.type === "VIP" ? "text-gray-300" : "text-gray-300"

            return (
              <div key={ticket.id} className="flex flex-col">
                <div className="relative  overflow-hidden h-[700px] bg-black flex flex-col rounded-2xl">
                  {/* Ticket Image - Full background */}
                  <img
                    src={TICKET_IMAGES[ticket.type]}
                    alt={ticket.type}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[26292D] via-[#26292D]/50 to-transparent  " />

                  {/* Content positioned at bottom */}
                  <div className="relative z-10 mt-auto p-6 flex flex-col ">
                    {/* Worlds 25 branding */}
                    <div className="mb-4">
                      <p
                        style={{ fontFamily: "Montserrat" }}
                        className={`text-s uppercase tracking-widest leading-none m-none ${labelColor}`}
                      >
                        Worlds 25
                      </p>
                    </div>

                    {/* Ticket type */}
                    <h2 style={{ fontFamily: "Anton" }} className={`text-6xl  mb-3 leading-none ${textColor}`}>
                      {ticket.type}
                    </h2>

                    {/* Description */}
                    <p style={{ fontFamily: "Montserrat" }} className={`text-sm mb-4 ${textColor} opacity-90`}>
                      {ticket.description}
                    </p>

                    {/* Remaining count */}
                    <div className="mb-4">
                      <p
                        style={{ fontFamily: "Montserrat" }}
                        className={`text-xs uppercase tracking-widest ${labelColor} mb-1`}
                      >
                        Remaining
                      </p>
                      <p className={`text-lg font-bold ${textColor}`}>
                        {ticket.available === 0 ? "SOLD OUT" : `${ticket.available} LEFT`}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                      <span
                        style={{ fontFamily: "Montserrat" }}
                        className={`text-xs uppercase tracking-widest ${labelColor}`}
                      >
                        Price:
                      </span>
                      <span className={`text-2xl font-bold ${textColor}`}>
                        {ticket.price}
                        <span className="text-xs ml-1">PHP</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Buy button below card */}
                <Button
                  onClick={() => handleSelectTicket(ticket)}
                  disabled={ticket.available === 0}
                  className="w-full mt-4 bg-blue-600 text-white hover:bg-transparent hover:border-1 uppercase tracking-wider disabled:opacity-50 py-7 "
                >
                  {ticket.available === 0 ? "SOLD OUT" : "BUY TICKETS"}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
