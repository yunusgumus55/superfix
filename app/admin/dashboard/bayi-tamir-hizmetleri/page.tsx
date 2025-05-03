"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Smartphone, Battery, Database, Search, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

// Tamir kategorileri
const repairCategories = [
  {
    id: "screen-repairs",
    name: "Ekran ve Cam Değişimleri",
    icon: <Smartphone className="h-5 w-5" />,
    services: ["ekran-degisimi", "on-cam-degisimi", "arka-cam-degisimi", "kamera-cami-degisimi"],
  },
  {
    id: "battery-repairs",
    name: "Batarya ve Güç Sorunları",
    icon: <Battery className="h-5 w-5" />,
    services: ["batarya-degisimi", "sarj-soketi-degisimi", "acilmiyor-sorunu"],
  },
  {
    id: "data-recovery",
    name: "Veri Kurtarma",
    icon: <Database className="h-5 w-5" />,
    services: ["veri-kurtarma", "sivi-temas"],
  },
  {
    id: "other-repairs",
    name: "Diğer Tamir Hizmetleri",
    icon: <Smartphone className="h-5 w-5" />,
    services: [
      "on-kamera-degisimi",
      "arka-kamera-degisimi",
      "truedepth-kamera-degisimi",
      "kasa-degisimi",
      "ac-kapat-tusu-ve-flas-degisimi",
      "titresim-motoru-degisimi",
      "ic-kulaklik-degisimi",
      "hoparlor-degisimi",
      "proximity-isik-sensoru-degisimi",
      "face-id-onarimi",
      "nfc-degisimi",
      "detayli-genel-temizlik",
      "ses-ve-sessiz-alma-tusu-degisimi",
      "lidar-sensor-degisimi",
      "anakart-onarimi",
      "diger-sorunlar",
    ],
  },
]

// Helper function to check if a model is older than iPhone 11
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

// Helper function to check if a model is older than iPhone 12
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

export default function DealerRepairServicesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("screen-repairs")
  const [searchQuery, setSearchQuery] = useState("")
  const [dealerPrices, setDealerPrices] = useState<Record<string, Record<string, Record<string, string>>>>({})
  const [regularPrices, setRegularPrices] = useState<Record<string, Record<string, Record<string, string>>>>({})
  const [dealerDiscounts, setDealerDiscounts] = useState<Record<string, string>>({})
  const [filteredModels, setFilteredModels] = useState(iPhoneModels)
  const router = useRouter()

  const handleDiscountChange = (serviceId: string, value: string) => {
    const numValue = value.replace(/\D/g, "")

    // Update discount state
    setDealerDiscounts((prev) => ({
      ...prev,
      [serviceId]: numValue,
    }))

    // Recalculate dealer prices based on new discount
    if (regularPrices[serviceId]) {
      const discount = Number(numValue) / 100
      const updatedDealerPrices = { ...dealerPrices }

      Object.keys(regularPrices[serviceId]).forEach((modelId) => {
        if (!updatedDealerPrices[serviceId]) {
          updatedDealerPrices[serviceId] = {}
        }
        if (!updatedDealerPrices[serviceId][modelId]) {
          updatedDealerPrices[serviceId][modelId] = {}
        }

        Object.keys(regularPrices[serviceId][modelId]).forEach((priceKey) => {
          const regularPrice = regularPrices[serviceId][modelId][priceKey]
          if (regularPrice && !isNaN(Number(regularPrice))) {
            const dealerPrice = Math.round(Number(regularPrice) * (1 - discount))
            updatedDealerPrices[serviceId][modelId][priceKey] = dealerPrice.toString()
          } else {
            updatedDealerPrices[serviceId][modelId][priceKey] = regularPrice
          }
        })
      })

      setDealerPrices(updatedDealerPrices)
    }
  }

  useEffect(() => {
    // Oturum kontrolü
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
      return
    }

    // Load all service prices from localStorage
    const loadedRegularPrices: Record<string, Record<string, Record<string, string>>> = {}
    const loadedDealerPrices: Record<string, Record<string, Record<string, string>>> = {}
    const loadedDealerDiscounts: Record<string, string> = {}

    // Load dealer discounts
    Object.keys(repairServices).forEach((serviceId) => {
      const discount = localStorage.getItem(`dealer_discount_${serviceId}`) || "20"
      loadedDealerDiscounts[serviceId] = discount
    })
    setDealerDiscounts(loadedDealerDiscounts)

    // Load prices for all services
    Object.keys(repairServices).forEach((serviceId) => {
      const savedPrices = localStorage.getItem(`${serviceId}Prices`)
      if (savedPrices) {
        const parsedPrices = JSON.parse(savedPrices)

        // Initialize service in prices objects if not exists
        if (!loadedRegularPrices[serviceId]) {
          loadedRegularPrices[serviceId] = {}
          loadedDealerPrices[serviceId] = {}
        }

        // For each model, get the regular price and calculate dealer price
        Object.keys(parsedPrices).forEach((modelId) => {
          loadedRegularPrices[serviceId][modelId] = parsedPrices[modelId]

          // Initialize model in dealer prices if not exists
          if (!loadedDealerPrices[serviceId][modelId]) {
            loadedDealerPrices[serviceId][modelId] = {}
          }

          // Calculate dealer prices based on discount
          const discount = Number(loadedDealerDiscounts[serviceId]) / 100
          Object.keys(parsedPrices[modelId]).forEach((priceKey) => {
            const regularPrice = parsedPrices[modelId][priceKey]
            if (regularPrice && !isNaN(Number(regularPrice))) {
              const dealerPrice = Math.round(Number(regularPrice) * (1 - discount))
              loadedDealerPrices[serviceId][modelId][priceKey] = dealerPrice.toString()
            } else {
              loadedDealerPrices[serviceId][modelId][priceKey] = regularPrice
            }
          })
        })
      }
    })

    setRegularPrices(loadedRegularPrices)
    setDealerPrices(loadedDealerPrices)

    // Set default selected service
    if (!selectedService && repairCategories.length > 0 && repairCategories[0].services.length > 0) {
      setSelectedService(repairCategories[0].services[0])
    }
  }, [router, selectedService])

  // Filter models based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredModels(iPhoneModels)
    } else {
      const query = searchQuery.toLowerCase()
      const filtered = iPhoneModels.filter((model) => model.name.toLowerCase().includes(query))
      setFilteredModels(filtered)
    }
  }, [searchQuery])

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = repairCategories.find((cat) => cat.id === categoryId)
    if (category && category.services.length > 0) {
      setSelectedService(category.services[0])
    }
  }

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId)
  }

  const handleDealerPriceChange = (serviceId: string, modelId: string, priceKey: string, value: string) => {
    const numValue = value.replace(/\D/g, "")

    setDealerPrices((prev) => {
      const updated = { ...prev }
      if (!updated[serviceId]) {
        updated[serviceId] = {}
      }
      if (!updated[serviceId][modelId]) {
        updated[serviceId][modelId] = {}
      }
      updated[serviceId][modelId][priceKey] = numValue
      return updated
    })
  }

  const savePrices = () => {
    // Save dealer discounts to localStorage
    Object.keys(dealerDiscounts).forEach((serviceId) => {
      localStorage.setItem(`dealer_discount_${serviceId}`, dealerDiscounts[serviceId])
    })

    // Save dealer prices to localStorage
    Object.keys(dealerPrices).forEach((serviceId) => {
      localStorage.setItem(`dealer_${serviceId}Prices`, JSON.stringify(dealerPrices[serviceId]))
    })

    toast({
      title: "Bayi fiyatları kaydedildi",
      description: "Bayi tamir hizmetleri fiyatları başarıyla güncellendi.",
    })
  }

  if (!isLoggedIn || !selectedService) {
    return null // Yönlendirme yapılırken veya servis seçilmediğinde boş sayfa göster
  }

  const serviceInfo = repairServices[selectedService]
  if (!serviceInfo) {
    return null // Servis bulunamadığında boş sayfa göster
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
            <h1 className="text-2xl font-bold">Bayi Tamir Hizmetleri Yönetimi</h1>
          </div>
          <Button onClick={savePrices}>
            <Save className="mr-2 h-4 w-4" />
            Değişiklikleri Kaydet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tamir Kategorileri</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  orientation="vertical"
                  className="w-full"
                >
                  <TabsList className="flex flex-col h-auto w-full rounded-none">
                    {repairCategories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id} className="justify-start px-4 py-3 w-full">
                        <div className="flex items-center">
                          {category.icon}
                          <span className="ml-2">{category.name}</span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Tamir Hizmetleri</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {repairCategories
                    .find((cat) => cat.id === selectedCategory)
                    ?.services.map((serviceId) => (
                      <li
                        key={serviceId}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${
                          selectedService === serviceId ? "bg-gray-50 font-medium" : ""
                        }`}
                        onClick={() => handleServiceChange(serviceId)}
                      >
                        {repairServices[serviceId]?.name || serviceId}
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{serviceInfo.name} Bayi Fiyatları</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">Tüm fiyat seçenekleri için bayi indirimlerini ayarlayın</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Bayi İndirim Oranı (%)</span>
                  <Input
                    value={dealerDiscounts[selectedService] || "20"}
                    onChange={(e) => handleDiscountChange(selectedService, e.target.value)}
                    className="w-20"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="iPhone modeli ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[200px]">Model</TableHead>
                        {serviceInfo.options.map((option) => (
                          <TableHead key={option.priceKey}>{option.name}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredModels.map((model) => {
                        // Skip rendering options that are not applicable for certain models
                        const isOlderThanIPhone11 = isModelOlderThanIPhone11(model.id)
                        const isOlderThanIPhone12 = isModelOlderThanIPhone12(model.id)

                        return (
                          <TableRow key={model.id}>
                            <TableCell className="font-medium">{model.name}</TableCell>
                            {serviceInfo.options.map((option) => {
                              // Skip rendering the originalWarned input for older models in screen repair
                              if (
                                isOlderThanIPhone11 &&
                                selectedService === "ekran-degisimi" &&
                                option.priceKey === "originalWarned"
                              ) {
                                return (
                                  <TableCell key={option.priceKey}>
                                    <Input value="N/A" disabled className="w-32 bg-gray-100" />
                                  </TableCell>
                                )
                              }

                              // For iPhone models older than iPhone 12, display "N/A" for all back camera options except "Orijinal Uyarısız Arka Kamera"
                              if (
                                isOlderThanIPhone12 &&
                                selectedService === "arka-kamera-degisimi" &&
                                option.priceKey !== "originalUnwarned"
                              ) {
                                return (
                                  <TableCell key={option.priceKey}>
                                    <Input value="N/A" disabled className="w-32 bg-gray-100" />
                                  </TableCell>
                                )
                              }

                              // Get regular and dealer prices for this option
                              const regularPrice = regularPrices[selectedService]?.[model.id]?.[option.priceKey] || ""
                              const dealerPrice = dealerPrices[selectedService]?.[model.id]?.[option.priceKey] || ""

                              // Calculate discount percentage
                              let discountPercentage = 0
                              if (regularPrice && dealerPrice) {
                                discountPercentage = Math.round((1 - Number(dealerPrice) / Number(regularPrice)) * 100)
                              }

                              return (
                                <TableCell key={option.priceKey}>
                                  <div className="space-y-2">
                                    <div className="text-xs text-gray-500">
                                      Normal:{" "}
                                      {regularPrice ? `${Number(regularPrice).toLocaleString("tr-TR")} ₺` : "N/A"}
                                    </div>
                                    <Input
                                      value={dealerPrice}
                                      onChange={(e) =>
                                        handleDealerPriceChange(
                                          selectedService,
                                          model.id,
                                          option.priceKey,
                                          e.target.value,
                                        )
                                      }
                                      className="w-32"
                                      placeholder="Bayi Fiyatı"
                                    />
                                    {regularPrice && dealerPrice ? (
                                      <div className="text-xs text-green-600 font-medium">
                                        %{discountPercentage} indirim
                                      </div>
                                    ) : null}
                                  </div>
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
        </div>
      </div>
      <Toaster />
    </div>
  )
}
