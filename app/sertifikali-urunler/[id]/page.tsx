import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ChevronRight, Home, ShoppingCart, Star } from "lucide-react"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // Bu örnek için sabit ürün bilgisi kullanıyoruz
  // Gerçek uygulamada bu bilgiler bir API'den veya veritabanından alınabilir
  const product = {
    id: params.id,
    name: "Apple iPhone 11",
    price: "14.444 TL",
    originalPrice: "16.999 TL",
    storage: "64 GB",
    color: "Siyah",
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=600&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 156,
    description:
      "Apple iPhone 11, A13 Bionic çip, 6.1 inç Liquid Retina HD ekran, çift kamera sistemi ve uzun pil ömrü ile günlük kullanım için mükemmel bir seçimdir. Sertifikalı yenilenmiş bu cihaz, orijinal ürünün tüm özelliklerine sahiptir ve 12 ay garantilidir.",
    features: [
      "6.1 inç Liquid Retina HD ekran",
      "A13 Bionic çip",
      "12MP çift kamera sistemi (Ultra Geniş ve Geniş)",
      "12MP TrueDepth ön kamera",
      "Face ID ile güvenli kimlik doğrulama",
      "4K video kayıt özelliği",
      "Su ve toz direnci (IP68)",
      "Kablosuz şarj desteği",
    ],
    batteryHealth: "92%",
    condition: "Çok iyi",
    accessories: ["Şarj adaptörü", "Lightning kablosu", "Kullanım kılavuzu"],
  }

  // Benzer ürünler
  const similarProducts = [
    {
      id: 3,
      name: "Apple iPhone 12",
      price: "24.499 TL",
      image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Apple iPhone SE 2020",
      price: "7.799 TL",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=300&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Apple iPhone 13 Pro",
      price: "29.999 TL",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=300&auto=format&fit=crop",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Breadcrumb - Hidden on Mobile */}
      <div className="bg-gray-100 py-3 border-b hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="flex items-center hover:text-red-500">
              <Home className="h-4 w-4 mr-1" />
              Ana Sayfa
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/sertifikali-urunler" className="hover:text-red-500">
              Sertifikalı Ürünler
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Mobile Breadcrumb */}
      <div className="bg-white py-2 border-b md:hidden">
        <div className="container mx-auto px-4">
          <Link href="/sertifikali-urunler" className="flex items-center text-sm text-gray-600">
            <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
            <span>Sertifikalı Ürünler</span>
          </Link>
        </div>
      </div>

      {/* Partnership Info */}
      <div className="bg-red-50 py-2 md:py-3 border-b border-red-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <span className="text-xs md:text-sm text-red-600 font-medium mr-2">
              Getmobil ve Superfix Bilişim Resmi İş Ortaklığı ile Güvenceli Alışveriş
            </span>
            <Image
              src="/images/getmobil-logo.png"
              alt="Getmobil"
              width={80}
              height={20}
              className="h-4 md:h-5 w-auto"
            />
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row -mx-4">
            {/* Product Image */}
            <div className="md:w-1/2 px-4 mb-6 md:mb-0">
              <div className="md:sticky md:top-20">
                <div className="relative h-72 md:h-[500px] bg-white rounded-lg border overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-4 md:p-8"
                  />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Sertifikalı
                  </div>
                  <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
                    <Image
                      src="/images/getmobil-logo.png"
                      alt="Getmobil"
                      width={100}
                      height={25}
                      className="h-5 md:h-7 w-auto"
                    />
                  </div>
                </div>
                <div className="mt-3 md:mt-4 grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="border rounded-md cursor-pointer hover:border-red-500">
                      <div className="relative h-16 md:h-20 bg-white">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={`${product.name} görünüm ${i}`}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 px-4">
              <h1 className="text-xl md:text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-3 md:mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-600 ml-2">
                  {product.rating} ({product.reviewCount} değerlendirme)
                </span>
              </div>

              <div className="mb-4 md:mb-6">
                <span className="text-xl md:text-3xl font-bold text-gray-900">{product.price}</span>
                <span className="ml-2 md:ml-3 text-sm md:text-lg line-through text-gray-500">
                  {product.originalPrice}
                </span>
                <span className="ml-2 md:ml-3 text-xs md:text-sm bg-green-100 text-green-800 px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                  %
                  {Math.round(
                    ((Number.parseInt(product.originalPrice.replace(/\D/g, "")) -
                      Number.parseInt(product.price.replace(/\D/g, ""))) /
                      Number.parseInt(product.originalPrice.replace(/\D/g, ""))) *
                      100,
                  )}{" "}
                  İndirim
                </span>
              </div>

              <div className="flex items-center mb-4 md:mb-6 space-x-2 md:space-x-4 overflow-x-auto pb-2 md:pb-0">
                <div className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 border rounded-md">
                  <span className="text-xs md:text-sm text-gray-500">Kapasite</span>
                  <p className="font-medium text-sm md:text-base">{product.storage}</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 border rounded-md">
                  <span className="text-xs md:text-sm text-gray-500">Renk</span>
                  <p className="font-medium text-sm md:text-base">{product.color}</p>
                </div>
                <div className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 border rounded-md">
                  <span className="text-xs md:text-sm text-gray-500">Durum</span>
                  <p className="font-medium text-sm md:text-base">{product.condition}</p>
                </div>
              </div>

              <div className="mb-4 md:mb-6">
                <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">Ürün Açıklaması</h3>
                <p className="text-xs md:text-base text-gray-600">{product.description}</p>
              </div>

              <div className="mb-4 md:mb-6">
                <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">Batarya Sağlığı</h3>
                <div className="w-full bg-gray-200 rounded-full h-2 md:h-2.5">
                  <div
                    className="bg-green-600 h-2 md:h-2.5 rounded-full"
                    style={{ width: product.batteryHealth }}
                  ></div>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mt-1">
                  Bu cihazın batarya sağlığı {product.batteryHealth} seviyesindedir.
                </p>
              </div>

              <div className="mb-4 md:mb-6">
                <h3 className="font-bold text-sm md:text-base mb-1 md:mb-2">Kutu İçeriği</h3>
                <ul className="list-disc pl-5 text-xs md:text-base text-gray-600">
                  {product.accessories.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col space-y-2 md:space-y-3 mb-6 md:mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                  <span className="text-xs md:text-base">12 Ay Superfix Bilişim Garantisi</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                  <span className="text-xs md:text-base">30 Gün İade Garantisi</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                  <span className="text-xs md:text-base">Ücretsiz Kargo</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mr-2" />
                  <span className="text-xs md:text-base">12 Aya Varan Taksit İmkanı</span>
                </div>
                <div className="flex items-center mt-2 md:mt-4 bg-red-50 p-2 rounded-md border border-red-100">
                  <Image
                    src="/images/getmobil-logo.png"
                    alt="Getmobil"
                    width={80}
                    height={20}
                    className="h-4 md:h-5 w-auto mr-2"
                  />
                  <span className="text-xs md:text-sm text-red-600">Getmobil ve Superfix Bilişim güvencesiyle</span>
                </div>
              </div>

              <div className="flex space-x-3 md:space-x-4">
                <Button size="lg" className="bg-red-500 hover:bg-red-600 flex-1 text-sm md:text-base">
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2" /> Sepete Ekle
                </Button>
                <Button size="lg" variant="outline" className="flex-1 text-sm md:text-base">
                  Hemen Al
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section className="py-6 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Teknik Özellikler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-xs md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Similar Products */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Benzer Ürünler</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {similarProducts.map((item) => (
              <Link key={item.id} href={`/sertifikali-urunler/${item.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="relative h-36 md:h-48 bg-gray-100">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-4" />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                      Sertifikalı
                    </div>
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                      <Image
                        src="/images/getmobil-logo.png"
                        alt="Getmobil"
                        width={70}
                        height={18}
                        className="h-4 md:h-5 w-auto"
                      />
                    </div>
                  </div>
                  <div className="p-3 md:p-4">
                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-1">{item.name}</h3>
                    <span className="text-base md:text-xl font-bold text-gray-900">{item.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
