import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';

// A themed, scripted demo chatbot. Same engine as the site assistant, configured per industry.
// Pure showcase — no API, no lead capture.
export default function IndustryBot({ config }) {
  const reply = (text) => {
    const rule = config.replies.find((r) => r.re.test(text));
    return rule ? rule.reply : config.fallback;
  };

  const [messages, setMessages] = useState([{ from: 'bot', text: config.greeting }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  // Reset the conversation whenever the industry changes.
  useEffect(() => {
    setMessages([{ from: 'bot', text: config.greeting }]);
    setInput('');
    setTyping(false);
  }, [config]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, typing]);

  const send = (text) => {
    const msg = (text ?? input).trim();
    if (!msg || typing) return;
    setMessages((m) => [...m, { from: 'user', text: msg }]);
    setInput('');
    setTyping(true);
    const r = reply(msg);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: r }]);
    }, Math.min(1300, 450 + r.length * 9));
  };

  return (
    <div className="gradient-border bg-card rounded-2xl overflow-hidden shadow-2xl w-full">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-background/40">
        <div className="relative w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-xl">
          <span role="img" aria-label={config.label}>{config.emoji}</span>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-card"></span>
        </div>
        <div className="flex-1">
          <p className="font-heading font-semibold text-foreground text-sm leading-tight">{config.botName}</p>
          <p className="text-xs text-muted-foreground">Online · {config.label} demo</p>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3 h-72 overflow-y-auto">
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

      <div className="px-4 pb-3 flex flex-wrap gap-2">
        {config.suggestions.map((s) => (
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
