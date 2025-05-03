"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function RepairRequestForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    deviceType: "",
    model: "",
    problem: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    appointmentDate: "",
    appointmentTime: "",
    serviceType: "store", // store veya onsite
    agreeTerms: false,
    agreeMarketing: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log("Form data:", formData)
    alert("Tamir talebiniz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.")
    // Form verilerini sıfırla
    setFormData({
      deviceType: "",
      model: "",
      problem: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      appointmentDate: "",
      appointmentTime: "",
      serviceType: "store",
      agreeTerms: false,
      agreeMarketing: false,
    })
    setStep(1)
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const deviceTypes = ["iPhone", "iPad", "MacBook", "Apple Watch", "AirPods"]

  const iPhoneModels = [
    "iPhone 16 Pro Max",
    "iPhone 16 Pro",
    "iPhone 16 Plus",
    "iPhone 16",
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 13 Mini",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 12 Mini",
    "iPhone 11 Pro Max",
    "iPhone 11 Pro",
    "iPhone 11",
    "iPhone XS Max",
    "iPhone XS",
    "iPhone XR",
    "iPhone X",
    "iPhone 8 Plus",
    "iPhone 8",
    "iPhone 7 Plus",
    "iPhone 7",
    "iPhone SE (3. Nesil)",
    "iPhone SE (2. Nesil)",
    "iPhone SE (1. Nesil)",
    "Diğer",
  ]

  const commonProblems = [
    "Ekran Kırık/Çatlak",
    "Batarya Sorunu",
    "Şarj Sorunu",
    "Kamera Sorunu",
    "Ses/Mikrofon Sorunu",
    "Açılmıyor/Kapanıyor",
    "Su/Sıvı Teması",
    "Veri Kurtarma",
    "Diğer",
  ]

  const timeSlots = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-6">
        {/* Progress Bar */}
        <div className="relative mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-500"
                  } font-bold text-lg`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs font-medium mt-2">
                  {stepNumber === 1 && "MARKA"}
                  {stepNumber === 2 && "MODEL"}
                  {stepNumber === 3 && "SORUN"}
                  {stepNumber === 4 && "TALEP"}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10"></div>
            <div
              className="absolute top-5 left-0 h-1 bg-orange-600 transition-all duration-300 -z-10"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {step < 4 && (
          <h3 className="text-xl font-bold">
            {step === 1 && "Marka Seçin"}
            {step === 2 && "Model Seçin"}
            {step === 3 && "Sorun Seçin"}
          </h3>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="deviceType">Cihaz Türü</Label>
              <Select value={formData.deviceType} onValueChange={(value) => handleSelectChange("deviceType", value)}>
                <SelectTrigger id="deviceType">
                  <SelectValue placeholder="Cihaz türünü seçin" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button
                type="button"
                onClick={nextStep}
                className="w-full bg-orange-600 hover:bg-orange-700"
                disabled={!formData.deviceType}
              >
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="model">Model</Label>
              <Select
                value={formData.model}
                onValueChange={(value) => handleSelectChange("model", value)}
                disabled={!formData.deviceType}
              >
                <SelectTrigger id="model">
                  <SelectValue placeholder="Model seçin" />
                </SelectTrigger>
                <SelectContent>
                  {iPhoneModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" onClick={prevStep} variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Önceki Adıma Dön
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!formData.model}
              >
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="problem">Sorun</Label>
              <Select value={formData.problem} onValueChange={(value) => handleSelectChange("problem", value)}>
                <SelectTrigger id="problem">
                  <SelectValue placeholder="Sorunu seçin" />
                </SelectTrigger>
                <SelectContent>
                  {commonProblems.map((problem) => (
                    <SelectItem key={problem} value={problem}>
                      {problem}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <Button type="button" onClick={prevStep} variant="outline" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Önceki Adıma Dön
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!formData.problem}
              >
                Devam Et
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left side: Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">İletişim Bilgileri</h3>
                <p className="text-gray-600 mb-4">
                  Talebiniz hakkında sizinle iletişime geçebilmemiz için lütfen iletişim bilgilerinizi doldurunuz.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-base">
                    Ad Soyad <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Adınız ve soyadınız"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base">
                    Telefon Numarası <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+90 (___) ___ - ____"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base">
                    E-posta
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@mail.com"
                  />
                </div>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="agreeMarketing"
                    checked={formData.agreeMarketing}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeMarketing", checked as boolean)}
                  />
                  <Label htmlFor="agreeMarketing" className="text-sm font-normal">
                    Ürün, hizmet, kampanya ve reklamlardan haberdar olmak istiyorum.
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => handleCheckboxChange("agreeTerms", checked as boolean)}
                    required
                  />
                  <Label htmlFor="agreeTerms" className="text-sm font-normal">
                    <span className="text-orange-600">Kişisel Verilerin Korunması Aydınlatma</span> ve{" "}
                    <span className="text-orange-600">Açık Rıza</span> metnini okudum, kabul ediyorum.
                  </Label>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" onClick={prevStep} variant="outline" className="flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Önceki Adıma Dön
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700"
                  disabled={!formData.name || !formData.phone || !formData.agreeTerms}
                >
                  Talebi Gönder
                </Button>
              </div>
            </div>

            {/* Right side: Request Summary */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Talep Özeti</h3>
                <button className="text-orange-600 text-sm font-medium">Talebi Düzenle</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3">Cihaz Bilgileri</h4>
                  <div className="grid grid-cols-2 gap-y-3">
                    <div className="text-gray-600">Marka</div>
                    <div className="font-medium text-right">APPLE</div>
                    <div className="text-gray-600">Model</div>
                    <div className="font-medium text-right">{formData.model || "iPhone, iPhone 16"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Cihaz Sorunu</h4>
                  <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md">
                    <div className="font-medium">TEKNOFİX ORİJİNAL EKRAN DEĞİŞİMİ</div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                        <span className="text-orange-600 text-xs">i</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-orange-600 mb-2">
                    <div>KAMPANYA İNDİRİMİ</div>
                    <div>-₺700,00</div>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <div>TOPLAM</div>
                    <div>₺16.800,00</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 flex items-start mt-4">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-700">
                    Cihazınızın tamir işlemi tamamlanıp size teslim edildikten sonra ödemesi alınacaktır.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
