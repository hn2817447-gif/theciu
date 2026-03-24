"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { StoreProvider, products } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "Áo",
    href: "/products?category=ao",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    count: products.filter((p) => p.category === "ao").length,
  },
  {
    name: "Quần",
    href: "/products?category=quan",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    count: products.filter((p) => p.category === "quan").length,
  },
  {
    name: "Áo Khoác",
    href: "/products?category=ao-khoac",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
    count: products.filter((p) => p.category === "ao-khoac").length,
  },
  {
    name: "Váy",
    href: "/products?category=vay",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    count: products.filter((p) => p.category === "vay").length,
  },
]

function HomePage() {
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="text-center lg:text-left">
                <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                  Phong cách độc đáo, chất lượng vượt trội
                </h1>
                <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Khám phá bộ sưu tập thời trang mới nhất từ The C.I.U - Nơi hội tụ của sự tinh tế và cá tính.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/products">
                    <Button size="lg" className="w-full sm:w-auto">
                      Khám phá ngay
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Liên hệ
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop"
                  alt="The C.I.U Collection"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Danh Mục Sản Phẩm
              </h2>
              <p className="mt-4 text-muted-foreground">
                Khám phá các danh mục sản phẩm đa dạng của chúng tôi
              </p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="group relative overflow-hidden rounded-lg aspect-[3/4]"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.count} sản phẩm</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Sản Phẩm Nổi Bật
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Những thiết kế được yêu thích nhất
                </p>
              </div>
              <Link href="/products">
                <Button variant="outline">
                  Xem tất cả
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=800&fit=crop"
                  alt="About The C.I.U"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Về The C.I.U
                </h2>
                <p className="mt-6 text-muted-foreground leading-relaxed">
                  The C.I.U ra đời với sứ mệnh mang đến những sản phẩm thời trang chất lượng cao, 
                  kết hợp giữa phong cách hiện đại và sự tinh tế trong từng đường may.
                </p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Chúng tôi tin rằng thời trang không chỉ là cách ăn mặc, mà còn là cách thể hiện 
                  cá tính và phong cách sống của mỗi người.
                </p>
                <Link href="/contact" className="mt-8 inline-block">
                  <Button>
                    Tìm hiểu thêm
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}

export default function Home() {
  return (
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  )
}
