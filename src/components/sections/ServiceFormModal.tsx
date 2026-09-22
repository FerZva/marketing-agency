import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, DollarSign, Clock } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { AGENCY_CONFIG } from '@/src/lib/constants';
import { toast } from 'sonner';

export function ServiceFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We use formsubmit.co to send the email directly to the agency's primary inbox
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${AGENCY_CONFIG.email}`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success(t.services.form.success);
        form.reset();
        onClose();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.97 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[640px] md:max-h-[90vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/80">
              <div>
                <h2 className="text-xl font-bold text-zinc-900">{t.services.form.title}</h2>
                <p className="text-xs text-zinc-500 mt-0.5">SMG Marketing Agency • Cotización directa</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-200/70 rounded-full transition-colors"
                aria-label="Cerrar modal"
              >
                <X size={20} className="text-zinc-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-spam honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Nueva Solicitud de Servicio - SMG Marketing" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {t.services.form.firstName}
                    </label>
                    <input
                      required
                      type="text"
                      name="First Name"
                      className="w-full p-2.5 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {t.services.form.lastName}
                    </label>
                    <input
                      required
                      type="text"
                      name="Last Name"
                      className="w-full p-2.5 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {t.services.form.email}
                    </label>
                    <input
                      required
                      type="email"
                      name="Email"
                      className="w-full p-2.5 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      {t.services.form.phone}
                    </label>
                    <input
                      required
                      type="tel"
                      name="Phone"
                      placeholder="+504 0000-0000"
                      className="w-full p-2.5 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    {t.services.form.company}
                  </label>
                  <input
                    required
                    type="text"
                    name="Company"
                    className="w-full p-2.5 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                  />
                </div>

                {/* Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      <DollarSign className="w-3.5 h-3.5 text-violet-600" />
                      {t.services.form.budget}
                    </label>
                    <select
                      name="Estimated Budget"
                      defaultValue=""
                      className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-800 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    >
                      <option value="" disabled>
                        {t.services.form.budgetPlaceholder}
                      </option>
                      {t.services.form.budgetOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-700">
                      <Clock className="w-3.5 h-3.5 text-violet-600" />
                      {t.services.form.timeline}
                    </label>
                    <select
                      name="Estimated Timeline"
                      defaultValue=""
                      className="w-full p-2.5 rounded-lg border border-zinc-200 bg-white text-zinc-800 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-sm"
                    >
                      <option value="" disabled>
                        {t.services.form.timelinePlaceholder}
                      </option>
                      {t.services.form.timelineOptions.map((opt, idx) => (
                        <option key={idx} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    {t.services.form.services}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {t.services.items.map((service, idx) => (
                      <label
                        key={idx}
                        className="flex items-start space-x-2.5 p-2.5 rounded-lg border border-zinc-200 cursor-pointer hover:bg-violet-50/50 hover:border-violet-200 transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="Services[]"
                          value={service.title}
                          className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-violet-600 focus:ring-violet-500"
                        />
                        <span className="text-xs font-medium text-zinc-700 leading-tight">
                          {service.title}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    {t.services.form.details}
                  </label>
                  <textarea
                    name="Details"
                    rows={3}
                    placeholder="Cuéntanos más sobre tu proyecto, objetivos o requerimientos especiales..."
                    className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all resize-none text-sm"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full shadow-lg shadow-violet-500/20"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando solicitud..." : t.services.form.submit}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
