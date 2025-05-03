import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ShoppingCart, Star, Truck } from "lucide-react"

export default function CertifiedProductsPage() {
  const certifiedProducts = [
    {
      id: 1,
      name: "Apple iPhone 11",
      price: "14.444 TL",
      originalPrice: "16.999 TL",
      storage: "64 GB",
      color: "Siyah",
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=300&auto=format&fit=crop",
      rating: 4.8,
      reviewCount: 156,
    },
    {
      id: 2,
      name: "Samsung Galaxy S22 ULTRA 5G",
      price: "33.488 TL",
      originalPrice: "38.999 TL",
      storage: "256 GB",
      color: "Hayalet Siyah",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=300&auto=format&fit=crop",
      rating: 4.9,
      reviewCount: 87,
    },
    {
      id: 3,
      name: "Apple iPhone 12",
      price: "24.499 TL",
      originalPrice: "27.999 TL",
      storage: "128 GB",
      color: "Kırmızı",
      image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?q=80&w=300&auto=format&fit=crop",
      rating: 4.7,
      reviewCount: 203,
    },
    {
      id: 4,
      name: "Samsung Galaxy A54",
      price: "13.998 TL",
      originalPrice: "15.499 TL",
      storage: "128 GB",
      color: "Beyaz",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=300&auto=format&fit=crop",
      rating: 4.6,
      reviewCount: 118,
    },
    {
      id: 5,
      name: "Apple iPhone SE 2020",
      price: "7.799 TL",
      originalPrice: "9.499 TL",
      storage: "64 GB",
      color: "Siyah",
      image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=300&auto=format&fit=crop",
      rating: 4.5,
      reviewCount: 92,
    },
    {
      id: 6,
      name: "Apple iPhone 13 Pro",
      price: "29.999 TL",
      originalPrice: "34.999 TL",
      storage: "128 GB",
      color: "Sierra Mavi",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=300&auto=format&fit=crop",
      rating: 4.9,
      reviewCount: 176,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        <div className="container mx-auto px-4 py-10 md:py-20 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">TSE Sertifikalı Yenilenmiş Cihazlar</h1>
            <p className="text-base md:text-xl mb-6 md:mb-8">
              Tüm cihazlarımız uzman teknisyenlerimiz tarafından test edilmiş ve yenilenmiştir. 12 ay garanti ve 30 gün
              iade garantisi ile güvenle satın alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-red-500 hover:bg-red-600 w-full sm:w-auto">
                Tüm Ürünleri Gör
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 w-full sm:w-auto"
              >
                Kampanyalar
              </Button>
            </div>
          </div>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=1600&auto=format&fit=crop"
          alt="Sertifikalı ikinci el cihazlar"
          width={1600}
          height={600}
          className="w-full h-[300px] md:h-[500px] object-cover"
          priority
        />
      </section>

      {/* Partnership Banner */}
      <section className="py-4 md:py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="mr-3 md:mr-6">
                <Image
                  src="/images/getmobil-logo.png"
                  alt="Getmobil Logo"
                  width={180}
                  height={50}
                  className="h-8 md:h-12 w-auto"
                />
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-bold">Resmi İş Ortağımız</h2>
                <p className="text-sm md:text-base text-gray-600">Türkiye'nin lider Yenilenmiş teknoloji platformu</p>
              </div>
            </div>
            <div className="flex items-center w-full md:w-auto">
              <div className="bg-red-100 text-red-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm mr-2 md:mr-4">
                Özel Fırsatlar
              </div>
              <Button className="bg-red-500 hover:bg-red-600 text-sm md:text-base flex-1 md:flex-none">
                Getmobil Ürünlerini Keşfet
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Scrollable on Mobile */}
      <section className="py-6 md:py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-6 overflow-x-auto pb-4 md:pb-0 md:overflow-visible">
            <div className="flex-shrink-0 w-60 md:w-auto flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">12 Ay Garanti</h3>
                <p className="text-xs md:text-sm text-gray-600">Tüm cihazlarda 12 ay garanti</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-60 md:w-auto flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <Truck className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">Hızlı Kargo</h3>
                <p className="text-xs md:text-sm text-gray-600">24 saat içinde kargoya teslim</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-60 md:w-auto flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">Taksit İmkanı</h3>
                <p className="text-xs md:text-sm text-gray-600">12 aya varan taksit seçenekleri</p>
              </div>
            </div>
            <div className="flex-shrink-0 w-60 md:w-auto flex items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <Star className="h-5 w-5 md:h-6 md:w-6 text-red-500" />
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base">%100 Memnuniyet</h3>
                <p className="text-xs md:text-sm text-gray-600">15 gün koşulsuz iade garantisi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div className="flex items-center">
              <h2 className="text-xl md:text-3xl font-bold">Getmobil Öne Çıkan Ürünler</h2>
              <div className="ml-2 md:ml-3 bg-red-100 text-red-600 text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded-full">
                Resmi Ortaklık
              </div>
            </div>
            <Link
              href="/sertifikali-urunler/tumu"
              className="text-red-500 hover:text-red-600 font-medium text-sm md:text-base"
            >
              Tümünü Gör →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {certifiedProducts.map((product) => (
              <Link key={product.id} href={`/sertifikali-urunler/${product.id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow h-full">
                  <div className="relative h-40 md:h-64 bg-gray-100">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-red-500 text-white text-[10px] md:text-xs font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded">
                      Sertifikalı
                    </div>
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3">
                      <Image
                        src="/images/getmobil-logo.png"
                        alt="Getmobil"
                        width={80}
                        height={20}
                        className="h-4 md:h-6 w-auto"
                      />
                    </div>
                  </div>
                  <div className="p-3 md:p-5">
                    <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center mb-1 md:mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 md:h-4 md:w-4 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs md:text-sm text-gray-600 ml-1 md:ml-2">({product.reviewCount})</span>
                    </div>
                    <div className="flex items-center mb-2 md:mb-3">
                      <span className="text-xs md:text-sm text-gray-500">{product.storage}</span>
                      <span className="mx-1 md:mx-2 text-gray-300">|</span>
                      <span className="text-xs md:text-sm text-gray-500">{product.color}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-base md:text-xl font-bold text-gray-900">{product.price}</span>
                        <span className="block md:ml-2 md:inline text-xs md:text-sm line-through text-gray-500">
                          {product.originalPrice}
                        </span>
                      </div>
                      <Button size="sm" className="bg-red-500 hover:bg-red-600 hidden md:flex">
                        <ShoppingCart className="h-4 w-4 mr-1" /> Sepete Ekle
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trade-in Banner */}
      <section className="py-8 md:py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <div className="flex flex-col md:flex-row md:items-center mb-4">
                <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-0">Eski Cihazını Sat, Yenisini Al!</h2>
                <div className="md:ml-4 flex items-center bg-white/10 px-3 py-1 rounded-full self-start md:self-auto">
                  <span className="text-xs md:text-sm mr-2">Powered by</span>
                  <Image
                    src="/images/getmobil-logo.png"
                    alt="Getmobil"
                    width={80}
                    height={20}
                    className="h-4 md:h-5 w-auto"
                  />
                </div>
              </div>
              <p className="text-sm md:text-lg mb-6">
                Getmobil ve Superfix Bilişim iş ortaklığı ile kullanmadığınız eski cihazınızı bize getirin, ekspertiz
                sonrası en iyi fiyat teklifini sunalım. Yeni cihaz alımında ek indirim fırsatlarından yararlanın.
              </p>
              <Button size="lg" className="bg-red-500 hover:bg-red-600 w-full sm:w-auto">
                Hemen Değerlendir
              </Button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-full h-48 md:w-64 md:h-64">
                <Image
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=400&auto=format&fit=crop"
                  alt="Eski cihazını sat"
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/30 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-3xl font-bold mb-6 md:mb-12 text-center">Sık Sorulan Sorular</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Sertifikalı cihaz ne demek?</h3>
              <p className="text-sm md:text-base text-gray-600">
                Sertifikalı cihazlar, uzman teknisyenlerimiz tarafından 40+ nokta kontrolünden geçirilmiş, gerekli
                parçaları değiştirilmiş ve yenilenmiş cihazlardır. Orijinal ürünlerin tüm özelliklerine sahiptir.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Garanti süresi ne kadar?</h3>
              <p className="text-sm md:text-base text-gray-600">
                Tüm sertifikalı cihazlarımız 12 ay Superfix Bilişim garantisi altındadır. Bu süre içinde oluşabilecek
                teknik sorunlar ücretsiz olarak giderilir.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">İade koşulları nelerdir?</h3>
              <p className="text-sm md:text-base text-gray-600">
                Satın aldığınız ürünü 30 gün içinde herhangi bir sebepten ötürü iade edebilirsiniz. Ürünün kutusu,
                aksesuarları ve faturası ile birlikte mağazalarımıza getirmeniz yeterlidir.
              </p>
            </div>
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
              <h3 className="font-bold text-base md:text-lg mb-2 md:mb-3">Taksit seçenekleri var mı?</h3>
              <p className="text-sm md:text-base text-gray-600">
                Evet, anlaşmalı bankalarımız aracılığıyla 12 aya varan taksit seçeneklerimiz mevcuttur. Ödeme sayfasında
                taksit seçeneklerini görebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 md:mb-6">Sertifikalı Cihazlarda Fırsatları Kaçırmayın!</h2>
          <p className="text-sm md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
            Sınırlı sayıda stoklar tükenmeden siz de sertifikalı cihaz avantajlarından yararlanın.
          </p>
          <Link href="https://getmobil.com" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-red-500 hover:bg-red-600 w-full sm:w-auto">
              Hemen Alışverişe Başla
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
