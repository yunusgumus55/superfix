"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, XCircle, Edit, Trash, Search, UserPlus, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function DealerManagementPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [dealers, setDealers] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDealer, setSelectedDealer] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    // Check if admin is logged in
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
      return
    }

    // Load dealers from localStorage
    const storedDealers = localStorage.getItem("dealers")
    if (storedDealers) {
      setDealers(JSON.parse(storedDealers))
    }
  }, [router])

  const handleApproveDealer = (id: string) => {
    const updatedDealers = dealers.map((dealer) => (dealer.id === id ? { ...dealer, approved: true } : dealer))
    setDealers(updatedDealers)
    localStorage.setItem("dealers", JSON.stringify(updatedDealers))
    toast({
      title: "Bayi onaylandı",
      description: "Bayi hesabı başarıyla onaylandı.",
    })
  }

  const handleRejectDealer = (id: string) => {
    const updatedDealers = dealers.map((dealer) => (dealer.id === id ? { ...dealer, approved: false } : dealer))
    setDealers(updatedDealers)
    localStorage.setItem("dealers", JSON.stringify(updatedDealers))
    toast({
      title: "Bayi reddedildi",
      description: "Bayi hesabı reddedildi.",
    })
  }

  const handleDeleteDealer = (id: string) => {
    const updatedDealers = dealers.filter((dealer) => dealer.id !== id)
    setDealers(updatedDealers)
    localStorage.setItem("dealers", JSON.stringify(updatedDealers))
    setIsDeleteDialogOpen(false)
    toast({
      title: "Bayi silindi",
      description: "Bayi hesabı başarıyla silindi.",
    })
  }

  const handleEditDealer = () => {
    if (!selectedDealer) return

    const updatedDealers = dealers.map((dealer) => (dealer.id === selectedDealer.id ? selectedDealer : dealer))
    setDealers(updatedDealers)
    localStorage.setItem("dealers", JSON.stringify(updatedDealers))
    setIsDialogOpen(false)
    toast({
      title: "Bayi güncellendi",
      description: "Bayi bilgileri başarıyla güncellendi.",
    })
  }

  const filteredDealers = dealers.filter(
    (dealer) =>
      dealer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.ownerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const pendingDealers = filteredDealers.filter((dealer) => !dealer.approved)
  const approvedDealers = filteredDealers.filter((dealer) => dealer.approved)

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="mr-4">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Bayi Yönetimi</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Bayi ara..."
                className="pl-10 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Yeni Bayi Ekle
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Bayiler</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending">
              <TabsList className="mb-6">
                <TabsTrigger value="pending">Onay Bekleyen Bayiler ({pendingDealers.length})</TabsTrigger>
                <TabsTrigger value="approved">Onaylı Bayiler ({approvedDealers.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                {pendingDealers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Onay bekleyen bayi bulunmamaktadır.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Şirket Adı</TableHead>
                        <TableHead>Yetkili</TableHead>
                        <TableHead>E-posta</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Başvuru Tarihi</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingDealers.map((dealer) => (
                        <TableRow key={dealer.id}>
                          <TableCell className="font-medium">{dealer.companyName}</TableCell>
                          <TableCell>{dealer.ownerName}</TableCell>
                          <TableCell>{dealer.email}</TableCell>
                          <TableCell>{dealer.phone}</TableCell>
                          <TableCell>{new Date(dealer.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedDealer(dealer)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleApproveDealer(dealer.id)}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleRejectDealer(dealer.id)}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="approved">
                {approvedDealers.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">Onaylı bayi bulunmamaktadır.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Şirket Adı</TableHead>
                        <TableHead>Yetkili</TableHead>
                        <TableHead>E-posta</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Onay Durumu</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvedDealers.map((dealer) => (
                        <TableRow key={dealer.id}>
                          <TableCell className="font-medium">{dealer.companyName}</TableCell>
                          <TableCell>{dealer.ownerName}</TableCell>
                          <TableCell>{dealer.email}</TableCell>
                          <TableCell>{dealer.phone}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Onaylı
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedDealer(dealer)
                                  setIsViewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedDealer(dealer)
                                  setIsDialogOpen(true)
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => {
                                  setSelectedDealer(dealer)
                                  setIsDeleteDialogOpen(true)
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Edit Dealer Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bayi Düzenle</DialogTitle>
              <DialogDescription>
                Bayi bilgilerini güncelleyin. Tamamlandığında kaydet butonuna tıklayın.
              </DialogDescription>
            </DialogHeader>
            {selectedDealer && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Şirket Adı
                  </Label>
                  <Input
                    id="companyName"
                    value={selectedDealer.companyName}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, companyName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ownerName" className="text-right">
                    Yetkili
                  </Label>
                  <Input
                    id="ownerName"
                    value={selectedDealer.ownerName}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, ownerName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    value={selectedDealer.email}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    value={selectedDealer.phone}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, phone: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="discount" className="text-right">
                    İndirim Oranı (%)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    value={selectedDealer.discount || "20"}
                    onChange={(e) => setSelectedDealer({ ...selectedDealer, discount: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={handleEditDealer}>Kaydet</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Bayi Sil</DialogTitle>
              <DialogDescription>
                Bu bayi hesabını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                İptal
              </Button>
              <Button variant="destructive" onClick={() => selectedDealer && handleDeleteDealer(selectedDealer.id)}>
                Sil
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Dealer Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Bayi Detayları</DialogTitle>
              <DialogDescription>Bayi hesap bilgileri ve detayları.</DialogDescription>
            </DialogHeader>
            {selectedDealer && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Şirket Adı</h3>
                    <p>{selectedDealer.companyName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Yetkili</h3>
                    <p>{selectedDealer.ownerName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">E-posta</h3>
                    <p>{selectedDealer.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Telefon</h3>
                    <p>{selectedDealer.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Vergi No</h3>
                    <p>{selectedDealer.taxId}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">İşletme Türü</h3>
                    <p>{selectedDealer.businessType}</p>
                  </div>
                  <div className="col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Adres</h3>
                    <p>{selectedDealer.address}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Başvuru Tarihi</h3>
                    <p>{new Date(selectedDealer.createdAt).toLocaleDateString("tr-TR")}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Durum</h3>
                    <p>
                      {selectedDealer.approved ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Onaylı
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Onay Bekliyor
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">İndirim Oranı</h3>
                    <p>{selectedDealer.discount || "20"}%</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Kapat</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Toaster />
      </div>
    </div>
  )
}
