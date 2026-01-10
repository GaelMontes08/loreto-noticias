import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { ClientProviders } from './ClientProviders'
import Header from '@/components/Header'

const archivo = Archivo({ 
  weight: '700',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Loreto Noticias',
  description: 'Tu fuente de noticias de Loreto',
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
