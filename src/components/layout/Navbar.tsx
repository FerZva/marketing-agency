import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.services, href: "#services" },
    { name: t.nav.about, href: "#about" },
    { name: t.nav.testimonials, href: "#testimonials" },
    { name: t.nav.pricing, href: "#pricing" },
    { name: t.nav.faq, href: "#faq" },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
              SMG
            </span>
            <span className="hidden text-sm font-medium text-zinc-500 sm:inline-block">
              Social Media Growth
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-600 hover:text-violet-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center gap-4 ml-2 border-l border-zinc-200 pl-6">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 hover:text-violet-600 transition-colors px-3 py-1.5 rounded-full bg-zinc-100/80 hover:bg-zinc-200/80"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'es' ? 'ES' : 'EN'}</span>
              </button>
              <Button variant="gradient" asChild>
                <a href="#contact">{t.nav.getStarted}</a>
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Toggle & Lang */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-medium text-zinc-600 px-2.5 py-1.5 rounded-full bg-zinc-100"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'es' ? 'ES' : 'EN'}
            </button>
            <button
              className="p-2 text-zinc-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-zinc-100 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-zinc-600 py-2 border-b border-zinc-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button variant="gradient" asChild className="mt-2 w-full">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {t.nav.getStarted}
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
