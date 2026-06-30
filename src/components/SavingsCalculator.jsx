import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, IndianRupee, TrendingUp } from 'lucide-react';

// Interactive ROI demo: how much time/money automation could save.
// Assumes AI can take over ~70% of repetitive task time.
const AUTOMATABLE = 0.7;
const WEEKS_PER_MONTH = 4.33;

const fmt = (n) => Math.round(n).toLocaleString('en-IN');

export default function SavingsCalculator() {
  const [staff, setStaff] = useState(3);
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(300);

  const hoursSavedMonth = staff * hours * WEEKS_PER_MONTH * AUTOMATABLE;
  const moneySavedMonth = hoursSavedMonth * rate;
  const moneySavedYear = moneySavedMonth * 12;

  const Slider = ({ label, value, min, max, step, onChange, suffix }) => (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-sm text-muted-foreground">{label}</label>
        <span className="font-heading font-semibold text-foreground">{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[hsl(var(--primary))]"
      />
    </div>
  );

  return (
    <div className="grid md:grid-cols-2 gap-6 items-stretch">
      {/* Inputs */}
      <div className="gradient-border bg-card rounded-2xl p-7 space-y-6">
        <p className="text-sm text-muted-foreground">Tell us about the repetitive work:</p>
        <Slider label="People doing repetitive tasks" value={staff} min={1} max={25} step={1} onChange={setStaff} />
        <Slider label="Hours/week each spends on it" value={hours} min={1} max={40} step={1} onChange={setHours} suffix=" hrs" />
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-muted-foreground">Avg cost per hour (₹)</label>
            <span className="font-heading font-semibold text-foreground">₹{rate}</span>
          </div>
          <input
            type="range"
            min={100}
            max={2000}
            step={50}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-[hsl(var(--primary))]"
          />
        </div>
      </div>

      {/* Results */}
      <div className="gradient-border bg-gradient-to-br from-primary/10 to-accent/5 rounded-2xl p-7 flex flex-col justify-center">
        <p className="text-sm text-muted-foreground mb-4">With AI automation, you could save:</p>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center"><Clock className="w-5 h-5 text-primary" /></div>
            <div>
              <motion.p key={hoursSavedMonth} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-2xl font-bold text-foreground">
                {fmt(hoursSavedMonth)} hrs<span className="text-base text-muted-foreground font-normal"> / month</span>
              </motion.p>
              <p className="text-xs text-muted-foreground">of staff time freed up</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center"><IndianRupee className="w-5 h-5 text-accent" /></div>
            <div>
              <motion.p key={moneySavedMonth} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-2xl font-bold text-foreground">
                ₹{fmt(moneySavedMonth)}<span className="text-base text-muted-foreground font-normal"> / month</span>
              </motion.p>
              <p className="text-xs text-muted-foreground">in labour cost saved</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-primary" /></div>
            <div>
              <motion.p key={moneySavedYear} initial={{ opacity: 0.4, y: 4 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-3xl font-bold gradient-text">
                ₹{fmt(moneySavedYear)}<span className="text-base text-muted-foreground font-normal"> / year</span>
              </motion.p>
              <p className="text-xs text-muted-foreground">potential annual saving</p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-6">Estimate based on automating ~70% of repetitive task time. Your real numbers come from a free AI audit.</p>
      </div>
    </div>
  );
}
