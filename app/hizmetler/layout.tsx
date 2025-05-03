import type React from "react"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-red-500">
              <Home className="h-4 w-4 mr-1" />
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/hizmetler" className="hover:text-red-500">
              Hizmetler
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">Tamir Hizmetleri</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {children}
    </div>
  )
}
