"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ServiceStatusResult from "./service-status-result"

export default function ServiceStatusSearch() {
  const [searchType, setSearchType] = useState("serviceId")
  const [searchValue, setSearchValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchValue.trim()) {
      setError("Lütfen bir değer girin")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Telefon numarası formatını düzenle
      let formattedValue = searchValue
      if (searchType === "phone") {
        // Telefon numarası formatını normalize et
        formattedValue = searchValue.replace(/\D/g, "") // Sadece rakamları al

        // Başında 0 veya 5 varsa düzenle
        if (formattedValue.startsWith("0")) {
          formattedValue = formattedValue.substring(1)
        }
        if (formattedValue.startsWith("5")) {
          formattedValue = formattedValue
        }
      }

      const response = await fetch(`/api/service-status?${searchType}=${formattedValue}`)
      const data = await response.json()

      if (data.success) {
        setResult(data.data)
      } else {
        setError(data.message || "Servis kaydı bulunamadı")
        setResult(null)
      }
    } catch (err) {
      setError("Servis durumu sorgulanırken bir hata oluştu")
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="space-y-4">
        <RadioGroup value={searchType} onValueChange={setSearchType} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="serviceId" id="serviceId" />
            <Label htmlFor="serviceId">Servis Numarası ile Sorgula</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="phone" />
            <Label htmlFor="phone">Telefon Numarası ile Sorgula</Label>
          </div>
        </RadioGroup>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder={
              searchType === "serviceId" ? "Servis numaranızı girin" : "Telefon numaranızı girin (05XX XXX XX XX)"
            }
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button type="submit" disabled={isLoading} className="bg-red-500 hover:bg-red-600">
            {isLoading ? "Sorgulanıyor..." : "Sorgula"}
          </Button>
        </div>
      </form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error === "Servis kaydı bulunamadı" ? (
              <div>
                <p>Servis kaydı bulunamadı. Lütfen şunları kontrol edin:</p>
                <ul className="list-disc pl-5 mt-2 text-sm">
                  <li>Telefon numarasını başında 0 olmadan girdiğinizden emin olun (örn: 5XX XXX XX XX)</li>
                  <li>Servis kaydı oluştururken verdiğiniz telefon numarasını kullandığınızdan emin olun</li>
                  <li>Servis numarası ile sorgulama yapmayı deneyin</li>
                </ul>
              </div>
            ) : (
              error
            )}
          </AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="mt-6">
          <ServiceStatusResult data={result} />
        </div>
      )}
    </div>
  )
}
