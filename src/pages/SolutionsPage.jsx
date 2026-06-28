import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatDemo from '@/components/ChatDemo';
import { useCases } from '@/data/siteData';

export default function SolutionsPage() {
  return (
    <>
      <Helmet>
        <title>Solutions & Demos — Real AI Use-Cases | MarketerG AI</title>
        <meta name="description" content="See real AI solutions in action: 24/7 support bots, instant lead follow-up, and document automation. Try the live AI assistant demo." />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">Solutions in action</h1>
          <p className="text-lg text-muted-foreground">
            Real problems, solved with AI. Here’s a taste of what we build — and a live demo you can try.
          </p>
        </motion.div>

        {/* Live demo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="text-center text-sm font-mono uppercase tracking-wide text-accent mb-6">Try it live 👇</p>
          <ChatDemo />
        </motion.div>

        {/* Use cases */}
        <div className="space-y-10 max-w-5xl mx-auto">
          {useCases.map((uc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="gradient-border bg-card rounded-lg overflow-hidden"
            >
              <div className={`relative h-36 bg-gradient-to-br ${uc.gradient} flex items-center justify-center`}>
                <span className="text-6xl" role="img" aria-label={uc.tag}>{uc.emoji}</span>
                <span className="absolute top-4 left-4 text-xs font-mono uppercase tracking-wide bg-background/70 backdrop-blur px-3 py-1 rounded-full text-foreground">
                  {uc.tag}
                </span>
              </div>
              <div className="p-8 md:p-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">{uc.title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">The Problem</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">Our Solution</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-primary font-semibold mb-2">The Outcome</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{uc.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Got a problem you want solved?
          </h2>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-8 py-6 text-lg">
            <Link to="/contact">Tell Us About It<ArrowRight className="w-5 h-5 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
