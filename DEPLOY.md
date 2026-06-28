# Deploying ai.marketerg.com (GitHub → Hostinger auto-deploy)

Every time you push a change to the `main` branch, GitHub Actions builds the site and
uploads it to Hostinger automatically. Here's the one-time setup.

## 1. Log into GitHub CLI (you do this once)
```bash
gh auth login
```
Choose: GitHub.com → HTTPS → login with a browser. Follow the prompts.

## 2. Create the repo and push (run from the project folder)
```bash
cd ~/Desktop/marketerg-ai
gh repo create marketerg-ai --private --source=. --remote=origin --push
```
This creates a private GitHub repo and pushes your code. (Claude can run these for you once you're logged in.)

## 3. Get your Hostinger FTP details
In hPanel → **Files → FTP Accounts**, note:
- **FTP host/server** (e.g. `ftp.marketerg.com` or an IP)
- **FTP username**
- **FTP password** (create/reset one if needed)

Find the **subdomain's folder path** in hPanel → **Files → File Manager**. For a subdomain
`ai.marketerg.com` it's usually something like:
`/domains/marketerg.com/public_html/ai/`  ← this is your `FTP_SERVER_DIR`

> First create the subdomain in hPanel → **Domains → Subdomains** → add `ai`. Note the
> document root it gives you — that exact path is what you put in `FTP_SERVER_DIR`.

## 4. Add the secrets to GitHub
GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**.
Add these four:

| Secret name | Value |
|---|---|
| `FTP_SERVER` | your FTP host (e.g. `ftp.marketerg.com`) |
| `FTP_USERNAME` | your FTP username |
| `FTP_PASSWORD` | your FTP password |
| `FTP_SERVER_DIR` | the subdomain folder path (e.g. `/domains/marketerg.com/public_html/ai/`) |

⚠️ Never commit these into the code — only store them as GitHub Secrets.

## 5. Done — test it
Push any change (or use the Actions tab → "Build & Deploy to Hostinger" → Run workflow).
Watch it build and deploy under the repo's **Actions** tab. When it's green, visit
`https://ai.marketerg.com`.

---

### Notes
- The build output is the `dist/` folder; only that gets uploaded.
- `.htaccess` (in `public/`) handles SPA routing on Hostinger automatically.
- To deploy the other site (the website agency in `~/Desktop/Marketer-G`), repeat the same
  steps with its own repo and an `FTP_SERVER_DIR` pointing at the main domain root.
