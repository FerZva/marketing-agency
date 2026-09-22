import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { AGENCY_CONFIG } from "@/src/lib/constants";

export function WhatsAppWidget() {
  const { t } = useLanguage();
  const whatsappUrl = `https://wa.me/${AGENCY_CONFIG.phoneDigits}?text=${encodeURIComponent(t.whatsapp.message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
