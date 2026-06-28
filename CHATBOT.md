# The AI Chatbot — demo vs. live Claude

The chat widget on the site has two modes, controlled by `LIVE_CHAT` in
`src/components/ChatDemo.jsx`.

## Demo mode (default, `LIVE_CHAT = false`)
- Smart **scripted** replies. No API key, no cost, no abuse risk.
- Perfect for the public marketing site — visitors can try it, and it can't run up a bill.
- **Recommendation: keep the public hero on demo mode.** Sell *real* Claude bots as the paid
  client deliverable (deployed per-client with their own key + limits).

## Live mode (real Claude, `LIVE_CHAT = true`)
Connects to Claude via the PHP proxy at `public/api/chat.php` (deployed to `/api/chat.php`).
The proxy keeps your API key server-side so it's never exposed in the browser.

### To enable:
1. **Get an Anthropic API key** at console.anthropic.com.
2. **Store it on the Hostinger server (never in git):**
   - Best: set an environment variable `ANTHROPIC_API_KEY` in hPanel.
     (Survives auto-deploys.)
   - Or: create `api/secret.php` on the server with `<?php return 'sk-ant-...';`
     — but then turn OFF `dangerous-clean-slate` in the deploy workflow, or the deploy
     will delete it.
3. Set `LIVE_CHAT = true` in `ChatDemo.jsx`, commit, push → it deploys.
4. The widget now calls Claude (model: `claude-haiku-4-5` — fast & cheap). If the proxy
   ever errors, it automatically falls back to scripted replies, so it never breaks.

### ⚠️ Before going live on a public page
- Every message costs money. Add **rate limiting** (per IP/session) to the proxy.
- Keep `max_tokens` low (already 300) and history trimmed (already last 10 messages).
- Watch usage in the Anthropic console for the first few days.
