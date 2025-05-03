"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Package, FileText, Settings, LogOut, Smartphone, Clock, CheckCircle } from "lucide-react"

export default function DealerDashboard() {
  const router = useRouter()
  const [dealerInfo, setDealerInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if dealer is logged in
    const storedDealerInfo = localStorage.getItem("dealerInfo")
    if (!storedDealerInfo) {
      router.push("/bayi/giris")
      return
    }

    setDealerInfo(JSON.parse(storedDealerInfo))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("dealerInfo")
    router.push("/bayi/giris")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  // Mock data for the dashboard
  const recentOrders = [
    {
      id: "ORD-2023-1234",
      date: "24.04.2025",
      device: "iPhone 13 Pro",
      service: "Ekran Değişimi",
      status: "Tamamlandı",
      price: "2.800 ₺",
    },
    {
      id: "ORD-2023-1235",
      date: "23.04.2025",
      device: "iPhone 12",
      service: "Batarya Değişimi",
      status: "İşlemde",
      price: "1.200 ₺",
    },
    {
      id: "ORD-2023-1236",
      date: "22.04.2025",
      device: "iPhone 14 Pro Max",
      service: "Arka Kamera Değişimi",
      status: "Onay Bekliyor",
      price: "3.500 ₺",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-md fixed">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Bayi Paneli</h2>
            <p className="text-sm text-gray-500 truncate">{dealerInfo?.companyName}</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/bayi/panel" className="flex items-center p-2 rounded-md bg-red-50 text-red-500">
                  <Home className="mr-2 h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/bayi/panel/tamir-talebi" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Smartphone className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Tamir Talebi Oluştur</span>
                </Link>
              </li>
              <li>
                <Link href="/bayi/panel/siparislerim" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Package className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Siparişlerim</span>
                </Link>
              </li>
              <li>
                <Link href="/bayi/panel/fiyat-listesi" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <FileText className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Bayi Fiyat Listesi</span>
                </Link>
              </li>
              <li>
                <Link href="/bayi/panel/ayarlar" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Settings className="mr-2 h-5 w-5 text-gray-500" />
                  <span>Hesap Ayarları</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-2 rounded-md hover:bg-gray-100 w-full text-left text-red-500"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  <span>Çıkış Yap</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="ml-64 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-6">Hoş Geldiniz, {dealerInfo?.companyName}</h1>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Toplam Sipariş</p>
                    <h3 className="text-3xl font-bold">24</h3>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Aktif Siparişler</p>
                    <h3 className="text-3xl font-bold">5</h3>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tamamlanan Siparişler</p>
                    <h3 className="text-3xl font-bold">19</h3>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>En sık kullanılan işlemlere hızlıca erişin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/bayi/panel/tamir-talebi">
                  <Button className="w-full bg-red-500 hover:bg-red-600">
                    <Smartphone className="mr-2 h-5 w-5" />
                    Yeni Tamir Talebi
                  </Button>
                </Link>
                <Link href="/bayi/panel/fiyat-listesi">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-5 w-5" />
                    Fiyat Listesi
                  </Button>
                </Link>
                <Link href="/bayi/panel/siparislerim">
                  <Button variant="outline" className="w-full">
                    <Package className="mr-2 h-5 w-5" />
                    Siparişleri Görüntüle
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Son Siparişler</CardTitle>
              <CardDescription>Son tamir talepleriniz ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Sipariş No</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Tarih</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Cihaz</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Hizmet</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Durum</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">Tutar</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{order.device}</td>
                        <td className="py-3 px-4">{order.service}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Tamamlandı"
                                ? "bg-green-100 text-green-800"
                                : order.status === "İşlemde"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium">{order.price}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            Detaylar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Link href="/bayi/panel/siparislerim">
                  <Button variant="link" className="text-red-500">
                    Tüm Siparişleri Görüntüle
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
