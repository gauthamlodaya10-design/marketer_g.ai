import React from 'react';
import { Briefcase } from 'lucide-react';

export default function TimelineItem({ company, location, dates, role, promoted, achievements }) {
  return (
    <div className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0">
      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
      
      <div className="mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-heading font-semibold text-lg text-foreground">{role}</h3>
          {promoted && (
            <span className="px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent border border-accent/30 rounded">
              Promoted
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
          <Briefcase className="w-4 h-4" />
          <span className="font-medium">{company}</span>
          {location && <span>· {location}</span>}
        </div>
        <div className="text-xs text-muted-foreground mt-1">{dates}</div>
      </div>

      {achievements && achievements.length > 0 && (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {achievements.map((achievement, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}