"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Users,
  Wrench,
  Package,
  Warehouse,
  ShoppingBag,
  FileText,
  CreditCard,
  Landmark,
  DollarSign,
  FileCheck,
  Calendar,
  UserCog,
  PieChart,
  Settings,
  LifeBuoy,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
  onClick?: () => void
}

const SidebarItem = ({ icon, label, href, active, onClick }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
        active ? "bg-indigo-950 text-white" : "text-gray-200 hover:bg-indigo-950/50 hover:text-white",
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden bg-white"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-[#0f1535] transition-transform duration-300 ease-in-out md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center border-b border-indigo-950 px-6">
          <h2 className="text-xl font-bold text-white">NEGRUM</h2>
        </div>
        <nav className="space-y-1 px-3 py-4">
          <SidebarItem
            icon={<BarChart3 className="h-5 w-5" />}
            label="Kontrol Ekranı"
            href="/servis-takip/admin/dashboard"
            active={pathname === "/servis-takip/admin/dashboard"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Users className="h-5 w-5" />}
            label="Cari Hesaplar"
            href="/servis-takip/admin/accounts"
            active={pathname === "/servis-takip/admin/accounts"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Wrench className="h-5 w-5" />}
            label="Servisler"
            href="/servis-takip/admin"
            active={pathname === "/servis-takip/admin"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Package className="h-5 w-5" />}
            label="Stok Yönetimi"
            href="/servis-takip/admin/stock"
            active={pathname === "/servis-takip/admin/stock"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Warehouse className="h-5 w-5" />}
            label="Depo Yönetimi"
            href="/servis-takip/admin/warehouse"
            active={pathname === "/servis-takip/admin/warehouse"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<ShoppingBag className="h-5 w-5" />}
            label="Perakende"
            href="/servis-takip/admin/retail"
            active={pathname === "/servis-takip/admin/retail"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<FileText className="h-5 w-5" />}
            label="Faturalar"
            href="/servis-takip/admin/invoices"
            active={pathname === "/servis-takip/admin/invoices"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<CreditCard className="h-5 w-5" />}
            label="Online Ödeme"
            href="/servis-takip/admin/payments"
            active={pathname === "/servis-takip/admin/payments"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Landmark className="h-5 w-5" />}
            label="Kasa & Banka"
            href="/servis-takip/admin/finance"
            active={pathname === "/servis-takip/admin/finance"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<DollarSign className="h-5 w-5" />}
            label="Masraf Merkezi"
            href="/servis-takip/admin/expenses"
            active={pathname === "/servis-takip/admin/expenses"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<FileCheck className="h-5 w-5" />}
            label="Teklifler"
            href="/servis-takip/admin/quotes"
            active={pathname === "/servis-takip/admin/quotes"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Calendar className="h-5 w-5" />}
            label="İş Planı"
            href="/servis-takip/admin/schedule"
            active={pathname === "/servis-takip/admin/schedule"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<UserCog className="h-5 w-5" />}
            label="Personel Yönetimi"
            href="/servis-takip/admin/staff"
            active={pathname === "/servis-takip/admin/staff"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<PieChart className="h-5 w-5" />}
            label="Raporlar"
            href="/servis-takip/admin/reports"
            active={pathname === "/servis-takip/admin/reports"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<Settings className="h-5 w-5" />}
            label="Ayarlar"
            href="/servis-takip/admin/settings"
            active={pathname === "/servis-takip/admin/settings"}
            onClick={closeSidebar}
          />
          <SidebarItem
            icon={<LifeBuoy className="h-5 w-5" />}
            label="Destek Sistemi"
            href="/servis-takip/admin/support"
            active={pathname === "/servis-takip/admin/support"}
            onClick={closeSidebar}
          />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
