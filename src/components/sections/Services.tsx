import { useState } from "react";
import { motion } from "motion/react";
import { BarChart3, Megaphone, PenTool, MonitorSmartphone, Video, Camera } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "@/src/components/ui/button";
import { ServiceFormModal } from "./ServiceFormModal";

export function Services() {
  const { t } = useLanguage();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const icons = [Megaphone, PenTool, BarChart3, MonitorSmartphone, Video, Camera];

  return (
    <section id="services" className="py-20 md:py-32 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6"
          >
            {t.services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600"
          >
            {t.services.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {t.services.items.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-md">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{service.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button size="lg" onClick={() => setIsFormOpen(true)}>
            {t.services.cta}
          </Button>
        </div>
      </div>
      
      <ServiceFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}
