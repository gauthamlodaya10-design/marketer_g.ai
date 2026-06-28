import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { brand } from '@/data/siteData';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Get a Free AI Audit | MarketerG AI</title>
        <meta name="description" content="Tell us about your business and get a free AI audit — we’ll show you what to automate first and what it’s worth. AI automation, agents and marketing." />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">
            Get your free AI audit
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tell us about your business and your biggest time-wasters. We’ll show you exactly what
            AI can take off your plate — and what it’s worth. No jargon, no obligation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <ContactForm />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="gradient-border p-6 rounded-lg bg-card">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-6">Prefer to reach out directly?</h2>
              <div className="space-y-4">
                <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <span className="text-foreground group-hover:text-primary transition-colors">Chat with us</span>
                  </div>
                </a>
                <a href={`mailto:${brand.email}`} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <span className="text-foreground group-hover:text-primary transition-colors">{brand.email}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="gradient-border p-6 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-heading text-lg font-semibold text-foreground">Fast & remote</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We reply within 24 hours. Most projects start with a small pilot you can see in days
                to a couple of weeks. Fully remote — we work with businesses across India and beyond.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
