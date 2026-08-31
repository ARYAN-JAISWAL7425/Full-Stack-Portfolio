# Aryan Jaiswal — Portfolio

A premium, animated portfolio for a full-stack developer. Bold editorial design
(bone + ink + vermillion) with Active-Theory / Locomotive-style motion: smooth
scrolling, masked text reveals, magnetic buttons, a custom cursor, hover-tilt
project cards and a page-load intro.

Every project listed on the site links to a live deploy and its source repo —
[FitStake](https://fit-stake-nu.vercel.app/), [Voyago](https://voyago-zeta-coral.vercel.app/),
[Forever](https://ecommerce-frontend-omega-red-83.vercel.app/) and
[Chatapp](https://chatapps-chi.vercel.app/login).

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** for styling (design tokens in `tailwind.config.ts`)
- **Framer Motion** for animation
- **Lenis** for smooth scrolling
- Fonts: **Syne** (display), **DM Sans** (body), **Space Mono** (labels)

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  (uses Turbopack)
```

```bash
npm run build    # production build
npm start        # serve the production build
```

> Note: `dev` uses Turbopack (`next dev --turbopack`) — it's faster and avoids a
> webpack HMR quirk that can occur when the project lives inside a OneDrive
> folder. `build` uses the standard compiler and is fully Vercel-ready.

## Editing content — start here

**Almost everything is in one file: [`lib/content.ts`](lib/content.ts).**
Name, role, email, location, tagline, social links, projects, services, skills,
experience, stats, certifications and values all live there. Update that file and
the whole site updates.

A few specifics:

- **Your photo:** replace `public/profile.png` (keep the filename). A square-ish
  image works best — it's shown in a circular frame.
- **Domain / SEO:** set `site.url` in `lib/content.ts` to your real domain so
  Open Graph tags, the sitemap and robots.txt point to the right place.
- **Contact form:** it posts to [Web3Forms](https://web3forms.com) from the
  browser. Set `NEXT_PUBLIC_WEB3FORMS_KEY` in `.env.local` (and in your Vercel
  project) to your access key. The handler lives in
  [`components/contact/ContactForm.tsx`](components/contact/ContactForm.tsx).
- **Projects:** each entry in `projects` drives both the `/work` card *and* its
  case-study page at `/work/[slug]`. Fields:
  - `short` — one-liner for the hover preview on the home page
  - `blurb` — the paragraph on `/work` and the case-study header
  - `overview` + `highlights[]` + `notes[]` — the case-study body
  - `live` / `repo` — external links
  - `shot` / `shotFit` — screenshot path and how it sits in a card
  - `demo` — read-only demo credentials, rendered next to the live link
- **Demo credentials:** set `demo: { user, password, note? }` on a project and a
  copyable credentials block appears on its case study, so a visitor never hits
  a login wall with no way through. Omit it and nothing renders.
- **Résumé:** replace `public/Aryan_Jaiswal_Resume.pdf` (path set by
  `site.resume`). Linked from the nav, footer and contact page.

## Screenshots

```bash
npm run shots            # capture every project's live site
npm run shots fitstake   # just one
```

Captures each `live` URL to `public/shots/<slug>.png` with Playwright. Re-run
after redeploying a project. Mobile-first apps get a phone viewport — see
`VIEWPORTS` in [`scripts/shots.mjs`](scripts/shots.mjs) — and are displayed with
`shotFit: "contain"` so they read as a device mockup rather than a cropped page.

## Project structure

```
app/                 Routes (home + 6 pages + /work/[slug]), layout, SEO
  work/[slug]/       Per-project case studies (statically generated)
components/
  home/              Home page sections (Hero, Work, About, Contact, …)
  layout/            Nav, Footer
  ui/                Reusable bits: Reveal, MaskText, Magnetic, CountUp, Portrait…
  providers/         SmoothScroll (Lenis)
  cursor/, intro/    Custom cursor + page-load intro
lib/
  content.ts         ← all site content
  utils.ts           cn() class helper
scripts/shots.mjs    Playwright screenshot capture
public/profile.png   Your headshot
public/shots/        Generated project screenshots
```

## Accessibility & performance

- Respects `prefers-reduced-motion` (intro, smooth scroll and animations back off).
- Custom cursor only on fine-pointer devices; native cursor on touch.
- Semantic headings, labelled form fields, alt text on the portrait.
- A "Skip to content" link — the custom cursor, intro overlay and smooth scroll
  otherwise leave keyboard users with a long path to the page body.
- `Person` JSON-LD in the layout (`sameAs` → GitHub, LinkedIn, LeetCode).
- Vercel Analytics + Speed Insights.
- All pages are statically prerendered.

> `npm run lint` uses the ESLint CLI (`eslint .`) — `next lint` is deprecated and
> breaks on flat config. `react-hooks/set-state-in-effect` is set to warn: every
> current hit is the legitimate "read a browser-only value on mount" pattern.

## Deploy

Live at **[aryantech.studio](https://aryantech.studio)**, deployed from `main`
on Vercel. Two settings matter:

- **Root Directory** must be `portfolio` — the app is not at the repo root.
- **The path must not contain a space.** Vercel builds Serverless Function
  names from the project path and rejects any name containing one:

  ```
  A Serverless Function has an invalid name:
  "'Personal Portfolio/___next_launcher.cjs'"
  ```

  The build succeeds and the *deploy* fails, which makes it easy to misread.
  That is why this directory is `portfolio/` and not `Personal Portfolio/`.

Environment variables (Production):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://aryantech.studio` |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | your Web3Forms access key |

`NEXT_PUBLIC_*` values are inlined at build time, so changing one needs a
redeploy to take effect. Preview builds need neither: `siteUrl` falls back to
`VERCEL_PROJECT_PRODUCTION_URL`, which Vercel sets automatically.
