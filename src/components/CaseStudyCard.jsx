import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillPill from '@/components/SkillPill';
import { Button } from '@/components/ui/button';

export default function CaseStudyCard({ caseStudy }) {
  const keyMetric = caseStudy.results && caseStudy.results[0] 
    ? `${caseStudy.results[0].value}` 
    : 'View Results';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="gradient-border p-6 rounded-lg bg-card hover-lift h-full flex flex-col"
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {caseStudy.platform && caseStudy.platform.map((platform, index) => (
          <SkillPill key={index} skill={platform} variant="accent" />
        ))}
      </div>

      <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
        {caseStudy.title}
      </h3>

      {caseStudy.client_type && (
        <p className="text-sm text-muted-foreground mb-3">
          {caseStudy.client_type} · {caseStudy.industry}
        </p>
      )}

      <div className="font-mono text-3xl font-bold text-primary mb-3">
        {keyMetric}
      </div>

      <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
        {caseStudy.challenge ? caseStudy.challenge.substring(0, 120) + '...' : ''}
      </p>

      <Link to={`/case-studies/${caseStudy.slug}`}>
        <Button variant="outline" className="w-full group">
          Read Full Case Study
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </motion.div>
  );
}