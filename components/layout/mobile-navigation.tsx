"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  Menu,
  Phone,
  ShoppingBag,
  Smartphone,
  Wrench,
  MapPin,
  Battery,
  HardDrive,
  ChevronRight,
  X,
  Clock,
  Star,
  Info,
  Package,
} from "lucide-react"

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [showServices, setShowServices] = useState(false)

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menü</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[85%] sm:w-[350px] p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gradient-to-r from-orange-500 to-orange-600">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold text-white">
                  <span>Superfix</span>
                  <span className="text-sm ml-1">Bilişim</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white/10 text-white hover:bg-white/20 border-0"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="h-4 w-4 mr-2" /> Ara
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex-1 bg-white/10 text-white hover:bg-white/20 border-0"
                  onClick={() => setIsOpen(false)}
                >
                  <MapPin className="h-4 w-4 mr-2" /> Mağaza Bul
                </Button>
              </div>
            </div>

            {showServices ? (
              <div className="flex-1 overflow-auto">
                <div className="p-4 border-b">
                  <Button variant="ghost" className="flex items-center mb-2" onClick={() => setShowServices(false)}>
                    <ChevronRight className="h-4 w-4 mr-2 rotate-180" /> Geri
                  </Button>
                  <h3 className="text-lg font-bold mb-2">Tamir Hizmetleri</h3>
                </div>
                <div className="p-2">
                  <Link
                    href="/hizmetler/ekran-tamiri"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Smartphone className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium">Ekran Tamiri</div>
                      <div className="text-sm text-gray-500">iPhone ekran değişimi</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler/batarya-degisimi"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Battery className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium">Batarya Değişimi</div>
                      <div className="text-sm text-gray-500">iPhone pil değişimi</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler/veri-kurtarma"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <HardDrive className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium">Veri Kurtarma</div>
                      <div className="text-sm text-gray-500">Silinen verileri kurtarma</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Wrench className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium">Tüm Hizmetler</div>
                      <div className="text-sm text-gray-500">Diğer tamir hizmetleri</div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div className="p-2">
                  <Link
                    href="/"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Home className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Ana Sayfa</span>
                  </Link>
                  <button
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md w-full text-left transition-colors"
                    onClick={() => setShowServices(true)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Wrench className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Tamir Hizmetleri</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Link
                    href="/sertifikali-urunler"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <ShoppingBag className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <div className="font-medium">Sertifikalı Ürünler</div>
                      <div className="text-sm text-gray-500">Getmobil iş ortaklığı</div>
                    </div>
                  </Link>
                  <Link
                    href="/tamir-talebi"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Phone className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Tamir Talebi</span>
                  </Link>
                  <Link
                    href="/tamir-talebi/stok"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <Package className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Stok Yönetimi</span>
                  </Link>
                  <Link
                    href="/magazalar"
                    className="flex items-center p-3 hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center mr-3">
                      <MapPin className="h-5 w-5 text-orange-500" />
                    </div>
                    <span>Mağazalarımız</span>
                  </Link>
                </div>

                <div className="p-4 mt-2 border-t">
                  <div className="text-sm font-medium text-gray-500 mb-3">Hakkımızda</div>
                  <div className="space-y-2">
                    <Link
                      href="/hakkimizda"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Info className="h-4 w-4 text-red-500 mr-3" />
                      <span className="text-sm">Biz Kimiz</span>
                    </Link>
                    <Link
                      href="/yorumlar"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Star className="h-4 w-4 text-red-500 mr-3" />
                      <span className="text-sm">Müşteri Yorumları</span>
                    </Link>
                    <Link
                      href="/calisma-saatleri"
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Clock className="h-4 w-4 text-red-500 mr-3" />
                      <span className="text-sm">Çalışma Saatleri</span>
                    </Link>
                  </div>
                </div>

                <div className="p-4 mt-2 border-t">
                  <div className="text-sm font-medium text-gray-500 mb-3">İş Ortaklarımız</div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <Image
                      src="/images/getmobil-logo.png"
                      alt="Getmobil"
                      width={100}
                      height={30}
                      className="h-6 w-auto"
                    />
                    <span className="text-sm ml-3">Resmi İş Ortağımız</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-4 border-t">
              <Button className="w-full bg-orange-500 hover:bg-orange-600 shadow-sm">
                <Phone className="h-4 w-4 mr-2" /> Hemen Ara: +90 535 016 55 55
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
