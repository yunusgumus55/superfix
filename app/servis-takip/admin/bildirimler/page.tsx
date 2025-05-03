import type { Metadata } from "next"
import NotificationSettings from "@/components/service-tracking/notification-settings"
import NotificationPreview from "@/components/service-tracking/notification-preview"

export const metadata: Metadata = {
  title: "Bildirim Ayarları | GetMobil Servis",
  description: "Servis durumu bildirimleri için ayarlarınızı yönetin",
}

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Bildirim Ayarları</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <NotificationSettings />
        </div>
        <div className="space-y-6">
          <NotificationPreview type="sms" serviceId="SRV-123456" customerName="Ahmet Yılmaz" status="in-progress" />
          <NotificationPreview
            type="email"
            serviceId="SRV-123456"
            customerName="Ahmet Yılmaz"
            status="completed"
            message="Servis ücretiniz 1.250 TL'dir. Teşekkür ederiz."
          />
        </div>
      </div>
    </div>
  )
}
