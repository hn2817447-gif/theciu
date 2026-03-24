import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl font-bold">The C.I.U</h3>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Thương hiệu thời trang cao cấp với sứ mệnh mang đến phong cách độc đáo và chất lượng vượt trội.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Liên Kết Nhanh</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Liên Hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Danh Mục</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/products?category=ao" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Áo
                </Link>
              </li>
              <li>
                <Link href="/products?category=quan" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Quần
                </Link>
              </li>
              <li>
                <Link href="/products?category=ao-khoac" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Áo Khoác
                </Link>
              </li>
              <li>
                <Link href="/products?category=vay" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Váy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Liên Hệ</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>123 Đường Thời Trang, Q.1</li>
              <li>TP. Hồ Chí Minh, Việt Nam</li>
              <li>Email: contact@theciu.vn</li>
              <li>Hotline: 1900 123 456</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} The C.I.U. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
