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

// Tamir hizmetleri ve fiyatları
const repairServices = {
  "ekran-degisimi": {
    name: "Ekran Değişimi",
    options: [
      { name: "Orijinal Uyarılı Ekran", priceKey: "originalWarned" },
      { name: "Orijinal Uyarısız Ekran", priceKey: "originalUnwarned" },
      { name: "Orijinal Servis Ekran", priceKey: "originalService" },
      { name: "Yan Sanayi Ekran", priceKey: "aftermarket" },
    ],
  },
  "batarya-degisimi": {
    name: "Batarya Değişimi",
    options: [
      { name: "Uyarılı Batarya", priceKey: "originalWarned" },
      { name: "Uyarısız Batarya", priceKey: "originalUnwarned" },
      { name: "Orijinal Servis Batarya", priceKey: "originalService" },
    ],
  },
  "on-kamera-degisimi": {
    name: "Ön Kamera Değişimi",
    options: [
      { name: "Orijinal Ön Kamera", priceKey: "original" },
      { name: "Orijinal Aktarımlı Ön Kamera", priceKey: "originalTransfer" },
    ],
  },
  "arka-kamera-degisimi": {
    name: "Arka Kamera Değişimi",
    options: [
      { name: "Orijinal Uyarılı Arka Kamera", priceKey: "originalWarned" },
      { name: "Orijinal Uyarısız Arka Kamera", priceKey: "originalUnwarned" },
      { name: "Orijinal Servis Arka Kamera", priceKey: "originalService" },
    ],
  },
  "arka-cam-degisimi": {
    name: "Arka Cam Değişimi",
    options: [
      { name: "Orijinal Arka Cam", priceKey: "original" },
      { name: "Orijinal Servis Arka Cam", priceKey: "originalService" },
    ],
  },
  "on-cam-degisimi": {
    name: "Ön Cam Değişimi",
    options: [{ name: "Ön Cam", priceKey: "original" }],
  },
  "kasa-degisimi": {
    name: "Kasa Değişimi",
    options: [{ name: "Kasa Değişimi", priceKey: "original" }],
  },
  "sarj-soketi-degisimi": {
    name: "Şarj Soketi Değişimi",
    options: [{ name: "Şarj Soketi Değişimi", priceKey: "original" }],
  },
  "ac-kapat-tusu-ve-flas-degisimi": {
    name: "Aç Kapat Tuşu ve Flaş Değişimi",
    options: [{ name: "Aç Kapat Tuşu ve Flaş Değişimi", priceKey: "original" }],
  },
  "titresim-motoru-degisimi": {
    name: "Titreşim Motoru Değişimi",
    options: [{ name: "Titreşim Motoru Değişimi", priceKey: "original" }],
  },
  "ic-kulaklik-degisimi": {
    name: "İç Kulaklık (Ahize) Değişimi",
    options: [{ name: "İç Kulaklık (Ahize) Değişimi", priceKey: "original" }],
  },
  "hoparlor-degisimi": {
    name: "Hoparlör Değişimi",
    options: [{ name: "Hoparlör Değişimi", priceKey: "original" }],
  },
  "kamera-cami-degisimi": {
    name: "Kamera Camı Değişimi",
    options: [{ name: "Kamera Camı Değişimi", priceKey: "original" }],
  },
  "proximity-isik-sensoru-degisimi": {
    name: "Proximity Işık Sensörü Değişimi",
    options: [{ name: "Proximity Işık Sensörü Değişimi", priceKey: "original" }],
  },
  "face-id-onarimi": {
    name: "Face ID (Yüz Tanıma) Onarımı",
    options: [{ name: "Face ID (Yüz Tanıma) Onarımı", priceKey: "original" }],
  },
  "nfc-degisimi": {
    name: "NFC Değişimi",
    options: [{ name: "NFC Değişimi", priceKey: "original" }],
  },
  "detayli-genel-temizlik": {
    name: "Detaylı Genel Temizlik",
    options: [{ name: "Detaylı Genel Temizlik", priceKey: "original" }],
  },
  "ses-ve-sessiz-alma-tusu-degisimi": {
    name: "Ses ve Sessiz Alma Tuşu Değişimi",
    options: [{ name: "Ses ve Sessiz Alma Tuşu Değişimi", priceKey: "original" }],
  },
  "truedepth-kamera-degisimi": {
    name: "Truedepth Kamera Değişimi",
    options: [{ name: "Truedepth Kamera Değişimi", priceKey: "original" }],
  },
  "lidar-sensor-degisimi": {
    name: "Lidar Sensör Değişimi",
    options: [{ name: "Lidar Sensör Değişimi", priceKey: "original" }],
  },
  "veri-kurtarma": {
    name: "Veri Kurtarma",
    options: [{ name: "Veri Kurtarma", priceKey: "original" }],
  },
  "sivi-temas": {
    name: "Sıvı Temas",
    options: [{ name: "Sıvı Temas Onarımı", priceKey: "original" }],
  },
  "acilmiyor-sorunu": {
    name: "Açılmıyor Sorunu",
    options: [{ name: "Açılmıyor Sorunu Onarımı", priceKey: "original" }],
  },
  "diger-sorunlar": {
    name: "Diğer Sorunlar",
    options: [{ name: "Diğer Sorunlar", priceKey: "original" }],
  },
  "anakart-onarimi": {
    name: "Anakart Onarımı",
    options: [{ name: "Anakart Onarımı", priceKey: "original" }],
  },
}

// iPhone modelleri - Tüm modelleri içerecek şekilde güncellenmiş liste
const iPhoneModels = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max" },
  { id: "iphone-16-pro", name: "iPhone 16 Pro" },
  { id: "iphone-16-plus", name: "iPhone 16 Plus" },
  { id: "iphone-16", name: "iPhone 16" },
  { id: "iphone-15-pro-max", name: "iPhone 15 Pro Max" },
  { id: "iphone-15-pro", name: "iPhone 15 Pro" },
  { id: "iphone-15-plus", name: "iPhone 15 Plus" },
  { id: "iphone-15", name: "iPhone 15" },
  { id: "iphone-14-pro-max", name: "iPhone 14 Pro Max" },
  { id: "iphone-14-pro", name: "iPhone 14 Pro" },
  { id: "iphone-14-plus", name: "iPhone 14 Plus" },
  { id: "iphone-14", name: "iPhone 14" },
  { id: "iphone-13-pro-max", name: "iPhone 13 Pro Max" },
  { id: "iphone-13-pro", name: "iPhone 13 Pro" },
  { id: "iphone-13", name: "iPhone 13" },
  { id: "iphone-13-mini", name: "iPhone 13 Mini" },
  { id: "iphone-12-pro-max", name: "iPhone 12 Pro Max" },
  { id: "iphone-12-pro", name: "iPhone 12 Pro" },
  { id: "iphone-12", name: "iPhone 12" },
  { id: "iphone-12-mini", name: "iPhone 12 Mini" },
  { id: "iphone-11-pro-max", name: "iPhone 11 Pro Max" },
  { id: "iphone-11-pro", name: "iPhone 11 Pro" },
  { id: "iphone-11", name: "iPhone 11" },
  { id: "iphone-xr", name: "iPhone XR" },
  { id: "iphone-xs-max", name: "iPhone XS Max" },
  { id: "iphone-xs", name: "iPhone XS" },
  { id: "iphone-x", name: "iPhone X" },
  { id: "iphone-8-plus", name: "iPhone 8 Plus" },
  { id: "iphone-8", name: "iPhone 8" },
  { id: "iphone-7-plus", name: "iPhone 7 Plus" },
  { id: "iphone-7", name: "iPhone 7" },
  { id: "iphone-se-2022", name: "iPhone SE 2022" },
  { id: "iphone-se-2020", name: "iPhone SE 2020" },
]

// Tüm modeller için başlangıç fiyat verileri
const generateInitialPrices = () => {
  const prices: Record<string, Record<string, string>> = {}

  // Ekran değişimi için örnek fiyatlar
  const screenPrices = {
    "iphone-16-pro-max": {
      originalWarned: "14490",
      originalUnwarned: "14990",
      originalService: "16990",
      aftermarket: "7490",
    },
    "iphone-16-pro": {
      originalWarned: "13990",
      originalUnwarned: "14490",
      originalService: "16490",
      aftermarket: "7290",
    },
    "iphone-16-plus": {
      originalWarned: "13490",
      originalUnwarned: "13990",
      originalService: "15990",
      aftermarket: "6990",
    },
    "iphone-16": { originalWarned: "12990", originalUnwarned: "13490", originalService: "15490", aftermarket: "6790" },
    "iphone-15-pro-max": {
      originalWarned: "13490",
      originalUnwarned: "13990",
      originalService: "15990",
      aftermarket: "6990",
    },
    "iphone-15-pro": {
      originalWarned: "12990",
      originalUnwarned: "13490",
      originalService: "15490",
      aftermarket: "6790",
    },
    "iphone-15-plus": {
      originalWarned: "12490",
      originalUnwarned: "12990",
      originalService: "14990",
      aftermarket: "6590",
    },
    "iphone-15": { originalWarned: "11990", originalUnwarned: "12490", originalService: "14490", aftermarket: "6390" },
    "iphone-14-pro-max": {
      originalWarned: "12490",
      originalUnwarned: "12990",
      originalService: "14990",
      aftermarket: "6590",
    },
    "iphone-14-pro": {
      originalWarned: "11990",
      originalUnwarned: "12490",
      originalService: "14490",
      aftermarket: "6390",
    },
    "iphone-14-plus": {
      originalWarned: "11490",
      originalUnwarned: "11990",
      originalService: "13990",
      aftermarket: "6190",
    },
    "iphone-14": { originalWarned: "10990", originalUnwarned: "11490", originalService: "13490", aftermarket: "5990" },
    "iphone-13-pro-max": {
      originalWarned: "11490",
      originalUnwarned: "11990",
      originalService: "13990",
      aftermarket: "6190",
    },
    "iphone-13-pro": {
      originalWarned: "10990",
      originalUnwarned: "11490",
      originalService: "13490",
      aftermarket: "5990",
    },
    "iphone-13": { originalWarned: "10490", originalUnwarned: "10990", originalService: "12990", aftermarket: "5790" },
    "iphone-13-mini": {
      originalWarned: "9990",
      originalUnwarned: "10490",
      originalService: "12490",
      aftermarket: "5590",
    },
    "iphone-12-pro-max": {
      originalWarned: "10490",
      originalUnwarned: "10990",
      originalService: "12990",
      aftermarket: "5790",
    },
    "iphone-12-pro": {
      originalWarned: "9990",
      originalUnwarned: "10490",
      originalService: "12490",
      aftermarket: "5590",
    },
    "iphone-12": { originalWarned: "9490", originalUnwarned: "9990", originalService: "11990", aftermarket: "5390" },
    "iphone-12-mini": {
      originalWarned: "8990",
      originalUnwarned: "9490",
      originalService: "11490",
      aftermarket: "5190",
    },
    "iphone-11-pro-max": {
      originalWarned: "9490",
      originalUnwarned: "9990",
      originalService: "11990",
      aftermarket: "5390",
    },
    "iphone-11-pro": {
      originalWarned: "8990",
      originalUnwarned: "9490",
      originalService: "11490",
      aftermarket: "5190",
    },
    "iphone-11": { originalWarned: "8490", originalUnwarned: "8990", originalService: "10990", aftermarket: "4990" },
    "iphone-xr": { originalWarned: "7990", originalUnwarned: "8490", originalService: "10490", aftermarket: "4790" },
    "iphone-xs-max": {
      originalWarned: "8490",
      originalUnwarned: "8990",
      originalService: "10990",
      aftermarket: "4990",
    },
    "iphone-xs": { originalWarned: "7990", originalUnwarned: "8490", originalService: "10490", aftermarket: "4790" },
    "iphone-x": { originalWarned: "7490", originalUnwarned: "7990", originalService: "9990", aftermarket: "4590" },
    "iphone-8-plus": { originalWarned: "6990", originalUnwarned: "7490", originalService: "9490", aftermarket: "4390" },
    "iphone-8": { originalWarned: "6490", originalUnwarned: "6990", originalService: "8990", aftermarket: "4190" },
    "iphone-7-plus": { originalWarned: "5990", originalUnwarned: "6490", originalService: "8490", aftermarket: "3990" },
    "iphone-7": { originalWarned: "5490", originalUnwarned: "5990", originalService: "7990", aftermarket: "3790" },
    "iphone-se-2022": {
      originalWarned: "6990",
      originalUnwarned: "7490",
      originalService: "9490",
      aftermarket: "4390",
    },
    "iphone-se-2020": {
      originalWarned: "6490",
      originalUnwarned: "6990",
      originalService: "8990",
      aftermarket: "4190",
    },
  }

  // Batarya değişimi için örnek fiyatlar
  const batteryPrices = {
    "iphone-16-pro-max": { originalWarned: "2990", originalUnwarned: "3490", originalService: "4190" },
    "iphone-16-pro": { originalWarned: "2890", originalUnwarned: "3390", originalService: "4090" },
    "iphone-16-plus": { originalWarned: "2790", originalUnwarned: "3290", originalService: "3990" },
    "iphone-16": { originalWarned: "2690", originalUnwarned: "3190", originalService: "3890" },
    "iphone-15-pro-max": { originalWarned: "2890", originalUnwarned: "3390", originalService: "4090" },
    "iphone-15-pro": { originalWarned: "2790", originalUnwarned: "3290", originalService: "3990" },
    "iphone-15-plus": { originalWarned: "2690", originalUnwarned: "3190", originalService: "3890" },
    "iphone-15": { originalWarned: "2590", originalUnwarned: "3090", originalService: "3790" },
    "iphone-14-pro-max": { originalWarned: "2790", originalUnwarned: "3290", originalService: "3990" },
    "iphone-14-pro": { originalWarned: "2690", originalUnwarned: "3190", originalService: "3890" },
    "iphone-14-plus": { originalWarned: "2590", originalUnwarned: "3090", originalService: "3790" },
    "iphone-14": { originalWarned: "2490", originalUnwarned: "2990", originalService: "3690" },
    "iphone-13-pro-max": { originalWarned: "2690", originalUnwarned: "3190", originalService: "3890" },
    "iphone-13-pro": { originalWarned: "2590", originalUnwarned: "3090", originalService: "3790" },
    "iphone-13": { originalWarned: "2490", originalUnwarned: "2990", originalService: "3690" },
    "iphone-13-mini": { originalWarned: "2390", originalUnwarned: "2890", originalService: "3590" },
    "iphone-12-pro-max": { originalWarned: "2590", originalUnwarned: "3090", originalService: "3790" },
    "iphone-12-pro": { originalWarned: "2490", originalUnwarned: "2990", originalService: "3690" },
    "iphone-12": { originalWarned: "2390", originalUnwarned: "2890", originalService: "3590" },
    "iphone-12-mini": { originalWarned: "2290", originalUnwarned: "2790", originalService: "3490" },
    "iphone-11-pro-max": { originalWarned: "2490", originalUnwarned: "2990", originalService: "3690" },
    "iphone-11-pro": { originalWarned: "2390", originalUnwarned: "2890", originalService: "3590" },
    "iphone-11": { originalWarned: "2290", originalUnwarned: "2790", originalService: "3490" },
    "iphone-xr": { originalWarned: "2190", originalUnwarned: "2690", originalService: "3390" },
    "iphone-xs-max": { originalWarned: "2390", originalUnwarned: "2890", originalService: "3590" },
    "iphone-xs": { originalWarned: "2290", originalUnwarned: "2790", originalService: "3490" },
    "iphone-x": { originalWarned: "2190", originalUnwarned: "2690", originalService: "3390" },
    "iphone-8-plus": { originalWarned: "2090", originalUnwarned: "2590", originalService: "3290" },
    "iphone-8": { originalWarned: "1990", originalUnwarned: "2490", originalService: "3190" },
    "iphone-7-plus": { originalWarned: "1890", originalUnwarned: "2390", originalService: "3090" },
    "iphone-7": { originalWarned: "1790", originalUnwarned: "2290", originalService: "2990" },
    "iphone-se-2022": { originalWarned: "2090", originalUnwarned: "2590", originalService: "3290" },
    "iphone-se-2020": { originalWarned: "1990", originalUnwarned: "2490", originalService: "3190" },
  }

  // Diğer tamir hizmetleri için örnek fiyatlar
  const otherPrices: Record<string, Record<string, string>> = {}

  iPhoneModels.forEach((model) => {
    // Diğer tamir hizmetleri için varsayılan fiyatlar
    otherPrices[model.id] = {
      original: "4990",
      originalTransfer: "5990",
      originalWarned: "4990",
      originalUnwarned: "5490",
      originalService: "6990",
      aftermarket: "3990",
    }
  })

  // Tüm fiyatları birleştir
  iPhoneModels.forEach((model) => {
    prices[model.id] = {
      ...otherPrices[model.id],
      ...(screenPrices[model.id as keyof typeof screenPrices] || {}),
      ...(batteryPrices[model.id as keyof typeof batteryPrices] || {}),
    }
  })

  return prices
}

// Add a helper function to check if a model is older than iPhone 11
function isModelOlderThanIPhone11(modelId: string): boolean {
  const olderModels = [
    "iphone-xr",
    "iphone-xs-max",
    "iphone-xs",
    "iphone-x",
    "iphone-8-plus",
    "iphone-8",
    "iphone-7-plus",
    "iphone-7",
    "iphone-se-2022",
    "iphone-se-2020",
  ]
  return olderModels.includes(modelId)
}

// Add the isModelOlderThanIPhone12 function
function isModelOlderThanIPhone12(modelId: string): boolean {
  const olderModels = [
    "iphone-11-pro-max",
    "iphone-11-pro",
    "iphone-11",
    "iphone-xr",
    "iphone-xs-max",
    "iphone-xs",
    "iphone-x",
    "iphone-8-plus",
    "iphone-8",
    "iphone-7-plus",
    "iphone-7",
    "iphone-se-2022",
    "iphone-se-2020",
  ]
  return olderModels.includes(modelId)
}

export default function ServicePricePage({ params }: { params: { service: string } }) {
  const [prices, setPrices] = useState<Record<string, Record<string, string>>>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const serviceId = params.service
  const serviceInfo = repairServices[serviceId as keyof typeof repairServices]

  useEffect(() => {
    // Oturum kontrolü
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }

    // LocalStorage'dan kaydedilmiş fiyatları al (eğer varsa)
    const savedPrices = localStorage.getItem(`${serviceId}Prices`)
    if (savedPrices) {
      setPrices(JSON.parse(savedPrices))
    } else {
      // Kaydedilmiş fiyat yoksa başlangıç fiyatlarını kullan
      const initialPrices = generateInitialPrices()
      setPrices(initialPrices)
      // Başlangıç fiyatlarını localStorage'a kaydet
      localStorage.setItem(`${serviceId}Prices`, JSON.stringify(initialPrices))
    }
  }, [router, serviceId])

  const handlePriceChange = (modelId: string, priceKey: string, value: string) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [modelId]: {
        ...prevPrices[modelId],
        [priceKey]: value,
      },
    }))
  }

  // Fiyat değişikliklerini anında uygula
  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      // Fiyat değişikliklerini localStorage'a geçici olarak kaydet
      const tempStorageKey = `temp_${serviceId}Prices`
      localStorage.setItem(tempStorageKey, JSON.stringify(prices))

      // 500ms sonra temizle (gereksiz depolama önlemek için)
      const timer = setTimeout(() => {
        localStorage.removeItem(tempStorageKey)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [prices, serviceId])

  const savePrices = () => {
    // Fiyatları localStorage'a kaydet
    localStorage.setItem(`${serviceId}Prices`, JSON.stringify(prices))

    // Diğer sekmelere/pencerelere değişikliği bildir
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: `${serviceId}Prices`,
        newValue: JSON.stringify(prices),
      }),
    )

    // Kullanıcıya bildirim göster
    toast({
      title: "Fiyatlar kaydedildi",
      description: `${serviceInfo?.name} fiyatları başarıyla güncellendi.`,
    })
  }

  if (!isLoggedIn || !serviceInfo) {
    return null // Yönlendirme yapılırken veya servis bulunamadığında boş sayfa göster
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard/repair-services" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{serviceInfo.name} Fiyatları</h1>
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
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Model</TableHead>
                    {serviceInfo.options.map((option) => (
                      <TableHead key={option.priceKey}>{option.name}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {iPhoneModels.map((model) => {
                    const isOlderModel = [
                      "iPhone XR",
                      "iPhone XS Max",
                      "iPhone XS",
                      "iPhone X",
                      "iPhone 8 Plus",
                      "iPhone 8",
                      "iPhone 7 Plus",
                      "iPhone 7",
                      "iPhone SE 2022",
                      "iPhone SE 2020",
                    ].includes(model.name)

                    return (
                      <TableRow key={model.id}>
                        <TableCell className="font-medium">{model.name}</TableCell>
                        {serviceInfo.options.map((option) => {
                          // Skip rendering the originalUnwarned input for older models in screen repair
                          if (
                            isOlderModel &&
                            params.service === "ekran-degisimi" &&
                            option.priceKey === "originalWarned"
                          ) {
                            return (
                              <TableCell key={option.priceKey}>
                                <Input value="N/A" disabled className="w-32 bg-gray-100" />
                              </TableCell>
                            )
                          }

                          // Change the display name for older models in the admin panel
                          let displayName = option.name
                          if (
                            isModelOlderThanIPhone12(model.id) &&
                            params.service === "arka-kamera-degisimi" &&
                            option.name === "Orijinal Uyarılı Arka Kamera"
                          ) {
                            displayName = "A Kalite Arka Kamera"
                          }

                          // For iPhone models older than iPhone 12, display "N/A" for all back camera options except "Orijinal Uyarısız Arka Kamera"
                          if (
                            isModelOlderThanIPhone12(model.id) &&
                            params.service === "arka-kamera-degisimi" &&
                            option.priceKey !== "originalUnwarned"
                          ) {
                            return (
                              <TableCell key={option.priceKey}>
                                <div className="mb-1 text-xs text-gray-500">{displayName}</div>
                                <Input value="N/A" disabled className="w-32 bg-gray-100" />
                              </TableCell>
                            )
                          }

                          return (
                            <TableCell key={option.priceKey}>
                              <div className="mb-1 text-xs text-gray-500">{displayName}</div>
                              <Input
                                value={prices[model.id]?.[option.priceKey] || ""}
                                onChange={(e) => handlePriceChange(model.id, option.priceKey, e.target.value)}
                                className="w-32"
                              />
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </div>
  )
}
