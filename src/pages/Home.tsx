import { Helmet } from "react-helmet-async";
import { Navbar } from "@/src/components/layout/Navbar";
import { Footer } from "@/src/components/layout/Footer";
import { WhatsAppWidget } from "@/src/components/layout/WhatsAppWidget";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { About } from "@/src/components/sections/About";
import { Pricing } from "@/src/components/sections/Pricing";
import { Testimonials } from "@/src/components/sections/Testimonials";
import { FAQ } from "@/src/components/sections/FAQ";
import { Contact } from "@/src/components/sections/Contact";
import { useLanguage } from "@/src/contexts/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>{t.seo.title}</title>
        <meta name="description" content={t.seo.desc} />
        <meta name="keywords" content="marketing agency, social media management, SEO, paid advertising, content creation, SMG, Social Media Group" />
        <meta property="og:title" content={t.seo.title} />
        <meta property="og:description" content={t.seo.desc} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://smgagency.com" />
      </Helmet>

      <div className="min-h-screen flex flex-col font-sans text-zinc-900 bg-white selection:bg-violet-100 selection:text-violet-900">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <Services />
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
