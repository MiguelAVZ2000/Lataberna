import React from "react"
import type { Metadata, Viewport } from 'next'
import { Roboto, Roboto_Condensed } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})

const robotoCondensed = Roboto_Condensed({ 
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-roboto-condensed'
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
  themeColor: '#121212',
  width: 'device-width',
  initialScale: 1,
}

import { CartProvider } from "@/components/tienda/cart-context"
import { CartSidebar } from "@/components/tienda/cart-sidebar"

// ... imports anteriores ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${roboto.variable} ${robotoCondensed.variable} font-sans antialiased bg-background text-foreground`}>
        <CartProvider>
            {children}
            <CartSidebar />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
