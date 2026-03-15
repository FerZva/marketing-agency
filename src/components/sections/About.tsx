import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our team working together"
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl -z-10 hidden md:block opacity-90"></div>
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-fuchsia-100 rounded-full -z-10 hidden md:block"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6">
              {t.about.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{t.about.titleHighlight}</span>{t.about.title2}
            </h2>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              {t.about.p1}
            </p>
            <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
              {t.about.p2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.about.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="text-violet-600 h-5 w-5 flex-shrink-0" />
                  <span className="text-zinc-800 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
