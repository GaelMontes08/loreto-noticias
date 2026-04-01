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
 *  1. Place the banner image (preferably 1200×300 px, JPEG/WebP) in /public/img/ads/
 *  2. Uncomment and fill in one of the entries below.
 *  3. Multiple entries are picked at random on each page load.
 */
export const localAds: LocalAd[] = [
  // {
  //   id: 1,
  //   image: '/img/ads/nombre-empresa.jpg',
  //   href: 'https://www.empresa.com',
  //   alt: 'Descripción breve del anuncio – Nombre Empresa',
  //   label: 'Nombre Empresa',
  // },
]
