"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

// Kupon tipi için interface
interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minAmount: number
  active: boolean
  usageLimit?: number
  usageCount: number
  expiryDate?: string
  createdAt: string
}

// Default coupons
const defaultCoupons: Coupon[] = [
  {
    id: "1",
    code: "TAMIR10",
    type: "percentage",
    value: 10,
    minAmount: 0,
    active: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    code: "TAMIR20",
    type: "percentage",
    value: 20,
    minAmount: 5000,
    active: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    code: "YENI250",
    type: "fixed",
    value: 250,
    minAmount: 2500,
    active: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    code: "YENI500",
    type: "fixed",
    value: 500,
    minAmount: 5000,
    active: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    code: "GETMOBIL",
    type: "percentage",
    value: 15,
    minAmount: 0,
    active: true,
    usageCount: 0,
    createdAt: new Date().toISOString(),
  },
]

export default function CouponManagementPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage" as "percentage" | "fixed",
    value: 0,
    minAmount: 0,
    active: true,
    usageLimit: undefined as number | undefined,
    expiryDate: undefined as string | undefined,
  })

  // Load coupons from localStorage
  const loadCoupons = () => {
    setIsLoading(true)
    try {
      const storedCoupons = localStorage.getItem("coupons")
      if (storedCoupons) {
        setCoupons(JSON.parse(storedCoupons))
      } else {
        // Initialize with default coupons if none exist
        localStorage.setItem("coupons", JSON.stringify(defaultCoupons))
        setCoupons(defaultCoupons)
      }
    } catch (error) {
      console.error("Kuponlar yüklenirken hata:", error)
      toast({
        title: "Hata",
        description: "Kuponlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.",
        variant: "destructive",
      })
      setCoupons([])
    } finally {
      setIsLoading(false)
    }
  }

  // Save coupons to localStorage
  const saveCoupons = (updatedCoupons: Coupon[]) => {
    try {
      localStorage.setItem("coupons", JSON.stringify(updatedCoupons))
      setCoupons(updatedCoupons)
      return true
    } catch (error) {
      console.error("Kuponlar kaydedilirken hata:", error)
      toast({
        title: "Hata",
        description: "Kuponlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
      return false
    }
  }

  useEffect(() => {
    loadCoupons()
  }, [])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    if (type === "number") {
      setFormData({
        ...formData,
        [name]: value === "" ? 0 : Number(value),
      })
    } else if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Handle radio button changes
  const handleTypeChange = (value: "percentage" | "fixed") => {
    setFormData({
      ...formData,
      type: value,
    })
  }

  // Add or update coupon
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (formData.code.trim() === "") {
      toast({
        title: "Hata",
        description: "Kupon kodu boş olamaz!",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (formData.value <= 0) {
      toast({
        title: "Hata",
        description: "İndirim değeri 0'dan büyük olmalıdır!",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Check if code already exists (except for the current editing coupon)
    const codeExists = coupons.some(
      (coupon) =>
        coupon.code.toLowerCase() === formData.code.toLowerCase() && (!editingCoupon || coupon.id !== editingCoupon.id),
    )

    if (codeExists) {
      toast({
        title: "Hata",
        description: "Bu kupon kodu zaten kullanılıyor!",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      if (editingCoupon) {
        // Update existing coupon
        const updatedCoupons = coupons.map((coupon) =>
          coupon.id === editingCoupon.id
            ? {
                ...coupon,
                code: formData.code.toUpperCase(),
                type: formData.type,
                value: formData.value,
                minAmount: formData.minAmount,
                active: formData.active,
                usageLimit: formData.usageLimit,
                expiryDate: formData.expiryDate,
              }
            : coupon,
        )

        if (saveCoupons(updatedCoupons)) {
          toast({
            title: "Başarılı",
            description: "Kupon başarıyla güncellendi",
          })
        }
      } else {
        // Add new coupon
        const newCoupon: Coupon = {
          id: Date.now().toString(),
          code: formData.code.toUpperCase(),
          type: formData.type,
          value: formData.value,
          minAmount: formData.minAmount,
          active: formData.active,
          usageLimit: formData.usageLimit,
          usageCount: 0,
          expiryDate: formData.expiryDate,
          createdAt: new Date().toISOString(),
        }

        if (saveCoupons([...coupons, newCoupon])) {
          toast({
            title: "Başarılı",
            description: "Yeni kupon başarıyla oluşturuldu",
          })
        }
      }

      // Reset form and close dialog
      setFormData({
        code: "",
        type: "percentage",
        value: 0,
        minAmount: 0,
        active: true,
        usageLimit: undefined,
        expiryDate: undefined,
      })
      setEditingCoupon(null)
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Kupon işlemi sırasında hata:", error)
      toast({
        title: "Hata",
        description: "İşlem sırasında beklenmeyen bir hata oluştu",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Edit coupon
  const handleEdit = (coupon: Coupon) => {
    setEditingCoupon(coupon)
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      minAmount: coupon.minAmount,
      active: coupon.active,
      usageLimit: coupon.usageLimit,
      expiryDate: coupon.expiryDate,
    })
    setIsDialogOpen(true)
  }

  // Delete coupon
  const handleDelete = (id: string) => {
    if (confirm("Bu kuponu silmek istediğinizden emin misiniz?")) {
      try {
        setIsLoading(true) // Show loading state while deleting

        // Find the coupon in the local state first to ensure it exists
        const couponToDelete = coupons.find((c) => c.id === id)

        if (!couponToDelete) {
          toast({
            title: "Hata",
            description: "Silinecek kupon bulunamadı",
            variant: "destructive",
          })
          setIsLoading(false)
          return
        }

        // Update local state directly
        const updatedCoupons = coupons.filter((c) => c.id !== id)

        if (saveCoupons(updatedCoupons)) {
          toast({
            title: "Başarılı",
            description: "Kupon başarıyla silindi",
          })
        }
      } catch (error) {
        console.error("Kupon silinirken hata:", error)
        toast({
          title: "Hata",
          description: "Kupon silinirken beklenmeyen bir hata oluştu",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Toggle coupon active status
  const toggleActive = (id: string, currentStatus: boolean) => {
    try {
      const updatedCoupons = coupons.map((coupon) =>
        coupon.id === id ? { ...coupon, active: !currentStatus } : coupon,
      )

      if (saveCoupons(updatedCoupons)) {
        toast({
          title: "Başarılı",
          description: `Kupon ${!currentStatus ? "aktif" : "pasif"} duruma getirildi`,
        })
      }
    } catch (error) {
      console.error("Kupon durumu güncellenirken hata:", error)
      toast({
        title: "Hata",
        description: "Kupon durumu güncellenirken beklenmeyen bir hata oluştu",
        variant: "destructive",
      })
    }
  }

  // Check if user is logged in as admin
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Oturum kontrolü
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }
  }, [router])

  if (!isLoggedIn) {
    return null // Yönlendirme yapılırken boş sayfa göster
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/admin/dashboard" className="mr-4">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Kupon Yönetimi</h1>
        </div>
        <Button
          className="bg-fuchsia-600 hover:bg-fuchsia-700"
          onClick={() => {
            setEditingCoupon(null)
            setFormData({
              code: "",
              type: "percentage",
              value: 0,
              minAmount: 0,
              active: true,
              usageLimit: undefined,
              expiryDate: undefined,
            })
            setIsDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Yeni Kupon Ekle
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingCoupon ? "Kuponu Düzenle" : "Yeni Kupon Ekle"}</DialogTitle>
              <DialogDescription>
                {editingCoupon ? "Kupon bilgilerini güncelleyin." : "Yeni bir indirim kuponu oluşturun."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">
                    Kupon Kodu
                  </Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Örn: TAMIR10"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">İndirim Tipi</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={handleTypeChange as (value: string) => void}
                    className="col-span-3 flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Yüzde (%)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Sabit Tutar (₺)</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">
                    İndirim Değeri
                  </Label>
                  <Input
                    id="value"
                    name="value"
                    type="number"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder={formData.type === "percentage" ? "Örn: 10 (% olarak)" : "Örn: 250 (₺ olarak)"}
                    required
                    min="0"
                    max={formData.type === "percentage" ? "100" : undefined}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="minAmount" className="text-right">
                    Min. Sipariş Tutarı
                  </Label>
                  <Input
                    id="minAmount"
                    name="minAmount"
                    type="number"
                    value={formData.minAmount}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Örn: 1000 (₺)"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="usageLimit" className="text-right">
                    Kullanım Limiti
                  </Label>
                  <Input
                    id="usageLimit"
                    name="usageLimit"
                    type="number"
                    value={formData.usageLimit || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder="Boş bırakılırsa limitsiz"
                    min="0"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expiryDate" className="text-right">
                    Son Kullanma Tarihi
                  </Label>
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate || ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="active" className="text-right">
                    Aktif
                  </Label>
                  <div className="col-span-3 flex items-center">
                    <input
                      id="active"
                      name="active"
                      type="checkbox"
                      checked={formData.active}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-fuchsia-600 focus:ring-fuchsia-500"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-gray-700">
                      Bu kupon aktif olarak kullanılabilir
                    </label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                  İptal
                </Button>
                <Button type="submit" className="bg-fuchsia-600 hover:bg-fuchsia-700" disabled={isSubmitting}>
                  {isSubmitting ? "İşleniyor..." : editingCoupon ? "Güncelle" : "Ekle"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kuponlar</CardTitle>
          <CardDescription>Sistemde kayıtlı tüm indirim kuponlarını görüntüleyin ve yönetin.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">Yükleniyor...</div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-8 text-gray-500">Henüz hiç kupon eklenmemiş.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kupon Kodu</TableHead>
                    <TableHead>İndirim</TableHead>
                    <TableHead>Min. Tutar</TableHead>
                    <TableHead>Kullanım</TableHead>
                    <TableHead>Son Kullanma</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon.id}>
                      <TableCell className="font-medium">{coupon.code}</TableCell>
                      <TableCell>
                        {coupon.type === "percentage"
                          ? `%${coupon.value}`
                          : `${coupon.value.toLocaleString("tr-TR")} ₺`}
                      </TableCell>
                      <TableCell>
                        {coupon.minAmount > 0 ? `${coupon.minAmount.toLocaleString("tr-TR")} ₺` : "-"}
                      </TableCell>
                      <TableCell>
                        {coupon.usageLimit
                          ? `${coupon.usageCount}/${coupon.usageLimit}`
                          : `${coupon.usageCount} (Limitsiz)`}
                      </TableCell>
                      <TableCell>
                        {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString("tr-TR") : "Süresiz"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            coupon.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          }`}
                        >
                          {coupon.active ? "Aktif" : "Pasif"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" onClick={() => toggleActive(coupon.id, coupon.active)}>
                            {coupon.active ? "Pasif Yap" : "Aktif Yap"}
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleEdit(coupon)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDelete(coupon.id)}
                            disabled={isLoading} // Disable during loading
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
