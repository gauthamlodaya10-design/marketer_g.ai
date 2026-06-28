import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';

// MarketerG AI chatbot widget.
// Mode B: scripted replies (free, no API key) + a lead-capture flow that saves
// interested visitors (name / mobile / email) to Supabase.
// To upgrade to real Claude later: set LIVE_CHAT = true and configure /api/chat with a key.
const LIVE_CHAT = false;
const CHAT_ENDPOINT = '/api/chat';

const SUGGESTIONS = [
  'What can you automate for me?',
  'Do you build chatbots?',
  'How much does it cost?',
  "I'm interested 🙌",
];

// Detects when a visitor is interested enough to capture as a lead.
const INTEREST = /(interest|book|call|demo|audit|quote|price|cost|much|get started|sign ?up|hire|buy|yes|contact|talk|reach|connect|email me|whatsapp)/i;

function getReply(text) {
  const t = text.toLowerCase();
  if (/(price|cost|much|pricing|budget|charge)/.test(t))
    return "Great question! We quote per project since every automation is different. The best first step is a free AI audit — leave your details below and we'll map your biggest wins and what they'd cost.";
  if (/(chatbot|bot|support|customer|whatsapp)/.test(t))
    return "Absolutely. We build AI agents trained on your business that answer customers 24/7 on your site and WhatsApp, qualify leads, and book calls. This chat is a simple example of it. 🙂";
  if (/(market|ads|seo|content|leads|grow|sales)/.test(t))
    return "Yes — that's our home turf. We run AI-powered ads, content and SEO, steered by a performance marketer who's managed $75K/mo in ad spend at 3.8x ROAS. AI for speed, humans for strategy.";
  if (/(automat|workflow|task|boring|repetitive|data|invoice|report)/.test(t))
    return "That's what we do best. If it's repetitive — follow-ups, data entry, reports, invoices, lead handling — we can usually automate it. Want us to take a look at your setup?";
  if (/(custom|build|tool|solution|specific|problem)/.test(t))
    return "Love it. We design and build a custom AI tool around your exact workflow — and you own the result. Leave your details and we'll talk through it.";
  if (/(hi|hello|hey|yo|sup)/.test(t))
    return "Hey there! 👋 I'm the MarketerG AI assistant. Ask me what we can automate, how our chatbots work, or how we help businesses grow.";
  if (/(book|call|demo|audit|talk|contact|start|hire|interest|yes)/.test(t))
    return "Perfect — let's set up your free AI audit. Drop your details below and we'll reach out shortly. 👇";
  return "We help businesses automate busywork, build AI agents, and run AI-powered marketing. Want a free AI audit? Leave your details below and we'll reach out.";
}

export default function ChatDemo() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm the MarketerG AI assistant. Ask me what we can automate — or tell me you're interested and I'll set up a free AI audit." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typing, showLead, leadSent]);

  const addBot = (text) => setMessages((m) => [...m, { from: 'bot', text }]);

  const send = async (text) => {
    const raw = text ?? input;
    const msg = raw.trim();
    if (!msg || typing) return;

    // Direct interest trigger (e.g. the "I'm interested" chip)
    const interested = INTEREST.test(msg);
    const history = [...messages, { from: 'user', text: msg }];
    setMessages(history);
    setInput('');
    setTyping(true);

    const finish = (reply) => {
      setTyping(false);
      addBot(reply);
      if (interested && !leadSent) setShowLead(true);
    };

    // Live mode (off in scripted mode): calls /api/chat, falls back to scripted on error.
    if (LIVE_CHAT) {
      try {
        const apiMessages = history.map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));
        while (apiMessages.length && apiMessages[0].role !== 'user') apiMessages.shift();
        const res = await fetch(CHAT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        });
        if (!res.ok) throw new Error('proxy error');
        const data = await res.json();
        finish(data.reply || getReply(msg));
        return;
      } catch {
        /* fall through to scripted */
      }
    }

    const reply = getReply(msg);
    setTimeout(() => finish(reply), Math.min(1400, 450 + reply.length * 10));
  };

  const submitLead = async (e) => {
    e?.preventDefault();
    if (submitting) return;
    const name = lead.name.trim();
    const phone = lead.phone.trim();
    const email = lead.email.trim();
    if (!name || !phone || !/^\S+@\S+\.\S+$/.test(email)) return;

    setSubmitting(true);
    try {
      await supabase.from('contact_messages').insert([{
        name,
        email,
        company: '',
        inquiry_type: 'Chatbot Lead',
        message: `Mobile: ${phone}\nCaptured by the website AI chatbot.`,
      }]);
    } catch (err) {
      console.error('lead save error:', err?.message || err);
    } finally {
      setSubmitting(false);
      setLeadSent(true);
      setShowLead(false);
      addBot(`Thanks ${name.split(' ')[0]}! 🎉 We've got your details and we'll reach out shortly to set up your free AI audit.`);
    }
  };

  return (
    <div className="gradient-border bg-card rounded-2xl overflow-hidden shadow-2xl max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background/40">
        <div className="relative w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-card"></span>
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-foreground text-sm leading-tight">MarketerG AI</p>
          <p className="text-xs text-muted-foreground">Online · replies instantly</p>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wide text-accent bg-accent/10 px-2 py-1 rounded-full">
          <Sparkles className="w-3 h-3" /> Live demo
        </span>
      </div>

      {/* Messages */}
      <div className="px-4 py-4 space-y-3 h-80 overflow-y-auto">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-end gap-2 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${m.from === 'user' ? 'bg-accent/20' : 'bg-primary/15'}`}>
              {m.from === 'user' ? <User className="w-4 h-4 text-accent" /> : <Bot className="w-4 h-4 text-primary" />}
            </div>
            <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
              m.from === 'user' ? 'bg-accent text-accent-foreground rounded-br-sm' : 'bg-background border border-border text-foreground rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}

        {/* Lead capture form (appears when a visitor is interested) */}
        <AnimatePresence>
          {showLead && !leadSent && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={submitLead}
              className="gradient-border bg-background rounded-xl p-4 space-y-2.5"
            >
              <p className="text-xs text-muted-foreground">Leave your details for a free AI audit:</p>
              <input
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                placeholder="Your name"
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                placeholder="Mobile number"
                inputMode="tel"
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                placeholder="Email"
                type="email"
                className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-accent text-accent-foreground rounded-lg py-2 text-sm font-semibold hover:bg-accent/90 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Get my free AI audit'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {typing && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span key={d} className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Suggestions (hidden once a lead is captured) */}
      {!leadSent && !showLead && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              disabled={typing}
              className="text-xs border border-border rounded-full px-3 py-1.5 text-muted-foreground hover:text-foreground hover:border-primary transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {leadSent && (
        <div className="px-4 pb-3 flex items-center gap-2 text-sm text-primary">
          <CheckCircle className="w-4 h-4" /> Thanks — we'll be in touch!
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 px-4 pb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message…"
          className="flex-1 bg-background border border-border rounded-full px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={() => send()}
          disabled={typing || !input.trim()}
          className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center hover:bg-accent/90 transition-colors disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
