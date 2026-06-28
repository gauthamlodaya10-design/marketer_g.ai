import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import SkillPill from '@/components/SkillPill';
import { Button } from '@/components/ui/button';

export default function CertificationCard({ certification }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="gradient-border p-6 rounded-lg bg-card hover-lift"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Award className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
            {certification.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {certification.issuer} · {certification.year}
          </p>
          
          {certification.skills && certification.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {certification.skills.map((skill, index) => (
                <SkillPill key={index} skill={skill} variant="secondary" />
              ))}
            </div>
          )}

          {certification.certificate_url && (
            <Button
              variant="outline"
              size="sm"
              className="group"
              onClick={() => window.open(certification.certificate_url, '_blank')}
            >
              View Certificate
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}