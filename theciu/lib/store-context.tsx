"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export interface Product {
  id: number
  name: string
  category: string
  image: string
  sizes: { size: string; price: number }[]
  description: string
}

export interface CartItem {
  product: Product
  size: string
  price: number
  quantity: number
}

interface StoreContextType {
  cart: CartItem[]
  addToCart: (product: Product, size: string, price: number) => void
  removeFromCart: (productId: number, size: string) => void
  updateQuantity: (productId: number, size: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export const products: Product[] = [
  {
    id: 1,
    name: "Váy Midi Hoa Nhí",
    category: "vay",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 450000 },
      { size: "M", price: 450000 },
      { size: "L", price: 480000 },
    ],
    description: "Váy midi họa tiết hoa nhí nhẹ nhàng, nữ tính, phù hợp dạo phố và đi chơi.",
  },
  {
    id: 2,
    name: "Đầm Maxi Bohemian",
    category: "vay",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 890000 },
      { size: "M", price: 890000 },
      { size: "L", price: 950000 },
    ],
    description: "Đầm maxi phong cách bohemian bay bổng, thoải mái và quyến rũ cho mùa hè.",
  },
  {
    id: 3,
    name: "Áo Blouse Cổ V",
    category: "ao",
    image: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 320000 },
      { size: "M", price: 320000 },
      { size: "L", price: 350000 },
    ],
    description: "Áo blouse cổ V thanh lịch, chất liệu lụa mềm mại, phù hợp công sở.",
  },
  {
    id: 4,
    name: "Quần Culottes Ống Rộng",
    category: "quan",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 420000 },
      { size: "M", price: 420000 },
      { size: "L", price: 450000 },
    ],
    description: "Quần culottes ống rộng thoáng mát, dễ phối đồ cho mọi dịp.",
  },
  {
    id: 5,
    name: "Áo Cardigan Len Mỏng",
    category: "ao-khoac",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 380000 },
      { size: "M", price: 380000 },
      { size: "L", price: 420000 },
    ],
    description: "Áo cardigan len mỏng nhẹ, ấm áp và duyên dáng cho những ngày se lạnh.",
  },
  {
    id: 6,
    name: "Đầm Bodycon Dự Tiệc",
    category: "vay",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 750000 },
      { size: "M", price: 750000 },
      { size: "L", price: 800000 },
    ],
    description: "Đầm bodycon ôm sát quyến rũ, hoàn hảo cho các buổi tiệc tối.",
  },
  {
    id: 7,
    name: "Áo Croptop Dây Rút",
    category: "ao",
    image: "https://images.unsplash.com/photo-1525171254930-643fc658b64e?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 250000 },
      { size: "M", price: 250000 },
      { size: "L", price: 280000 },
    ],
    description: "Áo croptop dây rút năng động, trẻ trung cho những ngày hè sôi động.",
  },
  {
    id: 8,
    name: "Chân Váy Xếp Ly",
    category: "vay",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0uj00?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 350000 },
      { size: "M", price: 350000 },
      { size: "L", price: 380000 },
    ],
    description: "Chân váy xếp ly thanh lịch, dễ dàng kết hợp với nhiều loại áo.",
  },
  {
    id: 9,
    name: "Blazer Nữ Công Sở",
    category: "ao-khoac",
    image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 650000 },
      { size: "M", price: 650000 },
      { size: "L", price: 700000 },
    ],
    description: "Blazer nữ phom chuẩn công sở, sang trọng và chuyên nghiệp.",
  },
  {
    id: 10,
    name: "Quần Jean Nữ Skinny",
    category: "quan",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 480000 },
      { size: "M", price: 480000 },
      { size: "L", price: 520000 },
    ],
    description: "Quần jean skinny co giãn tốt, tôn dáng và thoải mái suốt ngày dài.",
  },
  {
    id: 11,
    name: "Áo Sơ Mi Nữ Lụa",
    category: "ao",
    image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop",
    sizes: [
      { size: "S", price: 420000 },
      { size: "M", price: 420000 },
      { size: "L", price: 450000 },
    ],
    description: "Áo sơ mi lụa cao cấp, mềm mại và sang trọng cho phái đẹp.",
  },
  {
    id: 12,
    name: "Túi Xách Nữ Thời Trang",
    category: "phu-kien",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
    sizes: [
      { size: "Mini", price: 380000 },
      { size: "Medium", price: 450000 },
    ],
    description: "Túi xách nữ thiết kế tinh tế, phụ kiện không thể thiếu cho mọi outfit.",
  },
]

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const addToCart = (product: Product, size: string, price: number) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) => item.product.id === product.id && item.size === size
      )
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, size, price, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    )
  }

  const updateQuantity = (productId: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0)

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
