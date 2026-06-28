import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/MetricCard';
import ChatDemo from '@/components/ChatDemo';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { heroStats, services, howItWorks, whyUs, proofPoints, faqs } from '@/data/siteData';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const [metricsRef, , hasMetricsIntersected] = useIntersectionObserver({ threshold: 0.3 });

  return (
    <>
      <Helmet>
        <title>MarketerG AI — AI Automation, Agents & Marketing for Businesses</title>
        <meta name="description" content="Automate busywork, deploy AI agents, and grow with AI-powered marketing. AI speed, human judgment. Get a free AI audit." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px]"></div>

        <div className="relative z-10 container mx-auto grid lg:grid-cols-2 gap-12 items-center py-24">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              AI automation & solutions
            </span>

            <h1 className="font-heading font-bold text-4xl md:text-6xl leading-[1.05] mb-6">
              <span className="text-foreground">Put your business on </span>
              <span className="gradient-text">autopilot</span>
              <span className="text-foreground"> with AI.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              We automate your busywork, build AI agents that work 24/7, and run AI-powered
              marketing — combining <span className="text-foreground font-medium">AI speed with human strategy</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
                <Link to="/contact">
                  Get a Free AI Audit
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg font-semibold">
                <Link to="/services">See What We Do</Link>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6">
              👉 Try the live AI assistant — it’s an example of what we build.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <ChatDemo />
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section ref={metricsRef} className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {heroStats.map((s, i) => (
              <MetricCard key={i} value={s.value} prefix={s.prefix} suffix={s.suffix} label={s.label} animated triggerAnimation={hasMetricsIntersected} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">What we automate & build</h2>
            <p className="text-lg text-muted-foreground">From boring busywork to custom AI tools — one partner for all of it.</p>
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
                  className={`hover-lift rounded-lg p-7 border ${service.featured ? 'gradient-border bg-card' : 'bg-card border-border'}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{service.blurb}</p>
                  <ul className="space-y-2">
                    {service.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link to="/services">Explore all services<ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works (AI + human) */}
      <section className="py-24 px-4 bg-card border-y border-border">
        <div className="container mx-auto">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">AI speed. Human judgment.</h2>
            <p className="text-lg text-muted-foreground">Our four-step way of shipping AI that actually works for you.</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mx-auto w-14 h-14 rounded-full gradient-border bg-card flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-mono text-accent">STEP {index + 1}</span>
                  <h3 className="font-heading text-lg font-semibold text-foreground mt-1 mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <motion.div {...fadeUp} className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">Why MarketerG AI</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We’re an AI-native company founded on real marketing results. We don’t just talk AI —
                we run on it, and we’ll prove it on your business.
              </p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                <Link to="/contact">Book your free audit<ArrowRight className="w-4 h-4 ml-2" /></Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {whyUs.map((item, i) => (
                <div key={i} className="gradient-border bg-card rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof points */}
      <section className="py-16 px-4 bg-card border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {proofPoints.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-2">{p.stat}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <motion.div {...fadeUp} className="text-center mb-14">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">Questions, answered</h2>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <h3 className="font-heading font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="container mx-auto text-center max-w-2xl">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Let AI do the boring stuff.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a free AI audit — we’ll show you exactly what to automate first and what it’s worth.
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
              <Link to="/contact">Get a Free AI Audit<ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
