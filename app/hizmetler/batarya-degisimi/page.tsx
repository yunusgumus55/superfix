import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Battery, CheckCircle, Clock, Phone, ShieldCheck } from "lucide-react"
import ServiceFAQ from "@/components/service-faq"

export default function BatteryReplacementPage() {
  // Batarya değişimi için fiyat tablosu verileri
  const priceData = [
    { model: "iPhone 14 Pro Max", fiyat: "1800 TL", sure: "1 saat" },
    { model: "iPhone 14 Pro", fiyat: "1700 TL", sure: "1 saat" },
    { model: "iPhone 14 Plus", fiyat: "1600 TL", sure: "1 saat" },
    { model: "iPhone 14", fiyat: "1500 TL", sure: "1 saat" },
    { model: "iPhone 13 Pro Max", fiyat: "1600 TL", sure: "1 saat" },
    { model: "iPhone 13 Pro", fiyat: "1500 TL", sure: "1 saat" },
    { model: "iPhone 13", fiyat: "1400 TL", sure: "1 saat" },
    { model: "iPhone 12 Pro Max", fiyat: "1500 TL", sure: "1 saat" },
    { model: "iPhone 12 Pro", fiyat: "1400 TL", sure: "1 saat" },
    { model: "iPhone 12", fiyat: "1300 TL", sure: "1 saat" },
    { model: "iPhone 11 Pro Max", fiyat: "1400 TL", sure: "1 saat" },
    { model: "iPhone 11 Pro", fiyat: "1300 TL", sure: "1 saat" },
    { model: "iPhone 11", fiyat: "1200 TL", sure: "1 saat" },
    { model: "iPhone XS Max", fiyat: "1300 TL", sure: "1 saat" },
    { model: "iPhone XS", fiyat: "1200 TL", sure: "1 saat" },
    { model: "iPhone XR", fiyat: "1100 TL", sure: "1 saat" },
    { model: "iPhone X", fiyat: "1100 TL", sure: "1 saat" },
  ]

  // Batarya değişimi için SSS verileri
  const faqData = [
    {
      question: "iPhone batarya değişimi ne kadar sürer?",
      answer:
        "iPhone batarya değişimi genellikle 1 saat içinde tamamlanır. Yoğunluğa bağlı olarak bu süre değişebilir, ancak çoğu durumda aynı gün içinde cihazınızı teslim edebiliyoruz.",
    },
    {
      question: "Orijinal Apple bataryası mı kullanıyorsunuz?",
      answer:
        "Evet, Superfix Bilişim olarak orijinal Apple bataryaları veya yüksek kaliteli OEM (Orijinal Ekipman Üreticisi) bataryaları kullanıyoruz. Bu, cihazınızın pil ömrünün ve performansının optimum seviyede olmasını sağlar.",
    },
    {
      question: "Bataryamın değişmesi gerektiğini nasıl anlarım?",
      answer:
        "Bataryanızın değişmesi gerektiğini gösteren belirtiler: Hızlı şarj tükenmesi, ani kapanmalar, şişme, aşırı ısınma ve iOS'un pil sağlığı bölümünde %80'in altında maksimum kapasite göstermesi. Bu belirtilerden herhangi birini fark ederseniz, batarya değişimi için bize başvurabilirsiniz.",
    },
    {
      question: "Batarya değişimi sonrası garanti sağlıyor musunuz?",
      answer:
        "Evet, tüm batarya değişimlerimiz 6 ay garantilidir. Bu süre içinde bataryada herhangi bir üretim hatası veya performans sorunu yaşarsanız, ücretsiz olarak tekrar değiştiriyoruz.",
    },
    {
      question: "Batarya değişimi sırasında verilerim silinir mi?",
      answer:
        "Hayır, batarya değişimi sırasında cihazınızdaki veriler silinmez veya etkilenmez. Yine de her zaman önemli verilerinizi yedeklemenizi öneririz.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">iPhone Batarya Değişimi</h1>
            <p className="text-xl mb-8">
              iPhone'unuzun pil ömrünü uzatın. Orijinal Apple bataryaları ile profesyonel değişim hizmeti sunuyoruz.
              Cihazınızın performansını yeniden keşfedin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-red-500 hover:bg-red-600">
                Hemen Randevu Al
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" /> Bizi Arayın
              </Button>
            </div>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1585338447937-7082f8fc763d?q=80&w=1600&auto=format&fit=crop"
          alt="iPhone batarya değişimi"
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover"
          priority
        />
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Neden Bataryanızı Değiştirmelisiniz?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Battery className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Uzun Pil Ömrü</h3>
              <p className="text-gray-600">Yeni batarya ile cihazınız tek şarjla çok daha uzun süre dayanır.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hızlı Performans</h3>
              <p className="text-gray-600">
                Yıpranan batarya cihaz performansını düşürür. Yeni batarya ile performans artar.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Güvenlik</h3>
              <p className="text-gray-600">
                Eski ve şişmiş bataryalar güvenlik riski oluşturur. Yeni batarya ile güvende olun.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">6 Ay Garanti</h3>
              <p className="text-gray-600">Tüm batarya değişimlerimiz 6 ay garantilidir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Battery Health Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6">Batarya Sağlığınızı Kontrol Edin</h2>
              <p className="text-lg mb-6">iPhone'unuzun batarya sağlığını kontrol etmek için:</p>
              <ol className="list-decimal pl-5 space-y-3 mb-6">
                <li>Ayarlar uygulamasını açın</li>
                <li>Batarya seçeneğine dokunun</li>
                <li>Batarya Sağlığı'nı seçin</li>
                <li>Maksimum Kapasite yüzdesini kontrol edin</li>
              </ol>
              <p className="text-lg mb-6">Maksimum kapasite %80'in altındaysa, bataryanızın değiştirilmesi önerilir.</p>
              <Button className="bg-red-500 hover:bg-red-600">Ücretsiz Batarya Testi</Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop"
                alt="iPhone batarya sağlığı kontrolü"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Sık Sorulan Sorular</h2>
          <ServiceFAQ data={faqData} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">iPhone'unuz hızlı şarj mı tüketiyor?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hemen profesyonel ekibimizle iletişime geçin ve aynı gün içinde bataryanızı yenileyin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-red-500 hover:bg-red-600">
              Online Randevu Al
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" /> +90 (212) 123 4567
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
