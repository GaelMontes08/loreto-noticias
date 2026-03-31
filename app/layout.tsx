import type { Metadata, Viewport } from 'next'
import { Archivo } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ClientProviders } from './ClientProviders'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BreakingNewsTicker from '@/components/BreakingNewsTicker'
import BackToTop from '@/components/BackToTop'
import { defaultMetadata, faviconConfig } from '@/lib/metadata'

const archivo = Archivo({ 
  weight: '700',
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
}

export const metadata: Metadata = {
  ...defaultMetadata,
  icons: faviconConfig,
  other: {
    'google-adsense-account': 'ca-pub-1777939455626900',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preconnect — resolve DNS + open TLS before these are needed */}
        <link rel="preconnect" href="https://dimgrey-gnat-663662.hostingersite.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
      </head>
      <body className={archivo.variable}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4P0LNM09Q5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4P0LNM09Q5');
          `}
        </Script>
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1777939455626900"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
        <ClientProviders>
          <Header />
          <BreakingNewsTicker />
          {children}
          <Footer />
          <BackToTop />
        </ClientProviders>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Loreto Noticias',
              url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://loretonoticias.com'}/buscar?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
