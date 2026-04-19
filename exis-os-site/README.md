# Exis-OS — site

Marketing and docs site for [Exis-OS](https://github.com/you/exis-os).
Next.js 14 (app router), zero database, zero runtime dependencies beyond
React. Deploys to Vercel with a single click.

## Deploy

### Option A — one-click (easiest)

1. Push this directory to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Click **Deploy**. No environment variables, no build flags to set —
   Vercel auto-detects Next.js.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

### Option C — local dev

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Structure

```
.
├── app/
│   ├── layout.jsx       # <head>, font preload, metadata
│   ├── page.jsx         # the single landing page
│   └── globals.css      # all styles (one file — it's a single-page site)
├── public/
│   └── favicon.svg
├── package.json
├── next.config.mjs
└── jsconfig.json
```

## Design notes

- **Type**: IBM Plex (Mono, Sans, Serif). Chosen because Plex is IBM's
  typeface and this tool deals with z/OS mainframes — it's a thematic
  tie, not a default.
- **Palette**: warm near-black background, paper off-white text, single
  amber accent (`#ffb000`) — a callback to amber-phosphor CRT terminals,
  which were the "premium" alternative to green phosphor in mainframe
  ops rooms.
- **Layout**: editorial grid, roman-numeral-style section labels, large
  typographic numerals for operating principles, bordered
  "danger zone" callout for the safety gates.

If you want to retheme, every colour lives in CSS variables at the top
of `app/globals.css` — change `--amber` and `--paper` to rebrand.

## Editing content

All copy lives in `app/page.jsx`. It's one file, one page, no CMS. Edit
strings, save, `git push`, and Vercel redeploys automatically.

## License

MIT.

---

## Built by Madhur Sabherwal

Data Engineer · Perth, Australia.

- **Connect** — [LinkedIn](https://www.linkedin.com/in/madhur-sabherwal)
- **Support** — [Buy me a coffee](https://buymeacoffee.com/MaadhurSabherwal)
