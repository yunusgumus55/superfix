import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Settings } from "lucide-react"
import ServiceStatusSearch from "@/components/service-tracking/service-status-search"
import ServiceStatsCards from "@/components/service-tracking/service-stats-cards"

export default function ServiceTrackingPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Servis Takip Sistemi</h1>
          <p className="text-muted-foreground mt-1">
            Cihazınızın tamir durumunu takip edin veya yeni servis kaydı oluşturun
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link href="/servis-takip/yeni-kayit">
            <Button className="bg-red-500 hover:bg-red-600 w-full sm:w-auto">
              <FileText className="mr-2 h-4 w-4" /> Yeni Servis Kaydı
            </Button>
          </Link>
          <Link href="/servis-takip/admin">
            <Button variant="outline" className="w-full sm:w-auto">
              <Settings className="mr-2 h-4 w-4" /> Servis Yönetimi
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="search">Servis Durumu Sorgula</TabsTrigger>
          <TabsTrigger value="stats">Servis İstatistikleri</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <Card>
            <CardHeader>
              <CardTitle>Servis Durumu Sorgulama</CardTitle>
              <CardDescription>
                Servis numaranız veya telefon numaranız ile cihazınızın durumunu sorgulayabilirsiniz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceStatusSearch />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <ServiceStatsCards />
        </TabsContent>
      </Tabs>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Servis Takip Sistemi Hakkında</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Anlık Takip</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cihazınızın tamir sürecini anlık olarak takip edin. Her aşamada bilgilendirilirsiniz.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Şeffaf Fiyatlandırma</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Tamir sürecinde oluşabilecek ek maliyetler için önceden bilgilendirilirsiniz.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Güvenli Teslimat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Cihazınız tamir edildikten sonra güvenli bir şekilde size teslim edilir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
