"use client"

import Link from "next/link"
import { ShoppingBag, Menu } from "lucide-react"
import DesktopNavigation from "@/components/layout/desktop-navigation"
import { useMediaQuery } from "@/hooks/use-media-query"
import Image from "next/image"

export default function Header() {
  const isMobile = useMediaQuery("(max-width: 768px)")

  const toggleMobileMenu = () => {
    // Implement your mobile menu toggle logic here
    console.log("Mobile menu toggled")
  }

  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {isMobile ? (
          <>
            <div className="flex items-center">
              <button onClick={toggleMobileMenu} className="mr-4 focus:outline-none" aria-label="Toggle menu">
                <Menu className="h-6 w-6" />
              </button>
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/getmobil-logo.png"
                  alt="GetMobil Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 text-blue-500 hover:bg-blue-50 h-9 px-3"
              >
                Yönetim
              </Link>
              <Link
                href="/bayi/giris"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-orange-500 text-orange-500 hover:bg-orange-50 h-9 px-3"
              >
                Bayi Girişi
              </Link>
              <Link href="/sepet" className="p-2">
                <ShoppingBag className="h-6 w-6" />
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link href="/" className="flex items-center">
              <Image
                src="/images/getmobil-logo.png"
                alt="GetMobil Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <DesktopNavigation />
            <div className="flex items-center space-x-4">
              <Link
                href="/admin"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 text-blue-500 hover:bg-blue-50 h-9 px-4"
              >
                Yönetim
              </Link>
              <Link
                href="/bayi/giris"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-orange-500 text-orange-500 hover:bg-orange-50 h-9 px-4"
              >
                Bayi Girişi
              </Link>
              <Link href="/sepet" className="p-2">
                <ShoppingBag className="h-6 w-6" />
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
