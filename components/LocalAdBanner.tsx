'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { localAds, type LocalAd } from '@/lib/localAds'

interface Props {
  className?: string
  /** Pin a specific ad by array index. Omit for random pick on each load. */
  index?: number
}

export default function LocalAdBanner({ className = '', index }: Props) {
  const [ad, setAd] = useState<LocalAd | null>(null)

  useEffect(() => {
    if (localAds.length === 0) return
    if (index !== undefined) {
      setAd(localAds[index % localAds.length])
    } else {
      setAd(localAds[Math.floor(Math.random() * localAds.length)])
    }
  }, [index])

  // Development-only placeholder so you can see where ads will appear
  if (process.env.NODE_ENV === 'development' && localAds.length === 0) {
    return (
      <div
        className={`flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg py-8 text-center ${className}`}
      >
        <div className="text-gray-400 dark:text-gray-500 text-sm">
          <p className="font-semibold mb-1">Espacio publicitario local</p>
          <p className="text-xs">
            Agrega empresas en <code className="font-mono">lib/localAds.ts</code>
          </p>
        </div>
      </div>
    )
  }

  if (!ad) return null

  return (
    <div className={`relative group ${className}`}>
      <span className="absolute top-2 left-2 z-10 text-[10px] leading-none bg-black/60 text-white px-1.5 py-0.5 rounded pointer-events-none">
        Publicidad
      </span>
      <a
        href={ad.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={ad.alt}
        className="block overflow-hidden rounded-lg"
      >
        <Image
          src={ad.image}
          alt={ad.alt}
          width={ad.width ?? 1200}
          height={ad.height ?? 300}
          className="w-full h-auto transition-opacity duration-200 group-hover:opacity-90"
        />
      </a>
      {ad.label && (
        <p className="mt-1 text-right text-[11px] text-gray-400 dark:text-gray-500">
          Anuncio: {ad.label}
        </p>
      )}
    </div>
  )
}
