import React from 'react';
import { cn } from '@/lib/utils';

export default function SkillPill({ skill, variant = 'default' }) {
  const variants = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    muted: 'bg-muted/10 text-muted-foreground border-muted/20'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors',
      variants[variant]
    )}>
      {skill}
    </span>
  );
}