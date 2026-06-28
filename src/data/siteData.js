// Central content for ai.marketerg.com — MarketerG AI automation & solutions.

import {
  Zap, Bot, LineChart, Cpu, BrainCircuit, Rocket,
  Search, Wrench, Send, BarChart3
} from 'lucide-react';

export const brand = {
  name: 'MarketerG',
  tagline: 'AI that works while you sleep.',
  email: 'hello@marketerg.com',
  // WhatsApp number (intl format, no +).
  whatsapp: '971561552810',
  instagram: 'https://instagram.com/itss.marketer_g',
};

export const heroStats = [
  { value: '24', suffix: '/7', label: 'AI that never clocks out' },
  { value: '75', prefix: '$', suffix: 'K+', label: 'Marketing budget automated /mo' },
  { value: '3.8', suffix: 'x', label: 'Average return delivered' },
  { value: '90', suffix: '%', label: 'Of busywork we can automate' },
];

export const services = [
  {
    icon: Zap,
    title: 'Workflow Automation',
    blurb: 'Kill the boring, repetitive work. We connect your tools so AI handles it on autopilot.',
    points: ['Data entry & syncing', 'Auto follow-ups & reminders', 'Report generation', 'Tool-to-tool integrations'],
    featured: true,
  },
  {
    icon: Bot,
    title: 'AI Agents & Chatbots',
    blurb: 'A 24/7 assistant trained on your business — answers customers and qualifies leads on your site & WhatsApp.',
    points: ['Customer support bot', 'Lead qualification & booking', 'Trained on your docs', 'Site + WhatsApp ready'],
  },
  {
    icon: LineChart,
    title: 'AI-Powered Marketing',
    blurb: 'Ads, content and SEO — supercharged by AI, steered by a real performance marketer.',
    points: ['Meta & Google ads', 'AI content & SEO', 'GEO/AEO for AI search', 'Human strategy + AI speed'],
  },
  {
    icon: Cpu,
    title: 'Custom AI Solutions',
    blurb: 'Got a specific problem? We design and build a bespoke AI tool to solve it.',
    points: ['Built around your workflow', 'Any integration', 'You own the result', 'From idea to working tool'],
  },
  {
    icon: BrainCircuit,
    title: 'Internal AI Assistants',
    blurb: 'A private “ask-your-docs” AI so your team gets instant answers from your own knowledge.',
    points: ['Trained on internal docs', 'Secure & private', 'Instant team answers', 'Always up to date'],
  },
  {
    icon: Rocket,
    title: 'AI Strategy & Setup',
    blurb: 'Not sure where AI fits? We audit your business and roll out the highest-impact wins first.',
    points: ['Free AI opportunity audit', 'Prioritized roadmap', 'Team onboarding', 'Hands-on setup'],
  },
];

// The AI + human model — our core differentiator.
export const howItWorks = [
  { icon: Search, title: 'Discover', text: 'We map your repetitive work and goals in a quick audit — no jargon needed.' },
  { icon: Wrench, title: 'Build', text: 'AI does the heavy lifting; our humans architect, refine and quality-check it.' },
  { icon: Send, title: 'Deploy', text: 'It plugs into your tools and goes live — with approval gates on anything sensitive.' },
  { icon: BarChart3, title: 'Improve', text: 'We monitor, measure and keep optimizing so it gets better over time.' },
];

export const whyUs = [
  { title: 'AI speed, human judgment', text: 'Machines for scale and 24/7 grind; humans for strategy, taste and the tricky edge cases.' },
  { title: 'Built by a performance marketer', text: 'Founded on real results — $75K/mo in managed ad spend and 3.8x average ROAS.' },
  { title: 'We run on AI ourselves', text: 'Our own brand is AI-powered. We don’t just talk about AI — we live it, and we’ll prove it on your business.' },
  { title: 'One partner, end to end', text: 'Automation, AI agents and marketing — all under one roof, all working together.' },
];

// Honest, verifiable proof from real campaign/automation results.
export const proofPoints = [
  { stat: '$50K', text: 'in lost sales recovered with an automated WhatsApp flow' },
  { stat: '40%', text: 'lift in conversion rate via automation & retargeting' },
  { stat: '28%', text: 'lower cost per lead through optimization' },
  { stat: '0→10K', text: 'followers in a month for a launch we ran' },
];

export const useCases = [
  {
    emoji: '💬',
    tag: 'Support',
    title: '24/7 Customer Support Bot',
    problem: 'A business drowning in repetitive customer questions, losing leads after hours.',
    solution: 'An AI agent trained on their FAQs, products and policies — answering instantly on the site and WhatsApp, escalating only the tricky stuff to a human.',
    outcome: 'Instant replies around the clock, fewer missed leads, hours of staff time saved every week.',
    gradient: 'from-sky-500/30 via-primary/20 to-indigo-500/30',
  },
  {
    emoji: '⚡',
    tag: 'Sales',
    title: 'Instant Lead Follow-up',
    problem: 'Leads going cold because no one replies fast enough.',
    solution: 'Automation that instantly responds to every new lead, qualifies them with AI, and books a call — then nudges the ones who go quiet.',
    outcome: 'Every lead engaged in seconds, more booked calls, zero manual chasing.',
    gradient: 'from-amber-500/30 via-accent/20 to-orange-500/30',
  },
  {
    emoji: '📄',
    tag: 'Ops',
    title: 'Document & Data Automation',
    problem: 'Staff burning hours on invoices, data entry and copy-paste between tools.',
    solution: 'AI pipelines that read documents, extract the data, and push it into the right systems automatically.',
    outcome: 'Boring back-office work runs itself — faster, cheaper and with fewer errors.',
    gradient: 'from-fuchsia-500/30 via-primary/20 to-rose-500/30',
  },
];

export const faqs = [
  {
    q: 'What can you actually automate?',
    a: 'If it’s repetitive and follows rules, it’s probably automatable — follow-ups, data entry, reports, customer replies, content, lead handling and more. Tell us the boring task and we’ll tell you straight if it’s worth automating.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'None. You tell us the problem in plain language; we design, build and run the solution. You just approve and enjoy the time back.',
  },
  {
    q: 'Is my data safe?',
    a: 'Yes. We follow security best practices, you control what the AI can access, and anything sensitive (payments, sending messages) sits behind your approval.',
  },
  {
    q: 'AI or humans — which is it?',
    a: 'Both, on purpose. AI handles speed, scale and the 24/7 grind. Humans handle strategy, quality and judgment. You get the best of each.',
  },
  {
    q: 'How fast can I see something working?',
    a: 'Most projects start with a small pilot you can see in days to a couple of weeks — so you get value fast before scaling up.',
  },
  {
    q: 'How much does it cost?',
    a: 'It depends on the project, so we quote per solution. Start with a free AI audit — we’ll show you the highest-impact wins and what they’d cost.',
  },
];
