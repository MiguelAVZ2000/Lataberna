import React from "react"
import type { Metadata, Viewport } from 'next'
import { Lora, Cinzel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const lora = Lora({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora'
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel'
})

export const metadata: Metadata = {
  title: 'Lataberna | Tu Portal de Rol',
  description: 'Herramientas y Guias para D&D 5e.',
  keywords: ['Dungeons and Dragons', 'DnD', '5e', 'Wiki', 'Character Builder'],
  icons: {
    icon: '/dragon.png',
    shortcut: '/dragon.png',
    apple: '/dragon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
}

import { CartProvider } from "@/components/tienda/cart-context"
import { CartSidebar } from "@/components/tienda/cart-sidebar"
import { AuthProvider } from "@/components/auth/auth-context"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="light">
      <body className={`${lora.variable} ${cinzel.variable} font-sans antialiased bg-background text-foreground`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#EE8600] focus:text-black focus:rounded"
        >
          Saltar al contenido
        </a>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartSidebar />
          </CartProvider>
        </AuthProvider>
        <Toaster richColors position="bottom-right" />
        <Analytics />
      </body>
    </html>
  )
}
