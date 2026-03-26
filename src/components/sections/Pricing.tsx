import { useState } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Plus, Check, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { useLanguage } from "@/src/contexts/LanguageContext";
import { useCart } from "@/src/contexts/CartContext";
import { pricingData, type Platform, EXCHANGE_RATE_USD_TO_LPS } from "@/src/lib/pricingData";
import { toast } from "sonner";

export function Pricing() {
  const { t } = useLanguage();
  const { addItem, currency } = useCart();
  const [activePlatform, setActivePlatform] = useState<Platform>('Instagram');
  
  // State for individual selections
  const [selections, setSelections] = useState<Record<string, string>>({});
  
  // State for bundle builder
  const [bundleSelections, setBundleSelections] = useState<Record<string, string>>({});

  const formatPrice = (lps: number) => {
    if (currency === 'USD') {
      return `$${(lps / EXCHANGE_RATE_USD_TO_LPS).toFixed(2)}`;
    }
    return `L ${lps.toLocaleString()}`;
  };

  const handleSelectionChange = (serviceName: string, amount: string) => {
    setSelections(prev => ({ ...prev, [serviceName]: amount }));
  };

  const handleBundleSelectionChange = (serviceName: string, amount: string) => {
    setBundleSelections(prev => ({ ...prev, [serviceName]: amount }));
  };

  const currentPlatformData = pricingData.find(p => p.platform === activePlatform);

  const handleAddToCart = (serviceName: string) => {
    const amount = selections[serviceName];
    if (!amount) return;
    
    const service = currentPlatformData?.services.find(s => s.name === serviceName);
    const option = service?.options.find(o => o.amount === amount);
    
    if (option) {
      addItem({
        platform: activePlatform,
        service: serviceName,
        amount: option.amount,
        priceLps: option.priceLps,
        quantity: 1,
        isBundle: false
      });
      toast.success(t.pricing.addedToCart);
    }
  };

  const handleAddBundleToCart = () => {
    const bundleItems: any[] = [];
    let bundleTotalLps = 0;
    
    Object.entries(bundleSelections).forEach(([serviceName, amount]) => {
      if (!amount) return;
      const service = currentPlatformData?.services.find(s => s.name === serviceName);
      const option = service?.options.find(o => o.amount === amount);
      if (option) {
        bundleItems.push({
          platform: activePlatform,
          service: serviceName,
          amount: option.amount,
          priceLps: option.priceLps,
          quantity: 1
        });
        bundleTotalLps += option.priceLps;
      }
    });

    if (bundleItems.length < 2) {
      toast.error(t.pricing.selectAtLeastTwo);
      return;
    }

    addItem({
      platform: activePlatform,
      service: 'Custom Bundle',
      amount: `${bundleItems.length} services`,
      priceLps: bundleTotalLps,
      quantity: 1,
      isBundle: true,
      bundleItems
    });
    
    setBundleSelections({});
    toast.success(t.pricing.addedToCart);
  };

  const calculateBundleTotal = () => {
    let total = 0;
    Object.entries(bundleSelections).forEach(([serviceName, amount]) => {
      if (!amount) return;
      const service = currentPlatformData?.services.find(s => s.name === serviceName);
      const option = service?.options.find(o => o.amount === amount);
      if (option) {
        total += option.priceLps;
      }
    });
    return total;
  };

  const bundleTotal = calculateBundleTotal();
  const bundleDiscountedTotal = bundleTotal * 0.8;
  const selectedBundleCount = Object.values(bundleSelections).filter(Boolean).length;

  return (
    <section id="pricing" className="py-20 md:py-32 bg-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16">
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

        {/* Platform Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {pricingData.map((data) => (
            <button
              key={data.platform}
              onClick={() => {
                setActivePlatform(data.platform);
                setSelections({});
                setBundleSelections({});
              }}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activePlatform === data.platform
                  ? 'bg-violet-600 text-white shadow-md scale-105'
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              {data.platform}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Individual Services */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
              {t.pricing.individualServices}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {currentPlatformData?.services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm flex flex-col"
                >
                  <h4 className="text-lg font-bold text-zinc-900 mb-4">{service.name}</h4>
                  
                  <div className="mb-6 flex-1">
                    <label className="block text-sm font-medium text-zinc-600 mb-2">{t.pricing.selectAmount}</label>
                    <select
                      value={selections[service.name] || ''}
                      onChange={(e) => handleSelectionChange(service.name, e.target.value)}
                      className="w-full p-3 rounded-xl border border-zinc-300 bg-zinc-50 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                    >
                      <option value="">{t.pricing.chooseOption}</option>
                      {service.options.map((opt) => (
                        <option key={opt.amount} value={opt.amount}>
                          {opt.amount} - {formatPrice(opt.priceLps)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button 
                    variant={selections[service.name] ? "gradient" : "outline"}
                    className="w-full rounded-xl"
                    disabled={!selections[service.name]}
                    onClick={() => handleAddToCart(service.name)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t.pricing.addToCart}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bundle Builder */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-violet-600 to-indigo-700 p-1 rounded-3xl shadow-xl sticky top-24"
            >
              <div className="bg-white p-6 rounded-[22px] h-full flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-violet-600" />
                  <h3 className="text-xl font-bold text-zinc-900">{t.pricing.buildBundle}</h3>
                </div>
                <p className="text-sm text-zinc-500 mb-6">
                  {t.pricing.bundleDesc1}<span className="font-bold text-violet-600">{t.pricing.bundleDesc2}</span>{t.pricing.bundleDesc3}
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  {currentPlatformData?.services.map((service) => (
                    <div key={`bundle-${service.name}`}>
                      <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                        {service.name}
                      </label>
                      <select
                        value={bundleSelections[service.name] || ''}
                        onChange={(e) => handleBundleSelectionChange(service.name, e.target.value)}
                        className="w-full p-2.5 text-sm rounded-lg border border-zinc-200 bg-zinc-50 focus:ring-2 focus:ring-violet-500 outline-none"
                      >
                        <option value="">{t.pricing.none}</option>
                        {service.options.map((opt) => (
                          <option key={opt.amount} value={opt.amount}>
                            {opt.amount} (+{formatPrice(opt.priceLps)})
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="border-t border-zinc-100 pt-4 mb-6">
                  <div className="flex justify-between text-sm text-zinc-500 mb-1">
                    <span>{t.pricing.subtotal}</span>
                    <span className={selectedBundleCount >= 2 ? "line-through" : ""}>
                      {formatPrice(bundleTotal)}
                    </span>
                  </div>
                  {selectedBundleCount >= 2 && (
                    <div className="flex justify-between text-sm text-green-600 font-medium mb-1">
                      <span>{t.pricing.bundleDiscount}</span>
                      <span>-{formatPrice(bundleTotal * 0.2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-zinc-900">{t.pricing.total}</span>
                    <span className="text-2xl font-extrabold text-violet-600">
                      {formatPrice(selectedBundleCount >= 2 ? bundleDiscountedTotal : bundleTotal)}
                    </span>
                  </div>
                </div>

                <Button 
                  variant={selectedBundleCount >= 2 ? "gradient" : "outline"}
                  className="w-full rounded-xl py-6 text-lg"
                  disabled={selectedBundleCount < 2}
                  onClick={handleAddBundleToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {selectedBundleCount < 2 ? t.pricing.selectMoreItems : t.pricing.addBundleToCart}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
