"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart3, Users, Package, Settings, ShoppingCart, Tag, Edit3 } from "lucide-react"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }
  }, [router])

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Yönetim Paneli</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Servis Takip */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Servis Takip</CardTitle>
            <CardDescription>Servis durumlarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <BarChart3 size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/servis-takip/admin">Servis Takip Yönetimi</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Bayiler */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Bayiler</CardTitle>
            <CardDescription>Bayi hesaplarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Users size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/bayiler">Bayi Yönetimi</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Tamir Hizmetleri */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Tamir Hizmetleri</CardTitle>
            <CardDescription>Tamir hizmetlerini yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Package size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/repair-services">Tamir Hizmetleri</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Fiyat Ayarları */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Fiyat Ayarları</CardTitle>
            <CardDescription>Tamir fiyatlarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Tag size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/prices/screen">Fiyat Ayarları</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Bayi Fiyatları */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Bayi Fiyatları</CardTitle>
            <CardDescription>Bayi fiyatlarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <ShoppingCart size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/bayi-fiyatlari">Bayi Fiyatları</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Kuponlar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Kuponlar</CardTitle>
            <CardDescription>İndirim kuponlarını yönetin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Settings size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/kuponlar">Kupon Yönetimi</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Görsel Düzenleyici */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Görsel Düzenleyici</CardTitle>
            <CardDescription>Sayfaları görsel olarak düzenleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-20 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Edit3 size={36} />
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/admin/dashboard/visual-editor">Görsel Düzenleyici</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
