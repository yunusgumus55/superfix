import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, ShoppingBag, Wrench } from "lucide-react"
import PromotionPopup from "@/components/promotion-popup"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Banner */}
      <div className="bg-gray-300 py-2 text-center text-sm">
        <p>Türkiye genelinde hizmet - profesyonel ve güvenilir Apple tamiri. 🇹🇷</p>
      </div>

      {/* Promotion Popup */}
      <PromotionPopup />

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="container mx-auto px-4 py-12 md:py-24 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Bahar Kampanyası ile Superfix Bilişim'de</h1>
            <p className="text-base md:text-xl mb-6 md:mb-8">
              İster tamir ihtiyacınız olsun, ister yeni bir cihaz almak isteyin, çevre dostu ve cüzdanınıza uygun
              tekliflerimize göz atın.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto">Daha fazla bilgi</Button>
              <Button variant="outline" className="text-white border-white hover:bg-white/10 w-full sm:w-auto">
                Mağaza bul
              </Button>
            </div>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=1600&auto=format&fit=crop"
          alt="APPLE TAMİR SERVİSİ"
          width={1600}
          height={600}
          className="w-full h-[350px] md:h-[500px] object-cover"
          priority
        />
      </section>

      {/* Mobile Quick Actions */}
      <section className="py-6 md:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-4 gap-3">
            <Link href="/hizmetler" className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <Wrench className="h-6 w-6 text-red-500 mb-2" />
              <span className="text-xs text-center">Tamir Hizmetleri</span>
            </Link>
            <Link href="/sertifikali-urunler" className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-red-500 mb-2" />
              <span className="text-xs text-center">Sertifikalı Ürünler</span>
            </Link>
            <Link href="/tamir-talebi" className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <Phone className="h-6 w-6 text-red-500 mb-2" />
              <span className="text-xs text-center">Tamir Talebi</span>
            </Link>
            <Link href="/servis-takip" className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-red-500 mb-2"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <path d="M12 18v-6"></path>
                <path d="M8 18v-1"></path>
                <path d="M16 18v-3"></path>
              </svg>
              <span className="text-xs text-center">Servis Takip</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Ekran Tamiri</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Kırık veya çatlak iPhone ekranınızı aynı gün içinde orijinal parçalarla değiştiriyoruz.
              </p>
              <Link href="/hizmetler/ekran-tamiri" className="text-orange-500 font-medium text-sm md:text-base">
                Daha fazla bilgi →
              </Link>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Batarya Değişimi</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Cihazınızın pil ömrünü uzatın. Orijinal Apple bataryaları ile değişim hizmeti sunuyoruz.
              </p>
              <Link href="/hizmetler/batarya-degisimi" className="text-orange-500 font-medium text-sm md:text-base">
                Daha fazla bilgi →
              </Link>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-5 w-5 md:h-6 md:w-6 text-orange-500" />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Veri Kurtarma</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Bozulan veya hasar gören cihazınızdaki önemli verilerinizi kurtarıyoruz.
              </p>
              <Link href="/hizmetler/veri-kurtarma" className="text-orange-500 font-medium text-sm md:text-base">
                Daha fazla bilgi →
              </Link>
            </div>
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 md:h-6 md:w-6 text-orange-500"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M12 18v-6"></path>
                  <path d="M8 18v-1"></path>
                  <path d="M16 18v-3"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Servis Takip</h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Cihazınızın tamir durumunu anlık olarak takip edin. Servis numaranız ile sorgulama yapabilirsiniz.
              </p>
              <Link href="/servis-takip" className="text-orange-500 font-medium text-sm md:text-base">
                Daha fazla bilgi →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-8 md:py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center mb-4 justify-center md:justify-start">
                <h2 className="text-2xl md:text-3xl font-bold">Getmobil İş Ortaklığı</h2>
                <div className="mt-2 md:mt-0 md:ml-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full inline-block">
                  Resmi Ortaklık
                </div>
              </div>
              <p className="text-base md:text-lg mb-6">
                Superfix Bilişim ve Getmobil iş ortaklığı ile TSE Sertifikalı Yenilenmiş cihazlarda en iyi fiyat ve
                kalite garantisi sunuyoruz.
              </p>
              <Link href="/sertifikali-urunler">
                <Button className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
                  Sertifikalı Ürünleri İncele
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12 flex justify-center">
              <div className="relative w-full max-w-xs md:max-w-none">
                <div className="absolute -top-4 -left-4 bg-white p-2 rounded-lg shadow-md">
                  <Image
                    src="/images/getmobil-logo.png"
                    alt="Getmobil"
                    width={100}
                    height={25}
                    className="h-6 w-auto"
                  />
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop"
                  alt="Getmobil İş Ortaklığı"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-md">
                  <span className="font-bold text-sm md:text-base">Superfix Bilişim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Hero Section */}
      <section className="py-10 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Çevre Dostu Tamir Çözümleri</h2>
              <p className="text-base md:text-lg mb-6">
                Apple Tamir olarak, elektronik atıkları azaltmak ve çevreyi korumak için cihazlarınızı tamir ederek
                kullanım ömrünü uzatıyoruz.
              </p>
              <Button className="bg-gray-800 hover:bg-gray-700 w-full sm:w-auto">Tamir Talebi</Button>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <Image
                src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop"
                alt="Çevre dostu tamir"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile CTA */}
      <section className="py-8 bg-orange-500 md:hidden">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-white mb-4">Hemen Randevu Alın</h3>
          <Button size="lg" className="bg-white text-red-500 hover:bg-gray-100 w-full">
            <Phone className="h-5 w-5 mr-2" /> +90 535 016 55 55
          </Button>
        </div>
      </section>

      {/* Footer - Hidden on Mobile */}
      <footer className="bg-gray-800 text-white py-12 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Superfix Bilişim</h3>
              <p className="text-gray-400">
                Profesyonel Apple cihaz tamir hizmetleri sunan Türkiye'nin lider tamir atölyesi.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hizmetlerimiz</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/iphone-tamiri">iPhone Tamiri</Link>
                </li>
                <li>
                  <Link href="/ipad-tamiri">iPad Tamiri</Link>
                </li>
                <li>
                  <Link href="/macbook-tamiri">MacBook Tamiri</Link>
                </li>
                <li>
                  <Link href="/watch-tamiri">Apple Watch Tamiri</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Şirket</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hakkimizda">Hakkımızda</Link>
                </li>
                <li>
                  <Link href="/kariyer">Kariyer</Link>
                </li>
                <li>
                  <Link href="/iletisim">İletişim</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">İletişim</h3>
              <ul className="space-y-2 text-gray-400">
                <li>info@superfixbilisim.com</li>
                <li>+90 535 016 55 55</li>
                <li>İstanbul, Türkiye</li>
              </ul>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-white hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link href="#" className="text-white hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Superfix Bilişim. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
