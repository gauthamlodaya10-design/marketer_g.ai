import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/data/siteData';

export default function ServicesPage() {
  return (
    <>
      <Helmet>
        <title>Services — AI Automation, Agents & Marketing | MarketerG AI</title>
        <meta name="description" content="Workflow automation, AI agents & chatbots, AI-powered marketing, custom AI solutions, internal AI assistants, and AI strategy." />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">What We Do</h1>
          <p className="text-lg text-muted-foreground">
            AI that automates your busywork and grows your business — strategy by humans,
            execution at the speed of AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`hover-lift rounded-lg p-8 flex flex-col border ${
                  service.featured ? 'gradient-border bg-card' : 'bg-card border-border'
                }`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">{service.title}</h2>
                <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{service.blurb}</p>
                <ul className="space-y-2 mb-8">
                  {service.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="outline" className="w-full mt-auto">
                  <Link to="/contact">Get a Quote</Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20 gradient-border bg-card rounded-lg p-10 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
            Not sure what to automate first?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start with a free AI audit. We’ll map your biggest time-wasters and show you the
            highest-impact wins — no jargon, no obligation.
          </p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link to="/contact">Get a Free AI Audit<ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
