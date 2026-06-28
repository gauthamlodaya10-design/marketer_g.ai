# Deploying ai.marketerg.com (one Node.js app: website + AI chatbot)

This is **one** Node.js app that serves the website **and** the AI chatbot (`/api/chat`),
so it uses a single Hostinger slot. The chatbot uses Claude Haiku via `@anthropic-ai/sdk`,
with the API key kept server-side (never in the code).

## How it fits together
```
ONE Hostinger Node.js Web App
  ├─ serves the React build (dist/)        → the website at ai.marketerg.com
  └─ POST /api/chat  → runs Claude Haiku    → the chatbot brain (key stays server-side)
```
- `server.js` is the app. `npm run build` produces `dist/`; `npm start` runs the server.
- The chat widget calls `/api/chat` on the same domain (no CORS, no second app).

---

## One-time setup on Hostinger

1. **Delete the current `ai.marketerg.com` website** (the Custom PHP/HTML one) in hPanel.
   *(The code is safe in GitHub — you're only removing the hosting entry.)*
2. **Add website → Node.js Web App → Deploy from GitHub.**
   - Repo: `gauthamlodaya10-design/marketer_g.ai`, branch `main`
   - Domain: `ai.marketerg.com` (verify ownership as before)
   - **Node version:** 18 or higher
   - **Build command:** `npm run build`
   - **Start command:** `npm start`  (startup file: `server.js`)
3. **Add the environment variable** (Node app → Settings → Environment variables):
   - `ANTHROPIC_API_KEY` = your key from console.anthropic.com
   - *(Optional)* `PORT` — only if Hostinger requires a specific port; the app reads `process.env.PORT`.
4. **Deploy.** Hostinger pulls the repo, runs the build, and starts the server.

> If Hostinger's flow has no separate "build command" field, set the start command to
> `npm run build && npm start` instead, so the build runs before the server boots.

---

## Verify it's live
- Visit `https://ai.marketerg.com` → the site loads.
- Visit `https://ai.marketerg.com/api/health` → should return `{"ok":true,"model":"claude-haiku-4-5","ai":true}`.
  - `ai:true` means the API key is set correctly. If `ai:false`, the env var isn't being read — re-check step 3.
- Open the chat widget and ask a question → it now answers via Claude (falls back to scripted replies if the API ever errors, so it never breaks).

## Updating the site later
Push to `main` → Hostinger auto-redeploys (build + restart). That's it.

---

## Cost & safety notes (public AI endpoint)
- Every chat message costs a small amount (Haiku is cheap). The server already caps each
  reply (`max_tokens: 400`), trims history (last 10 messages), and rate-limits per IP
  (20 requests/min). Watch usage in the Anthropic console for the first few days.
- The API key lives only in the Hostinger env var — it's never in the repo or the browser.
