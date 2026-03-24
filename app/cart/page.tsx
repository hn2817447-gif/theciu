"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { StoreProvider, useStore } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function CartContent() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const cartTotal = getCartTotal()
  const shippingFee = cartTotal >= 500000 ? 0 : 30000
  const grandTotal = cartTotal + shippingFee

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Tiếp tục mua sắm
            </Link>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Giỏ Hàng
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/50" />
              <h2 className="mt-6 text-xl font-medium text-foreground">Giỏ hàng trống</h2>
              <p className="mt-2 text-muted-foreground">
                Hãy khám phá các sản phẩm của chúng tôi
              </p>
              <Link href="/products">
                <Button className="mt-6">
                  Mua sắm ngay
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <Card key={`${item.product.id}-${item.size}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link href={`/products/${item.product.id}`} className="flex-shrink-0">
                          <div className="w-24 h-32 sm:w-32 sm:h-40 overflow-hidden rounded-md bg-muted">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={128}
                              height={160}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/products/${item.product.id}`}>
                                <h3 className="font-medium text-foreground hover:text-accent transition-colors">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground">
                                Size: {item.size}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromCart(item.product.id, item.size)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Xóa</span>
                            </Button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.size, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <p className="font-semibold text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="flex justify-end">
                  <Button variant="outline" onClick={clearCart}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Xóa tất cả
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="text-lg font-semibold text-foreground">Tóm Tắt Đơn Hàng</h2>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span className="text-foreground">{formatPrice(cartTotal)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span className="text-foreground">
                          {shippingFee === 0 ? "Miễn phí" : formatPrice(shippingFee)}
                        </span>
                      </div>
                      {cartTotal < 500000 && (
                        <p className="text-xs text-muted-foreground">
                          Mua thêm {formatPrice(500000 - cartTotal)} để được miễn phí vận chuyển
                        </p>
                      )}
                    </div>

                    <Separator className="my-6" />

                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-foreground">Tổng cộng</span>
                      <span className="text-lg font-semibold text-foreground">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    <Button size="lg" className="mt-6 w-full">
                      Tiến hành thanh toán
                    </Button>

                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Thanh toán an toàn & bảo mật
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}

export default function CartPage() {
  return (
    <StoreProvider>
      <CartContent />
    </StoreProvider>
  )
}
