import Link from "next/link"
import { ShoppingBag, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "./mobile-navigation"

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b md:hidden">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <MobileNavigation />
        </div>

        <Link href="/" className="text-xl font-bold absolute left-1/2 -translate-x-1/2">
          Superfix
        </Link>

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/sepet">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
