import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Package,
  Trophy,
  Utensils,
  Car,
  Megaphone,
  Palette,
  ArrowUpRight,
  CheckCircle2,
  MapPin,
  TrendingUp,
  X,
  Layers,
  Wrench,
  ExternalLink,
  Quote
} from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { Button } from "@/src/components/ui/button";
import { ServiceFormModal } from "./ServiceFormModal";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  location?: string;
  category: string;
  categoryLabel: string;
  metric: string;
  deliverable: string;
  tools?: string[];
  description: string;
  fullChallenge?: string;
  fullSolution?: string;
  image: string;
}

export function Portfolio() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filters = [
    { id: "all", label: t.portfolio.filterAll, icon: Sparkles },
    { id: "branding", label: t.portfolio.filterBranding, icon: Palette },
    { id: "packaging", label: t.portfolio.filterPackaging, icon: Package },
    { id: "advertising", label: t.portfolio.filterAdvertising, icon: Megaphone },
    { id: "gastronomy", label: t.portfolio.filterGastronomy, icon: Utensils },
    { id: "automotive", label: t.portfolio.filterAutomotive, icon: Car },
    { id: "sports", label: t.portfolio.filterSports, icon: Trophy },
  ];

  const items: PortfolioItem[] = t.portfolio.items;

  const filteredItems = activeFilter === "all"
    ? items
    : items.filter((item) => item.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-zinc-950 text-white relative overflow-hidden border-t border-zinc-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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
            className="text-base md:text-lg text-zinc-400 leading-relaxed mb-6"
          >
            {t.portfolio.subtitle}
          </motion.p>

          {/* Creative Studio Pedigree Card */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="p-4 md:p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-left max-w-2xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-violet-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs md:text-sm text-zinc-300 italic mb-1.5 leading-snug">
                  {t.portfolio.studioQuote}
                </p>
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  <span>{t.portfolio.studioBadge}</span>
                </div>
              </div>
            </div>

            <a
              href={t.portfolio.behanceUrl || "https://www.behance.net/undergrounddigital"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600/20 text-violet-300 hover:bg-violet-600 hover:text-white transition-all whitespace-nowrap self-end sm:self-center border border-violet-500/30"
            >
              <span>{t.portfolio.behanceLinkText}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                      : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"
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
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedProject(item)}
                className="group cursor-pointer rounded-2xl bg-zinc-900 border border-zinc-800/80 hover:border-violet-500/50 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-950/40"
              >
                {/* Visual Media Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent" />

                  {/* Impact Metric & Quick Click */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5 font-bold text-violet-300 bg-zinc-950/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-violet-500/20">
                      <TrendingUp className="w-3.5 h-3.5 text-violet-400" />
                      {item.metric}
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-300 font-medium group-hover:text-white transition-colors bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                      <span>{t.portfolio.viewDetails}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-violet-400" />
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata (Zero-Pill Compliance) */}
                    <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2 font-medium">
                      <span className="text-violet-400 uppercase tracking-wider font-semibold">
                        {item.categoryLabel}
                      </span>
                      <span aria-hidden="true" className="text-zinc-600">·</span>
                      <span className="text-zinc-300">{item.client}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2">
                    {/* Deliverable info */}
                    <div className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">
                        <strong className="text-white font-semibold">{t.portfolio.deliverableLabel} </strong>
                        {item.deliverable}
                      </span>
                    </div>

                    {/* Tools & Disciplines */}
                    {item.tools && item.tools.length > 0 && (
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
                        <Wrench className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                        <span className="truncate">
                          {item.tools.join(" · ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Section Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-violet-950/40 via-zinc-900 to-indigo-950/40 border border-violet-500/20 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h4 className="text-xl font-bold text-white mb-1">{t.portfolio.ctaText}</h4>
            <p className="text-sm text-zinc-400">
              Diseñamos marcas y estrategias audiovisuales a la medida de tus objetivos.
            </p>
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

      {/* Case Study Full Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[750px] md:max-h-[90vh] bg-zinc-900 md:rounded-2xl border border-zinc-700/80 shadow-2xl flex flex-col overflow-hidden text-white"
            >
              {/* Modal Top Media Banner */}
              <div className="relative aspect-[16/8] w-full overflow-hidden bg-zinc-950 flex-shrink-0">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors backdrop-blur-sm border border-white/20"
                  aria-label={t.portfolio.closeDetails}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Overlay Badges */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <span className="font-semibold text-violet-400 uppercase tracking-wider">
                      {selectedProject.categoryLabel}
                    </span>
                    <span aria-hidden="true" className="text-zinc-500">·</span>
                    <span>{selectedProject.client}</span>
                  </div>
                  {selectedProject.location && (
                    <span className="flex items-center gap-1 text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-violet-400" />
                      {selectedProject.location}
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Challenge & Solution */}
                {selectedProject.fullChallenge && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
                    <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        {t.portfolio.challengeLabel}
                      </h5>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                        {selectedProject.fullChallenge}
                      </p>
                    </div>

                    <div className="bg-zinc-950/60 p-4 rounded-xl border border-zinc-800">
                      <h5 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {t.portfolio.solutionLabel}
                      </h5>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                        {selectedProject.fullSolution}
                      </p>
                    </div>
                  </div>
                )}

                {/* Deliverables & Impact */}
                <div className="bg-gradient-to-r from-violet-950/30 to-zinc-950/80 p-4 rounded-xl border border-violet-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                      {t.portfolio.deliverableLabel}
                    </div>
                    <div className="text-sm text-white font-medium">
                      {selectedProject.deliverable}
                    </div>
                  </div>

                  <div className="sm:text-right flex-shrink-0">
                    <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                      {t.portfolio.metricLabel}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-400">
                      <TrendingUp className="w-4 h-4" />
                      {selectedProject.metric}
                    </div>
                  </div>
                </div>

                {/* Tools & Disciplines */}
                {selectedProject.tools && selectedProject.tools.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                      {t.portfolio.toolsLabel}
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/60 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    {t.portfolio.closeDetails}
                  </button>

                  <Button
                    variant="gradient"
                    size="md"
                    className="w-full sm:w-auto shadow-lg shadow-violet-600/30"
                    onClick={() => {
                      setSelectedProject(null);
                      setIsFormOpen(true);
                    }}
                  >
                    <span>{t.portfolio.ctaBtn}</span>
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ServiceFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
}
