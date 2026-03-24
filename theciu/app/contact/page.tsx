"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { StoreProvider } from "@/lib/store-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

const contactInfo = [
  {
    icon: MapPin,
    title: "Địa Chỉ",
    details: ["123 Đường Thời Trang, Quận 1", "TP. Hồ Chí Minh, Việt Nam"],
  },
  {
    icon: Phone,
    title: "Điện Thoại",
    details: ["Hotline: 1900 123 456", "Di động: 0901 234 567"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["contact@theciu.vn", "support@theciu.vn"],
  },
  {
    icon: Clock,
    title: "Giờ Làm Việc",
    details: ["Thứ 2 - Thứ 6: 9:00 - 21:00", "Thứ 7 - CN: 10:00 - 20:00"],
  },
]

function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ qua các kênh dưới đây hoặc gửi tin nhắn trực tiếp.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((info) => (
                <Card key={info.title} className="text-center">
                  <CardContent className="pt-6">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">{info.title}</h3>
                    <div className="mt-2 space-y-1">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground">
                Gửi Tin Nhắn
              </h2>
              <p className="mt-2 text-muted-foreground">
                Điền thông tin bên dưới, chúng tôi sẽ phản hồi trong thời gian sớm nhất.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 lg:p-8">
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-foreground">
                      Gửi tin nhắn thành công!
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Nguyễn Văn A"
                            required
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="email">Email</FieldLabel>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="email@example.com"
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <Field>
                          <FieldLabel htmlFor="phone">Số điện thoại</FieldLabel>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="0901 234 567"
                          />
                        </Field>
                        <Field>
                          <FieldLabel htmlFor="subject">Chủ đề</FieldLabel>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Chủ đề tin nhắn"
                            required
                          />
                        </Field>
                      </div>

                      <Field>
                        <FieldLabel htmlFor="message">Nội dung</FieldLabel>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Nhập nội dung tin nhắn của bạn..."
                          rows={5}
                          required
                        />
                      </Field>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Đang gửi..."
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Gửi tin nhắn
                          </>
                        )}
                      </Button>
                    </FieldGroup>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground text-center mb-10">
              Vị Trí Cửa Hàng
            </h2>
            <div className="aspect-[21/9] overflow-hidden rounded-lg bg-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4692489831386!2d106.7011803!3d10.7758439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a9d8f0d8d%3A0x5a2c9c2a6c7e8f0b!2sDistrict%201%2C%20Ho%20Chi%20Minh%20City%2C%20Vietnam!5e0!3m2!1sen!2sus!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vị trí cửa hàng The C.I.U"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}

export default function ContactPage() {
  return (
    <StoreProvider>
      <ContactContent />
    </StoreProvider>
  )
}
