import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-20 md:py-32 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-zinc-900 mb-6"
          >
            {t.pricing.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">{t.pricing.titleHighlight}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-zinc-600"
          >
            {t.pricing.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t.pricing.plans.map((plan, index) => {
            const isPopular = index === 1;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col p-8 rounded-3xl bg-white ${
                  isPopular 
                    ? "border-2 border-violet-500 shadow-xl scale-100 md:scale-105 z-10" 
                    : "border border-zinc-200 shadow-sm"
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full whitespace-nowrap">
                      {t.pricing.popular}
                    </span>
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">{plan.name}</h3>
                  <p className="text-zinc-500 text-sm h-10">{plan.description}</p>
                </div>
                
                <div className="mb-8 flex items-baseline text-zinc-900">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  {index !== 2 && <span className="text-zinc-500 ml-1 font-medium">{t.pricing.month}</span>}
                </div>
                
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-violet-500 flex-shrink-0" />
                      <span className="text-zinc-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={isPopular ? "gradient" : "outline"} 
                  size="lg" 
                  className="w-full rounded-xl"
                  asChild
                >
                  <a href="#contact">{plan.buttonText}</a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
