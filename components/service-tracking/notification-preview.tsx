import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Mail } from "lucide-react"

interface NotificationPreviewProps {
  type: "sms" | "email"
  serviceId: string
  customerName: string
  status: string
  message?: string
}

export default function NotificationPreview({
  type,
  serviceId,
  customerName,
  status,
  message,
}: NotificationPreviewProps) {
  const getStatusMessage = () => {
    switch (status) {
      case "received":
        return "Servis talebiniz alındı"
      case "in-progress":
        return "Cihazınızın onarımı başladı"
      case "waiting-parts":
        return "Cihazınız için parça bekleniyor"
      case "completed":
        return "Cihazınızın onarımı tamamlandı"
      case "ready-for-pickup":
        return "Cihazınız teslimata hazır"
      default:
        return "Servis durumunuz güncellendi"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center">
          {type === "sms" ? <MessageSquare className="mr-2 h-4 w-4" /> : <Mail className="mr-2 h-4 w-4" />}
          {type === "sms" ? "SMS Bildirimi Önizleme" : "E-posta Bildirimi Önizleme"}
        </CardTitle>
        <CardDescription className="text-xs">
          {type === "sms" ? "Müşteriye gönderilecek SMS" : "Müşteriye gönderilecek e-posta"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`p-3 rounded-md ${type === "sms" ? "bg-blue-50" : "bg-gray-50"}`}>
          <p className="text-sm">
            <span className="font-semibold">GetMobil:</span> Sayın {customerName}, {serviceId} no'lu servis kaydınız
            için bilgilendirme: {getStatusMessage()}.
            {status === "ready-for-pickup" && " Cihazınızı mağazamızdan teslim alabilirsiniz. Ödeme tutarı: XXX TL."}
            {message && ` ${message}`}
          </p>
          {type === "sms" ? (
            <p className="text-xs mt-2 text-gray-500">
              Bildirim almak istemiyorsanız IPTAL yazıp 4454'e gönderebilirsiniz.
            </p>
          ) : (
            <div className="mt-3 text-xs text-gray-500">
              <p>Bu e-posta otomatik olarak gönderilmiştir, lütfen yanıtlamayınız.</p>
              <p className="mt-1">
                Bildirim tercihlerinizi değiştirmek için{" "}
                <span className="text-blue-500 underline">hesap ayarlarınızı</span> ziyaret edebilirsiniz.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
