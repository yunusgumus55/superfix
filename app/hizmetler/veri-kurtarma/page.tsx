import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle, Database, HardDrive, Lock, Phone } from "lucide-react"
import ServicePriceTable from "@/components/service-price-table"
import ServiceFAQ from "@/components/service-faq"

export default function DataRecoveryPage() {
  // Veri kurtarma için fiyat tablosu verileri
  const priceData = [
    { model: "Standart Veri Kurtarma", fiyat: "1500 TL'den başlayan", sure: "1-3 gün" },
    { model: "Acil Veri Kurtarma", fiyat: "2500 TL'den başlayan", sure: "24 saat" },
    { model: "Suya Düşmüş Cihaz", fiyat: "2000 TL'den başlayan", sure: "2-4 gün" },
    { model: "Yazılımsal Sorunlar", fiyat: "1000 TL'den başlayan", sure: "1-2 gün" },
    { model: "Donanımsal Sorunlar", fiyat: "2000 TL'den başlayan", sure: "2-5 gün" },
    { model: "Şifreli Cihazlar", fiyat: "2500 TL'den başlayan", sure: "3-7 gün" },
  ]

  // Veri kurtarma için SSS verileri
  const faqData = [
    {
      question: "Hangi tür veri kayıplarında kurtarma yapabiliyorsunuz?",
      answer:
        "Silinen fotoğraflar, videolar, mesajlar, rehber kayıtları, notlar, ses kayıtları, belgeler ve uygulamalardaki veriler dahil olmak üzere çeşitli veri türlerini kurtarabiliyoruz. Ayrıca suya düşme, düşürme veya yazılımsal sorunlar nedeniyle erişilemeyen cihazlardaki verileri de kurtarabiliyoruz.",
    },
    {
      question: "Veri kurtarma işlemi ne kadar sürer?",
      answer:
        "Veri kurtarma süresi, sorunun karmaşıklığına ve cihazın durumuna bağlı olarak değişir. Standart veri kurtarma işlemleri genellikle 1-3 gün sürerken, acil durumlarda 24 saat içinde sonuç alabiliyoruz. Donanımsal sorunlarda bu süre 2-5 güne kadar uzayabilir.",
    },
    {
      question: "Tüm verileri kurtarabiliyor musunuz?",
      answer:
        "Her durumda tüm verileri kurtarmak mümkün olmayabilir. Başarı oranı, cihazın hasar derecesine, verinin ne kadar süre önce silindiğine ve cihazın ne kadar kullanıldığına bağlıdır. Ön inceleme sonrası size kurtarılabilecek veriler hakkında detaylı bilgi veriyoruz.",
    },
    {
      question: "Veri kurtarma ücretleri nasıl belirleniyor?",
      answer:
        "Veri kurtarma ücretleri, sorunun karmaşıklığına, gerekli olan teknik işlemlere ve aciliyet durumuna göre belirlenir. Her durumda önce ücretsiz bir ön inceleme yapıyor ve size net bir fiyat teklifi sunuyoruz. Onayınız olmadan herhangi bir ücretli işlem yapmıyoruz.",
    },
    {
      question: "Kurtarılan verilerimin gizliliği nasıl sağlanıyor?",
      answer:
        "Veri gizliliğine son derece önem veriyoruz. Tüm teknisyenlerimiz gizlilik sözleşmesi imzalamıştır ve kurtarılan verileriniz şifreli sistemlerde saklanır. İşlem tamamlandıktan sonra verileriniz size teslim edilir ve sistemlerimizden tamamen silinir.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">iPhone Veri Kurtarma</h1>
            <p className="text-xl mb-8">
              Silinen, kaybolan veya erişilemeyen önemli verilerinizi profesyonel ekipmanlarımız ve uzman
              teknisyenlerimizle kurtarıyoruz. Fotoğraflar, mesajlar, rehber ve daha fazlası.
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
          src="https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1600&auto=format&fit=crop"
          alt="iPhone veri kurtarma"
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover"
          priority
        />
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Veri Kurtarma Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Silinen Verileri Kurtarma</h3>
              <p className="text-gray-600 mb-4">
                Yanlışlıkla silinen fotoğraflar, videolar, mesajlar ve diğer önemli verilerinizi kurtarıyoruz.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                <li>Fotoğraflar ve videolar</li>
                <li>Mesajlar ve rehber</li>
                <li>Notlar ve belgeler</li>
                <li>Uygulama verileri</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <HardDrive className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Hasarlı Cihazlardan Kurtarma</h3>
              <p className="text-gray-600 mb-4">
                Suya düşen, düşürülen veya fiziksel hasar gören cihazlardan veri kurtarma hizmeti.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                <li>Suya düşen cihazlar</li>
                <li>Ekranı kırık cihazlar</li>
                <li>Açılmayan cihazlar</li>
                <li>Donanımsal arızalar</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Şifreli Cihazlardan Kurtarma</h3>
              <p className="text-gray-600 mb-4">
                Şifresini unuttuğunuz veya erişim sorunu yaşadığınız cihazlardan veri kurtarma.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                <li>Şifre sorunları</li>
                <li>Apple ID kilidi</li>
                <li>Yazılımsal sorunlar</li>
                <li>Sistem arızaları</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6">Veri Güvenliğiniz Bizim İçin Önemli</h2>
              <p className="text-lg mb-6">
                Superfix Bilişim olarak, verilerinizin gizliliğine ve güvenliğine büyük önem veriyoruz. Veri kurtarma
                sürecinde:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Tüm teknisyenlerimiz gizlilik sözleşmesi imzalamıştır</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Verileriniz şifreli sistemlerde saklanır</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>İşlem tamamlandıktan sonra verileriniz sistemlerimizden tamamen silinir</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Kurtarılan verileriniz sadece sizinle paylaşılır</span>
                </li>
              </ul>
              <Button className="bg-red-500 hover:bg-red-600">Gizlilik Politikamız</Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop"
                alt="Veri güvenliği"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Veri Kurtarma Süreci</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Ücretsiz İnceleme</h3>
              <p className="text-gray-600">
                Cihazınızı detaylı bir şekilde inceliyor ve veri kurtarma olasılığını değerlendiriyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Fiyat Teklifi</h3>
              <p className="text-gray-600">
                İnceleme sonrası size detaylı bir rapor ve net bir fiyat teklifi sunuyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Veri Kurtarma</h3>
              <p className="text-gray-600">
                Onayınız sonrası özel ekipmanlarımız ve yazılımlarımızla veri kurtarma işlemini gerçekleştiriyoruz.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-red-500">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Güvenli Teslim</h3>
              <p className="text-gray-600">
                Kurtarılan verilerinizi şifreli bir harici disk veya bulut hizmeti aracılığıyla güvenle size teslim
                ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Price Table Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Veri Kurtarma Fiyatları</h2>
          <ServicePriceTable data={priceData} />
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">
              * Fiyatlar başlangıç fiyatlarıdır. Kesin fiyat, ücretsiz inceleme sonrası belirlenecektir.
            </p>
            <Button className="bg-red-500 hover:bg-red-600">Ücretsiz İnceleme Randevusu</Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Sık Sorulan Sorular</h2>
          <ServiceFAQ data={faqData} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Önemli verilerinizi kaybettiniz mi?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Panik yapmayın! Profesyonel ekibimiz verilerinizi kurtarmak için burada. Hemen ücretsiz inceleme için
            randevu alın.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-red-500 hover:bg-red-600">
              Ücretsiz İnceleme Randevusu
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
