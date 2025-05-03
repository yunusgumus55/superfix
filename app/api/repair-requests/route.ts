import { NextResponse } from "next/server"

// API endpoint for handling repair requests
export async function POST(request: Request) {
  try {
    const data = await request.json()

    // In a real application, this would save to a database
    // For now, we'll just return a success response

    // Generate a unique service ID
    const serviceId = `SRV-${Date.now()}`

    return NextResponse.json({
      success: true,
      serviceId: serviceId,
      message: "Tamir talebi başarıyla oluşturuldu",
    })
  } catch (error) {
    console.error("Error creating repair request:", error)
    return NextResponse.json(
      { success: false, message: "Tamir talebi oluşturulurken bir hata oluştu" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  // This would normally fetch from a database
  // For now, return an empty array
  return NextResponse.json({ repairRequests: [] })
}
