// app/layout.tsx
import type { Metadata } from "next";
import { italiana, gothamOffice } from "./utils/constants";
import Header from "./home/Header";
import Footer from "./home/Footer";
import "./globals.css";

function getCanonicalUrl(path: string = "") {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://thehouseoftutuacademy.com";
  return `${baseUrl}${path}`;
}

export const metadata: Metadata = {
  title: {
    default:
      "The House of Tutu Perfumery Academy | Luxury Fragrance Business School",
    template: "%s | The House of Tutu Perfumery Academy",
  },
  description:
    "Nigeria's premier commercial perfumery academy. Master fragrance creation, perfume business, and scent branding with industry-level training from expert perfumers in Abuja. Enroll in our 2-week masterclass.",
  keywords: [
    "perfumery academy",
    "fragrance school",
    "perfume making course",
    "luxury perfume",
    "commercial perfumery",
    "Nigeria",
    "Abuja",
    "fragrance business",
    "scent creation",
    "The House of Tutu",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: getCanonicalUrl(),
    siteName: "The House of Tutu Perfumery Academy",
    title:
      "The House of Tutu Perfumery Academy | Luxury Fragrance Business School",
    description:
      "Nigeria's premier commercial perfumery academy. Master the art and business of luxury fragrance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The House of Tutu Perfumery Academy - Master the Art of Luxury Fragrance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The House of Tutu Perfumery Academy | Luxury Fragrance Business School",
    description:
      "Nigeria's premier commercial perfumery academy. Master the art and business of luxury fragrance.",
    images: ["/og-image.png"],
    creator: "@thehouseoftutuacademy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Canonical URL to specify the preferred version of this page[citation:1]
  alternates: {
    canonical: getCanonicalUrl(),
  },
  // Verification for Google Search Console (replace with your own)
  verification: {
    google: "your-google-search-console-verification-code",
  },
  // Other useful meta tags
  authors: [{ name: "The House of Tutu Perfumery Academy" }],
  publisher: "The House of Tutu Perfumery Academy",
  formatDetection: {
    telephone: true,
    date: false,
    address: false,
    email: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Structured Data for the Organization (crucial for SEO)[citation:5]
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "The House of Tutu Perfumery Academy",
    alternateName: "House of Tutu Academy",
    description: metadata.description,
    url: getCanonicalUrl(),
    logo: getCanonicalUrl("/logo.png"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abuja",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-911-264-4027",
      contactType: "admissions",
      areaServed: "NG",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.instagram.com/houseoftutu/",
      "https://www.facebook.com/houseoftutu/",
    ],
  };

  return (
    <html
      lang="en"
      className={`${gothamOffice.className} ${italiana.className} scroll-smooth`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* JSON-LD Structured Data - Injected into the head */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white antialiased">
        {/* Use semantic landmark roles for better accessibility and SEO[citation:5] */}
        <div className="min-h-screen flex flex-col">
          <Header />
          <main role="main" className="flex-grow">
            {children}
          </main>{" "}
          {/* Main content area */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
