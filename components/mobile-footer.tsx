import Link from "next/link"
import { Home, Wrench, ShoppingBag, Phone, User } from "lucide-react"

export default function MobileFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link href="/" className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500">
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Ana Sayfa</span>
        </Link>
        <Link href="/hizmetler" className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500">
          <Wrench className="h-5 w-5" />
          <span className="text-xs mt-1">Hizmetler</span>
        </Link>
        <Link
          href="/sertifikali-urunler"
          className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500"
        >
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs mt-1">Ürünler</span>
        </Link>
        <Link href="/randevu" className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500">
          <Phone className="h-5 w-5" />
          <span className="text-xs mt-1">Randevu</span>
        </Link>
        <Link href="/hesabim" className="flex flex-col items-center justify-center text-gray-500 hover:text-red-500">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Hesabım</span>
        </Link>
      </div>
    </div>
  )
}
