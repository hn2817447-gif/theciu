"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ShoppingBag } from "lucide-react"
import { Product, useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore()
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [isAdding, setIsAdding] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price)
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, selectedSize.size, selectedSize.price)
    setTimeout(() => setIsAdding(false), 500)
  }

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-foreground hover:text-accent transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-lg font-semibold text-foreground">
          {formatPrice(selectedSize.price)}
        </p>
        
        {/* Size Selection */}
        <div className="mt-3">
          <p className="text-xs text-muted-foreground mb-2">Chọn size:</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((sizeOption) => (
              <button
                key={sizeOption.size}
                onClick={() => setSelectedSize(sizeOption)}
                className={`px-3 py-1 text-xs rounded border transition-colors ${
                  selectedSize.size === sizeOption.size
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {sizeOption.size}
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full"
          disabled={isAdding}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {isAdding ? "Đã thêm!" : "Thêm vào giỏ"}
        </Button>
      </CardContent>
    </Card>
  )
}
