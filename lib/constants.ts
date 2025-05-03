// Şirket bilgileri
export const COMPANY = {
  name: "Superfix Bilişim",
  phone: "+90 535 016 55 55",
  email: "info@superfixbilisim.com",
  address: "İstanbul, Türkiye",
  socialMedia: {
    facebook: "https://facebook.com/superfixbilisim",
    instagram: "https://instagram.com/superfixbilisim",
    twitter: "https://twitter.com/superfixbilisim",
  },
}

// Tamir hizmetleri kategorileri
export const SERVICE_CATEGORIES = [
  {
    id: "screen-repairs",
    name: "Ekran ve Cam Değişimleri",
    services: ["ekran-degisimi", "on-cam-degisimi", "arka-cam-degisimi", "kamera-cami-degisimi"],
  },
  {
    id: "camera-repairs",
    name: "Kamera Değişimleri",
    services: ["on-kamera-degisimi", "arka-kamera-degisimi", "truedepth-kamera-degisimi"],
  },
  {
    id: "battery-repairs",
    name: "Batarya ve Güç Sorunları",
    services: ["batarya-degisimi", "sarj-soketi-degisimi", "acilmiyor-sorunu"],
  },
  {
    id: "button-sensor-repairs",
    name: "Tuş ve Sensör Değişimleri",
    services: [
      "ac-kapat-tusu-ve-flas-degisimi",
      "ses-ve-sessiz-alma-tusu-degisimi",
      "proximity-isik-sensoru-degisimi",
      "lidar-sensor-degisimi",
      "face-id-onarimi",
      "nfc-degisimi",
    ],
  },
  {
    id: "sound-vibration-repairs",
    name: "Ses ve Titreşim Sorunları",
    services: ["hoparlor-degisimi", "ic-kulaklik-degisimi", "titresim-motoru-degisimi"],
  },
  {
    id: "other-repairs",
    name: "Diğer Tamir Hizmetleri",
    services: [
      "kasa-degisimi",
      "anakart-onarimi",
      "veri-kurtarma",
      "sivi-temas",
      "detayli-genel-temizlik",
      "diger-sorunlar",
    ],
  },
]

// iPhone modelleri
export const IPHONE_SERIES = [
  {
    series: "iPhone 16 Serisi",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484bce71?q=80&w=600&auto=format&fit=crop",
    models: [
      { name: "iPhone 16 Pro Max", slug: "iphone-16-pro-max" },
      { name: "iPhone 16 Pro", slug: "iphone-16-pro" },
      { name: "iPhone 16 Plus", slug: "iphone-16-plus" },
      { name: "iPhone 16", slug: "iphone-16" },
    ],
  },
  {
    series: "iPhone 15 Serisi",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=600&auto=format&fit=crop",
    models: [
      { name: "iPhone 15 Pro Max", slug: "iphone-15-pro-max" },
      { name: "iPhone 15 Pro", slug: "iphone-15-pro" },
      { name: "iPhone 15 Plus", slug: "iphone-15-plus" },
      { name: "iPhone 15", slug: "iphone-15" },
    ],
  },
  {
    series: "iPhone 14 Serisi",
    image: "https://images.unsplash.com/photo-1663499482523-1c0c1bae9649?q=80&w=600&auto=format&fit=crop",
    models: [
      { name: "iPhone 14 Pro Max", slug: "iphone-14-pro-max" },
      { name: "iPhone 14 Pro", slug: "iphone-14-pro" },
      { name: "iPhone 14 Plus", slug: "iphone-14-plus" },
      { name: "iPhone 14", slug: "iphone-14" },
    ],
  },
  // Diğer seriler buraya eklenebilir
]
