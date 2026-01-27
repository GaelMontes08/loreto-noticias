import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { ClientProviders } from './ClientProviders'
import Header from '@/components/Header'
import { defaultMetadata } from '@/lib/metadata'

const archivo = Archivo({ 
  weight: '700',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: {
    icon: [
      { url: '/img/icon.webp' },
      { url: '/img/icon.webp', sizes: '32x32', type: 'image/webp' },
      { url: '/img/icon.webp', sizes: '16x16', type: 'image/webp' },
    ],
    apple: '/img/icon.webp',
    shortcut: '/img/icon.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={archivo.variable}>
        <ClientProviders>
          <Header />
          {children}
        </ClientProviders>
      </body>
    </html>
  )
}
