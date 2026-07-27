import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCallBar } from "@/components/MobileCallBar";
import { Providers } from "@/components/Providers";
import { business, google } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://djehamiehairbraiding.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Djehamie Hair Braiding | Professional African Braiding in Chicago",
    template: "%s · Djehamie Hair Braiding",
  },
  description: "Family-owned African hair braiding salon in Chicago (3111 W Armitage Ave). Boho knotless, box braids, twists, cornrows for women & men. Rated 4.8 ★ on Google. Book by text at (773) 801-9351, the only official number.",
  keywords: ["hair braiding Chicago","African braider Chicago","box braids Chicago","knotless braids Chicago","men braids Chicago"],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: business.name,
    title: "Djehamie Hair Braiding | Professional African Braiding in Chicago",
    description: "Boho knotless, box braids, twists & cornrows for women & men. 4.8 ★ on Google. Book by text at the official number.",
    images: [{ url: "/images/femme/knotless-longues.png", width: 784, height: 1036, alt: business.name }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: business.name,
  image: `${SITE_URL}/images/femme/knotless-longues.png`,
  url: SITE_URL,
  telephone: business.phone,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "3111 W Armitage Ave",
    addressLocality: "Chicago",
    addressRegion: "IL",
    postalCode: "60647",
    addressCountry: "US",
  },
  geo: { "@type": "GeoCoordinates", latitude: 41.9175, longitude: -87.7067 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
    opens: "08:00",
    closes: "23:00",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: google.rating,
    reviewCount: google.reviewCount,
    bestRating: 5,
  },
  sameAs: [business.instagram, business.facebook, business.tiktok],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Widget Elfsight - avis Google en direct (section témoignages) */}
        <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileCallBar />
        </Providers>
      </body>
    </html>
  );
}
