"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Smartphone, Battery, Database } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Helper function to convert model name to model ID
const getModelId = (modelName) => {
  const modelMap = {
    "iPhone 16 Pro Max": "iphone-16-pro-max",
    "iPhone 16 Pro": "iphone-16-pro",
    "iPhone 16 Plus": "iphone-16-plus",
    "iPhone 16": "iphone-16",
    "iPhone 15 Pro Max": "iphone-15-pro-max",
    "iPhone 15 Pro": "iphone-15-pro",
    "iPhone 15 Plus": "iphone-15-plus",
    "iPhone 15": "iphone-15",
    "iPhone 14 Pro Max": "iphone-14-pro-max",
    "iPhone 14 Pro": "iphone-14-pro",
    "iPhone 14 Plus": "iphone-14-plus",
    "iPhone 14": "iphone-14",
    "iPhone 13 Pro Max": "iphone-13-pro-max",
    "iPhone 13 Pro": "iphone-13-pro",
    "iPhone 13": "iphone-13",
    "iPhone 13 Mini": "iphone-13-mini",
    "iPhone 12 Pro Max": "iphone-12-pro-max",
    "iPhone 12 Pro": "iphone-12-pro",
    "iPhone 12": "iphone-12",
    "iPhone 12 Mini": "iphone-12-mini",
    "iPhone 11 Pro Max": "iphone-11-pro-max",
    "iPhone 11 Pro": "iphone-11-pro",
    "iPhone 11": "iphone-11",
    "iPhone XR": "iphone-xr",
    "iPhone XS Max": "iphone-xs-max",
    "iPhone XS": "iphone-xs",
    "iPhone X": "iphone-x",
    "iPhone 8 Plus": "iphone-8-plus",
    "iPhone 8": "iphone-8",
    "iPhone 7 Plus": "iphone-7-plus",
    "iPhone 7": "iphone-7",
    "iPhone SE 2022": "iphone-se-2022",
    "iPhone SE 2020": "iphone-se-2020",
  }

  return modelMap[modelName] || null
}

// Helper function to convert service name to service ID
const getServiceId = (serviceName) => {
  const serviceMap = {
    "Standart Veri Kurtarma": "standart-veri-kurtarma",
    "Acil Veri Kurtarma": "acil-veri-kurtarma",
    "Suya Düşmüş Cihaz": "suya-dusmus-cihaz",
    "Yazılımsal Sorunlar": "yazilimsal-sorunlar",
    "Donanımsal Sorunlar": "donanimsal-sorunlar",
    "Şifreli Cihazlar": "sifreli-cihazlar",
  }

  return serviceMap[serviceName] || null
}

export default function DealerPricesPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dealerDiscount, setDealerDiscount] = useState("20")

  // Screen repair prices
  const [screenPrices, setScreenPrices] = useState([
    { id: 1, model: "iPhone 15 Pro Max", regularPrice: "3200", dealerPrice: "2560" },
    { id: 2, model: "iPhone 15 Pro", regularPrice: "2900", dealerPrice: "2320" },
    { id: 3, model: "iPhone 15 Plus", regularPrice: "2700", dealerPrice: "2160" },
    { id: 4, model: "iPhone 15", regularPrice: "2500", dealerPrice: "2000" },
    { id: 5, model: "iPhone 14 Pro Max", regularPrice: "2800", dealerPrice: "2240" },
    { id: 6, model: "iPhone 14 Pro", regularPrice: "2600", dealerPrice: "2080" },
    { id: 7, model: "iPhone 14", regularPrice: "2400", dealerPrice: "1920" },
    { id: 8, model: "iPhone 13 Pro Max", regularPrice: "2500", dealerPrice: "2000" },
    { id: 9, model: "iPhone 13 Pro", regularPrice: "2300", dealerPrice: "1840" },
    { id: 10, model: "iPhone 13", regularPrice: "2100", dealerPrice: "1680" },
    { id: 11, model: "iPhone 12 Pro Max", regularPrice: "2200", dealerPrice: "1760" },
    { id: 12, model: "iPhone 12 Pro", regularPrice: "2000", dealerPrice: "1600" },
    { id: 13, model: "iPhone 12", regularPrice: "1800", dealerPrice: "1440" },
  ])

  // Battery replacement prices
  const [batteryPrices, setBatteryPrices] = useState([
    { id: 1, model: "iPhone 15 Pro Max", regularPrice: "1800", dealerPrice: "1440" },
    { id: 2, model: "iPhone 15 Pro", regularPrice: "1700", dealerPrice: "1360" },
    { id: 3, model: "iPhone 15 Plus", regularPrice: "1600", dealerPrice: "1280" },
    { id: 4, model: "iPhone 15", regularPrice: "1500", dealerPrice: "1200" },
    { id: 5, model: "iPhone 14 Pro Max", regularPrice: "1600", dealerPrice: "1280" },
    { id: 6, model: "iPhone 14 Pro", regularPrice: "1500", dealerPrice: "1200" },
    { id: 7, model: "iPhone 14", regularPrice: "1400", dealerPrice: "1120" },
    { id: 8, model: "iPhone 13 Pro Max", regularPrice: "1500", dealerPrice: "1200" },
    { id: 9, model: "iPhone 13 Pro", regularPrice: "1400", dealerPrice: "1120" },
    { id: 10, model: "iPhone 13", regularPrice: "1300", dealerPrice: "1040" },
    { id: 11, model: "iPhone 12 Pro Max", regularPrice: "1400", dealerPrice: "1120" },
    { id: 12, model: "iPhone 12 Pro", regularPrice: "1300", dealerPrice: "1040" },
    { id: 13, model: "iPhone 12", regularPrice: "1200", dealerPrice: "960" },
  ])

  // Data recovery prices
  const [dataPrices, setDataPrices] = useState([
    { id: 1, model: "Standart Veri Kurtarma", regularPrice: "1500", dealerPrice: "1200" },
    { id: 2, model: "Acil Veri Kurtarma", regularPrice: "2500", dealerPrice: "2000" },
    { id: 3, model: "Suya Düşmüş Cihaz", regularPrice: "2000", dealerPrice: "1600" },
    { id: 4, model: "Yazılımsal Sorunlar", regularPrice: "1000", dealerPrice: "800" },
    { id: 5, model: "Donanımsal Sorunlar", regularPrice: "2000", dealerPrice: "1600" },
    { id: 6, model: "Şifreli Cihazlar", regularPrice: "2500", dealerPrice: "2000" },
  ])

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
      return
    }

    // Load saved prices from localStorage if available
    const savedScreenPrices = localStorage.getItem("dealerScreenPrices")
    if (savedScreenPrices) {
      setScreenPrices(JSON.parse(savedScreenPrices))
    }

    const savedBatteryPrices = localStorage.getItem("dealerBatteryPrices")
    if (savedBatteryPrices) {
      setBatteryPrices(JSON.parse(savedBatteryPrices))
    }

    const savedDataPrices = localStorage.getItem("dealerDataPrices")
    if (savedDataPrices) {
      setDataPrices(JSON.parse(savedDataPrices))
    }

    const savedDiscount = localStorage.getItem("dealerDiscount")
    if (savedDiscount) {
      setDealerDiscount(savedDiscount)
    }
  }, [router])

  const handleRegularPriceChange = (type: string, id: number, value: string) => {
    const numValue = value.replace(/\D/g, "")

    if (type === "screen") {
      const newPrices = screenPrices.map((price) => {
        if (price.id === id) {
          const dealerPrice = Math.round(Number(numValue) * (1 - Number(dealerDiscount) / 100))
          return { ...price, regularPrice: numValue, dealerPrice: dealerPrice.toString() }
        }
        return price
      })
      setScreenPrices(newPrices)
    } else if (type === "battery") {
      const newPrices = batteryPrices.map((price) => {
        if (price.id === id) {
          const dealerPrice = Math.round(Number(numValue) * (1 - Number(dealerDiscount) / 100))
          return { ...price, regularPrice: numValue, dealerPrice: dealerPrice.toString() }
        }
        return price
      })
      setBatteryPrices(newPrices)
    } else if (type === "data") {
      const newPrices = dataPrices.map((price) => {
        if (price.id === id) {
          const dealerPrice = Math.round(Number(numValue) * (1 - Number(dealerDiscount) / 100))
          return { ...price, regularPrice: numValue, dealerPrice: dealerPrice.toString() }
        }
        return price
      })
      setDataPrices(newPrices)
    }
  }

  const handleDealerPriceChange = (type: string, id: number, value: string) => {
    const numValue = value.replace(/\D/g, "")

    if (type === "screen") {
      setScreenPrices(screenPrices.map((price) => (price.id === id ? { ...price, dealerPrice: numValue } : price)))
    } else if (type === "battery") {
      setBatteryPrices(batteryPrices.map((price) => (price.id === id ? { ...price, dealerPrice: numValue } : price)))
    } else if (type === "data") {
      setDataPrices(dataPrices.map((price) => (price.id === id ? { ...price, dealerPrice: numValue } : price)))
    }
  }

  const handleDiscountChange = (value: string) => {
    const numValue = value.replace(/\D/g, "")
    setDealerDiscount(numValue)

    // Update all dealer prices based on new discount
    const newScreenPrices = screenPrices.map((price) => {
      const dealerPrice = Math.round(Number(price.regularPrice) * (1 - Number(numValue) / 100))
      return { ...price, dealerPrice: dealerPrice.toString() }
    })
    setScreenPrices(newScreenPrices)

    const newBatteryPrices = batteryPrices.map((price) => {
      const dealerPrice = Math.round(Number(price.regularPrice) * (1 - Number(numValue) / 100))
      return { ...price, dealerPrice: dealerPrice.toString() }
    })
    setBatteryPrices(newBatteryPrices)

    const newDataPrices = dataPrices.map((price) => {
      const dealerPrice = Math.round(Number(price.regularPrice) * (1 - Number(numValue) / 100))
      return { ...price, dealerPrice: dealerPrice.toString() }
    })
    setDataPrices(newDataPrices)
  }

  const savePrices = () => {
    // Save all prices to localStorage
    localStorage.setItem("dealerScreenPrices", JSON.stringify(screenPrices))
    localStorage.setItem("dealerBatteryPrices", JSON.stringify(batteryPrices))
    localStorage.setItem("dealerDataPrices", JSON.stringify(dataPrices))
    localStorage.setItem("dealerDiscount", dealerDiscount)

    // Save in the format used by the dealer panel
    // Screen prices
    const dealerScreenPrices = {}
    screenPrices.forEach((price) => {
      const modelId = getModelId(price.model)
      if (modelId) {
        dealerScreenPrices[modelId] = {
          originalWarned: price.dealerPrice,
        }
      }
    })
    localStorage.setItem("dealer_ekran-degisimiPrices", JSON.stringify(dealerScreenPrices))

    // Battery prices
    const dealerBatteryPrices = {}
    batteryPrices.forEach((price) => {
      const modelId = getModelId(price.model)
      if (modelId) {
        dealerBatteryPrices[modelId] = {
          originalWarned: price.dealerPrice,
        }
      }
    })
    localStorage.setItem("dealer_batarya-degisimiPrices", JSON.stringify(dealerBatteryPrices))

    // Data recovery prices
    const dealerDataRecoveryPrices = {}
    dataPrices.forEach((price) => {
      const serviceId = getServiceId(price.model)
      if (serviceId) {
        dealerDataRecoveryPrices[serviceId] = {
          original: price.dealerPrice,
        }
      }
    })
    localStorage.setItem("dealer_veri-kurtarmaPrices", JSON.stringify(dealerDataRecoveryPrices))

    toast({
      title: "Fiyatlar kaydedildi",
      description: "Bayi fiyatları başarıyla güncellendi.",
    })
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Bayi Fiyat Yönetimi</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Bayi İndirim Oranı (%)</span>
              <Input value={dealerDiscount} onChange={(e) => handleDiscountChange(e.target.value)} className="w-20" />
            </div>
            <Button onClick={savePrices}>
              <Save className="mr-2 h-4 w-4" />
              Değişiklikleri Kaydet
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bayi Fiyat Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="screen">
              <TabsList className="mb-6">
                <TabsTrigger value="screen">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Ekran Tamiri
                </TabsTrigger>
                <TabsTrigger value="battery">
                  <Battery className="mr-2 h-4 w-4" />
                  Batarya Değişimi
                </TabsTrigger>
                <TabsTrigger value="data">
                  <Database className="mr-2 h-4 w-4" />
                  Veri Kurtarma
                </TabsTrigger>
              </TabsList>

              <TabsContent value="screen">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Model</TableHead>
                      <TableHead>Normal Fiyat (TL)</TableHead>
                      <TableHead>Bayi Fiyatı (TL)</TableHead>
                      <TableHead>İndirim</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {screenPrices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.model}</TableCell>
                        <TableCell>
                          <Input
                            value={price.regularPrice}
                            onChange={(e) => handleRegularPriceChange("screen", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={price.dealerPrice}
                            onChange={(e) => handleDealerPriceChange("screen", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          {Math.round((1 - Number(price.dealerPrice) / Number(price.regularPrice)) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="battery">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Model</TableHead>
                      <TableHead>Normal Fiyat (TL)</TableHead>
                      <TableHead>Bayi Fiyatı (TL)</TableHead>
                      <TableHead>İndirim</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batteryPrices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.model}</TableCell>
                        <TableCell>
                          <Input
                            value={price.regularPrice}
                            onChange={(e) => handleRegularPriceChange("battery", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={price.dealerPrice}
                            onChange={(e) => handleDealerPriceChange("battery", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          {Math.round((1 - Number(price.dealerPrice) / Number(price.regularPrice)) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="data">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Hizmet</TableHead>
                      <TableHead>Normal Fiyat (TL)</TableHead>
                      <TableHead>Bayi Fiyatı (TL)</TableHead>
                      <TableHead>İndirim</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataPrices.map((price) => (
                      <TableRow key={price.id}>
                        <TableCell className="font-medium">{price.model}</TableCell>
                        <TableCell>
                          <Input
                            value={price.regularPrice}
                            onChange={(e) => handleRegularPriceChange("data", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            value={price.dealerPrice}
                            onChange={(e) => handleDealerPriceChange("data", price.id, e.target.value)}
                            className="w-32"
                          />
                        </TableCell>
                        <TableCell>
                          {Math.round((1 - Number(price.dealerPrice) / Number(price.regularPrice)) * 100)}%
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Toaster />
      </div>
    </div>
  )
}
