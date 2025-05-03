import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, MapPin, ShoppingBag, Wrench, Package } from "lucide-react"

export default function DesktopNavigation() {
  const navigationItems = [
    {
      name: "Sertifikalı ikinci el",
      href: "/sertifikali-urunler",
      icon: <ShoppingBag className="h-5 w-5 text-red-500 mr-2" />,
    },
    {
      name: "Tamir Talebi Oluştur",
      href: "/tamir-talebi",
      icon: <Wrench className="h-4 w-4 mr-2" />,
    },
    {
      name: "Mağaza bul",
      href: "/magazalar",
      icon: <MapPin className="h-5 w-5 text-red-500 mr-2" />,
    },
    {
      name: "Stok Yönetimi",
      href: "/tamir-talebi/stok",
      icon: <Package className="h-5 w-5" />,
    },
  ]

  return (
    <>
      <div className="flex items-center space-x-8">
        {navigationItems.slice(0, 3).map((item) => (
          <Link key={item.name} href={item.href} className="flex items-center text-sm">
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Logo */}
      <Link href="/" className="text-2xl font-bold">
        Superfix Bilişim
      </Link>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="ghost" className="flex items-center">
            Daha Fazla <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700">
          Özel teklifler
        </Button>
        <Button variant="outline">TR</Button>
      </div>
    </>
  )
}
