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

// Ekran tamiri fiyatları için örnek veri
const initialPrices = [
  { id: 1, model: "iPhone 15 Pro Max", price: "3200", duration: "1-2 saat" },
  { id: 2, model: "iPhone 15 Pro", price: "2900", duration: "1-2 saat" },
  { id: 3, model: "iPhone 15 Plus", price: "2700", duration: "1-2 saat" },
  { id: 4, model: "iPhone 15", price: "2500", duration: "1-2 saat" },
  { id: 5, model: "iPhone 14 Pro Max", price: "2800", duration: "1-2 saat" },
  { id: 6, model: "iPhone 14 Pro", price: "2600", duration: "1-2 saat" },
  { id: 7, model: "iPhone 14", price: "2400", duration: "1-2 saat" },
  { id: 8, model: "iPhone 13 Pro Max", price: "2500", duration: "1-2 saat" },
  { id: 9, model: "iPhone 13 Pro", price: "2300", duration: "1-2 saat" },
  { id: 10, model: "iPhone 13", price: "2100", duration: "1-2 saat" },
  { id: 11, model: "iPhone 12 Pro Max", price: "2200", duration: "1-2 saat" },
  { id: 12, model: "iPhone 12 Pro", price: "2000", duration: "1-2 saat" },
  { id: 13, model: "iPhone 12", price: "1800", duration: "1-2 saat" },
  { id: 14, model: "iPhone 11 Pro Max", price: "1900", duration: "1-2 saat" },
  { id: 15, model: "iPhone 11 Pro", price: "1700", duration: "1-2 saat" },
  { id: 16, model: "iPhone 11", price: "1600", duration: "1-2 saat" },
  { id: 17, model: "iPhone XS Max", price: "1700", duration: "1-2 saat" },
  { id: 18, model: "iPhone XS", price: "1500", duration: "1-2 saat" },
  { id: 19, model: "iPhone XR", price: "1400", duration: "1-2 saat" },
  { id: 20, model: "iPhone X", price: "1300", duration: "1-2 saat" },
]

export default function ScreenPricesPage() {
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
    const savedPrices = localStorage.getItem("screenPrices")
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
    localStorage.setItem("screenPrices", JSON.stringify(prices))

    // Kullanıcıya bildirim göster
    toast({
      title: "Fiyatlar kaydedildi",
      description: "Ekran tamiri fiyatları başarıyla güncellendi.",
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
            <h1 className="text-2xl font-bold">Ekran Tamiri Fiyatları</h1>
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
                  <TableHead className="w-[300px]">Model</TableHead>
                  <TableHead>Fiyat (TL)</TableHead>
                  <TableHead>Tahmini Süre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((price) => {
                  const isOlderModel = [
                    "iPhone XR",
                    "iPhone XS Max",
                    "iPhone XS",
                    "iPhone X",
                    "iPhone 8 Plus",
                    "iPhone 8",
                    "iPhone 7 Plus",
                    "iPhone 7",
                    "iPhone SE (2022)",
                    "iPhone SE (2020)",
                  ].includes(price.model)

                  return (
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
                      {/* Add a note for older models */}
                      {isOlderModel && (
                        <TableCell>
                          <span className="text-xs text-red-500">Uyarılı ekran bu model için mevcut değil</span>
                        </TableCell>
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
