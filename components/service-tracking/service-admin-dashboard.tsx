"use client"

import React from "react"

import type { ComponentPropsWithoutRef, ElementRef } from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Search, FileText, Edit, Eye } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

// Custom TabsTrigger component
const TabsTrigger = React.forwardRef<
  ElementRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

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

export default function ServiceAdminDashboard() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [statusUpdateData, setStatusUpdateData] = useState({
    status: "",
    note: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<any>({
    active: [],
    completed: [],
  })
  const { toast } = useToast()

  // LocalStorage'dan servis kayıtlarını yükle
  useEffect(() => {
    const loadServiceRecords = () => {
      try {
        const storedRecords = localStorage.getItem("serviceRecords")
        if (storedRecords) {
          const allRecords = JSON.parse(storedRecords)

          // Aktif ve tamamlanan servisleri ayır
          const active = allRecords.filter(
            (record: any) => record.status !== "Teslim Edildi" && record.status !== "Tamamlandı",
          )

          const completed = allRecords.filter(
            (record: any) => record.status === "Teslim Edildi" || record.status === "Tamamlandı",
          )

          setServices({
            active,
            completed,
          })
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

    // 5 saniyede bir yenile (gerçek uygulamada websocket veya polling kullanılabilir)
    const interval = setInterval(loadServiceRecords, 5000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Filtreleme işlevi
  const getFilteredServices = (serviceList: any[]) => {
    if (!searchQuery) return serviceList

    return serviceList.filter(
      (service) =>
        service.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.customerPhone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.deviceModel?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.problem?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const handleViewService = (service: any) => {
    setSelectedService(service)
  }

  const handleUpdateStatus = (service: any) => {
    setSelectedService(service)
    setStatusUpdateData({
      status: service.status,
      note: "",
    })
    setIsUpdateDialogOpen(true)
  }

  const handleStatusChange = (value: string) => {
    setStatusUpdateData((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStatusUpdateData((prev) => ({
      ...prev,
      note: e.target.value,
    }))
  }

  const handleSubmitStatusUpdate = () => {
    try {
      // LocalStorage'dan mevcut kayıtları al
      const storedRecords = localStorage.getItem("serviceRecords")
      if (storedRecords && selectedService) {
        const allRecords = JSON.parse(storedRecords)

        // Seçili servis kaydını güncelle
        const updatedRecords = allRecords.map((record: any) => {
          if (record.id === selectedService.id) {
            return {
              ...record,
              status: statusUpdateData.status,
              lastStatusUpdate: new Date().toISOString(),
              statusHistory: [
                ...(record.statusHistory || []),
                {
                  status: statusUpdateData.status,
                  note: statusUpdateData.note,
                  date: new Date().toISOString(),
                },
              ],
            }
          }
          return record
        })

        // Güncellenmiş kayıtları localStorage'a kaydet
        localStorage.setItem("serviceRecords", JSON.stringify(updatedRecords))

        // Bildirim gönder
        if (selectedService.customerPhone || selectedService.customerEmail) {
          try {
            // Bildirim gönderme API'sine istek at
            fetch("/api/service-status/update", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                serviceId: selectedService.id,
                status: statusUpdateData.status,
                notes: statusUpdateData.note,
                notifyCustomer: true,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  console.error("Bildirim gönderilirken hata oluştu")
                }
              })
              .catch((error) => {
                console.error("Bildirim gönderilirken hata:", error)
              })
          } catch (error) {
            console.error("Bildirim gönderilirken hata:", error)
          }
        }

        // Servisleri yeniden yükle
        const active = updatedRecords.filter(
          (record: any) => record.status !== "Teslim Edildi" && record.status !== "Tamamlandı",
        )

        const completed = updatedRecords.filter(
          (record: any) => record.status === "Teslim Edildi" || record.status === "Tamamlandı",
        )

        setServices({
          active,
          completed,
        })

        toast({
          title: "Durum güncellendi",
          description: `${selectedService.id} numaralı servis kaydının durumu güncellendi.`,
        })
      }
    } catch (error) {
      console.error("Durum güncellenirken hata:", error)
      toast({
        title: "Hata",
        description: "Durum güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }

    setIsUpdateDialogOpen(false)
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

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Servis Yönetim Paneli</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            placeholder="Servis numarası veya müşteri adı ara..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="bg-red-500 hover:bg-red-600">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <Link href="/servis-takip/yeni-kayit">
          <Button className="bg-red-500 hover:bg-red-600 w-full md:w-auto">
            <FileText className="mr-2 h-4 w-4" /> Yeni Servis Kaydı
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="active">Aktif Servisler</TabsTrigger>
          <TabsTrigger value="completed">Tamamlanan Servisler</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Aktif Servis Kayıtları</CardTitle>
              <CardDescription>Devam eden ve yeni servis kayıtlarını görüntüleyin ve yönetin.</CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredServices(services.active).length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servis No</TableHead>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Cihaz</TableHead>
                        <TableHead>Sorun</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Giriş Tarihi</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredServices(services.active).map((service: any) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.id}</TableCell>
                          <TableCell>{service.customerName}</TableCell>
                          <TableCell>{service.customerPhone}</TableCell>
                          <TableCell>{service.deviceModel}</TableCell>
                          <TableCell>{service.problem}</TableCell>
                          <TableCell>{getStatusBadge(service.status)}</TableCell>
                          <TableCell>{formatDate(service.entryDate)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewService(service)}
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Görüntüle</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateStatus(service)}
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Düzenle</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
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
                    : "Henüz aktif servis kaydı bulunmuyor."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Tamamlanan Servis Kayıtları</CardTitle>
              <CardDescription>Tamamlanan ve teslim edilen servis kayıtlarını görüntüleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredServices(services.completed).length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Servis No</TableHead>
                        <TableHead>Müşteri</TableHead>
                        <TableHead>Telefon</TableHead>
                        <TableHead>Cihaz</TableHead>
                        <TableHead>Sorun</TableHead>
                        <TableHead>Durum</TableHead>
                        <TableHead>Tamamlanma Tarihi</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredServices(services.completed).map((service: any) => (
                        <TableRow key={service.id}>
                          <TableCell className="font-medium">{service.id}</TableCell>
                          <TableCell>{service.customerName}</TableCell>
                          <TableCell>{service.customerPhone}</TableCell>
                          <TableCell>{service.deviceModel}</TableCell>
                          <TableCell>{service.problem}</TableCell>
                          <TableCell>{getStatusBadge(service.status)}</TableCell>
                          <TableCell>{formatDate(service.lastStatusUpdate || service.entryDate)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewService(service)}
                              className="h-8 w-8 p-0"
                            >
                              <span className="sr-only">Görüntüle</span>
                              <Eye className="h-4 w-4" />
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
                    : "Henüz tamamlanan servis kaydı bulunmuyor."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Durum Güncelleme Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Servis Durumu Güncelle</DialogTitle>
            <DialogDescription>
              Servis No: {selectedService?.id} - {selectedService?.customerName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Durum</Label>
              <Select value={statusUpdateData.status} onValueChange={handleStatusChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beklemede">Beklemede</SelectItem>
                  <SelectItem value="Teslim Alındı">Teslim Alındı</SelectItem>
                  <SelectItem value="Arıza Tespiti Yapıldı">Arıza Tespiti Yapıldı</SelectItem>
                  <SelectItem value="Onarım Sürecinde">Onarım Sürecinde</SelectItem>
                  <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                  <SelectItem value="Teslim Edildi">Teslim Edildi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Not</Label>
              <Textarea
                value={statusUpdateData.note}
                onChange={handleNoteChange}
                placeholder="Durum güncellemesi ile ilgili not ekleyin"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSubmitStatusUpdate} className="bg-red-500 hover:bg-red-600">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Servis Detay Dialog */}
      {selectedService && (
        <Dialog open={!!selectedService && !isUpdateDialogOpen} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Servis Detayları</DialogTitle>
              <DialogDescription>Servis No: {selectedService.id}</DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Müşteri Bilgileri</h3>
                  <p className="font-medium text-sm">{selectedService.customerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedService.customerPhone}</p>
                  {selectedService.customerEmail && (
                    <p className="text-sm text-muted-foreground">{selectedService.customerEmail}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Cihaz Modeli</h3>
                  <p className="font-medium text-sm">{selectedService.deviceModel}</p>
                  {selectedService.imeiNumber && (
                    <p className="text-sm text-muted-foreground">IMEI: {selectedService.imeiNumber}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Onarım Türü</h3>
                  <p className="font-medium text-sm">{selectedService.repairType || "Belirtilmemiş"}</p>
                  {selectedService.repairDetails && (
                    <p className="text-sm text-muted-foreground">{selectedService.repairDetails}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Fiyat Bilgisi</h3>
                  <p className="font-medium text-sm">
                    {selectedService.repairPrice ? `${selectedService.repairPrice} TL` : "Belirtilmemiş"}
                  </p>
                  {selectedService.isPriceEstimated && <p className="text-sm text-muted-foreground">(Tahmini fiyat)</p>}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Sorun</h3>
                  <p className="font-medium text-sm">{selectedService.problem}</p>
                  {selectedService.notes && (
                    <p className="text-sm text-muted-foreground mt-1">{selectedService.notes}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Randevu Bilgileri</h3>
                  <p className="font-medium text-sm">
                    {formatDate(selectedService.appointmentDate)} {selectedService.appointmentTime}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedService.serviceType === "in-store" ? "Mağazada Tamir" : "Yerinde Servis"}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Parça Seçimi</h3>
                  <p className="font-medium text-sm">{selectedService.partSelection || "Belirtilmemiş"}</p>
                  {selectedService.partSelectionDetails && (
                    <p className="text-sm text-muted-foreground">{selectedService.partSelectionDetails}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Giriş Tarihi</h3>
                  <p className="font-medium text-sm">{formatDate(selectedService.entryDate)}</p>
                </div>
                <div>
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Tahmini Tamamlanma</h3>
                  <p className="font-medium text-sm">{formatDate(selectedService.estimatedCompletionDate)}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium text-xs text-muted-foreground mb-0.5">Durum</h3>
                  <div className="mt-1">{getStatusBadge(selectedService.status)}</div>
                </div>
              </div>

              {selectedService.statusHistory && selectedService.statusHistory.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-medium mb-2">Durum Geçmişi</h3>
                    <div className="space-y-1.5 text-sm">
                      {selectedService.statusHistory.map((history: any, index: number) => (
                        <div key={index} className="bg-gray-50 p-2 rounded-md">
                          <div className="flex justify-between">
                            <span className="font-medium">{history.status}</span>
                            <span className="text-sm text-muted-foreground">{formatDate(history.date)}</span>
                          </div>
                          {history.note && <p className="text-sm mt-1">{history.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedService(null)}>
                  Kapat
                </Button>
                <Button
                  onClick={() => {
                    setStatusUpdateData({
                      status: selectedService.status,
                      note: "",
                    })
                    setIsUpdateDialogOpen(true)
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Durumu Güncelle
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
