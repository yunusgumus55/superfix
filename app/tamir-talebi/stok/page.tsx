"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Plus, Search, Trash2, Edit, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// iPhone modelleri
const iPhoneModels = {
  "iphone-16-pro-max": { name: "iPhone 16 Pro Max" },
  "iphone-16-pro": { name: "iPhone 16 Pro" },
  "iphone-16-plus": { name: "iPhone 16 Plus" },
  "iphone-16": { name: "iPhone 16" },
  "iphone-15-pro-max": { name: "iPhone 15 Pro Max" },
  "iphone-15-pro": { name: "iPhone 15 Pro" },
  "iphone-15-plus": { name: "iPhone 15 Plus" },
  "iphone-15": { name: "iPhone 15" },
  "iphone-14-pro-max": { name: "iPhone 14 Pro Max" },
  "iphone-14-pro": { name: "iPhone 14 Pro" },
  "iphone-14-plus": { name: "iPhone 14 Plus" },
  "iphone-14": { name: "iPhone 14" },
  "iphone-13-pro-max": { name: "iPhone 13 Pro Max" },
  "iphone-13-pro": { name: "iPhone 13 Pro" },
  "iphone-13": { name: "iPhone 13" },
  "iphone-13-mini": { name: "iPhone 13 Mini" },
  "iphone-12-pro-max": { name: "iPhone 12 Pro Max" },
  "iphone-12-pro": { name: "iPhone 12 Pro" },
  "iphone-12": { name: "iPhone 12" },
  "iphone-12-mini": { name: "iPhone 12 Mini" },
  "iphone-11-pro-max": { name: "iPhone 11 Pro Max" },
  "iphone-11-pro": { name: "iPhone 11 Pro" },
  "iphone-11": { name: "iPhone 11" },
  "iphone-xr": { name: "iPhone XR" },
  "iphone-xs-max": { name: "iPhone XS Max" },
  "iphone-xs": { name: "iPhone XS" },
  "iphone-x": { name: "iPhone X" },
  "iphone-8-plus": { name: "iPhone 8 Plus" },
  "iphone-8": { name: "iPhone 8" },
  "iphone-7-plus": { name: "iPhone 7 Plus" },
  "iphone-7": { name: "iPhone 7" },
  "iphone-se-2022": { name: "iPhone SE 2022" },
  "iphone-se-2020": { name: "iPhone SE 2020" },
}

// Parça kategorileri
const partCategories = [
  { id: "ekran", name: "Ekran" },
  { id: "batarya", name: "Batarya" },
  { id: "kamera", name: "Kamera" },
  { id: "kasa", name: "Kasa" },
  { id: "hoparlor", name: "Hoparlör" },
  { id: "sarj-soketi", name: "Şarj Soketi" },
  { id: "diger", name: "Diğer Parçalar" },
]

// Parça kalite seviyeleri
const qualityLevels = [
  { id: "orijinal-servis", name: "Orijinal Servis" },
  { id: "orijinal-uyarisiz", name: "Orijinal Uyarısız" },
  { id: "orijinal-uyarili", name: "Orijinal Uyarılı" },
  { id: "a-kalite", name: "A Kalite" },
]

export default function StockManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("inventory")
  const [searchQuery, setSearchQuery] = useState("")
  const [stockItems, setStockItems] = useState<any[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  // Form state
  const [newItem, setNewItem] = useState({
    id: "",
    name: "",
    modelId: "",
    categoryId: "",
    qualityId: "",
    quantity: 0,
    price: 0,
    minQuantity: 5,
  })

  // Load stock items from localStorage
  useEffect(() => {
    const loadStockItems = () => {
      try {
        const savedItems = localStorage.getItem("stockItems")
        if (savedItems) {
          setStockItems(JSON.parse(savedItems))
        } else {
          // Initialize with empty array if no data exists
          localStorage.setItem("stockItems", JSON.stringify([]))
          setStockItems([])
        }
      } catch (error) {
        console.error("Error loading stock items:", error)
        toast({
          title: "Hata",
          description: "Stok verileri yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
      }
    }

    loadStockItems()

    // Listen for storage changes
    window.addEventListener("storage", loadStockItems)
    return () => {
      window.removeEventListener("storage", loadStockItems)
    }
  }, [toast])

  // Filter stock items based on search query
  const filteredStockItems = stockItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (iPhoneModels[item.modelId]?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      partCategories
        .find((cat) => cat.id === item.categoryId)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  )

  // Get low stock items
  const lowStockItems = stockItems.filter((item) => item.quantity <= item.minQuantity)

  // Handle adding a new stock item
  const handleAddItem = () => {
    try {
      // Generate a unique ID
      const itemId = `part_${Date.now()}`

      // Create the new item
      const item = {
        ...newItem,
        id: itemId,
      }

      // Add to state and localStorage
      const updatedItems = [...stockItems, item]
      localStorage.setItem("stockItems", JSON.stringify(updatedItems))
      setStockItems(updatedItems)

      // Reset form and close dialog
      setNewItem({
        id: "",
        name: "",
        modelId: "",
        categoryId: "",
        qualityId: "",
        quantity: 0,
        price: 0,
        minQuantity: 5,
      })
      setIsAddDialogOpen(false)

      toast({
        title: "Başarılı",
        description: "Yeni parça stok listesine eklendi.",
      })
    } catch (error) {
      console.error("Error adding stock item:", error)
      toast({
        title: "Hata",
        description: "Parça eklenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  // Handle editing a stock item
  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  // Handle saving edited item
  const handleSaveEdit = () => {
    try {
      const updatedItems = stockItems.map((item) => (item.id === editingItem.id ? editingItem : item))

      localStorage.setItem("stockItems", JSON.stringify(updatedItems))
      setStockItems(updatedItems)
      setIsEditDialogOpen(false)

      toast({
        title: "Başarılı",
        description: "Parça bilgileri güncellendi.",
      })
    } catch (error) {
      console.error("Error updating stock item:", error)
      toast({
        title: "Hata",
        description: "Parça güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  // Handle deleting a stock item
  const handleDeleteItem = (itemId: string) => {
    try {
      const updatedItems = stockItems.filter((item) => item.id !== itemId)
      localStorage.setItem("stockItems", JSON.stringify(updatedItems))
      setStockItems(updatedItems)

      toast({
        title: "Başarılı",
        description: "Parça stok listesinden silindi.",
      })
    } catch (error) {
      console.error("Error deleting stock item:", error)
      toast({
        title: "Hata",
        description: "Parça silinirken bir hata oluştu.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center mb-8">
        <Link href="/tamir-talebi" className="flex items-center text-gray-600 hover:text-red-500 mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Geri Dön</span>
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Stok Yönetimi</h1>
      </div>

      <Tabs defaultValue="inventory" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="inventory">Stok Durumu</TabsTrigger>
          <TabsTrigger value="low-stock">Kritik Stok</TabsTrigger>
          <TabsTrigger value="by-model">Modele Göre Stok</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Stok Durumu</CardTitle>
                  <CardDescription>Tüm parçaların stok durumunu görüntüleyin ve yönetin.</CardDescription>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Parça ara..."
                      className="pl-8 w-full md:w-64"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button onClick={() => setIsAddDialogOpen(true)} className="bg-red-500 hover:bg-red-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Parça Ekle
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredStockItems.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parça Adı</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Kalite</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Fiyat</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{iPhoneModels[item.modelId]?.name || item.modelId}</TableCell>
                          <TableCell>
                            {partCategories.find((cat) => cat.id === item.categoryId)?.name || item.categoryId}
                          </TableCell>
                          <TableCell>
                            {qualityLevels.find((q) => q.id === item.qualityId)?.name || item.qualityId}
                          </TableCell>
                          <TableCell className={item.quantity <= item.minQuantity ? "text-red-500 font-bold" : ""}>
                            {item.quantity} adet
                          </TableCell>
                          <TableCell>{item.price.toLocaleString("tr-TR")} ₺</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditItem(item)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteItem(item.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
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
                    ? "Arama kriterlerine uygun parça bulunamadı."
                    : "Henüz stok listesine parça eklenmemiş."}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="low-stock">
          <Card>
            <CardHeader>
              <CardTitle>Kritik Stok Durumu</CardTitle>
              <CardDescription>Stok seviyesi kritik olan parçaları görüntüleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              {lowStockItems.length > 0 ? (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Parça Adı</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Kalite</TableHead>
                        <TableHead>Stok</TableHead>
                        <TableHead>Minimum Stok</TableHead>
                        <TableHead>İşlemler</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lowStockItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{iPhoneModels[item.modelId]?.name || item.modelId}</TableCell>
                          <TableCell>
                            {partCategories.find((cat) => cat.id === item.categoryId)?.name || item.categoryId}
                          </TableCell>
                          <TableCell>
                            {qualityLevels.find((q) => q.id === item.qualityId)?.name || item.qualityId}
                          </TableCell>
                          <TableCell className="text-red-500 font-bold">{item.quantity} adet</TableCell>
                          <TableCell>{item.minQuantity} adet</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">Kritik stok seviyesinde parça bulunmuyor.</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-model">
          <Card>
            <CardHeader>
              <CardTitle>Modele Göre Stok</CardTitle>
              <CardDescription>iPhone modellerine göre stok durumunu görüntüleyin.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(iPhoneModels).map(([modelId, model]) => {
                  const modelParts = stockItems.filter((item) => item.modelId === modelId)
                  const totalParts = modelParts.length
                  const lowStockCount = modelParts.filter((item) => item.quantity <= item.minQuantity).length

                  return (
                    <Card key={modelId} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{model.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between">
                            <span>Toplam Parça:</span>
                            <span className="font-medium">{totalParts} çeşit</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Kritik Stok:</span>
                            <span className={lowStockCount > 0 ? "font-medium text-red-500" : "font-medium"}>
                              {lowStockCount} çeşit
                            </span>
                          </div>

                          {totalParts > 0 && (
                            <div className="pt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs"
                                onClick={() => {
                                  setSearchQuery(model.name)
                                  setActiveTab("inventory")
                                }}
                              >
                                Parçaları Görüntüle
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add New Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Yeni Parça Ekle</DialogTitle>
            <DialogDescription>Stok listesine yeni bir parça ekleyin. Tüm alanları doldurun.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Parça Adı</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Örn: iPhone 13 Pro Max Ekran"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="model">Model</Label>
                <select
                  id="model"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItem.modelId}
                  onChange={(e) => setNewItem({ ...newItem, modelId: e.target.value })}
                >
                  <option value="">Model Seçin</option>
                  {Object.entries(iPhoneModels).map(([id, model]) => (
                    <option key={id} value={id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Kategori</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItem.categoryId}
                  onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                >
                  <option value="">Kategori Seçin</option>
                  {partCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="quality">Kalite</Label>
                <select
                  id="quality"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newItem.qualityId}
                  onChange={(e) => setNewItem({ ...newItem, qualityId: e.target.value })}
                >
                  <option value="">Kalite Seçin</option>
                  {qualityLevels.map((quality) => (
                    <option key={quality.id} value={quality.id}>
                      {quality.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Stok Adedi</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="0"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Fiyat (₺)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minQuantity">Minimum Stok Seviyesi</Label>
                <Input
                  id="minQuantity"
                  type="number"
                  min="0"
                  value={newItem.minQuantity}
                  onChange={(e) => setNewItem({ ...newItem, minQuantity: Number.parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              İptal
            </Button>
            <Button
              onClick={handleAddItem}
              className="bg-red-500 hover:bg-red-600"
              disabled={!newItem.name || !newItem.modelId || !newItem.categoryId || !newItem.qualityId}
            >
              Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Parça Düzenle</DialogTitle>
            <DialogDescription>Parça bilgilerini ve stok durumunu güncelleyin.</DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Parça Adı</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-model">Model</Label>
                  <select
                    id="edit-model"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingItem.modelId}
                    onChange={(e) => setEditingItem({ ...editingItem, modelId: e.target.value })}
                  >
                    {Object.entries(iPhoneModels).map(([id, model]) => (
                      <option key={id} value={id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Kategori</Label>
                  <select
                    id="edit-category"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingItem.categoryId}
                    onChange={(e) => setEditingItem({ ...editingItem, categoryId: e.target.value })}
                  >
                    {partCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-quality">Kalite</Label>
                  <select
                    id="edit-quality"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editingItem.qualityId}
                    onChange={(e) => setEditingItem({ ...editingItem, qualityId: e.target.value })}
                  >
                    {qualityLevels.map((quality) => (
                      <option key={quality.id} value={quality.id}>
                        {quality.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-quantity">Stok Adedi</Label>
                  <Input
                    id="edit-quantity"
                    type="number"
                    min="0"
                    value={editingItem.quantity}
                    onChange={(e) => setEditingItem({ ...editingItem, quantity: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Fiyat (₺)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Number.parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-minQuantity">Minimum Stok Seviyesi</Label>
                  <Input
                    id="edit-minQuantity"
                    type="number"
                    min="0"
                    value={editingItem.minQuantity}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, minQuantity: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveEdit} className="bg-red-500 hover:bg-red-600">
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
