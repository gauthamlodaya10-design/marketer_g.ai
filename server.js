// MarketerG AI — single Node app: serves the website (dist/) AND the AI chatbot API.
// Deploy as a Hostinger Node.js Web App. Set ANTHROPIC_API_KEY as an env var (never in code).

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Anthropic from '@anthropic-ai/sdk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const PORT = process.env.PORT || 3000;
const MODEL = 'claude-haiku-4-5';

const app = express();
app.use(express.json({ limit: '64kb' }));

// ---------- Simple per-IP rate limit (protects the public AI endpoint) ----------
const hits = new Map();
function allow(ip, max = 20, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip) || { count: 0, reset: now + windowMs };
  if (now > rec.reset) { rec.count = 0; rec.reset = now + windowMs; }
  rec.count += 1;
  hits.set(ip, rec);
  return rec.count <= max;
}

// ---------- The agent's tools (functions Claude can call) ----------
const SERVICES = {
  automation: 'Workflow automation — we connect your tools so AI handles repetitive work: follow-ups, data entry, reports, integrations.',
  chatbot: 'AI agents & chatbots — a 24/7 assistant trained on your business that answers customers and qualifies leads on your site & WhatsApp.',
  marketing: 'AI-powered marketing — Meta & Google ads, AI content and SEO, steered by a performance marketer who has run $75K/mo in ad spend at 3.8x ROAS.',
  custom: 'Custom AI solutions — we design and build a bespoke AI tool around your exact workflow, and you own the result.',
};

const tools = [
  {
    name: 'get_service_info',
    description: 'Get details about a MarketerG service. Call this when the user asks what we offer or how a specific service works.',
    input_schema: {
      type: 'object',
      properties: {
        service: { type: 'string', enum: ['automation', 'chatbot', 'marketing', 'custom'], description: 'Which service to describe.' },
      },
      required: ['service'],
    },
  },
  {
    name: 'capture_lead',
    description: "Call this when the user wants to book a call, get a quote, a free AI audit, or otherwise start working with us. Returns how to proceed.",
    input_schema: {
      type: 'object',
      properties: {
        summary: { type: 'string', description: "One line on what the user needs." },
      },
      required: [],
    },
  },
];

function runTool(name, input) {
  if (name === 'get_service_info') {
    return SERVICES[input?.service] || 'We do AI automation, AI chatbots/agents, AI-powered marketing, and custom AI solutions.';
  }
  if (name === 'capture_lead') {
    return 'Perfect — tell the user to book their free AI audit via the contact page (the "Get a Free AI Audit" button) or message us on WhatsApp, and confirm warmly.';
  }
  return 'Unknown tool.';
}

const SYSTEM =
  "You are the MarketerG AI assistant on ai.marketerg.com. MarketerG builds AI automation, " +
  "AI chatbots/agents, AI-powered marketing, and custom AI solutions for businesses — combining AI speed with human strategy. " +
  "Be warm and concise (2-4 sentences). Understand the visitor's need, use your tools when relevant, and nudge them toward a free AI audit. " +
  "Pricing is custom per project — never quote fixed prices; suggest the free AI audit instead. Don't invent facts about the company.";

// ---------- Chat endpoint (the AI brain) ----------
app.post('/api/chat', async (req, res) => {
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  if (!allow(ip)) return res.status(429).json({ error: 'Too many requests — slow down a moment.' });
  if (!process.env.ANTHROPIC_API_KEY) return res.status(500).json({ error: 'AI not configured' });

  const incoming = Array.isArray(req.body?.messages) ? req.body.messages : [];
  let messages = incoming.slice(-10).map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content ?? '').slice(0, 1000),
  }));
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length) return res.status(400).json({ error: 'No message' });

  try {
    const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env
    let reply = '';
    for (let i = 0; i < 4; i++) {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: 400,
        system: SYSTEM,
        tools,
        messages,
      });
      if (resp.stop_reason === 'tool_use') {
        messages.push({ role: 'assistant', content: resp.content });
        const results = resp.content
          .filter((b) => b.type === 'tool_use')
          .map((b) => ({ type: 'tool_result', tool_use_id: b.id, content: runTool(b.name, b.input) }));
        messages.push({ role: 'user', content: results });
        continue;
      }
      reply = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
      break;
    }
    res.json({ reply: reply || "Sorry, I couldn't respond just now. Try the contact page to reach us." });
  } catch (err) {
    console.error('chat error:', err?.message || err);
    res.status(502).json({ error: 'AI error' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true, model: MODEL, ai: !!process.env.ANTHROPIC_API_KEY }));

// ---------- Serve the website (static build) + SPA fallback ----------
if (!fs.existsSync(DIST)) {
  console.warn('⚠️  dist/ not found — run "npm run build" before starting in production.');
}
app.use(express.static(DIST));
// SPA fallback (Express 5-safe regex catch-all): any non-API GET serves index.html
app.get(/.*/, (_req, res) => res.sendFile(path.join(DIST, 'index.html')));

app.listen(PORT, () => console.log(`MarketerG AI listening on :${PORT} (model ${MODEL})`));
