// Bu dosya veritabanı şemasını tanımlar
// Gerçek uygulamada Prisma, Drizzle veya başka bir ORM kullanılabilir

export interface ServiceRequest {
  id: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  deviceType: string
  deviceModel: string
  deviceColor?: string
  deviceSerial?: string
  devicePassword?: string
  issueDescription: string
  accessories: {
    charger: boolean
    case: boolean
    screenProtector: boolean
    box: boolean
    other: boolean
  }
  otherAccessories?: string
  serviceType: "in-store" | "on-site"
  estimatedCost?: number
  notes?: string
  status: ServiceStatus
  entryDate: Date
  estimatedCompletionDate?: Date
  completionDate?: Date
  technicianId?: string
  dealerId?: string
  createdAt: Date
  updatedAt: Date
}

export interface ServiceHistory {
  id: string
  serviceRequestId: string
  status: ServiceStatus
  note?: string
  technicianId?: string
  createdAt: Date
}

export interface Payment {
  id: string
  serviceRequestId: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  date: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Technician {
  id: string
  name: string
  email: string
  phone?: string
  role: TechnicianRole
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  username: string
  password: string // Gerçek uygulamada hash'lenmiş olmalı
  role: UserRole
  dealerId?: string
  createdAt: Date
  updatedAt: Date
}

export type ServiceStatus =
  | "Beklemede"
  | "Teslim Alındı"
  | "Arıza Tespiti Yapıldı"
  | "Onarım Sürecinde"
  | "Parça Bekleniyor"
  | "Tamamlandı"
  | "Teslim Edildi"
  | "İptal Edildi"

export type PaymentMethod = "Nakit" | "Kredi Kartı" | "Havale/EFT" | "Diğer"

export type PaymentStatus = "Beklemede" | "Tamamlandı" | "İptal Edildi"

export type TechnicianRole = "Teknisyen" | "Kıdemli Teknisyen" | "Süpervizör"

export type UserRole = "Admin" | "Teknisyen" | "Resepsiyonist" | "Bayi"
