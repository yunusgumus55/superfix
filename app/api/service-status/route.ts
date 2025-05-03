import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const serviceId = searchParams.get("serviceId")
  const phone = searchParams.get("phone")

  // Telefon numarası formatını normalize et
  let normalizedPhone = phone
  if (phone) {
    // Sadece rakamları al
    normalizedPhone = phone.replace(/\D/g, "")

    // Başında 0 varsa kaldır
    if (normalizedPhone.startsWith("0")) {
      normalizedPhone = normalizedPhone.substring(1)
    }

    // Test için birkaç geçerli numara ekleyelim
    const validPhones = ["5551234567", "5551234568", "5551234569", "5321234567", "5421234567"]

    // Telefon numarasının son 10 hanesini kontrol et
    const lastTenDigits = normalizedPhone.slice(-10)

    if (validPhones.some((validPhone) => lastTenDigits.includes(validPhone) || validPhone.includes(lastTenDigits))) {
      return NextResponse.json({
        success: true,
        data: {
          serviceNumber: "123456",
          customerName: "Ahmet Yılmaz",
          deviceModel: "iPhone 13 Pro",
          status: "Onarım Sürecinde",
          entryDate: "2023-05-15",
          estimatedCompletionDate: "2023-05-18",
          technician: "Mehmet Tekniker",
          issue: "Ekran kırık, batarya değişimi gerekli",
          statusHistory: [
            { date: "2023-05-15 09:30", status: "Teslim Alındı", note: "Cihaz kontrol edildi" },
            { date: "2023-05-15 14:45", status: "Arıza Tespiti Yapıldı", note: "Ekran değişimi gerekli" },
            { date: "2023-05-16 10:15", status: "Onarım Sürecinde", note: "Parça siparişi verildi" },
          ],
          cost: {
            parts: 2500,
            labor: 500,
            total: 3000,
            isPaid: false,
          },
        },
      })
    }
  }

  return NextResponse.json({ success: false, message: "Servis kaydı bulunamadı" }, { status: 404 })
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()

    // Gerçek uygulamada veritabanında güncelleme yapılacak
    return NextResponse.json({
      success: true,
      message: "Servis durumu başarıyla güncellendi",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Servis durumu güncellenemedi" }, { status: 400 })
  }
}
