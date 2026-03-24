"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag, Minus, Plus } from "lucide-react"
import { StoreProvider, products, useStore } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"

interface ProductDetailContentProps {
  productId: number
}

function ProductDetailContent({ productId }: ProductDetailContentProps) {
  const { addToCart } = useStore()
  const product = products.find((p) => p.id === productId)
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Sản phẩm không tồn tại</h1>
            <Link href="/products">
              <Button className="mt-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Quay lại
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    setIsAdding(true)
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize.size, selectedSize.price)
    }
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 500)
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại sản phẩm
            </Link>
          </nav>

          {/* Product Detail */}
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="aspect-[4/5] overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={750}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>
              
              <p className="mt-4 text-2xl font-semibold text-foreground">
                {selectedSize && formatPrice(selectedSize.price)}
              </p>

              <p className="mt-6 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mt-8">
                <h3 className="font-medium text-foreground mb-3">Chọn Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sizeOption) => (
                    <button
                      key={sizeOption.size}
                      onClick={() => setSelectedSize(sizeOption)}
                      className={`px-6 py-3 text-sm font-medium rounded-md border transition-colors ${
                        selectedSize?.size === sizeOption.size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary"
                      }`}
                    >
                      <span className="block">{sizeOption.size}</span>
                      <span className="block text-xs mt-1 opacity-80">
                        {formatPrice(sizeOption.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="font-medium text-foreground mb-3">Số Lượng</h3>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                className="mt-8 w-full sm:w-auto"
                onClick={handleAddToCart}
                disabled={isAdding || !selectedSize}
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                {isAdding ? "Đã thêm!" : "Thêm vào giỏ hàng"}
              </Button>

              {/* Additional Info */}
              <div className="mt-8 border-t border-border pt-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Miễn phí giao hàng</h4>
                    <p className="text-sm text-muted-foreground">Cho đơn hàng từ 500.000đ</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">Đổi trả dễ dàng</h4>
                    <p className="text-sm text-muted-foreground">Trong vòng 7 ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16 lg:mt-24">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Sản Phẩm Liên Quan
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const productId = parseInt(id, 10)

  return (
    <StoreProvider>
      <ProductDetailContent productId={productId} />
    </StoreProvider>
  )
}
