import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  return (
    <section id="faq" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6"
          >
            {t.faq.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{t.faq.titleHighlight}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600"
          >
            {t.faq.subtitle}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {t.faq.items.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 text-left rounded-2xl transition-colors ${
                  openIndex === index ? "bg-violet-50" : "bg-zinc-50 hover:bg-zinc-100"
                }`}
              >
                <span className="font-semibold text-zinc-900 pr-8">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-500 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180 text-violet-600" : ""
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-2 text-zinc-600 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
