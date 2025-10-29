"use client"

import { useState } from "react"
import TicketSelection from "@/components/ticket-selection"
import TicketForm from "@/components/ticket-form"
import PaymentConfirmation from "@/components/payment-confirmation"
import WatchPartyHero from "@/components/watch-party-hero"

type Step = "hero" | "selection" | "form" | "confirmation"

export default function Home() {
  const [currentStep, setCurrentStep] = useState<Step>("hero")
  const [selectedTicket, setSelectedTicket] = useState<{
    type: string
    price: number
    quantity: number
  } | null>(null)
  const [confirmationData, setConfirmationData] = useState<any>(null)

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setCurrentStep("form")
  }

  const handleFormSubmit = (data: any) => {
    setConfirmationData(data)
    setCurrentStep("confirmation")
  }

  const handleBackToSelection = () => {
    setCurrentStep("selection")
    setSelectedTicket(null)
  }

  const handleStartOver = () => {
    setCurrentStep("hero")
    setSelectedTicket(null)
    setConfirmationData(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {currentStep === "hero" && <WatchPartyHero onContinue={() => setCurrentStep("selection")} />}
      {currentStep === "selection" && <TicketSelection onSelectTicket={handleSelectTicket} />}
      {currentStep === "form" && selectedTicket && (
        <TicketForm ticket={selectedTicket} onSubmit={handleFormSubmit} onBack={handleBackToSelection} />
      )}
      {currentStep === "confirmation" && confirmationData && (
        <PaymentConfirmation data={confirmationData} onStartOver={handleStartOver} />
      )}
    </main>
  )
}
