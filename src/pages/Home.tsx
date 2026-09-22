import { Helmet } from "react-helmet-async";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { WhatsAppWidget } from "@/src/components/layout/WhatsAppWidget";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { Portfolio } from "@/src/components/sections/Portfolio";
import { About } from "@/src/components/sections/About";
import { Pricing } from "@/src/components/sections/Pricing";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { FAQ } from "@/src/components/sections/FAQ";
import { Contact } from "@/src/components/sections/Contact";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { AGENCY_CONFIG } from "@/src/lib/constants";

export default function Home() {
  const { t, language } = useLanguage();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    "name": AGENCY_CONFIG.name,
    "alternateName": "SMG",
    "description": t.seo.desc,
    "url": typeof window !== "undefined" ? window.location.origin : "https://smgagency.com",
    "telephone": AGENCY_CONFIG.phoneDisplay,
    "email": AGENCY_CONFIG.email,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Tegucigalpa",
      "addressCountry": "HN"
    },
    "sameAs": [
      AGENCY_CONFIG.instagramUrl
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Marketing y Crecimiento Digital",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Management & Growth"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Production & Commercial Photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web and Mobile App Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Paid Media & Ad Campaigns (Meta, TikTok, Google)"
          }
        }
      ]
    }
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "https://smgagency.com";

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.desc} />
        <meta
          name="keywords"
          content="marketing agency honduras, social media growth, gestion de redes sociales, produccion de video, fotografia comercial, desarrollo web, pauta digital, SMG"
        />
        <link rel="canonical" href={currentUrl} />

        {/* OpenGraph social tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.desc} />
        <meta property="og:site_name" content="SMG Marketing Agency" />
        <meta property="og:locale" content={language === "es" ? "es_HN" : "en_US"} />
        <meta property="og:url" content={currentUrl} />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=630&q=80"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seo.title} />
        <meta name="twitter:description" content={t.seo.desc} />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=630&q=80"
        />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col font-sans text-zinc-900 bg-white selection:bg-violet-100 selection:text-violet-900">
        <Navbar />

        <main className="flex-grow">
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Testimonials />
          <Pricing />
          <FAQ />
          <Contact />
        </main>

        <Footer />
        <WhatsAppWidget />
      </div>
    </>
  );
}
