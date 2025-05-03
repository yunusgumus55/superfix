import Link from "next/link"
import { Home, Wrench, ShoppingBag, Phone, User } from "lucide-react"

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="grid grid-cols-5 h-16">
        <Link
          href="/"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50">
            <Home className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium mt-0.5">Ana Sayfa</span>
        </Link>
        <Link
          href="/hizmetler"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium mt-0.5">Hizmetler</span>
        </Link>
        <Link
          href="/sertifikali-urunler"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium mt-0.5">Ürünler</span>
        </Link>
        <Link
          href="/tamir-talebi"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50">
            <Phone className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium mt-0.5">Tamir</span>
        </Link>
        <Link
          href="/hesabim"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50">
            <User className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium mt-0.5">Hesabım</span>
        </Link>
      </div>
    </div>
  )
}
