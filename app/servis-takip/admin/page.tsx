"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ServiceAdminDashboard from "@/components/service-tracking/service-admin-dashboard"
import ServiceTechnicianDashboard from "@/components/service-tracking/service-technician-dashboard"
import AdminDashboardLayout from "@/components/service-tracking/admin-dashboard-layout"

export default function ServiceAdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<"admin" | "technician" | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const handleLogin = (e: React.FormEvent, role: "admin" | "technician") => {
    e.preventDefault()
    setLoginError("")

    // Admin girişi kontrolü
    if (role === "admin") {
      if (username === "admin" && password === "123") {
        setIsLoggedIn(true)
        setUserRole("admin")
      } else {
        setLoginError("Hatalı kullanıcı adı veya şifre!")
      }
    }

    // Teknisyen girişi kontrolü
    if (role === "technician") {
      if (username === "baho" && password === "123") {
        setIsLoggedIn(true)
        setUserRole("technician")
      } else {
        setLoginError("Hatalı kullanıcı adı veya şifre!")
      }
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <Link
            href="/servis-takip"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Servis Takip Ana Sayfasına Dön
          </Link>
        </div>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Servis Yönetimi</CardTitle>
            <CardDescription>Servis yönetim paneline erişmek için giriş yapın.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="admin">Yönetici Girişi</TabsTrigger>
                <TabsTrigger value="technician">Teknisyen Girişi</TabsTrigger>
              </TabsList>

              <TabsContent value="admin">
                <form onSubmit={(e) => handleLogin(e, "admin")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-username">Kullanıcı Adı</Label>
                    <Input
                      id="admin-username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Şifre</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                  <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                    Yönetici Girişi
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="technician">
                <form onSubmit={(e) => handleLogin(e, "technician")} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tech-username">Teknisyen Kullanıcı Adı</Label>
                    <Input id="tech-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-password">Şifre</Label>
                    <Input
                      id="tech-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {loginError && <p className="text-sm text-red-500">{loginError}</p>}
                  <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                    Teknisyen Girişi
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Kullanıcı rolüne göre uygun dashboard'u göster
  return userRole === "admin" ? (
    <AdminDashboardLayout>
      <ServiceAdminDashboard />
    </AdminDashboardLayout>
  ) : (
    <ServiceTechnicianDashboard />
  )
}
