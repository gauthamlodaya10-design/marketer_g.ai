import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles } from 'lucide-react';

// Lightweight, self-contained AI chatbot DEMO.
// Uses scripted keyword matching so it works on static hosting with no API key.
// In a real client deployment this connects to Claude/GPT and the client's own knowledge base.

// Flip to true AFTER deploying api/chat.php with your Anthropic key on the server.
// While false, the chat uses smart scripted replies (free, no API cost, abuse-proof).
const LIVE_CHAT = false;

const SUGGESTIONS = [
  'What can you automate for me?',
  'Do you build chatbots?',
  'How much does it cost?',
  'Can you help with marketing?',
];

function getReply(text) {
  const t = text.toLowerCase();
  if (/(price|cost|much|pricing|budget|charge)/.test(t))
    return "Great question! We quote per project since every automation is different. The best first step is a free AI audit — we map your biggest time-wasters and show you exactly what they'd cost to automate. Want me to book one?";
  if (/(chatbot|bot|support|customer|whatsapp)/.test(t))
    return "Absolutely. We build AI agents trained on your business that answer customers 24/7 on your website and WhatsApp, qualify leads, and book calls — handing the tricky stuff to a human. This chat you're using is a simple example of it. 🙂";
  if (/(market|ads|seo|content|leads|grow|sales)/.test(t))
    return "Yes — that's our founder's home turf. We run AI-powered ads, content and SEO, steered by a performance marketer who's managed $75K/mo in ad spend at 3.8x ROAS. AI for speed, humans for strategy.";
  if (/(automat|workflow|task|boring|repetitive|data|invoice|report)/.test(t))
    return "That's exactly what we do best. If it's repetitive — follow-ups, data entry, reports, invoices, lead handling — we can usually automate it. Tell me the boring task and I'll tell you straight if it's worth automating.";
  if (/(custom|build|tool|solution|specific|problem)/.test(t))
    return "Love it. Got a specific problem? We design and build a custom AI tool around your exact workflow — and you own the result. What's the problem you're trying to solve?";
  if (/(book|call|demo|audit|talk|contact|start|hire)/.test(t))
    return "Perfect — let's do it. Head to the contact section and drop your details, or message us on WhatsApp. We'll set up your free AI audit and show you the highest-impact wins first.";
  if (/(hi|hello|hey|yo|sup)/.test(t))
    return "Hey there! 👋 I'm the MarketerG AI assistant. Ask me what we can automate, how our chatbots work, or how we help businesses grow.";
  return "Good question! We help businesses automate busywork, build AI agents, and run AI-powered marketing. Want me to point you to the right service, or book you a free AI audit?";
}

export default function ChatDemo() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! 👋 I'm the MarketerG AI assistant. I can answer questions and qualify leads 24/7 — try me out." },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typing]);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    const history = [...messages, { from: 'user', text: msg }];
    setMessages(history);
    setInput('');
    setTyping(true);

    const finish = (reply) => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: reply }]);
    };

    // Live mode: call the Claude proxy. Falls back to scripted replies on any error.
    if (LIVE_CHAT) {
      try {
        const apiMessages = history.map((m) => ({
          role: m.from === 'user' ? 'user' : 'assistant',
          content: m.text,
        }));
        while (apiMessages.length && apiMessages[0].role !== 'user') apiMessages.shift();
        const res = await fetch('/api/chat.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages }),
        });
        if (!res.ok) throw new Error('proxy error');
        const data = await res.json();
        finish(data.reply || getReply(msg));
        return;
      } catch {
        // fall through to scripted reply
      }
    }

    const reply = getReply(msg);
    const delay = Math.min(1600, 500 + reply.length * 12);
    setTimeout(() => finish(reply), delay);
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
              m.from === 'user'
                ? 'bg-accent text-accent-foreground rounded-br-sm'
                : 'bg-background border border-border text-foreground rounded-bl-sm'
            }`}>
              {m.text}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-background border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={endRef} />
      </div>

      {/* Suggestions */}
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
