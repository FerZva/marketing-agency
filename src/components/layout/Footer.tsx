import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-950 text-zinc-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <a href="#" className="inline-block mb-4">
              <span className="text-2xl font-bold tracking-tighter text-white">
                SMG
              </span>
            </a>
            <p className="max-w-xs text-zinc-400 mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.services}</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="hover:text-violet-400 transition-colors">Social Media Management</a></li>
              <li><a href="#services" className="hover:text-violet-400 transition-colors">Content Creation</a></li>
              <li><a href="#services" className="hover:text-violet-400 transition-colors">Paid Advertising</a></li>
              <li><a href="#services" className="hover:text-violet-400 transition-colors">SEO Optimization</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="hover:text-violet-400 transition-colors">{t.nav.about}</a></li>
              <li><a href="#testimonials" className="hover:text-violet-400 transition-colors">{t.nav.testimonials}</a></li>
              <li><a href="#pricing" className="hover:text-violet-400 transition-colors">{t.nav.pricing}</a></li>
              <li><a href="#faq" className="hover:text-violet-400 transition-colors">{t.nav.faq}</a></li>
              <li><a href="#contact" className="hover:text-violet-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Social Media Growth. {t.footer.rights}
          </p>
          <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-medium">
            {t.footer.designed}
          </p>
        </div>
      </div>
    </footer>
  );
}
