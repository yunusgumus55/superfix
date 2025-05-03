"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Bell, Mail, MessageSquare, Save } from "lucide-react"

export default function NotificationSettings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("sms")
  const [settings, setSettings] = useState({
    sms: {
      enabled: true,
      statusUpdates: true,
      completionAlert: true,
      readyForPickup: true,
      estimatedTimeChanges: true,
      customMessage: "",
    },
    email: {
      enabled: true,
      statusUpdates: true,
      completionAlert: true,
      readyForPickup: true,
      estimatedTimeChanges: true,
      dailySummary: false,
      customMessage: "",
    },
  })

  const handleSwitchChange = (tab: string, field: string, checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: checked,
      },
    }))
  }

  const handleInputChange = (tab: string, field: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value,
      },
    }))
  }

  const handleSaveSettings = () => {
    // Gerçek uygulamada burada API çağrısı yapılır
    toast({
      title: "Ayarlar kaydedildi",
      description: "Bildirim ayarlarınız başarıyla güncellendi.",
    })
  }

  const handleTestNotification = (type: string) => {
    // Gerçek uygulamada burada test bildirimi gönderilir
    toast({
      title: "Test bildirimi gönderildi",
      description: `Test ${type === "sms" ? "SMS" : "e-posta"} bildirimi gönderildi.`,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Bildirim Ayarları
        </CardTitle>
        <CardDescription>Servis durumu bildirimleri için tercihlerinizi yönetin</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sms" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="sms" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              SMS Bildirimleri
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              E-posta Bildirimleri
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sms" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">SMS Bildirimleri</h3>
                <p className="text-sm text-muted-foreground">Servis durumu değişikliklerinde SMS bildirimleri alın</p>
              </div>
              <Switch
                checked={settings.sms.enabled}
                onCheckedChange={(checked) => handleSwitchChange("sms", "enabled", checked)}
              />
            </div>

            {settings.sms.enabled && (
              <>
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-status">Durum Güncellemeleri</Label>
                      <p className="text-xs text-muted-foreground">Servis durumu her değiştiğinde bildirim alın</p>
                    </div>
                    <Switch
                      id="sms-status"
                      checked={settings.sms.statusUpdates}
                      onCheckedChange={(checked) => handleSwitchChange("sms", "statusUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-completion">Tamamlanma Bildirimi</Label>
                      <p className="text-xs text-muted-foreground">Servis tamamlandığında bildirim alın</p>
                    </div>
                    <Switch
                      id="sms-completion"
                      checked={settings.sms.completionAlert}
                      onCheckedChange={(checked) => handleSwitchChange("sms", "completionAlert", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-pickup">Teslimata Hazır Bildirimi</Label>
                      <p className="text-xs text-muted-foreground">Cihazınız teslimata hazır olduğunda bildirim alın</p>
                    </div>
                    <Switch
                      id="sms-pickup"
                      checked={settings.sms.readyForPickup}
                      onCheckedChange={(checked) => handleSwitchChange("sms", "readyForPickup", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sms-time">Tahmini Süre Değişiklikleri</Label>
                      <p className="text-xs text-muted-foreground">
                        Tahmini tamamlanma süresi değiştiğinde bildirim alın
                      </p>
                    </div>
                    <Switch
                      id="sms-time"
                      checked={settings.sms.estimatedTimeChanges}
                      onCheckedChange={(checked) => handleSwitchChange("sms", "estimatedTimeChanges", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <Label htmlFor="sms-custom">Özel SMS Mesajı (Opsiyonel)</Label>
                  <Textarea
                    id="sms-custom"
                    placeholder="Servis bildirimleri için özel bir mesaj ekleyin"
                    value={settings.sms.customMessage}
                    onChange={(e) => handleInputChange("sms", "customMessage", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Bu mesaj, gönderilen tüm SMS bildirimlerinin sonuna eklenecektir.
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => handleTestNotification("sms")}>
                    Test SMS'i Gönder
                  </Button>
                  <Button onClick={handleSaveSettings} className="bg-red-500 hover:bg-red-600">
                    <Save className="mr-2 h-4 w-4" />
                    Ayarları Kaydet
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="email" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">E-posta Bildirimleri</h3>
                <p className="text-sm text-muted-foreground">
                  Servis durumu değişikliklerinde e-posta bildirimleri alın
                </p>
              </div>
              <Switch
                checked={settings.email.enabled}
                onCheckedChange={(checked) => handleSwitchChange("email", "enabled", checked)}
              />
            </div>

            {settings.email.enabled && (
              <>
                <div className="space-y-4 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-status">Durum Güncellemeleri</Label>
                      <p className="text-xs text-muted-foreground">Servis durumu her değiştiğinde bildirim alın</p>
                    </div>
                    <Switch
                      id="email-status"
                      checked={settings.email.statusUpdates}
                      onCheckedChange={(checked) => handleSwitchChange("email", "statusUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-completion">Tamamlanma Bildirimi</Label>
                      <p className="text-xs text-muted-foreground">Servis tamamlandığında bildirim alın</p>
                    </div>
                    <Switch
                      id="email-completion"
                      checked={settings.email.completionAlert}
                      onCheckedChange={(checked) => handleSwitchChange("email", "completionAlert", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-pickup">Teslimata Hazır Bildirimi</Label>
                      <p className="text-xs text-muted-foreground">Cihazınız teslimata hazır olduğunda bildirim alın</p>
                    </div>
                    <Switch
                      id="email-pickup"
                      checked={settings.email.readyForPickup}
                      onCheckedChange={(checked) => handleSwitchChange("email", "readyForPickup", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-time">Tahmini Süre Değişiklikleri</Label>
                      <p className="text-xs text-muted-foreground">
                        Tahmini tamamlanma süresi değiştiğinde bildirim alın
                      </p>
                    </div>
                    <Switch
                      id="email-time"
                      checked={settings.email.estimatedTimeChanges}
                      onCheckedChange={(checked) => handleSwitchChange("email", "estimatedTimeChanges", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-summary">Günlük Özet</Label>
                      <p className="text-xs text-muted-foreground">
                        Aktif servisleriniz hakkında günlük özet e-postası alın
                      </p>
                    </div>
                    <Switch
                      id="email-summary"
                      checked={settings.email.dailySummary}
                      onCheckedChange={(checked) => handleSwitchChange("email", "dailySummary", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t pt-4">
                  <Label htmlFor="email-custom">Özel E-posta Mesajı (Opsiyonel)</Label>
                  <Textarea
                    id="email-custom"
                    placeholder="Servis bildirimleri için özel bir mesaj ekleyin"
                    value={settings.email.customMessage}
                    onChange={(e) => handleInputChange("email", "customMessage", e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Bu mesaj, gönderilen tüm e-posta bildirimlerinin içeriğine eklenecektir.
                  </p>
                </div>

                <div className="flex justify-between pt-2">
                  <Button variant="outline" onClick={() => handleTestNotification("email")}>
                    Test E-postası Gönder
                  </Button>
                  <Button onClick={handleSaveSettings} className="bg-red-500 hover:bg-red-600">
                    <Save className="mr-2 h-4 w-4" />
                    Ayarları Kaydet
                  </Button>
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
