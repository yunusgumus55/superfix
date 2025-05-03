"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Smartphone, Battery, Wrench, PenToolIcon as Tool, Camera, Volume2 } from "lucide-react"
import { Toaster } from "@/components/ui/toaster"

// Tamir hizmetleri kategorileri
const serviceCategories = [
  {
    id: "screen-repairs",
    name: "Ekran ve Cam Değişimleri",
    icon: <Smartphone className="h-5 w-5" />,
    services: [
      { id: "ekran-degisimi", name: "Ekran Değişimi" },
      { id: "on-cam-degisimi", name: "Ön Cam Değişimi" },
      { id: "arka-cam-degisimi", name: "Arka Cam Değişimi" },
      { id: "kamera-cami-degisimi", name: "Kamera Camı Değişimi" },
    ],
  },
  {
    id: "camera-repairs",
    name: "Kamera Değişimleri",
    icon: <Camera className="h-5 w-5" />,
    services: [
      { id: "on-kamera-degisimi", name: "Ön Kamera Değişimi" },
      { id: "arka-kamera-degisimi", name: "Arka Kamera Değişimi" },
      { id: "truedepth-kamera-degisimi", name: "Truedepth Kamera Değişimi" },
    ],
  },
  {
    id: "battery-repairs",
    name: "Batarya ve Güç Sorunları",
    icon: <Battery className="h-5 w-5" />,
    services: [
      { id: "batarya-degisimi", name: "Batarya Değişimi" },
      { id: "sarj-soketi-degisimi", name: "Şarj Soketi Değişimi" },
      { id: "acilmiyor-sorunu", name: "Açılmıyor Sorunu" },
    ],
  },
  {
    id: "button-sensor-repairs",
    name: "Tuş ve Sensör Değişimleri",
    icon: <Tool className="h-5 w-5" />,
    services: [
      { id: "ac-kapat-tusu-ve-flas-degisimi", name: "Aç Kapat Tuşu ve Flaş Değişimi" },
      { id: "ses-ve-sessiz-alma-tusu-degisimi", name: "Ses ve Sessiz Alma Tuşu Değişimi" },
      { id: "proximity-isik-sensoru-degisimi", name: "Proximity Işık Sensörü Değişimi" },
      { id: "lidar-sensor-degisimi", name: "Lidar Sensör Değişimi" },
      { id: "face-id-onarimi", name: "Face ID Onarımı" },
      { id: "nfc-degisimi", name: "NFC Değişimi" },
    ],
  },
  {
    id: "sound-vibration-repairs",
    name: "Ses ve Titreşim Sorunları",
    icon: <Volume2 className="h-5 w-5" />,
    services: [
      { id: "hoparlor-degisimi", name: "Hoparlör Değişimi" },
      { id: "ic-kulaklik-degisimi", name: "İç Kulaklık (Ahize) Değişimi" },
      { id: "titresim-motoru-degisimi", name: "Titreşim Motoru Değişimi" },
    ],
  },
  {
    id: "other-repairs",
    name: "Diğer Tamir Hizmetleri",
    icon: <Wrench className="h-5 w-5" />,
    services: [
      { id: "kasa-degisimi", name: "Kasa Değişimi" },
      { id: "anakart-onarimi", name: "Anakart Onarımı" },
      { id: "veri-kurtarma", name: "Veri Kurtarma" },
      { id: "sivi-temas", name: "Sıvı Temas" },
      { id: "detayli-genel-temizlik", name: "Detaylı Genel Temizlik" },
      { id: "diger-sorunlar", name: "Diğer Sorunlar" },
    ],
  },
]

export default function RepairServicesPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Oturum kontrolü
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }
  }, [router])

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
            <h1 className="text-2xl font-bold">Tamir Hizmetleri Yönetimi</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 flex flex-row items-center space-y-0 gap-2">
                <div className="bg-primary/10 p-2 rounded-full">{category.icon}</div>
                <CardTitle>{category.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {category.services.map((service) => (
                    <li key={service.id} className="p-4 hover:bg-gray-50">
                      <Link
                        href={`/admin/dashboard/repair-services/${service.id}`}
                        className="flex items-center justify-between"
                      >
                        <span>{service.name}</span>
                        <Button variant="outline" size="sm">
                          Fiyatları Düzenle
                        </Button>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  )
}
