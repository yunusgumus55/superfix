import { NextResponse } from "next/server"

// Bu dosya gerçek bir API endpoint'i simüle eder
// Gerçek uygulamada veritabanı bağlantısı ve işlemleri

export async function GET(request: Request) {
  // Örnek veri - gerçek uygulamada veritabanından gelecek
  const services = [
    {
      id: "123456",
      customerName: "Ahmet Yılmaz",
      phone: "5551234567",
      deviceModel: "iPhone 13 Pro",
      status: "Onarım Sürecinde",
      entryDate: "2023-05-15",
      estimatedCompletionDate: "2023-05-18",
    },
    {
      id: "123457",
      customerName: "Ayşe Demir",
      phone: "5559876543",
      deviceModel: "MacBook Air M1",
      status: "Arıza Tespiti Yapıldı",
      entryDate: "2023-05-16",
      estimatedCompletionDate: "2023-05-20",
    },
  ]

  return NextResponse.json({ services })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Gerçek uygulamada veritabanına kaydedilecek
    // Örnek yanıt
    return NextResponse.json({
      success: true,
      serviceId: "123459", // Otomatik oluşturulmuş ID
      message: "Servis kaydı başarıyla oluşturuldu",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Servis kaydı oluşturulamadı" }, { status: 400 })
  }
}
