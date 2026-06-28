import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function MetricCard({ value, label, prefix = '', suffix = '', animated = false, triggerAnimation = false }) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated || !triggerAnimation) return;

    const numericValue = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value;
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value, animated, triggerAnimation]);

  return (
    <div className="text-center">
      <div className="font-mono text-4xl md:text-5xl font-bold text-primary mb-2">
        {prefix}{animated ? displayValue.toLocaleString() : value}{suffix}
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}