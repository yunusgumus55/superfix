"use client"
import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, PenToolIcon as Tool, Package } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Örnek stok verileri
const stockItems = [
  { id: 1, name: "iPhone 13 Pro Max Ekran (Orjinal)", category: "Ekran", quantity: 5, price: 4500 },
  { id: 2, name: "iPhone 13 Pro Max Ekran (A Kalite)", category: "Ekran", quantity: 8, price: 2800 },
  { id: 3, name: "iPhone 13 Pro Max Batarya", category: "Batarya", quantity: 12, price: 1200 },
  { id: 4, name: "iPhone 12 Pro Ekran (Orjinal)", category: "Ekran", quantity: 3, price: 3800 },
  { id: 5, name: "iPhone 12 Pro Batarya", category: "Batarya", quantity: 7, price: 950 },
  { id: 6, name: "Samsung S21 Ultra Ekran", category: "Ekran", quantity: 4, price: 3200 },
  { id: 7, name: "Samsung S21 Ultra Batarya", category: "Batarya", quantity: 9, price: 850 },
  { id: 8, name: "iPhone 11 Ekran (Orjinal)", category: "Ekran", quantity: 6, price: 2900 },
  { id: 9, name: "iPhone 11 Batarya", category: "Batarya", quantity: 15, price: 750 },
]

// Servis durumları için yardımcı fonksiyon
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Beklemede":
      return <Badge className="bg-yellow-500">Beklemede</Badge>
    case "Teslim Alındı":
      return <Badge className="bg-green-500">Teslim Alındı</Badge>
    case "Arıza Tespiti Yapıldı":
      return <Badge className="bg-amber-500">Arıza Tespiti Yapıldı</Badge>
    case "Onarım Sürecinde":
      return <Badge className="bg-blue-500">Onarım Sürecinde</Badge>
    case "Tamamlandı":
      return <Badge className="bg-green-500">Tamamlandı</Badge>
    case "Teslim Edildi":
      return <Badge className="bg-purple-500">Teslim Edildi</Badge>
    default:
      return <Badge className="bg-gray-500">{status}</Badge>
  }
}

export default function ServiceTechnicianDashboard() {
  const [activeTab, setActiveTab] = useState("repairs")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isRepairDialogOpen, setIsRepairDialogOpen] = useState(false)
  const [isStockDialogOpen, setIsStockDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [stockSearchQuery, setStockSearchQuery] = useState("")
  const [services, setServices] = useState<any[]>([])
  const [selectedParts, setSelectedParts] = useState<any[]>([])
  const [repairNotes, setRepairNotes] = useState("")
  const { toast } = useToast()

  // LocalStorage'dan servis kayıtlarını yükle
  useEffect(() => {
    const loadServiceRecords = () => {
      try {
        const storedRecords = localStorage.getItem("serviceRecords")
        if (storedRecords) {
          const allRecords = JSON.parse(storedRecords)

          // Sadece "Teslim Alındı" veya "Arıza Tespiti Yapıldı" durumundaki servisleri göster
          const filteredRecords = allRecords.filter(
            (record: any) =>
              record.status === "Teslim Alındı" ||
              record.status === "Arıza Tespiti Yapıldı" ||
              record.status === "Onarım Sürecinde",
          )

          setServices(filteredRecords)
        }
      } catch (error) {
        console.error("Servis kayıtları yüklenirken hata:", error)
      }
    }

    // İlk yükleme
    loadServiceRecords()

    // LocalStorage değişikliklerini dinle
    const handleStorageChange = () => {
      loadServiceRecords()
    }

    window.addEventListener("storage", handleStorageChange)

    // 5 saniyede bir yenile
    const interval = setInterval(loadServiceRecords, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Filtreleme işlevi
  const getFilteredServices = () => {
    if (!searchQuery) return services

    return services.filter(
      (service) =>
        service.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.customerPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.deviceModel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.problem?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  // Stok filtreleme işlevi
  const getFilteredStockItems = () => {
    if (!stockSearchQuery) return stockItems

    return stockItems.filter(
      (item) =>
        item.name.toLowerCase().includes(stockSearchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(stockSearchQuery.toLowerCase()),
    )
  }

  const handleStartRepair = (service: any) => {
    setSelectedService(service)
    setSelectedParts([])
    setRepairNotes("")
    setIsRepairDialogOpen(true)
  }

  const handleOpenStockDialog = () => {
    setIsStockDialogOpen(true)
  }

  const handleAddPart = (part: any) => {
    // Parça zaten seçilmişse ekleme
    if (selectedParts.some((p) => p.id === part.id)) {
      toast({
        title: "Parça zaten eklenmiş",
        description: "Bu parça zaten onarım listesine eklenmiş.",
        variant: "destructive",
      })
      return
    }

    // Parçayı seçilenlere ekle
    setSelectedParts([...selectedParts, { ...part, quantity: 1 }])
    setIsStockDialogOpen(false)

    toast({
      title: "Parça eklendi",
      description: `${part.name} onarım listesine eklendi.`,
    })
  }

  const handleRemovePart = (partId: number) => {
    setSelectedParts(selectedParts.filter((part) => part.id !== partId))
  }

  const handleUpdatePartQuantity = (partId: number, quantity: number) => {
    if (quantity < 1) return

    const stockItem = stockItems.find((item) => item.id === partId)
    if (stockItem && quantity > stockItem.quantity) {
      toast({
        title: "Yetersiz stok",
        description: `Stokta sadece ${stockItem.quantity} adet bulunmaktadır.`,
        variant: "destructive",
      })
      return
    }

    setSelectedParts(selectedParts.map((part) => (part.id === partId ? { ...part, quantity } : part)))
  }

  const handleCompleteRepair = () => {
    try {
      // LocalStorage'dan mevcut kayıtları al
      const storedRecords = localStorage.getItem("serviceRecords")
      if (storedRecords && selectedService) {
        const allRecords = JSON.parse(storedRecords)

        // Toplam fiyatı hesapla
        const totalPartsPrice = selectedParts.reduce((total, part) => total + part.price * part.quantity, 0)

        // Seçili servis kaydını güncelle
        const updatedRecords = allRecords.map((record: any) => {
          if (record.id === selectedService.id) {
            return {
              ...record,
              status: "Tamamlandı",
              lastStatusUpdate: new Date().toISOString(),
              usedParts: selectedParts,
              repairNotes: repairNotes,
              repairPrice: totalPartsPrice,
              statusHistory: [
                ...(record.statusHistory || []),
                {
                  status: "Tamamlandı",
                  note: `Onarım tamamlandı. Kullanılan parçalar: ${selectedParts.map((p) => `${p.name} (${p.quantity} adet)`).join(", ")}. Teknisyen notu: ${repairNotes}`,
                  date: new Date().toISOString(),
                },
              ],
            }
          }
          return record
        })

        // Güncellenmiş kayıtları localStorage'a kaydet
        localStorage.setItem("serviceRecords", JSON.stringify(updatedRecords))

        // Servisleri yeniden yükle
        const filteredRecords = updatedRecords.filter(
          (record: any) =>
            record.status === "Teslim Alındı" ||
            record.status === "Arıza Tespiti Yapıldı" ||
            record.status === "Onarım Sürecinde",
        )

        setServices(filteredRecords)

        toast({
          title: "Onarım tamamlandı",
          description: `${selectedService.id} numaralı servis kaydının onarımı tamamlandı.`,
        })
      }
    } catch (error) {
      console.error("Onarım tamamlanırken hata:", error)
      toast({
        title: "Hata",
        description: "Onarım tamamlanırken bir hata oluştu.",
        variant: "destructive",
      })
    }

    setIsRepairDialogOpen(false)
  }

  // Tarih formatı için yardımcı fonksiyon
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("tr-TR")
    } catch (error) {
      return dateString
    }
  }

  // Toplam fiyatı hesapla
  const calculateTotalPrice = () => {
    return selectedParts.reduce((total, part) => total + part.price * part.quantity, 0)
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Teknisyen Paneli</h1>

      <Tabs defaultValue="repairs" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="repairs">Onarım Bekleyen Cihazlar</TabsTrigger>
          <TabsTrigger value="stock">Stok Durumu</TabsTrigger>
        </TabsList>

        <TabsContent value="repairs">
          <Card>
            <CardHeader>
              <CardTitle>Onarım Bekleyen Cihazlar</CardTitle>
              <CardDescription>Onarım bekleyen cihazları görüntüleyin ve işlem yapın.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 w-full md:w-auto mb-6">
                <Input
                  placeholder="Servis numarası veya müşteri adı ara..."
                  className="max-w-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              {getFilteredServices().length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servis No</TableHead>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>Cihaz</TableHead>
                        <TableHead>Sorun</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Giriş Tarihi</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredServices().map((service: any) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.id}</TableCell>
                          <TableCell>{service.customerName}</TableCell>
                          <TableCell>{service.deviceModel}</TableCell>
                          <TableCell>{service.problem}</TableCell>
                          <TableCell>{getStatusBadge(service.status)}</TableCell>
                          <TableCell>{formatDate(service.entryDate)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStartRepair(service)}
                              className="flex items-center"
                            >
                              <Tool className="h-4 w-4 mr-1" />
                              <span>Onarım Başlat</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery
                    ? "Arama kriterlerine uygun servis kaydı bulunamadı."
                    : "Onarım bekleyen cihaz bulunmuyor."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stock">
          <Card>
            <CardHeader>
              <CardTitle>Stok Durumu</CardTitle>
              <CardDescription>Mevcut parça stoklarını görüntüleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 w-full md:w-auto mb-6">
                <Input
                  placeholder="Parça adı veya kategori ara..."
                  className="max-w-sm"
                  value={stockSearchQuery}
                  onChange={(e) => setStockSearchQuery(e.target.value)}
                />
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Parça Adı</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Stok Adedi</TableHead>
                      <TableHead>Birim Fiyat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredStockItems().map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.quantity > 5 ? "bg-green-500" : item.quantity > 0 ? "bg-yellow-500" : "bg-red-500"
                            }
                          >
                            {item.quantity} adet
                          </Badge>
                        </TableCell>
                        <TableCell>{item.price} TL</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Onarım Dialog */}
      <Dialog open={isRepairDialogOpen} onOpenChange={setIsRepairDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Cihaz Onarımı</DialogTitle>
            <DialogDescription>
              Servis No: {selectedService?.id} - {selectedService?.customerName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Cihaz Modeli</h3>
                <p className="font-medium">{selectedService?.deviceModel}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Sorun</h3>
                <p className="font-medium">{selectedService?.problem}</p>
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Kullanılacak Parçalar</h3>
                <Button onClick={handleOpenStockDialog} className="bg-blue-500 hover:bg-blue-600">
                  <Package className="h-4 w-4 mr-2" />
                  Parça Ekle
                </Button>
              </div>

              {selectedParts.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parça Adı</TableHead>
                        <TableHead>Adet</TableHead>
                        <TableHead>Birim Fiyat</TableHead>
                        <TableHead>Toplam</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedParts.map((part) => (
                        <TableRow key={part.id}>
                          <TableCell className="font-medium">{part.name}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleUpdatePartQuantity(part.id, part.quantity - 1)}
                              >
                                -
                              </Button>
                              <span>{part.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleUpdatePartQuantity(part.id, part.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{part.price} TL</TableCell>
                          <TableCell>{part.price * part.quantity} TL</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              onClick={() => handleRemovePart(part.id)}
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          Toplam Tutar:
                        </TableCell>
                        <TableCell className="font-bold">{calculateTotalPrice()} TL</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-4 border rounded-md text-muted-foreground">
                  Henüz parça eklenmedi. Onarım için gerekli parçaları ekleyin.
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="repairNotes">Teknisyen Notları</Label>
              <Textarea
                id="repairNotes"
                value={repairNotes}
                onChange={(e) => setRepairNotes(e.target.value)}
                placeholder="Onarım hakkında notlar ekleyin..."
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRepairDialogOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={handleCompleteRepair}
              className="bg-green-500 hover:bg-green-600"
              disabled={selectedParts.length === 0}
            >
              Onarımı Tamamla
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stok Dialog */}
      <Dialog open={isStockDialogOpen} onOpenChange={setIsStockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Parça Seçimi</DialogTitle>
            <DialogDescription>Onarım için kullanılacak parçaları seçin</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Parça ara..."
              value={stockSearchQuery}
              onChange={(e) => setStockSearchQuery(e.target.value)}
            />

            <div className="rounded-md border max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parça Adı</TableHead>
                    <TableHead>Stok</TableHead>
                    <TableHead>Fiyat</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredStockItems().map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.quantity} adet</TableCell>
                      <TableCell>{item.price} TL</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddPart(item)}
                          disabled={item.quantity === 0}
                          className="whitespace-nowrap"
                        >
                          Ekle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStockDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
