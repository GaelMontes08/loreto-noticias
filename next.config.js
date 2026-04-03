/** @type {import('next').NextConfig} */

const securityHeaders = [
  // Prevent the site from being embedded in iframes (clickjacking)
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Only send the origin (no path) in the Referer header when crossing origins
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable browser features not used by the site
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // Force HTTPS for 1 year; include subdomains
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // Content Security Policy
  // Google AdSense / Analytics requires broad script/frame permissions — keep 'unsafe-inline'
  // for styles because Next.js injects inline styles. Tighten further once you confirm nothing breaks.
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // scripts: self + GA + AdSense + GTM
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com",
      // styles: self + inline (Next.js)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // fonts
      "font-src 'self' https://fonts.gstatic.com",
      // images: self + data URIs + all HTTPS (WordPress media can be any host)
      "img-src 'self' data: blob: https:",
      // fetch/XHR: self + WP API + Resend
      "connect-src 'self' https://dimgrey-gnat-663662.hostingersite.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net",
      // iframes: Google AdSense
      "frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com",
      // workers
      "worker-src 'self' blob:",
    ].join('; '),
  },
]

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
