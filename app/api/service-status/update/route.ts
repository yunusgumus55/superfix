import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { serviceId, status, notes, notifyCustomer } = data

    console.log(`Updating service status for ${serviceId} to ${status}`)

    // Gerçek uygulamada veritabanında güncelleme yapılır
    // Örnek: await db.serviceRequests.update({ where: { id: serviceId }, data: { status, notes } })

    // Eğer müşteriye bildirim gönderilecekse
    if (notifyCustomer) {
      // Servis kaydını getir
      // Gerçek uygulamada veritabanından alınır
      const serviceRecord = {
        id: serviceId,
        customerName: "Ahmet Yılmaz",
        customerPhone: "+905551234567",
        customerEmail: "ahmet@example.com",
        notifications: {
          sms: true,
          email: true,
        },
      }

      // SMS bildirimi gönder
      if (serviceRecord.notifications.sms && serviceRecord.customerPhone) {
        await sendNotification({
          type: "sms",
          recipient: serviceRecord.customerPhone,
          serviceId,
          status,
          customerName: serviceRecord.customerName,
        })
      }

      // E-posta bildirimi gönder
      if (serviceRecord.notifications.email && serviceRecord.customerEmail) {
        await sendNotification({
          type: "email",
          recipient: serviceRecord.customerEmail,
          serviceId,
          status,
          customerName: serviceRecord.customerName,
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Servis durumu başarıyla güncellendi",
    })
  } catch (error) {
    console.error("Servis durumu güncellenirken hata:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Servis durumu güncellenemedi",
        error: error instanceof Error ? error.message : "Bilinmeyen hata",
      },
      { status: 500 },
    )
  }
}

// Bildirim gönderme yardımcı fonksiyonu
async function sendNotification({
  type,
  recipient,
  serviceId,
  status,
  customerName,
}: {
  type: "sms" | "email"
  recipient: string
  serviceId: string
  status: string
  customerName: string
}) {
  // Durum mesajını oluştur
  let statusMessage = "Servis durumunuz güncellendi"
  switch (status) {
    case "received":
      statusMessage = "Servis talebiniz alındı"
      break
    case "in-progress":
      statusMessage = "Cihazınızın onarımı başladı"
      break
    case "waiting-parts":
      statusMessage = "Cihazınız için parça bekleniyor"
      break
    case "completed":
      statusMessage = "Cihazınızın onarımı tamamlandı"
      break
    case "ready-for-pickup":
      statusMessage = "Cihazınız teslimata hazır"
      break
  }

  // Bildirim API'sine istek gönder
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type,
      recipient,
      serviceId,
      status,
      message: `Sayın ${customerName}, ${serviceId} no'lu servis kaydınız için bilgilendirme: ${statusMessage}.`,
    }),
  })

  if (!response.ok) {
    throw new Error(`Bildirim gönderilemedi: ${response.statusText}`)
  }

  return await response.json()
}
