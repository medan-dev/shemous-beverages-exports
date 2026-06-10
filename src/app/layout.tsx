import type { Metadata, Viewport } from 'next'
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
  metadataBase: new URL('https://www.Shemousbeveragesexports.shop'),
  title: 'Shemous Beverages | Best Juices in Uganda & Organic Global Export',
  description: 'Discover the best juices in Uganda. Shemous Beverages captures the raw essence of African nature, delivering premium, global-ready organic fruit juices to the world.',
  keywords: ['best juices in Uganda', 'best juice Uganda', 'Ugandan fruit juice', 'organic juice exports', 'premium fruit juice Uganda', 'Shemous beverages'],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Shemous Beverages | Best Juices in Uganda',
    description: 'Bringing the best juices in Uganda to the world with clinical precision and sustainable organic farming.',
    url: 'https://www.Shemousbeveragesexports.shop',
    siteName: 'Shemous Beverages',
    images: [
      {
        url: 'https://www.Shemousbeveragesexports.shop/images/shemous_logo_master_transparent.png',
        width: 1200,
        height: 630,
        alt: 'Shemous Beverages Official Logo',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#004D40',
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
        
        {/* Suppress aggressive browser extension hydration warnings */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Instantly strip rogue extension attributes to prevent React hydration crashes
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((m) => {
                    if (m.type === 'attributes' && m.attributeName === 'bis_skin_checked') {
                      m.target.removeAttribute('bis_skin_checked');
                    }
                    m.addedNodes.forEach(node => {
                      if (node.nodeType === 1) {
                        if (node.hasAttribute('bis_skin_checked')) node.removeAttribute('bis_skin_checked');
                        node.querySelectorAll('[bis_skin_checked]').forEach(el => el.removeAttribute('bis_skin_checked'));
                      }
                    });
                  });
                });
                observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });

                const originalError = console.error;
                console.error = function(...args) {
                  const msg = typeof args[0] === 'string' ? args[0] : args.join(' ');
                  if (msg.includes('bis_skin_checked') || msg.includes('Hydration') || msg.includes('hydrated')) {
                    return;
                  }
                  originalError.apply(console, args);
                };
                window.addEventListener('error', function(e) {
                  if (e.message && (e.message.includes('bis_skin_checked') || e.message.includes('Hydration') || e.message.includes('hydrated'))) {
                    e.stopImmediatePropagation();
                  }
                });
              }
            `
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} ${cormorant.variable} ${gochiHand.variable}`} style={{ backgroundColor: 'var(--background)' }} suppressHydrationWarning>
        <div className="noise-overlay" suppressHydrationWarning />
        <ClientLayout>
            {children}
        </ClientLayout>

        {/* Structured Data / JSON-LD for Search Engines - Placed at end of body to prevent hydration mismatch from extensions */}
        <script
          id="json-ld-organization"
          type="application/ld+json"
          suppressHydrationWarning
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
                telephone: '+256-000-000000',
                contactType: 'Customer Service',
                areaServed: 'Global',
                availableLanguage: ['English']
              }
            })
          }}
        />
        <script
          id="json-ld-website"
          type="application/ld+json"
          suppressHydrationWarning
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
      </body>
    </html>
  )
}
