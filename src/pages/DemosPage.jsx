import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import IndustryBot from '@/components/IndustryBot';
import SavingsCalculator from '@/components/SavingsCalculator';
import { industryBots } from '@/data/demosData';

export default function DemosPage() {
  const [active, setActive] = useState(industryBots[0]);

  return (
    <>
      <Helmet>
        <title>Live Demos — Try Our AI in Action | MarketerG AI</title>
        <meta name="description" content="Play with real AI demos: industry chatbots for clinics, restaurants, real estate and e-commerce, plus an AI savings calculator. See what MarketerG AI builds." />
      </Helmet>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-5">Try it yourself</h1>
          <p className="text-lg text-muted-foreground">
            These aren’t mockups — they’re live, interactive demos of what we build. Click around. 👇
          </p>
        </motion.div>

        {/* Industry chatbots */}
        <section className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">AI chatbots, trained for any business</h2>
            <p className="text-muted-foreground">Same engine — pick an industry and chat with it.</p>
          </motion.div>

          {/* Industry tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {industryBots.map((b) => (
              <button
                key={b.id}
                onClick={() => setActive(b)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  active.id === b.id
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-card text-muted-foreground border-border hover:text-foreground hover:border-primary'
                }`}
              >
                <span role="img" aria-label={b.label}>{b.emoji}</span> {b.label}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <IndustryBot config={active} />
          </div>
        </section>

        {/* Savings calculator */}
        <section className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">How much could AI save you?</h2>
            <p className="text-muted-foreground">Drag the sliders to see your potential savings.</p>
          </motion.div>
          <div className="max-w-4xl mx-auto">
            <SavingsCalculator />
          </div>
        </section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center gradient-border bg-card rounded-lg p-10 max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">Want one of these for your business?</h2>
          <p className="text-muted-foreground mb-6">We’ll build a custom AI demo for *your* business as part of a free AI audit.</p>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
            <Link to="/contact">Get a Free AI Audit<ArrowRight className="w-4 h-4 ml-2" /></Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
