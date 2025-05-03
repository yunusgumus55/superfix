"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Veri kurtarma fiyatları için örnek veri
const initialPrices = [
  { id: 1, model: "Standart Veri Kurtarma", price: "1500", duration: "1-3 gün" },
  { id: 2, model: "Acil Veri Kurtarma", price: "2500", duration: "24 saat" },
  { id: 3, model: "Suya Düşmüş Cihaz", price: "2000", duration: "2-4 gün" },
  { id: 4, model: "Yazılımsal Sorunlar", price: "1000", duration: "1-2 gün" },
  { id: 5, model: "Donanımsal Sorunlar", price: "2000", duration: "2-5 gün" },
  { id: 6, model: "Şifreli Cihazlar", price: "2500", duration: "3-7 gün" },
]

export default function DataRecoveryPricesPage() {
  const [prices, setPrices] = useState(initialPrices)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Oturum kontrolü
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }

    // LocalStorage'dan kaydedilmiş fiyatları al (eğer varsa)
    const savedPrices = localStorage.getItem("dataRecoveryPrices")
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices))
    }
  }, [router])

  const handlePriceChange = (id: number, value: string) => {
    setPrices(prices.map((price) => (price.id === id ? { ...price, price: value } : price)))
  }

  const handleDurationChange = (id: number, value: string) => {
    setPrices(prices.map((price) => (price.id === id ? { ...price, duration: value } : price)))
  }

  const savePrices = () => {
    // Fiyatları localStorage'a kaydet
    localStorage.setItem("dataRecoveryPrices", JSON.stringify(prices))

    // Kullanıcıya bildirim göster
    toast({
      title: "Fiyatlar kaydedildi",
      description: "Veri kurtarma fiyatları başarıyla güncellendi.",
    })
  }

  if (!isLoggedIn) {
    return null // Yönlendirme yapılırken boş sayfa göster
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Veri Kurtarma Fiyatları</h1>
          </div>
          <Button onClick={savePrices}>
            <Save className="mr-2 h-4 w-4" />
            Değişiklikleri Kaydet
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fiyat Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Hizmet</TableHead>
                  <TableHead>Fiyat (TL)</TableHead>
                  <TableHead>Tahmini Süre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((price) => (
                  <TableRow key={price.id}>
                    <TableCell className="font-medium">{price.model}</TableCell>
                    <TableCell>
                      <Input
                        value={price.price}
                        onChange={(e) => handlePriceChange(price.id, e.target.value)}
                        className="w-32"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={price.duration}
                        onChange={(e) => handleDurationChange(price.id, e.target.value)}
                        className="w-32"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
