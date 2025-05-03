"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart, Settings } from "lucide-react"
import AdminDashboardLayout from "@/components/service-tracking/admin-dashboard-layout"
import ApiSettingsForm from "@/components/service-tracking/api-settings-form"

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    activeServices: 0,
    completedServices: 0,
    pendingServices: 0,
    totalServices: 0,
    lowStockItems: 0,
    totalStockItems: 0,
  })

  useEffect(() => {
    // Load service data
    const loadServiceData = () => {
      try {
        const storedRecords = localStorage.getItem("serviceRecords")
        if (storedRecords) {
          const allRecords = JSON.parse(storedRecords)

          const active = allRecords.filter(
            (record: any) => record.status !== "Teslim Edildi" && record.status !== "Tamamlandı",
          )

          const completed = allRecords.filter(
            (record: any) => record.status === "Teslim Edildi" || record.status === "Tamamlandı",
          )

          const pending = allRecords.filter((record: any) => record.status === "Beklemede")

          setStats((prev) => ({
            ...prev,
            activeServices: active.length,
            completedServices: completed.length,
            pendingServices: pending.length,
            totalServices: allRecords.length,
          }))
        }
      } catch (error) {
        console.error("Servis kayıtları yüklenirken hata:", error)
      }
    }

    // Load stock data
    const loadStockData = () => {
      try {
        const storedItems = localStorage.getItem("stockItems")
        if (storedItems) {
          const allItems = JSON.parse(storedItems)
          const lowStock = allItems.filter((item: any) => item.quantity <= item.minQuantity)

          setStats((prev) => ({
            ...prev,
            lowStockItems: lowStock.length,
            totalStockItems: allItems.length,
          }))
        }
      } catch (error) {
        console.error("Stok verileri yüklenirken hata:", error)
      }
    }

    loadServiceData()
    loadStockData()

    // Refresh data every 5 seconds
    const interval = setInterval(() => {
      loadServiceData()
      loadStockData()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <AdminDashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Kontrol Ekranı</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Aktif Servisler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Toplam servislerin {Math.round((stats.activeServices / (stats.totalServices || 1)) * 100)}%'i
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tamamlanan Servisler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Toplam servislerin {Math.round((stats.completedServices / (stats.totalServices || 1)) * 100)}%'i
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Bekleyen Servisler</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingServices}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Toplam servislerin {Math.round((stats.pendingServices / (stats.totalServices || 1)) * 100)}%'i
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Kritik Stok</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lowStockItems}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Toplam {stats.totalStockItems} parçadan {stats.lowStockItems} tanesi kritik seviyede
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="services">
          <TabsList>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Servis İstatistikleri</span>
            </TabsTrigger>
            <TabsTrigger value="stock" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Stok Durumu</span>
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>Gelir Analizi</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Ayarlar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Servis İstatistikleri</CardTitle>
                <CardDescription>Son 30 günlük servis istatistikleri</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Grafik verisi yükleniyor...</p>
                  <p className="text-sm mt-2">Bu bölümde servis istatistikleri grafiği gösterilecektir.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stock" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Stok Durumu</CardTitle>
                <CardDescription>Parça kategorilerine göre stok durumu</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Grafik verisi yükleniyor...</p>
                  <p className="text-sm mt-2">Bu bölümde stok durumu grafiği gösterilecektir.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gelir Analizi</CardTitle>
                <CardDescription>Aylık gelir ve gider analizi</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Grafik verisi yükleniyor...</p>
                  <p className="text-sm mt-2">Bu bölümde gelir analizi grafiği gösterilecektir.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Sistem Ayarları</CardTitle>
                <CardDescription>Sistem ayarlarını ve API yapılandırmalarını güncelleyin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ApiSettingsForm />

                {/* Diğer ayarlar buraya eklenebilir */}
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    Diğer sistem ayarları için lütfen sistem yöneticinize başvurun.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminDashboardLayout>
  )
}
