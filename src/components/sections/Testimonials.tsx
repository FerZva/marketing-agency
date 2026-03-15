import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

const avatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
];

const authors = [
  "Sarah Jenkins",
  "David Chen",
  "Elena Rodriguez"
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6"
          >
            {t.testimonials.title1}<span className="italic font-serif text-violet-600">{t.testimonials.titleHighlight}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.testimonials.quotes.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 relative flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-zinc-700 text-lg mb-8 leading-relaxed italic flex-grow">
                "{quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={avatars[index]} 
                  alt={authors[index]} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-zinc-900">{authors[index]}</h4>
                  <p className="text-sm text-zinc-500">{t.testimonials.roles[index]}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
