export interface LocalAd {
  id: number
  /** Path to image in /public — e.g. '/img/ads/empresa.jpg' (1200×300 recommended) */
  image: string
  /** Destination URL when the ad is clicked */
  href: string
  /** Accessible alt text / brief description of the ad */
  alt: string
  /** Advertiser name shown as a small label below the ad */
  label: string
  /** Intrinsic image width in px — defaults to 1200 */
  width?: number
  /** Intrinsic image height in px — defaults to 300 */
  height?: number
}

/**
 * Local enterprise ads.
 *
 * HOW TO ADD AN AD:
 *  1. Place the banner image (preferably 1200×300 px, JPEG/WebP) in /public/img/
 *  2. Add an entry to the array below.
 *  3. Update `href` with the real destination URL.
 *  4. Multiple entries are picked at random on each page load.
 */
export const localAds: LocalAd[] = [
  {
    id: 1,
    image: '/img/casa-del-jaguar-hotel-ad.webp',
    href: 'https://www.booking.com/hotel/pe/casa-del-jaguar-iquitos.es.html',
    alt: 'Casa del Jaguar Hotel — Iquitos, Loreto',
    label: 'Casa del Jaguar Hotel',
  },
  {
    id: 2,
    image: '/img/casa-del-jaguar-ayahuasca-ad.webp',
    href: 'https://www.casadeljaguariquitos.com',
    alt: 'Casa del Jaguar Ayahuasca — Iquitos, Loreto',
    label: 'Casa del Jaguar Ayahuasca',
  },
]
