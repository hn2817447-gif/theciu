"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useMemo, useState } from "react"
import { Filter, X } from "lucide-react"
import { StoreProvider, products } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const categoryNames: Record<string, string> = {
  ao: "Áo",
  quan: "Quần",
  "ao-khoac": "Áo Khoác",
  vay: "Váy",
  "phu-kien": "Phụ Kiện",
}

const allCategories = [
  { id: "all", name: "Tất cả" },
  { id: "ao", name: "Áo" },
  { id: "quan", name: "Quần" },
  { id: "ao-khoac", name: "Áo Khoác" },
  { id: "vay", name: "Váy" },
  { id: "phu-kien", name: "Phụ Kiện" },
]

function ProductsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")
  const searchQuery = searchParams.get("search") || ""
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all")
  const [priceRange, setPriceRange] = useState<"all" | "low" | "mid" | "high">("all")
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    }

    // Filter by price range
    if (priceRange !== "all") {
      result = result.filter((p) => {
        const minPrice = Math.min(...p.sizes.map((s) => s.price))
        if (priceRange === "low") return minPrice < 400000
        if (priceRange === "mid") return minPrice >= 400000 && minPrice < 800000
        if (priceRange === "high") return minPrice >= 800000
        return true
      })
    }

    return result
  }, [selectedCategory, searchQuery, priceRange])

  const pageTitle = categoryParam
    ? categoryNames[categoryParam] || "Sản Phẩm"
    : searchQuery
    ? `Kết quả tìm kiếm: "${searchQuery}"`
    : "Tất Cả Sản Phẩm"

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Danh Mục</h4>
        <div className="space-y-2">
          {allCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id)
                setFilterOpen(false)
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium text-foreground mb-3">Khoảng Giá</h4>
        <div className="space-y-2">
          {[
            { id: "all", name: "Tất cả" },
            { id: "low", name: "Dưới 400.000đ" },
            { id: "mid", name: "400.000đ - 800.000đ" },
            { id: "high", name: "Trên 800.000đ" },
          ].map((range) => (
            <button
              key={range.id}
              onClick={() => {
                setPriceRange(range.id as typeof priceRange)
                setFilterOpen(false)
              }}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                priceRange === range.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {pageTitle}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {filteredProducts.length} sản phẩm
              </p>
            </div>
            
            {/* Mobile Filter Button */}
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Bộ Lọc Sản Phẩm</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {/* Active Filters */}
              {(selectedCategory !== "all" || priceRange !== "all" || searchQuery) && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm">
                      {categoryNames[selectedCategory]}
                      <button onClick={() => setSelectedCategory("all")}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {priceRange !== "all" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm">
                      {priceRange === "low" && "Dưới 400.000đ"}
                      {priceRange === "mid" && "400.000đ - 800.000đ"}
                      {priceRange === "high" && "Trên 800.000đ"}
                      <button onClick={() => setPriceRange("all")}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-muted text-sm">
                      Tìm: {searchQuery}
                    </span>
                  )}
                </div>
              )}

              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    Không tìm thấy sản phẩm phù hợp
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSelectedCategory("all")
                      setPriceRange("all")
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <StoreProvider>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Đang tải...</div>}>
        <ProductsContent />
      </Suspense>
    </StoreProvider>
  )
}
