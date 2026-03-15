import { motion } from "motion/react";
import { Button } from "@/src/components/ui/button";
import { ArrowRight, Star, TrendingUp, Users, BarChart3, Target } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden min-h-[100svh] flex flex-col justify-center">
      {/* Background decoration with two soft color blobs */}
      <div className="absolute inset-0 -z-10 bg-zinc-50 overflow-hidden">
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, #fbe2e3 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: '-100px',
            left: '-150px',
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, #dbd7fb 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-violet-200 bg-white/60 backdrop-blur-md px-4 py-1.5 text-sm font-medium text-violet-800 mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2 mr-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            {t.hero.badge} {new Date().getFullYear()}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 mb-6 leading-[1.05]"
          >
            {t.hero.title1}<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600">{t.hero.titleHighlight}</span>{t.hero.title2}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 mb-10 max-w-2xl font-medium leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button variant="gradient" size="lg" className="h-14 px-8 text-base rounded-full shadow-lg shadow-violet-500/25" asChild>
              <a href="#contact">
                {t.hero.cta1} <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-white/50 backdrop-blur-sm border-zinc-200 hover:bg-white/80" asChild>
              <a href="#services">{t.hero.cta2}</a>
            </Button>
          </motion.div>

          {/* Social Proof Avatars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
              ].map((src, i) => (
                <img key={i} src={src} alt="Client avatar" className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm" referrerPolicy="no-referrer" />
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex gap-1 text-amber-400 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="text-sm font-medium text-zinc-600">{t.hero.trusted}</p>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Mockup Showpiece */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring", bounce: 0.4 }}
          className="relative mx-auto mt-16 md:mt-24 max-w-5xl"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-[24px] blur opacity-20"></div>
          <div className="relative rounded-2xl border border-white/40 bg-white/40 p-2 backdrop-blur-2xl shadow-2xl">
            <div className="rounded-xl border border-zinc-200/50 bg-white/90 shadow-sm overflow-hidden">
              {/* Mockup Header */}
              <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs font-medium text-zinc-500 ml-2 flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-violet-100 flex items-center justify-center">
                    <BarChart3 className="h-2.5 w-2.5 text-violet-600" />
                  </div>
                  campaign-performance.smg
                </div>
              </div>
              
              {/* Mockup Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
                {/* Metric 1 */}
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-4 md:p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                    <Users className="h-4 w-4 text-violet-500" /> {t.hero.metrics.reach}
                  </div>
                  <div className="text-3xl font-bold text-zinc-900">2.4M</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                    <TrendingUp className="h-3 w-3" /> +24.5% {t.hero.metrics.thisMonth}
                  </div>
                </div>
                {/* Metric 2 */}
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-4 md:p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                    <Target className="h-4 w-4 text-fuchsia-500" /> {t.hero.metrics.conversions}
                  </div>
                  <div className="text-3xl font-bold text-zinc-900">12,450</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                    <TrendingUp className="h-3 w-3" /> +18.4% {t.hero.metrics.thisMonth}
                  </div>
                </div>
                {/* Metric 3 */}
                <div className="flex flex-col gap-2 rounded-xl border border-zinc-100 bg-white p-4 md:p-5 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-500">
                    <BarChart3 className="h-4 w-4 text-indigo-500" /> {t.hero.metrics.roas}
                  </div>
                  <div className="text-3xl font-bold text-zinc-900">4.2x</div>
                  <div className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-md">
                    <TrendingUp className="h-3 w-3" /> +1.2x {t.hero.metrics.thisMonth}
                  </div>
                </div>
              </div>

              {/* Fake Chart Area */}
              <div className="px-4 md:px-6 pb-4 md:pb-6">
                <div className="h-40 md:h-56 w-full rounded-xl bg-zinc-50/50 border border-zinc-100 flex items-end justify-between p-4 gap-1 sm:gap-2">
                  {[30, 45, 35, 60, 50, 75, 90, 85, 110, 130, 100, 150].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}px` }}
                      transition={{ duration: 1, delay: 1 + i * 0.05, ease: "easeOut" }}
                      className="w-full bg-gradient-to-t from-violet-500 to-fuchsia-400 rounded-t-sm md:rounded-t-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {t.hero.metrics.week} {i + 1}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
