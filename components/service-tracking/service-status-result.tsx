import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle, Truck, PenToolIcon as Tool } from "lucide-react"

interface ServiceStatusResultProps {
  data: {
    serviceNumber: string
    customerName: string
    deviceModel: string
    status: string
    entryDate: string
    estimatedCompletionDate: string
    technician: string
    issue: string
    statusHistory: Array<{
      date: string
      status: string
      note: string
    }>
    cost: {
      parts: number
      labor: number
      total: number
      isPaid: boolean
    }
  }
}

export default function ServiceStatusResult({ data }: ServiceStatusResultProps) {
  // Veri yoksa veya eksikse boş bir bileşen döndür
  if (!data) {
    return <div className="p-4 text-center">Servis bilgileri yüklenemedi.</div>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Teslim Alındı":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Arıza Tespiti Yapıldı":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "Onarım Sürecinde":
        return <Tool className="h-5 w-5 text-blue-500" />
      case "Tamamlandı":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case "Teslim Edildi":
        return <Truck className="h-5 w-5 text-purple-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Teslim Alındı":
        return <Badge className="bg-green-500">Teslim Alındı</Badge>
      case "Arıza Tespiti Yapıldı":
        return <Badge className="bg-amber-500">Arıza Tespiti Yapıldı</Badge>
      case "Onarım Sürecinde":
        return <Badge className="bg-blue-500">Onarım Sürecinde</Badge>
      case "Tamamlandı":
        return <Badge className="bg-green-500">Tamamlandı</Badge>
      case "Teslim Edildi":
        return <Badge className="bg-purple-500">Teslim Edildi</Badge>
      default:
        return <Badge className="bg-gray-500">Beklemede</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "Belirtilmemiş"
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    } catch (error) {
      return dateString // Tarih dönüştürülemezse orijinal string'i döndür
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>Servis Bilgileri</CardTitle>
              <CardDescription>Servis No: {data.serviceNumber || "Belirtilmemiş"}</CardDescription>
            </div>
            <div className="mt-2 sm:mt-0">{getStatusBadge(data.status || "Beklemede")}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Müşteri Bilgileri</h3>
              <p className="font-medium">{data.customerName || "Belirtilmemiş"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Cihaz Modeli</h3>
              <p className="font-medium">{data.deviceModel || "Belirtilmemiş"}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Giriş Tarihi</h3>
              <p className="font-medium">{formatDate(data.entryDate)}</p>
            </div>
            <div>
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Tahmini Tamamlanma</h3>
              <p className="font-medium">{formatDate(data.estimatedCompletionDate)}</p>
            </div>
            <div className="md:col-span-2">
              <h3 className="font-medium text-sm text-muted-foreground mb-1">Sorun Açıklaması</h3>
              <p className="font-medium">{data.issue || "Belirtilmemiş"}</p>
            </div>
          </div>

          <Separator className="my-6" />

          {data.statusHistory && data.statusHistory.length > 0 ? (
            <div>
              <h3 className="font-medium mb-4">Servis Durumu Geçmişi</h3>
              <div className="space-y-4">
                {data.statusHistory.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">{getStatusIcon(item.status)}</div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <p className="font-medium">{item.status}</p>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-medium mb-4">Servis Durumu Geçmişi</h3>
              <p className="text-muted-foreground">Henüz servis durumu güncellemesi bulunmuyor.</p>
            </div>
          )}

          <Separator className="my-6" />

          {data.cost ? (
            <div>
              <h3 className="font-medium mb-4">Maliyet Bilgileri</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Parça Ücreti</p>
                    <p className="font-medium">{(data.cost.parts || 0).toLocaleString("tr-TR")} ₺</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">İşçilik Ücreti</p>
                    <p className="font-medium">{(data.cost.labor || 0).toLocaleString("tr-TR")} ₺</p>
                  </div>
                  <div className="col-span-2">
                    <Separator className="my-2" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Toplam Tutar</p>
                    <p className="font-bold text-lg">{(data.cost.total || 0).toLocaleString("tr-TR")} ₺</p>
                  </div>
                  <div className="flex items-end">
                    <Badge variant={data.cost.isPaid ? "outline" : "destructive"} className="ml-auto">
                      {data.cost.isPaid ? "Ödendi" : "Ödenmedi"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-medium mb-4">Maliyet Bilgileri</h3>
              <p className="text-muted-foreground">Henüz maliyet bilgisi bulunmuyor.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
