import type { Metadata } from 'next'
import { Inter, Outfit, Cormorant_Garamond, Gochi_Hand } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

const gochiHand = Gochi_Hand({
  variable: '--font-gochi',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shemous-beverages-exports.vercel.app'),
  title: 'Shemous Beverages & Exports | Premium Organic Ugandan Juices',
  description: "Uganda's premier exporter of global-ready organic fruit juices. Partner with Shemous to distribute our heritage collection worldwide.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shemous Beverages & Exports',
    description: 'Bringing the goodness of the Pearl of Africa to the world with clinical precision and sustainable organic farming.',
    url: 'https://shemous.co.ug',
    siteName: 'Shemous Beverages',
    images: [
      {
        url: 'https://shemous.co.ug/images/shemous_logo_master_transparent.png',
        width: 1200,
        height: 630,
        alt: 'Shemous Beverages & Exports Official Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/images/shemous_logo_master_transparent.png',
    apple: '/images/shemous_logo_master_transparent.png',
  },
  verification: {
    google: '0HwngfaUMfpDspQ33Cyn_i3U9cR7e2wmCtt61HRL2u8',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://pnqirvkijktqjjzwcjod.supabase.co" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pnqirvkijktqjjzwcjod.supabase.co" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Lightspeed Preloads for critical Above-The-Fold assets */}
        <link rel="preload" href="/images/shemous_logo_master_transparent.png" as="image" />
        <link rel="preload" href="/videos/Create_cinematic_realistic_202604040302.mp4" as="video" type="video/mp4" />
        
        {/* Structured Data / JSON-LD for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Shemous Beverages & Exports',
              url: 'https://shemous-beverages-exports.vercel.app',
              logo: 'https://shemous-beverages-exports.vercel.app/images/shemous_logo_master_transparent.png',
              description: "Uganda's premier exporter of global-ready organic fruit juices.",
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+256-000-000000', // Update with real number if needed
                contactType: 'Customer Service',
                areaServed: 'Global',
                availableLanguage: ['English']
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Shemous Beverages & Exports',
              url: 'https://shemous-beverages-exports.vercel.app',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://shemous-beverages-exports.vercel.app/products?q={search_term_string}',
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${gochiHand.variable}`} style={{ backgroundColor: 'var(--background)' }} suppressHydrationWarning>
        <div className="noise-overlay" />
        <ClientLayout>
            {children}
        </ClientLayout>
      </body>
    </html>
  )
}
