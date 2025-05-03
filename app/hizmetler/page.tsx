import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Battery, Database, Phone, Shield, Smartphone, Wrench } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: <Smartphone className="h-8 w-8 text-red-500" />,
      title: "Ekran Tamiri",
      description: "Kırık veya çatlak iPhone ekranınızı aynı gün içinde orijinal parçalarla değiştiriyoruz.",
      link: "/hizmetler/ekran-tamiri",
    },
    {
      icon: <Battery className="h-8 w-8 text-red-500" />,
      title: "Batarya Değişimi",
      description: "iPhone'unuzun pil ömrünü uzatın. Orijinal Apple bataryaları ile profesyonel değişim hizmeti.",
      link: "/hizmetler/batarya-degisimi",
    },
    {
      icon: <Database className="h-8 w-8 text-red-500" />,
      title: "Veri Kurtarma",
      description: "Silinen, kaybolan veya erişilemeyen önemli verilerinizi profesyonel ekipmanlarımızla kurtarıyoruz.",
      link: "/hizmetler/veri-kurtarma",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Su Hasarı Tamiri",
      description: "Suya düşen iPhone'unuzu kurtarıyoruz. Hızlı müdahale ile veri kaybını önlüyoruz.",
      link: "/hizmetler/su-hasari-tamiri",
    },
    {
      icon: <Wrench className="h-8 w-8 text-red-500" />,
      title: "Anakart Tamiri",
      description: "Açılmayan veya donma sorunu yaşayan cihazınızın anakart tamirini yapıyoruz.",
      link: "/hizmetler/anakart-tamiri",
    },
    {
      icon: <Phone className="h-8 w-8 text-red-500" />,
      title: "Hoparlör ve Mikrofon Tamiri",
      description: "Ses sorunu yaşayan cihazınızın hoparlör ve mikrofon değişimini gerçekleştiriyoruz.",
      link: "/hizmetler/hoparlor-mikrofon-tamiri",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div className="container mx-auto px-4 py-20 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Superfix Bilişim Tamir Hizmetlerimiz</h1>
            <p className="text-xl mb-8">
              Profesyonel ekibimiz ve orijinal parçalarımızla tüm Apple cihazlarınız için kapsamlı tamir hizmetleri
              sunuyoruz.
            </p>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1581993192873-bf5f4b27a2d7?q=80&w=1600&auto=format&fit=crop"
          alt="Apple tamir hizmetleri"
          width={1600}
          height={600}
          className="w-full h-[500px] object-cover"
          priority
        />
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Tamir Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link} className="text-red-500 font-medium flex items-center hover:text-red-600">
                  Daha fazla bilgi <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl font-bold mb-6">Neden Superfix Bilişim'i Tercih Etmelisiniz?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-red-500 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Orijinal Parçalar</h3>
                    <p className="text-gray-600">
                      Sadece orijinal Apple parçaları veya yüksek kaliteli OEM parçaları kullanıyoruz.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-red-500 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Uzman Teknisyenler</h3>
                    <p className="text-gray-600">
                      Tüm teknisyenlerimiz Apple cihazları konusunda uzman ve sertifikalıdır.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-red-500 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Hızlı Servis</h3>
                    <p className="text-gray-600">Çoğu tamir işlemini aynı gün içinde tamamlıyoruz.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="text-red-500 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Garanti</h3>
                    <p className="text-gray-600">Tüm tamir işlemlerimiz 6 ay garantilidir.</p>
                  </div>
                </li>
              </ul>
              <Button className="mt-6 bg-red-500 hover:bg-red-600">Hemen Randevu Al</Button>
            </div>
            <div className="md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?q=80&w=600&auto=format&fit=crop"
                alt="Neden bizi tercih etmelisiniz"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Apple cihazınızla ilgili sorun mu yaşıyorsunuz?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Profesyonel ekibimiz tüm Apple cihazlarınız için çözüm sunuyor. Hemen randevu alın veya bizi arayın.
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
