import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Phone, ShieldCheck, Wrench } from "lucide-react"
import ServiceFAQ from "@/components/service-faq"

export default function ScreenRepairPage() {
  // Ekran tamiri için fiyat tablosu verileri
  const priceData = [
    { model: "iPhone 14 Pro Max", fiyat: "3200 TL", sure: "1-2 saat" },
    { model: "iPhone 14 Pro", fiyat: "2900 TL", sure: "1-2 saat" },
    { model: "iPhone 14 Plus", fiyat: "2700 TL", sure: "1-2 saat" },
    { model: "iPhone 14", fiyat: "2500 TL", sure: "1-2 saat" },
    { model: "iPhone 13 Pro Max", fiyat: "2800 TL", sure: "1-2 saat" },
    { model: "iPhone 13 Pro", fiyat: "2600 TL", sure: "1-2 saat" },
    { model: "iPhone 13", fiyat: "2400 TL", sure: "1-2 saat" },
    { model: "iPhone 12 Pro Max", fiyat: "2500 TL", sure: "1-2 saat" },
    { model: "iPhone 12 Pro", fiyat: "2300 TL", sure: "1-2 saat" },
    { model: "iPhone 12", fiyat: "2100 TL", sure: "1-2 saat" },
    { model: "iPhone 11 Pro Max", fiyat: "2200 TL", sure: "1-2 saat" },
    { model: "iPhone 11 Pro", fiyat: "2000 TL", sure: "1-2 saat" },
    { model: "iPhone 11", fiyat: "1800 TL", sure: "1-2 saat" },
    { model: "iPhone XS Max", fiyat: "1900 TL", sure: "1-2 saat" },
    { model: "iPhone XS", fiyat: "1700 TL", sure: "1-2 saat" },
    { model: "iPhone XR", fiyat: "1600 TL", sure: "1-2 saat" },
    { model: "iPhone X", fiyat: "1500 TL", sure: "1-2 saat" },
  ]

  // Ekran tamiri için SSS verileri
  const faqData = [
    {
      question: "iPhone ekran değişimi ne kadar sürer?",
      answer:
        "iPhone ekran değişimi genellikle 1-2 saat içinde tamamlanır. Yoğunluğa bağlı olarak bu süre değişebilir, ancak çoğu durumda aynı gün içinde cihazınızı teslim edebiliyoruz.",
    },
    {
      question: "Orijinal Apple ekranı mı kullanıyorsunuz?",
      answer:
        "Evet, Superfix Bilişim olarak orijinal Apple parçaları veya yüksek kaliteli OEM (Orijinal Ekipman Üreticisi) parçaları kullanıyoruz. Bu, cihazınızın performansının ve dokunmatik hassasiyetinin orijinal haliyle aynı kalmasını sağlar.",
    },
    {
      question: "Ekran değişimi sonrası garanti sağlıyor musunuz?",
      answer:
        "Evet, tüm ekran değişimlerimiz 6 ay garantilidir. Bu süre içinde ekranda herhangi bir üretim hatası veya işçilik sorunu yaşarsanız, ücretsiz olarak tekrar değiştiriyoruz.",
    },
    {
      question: "Ekranım kırıldı ama dokunmatik çalışıyor, yine de değiştirmeli miyim?",
      answer:
        "Ekranınız kırık olsa bile dokunmatik çalışıyorsa, güvenlik açısından değiştirilmesini öneririz. Kırık ekran zamanla daha fazla hasar görebilir, parmaklarınızı kesebilir ve cihazın içine toz/nem girmesine neden olabilir.",
    },
    {
      question: "Ekran değişimi sırasında verilerim silinir mi?",
      answer:
        "Hayır, ekran değişimi sırasında cihazınızdaki veriler silinmez veya etkilenmez. Yine de her zaman önemli verilerinizi yedeklemenizi öneririz.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">iPhone Ekran Tamiri</h1>
            <p className="text-xl mb-8">
              Kırık veya çatlak iPhone ekranınızı aynı gün içinde orijinal parçalarla değiştiriyoruz. Profesyonel
              ekibimiz ve modern ekipmanlarımızla cihazınızı yeni gibi yapıyoruz.
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
          src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=1600&auto=format&fit=crop"
          alt="iPhone ekran tamiri"
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover"
          priority
        />
      </section>

      {/* Advantages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Neden Superfix Bilişim'i Tercih Etmelisiniz?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Orijinal Parçalar</h3>
              <p className="text-gray-600">
                Sadece orijinal Apple parçaları veya yüksek kaliteli OEM parçaları kullanıyoruz.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hızlı Servis</h3>
              <p className="text-gray-600">Çoğu ekran tamiri işlemini 1-2 saat içinde tamamlıyoruz.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Uzman Teknisyenler</h3>
              <p className="text-gray-600">Tüm teknisyenlerimiz Apple cihazları konusunda uzman ve sertifikalıdır.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">6 Ay Garanti</h3>
              <p className="text-gray-600">Tüm ekran değişimlerimiz 6 ay garantilidir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Ekran Değişim Süreci</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Teşhis</h3>
              <p className="text-gray-600">
                Cihazınızı detaylı bir şekilde inceliyor ve hasar durumunu tespit ediyoruz. Size uygun çözüm ve fiyat
                teklifi sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Tamir</h3>
              <p className="text-gray-600">
                Uzman teknisyenlerimiz, özel ekipmanlar kullanarak hasarlı ekranı çıkarıp yerine orijinal yeni ekran
                takıyor.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Test ve Teslim</h3>
              <p className="text-gray-600">
                Değişim sonrası cihazınızı kapsamlı testlerden geçiriyor ve sorunsuz çalıştığından emin olduktan sonra
                teslim ediyoruz.
              </p>
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
          <h2 className="text-3xl font-bold mb-6">Ekranınız mı kırıldı?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Hemen profesyonel ekibimizle iletişime geçin ve aynı gün içinde cihazınızı yeni gibi yapın.
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
