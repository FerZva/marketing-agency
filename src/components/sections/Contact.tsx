import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useLanguage } from "@/src/contexts/LanguageContext";

type FormData = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const { t } = useLanguage();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call to Supabase/Clerk or email service
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-zinc-950 text-zinc-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">
              {t.contact.title1}<span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">{t.contact.titleHighlight}</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-12 max-w-md leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t.contact.call}</h3>
                  <p className="text-zinc-400">+504 3177-0881</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t.contact.email}</h3>
                  <p className="text-zinc-400">hello@smgagency.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">{t.contact.visit}</h3>
                  <p className="text-zinc-400">{t.contact.location1}<br />{t.contact.location2}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 text-zinc-900 shadow-xl border border-zinc-100"
          >
            <h3 className="text-2xl font-bold mb-6">{t.contact.formTitle}</h3>
            
            {isSuccess ? (
              <div className="bg-violet-50 text-violet-800 p-6 rounded-xl border border-violet-200 text-center">
                <h4 className="text-lg font-semibold mb-2">{t.contact.successTitle}</h4>
                <p>{t.contact.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-zinc-700">{t.contact.nameLabel}</label>
                    <Input 
                      id="name" 
                      placeholder={t.contact.namePlaceholder} 
                      {...register("name", { required: t.contact.nameReq })}
                      className={`focus-visible:ring-violet-500 ${errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-zinc-700">{t.contact.emailLabel}</label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder={t.contact.emailPlaceholder} 
                      {...register("email", { 
                        required: t.contact.emailReq,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: t.contact.emailInv
                        }
                      })}
                      className={`focus-visible:ring-violet-500 ${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-zinc-700">{t.contact.companyLabel}</label>
                  <Input 
                    id="company" 
                    placeholder={t.contact.companyPlaceholder} 
                    {...register("company")}
                    className="focus-visible:ring-violet-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-zinc-700">{t.contact.msgLabel}</label>
                  <Textarea 
                    id="message" 
                    placeholder={t.contact.msgPlaceholder} 
                    className={`min-h-[150px] resize-none focus-visible:ring-violet-500 ${errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                    {...register("message", { required: t.contact.msgReq })}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                
                <Button type="submit" variant="gradient" className="w-full h-12 text-base" disabled={isSubmitting}>
                  {isSubmitting ? t.contact.submitting : (
                    <>
                      {t.contact.submit} <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
