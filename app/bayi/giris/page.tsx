"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function DealerLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Check if already logged in
  useEffect(() => {
    const dealerInfo = localStorage.getItem("dealerInfo")
    if (dealerInfo) {
      router.push("/bayi/panel")
    }

    // Create demo dealer account
    const dealers = JSON.parse(localStorage.getItem("dealers") || "[]")
    const demoAccountExists = dealers.some((d: any) => d.email === "admin")

    if (!demoAccountExists) {
      dealers.push({
        id: "demo-dealer-123",
        companyName: "Demo Bayi",
        ownerName: "Demo Kullanıcı",
        email: "admin",
        password: "123",
        phone: "555-123-4567",
        address: "Demo Adres, İstanbul",
        taxId: "1234567890",
        businessType: "Telefon Tamir Servisi",
        approved: true,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem("dealers", JSON.stringify(dealers))
      console.log("Demo bayi hesabı oluşturuldu: admin / 123")
    }
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // In a real application, you would validate with your API
      // For now, we'll check against localStorage data
      const dealers = JSON.parse(localStorage.getItem("dealers") || "[]")
      const dealer = dealers.find((d: any) => d.email === email && d.password === password && d.approved === true)

      if (dealer) {
        // Store dealer info in localStorage (in a real app, you'd use cookies/JWT)
        localStorage.setItem(
          "dealerInfo",
          JSON.stringify({
            id: dealer.id,
            companyName: dealer.companyName,
            email: dealer.email,
            isLoggedIn: true,
          }),
        )
        router.push("/bayi/panel")
      } else {
        // Check if dealer exists but is not approved
        const pendingDealer = dealers.find((d: any) => d.email === email && d.password === password)

        if (pendingDealer && !pendingDealer.approved) {
          setError("Hesabınız henüz onaylanmamış. Onay sürecinin tamamlanmasını bekleyin.")
        } else {
          setError("E-posta veya şifre hatalı!")
        }
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Giriş sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-red-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Bayi Girişi</CardTitle>
              <CardDescription>
                Superfix Bilişim bayi portalına giriş yaparak özel fiyatlardan ve avantajlardan yararlanın.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-posta</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Şifre</Label>
                    <Link href="/bayi/sifremi-unuttum" className="text-sm text-red-500 hover:underline">
                      Şifremi Unuttum
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col space-y-4 w-full">
                <Button onClick={handleLogin} className="w-full bg-red-500 hover:bg-red-600" disabled={loading}>
                  {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                </Button>
                <div className="text-center">
                  <span className="text-sm text-gray-500">Henüz bayi değil misiniz? </span>
                  <Link href="/bayi/kayit" className="text-sm text-red-500 hover:underline">
                    Bayi başvurusu yapın
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
