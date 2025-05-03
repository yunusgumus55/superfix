"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"

export default function ApiSettingsForm() {
  const { toast } = useToast()
  const [apiUrl, setApiUrl] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Load the current API URL from localStorage or environment variable
    const storedUrl = localStorage.getItem("smsApiUrl") || process.env.NEXT_PUBLIC_API_URL || ""
    setApiUrl(storedUrl)
  }, [])

  const handleSave = async () => {
    try {
      setIsSaving(true)

      // In a real implementation, this would call an API to update the environment variable
      // For now, we'll just store it in localStorage
      localStorage.setItem("smsApiUrl", apiUrl)

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "API URL güncellendi",
        description: "SMS API URL başarıyla güncellendi.",
      })
    } catch (error) {
      toast({
        title: "Hata",
        description: "API URL güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
      console.error("API URL güncellenirken hata:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">SMS API Güncelleme</h3>
      <div className="grid gap-4">
        <div className="space-y-2">
          <label htmlFor="api-url" className="text-sm font-medium">
            API URL
          </label>
          <div className="flex gap-2">
            <Input
              id="api-url"
              placeholder="https://api.example.com"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSave} disabled={isSaving} className="bg-red-500 hover:bg-red-600">
              {isSaving ? (
                "Kaydediliyor..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Kaydet
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            SMS gönderimi için kullanılacak API adresini girin. Bu değişiklik yalnızca yöneticiler tarafından
            yapılabilir.
          </p>
        </div>
      </div>
    </div>
  )
}
