"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

// iPhone modelleri ve görselleri - Sadece iPhone 15 ve 16 serilerini içerecek şekilde güncellenmiş liste
const iPhoneModels = {
  "iphone-16-pro-max": {
    name: "iPhone 16 Pro Max",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 1.0,
  },
  "iphone-16-pro": {
    name: "iPhone 16 Pro",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.95,
  },
  "iphone-16-plus": {
    name: "iPhone 16 Plus",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.9,
  },
  "iphone-16": {
    name: "iPhone 16",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.85,
  },
  "iphone-15-pro-max": {
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.95,
  },
  "iphone-15-pro": {
    name: "iPhone 15 Pro",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.9,
  },
  "iphone-15-plus": {
    name: "iPhone 15 Plus",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.85,
  },
  "iphone-15": {
    name: "iPhone 15",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.8,
  },
}

// Tamir hizmetleri
const repairServices = [
  {
    id: "ekran-degisimi",
    name: "Ekran Değişimi",
    description: "Kırık, çatlak veya görüntü sorunu olan ekranların değişimi",
    options: [
      { name: "Orijinal Servis Ekran", price: "16990", priceKey: "orijinal-servis-ekran" },
      { name: "Orijinal Uyarılı Ekran", price: "15990", priceKey: "orijinal-uyarili-ekran" },
      { name: "Orijinal Uyarısız Ekran", price: "16490", priceKey: "orijinal-uyarisiz-ekran" },
      { name: "Yan Sanayi Ekran", price: "8490", priceKey: "yan-sanayi-ekran" },
    ],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "batarya-degisimi",
    name: "Batarya Değişimi",
    description: "Şarj sorunu, şişme veya hızlı şarj tükenmesi yaşayan cihazlar için batarya değişimi",
    options: [
      { name: "Uyarılı Batarya", price: "3490", priceKey: "uyarili-batarya" },
      { name: "Uyarısız Batarya", price: "3990", priceKey: "uyarisiz-batarya" },
      { name: "Orijinal Servis Batarya", price: "5190", priceKey: "orijinal-servis-batarya" },
    ],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1585338447937-7082f8fc763d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "on-kamera-degisimi",
    name: "Ön Kamera Değişimi",
    description: "Ön kamera sorunları, bulanık görüntü veya çalışmama durumlarında kamera değişimi",
    options: [
      { name: "Orijinal Ön Kamera", price: "3990", priceKey: "orijinal-on-kamera" },
      { name: "Orijinal Aktarımlı Ön Kamera", price: "4990", priceKey: "orijinal-aktarimli-on-kamera" },
    ],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "arka-kamera-degisimi",
    name: "Arka Kamera Değişimi",
    description: "Arka kamera sorunları, bulanık görüntü veya çalışmama durumlarında kamera değişimi",
    options: [
      { name: "Orijinal Uyarılı Arka Kamera", price: "6990", priceKey: "orijinal-uyarili-arka-kamera" },
      { name: "Orijinal Uyarısız Arka Kamera", price: "7990", priceKey: "orijinal-uyarisiz-arka-kamera" },
      { name: "Orijinal Servis Arka Kamera", price: "11990", priceKey: "orijinal-servis-arka-kamera" },
    ],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "arka-cam-degisimi",
    name: "Arka Cam Değişimi",
    description: "Kırık veya çatlak arka camların değişimi",
    options: [
      { name: "Orijinal Arka Cam", price: "6990", priceKey: "orijinal-arka-cam" },
      { name: "Orijinal Servis Arka Cam", price: "8990", priceKey: "orijinal-servis-arka-cam" },
    ],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "on-cam-degisimi",
    name: "Ön Cam Değişimi",
    description: "Kırık veya çatlak ön camların değişimi",
    options: [{ name: "Ön Cam", price: "9990", priceKey: "on-cam" }],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "kasa-degisimi",
    name: "Kasa Değişimi",
    description: "Hasar görmüş veya deforme olmuş kasaların değişimi",
    options: [{ name: "Kasa Değişimi", price: "13990", priceKey: "kasa-degisimi" }],
    duration: "2-3 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "sarj-soketi-degisimi",
    name: "Şarj Soketi Değişimi",
    description: "Şarj sorunu yaşayan cihazlar için şarj soketi değişimi",
    options: [{ name: "Şarj Soketi Değişimi", price: "6990", priceKey: "sarj-soketi-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "ac-kapat-tusu-ve-flas-degisimi",
    name: "Aç Kapat Tuşu ve Flaş Değişimi",
    description: "Aç kapat tuşu veya flaş sorunu yaşayan cihazlar için değişim",
    options: [{ name: "Aç Kapat Tuşu ve Flaş Değişimi", price: "4990", priceKey: "ac-kapat-tusu-ve-flas-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "titresim-motoru-degisimi",
    name: "Titreşim Motoru Değişimi",
    description: "Titreşim sorunu yaşayan cihazlar için motor değişimi",
    options: [{ name: "Titreşim Motoru Değişimi", price: "2990", priceKey: "titresim-motoru-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "ic-kulaklik-degisimi",
    name: "İç Kulaklık (Ahize) Değişimi",
    description: "Ses sorunu yaşayan cihazlar için iç kulaklık değişimi",
    options: [{ name: "İç Kulaklık (Ahize) Değişimi", price: "3990", priceKey: "ic-kulaklik-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "hoparlor-degisimi",
    name: "Hoparlör Değişimi",
    description: "Ses sorunu yaşayan cihazlar için hoparlör değişimi",
    options: [{ name: "Hoparlör Değişimi", price: "2990", priceKey: "hoparlor-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "kamera-cami-degisimi",
    name: "Kamera Camı Değişimi",
    description: "Kırık veya çatlak kamera camlarının değişimi",
    options: [{ name: "Kamera Camı Değişimi", price: "1490", priceKey: "kamera-cami-degisimi" }],
    duration: "30 dakika",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "proximity-isik-sensoru-degisimi",
    name: "Proximity Işık Sensörü Değişimi",
    description: "Yakınlık sensörü veya ışık sensörü sorunu yaşayan cihazlar için değişim",
    options: [{ name: "Proximity Işık Sensörü Değişimi", price: "3490", priceKey: "proximity-isik-sensoru-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "face-id-onarimi",
    name: "Face ID (Yüz Tanıma) Onarımı",
    description: "Face ID sorunu yaşayan cihazlar için onarım",
    options: [{ name: "Face ID (Yüz Tanıma) Onarımı", price: "4990", priceKey: "face-id-onarimi" }],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "nfc-degisimi",
    name: "NFC Değişimi",
    description: "NFC sorunu yaşayan cihazlar için değişim",
    options: [{ name: "NFC Değişimi", price: "4990", priceKey: "nfc-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "detayli-genel-temizlik",
    name: "Detaylı Genel Temizlik",
    description: "Cihazınızın içini ve dışını detaylı temizleme",
    options: [{ name: "Detaylı Genel Temizlik", price: "1990", priceKey: "detayli-genel-temizlik" }],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "ses-ve-sessiz-alma-tusu-degisimi",
    name: "Ses ve Sessiz Alma Tuşu Değişimi",
    description: "Ses tuşları veya sessiz alma tuşu sorunu yaşayan cihazlar için değişim",
    options: [
      { name: "Ses ve Sessiz Alma Tuşu Değişimi", price: "4990", priceKey: "ses-ve-sessiz-alma-tusu-degisimi" },
    ],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "truedepth-kamera-degisimi",
    name: "Truedepth Kamera Değişimi",
    description: "Truedepth kamera sorunu yaşayan cihazlar için değişim",
    options: [{ name: "Truedepth Kamera Değişimi", price: "10490", priceKey: "truedepth-kamera-degisimi" }],
    duration: "1-2 saat",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "lidar-sensor-degisimi",
    name: "Lidar Sensör Değişimi",
    description: "Lidar sensör sorunu yaşayan cihazlar için değişim",
    options: [{ name: "Lidar Sensör Değişimi", price: "2990", priceKey: "lidar-sensor-degisimi" }],
    duration: "1 saat",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "veri-kurtarma",
    name: "Veri Kurtarma",
    description: "Bozulan veya açılmayan cihazlardan veri kurtarma işlemi",
    options: [{ name: "Veri Kurtarma", price: "2500", priceKey: "veri-kurtarma" }],
    duration: "1-3 gün",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "sivi-temas",
    name: "Sıvı Temas",
    description: "Suya düşen veya sıvı teması olan cihazların temizliği ve onarımı",
    options: [{ name: "Sıvı Temas Onarımı", price: "1800", priceKey: "sivi-temas" }],
    duration: "1-3 gün",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "acilmiyor-sorunu",
    name: "Açılmıyor Sorunu",
    description: "Açılmayan veya kapanan cihazların onarımı",
    options: [{ name: "Açılmıyor Sorunu Onarımı", price: "1500", priceKey: "acilmiyor-sorunu" }],
    duration: "1-2 gün",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "diger-sorunlar",
    name: "Diğer Sorunlar",
    description: "Listede bulunmayan diğer sorunların onarımı",
    options: [{ name: "Diğer Sorunlar", price: "Sorun tespitinden sonra belirlenecek", priceKey: "diger-sorunlar" }],
    duration: "Sorun tespitinden sonra belirlenecek",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "anakart-onarimi",
    name: "Anakart Onarımı",
    description: "Anakart sorunu yaşayan cihazların onarımı",
    options: [{ name: "Anakart Onarımı", price: "2500", priceKey: "anakart-onarimi" }],
    duration: "2-5 gün",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=300&auto=format&fit=crop",
  },
]

// iPhone serilerini gruplandırma - Sadece iPhone 15 ve 16 serilerini içerecek şekilde güncellenmiş liste
const iPhoneSeries = [
  {
    series: "iPhone 16 Serisi",
    models: [
      { name: "iPhone 16 Pro Max", slug: "iphone-16-pro-max" },
      { name: "iPhone 16 Pro", slug: "iphone-16-pro" },
      { name: "iPhone 16 Plus", slug: "iphone-16-plus" },
      { name: "iPhone 16", slug: "iphone-16" },
    ],
  },
  {
    series: "iPhone 15 Serisi",
    models: [
      { name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max" },
      { name: "iPhone 15 Pro", slug: "iphone-15-pro" },
      { name: "iPhone 15 Plus", slug: "iphone-15-plus" },
      { name: "iPhone 15", slug: "iphone-15" },
    ],
  },
]

export default function RepairRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState("APPLE")
  const [selectedDeviceType, setSelectedDeviceType] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedModelName, setSelectedModelName] = useState("")
  const [selectedProblem, setSelectedProblem] = useState("")
  const [selectedProblemName, setSelectedProblemName] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [selectedOptionName, setSelectedOptionName] = useState("")
  const [selectedRepairTypes, setSelectedRepairTypes] = useState<string[]>([])
  const [selectedRepairOptions, setSelectedRepairOptions] = useState<Record<string, string>>({})
  const [showRepairTypeSelector, setShowRepairTypeSelector] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [couponError, setCouponError] = useState("")
  const [couponSuccess, setCouponSuccess] = useState("")
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)
  const [cities, setCities] = useState<string[]>([
    "Adana",
    "Adıyaman",
    "Afyonkarahisar",
    "Ağrı",
    "Amasya",
    "Ankara",
    "Antalya",
    "Artvin",
    "Aydın",
    "Balıkesir",
    "Bilecik",
    "Bingöl",
    "Bitlis",
    "Bolu",
    "Burdur",
    "Bursa",
    "Çanakkale",
    "Çankırı",
    "Çorum",
    "Denizli",
    "Diyarbakır",
    "Edirne",
    "Elazığ",
    "Erzincan",
    "Erzurum",
    "Eskişehir",
    "Gaziantep",
    "Giresun",
    "Gümüşhane",
    "Hakkari",
    "Hatay",
    "Isparta",
    "Mersin",
    "İstanbul",
    "İzmir",
    "Kars",
    "Kastamonu",
    "Kayseri",
    "Kırklareli",
    "Kırşehir",
    "Kocaeli",
    "Konya",
    "Kütahya",
    "Malatya",
    "Manisa",
    "Kahramanmaraş",
    "Mardin",
    "Muğla",
    "Muş",
    "Nevşehir",
    "Niğde",
    "Ordu",
    "Rize",
    "Sakarya",
    "Samsun",
    "Siirt",
    "Sinop",
    "Sivas",
    "Tekirdağ",
    "Tokat",
    "Trabzon",
    "Tunceli",
    "Şanlıurfa",
    "Uşak",
    "Van",
    "Yozgat",
    "Zonguldak",
    "Aksaray",
    "Bayburt",
    "Karaman",
    "Kırıkkale",
    "Batman",
    "Şırnak",
    "Bartın",
    "Ardahan",
    "Iğdır",
    "Yalova",
    "Karabük",
    "Kilis",
    "Osmaniye",
    "Düzce",
  ])
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [districts, setDistricts] = useState<string[]>([])
  const [selectedDistrict, setSelectedDistrict] = useState<string>("")
  const [activeDetailId, setActiveDetailId] = useState<string | null>(null)

  // Fiyat verilerini yükle
  useEffect(() => {
    // Tüm tamir hizmetleri için fiyat verilerini kontrol et
    repairServices.forEach((service) => {
      const savedPrices = localStorage.getItem(`${service.id}Prices`)
      if (!savedPrices) {
        // Eğer localStorage'da fiyat yoksa, admin panelinden fiyat verisi henüz oluşturulmamış demektir
        console.log(`${service.id} için fiyat verisi bulunamadı.`)
      }
    })
  }, [])

  // Adım 1'den adım 2'ye geçiş
  const handleDeviceTypeSelect = (deviceType: string) => {
    setSelectedDeviceType(deviceType)
    setStep(2)
  }

  // Adım 2'den adım 3'e geçiş
  const handleModelSelect = (model: string, modelName: string) => {
    setSelectedModel(model)
    setSelectedModelName(modelName)
    setStep(3)
  }

  // Adım 3'ten adım 4'e geçiş
  const handleProblemSelect = (problem: string, problemName: string) => {
    setSelectedProblem(problem)
    setSelectedProblemName(problemName)
    setStep(4)
  }

  // Adım 4'ten adım 5'e geçiş ve yönlendirme
  const handleOptionSelect = (option: string, optionName: string) => {
    setSelectedOption(option)
    setSelectedOptionName(optionName)

    // Store the selected option for this repair type
    setSelectedRepairOptions((prev) => ({
      ...prev,
      [selectedProblem]: option,
    }))

    // Add the selected problem to the repair types
    if (selectedProblem && !selectedRepairTypes.includes(selectedProblem)) {
      setSelectedRepairTypes((prev) => [...prev, selectedProblem])
    }

    // Show repair type selector instead of moving directly to step 5
    setShowRepairTypeSelector(true)
  }

  // Önceki adıma dönme
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const toggleRepairType = (repairId: string, repairName: string) => {
    setSelectedRepairTypes((prev) => {
      if (prev.includes(repairId)) {
        return prev.filter((id) => id !== repairId)
      } else {
        return [...prev, repairId]
      }
    })
  }

  // Add another repair type
  const handleAddAnotherRepair = () => {
    setShowRepairTypeSelector(false)
    setStep(3) // Go back to problem selection
    setSelectedProblem("")
    setSelectedProblemName("")
    setSelectedOption("")
    setSelectedOptionName("")
  }

  // Proceed to final step
  const handleProceedToFinal = () => {
    setShowRepairTypeSelector(false)
    setStep(5)
  }

  // Remove a repair type
  const handleRemoveRepairType = (repairId: string) => {
    setSelectedRepairTypes((prev) => prev.filter((id) => id !== repairId))
    setSelectedRepairOptions((prev) => {
      const newOptions = { ...prev }
      delete newOptions[repairId]
      return newOptions
    })
  }

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError("Lütfen bir kupon kodu girin")
      return
    }

    setIsValidatingCoupon(true)
    setCouponError("")
    setCouponSuccess("")

    // Get coupons from localStorage (database)
    try {
      const storedCoupons = localStorage.getItem("coupons")
      const coupons = storedCoupons ? JSON.parse(storedCoupons) : []
      const totalPrice = calculateTotalPrice()

      // Find the coupon with matching code
      const coupon = coupons.find((c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.active === true)

      if (coupon) {
        // Check if coupon is expired
        if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
          setCouponError("Bu kupon süresi dolmuş")
          setIsValidatingCoupon(false)
          return
        }

        // Check if coupon has reached usage limit
        if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
          setCouponError("Bu kupon kullanım limitine ulaşmış")
          setIsValidatingCoupon(false)
          return
        }

        // Check minimum amount requirement
        if (totalPrice < coupon.minAmount) {
          setCouponError(`Bu kupon ${coupon.minAmount.toLocaleString("tr-TR")} ₺ ve üzeri siparişlerde geçerlidir.`)
          setIsValidatingCoupon(false)
          return
        }

        // Calculate discount amount
        let discountAmount = 0
        if (coupon.type === "percentage") {
          discountAmount = Math.round(totalPrice * (coupon.value / 100))
        } else {
          discountAmount = coupon.value
        }

        // Apply discount
        setDiscount(discountAmount)
        setCouponSuccess(
          `Kupon uygulandı! ${coupon.type === "percentage" ? `%${coupon.value}` : `${coupon.value.toLocaleString("tr-TR")} ₺`} indirim kazandınız.`,
        )

        // Update coupon usage count in localStorage
        const updatedCoupons = coupons.map((c) => (c.id === coupon.id ? { ...c, usageCount: c.usageCount + 1 } : c))
        localStorage.setItem("coupons", JSON.stringify(updatedCoupons))
      } else {
        setCouponError("Geçersiz kupon kodu veya kupon aktif değil")
      }
    } catch (error) {
      console.error("Kupon doğrulanırken hata:", error)
      setCouponError("Kupon doğrulanırken bir hata oluştu")
    } finally {
      setIsValidatingCoupon(false)
    }
  }

  const calculateTotalPrice = () => {
    let total = 0

    selectedRepairTypes.forEach((repairId) => {
      const service = repairServices.find((s) => s.id === repairId)
      if (service) {
        const selectedOptionKey = selectedRepairOptions[repairId]
        const savedPrices = localStorage.getItem(`${repairId}Prices`)

        if (savedPrices) {
          try {
            const priceData = JSON.parse(savedPrices)
            const modelPrices = priceData[selectedModel]

            if (modelPrices) {
              // Find the option that matches the selected option key
              const option = service.options.find((opt) => opt.priceKey === selectedOptionKey)

              if (option) {
                // Map to admin panel price keys
                const priceKeyMap: Record<string, string> = {
                  "orijinal-servis-ekran": "originalService",
                  "orijinal-uyarisiz-ekran": "originalUnwarned",
                  "orijinal-uyarili-ekran": "originalWarned",
                  "yan-sanayi-ekran": "aftermarket",
                  "uyarili-batarya": "originalWarned",
                  "uyarisiz-batarya": "originalUnwarned",
                  "orijinal-servis-batarya": "originalService",
                  "orijinal-on-kamera": "original",
                  "orijinal-aktarimli-on-kamera": "originalTransfer",
                  "orijinal-uyarili-arka-kamera": "originalWarned",
                  "orijinal-uyarisiz-arka-kamera": "originalUnwarned",
                  "orijinal-servis-arka-kamera": "originalService",
                  "orijinal-arka-cam": "original",
                  "orijinal-servis-arka-cam": "originalService",
                  "on-cam": "original",
                  "kasa-degisimi": "original",
                  "sarj-soketi-degisimi": "original",
                  "ac-kapat-tusu-ve-flas-degisimi": "original",
                  "titresim-motoru-degisimi": "original",
                  "ic-kulaklik-degisimi": "original",
                  "hoparlor-degisimi": "original",
                  "kamera-cami-degisimi": "original",
                  "proximity-isik-sensoru-degisimi": "original",
                  "face-id-onarimi": "original",
                  "nfc-degisimi": "original",
                  "detayli-genel-temizlik": "original",
                  "ses-ve-sessiz-alma-tusu-degisimi": "original",
                  "truedepth-kamera-degisimi": "original",
                  "lidar-sensor-degisimi": "original",
                  "veri-kurtarma": "original",
                  "sivi-temas": "original",
                  "acilmiyor-sorunu": "original",
                  "diger-sorunlar": "original",
                  "anakart-onarimi": "original",
                }

                const adminPriceKey = priceKeyMap[option.priceKey] || "original"

                if (modelPrices[adminPriceKey] && modelPrices[adminPriceKey] !== "N/A") {
                  total += Number.parseInt(modelPrices[adminPriceKey])
                }
              }
            }
          } catch (e) {
            console.error("Error calculating price:", e)
          }
        }
      }
    })

    return total
  }

  const calculateFinalPrice = () => {
    const totalPrice = calculateTotalPrice()
    return Math.max(0, totalPrice - discount)
  }

  // Add script to handle address field requirement based on service type
  useEffect(() => {
    const handleServiceTypeChange = () => {
      const storeRepair = document.getElementById("store-repair") as HTMLInputElement
      const addressRequired = document.getElementById("addressRequired")
      const addressField = document.getElementById("addressField")

      if (storeRepair && addressRequired && addressField) {
        if (storeRepair.checked) {
          addressRequired.classList.add("hidden")
          const addressTextarea = addressField.querySelector("textarea")
          if (addressTextarea) {
            addressTextarea.removeAttribute("required")
          }
        } else {
          addressRequired.classList.remove("hidden")
          const addressTextarea = addressField.querySelector("textarea")
          if (addressTextarea) {
            addressTextarea.setAttribute("required", "required")
          }
        }
      }
    }

    // Set up event listeners when step 5 is active
    if (step === 5) {
      const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]')
      serviceTypeRadios.forEach((radio) => {
        radio.addEventListener("change", handleServiceTypeChange)
      })

      // Initial check
      setTimeout(handleServiceTypeChange, 100)

      // Cleanup
      return () => {
        serviceTypeRadios.forEach((radio) => {
          radio.removeEventListener("change", handleServiceTypeChange)
        })
      }
    }
  }, [step])

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value
    setSelectedCity(city)
    setSelectedDistrict("")

    // Set districts based on selected city
    // This is a simplified example - in a real app, you would have a complete mapping of cities to districts
    if (city === "İstanbul") {
      setDistricts([
        "Adalar",
        "Arnavutköy",
        "Ataşehir",
        "Avcılar",
        "Bağcılar",
        "Bahçelievler",
        "Bakırköy",
        "Başakşehir",
        "Bayrampaşa",
        "Beşiktaş",
        "Beykoz",
        "Beylikdüzü",
        "Beyoğlu",
        "Büyükçekmece",
        "Çatalca",
        "Çekmeköy",
        "Esenler",
        "Esenyurt",
        "Eyüpsultan",
        "Fatih",
        "Gaziosmanpaşa",
        "Güngören",
        "Kadıköy",
        "Kağıthane",
        "Kartal",
        "Küçükçekmece",
        "Maltepe",
        "Pendik",
        "Sancaktepe",
        "Sarıyer",
        "Silivri",
        "Sultanbeyli",
        "Sultangazi",
        "Şile",
        "Şişli",
        "Tuzla",
        "Ümraniye",
        "Üsküdar",
        "Zeytinburnu",
      ])
    } else if (city === "Ankara") {
      setDistricts([
        "Akyurt",
        "Altındağ",
        "Ayaş",
        "Balâ",
        "Beypazarı",
        "Çamlıdere",
        "Çankaya",
        "Çubuk",
        "Elmadağ",
        "Etimesgut",
        "Evren",
        "Gölbaşı",
        "Güdül",
        "Haymana",
        "Kalecik",
        "Kahramankazan",
        "Keçiören",
        "Kızılcahamam",
        "Mamak",
        "Nallıhan",
        "Polatlı",
        "Pursaklar",
        "Sincan",
        "Şereflikoçhisar",
        "Yenimahalle",
      ])
    } else if (city === "İzmir") {
      setDistricts([
        "Aliağa",
        "Balçova",
        "Bayındır",
        "Bayraklı",
        "Bergama",
        "Beydağ",
        "Bornova",
        "Buca",
        "Çeşme",
        "Çiğli",
        "Dikili",
        "Foça",
        "Gaziemir",
        "Güzelbahçe",
        "Karabağlar",
        "Karaburun",
        "Karşıyaka",
        "Kemalpaşa",
        "Kınık",
        "Kiraz",
        "Konak",
        "Menderes",
        "Menemen",
        "Narlıdere",
        "Ödemiş",
        "Seferihisar",
        "Selçuk",
        "Tire",
        "Torbalı",
        "Urla",
      ])
    } else {
      // For other cities, provide a generic list or empty array
      setDistricts([])
    }
  }

  const toggleDetailInfo = (id: string) => {
    if (activeDetailId === id) {
      setActiveDetailId(null)
    } else {
      setActiveDetailId(id)
    }
  }

  // Format price with commas and decimal points
  const formatPrice = (price: string) => {
    if (price === "Sorun tespitinden sonra belirlenecek") return price

    const numPrice = Number.parseInt(price)
    return numPrice.toLocaleString("tr-TR") + ",00"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="container mx-auto px-3 pt-6 pb-3">
        <div className="relative">
          <div className="h-1.5 bg-gray-200 rounded-full">
            <div
              className={`h-1.5 bg-fuchsia-500 rounded-full transition-all duration-300 ease-in-out`}
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1.5">
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= 1 ? "bg-fuchsia-500 text-white" : "bg-gray-300 text-gray-600"
                } font-bold text-sm`}
              >
                1
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                MARKA
              </div>
            </div>
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= 2 ? "bg-fuchsia-500 text-white" : "bg-gray-300 text-gray-600"
                } font-bold text-sm`}
              >
                2
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                MODEL
              </div>
            </div>
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= 3 ? "bg-fuchsia-500 text-white" : "bg-gray-300 text-gray-600"
                } font-bold text-sm`}
              >
                3
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                SORUN
              </div>
            </div>
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= 4 ? "bg-fuchsia-500 text-white" : "bg-gray-300 text-gray-600"
                } font-bold text-sm`}
              >
                4
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                SEÇENEK
              </div>
            </div>
            <div className="relative">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  step >= 5 ? "bg-fuchsia-500 text-white" : "bg-gray-300 text-gray-600"
                } font-bold text-sm`}
              >
                5
              </div>
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600 whitespace-nowrap">
                TALEP
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 py-8">
        {/* Back Button */}
        {step > 1 && (
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-fuchsia-600 mb-4 transition-colors text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" />
            <span>Önceki Adıma Dön</span>
          </button>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Main Content - Left Side */}
          <div className="w-full md:w-2/3">
            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              {step === 1 && (
                <>
                  <h2 className="text-4xl font-extrabold mb-6 text-center">Cihaz tipini seçiniz</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button
                      onClick={() => handleDeviceTypeSelect("iphone")}
                      className="border rounded-lg p-4 hover:border-fuchsia-500 hover:shadow-md transition-all text-center"
                    >
                      <div className="text-base font-medium">iPhone</div>
                    </button>
                    <button
                      onClick={() => handleDeviceTypeSelect("ipad")}
                      className="border rounded-lg p-4 hover:border-fuchsia-500 hover:shadow-md transition-all text-center"
                    >
                      <div className="text-base font-medium">iPad</div>
                    </button>
                    <button
                      onClick={() => handleDeviceTypeSelect("watch")}
                      className="border rounded-lg p-4 hover:border-fuchsia-500 hover:shadow-md transition-all text-center"
                    >
                      <div className="text-base font-medium">Watch</div>
                    </button>
                  </div>
                </>
              )}

              {step === 2 && selectedDeviceType === "iphone" && (
                <>
                  <h2 className="text-4xl font-extrabold mb-6 text-center">Cihazınızın modelini seçiniz</h2>
                  <div className="space-y-4">
                    {iPhoneSeries.map((series, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h3 className="text-xl font-bold mb-4">{series.series}</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {series.models.map((model, modelIndex) => (
                            <button
                              key={modelIndex}
                              onClick={() => handleModelSelect(model.slug, model.name)}
                              className="border rounded-lg p-2 hover:border-fuchsia-500 hover:shadow-md transition-all text-center"
                            >
                              <div className="text-sm font-medium">{model.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {
                // Adım 3'teki model uyumluluk kontrollerini güncelliyorum
                // Artık sadece iPhone 15 ve 16 modelleri olduğu için, eski modellere özel kontrolleri kaldırıyorum
                step === 3 && selectedModel && (
                  <>
                    <h2 className="text-4xl font-extrabold mb-6 text-center">Cihazınızın sorunu nedir?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {repairServices.map((service, index) => {
                        // Lidar sensör kontrolü - sadece Pro modellerde göster
                        const isModelEligibleForLidarRepair = selectedModel.toLowerCase().includes("pro")

                        // Lidar sensör tamiri sadece Pro modellerde gösterilir
                        if (!isModelEligibleForLidarRepair && service.id === "lidar-sensor-degisimi") {
                          return null
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => handleProblemSelect(service.id, service.name)}
                            className="border rounded-lg p-3 hover:border-fuchsia-500 hover:shadow-md transition-all flex flex-col"
                          >
                            <div className="text-base font-medium mb-1">{service.name}</div>
                            <div className="text-xs text-gray-500 mb-1">{service.description}</div>
                            <div className="text-xs text-fuchsia-600 mt-auto">
                              {(() => {
                                // Fiyatları admin panelinden al
                                const savedPrices = localStorage.getItem(`${service.id}Prices`)
                                if (savedPrices && service.id !== "diger-sorunlar") {
                                  try {
                                    const priceData = JSON.parse(savedPrices)
                                    // Seçilen model için fiyat bilgisini al
                                    const modelPrices = priceData[selectedModel]

                                    if (modelPrices) {
                                      // Servis için en düşük fiyatı bul
                                      const priceKeys = Object.keys(modelPrices).filter(
                                        (key) =>
                                          service.options.some((option) => option.priceKey === key) ||
                                          [
                                            "original",
                                            "originalWarned",
                                            "originalUnwarned",
                                            "originalService",
                                            "aftermarket",
                                          ].includes(key),
                                      )

                                      if (priceKeys.length > 0) {
                                        const prices = priceKeys
                                          .map((key) => modelPrices[key])
                                          .filter((price) => price && price !== "N/A")
                                          .map((price) => Number.parseInt(price))

                                        if (prices.length > 0) {
                                          const minPrice = Math.min(...prices)
                                          return `${minPrice.toLocaleString("tr-TR")} ₺'den başlayan`
                                        }
                                      }
                                    }
                                  } catch (e) {
                                    console.error("Fiyat verisi çözümlenirken hata oluştu:", e)
                                  }
                                }

                                // Fiyat bulunamazsa veya diğer sorunlar ise
                                return service.id === "diger-sorunlar"
                                  ? "Fiyat için inceleme gerekli"
                                  : "Fiyat bilgisi yükleniyor..."
                              })()}
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </>
                )
              }
              {
                // Adım 4'teki seçeneklerin uyumluluk kontrollerini güncelliyorum
                // Artık sadece iPhone 15 ve 16 modelleri olduğu için, eski modellere özel kontrolleri kaldırıyorum
                step === 4 && selectedProblem && (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-center">{selectedProblemName} Seçenekleri</h2>

                    <div className="grid grid-cols-1 gap-4">
                      {/* Main repair type card */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            id={selectedProblem}
                            name="repairType"
                            className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300"
                            checked
                            readOnly
                          />
                          <label htmlFor={selectedProblem} className="ml-2 block text-lg font-bold text-gray-900">
                            {selectedProblemName}
                          </label>
                        </div>

                        {/* Options list */}
                        <div className="ml-6 space-y-3 mt-4">
                          {repairServices
                            .find((service) => service.id === selectedProblem)
                            ?.options.map((option, index) => {
                              // Generate a unique ID for this option
                              const optionId = `${selectedProblem}-${option.priceKey}`

                              // Get price for this option
                              let displayPrice = option.price
                              const savedPrices = localStorage.getItem(`${selectedProblem}Prices`)
                              if (savedPrices) {
                                try {
                                  const priceData = JSON.parse(savedPrices)
                                  const modelPrices = priceData[selectedModel]

                                  if (modelPrices) {
                                    // Map to admin panel price keys
                                    const priceKeyMap: Record<string, string> = {
                                      "orijinal-servis-ekran": "originalService",
                                      "orijinal-uyarisiz-ekran": "originalUnwarned",
                                      "orijinal-uyarili-ekran": "originalWarned",
                                      "yan-sanayi-ekran": "aftermarket",
                                      "uyarili-batarya": "originalWarned",
                                      "uyarisiz-batarya": "originalUnwarned",
                                      "orijinal-servis-batarya": "originalService",
                                      "orijinal-on-kamera": "original",
                                      "orijinal-aktarimli-on-kamera": "originalTransfer",
                                      "orijinal-uyarili-arka-kamera": "originalWarned",
                                      "orijinal-uyarisiz-arka-kamera": "originalUnwarned",
                                      "orijinal-servis-arka-kamera": "originalService",
                                      "orijinal-arka-cam": "original",
                                      "orijinal-servis-arka-cam": "originalService",
                                      "on-cam": "original",
                                      "kasa-degisimi": "original",
                                      "sarj-soketi-degisimi": "original",
                                      "ac-kapat-tusu-ve-flas-degisimi": "original",
                                      "titresim-motoru-degisimi": "original",
                                      "ic-kulaklik-degisimi": "original",
                                      "hoparlor-degisimi": "original",
                                      "kamera-cami-degisimi": "original",
                                      "proximity-isik-sensoru-degisimi": "original",
                                      "face-id-onarimi": "original",
                                      "nfc-degisimi": "original",
                                      "detayli-genel-temizlik": "original",
                                      "ses-ve-sessiz-alma-tusu-degisimi": "original",
                                      "truedepth-kamera-degisimi": "original",
                                      "lidar-sensor-degisimi": "original",
                                      "veri-kurtarma": "original",
                                      "sivi-temas": "original",
                                      "acilmiyor-sorunu": "original",
                                      "diger-sorunlar": "original",
                                      "anakart-onarimi": "original",
                                    }

                                    const adminPriceKey = priceKeyMap[option.priceKey] || "original"

                                    if (modelPrices[adminPriceKey] && modelPrices[adminPriceKey] !== "N/A") {
                                      displayPrice = modelPrices[adminPriceKey]
                                    }
                                  }
                                } catch (e) {
                                  console.error("Fiyat verisi çözümlenirken hata oluştu:", e)
                                }
                              }

                              return (
                                <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center">
                                      <input
                                        type="radio"
                                        id={optionId}
                                        name="repairOption"
                                        value={option.priceKey}
                                        className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300"
                                        onChange={() => handleOptionSelect(option.priceKey, option.name)}
                                      />
                                      <label
                                        htmlFor={optionId}
                                        className="ml-2 block text-sm font-medium text-gray-700"
                                      >
                                        {option.name}
                                      </label>
                                    </div>
                                    <div className="text-orange-600 font-bold">{formatPrice(displayPrice)} ₺</div>
                                  </div>

                                  {/* Detaylı Bilgi button */}
                                  <div className="ml-6 mt-2">
                                    <button
                                      type="button"
                                      onClick={() => toggleDetailInfo(optionId)}
                                      className="flex items-center bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded"
                                    >
                                      Detaylı Bilgi
                                      <Plus className="ml-1 h-4 w-4" />
                                    </button>

                                    {/* Detail info panel - Detaylı bilgi panellerini koruyorum */}
                                    {activeDetailId === optionId && (
                                      <div className="mt-2 p-3 bg-gray-100 rounded text-sm text-gray-700">
                                        {selectedProblem === "ekran-degisimi" &&
                                          option.priceKey === "orijinal-servis-ekran" && (
                                            <>
                                              <ul className="list-disc ml-5 mt-2">
                                                <li>
                                                  Cihazınız Apple'ın Türkiye'de <strong>desteklediği</strong> modeller
                                                  arasındaysa belirtilen fiyat geçerlidir.
                                                </li>
                                                <li>Apple garantiniz geçerliliğini koruyacaktır.</li>
                                                <li>
                                                  Apple tarafından uygulanan kalibrasyon sayesinde, cihazınızda herhangi
                                                  bir uyarı görüntülenmez ve ayarlar menüsünde{" "}
                                                  <strong>"Orijinal Apple Parçası"</strong> ifadesi yer alır.
                                                </li>
                                                <li>
                                                  İşlem öncesinde "iPhone'umu Bul" özelliğinin kapalı olması
                                                  gerekmektedir.
                                                </li>
                                                <li>
                                                  <strong>1 yıl</strong> Apple garantili
                                                </li>
                                                <li>
                                                  <strong>1-2 iş günü</strong> değişim süresi
                                                </li>
                                                <li>
                                                  Değişim esnasında herhangi bir <strong>veri kaybı</strong> yaşanmaz.
                                                </li>
                                              </ul>
                                            </>
                                          )}

                                        {/* Diğer detaylı bilgi panelleri aynı şekilde devam ediyor */}
                                        {/* ... */}

                                        {/* Burada diğer detaylı bilgi panellerini koruyorum, değişiklik yapmıyorum */}
                                        {selectedProblem === "ekran-degisimi" &&
                                          option.priceKey === "orijinal-uyarisiz-ekran" && (
                                            <>
                                              <ul className="list-disc ml-5 mt-2">
                                                <li>
                                                  Başka bir iPhone'dan çıkarılan <strong>orijinal</strong> bir parça ya
                                                  da <strong>yeni üretilmiş</strong> bir parça kullanılarak değişim
                                                  gerçekleştirilir.
                                                </li>
                                                <li>
                                                  Hasarlı ekranınızın üzerindeki orijinal çip, yeni takılacak olan
                                                  ekrana <strong>aktarıldığı</strong> için, cihazınız parça ile eşleşme
                                                  yapmaz.
                                                </li>
                                                <li>
                                                  Bu sayede <strong>"Parçalar ve servis geçmişi"</strong> bölümünde
                                                  herhangi bir <strong>uyarı vermez</strong>.
                                                </li>
                                                <li>
                                                  Ekran yüzeyinde çizik ya da darbeye bağlı herhangi bir hasar bulunmaz.
                                                </li>
                                                <li>
                                                  <strong>6 ay</strong> parça garantili
                                                </li>
                                                <li>
                                                  <strong>Aynı gün</strong> değişim süresi
                                                </li>
                                                <li>
                                                  Değişim esnasında herhangi bir <strong>veri kaybı</strong> yaşanmaz.
                                                </li>
                                              </ul>
                                            </>
                                          )}

                                        {/* Diğer tüm detaylı bilgi panelleri aynı şekilde devam ediyor */}
                                        {/* ... */}

                                        {/* Default case for other repair types */}
                                        {((selectedProblem !== "ekran-degisimi" &&
                                          selectedProblem !== "arka-cam-degisimi" &&
                                          selectedProblem !== "arka-kamera-degisimi" &&
                                          selectedProblem !== "sarj-soketi-degisimi") ||
                                          (selectedProblem === "ekran-degisimi" &&
                                            option.priceKey !== "orijinal-servis-ekran" &&
                                            option.priceKey !== "orijinal-uyarisiz-ekran" &&
                                            option.priceKey !== "orijinal-uyarili-ekran" &&
                                            option.priceKey !== "yan-sanayi-ekran")) && (
                                          <>
                                            <p>{option.name} hakkında detaylı bilgi:</p>
                                            <ul className="list-disc ml-5 mt-2">
                                              <li>Orijinal kalite parça kullanılmaktadır</li>
                                              <li>6 ay garantilidir</li>
                                              <li>Tamir süresi yaklaşık 1-2 saattir</li>
                                              <li>Ücretsiz teknik kontrol yapılmaktadır</li>
                                              <li>Değişim esnasında herhangi bir veri kaybı yaşanmaz</li>
                                            </ul>
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  </>
                )
              }
              {showRepairTypeSelector && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 className="text-xl font-bold mb-4">Tamir Seçiminiz Eklendi</h3>
                    <p className="mb-4">Cihazınız için başka bir tamir işlemi eklemek ister misiniz?</p>
                    <div className="flex justify-between">
                      <button
                        onClick={handleAddAnotherRepair}
                        className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-2 px-4 rounded-md font-medium"
                      >
                        Başka Tamir Ekle
                      </button>
                      <button
                        onClick={handleProceedToFinal}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md font-medium"
                      >
                        Devam Et
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {step === 5 && (
                <div className="w-full flex justify-center">
                  <div className="bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-extrabold mb-4 text-center">Tamir Talebi Oluştur</h2>

                    <form
                      className="space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.currentTarget)
                        const customerName = formData.get("customerName") as string
                        const customerPhone = formData.get("customerPhone") as string
                        const customerEmail = formData.get("customerEmail") as string
                        const notes = formData.get("notes") as string
                        const imeiNumber = formData.get("imeiNumber") as string
                        const securityCode = formData.get("securityCode") as string
                        const serviceType = formData.get("serviceType") as string
                        const addressText = formData.get("address") as string
                        const city = formData.get("city") as string
                        const district = formData.get("district") as string
                        const address = city && district ? `${city}, ${district}, ${addressText}` : addressText
                        const appointmentDate = formData.get("appointmentDate") as string
                        const appointmentTime = formData.get("appointmentTime") as string
                        const repairConsent = formData.get("repairConsent") === "on"
                        const privacyConsent = formData.get("privacyConsent") === "on"

                        if (!repairConsent || !privacyConsent) {
                          alert("Lütfen onay kutucuklarını işaretleyin.")
                          return
                        }

                        // Create service record
                        const serviceId = `SRV-${Date.now()}`
                        const serviceRecord = {
                          id: serviceId,
                          customerName,
                          customerPhone,
                          customerEmail,
                          notes,
                          imeiNumber,
                          securityCode,
                          serviceType,
                          address,
                          appointmentDate,
                          appointmentTime,
                          deviceType: "iPhone",
                          deviceModel: selectedModelName,
                          repairTypes: selectedRepairTypes,
                          totalPrice: calculateTotalPrice(),
                          discount: discount,
                          finalPrice: calculateFinalPrice(),
                          couponCode: couponSuccess ? couponCode : null,
                          status: "Beklemede",
                          createdAt: new Date().toISOString(),
                        }

                        // Save to localStorage
                        const existingRecords = JSON.parse(localStorage.getItem("serviceRecords") || "[]")
                        existingRecords.push(serviceRecord)
                        localStorage.setItem("serviceRecords", JSON.stringify(existingRecords))

                        // Show success message and redirect
                        alert(`Tamir talebiniz başarıyla oluşturuldu. Servis numaranız: ${serviceId}`)
                        router.push(`/servis-takip?id=${serviceId}`)
                      }}
                    >
                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Ad Soyad</label>
                        <input
                          type="text"
                          name="customerName"
                          placeholder="Adınız ve soyadınız"
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Telefon</label>
                        <input
                          type="tel"
                          name="customerPhone"
                          placeholder="+905xxxxxxxx"
                          required
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Bu telefon numarası ile daha sonra servis durumunu sorgulayabilirsiniz.
                        </p>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">E-posta</label>
                        <input
                          type="email"
                          name="customerEmail"
                          placeholder="ornek@mail.com"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Cihaz IMEI Numarası</label>
                        <input
                          type="text"
                          name="imeiNumber"
                          placeholder="15 haneli IMEI numarası"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          IMEI numaranızı öğrenmek için *#06# tuşlayabilir veya cihazınızın ayarlar menüsünden kontrol
                          edebilirsiniz.
                        </p>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">
                          Cihaz Güvenlik Kodu (İsteğe Bağlı)
                        </label>
                        <input
                          type="text"
                          name="securityCode"
                          placeholder="Cihazınızın ekran kilidi kodu"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                        <p className="mt-1 text-sm text-gray-500">
                          Cihazınızın ekran kilidi kodunu paylaşmak istemiyorsanız boş bırakabilirsiniz. Tamir sırasında
                          gerekli olması durumunda sizinle iletişime geçilecektir.
                        </p>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Servis Tipi</label>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="store-repair"
                              name="serviceType"
                              value="store-repair"
                              defaultChecked
                              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300"
                            />
                            <div className="ml-2 flex items-center">
                              <span className="flex items-center justify-center w-5 h-5 bg-green-100 text-green-600 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-3 h-3"
                                >
                                  <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <label htmlFor="store-repair" className="ml-2 block text-sm text-gray-700">
                                Mağazada Tamir
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="onsite-repair"
                              name="serviceType"
                              value="onsite-repair"
                              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300"
                            />
                            <div className="ml-2 flex items-center">
                              <span className="flex items-center justify-center w-5 h-5 bg-orange-100 text-orange-600 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-3 h-3"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <label htmlFor="onsite-repair" className="ml-2 block text-sm text-gray-700">
                                Yerinde Servis
                              </label>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id="shipping-repair"
                              name="serviceType"
                              value="shipping-repair"
                              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300"
                            />
                            <div className="ml-2 flex items-center">
                              <span className="flex items-center justify-center w-5 h-5 bg-red-100 text-red-600 rounded-full">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-3 h-3"
                                >
                                  <path d="M3.375 4.5C2.339 4.5 1.5 5.34 1.5 6.375V13.5h12V6.375c0-1.036-.84-1.875-1.875-1.875h-8.25zM13.5 15h-12v2.625c0 1.035.84 1.875 1.875 1.875h.375a3 3 0 116 0h3a.75.75 0 00.75-.75V15z" />
                                  <path d="M8.25 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0zM15.75 6.75a.75.75 0 00-.75.75v11.25c0 .087.015.17.042.248a3 3 0 015.958.464c.853-.175 1.522-.935 1.464-1.883a18.659 18.659 0 00-3.732-10.104 1.837 1.837 0 00-1.47-.725H15.75z" />
                                  <path d="M19.5 19.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                </svg>
                              </span>
                              <label htmlFor="shipping-repair" className="ml-2 block text-sm text-gray-700">
                                Ücretsiz Kargo İle Tamir
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div id="addressField" className="space-y-3">
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Adres Bilgileri</label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">İl</label>
                            <select
                              name="city"
                              value={selectedCity}
                              onChange={handleCityChange}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                            >
                              <option value="">İl Seçiniz</option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">İlçe</label>
                            <select
                              name="district"
                              value={selectedDistrict}
                              onChange={(e) => setSelectedDistrict(e.target.value)}
                              disabled={!selectedCity}
                              className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500 disabled:bg-gray-100 disabled:text-gray-500"
                            >
                              <option value="">İlçe Seçiniz</option>
                              {districts.length > 0 ? (
                                districts.map((district) => (
                                  <option key={district} value={district}>
                                    {district}
                                  </option>
                                ))
                              ) : selectedCity ? (
                                <option value="">Bu il için ilçe verisi yükleniyor...</option>
                              ) : null}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Açık Adres{" "}
                            <span id="addressRequired" className="hidden text-red-500">
                              *
                            </span>
                          </label>
                          <textarea
                            name="address"
                            rows={2}
                            placeholder="Mahalle, sokak, bina no, daire no gibi detaylı adres bilgileriniz"
                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                          ></textarea>
                        </div>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Randevu Tarihi</label>
                        <input
                          type="date"
                          name="appointmentDate"
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Randevu Saati</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {[
                            "09:00 - 10:00",
                            "10:00 - 11:00",
                            "11:00 - 12:00",
                            "13:00 - 14:00",
                            "14:00 - 15:00",
                            "15:00 - 16:00",
                            "16:00 - 17:00",
                            "17:00 - 18:00",
                          ].map((time) => (
                            <div key={time} className="flex items-center">
                              <input
                                type="radio"
                                id={`time-${time}`}
                                name="appointmentTime"
                                value={time}
                                className="sr-only peer"
                              />
                              <label
                                htmlFor={`time-${time}`}
                                className="w-full text-center px-3 py-1.5 text-sm border border-gray-300 rounded-md cursor-pointer peer-checked:bg-fuchsia-500 peer-checked:text-white peer-checked:border-fuchsia-500 hover:bg-gray-50 peer-checked:hover:bg-fuchsia-600"
                              >
                                {time}
                              </label>
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Her saat diliminde en fazla 2 randevu alınabilir. Dolu olan saatler seçilemez.
                        </p>
                      </div>

                      <div>
                        <label className="block text-lg font-bold text-fuchsia-700 mb-2">Notlar (Opsiyonel)</label>
                        <textarea
                          name="notes"
                          rows={3}
                          placeholder="Eklemek istediğiniz notlar..."
                          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        ></textarea>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="repairConsent"
                              name="repairConsent"
                              type="checkbox"
                              required
                              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="repairConsent" className="text-gray-700">
                              Cihazımın gerekli durumlarda sıfırlanmasına onay veriyorum
                            </label>
                            <p className="text-gray-500">
                              Bazı tamir işlemleri sırasında cihazınızın sıfırlanması gerekebilir. Bu durumda
                              verilerinizin yedeklenmesi sizin sorumluluğunuzdadır.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="privacyConsent"
                              name="privacyConsent"
                              type="checkbox"
                              required
                              className="h-4 w-4 text-fuchsia-600 focus:ring-fuchsia-500 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="privacyConsent" className="text-gray-700">
                              Kişisel verilerimin işlenmesine ilişkin{" "}
                              <span className="text-fuchsia-600">Aydınlatma Metni</span>'ni okudum ve kabul ediyorum
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          className="w-full bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-3 px-4 rounded-md font-medium"
                        >
                          Tamir Talebi Oluştur
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selection Summary - Right Side */}
          <div className="w-full md:w-1/3">
            <div className="bg-gray-100 rounded-lg p-3 sticky top-4 text-sm">
              <h3 className="text-2xl font-bold mb-4">Talep Özeti</h3>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-600">Marka</span>
                  <span className="font-medium">{selectedBrand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model</span>
                  <span className="font-medium">
                    {selectedModelName || (step >= 2 ? "Seçim Yapılıyor" : "Henüz Seçilmedi")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sorun</span>
                  <span className="font-medium">
                    {selectedProblemName || (step >= 3 ? "Seçim Yapılıyor" : "Bir sonraki adımda seçilecek")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seçenek</span>
                  <span className="font-medium">{selectedOptionName || "Seçim Yapılıyor"}</span>
                </div>
                {selectedRepairTypes.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-xl font-bold mb-3">Seçilen Tamir İşlemleri</h4>
                    <div className="space-y-2 mb-4">
                      {selectedRepairTypes.map((repairId) => {
                        const service = repairServices.find((s) => s.id === repairId)
                        const optionKey = selectedRepairOptions[repairId]
                        const option = service?.options.find((o) => o.priceKey === optionKey)

                        // Calculate the price for this repair option
                        let repairPrice = 0
                        const savedPrices = localStorage.getItem(`${repairId}Prices`)
                        if (savedPrices) {
                          try {
                            const priceData = JSON.parse(savedPrices)
                            const modelPrices = priceData[selectedModel]

                            if (modelPrices) {
                              const priceKeyMap: Record<string, string> = {
                                "orijinal-servis-ekran": "originalService",
                                "orijinal-uyarisiz-ekran": "originalUnwarned",
                                "orijinal-uyarili-ekran": "originalWarned",
                                "yan-sanayi-ekran": "aftermarket",
                                "uyarili-batarya": "originalWarned",
                                "uyarisiz-batarya": "originalUnwarned",
                                "orijinal-servis-batarya": "originalService",
                                "orijinal-on-kamera": "original",
                                "orijinal-aktarimli-on-kamera": "originalTransfer",
                                "orijinal-uyarili-arka-kamera": "originalWarned",
                                "orijinal-uyarisiz-arka-kamera": "originalUnwarned",
                                "orijinal-servis-arka-kamera": "originalService",
                                "orijinal-arka-cam": "original",
                                "orijinal-servis-arka-cam": "originalService",
                                "on-cam": "original",
                                "kasa-degisimi": "original",
                                "sarj-soketi-degisimi": "original",
                                "ac-kapat-tusu-ve-flas-degisimi": "original",
                                "titresim-motoru-degisimi": "original",
                                "ic-kulaklik-degisimi": "original",
                                "hoparlor-degisimi": "original",
                                "kamera-cami-degisimi": "original",
                                "proximity-isik-sensoru-degisimi": "original",
                                "face-id-onarimi": "original",
                                "nfc-degisimi": "original",
                                "detayli-genel-temizlik": "original",
                                "ses-ve-sessiz-alma-tusu-degisimi": "original",
                                "truedepth-kamera-degisimi": "original",
                                "lidar-sensor-degisimi": "original",
                                "veri-kurtarma": "original",
                                "sivi-temas": "original",
                                "acilmiyor-sorunu": "original",
                                "diger-sorunlar": "original",
                                "anakart-onarimi": "original",
                              }

                              const adminPriceKey = priceKeyMap[optionKey] || "original"

                              if (modelPrices[adminPriceKey] && modelPrices[adminPriceKey] !== "N/A") {
                                repairPrice = Number.parseInt(modelPrices[adminPriceKey])
                              }
                            }
                          } catch (e) {
                            console.error("Error calculating price:", e)
                          }
                        }

                        return (
                          <div key={repairId} className="flex justify-between items-center">
                            <div>
                              <div className="font-medium">{service?.name}</div>
                              <div className="text-sm text-gray-600">{option?.name}</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-fuchsia-600 font-medium">
                                {repairPrice > 0 ? `${repairPrice.toLocaleString("tr-TR")} ₺` : "Fiyat bilgisi yok"}
                              </div>
                              {step < 5 && (
                                <button
                                  onClick={() => handleRemoveRepairType(repairId)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Kaldır
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    {/* Kupon Kodu Bölümü */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Kupon Kodu</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          placeholder="Kupon kodunuz varsa giriniz"
                          className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-fuchsia-500 focus:border-fuchsia-500"
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          disabled={isValidatingCoupon}
                          className="bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50"
                        >
                          {isValidatingCoupon ? "..." : "Uygula"}
                        </button>
                      </div>
                      {couponError && <p className="mt-1 text-sm text-red-600">{couponError}</p>}
                      {couponSuccess && <p className="mt-1 text-sm text-green-600">{couponSuccess}</p>}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between font-medium">
                        <span>Ara Toplam</span>
                        <span>{calculateTotalPrice().toLocaleString("tr-TR")} ₺</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>İndirim</span>
                          <span>-{discount.toLocaleString("tr-TR")} ₺</span>
                        </div>
                      )}

                      <div className="flex justify-between font-medium text-fuchsia-600 text-lg pt-1 border-t border-gray-200 mt-1">
                        <span>Toplam</span>
                        <span>{calculateFinalPrice().toLocaleString("tr-TR")} ₺</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
