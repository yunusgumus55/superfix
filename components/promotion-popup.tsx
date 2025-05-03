"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

// NOT: Bu reklam paneli şimdilik devre dışı bırakıldı.
// Tekrar aktif etmek için useEffect içindeki kodu yorum satırından çıkarın.
export default function PromotionPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Popup devre dışı bırakıldı
    setIsOpen(false)

    // Eski kod:
    // Show popup after 2 seconds
    // const timer = setTimeout(() => {
    //   setIsOpen(true)
    // }, 2000)
    //
    // return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full relative overflow-hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:p-8 md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">Sınırlı süre teklifi!</h2>
            <h3 className="text-xl font-bold mb-4">Yenilenmiş iPhone 14'lerde Şok İndirim!</h3>
            <p className="text-sm mb-4">
              Herhangi bir iPhone 14 modelinde (tüm depolama seçenekleri) uygun bir finansman planıyla 2000 TL'ye varan
              tasarruf edin.
            </p>
            <p className="text-xs mb-6">Sadece mağazalarda geçerlidir.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="default" className="bg-gray-800 hover:bg-gray-700" onClick={() => setIsOpen(false)}>
                Mağaza bul
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Randevu al
              </Button>
            </div>

            <p className="text-xs mt-4">* Şartlar ve koşullar geçerlidir.</p>
          </div>

          <div className="md:w-1/2 bg-yellow-100 flex items-center justify-center p-4">
            <Image
              src="https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=300&auto=format&fit=crop"
              alt="iPhone 14"
              width={300}
              height={400}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
