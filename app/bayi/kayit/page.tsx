"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function DealerRegistrationPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    taxId: "",
    password: "",
    confirmPassword: "",
    businessType: "",
    referenceCode: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError("Şifreler eşleşmiyor!")
      setLoading(false)
      return
    }

    try {
      // In a real application, you would send this data to your API
      // For now, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store in localStorage for demo purposes
      // In a real app, this would be handled by your backend
      const dealers = JSON.parse(localStorage.getItem("dealers") || "[]")
      dealers.push({
        ...formData,
        id: Date.now().toString(),
        approved: false,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem("dealers", JSON.stringify(dealers))

      setSuccess(true)
      setTimeout(() => {
        router.push("/bayi/giris")
      }, 2000)
    } catch (err) {
      console.error("Registration error:", err)
      setError("Kayıt sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-gray-600 hover:text-red-500">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Bayi Kayıt Formu</CardTitle>
              <CardDescription>
                Superfix Bilişim bayi ağına katılmak için aşağıdaki formu doldurun. Başvurunuz incelendikten sonra
                sizinle iletişime geçeceğiz.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success ? (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>
                    Kayıt başvurunuz başarıyla alınmıştır. Başvurunuz incelendikten sonra onay e-postası
                    gönderilecektir. Giriş sayfasına yönlendiriliyorsunuz...
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Şirket Adı *</Label>
                      <Input
                        id="companyName"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ownerName">Yetkili Adı Soyadı *</Label>
                      <Input
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Adres *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Vergi Numarası *</Label>
                      <Input id="taxId" name="taxId" value={formData.taxId} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessType">İşletme Türü *</Label>
                      <Input
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        placeholder="Örn: Telefon Tamir Servisi, Elektronik Mağaza"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Şifre *</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="referenceCode">Referans Kodu (Varsa)</Label>
                    <Input
                      id="referenceCode"
                      name="referenceCode"
                      value={formData.referenceCode}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-500">
                      Eğer bir Superfix Bilişim bayisi tarafından yönlendirildiyseniz, size verilen referans kodunu
                      girebilirsiniz.
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-700">
                      Bayi başvurunuz, ekibimiz tarafından incelenecek ve onaylandıktan sonra bayi portalına erişim
                      sağlayabileceksiniz. Onay süreci genellikle 1-2 iş günü içerisinde tamamlanmaktadır.
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter>
              {!success && (
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-red-500 hover:bg-red-600"
                    disabled={loading}
                  >
                    {loading ? "Kaydediliyor..." : "Başvuruyu Gönder"}
                  </Button>
                  <Link href="/bayi/giris" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full">
                      Zaten Üyeyim, Giriş Yap
                    </Button>
                  </Link>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
