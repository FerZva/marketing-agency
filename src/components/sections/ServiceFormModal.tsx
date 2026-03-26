import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { useLanguage } from '@/src/contexts/LanguageContext';
import { toast } from 'sonner';

export function ServiceFormModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // We use formsubmit.co to send the email directly without a backend
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/itsmeserrano18@gmail.com", {
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
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed inset-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 w-full md:w-[600px] md:max-h-[90vh] bg-white md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white">
              <h2 className="text-xl font-bold text-zinc-900">{t.services.form.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={20} className="text-zinc-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Anti-spam honeypot */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="New Service Request from SMG Website" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">{t.services.form.firstName}</label>
                    <input required type="text" name="First Name" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">{t.services.form.lastName}</label>
                    <input required type="text" name="Last Name" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">{t.services.form.email}</label>
                    <input required type="email" name="Email" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">{t.services.form.phone}</label>
                    <input required type="tel" name="Phone" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">{t.services.form.company}</label>
                  <input required type="text" name="Company" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">{t.services.form.services}</label>
                  <select multiple required name="Services[]" className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all min-h-[120px]">
                    {t.services.items.map((service, idx) => (
                      <option key={idx} value={service.title}>{service.title}</option>
                    ))}
                  </select>
                  <p className="text-xs text-zinc-500">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700">{t.services.form.details}</label>
                  <textarea name="Details" rows={4} className="w-full p-3 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all resize-none"></textarea>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "..." : t.services.form.submit}
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
