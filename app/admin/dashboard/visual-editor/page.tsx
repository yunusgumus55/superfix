"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Edit, Undo, Redo, Eye } from "lucide-react"

export default function VisualEditorPage() {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
  const [selectedElementPath, setSelectedElementPath] = useState<string>("")
  const [elementStyles, setElementStyles] = useState<any>({})
  const [activeTab, setActiveTab] = useState("style")
  const [previewUrl, setPreviewUrl] = useState("/")
  const [editHistory, setEditHistory] = useState<any[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [highlightedElements, setHighlightedElements] = useState<HTMLElement[]>([])

  // Oturum kontrolü
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
    setIsLoggedIn(adminLoggedIn)

    if (!adminLoggedIn) {
      router.push("/admin")
    }
  }, [router])

  // iframe yüklendiğinde
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe) return

    const handleIframeLoad = () => {
      if (!iframe.contentDocument) return

      // Edit modu kapalıysa, iframe'e müdahale etme
      if (!isEditMode) return

      // iframe içindeki tüm elementlere hover ve click event'leri ekle
      addEventListenersToIframeElements(iframe)
    }

    iframe.addEventListener("load", handleIframeLoad)
    return () => {
      iframe.removeEventListener("load", handleIframeLoad)
    }
  }, [iframeRef, isEditMode])

  // Edit modu değiştiğinde
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || !iframe.contentDocument) return

    if (isEditMode) {
      // Edit modu açıldığında
      addEventListenersToIframeElements(iframe)
      // iframe'e CSS ekle
      addEditorStylesToIframe(iframe)
    } else {
      // Edit modu kapandığında
      removeEventListenersFromIframeElements(iframe)
      // iframe'den CSS kaldır
      removeEditorStylesFromIframe(iframe)
      // Seçili elementi temizle
      setSelectedElement(null)
      setSelectedElementPath("")
      setElementStyles({})
    }
  }, [isEditMode])

  // Seçili element değiştiğinde
  useEffect(() => {
    if (!selectedElement) {
      setElementStyles({})
      return
    }

    // Seçili elementin stil özelliklerini al
    const computedStyle = window.getComputedStyle(selectedElement)

    // RGB renk değerlerini HEX'e çevir
    const rgbToHex = (rgb) => {
      if (!rgb || !rgb.startsWith("rgb")) return rgb

      // rgb(r, g, b) veya rgba(r, g, b, a) formatından değerleri çıkar
      const values = rgb.match(/\d+/g)
      if (!values || values.length < 3) return rgb

      // HEX formatına çevir
      return `#${values
        .slice(0, 3)
        .map((x) => {
          const hex = Number.parseInt(x).toString(16)
          return hex.length === 1 ? "0" + hex : hex
        })
        .join("")}`
    }

    const styles = {
      // Boyut ve konum
      width: selectedElement.style.width || computedStyle.width,
      height: selectedElement.style.height || computedStyle.height,

      // Margin
      marginTop: selectedElement.style.marginTop || computedStyle.marginTop,
      marginRight: selectedElement.style.marginRight || computedStyle.marginRight,
      marginBottom: selectedElement.style.marginBottom || computedStyle.marginBottom,
      marginLeft: selectedElement.style.marginLeft || computedStyle.marginLeft,

      // Padding
      paddingTop: selectedElement.style.paddingTop || computedStyle.paddingTop,
      paddingRight: selectedElement.style.paddingRight || computedStyle.paddingRight,
      paddingBottom: selectedElement.style.paddingBottom || computedStyle.paddingBottom,
      paddingLeft: selectedElement.style.paddingLeft || computedStyle.paddingLeft,

      // Yazı stili
      color: rgbToHex(selectedElement.style.color || computedStyle.color),
      backgroundColor: rgbToHex(selectedElement.style.backgroundColor || computedStyle.backgroundColor),
      fontSize: selectedElement.style.fontSize || computedStyle.fontSize,
      fontWeight: selectedElement.style.fontWeight || computedStyle.fontWeight,
      fontFamily: selectedElement.style.fontFamily || computedStyle.fontFamily,
      textAlign: selectedElement.style.textAlign || computedStyle.textAlign,
      lineHeight: selectedElement.style.lineHeight || computedStyle.lineHeight,

      // Kenarlık
      borderWidth: selectedElement.style.borderWidth || computedStyle.borderWidth,
      borderStyle: selectedElement.style.borderStyle || computedStyle.borderStyle,
      borderColor: rgbToHex(selectedElement.style.borderColor || computedStyle.borderColor),
      borderRadius: selectedElement.style.borderRadius || computedStyle.borderRadius,

      // Görünürlük
      opacity: selectedElement.style.opacity || computedStyle.opacity,
      display: selectedElement.style.display || computedStyle.display,
      visibility: selectedElement.style.visibility || computedStyle.visibility,

      // Metin içeriği
      textContent: selectedElement.textContent || "",
    }

    setElementStyles(styles)
  }, [selectedElement])

  // iframe içindeki elementlere event listener'lar ekle
  const addEventListenersToIframeElements = (iframe: HTMLIFrameElement) => {
    if (!iframe.contentDocument) return

    const allElements = iframe.contentDocument.querySelectorAll("*")

    allElements.forEach((element) => {
      if (element.tagName === "HTML" || element.tagName === "BODY" || element.tagName === "SCRIPT") return

      // Hover event'i
      element.addEventListener("mouseover", (e) => handleElementHover(e, element as HTMLElement))
      element.addEventListener("mouseout", (e) => handleElementMouseOut(e, element as HTMLElement))

      // Click event'i
      element.addEventListener("click", (e) => handleElementClick(e, element as HTMLElement))
    })
  }

  // iframe içindeki elementlerden event listener'ları kaldır
  const removeEventListenersFromIframeElements = (iframe: HTMLIFrameElement) => {
    if (!iframe.contentDocument) return

    const allElements = iframe.contentDocument.querySelectorAll("*")

    allElements.forEach((element) => {
      if (element.tagName === "HTML" || element.tagName === "BODY" || element.tagName === "SCRIPT") return

      // Event listener'ları kaldır
      element.removeEventListener("mouseover", (e) => handleElementHover(e, element as HTMLElement))
      element.removeEventListener("mouseout", (e) => handleElementMouseOut(e, element as HTMLElement))
      element.removeEventListener("click", (e) => handleElementClick(e, element as HTMLElement))

      // Eklenen stilleri kaldır
      element.classList.remove("ve-hovering", "ve-selected")
    })
  }

  // iframe'e düzenleyici stilleri ekle
  const addEditorStylesToIframe = (iframe: HTMLIFrameElement) => {
    if (!iframe.contentDocument) return

    const style = iframe.contentDocument.createElement("style")
    style.id = "visual-editor-styles"
    style.textContent = `
      .ve-hovering {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
      }
      .ve-selected {
        outline: 2px solid #ef4444 !important;
        outline-offset: 2px !important;
      }
    `
    iframe.contentDocument.head.appendChild(style)
  }

  // iframe'den düzenleyici stillerini kaldır
  const removeEditorStylesFromIframe = (iframe: HTMLIFrameElement) => {
    if (!iframe.contentDocument) return

    const style = iframe.contentDocument.getElementById("visual-editor-styles")
    if (style) {
      style.remove()
    }

    // Tüm elementlerden düzenleyici sınıflarını kaldır
    const allElements = iframe.contentDocument.querySelectorAll(".ve-hovering, .ve-selected")
    allElements.forEach((element) => {
      element.classList.remove("ve-hovering", "ve-selected")
    })
  }

  // Element hover olduğunda
  const handleElementHover = (e: Event, element: HTMLElement) => {
    e.stopPropagation()

    // Zaten seçili element ise hover efekti ekleme
    if (element === selectedElement) return

    element.classList.add("ve-hovering")
    setHighlightedElements((prev) => [...prev, element])
  }

  // Element hover'dan çıktığında
  const handleElementMouseOut = (e: Event, element: HTMLElement) => {
    e.stopPropagation()

    // Zaten seçili element ise hover efekti kaldırma
    if (element === selectedElement) return

    element.classList.remove("ve-hovering")
    setHighlightedElements((prev) => prev.filter((el) => el !== element))
  }

  // Element tıklandığında
  const handleElementClick = (e: Event, element: HTMLElement) => {
    e.preventDefault()
    e.stopPropagation()

    // Önceki seçili elementi temizle
    if (selectedElement) {
      selectedElement.classList.remove("ve-selected")
    }

    // Yeni elementi seç
    element.classList.add("ve-selected")
    element.classList.remove("ve-hovering")

    setSelectedElement(element)

    // Element yolunu belirle
    const path = getElementPath(element)
    setSelectedElementPath(path)

    // Düzenleme geçmişine ekle
    addToHistory()
  }

  // Element yolunu belirle (CSS seçici olarak)
  const getElementPath = (element: HTMLElement): string => {
    if (!element) return ""

    let path = element.tagName.toLowerCase()

    // ID varsa ekle
    if (element.id) {
      path += `#${element.id}`
    }

    // Class'ları ekle
    if (element.classList.length > 0) {
      const classes = Array.from(element.classList)
        .filter((cls) => !cls.startsWith("ve-")) // Düzenleyici sınıflarını hariç tut
        .join(".")

      if (classes) {
        path += `.${classes}`
      }
    }

    return path
  }

  // Stil değişikliği
  const handleStyleChange = (property: string, value: string) => {
    if (!selectedElement) return

    // Elementi güncelle
    selectedElement.style[property as any] = value

    // Stil state'ini güncelle
    setElementStyles((prev: any) => ({
      ...prev,
      [property]: value,
    }))
  }

  // Düzenleme geçmişine ekle
  const addToHistory = () => {
    if (!selectedElement) return

    const newHistoryItem = {
      element: selectedElement,
      path: selectedElementPath,
      styles: { ...elementStyles },
    }

    // Geçmiş dizisini güncelle
    const newHistory = [...editHistory.slice(0, historyIndex + 1), newHistoryItem]
    setEditHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  // Geri al
  const handleUndo = () => {
    if (historyIndex <= 0) return

    const newIndex = historyIndex - 1
    const historyItem = editHistory[newIndex]

    if (historyItem && historyItem.element) {
      // Önceki seçili elementi temizle
      if (selectedElement) {
        selectedElement.classList.remove("ve-selected")
      }

      // Geçmişteki elementi seç
      historyItem.element.classList.add("ve-selected")
      setSelectedElement(historyItem.element)
      setSelectedElementPath(historyItem.path)
      setElementStyles(historyItem.styles)

      // Stil özelliklerini uygula
      Object.entries(historyItem.styles).forEach(([property, value]) => {
        historyItem.element.style[property as any] = value as string
      })
    }

    setHistoryIndex(newIndex)
  }

  // İleri al
  const handleRedo = () => {
    if (historyIndex >= editHistory.length - 1) return

    const newIndex = historyIndex + 1
    const historyItem = editHistory[newIndex]

    if (historyItem && historyItem.element) {
      // Önceki seçili elementi temizle
      if (selectedElement) {
        selectedElement.classList.remove("ve-selected")
      }

      // Geçmişteki elementi seç
      historyItem.element.classList.add("ve-selected")
      setSelectedElement(historyItem.element)
      setSelectedElementPath(historyItem.path)
      setElementStyles(historyItem.styles)

      // Stil özelliklerini uygula
      Object.entries(historyItem.styles).forEach(([property, value]) => {
        historyItem.element.style[property as any] = value as string
      })
    }

    setHistoryIndex(newIndex)
  }

  // Değişiklikleri kaydet
  const handleSave = () => {
    // Burada değişiklikleri veritabanına kaydetme işlemi yapılacak
    // Şimdilik sadece bir toast mesajı gösterelim
    toast({
      title: "Değişiklikler kaydedildi",
      description: "Yaptığınız değişiklikler başarıyla kaydedildi.",
    })
  }

  // Düzenleme modunu aç/kapat
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  // Sayfa değiştir
  const handlePageChange = (url: string) => {
    setPreviewUrl(url)
    setSelectedElement(null)
    setSelectedElementPath("")
    setElementStyles({})
    setEditHistory([])
    setHistoryIndex(-1)
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Üst Araç Çubuğu */}
      <div className="flex items-center justify-between border-b bg-white p-2">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Görsel Site Düzenleyici</h1>

          <Select value={previewUrl} onValueChange={handlePageChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sayfa seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="/">Ana Sayfa</SelectItem>
              <SelectItem value="/hizmetler">Hizmetler</SelectItem>
              <SelectItem value="/tamir-talebi">Tamir Talebi</SelectItem>
              <SelectItem value="/servis-takip">Servis Takip</SelectItem>
              <SelectItem value="/sertifikali-urunler">Sertifikalı Ürünler</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant={isEditMode ? "default" : "outline"} size="sm" onClick={toggleEditMode}>
            {isEditMode ? <Eye className="mr-1 h-4 w-4" /> : <Edit className="mr-1 h-4 w-4" />}
            {isEditMode ? "Önizleme Modu" : "Düzenleme Modu"}
          </Button>

          <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex <= 0}>
            <Undo className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex >= editHistory.length - 1}>
            <Redo className="h-4 w-4" />
          </Button>

          <Button variant="default" size="sm" onClick={handleSave} disabled={!isEditMode || !selectedElement}>
            <Save className="mr-1 h-4 w-4" />
            Kaydet
          </Button>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="flex flex-1 overflow-hidden">
        {/* Düzenleme Paneli (Seçili element varsa göster) */}
        {isEditMode && selectedElement && (
          <div className="w-96 overflow-y-auto border-r bg-white p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Seçili Element</h2>
              <p className="text-sm text-gray-500">{selectedElementPath}</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="style">Stil</TabsTrigger>
                <TabsTrigger value="layout">Düzen</TabsTrigger>
                <TabsTrigger value="text">Metin</TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-4 py-4">
                {/* Renk Ayarları */}
                <div className="space-y-2">
                  <Label htmlFor="color">Metin Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="color-picker"
                      type="color"
                      value={elementStyles.color?.toString() || "#000000"}
                      onChange={(e) => handleStyleChange("color", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      id="color"
                      value={elementStyles.color?.toString() || ""}
                      onChange={(e) => handleStyleChange("color", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Arka Plan Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor-picker"
                      type="color"
                      value={elementStyles.backgroundColor?.toString() || "#ffffff"}
                      onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      id="backgroundColor"
                      value={elementStyles.backgroundColor?.toString() || ""}
                      onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                    />
                  </div>
                </div>

                {/* Kenarlık Ayarları */}
                <div className="space-y-2">
                  <Label htmlFor="borderWidth">Kenarlık Kalınlığı</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="borderWidth"
                      min={0}
                      max={10}
                      step={1}
                      value={[Number.parseInt(elementStyles.borderWidth) || 0]}
                      onValueChange={(value) => handleStyleChange("borderWidth", `${value[0]}px`)}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{Number.parseInt(elementStyles.borderWidth) || 0}px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderStyle">Kenarlık Stili</Label>
                  <Select
                    value={elementStyles.borderStyle?.toString() || "none"}
                    onValueChange={(value) => handleStyleChange("borderStyle", value)}
                  >
                    <SelectTrigger id="borderStyle">
                      <SelectValue placeholder="Stil seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Yok</SelectItem>
                      <SelectItem value="solid">Düz</SelectItem>
                      <SelectItem value="dashed">Kesikli</SelectItem>
                      <SelectItem value="dotted">Noktalı</SelectItem>
                      <SelectItem value="double">Çift</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderColor">Kenarlık Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="borderColor-picker"
                      type="color"
                      value={elementStyles.borderColor?.toString() || "#000000"}
                      onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      id="borderColor"
                      value={elementStyles.borderColor?.toString() || ""}
                      onChange={(e) => handleStyleChange("borderColor", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Köşe Yuvarlaklığı</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="borderRadius"
                      min={0}
                      max={50}
                      step={1}
                      value={[Number.parseInt(elementStyles.borderRadius) || 0]}
                      onValueChange={(value) => handleStyleChange("borderRadius", `${value[0]}px`)}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{Number.parseInt(elementStyles.borderRadius) || 0}px</span>
                  </div>
                </div>

                {/* Opaklık */}
                <div className="space-y-2">
                  <Label htmlFor="opacity">Opaklık</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="opacity"
                      min={0}
                      max={100}
                      step={1}
                      value={[Number.parseFloat(elementStyles.opacity) * 100 || 100]}
                      onValueChange={(value) => handleStyleChange("opacity", (value[0] / 100).toString())}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">
                      {Math.round(Number.parseFloat(elementStyles.opacity) * 100) || 100}%
                    </span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-4 py-4">
                {/* Boyut Ayarları */}
                <div className="space-y-2">
                  <Label htmlFor="width">Genişlik</Label>
                  <Input
                    id="width"
                    value={elementStyles.width?.toString() || ""}
                    onChange={(e) => handleStyleChange("width", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Yükseklik</Label>
                  <Input
                    id="height"
                    value={elementStyles.height?.toString() || ""}
                    onChange={(e) => handleStyleChange("height", e.target.value)}
                  />
                </div>

                {/* Margin Ayarları */}
                <div className="space-y-2">
                  <Label>Dış Boşluk (Margin)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="marginTop" className="text-xs">
                        Üst
                      </Label>
                      <Input
                        id="marginTop"
                        value={elementStyles.marginTop?.toString() || ""}
                        onChange={(e) => handleStyleChange("marginTop", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="marginRight" className="text-xs">
                        Sağ
                      </Label>
                      <Input
                        id="marginRight"
                        value={elementStyles.marginRight?.toString() || ""}
                        onChange={(e) => handleStyleChange("marginRight", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="marginBottom" className="text-xs">
                        Alt
                      </Label>
                      <Input
                        id="marginBottom"
                        value={elementStyles.marginBottom?.toString() || ""}
                        onChange={(e) => handleStyleChange("marginBottom", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="marginLeft" className="text-xs">
                        Sol
                      </Label>
                      <Input
                        id="marginLeft"
                        value={elementStyles.marginLeft?.toString() || ""}
                        onChange={(e) => handleStyleChange("marginLeft", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Padding Ayarları */}
                <div className="space-y-2">
                  <Label>İç Boşluk (Padding)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label htmlFor="paddingTop" className="text-xs">
                        Üst
                      </Label>
                      <Input
                        id="paddingTop"
                        value={elementStyles.paddingTop?.toString() || ""}
                        onChange={(e) => handleStyleChange("paddingTop", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="paddingRight" className="text-xs">
                        Sağ
                      </Label>
                      <Input
                        id="paddingRight"
                        value={elementStyles.paddingRight?.toString() || ""}
                        onChange={(e) => handleStyleChange("paddingRight", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="paddingBottom" className="text-xs">
                        Alt
                      </Label>
                      <Input
                        id="paddingBottom"
                        value={elementStyles.paddingBottom?.toString() || ""}
                        onChange={(e) => handleStyleChange("paddingBottom", e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="paddingLeft" className="text-xs">
                        Sol
                      </Label>
                      <Input
                        id="paddingLeft"
                        value={elementStyles.paddingLeft?.toString() || ""}
                        onChange={(e) => handleStyleChange("paddingLeft", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Display Ayarları */}
                <div className="space-y-2">
                  <Label htmlFor="display">Görüntüleme (Display)</Label>
                  <Select
                    value={elementStyles.display?.toString() || "block"}
                    onValueChange={(value) => handleStyleChange("display", value)}
                  >
                    <SelectTrigger id="display">
                      <SelectValue placeholder="Display seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="block">Block</SelectItem>
                      <SelectItem value="inline">Inline</SelectItem>
                      <SelectItem value="inline-block">Inline Block</SelectItem>
                      <SelectItem value="flex">Flex</SelectItem>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="text" className="space-y-4 py-4">
                {/* Yazı Tipi Ayarları */}
                <div className="space-y-2">
                  <Label htmlFor="fontSize">Yazı Boyutu</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="fontSize"
                      min={8}
                      max={72}
                      step={1}
                      value={[Number.parseInt(elementStyles.fontSize) || 16]}
                      onValueChange={(value) => handleStyleChange("fontSize", `${value[0]}px`)}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{Number.parseInt(elementStyles.fontSize) || 16}px</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontWeight">Yazı Kalınlığı</Label>
                  <Select
                    value={elementStyles.fontWeight?.toString() || "normal"}
                    onValueChange={(value) => handleStyleChange("fontWeight", value)}
                  >
                    <SelectTrigger id="fontWeight">
                      <SelectValue placeholder="Kalınlık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bold">Kalın</SelectItem>
                      <SelectItem value="lighter">İnce</SelectItem>
                      <SelectItem value="bolder">Daha Kalın</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="300">300</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                      <SelectItem value="500">500</SelectItem>
                      <SelectItem value="600">600</SelectItem>
                      <SelectItem value="700">700</SelectItem>
                      <SelectItem value="800">800</SelectItem>
                      <SelectItem value="900">900</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Yazı Tipi</Label>
                  <Select
                    value={elementStyles.fontFamily?.toString() || ""}
                    onValueChange={(value) => handleStyleChange("fontFamily", value)}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Yazı tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                      <SelectItem value="Helvetica, sans-serif">Helvetica</SelectItem>
                      <SelectItem value="Times New Roman, serif">Times New Roman</SelectItem>
                      <SelectItem value="Georgia, serif">Georgia</SelectItem>
                      <SelectItem value="Courier New, monospace">Courier New</SelectItem>
                      <SelectItem value="Verdana, sans-serif">Verdana</SelectItem>
                      <SelectItem value="Tahoma, sans-serif">Tahoma</SelectItem>
                      <SelectItem value="Trebuchet MS, sans-serif">Trebuchet MS</SelectItem>
                      <SelectItem value="Impact, sans-serif">Impact</SelectItem>
                      <SelectItem value="Comic Sans MS, cursive">Comic Sans MS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textAlign">Metin Hizalama</Label>
                  <Select
                    value={elementStyles.textAlign?.toString() || "left"}
                    onValueChange={(value) => handleStyleChange("textAlign", value)}
                  >
                    <SelectTrigger id="textAlign">
                      <SelectValue placeholder="Hizalama seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Sola</SelectItem>
                      <SelectItem value="center">Ortaya</SelectItem>
                      <SelectItem value="right">Sağa</SelectItem>
                      <SelectItem value="justify">İki Yana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lineHeight">Satır Yüksekliği</Label>
                  <div className="flex items-center gap-4">
                    <Slider
                      id="lineHeight"
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={[Number.parseFloat(elementStyles.lineHeight) || 1.5]}
                      onValueChange={(value) => handleStyleChange("lineHeight", value[0].toString())}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{Number.parseFloat(elementStyles.lineHeight) || 1.5}</span>
                  </div>
                </div>

                {/* Metin İçeriği (eğer metin elementi ise) */}
                {selectedElement && (
                  <div className="space-y-2">
                    <Label htmlFor="textContent">Metin İçeriği</Label>
                    <Input
                      id="textContent"
                      value={elementStyles.textContent || ""}
                      onChange={(e) => {
                        if (selectedElement) {
                          selectedElement.textContent = e.target.value

                          // Değişikliği kaydet ve geçmişe ekle
                          setElementStyles((prev) => ({
                            ...prev,
                            textContent: e.target.value,
                          }))

                          // Değişikliği geçmişe ekle
                          addToHistory()
                        }
                      }}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Önizleme İframe */}
        <div className="flex-1 overflow-hidden bg-gray-100">
          <iframe ref={iframeRef} src={previewUrl} className="h-full w-full border-0" title="Site Önizleme" />
        </div>
      </div>
    </div>
  )
}
