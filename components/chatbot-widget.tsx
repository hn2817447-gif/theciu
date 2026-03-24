"use client"

import { useState } from "react"
import { MessageCircle, X, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const chatbotUrl = "https://cdn.botpress.cloud/webchat/v3.6/shareable.html?configUrl=https://files.bpcontent.cloud/2026/01/27/15/20260127153529-4T8SJUHK.json"

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Mở chat hỗ trợ</span>
      </Button>
    )
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? "bottom-6 right-6 h-14 w-80"
          : "bottom-6 right-6 h-[500px] w-[380px] max-w-[calc(100vw-2rem)]"
      }`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between rounded-t-lg bg-primary px-4 py-3 text-primary-foreground">
        <span className="font-medium">Hỗ trợ trực tuyến</span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Thu nhỏ</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Đóng</span>
          </Button>
        </div>
      </div>

      {/* Chat Content */}
      {!isMinimized && (
        <div className="h-[calc(100%-48px)] w-full overflow-hidden rounded-b-lg border border-t-0 border-border bg-card shadow-xl">
          <iframe
            src={chatbotUrl}
            className="h-full w-full border-0"
            title="Chatbot hỗ trợ"
          />
        </div>
      )}
    </div>
  )
}
