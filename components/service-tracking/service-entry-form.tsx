"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, ArrowRight, Check, ChevronRight, Calendar, AlertCircle } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// iPhone modelleri ve görselleri
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
  "iphone-14-pro-max": {
    name: "iPhone 14 Pro Max",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.9,
  },
  "iphone-14-pro": {
    name: "iPhone 14 Pro",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.85,
  },
  "iphone-14-plus": {
    name: "iPhone 14 Plus",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.8,
  },
  "iphone-14": {
    name: "iPhone 14",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.75,
  },
  "iphone-13-pro-max": {
    name: "iPhone 13 Pro Max",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.85,
  },
  "iphone-13-pro": {
    name: "iPhone 13 Pro",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.8,
  },
  "iphone-13": {
    name: "iPhone 13",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.75,
  },
  "iphone-13-mini": {
    name: "iPhone 13 Mini",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.7,
  },
  "iphone-12-pro-max": {
    name: "iPhone 12 Pro Max",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.8,
  },
  "iphone-12-pro": {
    name: "iPhone 12 Pro",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.75,
  },
  "iphone-12": {
    name: "iPhone 12",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.7,
  },
  "iphone-12-mini": {
    name: "iPhone 12 Mini",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.65,
  },
  "iphone-11-pro-max": {
    name: "iPhone 11 Pro Max",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.75,
  },
  "iphone-11-pro": {
    name: "iPhone 11 Pro",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.7,
  },
  "iphone-11": {
    name: "iPhone 11",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.65,
  },
  "iphone-xr": {
    name: "iPhone XR",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.6,
  },
  "iphone-xs-max": {
    name: "iPhone XS Max",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.65,
  },
  "iphone-xs": {
    name: "iPhone XS",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.6,
  },
  "iphone-x": {
    name: "iPhone X",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.55,
  },
  "iphone-8-plus": {
    name: "iPhone 8 Plus",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.5,
  },
  "iphone-8": {
    name: "iPhone 8",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.45,
  },
  "iphone-7-plus": {
    name: "iPhone 7 Plus",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.4,
  },
  "iphone-7": {
    name: "iPhone 7",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.35,
  },
  "iphone-se-2022": {
    name: "iPhone SE 2022",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.6,
  },
  "iphone-se-2020": {
    name: "iPhone SE 2020",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=400&auto=format&fit=crop",
    priceMultiplier: 0.5,
  },
}

export default function ServiceEntryForm() {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    // Cihaz Bilgileri (Adım 1)
    deviceType: "",
    deviceModel: "",
    deviceModelName: "",
    serialNumber: "",
    imei: "",

    // Onarım Türleri (Adım 2)
    repairTypes: [] as string[],
    issueDescription: "",
    deviceCondition: "",

    // Müşteri Bilgileri (Adım 3)
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    devicePassword: "",
    accessories: {
      charger: false,
      case: false,
      screenProtector: false,
      box: false,
      other: false,
    },
    otherAccessories: "",

    // Bildirim Tercihleri
    notifications: {
      sms: true,
      email: false,
    },

    // Servis Bilgileri (Adım 4)
    serviceType: "in-store",
    technicianNotes: "",
    estimatedCost: "",
    estimatedCompletionDate: "",
    priority: "normal",
    status: "received",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAccessoryChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      accessories: {
        ...prev.accessories,
        [name]: checked,
      },
    }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRepairTypeToggle = (repairType: string) => {
    setFormData((prev) => {
      const currentRepairTypes = [...prev.repairTypes]

      if (currentRepairTypes.includes(repairType)) {
        // Eğer zaten seçiliyse, kaldır
        return {
          ...prev,
          repairTypes: currentRepairTypes.filter((type) => type !== repairType),
        }
      } else {
        // Seçili değilse, ekle
        return {
          ...prev,
          repairTypes: [...currentRepairTypes, repairType],
        }
      }
    })
  }

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setIsSubmitting(false)

      // Servis numarası oluştur
      const serviceNumber = `SRV-${Math.floor(100000 + Math.random() * 900000)}`

      toast({
        title: "Servis kaydı oluşturuldu",
        description: `Servis numarası: ${serviceNumber}`,
      })

      // Form sıfırlama ve ilk adıma dönme
      setFormData({
        deviceType: "",
        deviceModel: "",
        deviceModelName: "",
        serialNumber: "",
        imei: "",
        repairTypes: [],
        issueDescription: "",
        deviceCondition: "",
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        devicePassword: "",
        accessories: {
          charger: false,
          case: false,
          screenProtector: false,
          box: false,
          other: false,
        },
        otherAccessories: "",
        notifications: {
          sms: true,
          email: false,
        },
        serviceType: "in-store",
        technicianNotes: "",
        estimatedCost: "",
        estimatedCompletionDate: "",
        priority: "normal",
        status: "received",
      })
      setCurrentStep(1)
    }, 1500)
  }

  // Tamir hizmetleri
  const repairServices = [
    {
      id: "ekran-degisimi",
      name: "Ekran Değişimi",
      description: "Kırık, çatlak veya görüntü sorunu olan ekranların değişimi",
    },
    {
      id: "batarya-degisimi",
      name: "Batarya Değişimi",
      description: "Şarj sorunu, şişme veya hızlı şarj tükenmesi yaşayan cihazlar için batarya değişimi",
    },
    {
      id: "on-kamera-degisimi",
      name: "Ön Kamera Değişimi",
      description: "Ön kamera sorunları, bulanık görüntü veya çalışmama durumlarında kamera değişimi",
    },
    {
      id: "arka-kamera-degisimi",
      name: "Arka Kamera Değişimi",
      description: "Arka kamera sorunları, bulanık görüntü veya çalışmama durumlarında kamera değişimi",
    },
    {
      id: "arka-cam-degisimi",
      name: "Arka Cam Değişimi",
      description: "Kırık veya çatlak arka camların değişimi",
    },
    {
      id: "on-cam-degisimi",
      name: "Ön Cam Değişimi",
      description: "Kırık veya çatlak ön camların değişimi",
    },
    {
      id: "kasa-degisimi",
      name: "Kasa Değişimi",
      description: "Hasar görmüş veya deforme olmuş kasaların değişimi",
    },
    {
      id: "sarj-soketi-degisimi",
      name: "Şarj Soketi Değişimi",
      description: "Şarj sorunu yaşayan cihazlar için şarj soketi değişimi",
    },
    {
      id: "hoparlor-degisimi",
      name: "Hoparlör Değişimi",
      description: "Ses sorunu yaşayan cihazlar için hoparlör değişimi",
    },
    {
      id: "veri-kurtarma",
      name: "Veri Kurtarma",
      description: "Bozulan veya açılmayan cihazlardan veri kurtarma işlemi",
    },
    {
      id: "sivi-temas",
      name: "Sıvı Temas",
      description: "Suya düşen veya sıvı teması olan cihazların temizliği ve onarımı",
    },
    {
      id: "acilmiyor-sorunu",
      name: "Açılmıyor Sorunu",
      description: "Açılmayan veya kapanan cihazların onarımı",
    },
    {
      id: "anakart-onarimi",
      name: "Anakart Onarımı",
      description: "Anakart sorunu yaşayan cihazların onarımı",
    },
    {
      id: "diger-sorunlar",
      name: "Diğer Sorunlar",
      description: "Listede bulunmayan diğer sorunların onarımı",
    },
  ]

  // İlerleme çubuğu
  const renderProgressBar = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step ? "border-red-500 bg-red-500 text-white" : "border-gray-300 text-gray-400"
                }`}
              >
                {step}
              </div>
              {step < 5 && (
                <div className="hidden sm:flex items-center">
                  <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                  <div className={`h-0.5 w-12 ${currentStep > step ? "bg-red-500" : "bg-gray-200"}`} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div>Cihaz Bilgileri</div>
          <div>Sorun Detayları</div>
          <div>Müşteri Bilgileri</div>
          <div>Servis Bilgileri</div>
          <div>İşlem Özeti</div>
        </div>
      </div>
    )
  }

  // Adım 1: Cihaz Bilgileri
  const renderStep1 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Cihaz Bilgileri</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Cihaz Tipi</Label>
              <Select value={formData.deviceType} onValueChange={(value) => handleSelectChange("deviceType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Cihaz tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iphone">iPhone</SelectItem>
                  <SelectItem value="ipad">iPad</SelectItem>
                  <SelectItem value="macbook">MacBook</SelectItem>
                  <SelectItem value="watch">Apple Watch</SelectItem>
                  <SelectItem value="airpods">AirPods</SelectItem>
                  <SelectItem value="other">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.deviceType && (
              <div className="space-y-2">
                <Label>Model</Label>
                <Select
                  value={formData.deviceModel}
                  onValueChange={(value) => {
                    setFormData((prev) => ({
                      ...prev,
                      deviceModel: value,
                      deviceModelName: formData.deviceType === "iphone" ? iPhoneModels[value]?.name || value : value,
                    }))
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Model seçin" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {formData.deviceType === "iphone" ? (
                      Object.entries(iPhoneModels).map(([slug, model]) => (
                        <SelectItem key={slug} value={slug}>
                          {model.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="model1">Model 1</SelectItem>
                        <SelectItem value="model2">Model 2</SelectItem>
                        <SelectItem value="model3">Model 3</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="serialNumber">Seri Numarası (Opsiyonel)</Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Cihazın seri numarası"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imei">IMEI Numarası (Opsiyonel)</Label>
              <Input
                id="imei"
                name="imei"
                value={formData.imei}
                onChange={handleChange}
                placeholder="Cihazın IMEI numarası"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={nextStep}
            disabled={!formData.deviceType || !formData.deviceModel}
            className="bg-red-500 hover:bg-red-600"
          >
            İleri <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Adım 2: Sorun Detayları
  const renderStep2 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Sorun Detayları</h3>
          <p className="text-sm text-muted-foreground">
            {formData.deviceModelName || formData.deviceModel} için onarım türünü seçin
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {repairServices.map((service) => (
              <div
                key={service.id}
                className={`border rounded-md p-3 cursor-pointer transition-colors ${
                  formData.repairTypes.includes(service.id)
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 hover:border-red-200 hover:bg-red-50/50"
                }`}
                onClick={() => handleRepairTypeToggle(service.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-medium">{service.name}</span>
                    <span className="text-xs text-gray-500">{service.description}</span>
                  </div>
                  {formData.repairTypes.includes(service.id) && <Check className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="issueDescription">Sorun Açıklaması</Label>
            <Textarea
              id="issueDescription"
              name="issueDescription"
              value={formData.issueDescription}
              onChange={handleChange}
              placeholder="Cihazda yaşanan sorunu detaylı olarak açıklayın"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deviceCondition">Cihazın Genel Durumu</Label>
            <Select
              value={formData.deviceCondition}
              onValueChange={(value) => handleSelectChange("deviceCondition", value)}
            >
              <SelectTrigger id="deviceCondition">
                <SelectValue placeholder="Cihazın genel durumunu seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">Yeni/Mükemmel</SelectItem>
                <SelectItem value="good">İyi</SelectItem>
                <SelectItem value="fair">Orta</SelectItem>
                <SelectItem value="poor">Kötü</SelectItem>
                <SelectItem value="damaged">Hasarlı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri
          </Button>
          <Button
            onClick={nextStep}
            disabled={formData.repairTypes.length === 0 || !formData.deviceCondition}
            className="bg-red-500 hover:bg-red-600"
          >
            İleri <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Adım 3: Müşteri Bilgileri
  const renderStep3 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Müşteri Bilgileri</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Ad Soyad</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Telefon</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">E-posta</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                type="email"
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Bildirim Tercihleri</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smsNotification"
                    checked={formData.notifications?.sms}
                    onCheckedChange={(checked) => handleNotificationChange("sms", checked as boolean)}
                  />
                  <Label htmlFor="smsNotification" className="font-normal">
                    SMS Bildirimleri
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emailNotification"
                    checked={formData.notifications?.email}
                    onCheckedChange={(checked) => handleNotificationChange("email", checked as boolean)}
                  />
                  <Label htmlFor="emailNotification" className="font-normal">
                    E-posta Bildirimleri
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="devicePassword">Cihaz Güvenlik Kodu (Opsiyonel)</Label>
              <Input
                id="devicePassword"
                name="devicePassword"
                value={formData.devicePassword}
                onChange={handleChange}
                placeholder="Cihaz şifresi/PIN"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label>Cihaz ile Birlikte Teslim Edilen Aksesuarlar</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="charger"
                  checked={formData.accessories.charger}
                  onCheckedChange={(checked) => handleAccessoryChange("charger", checked as boolean)}
                />
                <Label htmlFor="charger" className="font-normal">
                  Şarj Cihazı
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="case"
                  checked={formData.accessories.case}
                  onCheckedChange={(checked) => handleAccessoryChange("case", checked as boolean)}
                />
                <Label htmlFor="case" className="font-normal">
                  Kılıf
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="screenProtector"
                  checked={formData.accessories.screenProtector}
                  onCheckedChange={(checked) => handleAccessoryChange("screenProtector", checked as boolean)}
                />
                <Label htmlFor="screenProtector" className="font-normal">
                  Ekran Koruyucu
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="box"
                  checked={formData.accessories.box}
                  onCheckedChange={(checked) => handleAccessoryChange("box", checked as boolean)}
                />
                <Label htmlFor="box" className="font-normal">
                  Orijinal Kutu
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="other"
                  checked={formData.accessories.other}
                  onCheckedChange={(checked) => handleAccessoryChange("other", checked as boolean)}
                />
                <Label htmlFor="other" className="font-normal">
                  Diğer
                </Label>
              </div>
            </div>
          </div>

          {formData.accessories.other && (
            <div className="space-y-2">
              <Label htmlFor="otherAccessories">Diğer Aksesuarlar</Label>
              <Input
                id="otherAccessories"
                name="otherAccessories"
                value={formData.otherAccessories}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri
          </Button>
          <Button
            onClick={nextStep}
            disabled={!formData.customerName || !formData.customerPhone}
            className="bg-red-500 hover:bg-red-600"
          >
            İleri <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Adım 4: Servis Bilgileri
  const renderStep4 = () => {
    return (
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Servis Bilgileri</h3>

          <div className="space-y-4">
            <div>
              <Label>Servis Tipi</Label>
              <RadioGroup
                value={formData.serviceType}
                onValueChange={(value) => handleSelectChange("serviceType", value)}
                className="flex flex-col space-y-2 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-store" id="in-store" />
                  <Label htmlFor="in-store" className="cursor-pointer">
                    Mağazada Tamir
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="on-site" id="on-site" />
                  <Label htmlFor="on-site" className="cursor-pointer">
                    Yerinde Servis
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mail-in" id="mail-in" />
                  <Label htmlFor="mail-in" className="cursor-pointer">
                    Kargo ile Gönderim
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Öncelik</Label>
              <Select value={formData.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Düşük</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                  <SelectItem value="urgent">Acil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Tahmini Maliyet (₺)</Label>
              <Input
                id="estimatedCost"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleChange}
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCompletionDate">Tahmini Tamamlanma Tarihi</Label>
              <div className="relative">
                <Input
                  id="estimatedCompletionDate"
                  name="estimatedCompletionDate"
                  type="date"
                  value={formData.estimatedCompletionDate}
                  onChange={handleChange}
                  className="pl-10"
                  min={new Date().toISOString().split("T")[0]}
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technicianNotes">Teknisyen Notları</Label>
              <Textarea
                id="technicianNotes"
                name="technicianNotes"
                value={formData.technicianNotes}
                onChange={handleChange}
                placeholder="Servis ile ilgili ek notlar"
                rows={3}
              />
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start mt-4">
            <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-700">
              Servis kaydı oluşturulduktan sonra, müşteriye servis numarası ve tahmini tamamlanma tarihi bilgisi SMS ile
              gönderilecektir.
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri
          </Button>
          <Button onClick={nextStep} disabled={!formData.priority} className="bg-red-500 hover:bg-red-600">
            İleri <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  // Adım 5: İşlem Özeti
  const renderStep5 = () => {
    // Helper function to get repair type names
    const getRepairTypeNames = () => {
      return formData.repairTypes.map((typeId) => {
        const service = repairServices.find((s) => s.id === typeId)
        return service ? service.name : typeId
      })
    }

    // Helper function to get device condition text
    const getDeviceConditionText = () => {
      const conditions = {
        new: "Yeni/Mükemmel",
        good: "İyi",
        fair: "Orta",
        poor: "Kötü",
        damaged: "Hasarlı",
      }
      return conditions[formData.deviceCondition] || formData.deviceCondition
    }

    // Helper function to get service type text
    const getServiceTypeText = () => {
      const types = {
        "in-store": "Mağazada Tamir",
        "on-site": "Yerinde Servis",
        "mail-in": "Kargo ile Gönderim",
      }
      return types[formData.serviceType] || formData.serviceType
    }

    // Helper function to get priority text
    const getPriorityText = () => {
      const priorities = {
        low: "Düşük",
        normal: "Normal",
        high: "Yüksek",
        urgent: "Acil",
      }
      return priorities[formData.priority] || formData.priority
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Sol taraf: Tamir talep formu */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Tamir Talebi</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Ad Soyad</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerPhone">Telefon</Label>
              <Input
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerEmail">E-posta</Label>
              <Input
                id="customerEmail"
                name="customerEmail"
                value={formData.customerEmail}
                onChange={handleChange}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Ek Notlar</Label>
              <Textarea
                id="additionalNotes"
                name="technicianNotes"
                value={formData.technicianNotes}
                onChange={handleChange}
                placeholder="Servis ile ilgili eklemek istediğiniz notlar"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Sağ taraf: İşlem özeti */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">İşlem Özeti</h3>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Cihaz Bilgileri</h4>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Cihaz Tipi:</p>
                  <p className="text-sm">{formData.deviceType === "iphone" ? "iPhone" : formData.deviceType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Model:</p>
                  <p className="text-sm">{formData.deviceModelName || formData.deviceModel}</p>
                </div>
                {formData.serialNumber && (
                  <div>
                    <p className="text-sm font-medium">Seri No:</p>
                    <p className="text-sm">{formData.serialNumber}</p>
                  </div>
                )}
                {formData.imei && (
                  <div>
                    <p className="text-sm font-medium">IMEI:</p>
                    <p className="text-sm">{formData.imei}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Sorun Detayları</h4>
              <div className="mt-1">
                <p className="text-sm font-medium">Onarım Türleri:</p>
                <ul className="list-disc list-inside text-sm">
                  {getRepairTypeNames().map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>

                {formData.issueDescription && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Sorun Açıklaması:</p>
                    <p className="text-sm">{formData.issueDescription}</p>
                  </div>
                )}

                <div className="mt-2">
                  <p className="text-sm font-medium">Cihaz Durumu:</p>
                  <p className="text-sm">{getDeviceConditionText()}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Servis Bilgileri</h4>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Servis Tipi:</p>
                  <p className="text-sm">{getServiceTypeText()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Öncelik:</p>
                  <p className="text-sm">{getPriorityText()}</p>
                </div>
                {formData.estimatedCost && (
                  <div>
                    <p className="text-sm font-medium">Tahmini Maliyet:</p>
                    <p className="text-sm">{formData.estimatedCost} ₺</p>
                  </div>
                )}
                {formData.estimatedCompletionDate && (
                  <div>
                    <p className="text-sm font-medium">Tahmini Tamamlanma:</p>
                    <p className="text-sm">{formData.estimatedCompletionDate}</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Bildirim Tercihleri</h4>
              <div className="mt-1">
                <ul className="list-disc list-inside text-sm">
                  {formData.notifications?.sms && <li>SMS Bildirimleri ({formData.customerPhone})</li>}
                  {formData.notifications?.email && formData.customerEmail && (
                    <li>E-posta Bildirimleri ({formData.customerEmail})</li>
                  )}
                  {!formData.notifications?.sms && !formData.notifications?.email && (
                    <li>Bildirim tercihi seçilmedi</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Toplam Tutar:</span>
                <span className="text-lg font-bold text-red-600">
                  {formData.estimatedCost ? `${formData.estimatedCost} ₺` : "Belirtilmedi"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 flex justify-between">
          <Button variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Geri
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="bg-red-500 hover:bg-red-600">
            {isSubmitting ? "Kaydediliyor..." : "Servis Kaydı Oluştur"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {renderProgressBar()}

      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
      {currentStep === 5 && renderStep5()}
    </div>
  )
}
