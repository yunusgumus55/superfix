import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ServiceEntryForm from "@/components/service-tracking/service-entry-form"

export default function NewServiceEntryPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <Link
          href="/servis-takip"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Servis Takip Ana Sayfasına Dön
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Yeni Servis Kaydı</CardTitle>
          <CardDescription>Cihaz ve müşteri bilgilerini girerek yeni bir servis kaydı oluşturun.</CardDescription>
        </CardHeader>
        <CardContent>
          <ServiceEntryForm />
        </CardContent>
      </Card>
    </div>
  )
}
