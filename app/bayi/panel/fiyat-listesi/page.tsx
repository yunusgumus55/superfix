"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Home,
  Package,
  FileText,
  Settings,
  LogOut,
  Smartphone,
  Battery,
  Database,
  Download,
  Search,
  Camera,
  BatteryCharging,
  Cpu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// Helper function to convert service name to slug
const getServiceSlug = (serviceName: string): string => {
  const serviceMap: Record<string, string> = {
    "Face ID Onarımı": "face-id-onarimi",
    "Hoparlör Değişimi": "hoparlor-degisimi",
    "İç Kulaklık Değişimi": "ic-kulaklik-degisimi",
    "Titreşim Motoru Değişimi": "titresim-motoru-degisimi",
    "Kamera Camı Değişimi": "kamera-cami-degisimi",
    "Proximity Işık Sensörü Değişimi": "proximity-isik-sensoru-degisimi",
    "NFC Değişimi": "nfc-degisimi",
    "Detaylı Genel Temizlik": "detayli-genel-temizlik",
    "Ses ve Sessiz Alma Tuşu Değişimi": "ses-ve-sessiz-alma-tusu-degisimi",
    "Truedepth Kamera Değişimi": "truedepth-kamera-degisimi",
    "Lidar Sensör Değişimi": "lidar-sensor-degisimi",
    "Sıvı Temas Onarımı": "sivi-temas",
    "Açılmıyor Sorunu Onarımı": "acilmiyor-sorunu",
    "Aç Kapat Tuşu ve Flaş Değişimi": "ac-kapat-tusu-ve-flas-degisimi",
  }
  return serviceMap[serviceName] || "diger-sorunlar"
}

// Helper function to convert admin panel price format to dealer panel format for screens, batteries, cameras, etc.
const convertAdminPricesToDealerFormat = (adminPrices, type) => {
  const result = []

  // Skip if adminPrices is empty or not an object
  if (!adminPrices || typeof adminPrices !== "object") return result

  // Map of price keys to option names
  const priceKeyToName = {
    // Screen
    screen: {
      originalWarned: "Orijinal Uyarılı Ekran",
      originalUnwarned: "Orijinal Uyarısız Ekran",
      originalService: "Orijinal Servis Ekran",
      aftermarket: "A Kalite Ekran",
    },
    // Battery
    battery: {
      originalWarned: "Uyarılı Batarya",
      originalUnwarned: "Uyarısız Batarya",
      originalService: "Orijinal Servis Batarya",
    },
    // Camera
    camera: {
      originalWarned: "Orijinal Uyarılı Arka Kamera",
      originalUnwarned: "Orijinal Uyarısız Arka Kamera",
      originalService: "Orijinal Servis Arka Kamera",
    },
    // Back glass
    backglass: {
      original: "Orijinal Arka Cam",
      originalService: "Orijinal Servis Arka Cam",
    },
  }

  // Get the appropriate mapping based on type
  const mapping = priceKeyToName[type]
  if (!mapping) return result

  // Convert admin prices to dealer format
  Object.keys(adminPrices).forEach((modelId) => {
    // Convert model ID to readable name
    const modelName = modelIdToName(modelId)

    // Skip if model name couldn't be determined
    if (!modelName) return

    const options = []
    const priceData = adminPrices[modelId]

    // Process each price key
    Object.keys(mapping).forEach((priceKey) => {
      if (priceData[priceKey]) {
        const regularPrice = getRegularPrice(modelId, priceKey, type)
        const dealerPrice = priceData[priceKey]

        // Calculate discount percentage
        let discount = "0%"
        if (regularPrice && dealerPrice) {
          const regPrice = Number.parseInt(regularPrice.replace(/\D/g, ""))
          const dealPrice = Number.parseInt(dealerPrice)
          if (regPrice > 0) {
            const discountPercent = Math.round((1 - dealPrice / regPrice) * 100)
            discount = `${discountPercent}%`
          }
        }

        options.push({
          name: mapping[priceKey],
          regularPrice: formatPrice(regularPrice),
          dealerPrice: formatPrice(dealerPrice),
          discount,
        })
      }
    })

    // Only add models with options
    if (options.length > 0) {
      result.push({
        model: modelName,
        options,
      })
    }
  })

  return result
}

// Helper function to convert model ID to readable name
const modelIdToName = (modelId) => {
  // Map of model IDs to readable names
  const modelMap = {
    "iphone-16-pro-max": "iPhone 16 Pro Max",
    "iphone-16-pro": "iPhone 16 Pro",
    "iphone-16-plus": "iPhone 16 Plus",
    "iphone-16": "iPhone 16",
    "iphone-15-pro-max": "iPhone 15 Pro Max",
    "iphone-15-pro": "iPhone 15 Pro",
    "iphone-15-plus": "iPhone 15 Plus",
    "iphone-15": "iPhone 15",
    "iphone-14-pro-max": "iPhone 14 Pro Max",
    "iphone-14-pro": "iPhone 14 Pro",
    "iphone-14-plus": "iPhone 14 Plus",
    "iphone-14": "iPhone 14",
    "iphone-13-pro-max": "iPhone 13 Pro Max",
    "iphone-13-pro": "iPhone 13 Pro",
    "iphone-13": "iPhone 13",
    "iphone-13-mini": "iPhone 13 Mini",
    "iphone-12-pro-max": "iPhone 12 Pro Max",
    "iphone-12-pro": "iPhone 12 Pro",
    "iphone-12": "iPhone 12",
    "iphone-12-mini": "iPhone 12 Mini",
    "iphone-11-pro-max": "iPhone 11 Pro Max",
    "iphone-11-pro": "iPhone 11 Pro",
    "iphone-11": "iPhone 11",
    "iphone-xr": "iPhone XR",
    "iphone-xs-max": "iPhone XS Max",
    "iphone-xs": "iPhone XS",
    "iphone-x": "iPhone X",
    "iphone-8-plus": "iPhone 8 Plus",
    "iphone-8": "iPhone 8",
    "iphone-7-plus": "iPhone 7 Plus",
    "iphone-7": "iPhone 7",
    "iphone-se-2022": "iPhone SE 2022",
    "iphone-se-2020": "iPhone SE 2020",
  }

  return modelMap[modelId] || modelId
}

// Helper function to get regular price based on model and price key
const getRegularPrice = (modelId, priceKey, type) => {
  // This is a simplified approach - in a real app, you would get this from a database
  // For now, we'll estimate regular prices based on model and price key
  const basePrice = {
    "iphone-16-pro-max": { screen: 14000, battery: 3000, camera: 6000, backglass: 7000 },
    "iphone-16-pro": { screen: 13500, battery: 2900, camera: 5800, backglass: 6800 },
    "iphone-15-pro-max": { screen: 13000, battery: 2800, camera: 5600, backglass: 6600 },
    "iphone-15-pro": { screen: 12500, battery: 2700, camera: 5400, backglass: 6400 },
    "iphone-14-pro-max": { screen: 12000, battery: 2600, camera: 5200, backglass: 6200 },
    // Add more models as needed
  }

  // Multiplier based on price key
  const keyMultiplier = {
    screen: {
      originalWarned: 1.0,
      originalUnwarned: 1.05,
      originalService: 1.2,
      aftermarket: 0.5,
    },
    battery: {
      originalWarned: 1.0,
      originalUnwarned: 1.15,
      originalService: 1.4,
    },
    camera: {
      originalWarned: 1.0,
      originalUnwarned: 1.15,
      originalService: 2.0,
    },
    backglass: {
      original: 1.0,
      originalService: 1.3,
    },
  }

  // Get base price for model and type
  const model = basePrice[modelId] || basePrice["iphone-15-pro-max"] // Default to iPhone 15 Pro Max if model not found
  const baseValue = model ? model[type] || 5000 : 5000 // Default to 5000 if type not found

  // Get multiplier for price key
  const multiplier = keyMultiplier[type] ? keyMultiplier[type][priceKey] || 1.0 : 1.0

  // Calculate price
  return (baseValue * multiplier).toString()
}

// Helper function to format price with thousand separators
const formatPrice = (price) => {
  if (!price) return "0 ₺"

  // Remove non-numeric characters
  const numericPrice = price.toString().replace(/\D/g, "")

  // Format with thousand separators
  return numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " ₺"
}

export default function DealerPriceList() {
  const router = useRouter()
  const [dealerInfo, setDealerInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const [screenRepairPrices, setScreenRepairPrices] = useState([])
  const [batteryReplacementPrices, setBatteryReplacementPrices] = useState([])
  const [cameraRepairPrices, setCameraRepairPrices] = useState([])
  const [backGlassRepairPrices, setBackGlassRepairPrices] = useState([])
  const [chargingPortPrices, setChargingPortPrices] = useState([])
  const [motherboardRepairPrices, setMotherboardRepairPrices] = useState([])
  const [dataRecoveryPrices, setDataRecoveryPrices] = useState([])
  const [otherRepairPrices, setOtherRepairPrices] = useState([])

  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && sidebarOpen) {
      setSidebarOpen(false)
    } else if (isRightSwipe && !sidebarOpen) {
      setSidebarOpen(true)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    // Check if dealer is logged in
    const storedDealerInfo = localStorage.getItem("dealerInfo")
    if (!storedDealerInfo) {
      router.push("/bayi/giris")
      return
    }

    setDealerInfo(JSON.parse(storedDealerInfo))

    // Load dealer prices from localStorage (same keys used in admin panel)
    // Screen repair prices
    const savedDealerScreenPrices = localStorage.getItem("dealer_ekran-degisimiPrices")
    if (savedDealerScreenPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerScreenPrices)
        // Convert the admin panel format to the dealer panel format
        const formattedPrices = convertAdminPricesToDealerFormat(parsedPrices, "screen")
        if (formattedPrices.length > 0) {
          setScreenRepairPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing screen prices:", error)
      }
    }

    // Battery replacement prices
    const savedDealerBatteryPrices = localStorage.getItem("dealer_batarya-degisimiPrices")
    if (savedDealerBatteryPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerBatteryPrices)
        const formattedPrices = convertAdminPricesToDealerFormat(parsedPrices, "battery")
        if (formattedPrices.length > 0) {
          setBatteryReplacementPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing battery prices:", error)
      }
    }

    // Camera repair prices
    const savedDealerCameraPrices = localStorage.getItem("dealer_arka-kamera-degisimiPrices")
    if (savedDealerCameraPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerCameraPrices)
        const formattedPrices = convertAdminPricesToDealerFormat(parsedPrices, "camera")
        if (formattedPrices.length > 0) {
          setCameraRepairPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing camera prices:", error)
      }
    }

    // Back glass repair prices
    const savedDealerBackGlassPrices = localStorage.getItem("dealer_arka-cam-degisimiPrices")
    if (savedDealerBackGlassPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerBackGlassPrices)
        const formattedPrices = convertAdminPricesToDealerFormat(parsedPrices, "backglass")
        if (formattedPrices.length > 0) {
          setBackGlassRepairPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing back glass prices:", error)
      }
    }

    // Charging port prices
    const savedDealerChargingPortPrices = localStorage.getItem("dealer_sarj-soketi-degisimiPrices")
    if (savedDealerChargingPortPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerChargingPortPrices)
        const formattedPrices = convertAdminPricesToSimpleFormat(parsedPrices)
        if (formattedPrices.length > 0) {
          setChargingPortPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing charging port prices:", error)
      }
    }

    // Motherboard repair prices
    const savedDealerMotherboardPrices = localStorage.getItem("dealer_anakart-onarimiPrices")
    if (savedDealerMotherboardPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerMotherboardPrices)
        const formattedPrices = convertAdminPricesToSimpleFormat(parsedPrices)
        if (formattedPrices.length > 0) {
          setMotherboardRepairPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing motherboard prices:", error)
      }
    }

    // Data recovery prices
    const savedDealerDataPrices = localStorage.getItem("dealer_veri-kurtarmaPrices")
    if (savedDealerDataPrices) {
      try {
        const parsedPrices = JSON.parse(savedDealerDataPrices)
        const formattedPrices = convertAdminPricesToSimpleFormat(parsedPrices)
        if (formattedPrices.length > 0) {
          setDataRecoveryPrices(formattedPrices)
        }
      } catch (error) {
        console.error("Error parsing data recovery prices:", error)
      }
    }

    // Other repair services
    // Load all other repair services from localStorage
    const otherServices = [
      "face-id-onarimi",
      "hoparlor-degisimi",
      "ic-kulaklik-degisimi",
      "titresim-motoru-degisimi",
      "kamera-cami-degisimi",
      "proximity-isik-sensoru-degisimi",
      "nfc-degisimi",
      "detayli-genel-temizlik",
      "ses-ve-sessiz-alma-tusu-degisimi",
      "truedepth-kamera-degisimi",
      "lidar-sensor-degisimi",
      "sivi-temas",
      "acilmiyor-sorunu",
      "ac-kapat-tusu-ve-flas-degisimi",
    ]

    const otherPrices = []
    otherServices.forEach((serviceId) => {
      const savedPrices = localStorage.getItem(`dealer_${serviceId}Prices`)
      if (savedPrices) {
        try {
          const parsedPrices = JSON.parse(savedPrices)
          const formattedPrices = convertAdminPricesToSimpleFormat(parsedPrices)
          if (formattedPrices.length > 0) {
            // Add service name to each price item
            const serviceName = getServiceName(serviceId)
            formattedPrices.forEach((price) => {
              otherPrices.push({
                ...price,
                service: serviceName,
                serviceId: serviceId,
              })
            })
          }
        } catch (error) {
          console.error(`Error parsing ${serviceId} prices:`, error)
        }
      }
    })

    if (otherPrices.length > 0) {
      setOtherRepairPrices(otherPrices)
    }

    setLoading(false)
  }, [router])

  // Helper function to convert admin panel price format to simple format (for charging port, motherboard, etc.)
  const convertAdminPricesToSimpleFormat = (adminPrices) => {
    const result = []

    // Skip if adminPrices is empty or not an object
    if (!adminPrices || typeof adminPrices !== "object") return result

    // Convert admin prices to simple format
    Object.keys(adminPrices).forEach((modelId) => {
      // For services with a single price option (usually 'original')
      const priceKey = "original"

      // Convert model ID to readable name
      const modelName = modelIdToName(modelId)

      // Skip if model name couldn't be determined
      if (!modelName) return

      // Get dealer price
      const dealerPrice = adminPrices[modelId][priceKey]
      if (!dealerPrice) return

      // Get regular price (estimate based on dealer price and standard discount)
      const regularPrice = estimateRegularPrice(dealerPrice)

      // Calculate discount
      const dealPrice = Number.parseInt(dealerPrice)
      const regPrice = Number.parseInt(regularPrice.replace(/\D/g, ""))
      const discountPercent = Math.round((1 - dealPrice / regPrice) * 100)
      const discount = `${discountPercent}%`

      result.push({
        model: modelName,
        regularPrice: formatPrice(regularPrice),
        dealerPrice: formatPrice(dealerPrice),
        discount,
      })
    })

    return result
  }

  // Helper function to estimate regular price from dealer price
  const estimateRegularPrice = (dealerPrice) => {
    // Assume standard 20% discount
    const dealPrice = Number.parseInt(dealerPrice)
    const regularPrice = Math.round(dealPrice / 0.8)
    return regularPrice.toString()
  }

  // Helper function to get service name from service ID
  const getServiceName = (serviceId) => {
    const serviceMap = {
      "face-id-onarimi": "Face ID Onarımı",
      "hoparlor-degisimi": "Hoparlör Değişimi",
      "ic-kulaklik-degisimi": "İç Kulaklık Değişimi",
      "titresim-motoru-degisimi": "Titreşim Motoru Değişimi",
      "kamera-cami-degisimi": "Kamera Camı Değişimi",
      "proximity-isik-sensoru-degisimi": "Proximity Işık Sensörü Değişimi",
      "nfc-degisimi": "NFC Değişimi",
      "detayli-genel-temizlik": "Detaylı Genel Temizlik",
      "ses-ve-sessiz-alma-tusu-degisimi": "Ses ve Sessiz Alma Tuşu Değişimi",
      "truedepth-kamera-degisimi": "Truedepth Kamera Değişimi",
      "lidar-sensor-degisimi": "Lidar Sensör Değişimi",
      "sivi-temas": "Sıvı Temas Onarımı",
      "acilmiyor-sorunu": "Açılmıyor Sorunu Onarımı",
      "ac-kapat-tusu-ve-flas-degisimi": "Aç Kapat Tuşu ve Flaş Değişimi",
    }
    return serviceMap[serviceId] || serviceId
  }

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

  // Filter prices based on search term
  const filteredScreenPrices = screenRepairPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBatteryPrices = batteryReplacementPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCameraRepairPrices = cameraRepairPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBackGlassRepairPrices = backGlassRepairPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredChargingPortPrices = chargingPortPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMotherboardRepairPrices = motherboardRepairPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredDataRecoveryPrices = dataRecoveryPrices.filter((item) =>
    item.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredOtherRepairPrices = otherRepairPrices.filter(
    (item) =>
      (item.model ? item.model.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (item.service ? item.service.toLowerCase().includes(searchTerm.toLowerCase()) : false),
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-white h-screen shadow-md fixed transition-all duration-300 ease-in-out ${
            sidebarOpen ? "left-0" : "-left-64"
          }`}
          style={{ width: "16rem", zIndex: 40 }}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Bayi Paneli</h2>
              <p className="text-sm text-gray-500 truncate">{dealerInfo?.companyName}</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label={sidebarOpen ? "Sidebar'ı Gizle" : "Sidebar'ı Göster"}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/bayi/panel" className="flex items-center p-2 rounded-md hover:bg-gray-100">
                  <Home className="mr-2 h-5 w-5 text-gray-500" />
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
                <Link
                  href="/bayi/panel/fiyat-listesi"
                  className="flex items-center p-2 rounded-md bg-red-50 text-red-500"
                >
                  <FileText className="mr-2 h-5 w-5" />
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

        {/* Toggle button for mobile */}
        <div
          className={`fixed top-4 transition-all duration-300 ease-in-out z-50 ${sidebarOpen ? "left-64" : "left-4"}`}
        >
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 bg-white rounded-full shadow-md"
            aria-label={sidebarOpen ? "Sidebar'ı Gizle" : "Sidebar'ı Göster"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"} flex-1 p-8`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Bayi Fiyat Listesi</h1>
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Model ara..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Excel İndir
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Özel Bayi Fiyatları</CardTitle>
              <CardDescription>
                Aşağıdaki fiyatlar sadece bayilerimize özel indirimli fiyatlardır. Tüm fiyatlara KDV dahildir.
              </CardDescription>
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
                  <TabsTrigger value="camera">
                    <Camera className="mr-2 h-4 w-4" />
                    Kamera Değişimi
                  </TabsTrigger>
                  <TabsTrigger value="backglass">
                    <Smartphone className="mr-2 h-4 w-4" />
                    Arka Cam Değişimi
                  </TabsTrigger>
                  <TabsTrigger value="charging">
                    <BatteryCharging className="mr-2 h-4 w-4" />
                    Şarj Soketi
                  </TabsTrigger>
                  <TabsTrigger value="motherboard">
                    <Cpu className="mr-2 h-4 w-4" />
                    Anakart Onarımı
                  </TabsTrigger>
                  <TabsTrigger value="data">
                    <Database className="mr-2 h-4 w-4" />
                    Veri Kurtarma
                  </TabsTrigger>
                  <TabsTrigger value="other">
                    <Settings className="mr-2 h-4 w-4" />
                    Diğer Hizmetler
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="screen">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Ekran Tipi</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredScreenPrices.map((price, index) =>
                          price.options.map((option, optionIndex) => (
                            <tr key={`${index}-${optionIndex}`} className="border-b hover:bg-gray-50">
                              {optionIndex === 0 && (
                                <td className="py-3 px-4" rowSpan={price.options.length}>
                                  {price.model}
                                </td>
                              )}
                              <td className="py-3 px-4">{option.name}</td>
                              <td className="py-3 px-4 line-through text-gray-500">{option.regularPrice}</td>
                              <td className="py-3 px-4 font-bold text-red-500">{option.dealerPrice}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {option.discount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Link
                                  href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=ekran-degisimi&option=${encodeURIComponent(option.name)}`}
                                >
                                  <Button size="sm">Tamir Talebi Oluştur</Button>
                                </Link>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="battery">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Batarya Tipi</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBatteryPrices.map((price, index) =>
                          price.options.map((option, optionIndex) => (
                            <tr key={`${index}-${optionIndex}`} className="border-b hover:bg-gray-50">
                              {optionIndex === 0 && (
                                <td className="py-3 px-4" rowSpan={price.options.length}>
                                  {price.model}
                                </td>
                              )}
                              <td className="py-3 px-4">{option.name}</td>
                              <td className="py-3 px-4 line-through text-gray-500">{option.regularPrice}</td>
                              <td className="py-3 px-4 font-bold text-red-500">{option.dealerPrice}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {option.discount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Link
                                  href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=batarya-degisimi&option=${encodeURIComponent(option.name)}`}
                                >
                                  <Button size="sm">Tamir Talebi Oluştur</Button>
                                </Link>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="camera">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Kamera Tipi</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCameraRepairPrices.map((price, index) =>
                          price.options.map((option, optionIndex) => (
                            <tr key={`${index}-${optionIndex}`} className="border-b hover:bg-gray-50">
                              {optionIndex === 0 && (
                                <td className="py-3 px-4" rowSpan={price.options.length}>
                                  {price.model}
                                </td>
                              )}
                              <td className="py-3 px-4">{option.name}</td>
                              <td className="py-3 px-4 line-through text-gray-500">{option.regularPrice}</td>
                              <td className="py-3 px-4 font-bold text-red-500">{option.dealerPrice}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {option.discount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Link
                                  href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=arka-kamera-degisimi&option=${encodeURIComponent(option.name)}`}
                                >
                                  <Button size="sm">Tamir Talebi Oluştur</Button>
                                </Link>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="backglass">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Cam Tipi</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBackGlassRepairPrices.map((price, index) =>
                          price.options.map((option, optionIndex) => (
                            <tr key={`${index}-${optionIndex}`} className="border-b hover:bg-gray-50">
                              {optionIndex === 0 && (
                                <td className="py-3 px-4" rowSpan={price.options.length}>
                                  {price.model}
                                </td>
                              )}
                              <td className="py-3 px-4">{option.name}</td>
                              <td className="py-3 px-4 line-through text-gray-500">{option.regularPrice}</td>
                              <td className="py-3 px-4 font-bold text-red-500">{option.dealerPrice}</td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {option.discount}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Link
                                  href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=arka-cam-degisimi&option=${encodeURIComponent(option.name)}`}
                                >
                                  <Button size="sm">Tamir Talebi Oluştur</Button>
                                </Link>
                              </td>
                            </tr>
                          )),
                        )}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="charging">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredChargingPortPrices.map((price, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{price.model}</td>
                            <td className="py-3 px-4 line-through text-gray-500">{price.regularPrice}</td>
                            <td className="py-3 px-4 font-bold text-red-500">{price.dealerPrice}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {price.discount}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link
                                href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=sarj-soketi-degisimi`}
                              >
                                <Button size="sm">Tamir Talebi Oluştur</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="motherboard">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Model</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMotherboardRepairPrices.map((price, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{price.model}</td>
                            <td className="py-3 px-4 line-through text-gray-500">{price.regularPrice}</td>
                            <td className="py-3 px-4 font-bold text-red-500">{price.dealerPrice}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {price.discount}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link
                                href={`/bayi/panel/tamir-talebi?model=${encodeURIComponent(price.model)}&service=anakart-onarimi`}
                              >
                                <Button size="sm">Tamir Talebi Oluştur</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="data">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hizmet</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDataRecoveryPrices.map((price, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{price.model}</td>
                            <td className="py-3 px-4 line-through text-gray-500">{price.regularPrice}</td>
                            <td className="py-3 px-4 font-bold text-red-500">{price.dealerPrice}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {price.discount}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={`/bayi/panel/tamir-talebi?service=veri-kurtarma`}>
                                <Button size="sm">Tamir Talebi Oluştur</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="other">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Hizmet</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Normal Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">Bayi İndirimli Fiyat</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İndirim</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-500">İşlem</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOtherRepairPrices.map((price, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">{price.service}</td>
                            <td className="py-3 px-4 line-through text-gray-500">{price.regularPrice}</td>
                            <td className="py-3 px-4 font-bold text-red-500">{price.dealerPrice}</td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {price.discount}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <Link href={`/bayi/panel/tamir-talebi?service=${getServiceSlug(price.service)}`}>
                                <Button size="sm">Tamir Talebi Oluştur</Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
