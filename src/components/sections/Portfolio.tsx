import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Sparkles, ArrowUpRight, CheckCircle2, Video, Camera, Globe, Target } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "@/src/components/ui/button";
import { ServiceFormModal } from "./ServiceFormModal";

export function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filters = [
    { id: "all", label: t.portfolio.filterAll, icon: Sparkles },
    { id: "video", label: t.portfolio.filterVideo, icon: Video },
    { id: "photo", label: t.portfolio.filterPhoto, icon: Camera },
    { id: "web", label: t.portfolio.filterWeb, icon: Globe },
    { id: "social", label: t.portfolio.filterSocial, icon: Target },
  ];

  const filteredItems = activeFilter === "all"
    ? t.portfolio.items
    : t.portfolio.items.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-zinc-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.portfolio.tagline}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            {t.portfolio.title1}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-300 to-purple-400">
              {t.portfolio.titleHighlight}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 leading-relaxed"
          >
            {t.portfolio.subtitle}
          </motion.p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                      : "bg-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-700/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl bg-zinc-800/60 border border-zinc-700/60 hover:border-violet-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-950/40"
              >
                {/* Media Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                    {item.categoryLabel}
                  </span>

                  {/* Impact Metric Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-600/90 backdrop-blur-md text-white shadow-md">
                      <TrendingUp className="w-3.5 h-3.5 text-violet-200" />
                      {item.metric}
                    </span>
                    <span className="text-xs font-medium text-zinc-300 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded">
                      {item.client}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-700/50">
                    <div className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-white font-semibold">{t.portfolio.deliverableLabel} </strong>
                        {item.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-violet-950/40 via-zinc-900 to-indigo-950/40 border border-violet-500/20 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-white mb-1">{t.portfolio.ctaText}</h4>
            <p className="text-sm text-zinc-400">Diseñamos una estrategia a la medida de tu presupuesto y objetivos.</p>
          </div>
          <Button
            variant="gradient"
            size="lg"
            className="shadow-lg shadow-violet-500/25 whitespace-nowrap"
            onClick={() => setIsFormOpen(true)}
          >
            <span>{t.portfolio.ctaBtn}</span>
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>

      <ServiceFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}
