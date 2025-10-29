import { addSubmissionToSheet, updateTicketSoldCount } from "@/lib/google-sheets"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    await addSubmissionToSheet(undefined, {
      name: body.name,
      email: body.email,
      contact: body.contact,
      ticketType: body.ticket.type,
      quantity: body.ticket.quantity,
      totalAmount: body.totalAmount,
      paymentCode: body.paymentCode,
      timestamp: body.timestamp,
      fileUrl: body.fileUrl,
    })

    await updateTicketSoldCount(undefined, body.ticket.type, body.ticket.quantity)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing submission:", error)
    return NextResponse.json({ error: "Failed to process submission" }, { status: 500 })
  }
}
