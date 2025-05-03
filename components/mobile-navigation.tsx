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
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-xl font-bold">
                  Superfix Bilişim
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
                  <Phone className="h-4 w-4 mr-2" /> Ara
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
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
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Smartphone className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-medium">Ekran Tamiri</div>
                      <div className="text-sm text-gray-500">iPhone ekran değişimi</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler/batarya-degisimi"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Battery className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-medium">Batarya Değişimi</div>
                      <div className="text-sm text-gray-500">iPhone pil değişimi</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler/veri-kurtarma"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <HardDrive className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-medium">Veri Kurtarma</div>
                      <div className="text-sm text-gray-500">Silinen verileri kurtarma</div>
                    </div>
                  </Link>
                  <Link
                    href="/hizmetler"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Wrench className="h-5 w-5 text-red-500 mr-3" />
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
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5 text-red-500 mr-3" />
                    <span>Ana Sayfa</span>
                  </Link>
                  <button
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md w-full text-left"
                    onClick={() => setShowServices(true)}
                  >
                    <Wrench className="h-5 w-5 text-red-500 mr-3" />
                    <span>Tamir Hizmetleri</span>
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </button>
                  <Link
                    href="/sertifikali-urunler"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5 text-red-500 mr-3" />
                    <div>
                      <div className="font-medium">Sertifikalı Ürünler</div>
                      <div className="text-sm text-gray-500">Getmobil iş ortaklığı</div>
                    </div>
                  </Link>
                  <Link
                    href="/randevu"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone className="h-5 w-5 text-red-500 mr-3" />
                    <span>Randevu Al</span>
                  </Link>
                  <Link
                    href="/magazalar"
                    className="flex items-center p-3 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <MapPin className="h-5 w-5 text-red-500 mr-3" />
                    <span>Mağazalarımız</span>
                  </Link>
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
              <Button className="w-full bg-red-500 hover:bg-red-600">Hemen Ara: +90 535 016 55 55</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
