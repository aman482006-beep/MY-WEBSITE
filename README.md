# Aman Jain — Portfolio

This repository is the GitHub Pages copy of [amanmalu.me](https://amanmalu.me), built from the portfolio's actual Next.js source rather than a separate visual approximation.

## Pages

- `/` — Portrait-led introduction, Finance / Build / Create pillars, Fokus feature, finance-work section, creator preview, recruiter overview and contact.
- `/work/` — Fokus case study, core feature list, technology stack, explicit screenshot placeholders and selected finance work.
- `/creator/` — Creator pillars and YouTube feed / channel fallback.
- `/recruiters/` — Education, internships, CFA candidate status, skills, selected qualifications and résumé action.
- `/resources/` — Planned finance toolkits, CFA study systems, creator workflows and resource-request email draft.
- `/contact/` — Contact form, inquiry categories, email draft and social links.
- `/inbox/` — Password-protected private message inbox (Supabase Auth + row-level security).

## Design research & rationale

The visual direction and implementation trade-offs are documented in [docs/design-rationale.md](docs/design-rationale.md), including the public design references reviewed, patterns adopted, choices deliberately avoided, and remaining verification items.

## Tech stack

- Next.js 16 App Router, React 19, TypeScript
- Tailwind CSS v4 and the shared `aj-` visual system
- Newsreader, Manrope and Caveat via `next/font`
- CSS motion and Lenis smooth scrolling, with reduced-motion support
- Vercel Analytics / Speed Insights components (most useful when the site is hosted on Vercel)

## Run locally

```bash
npm ci
npm run dev
```

Run checks and build:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy to GitHub Pages

This repository retains the original `src/app/api/youtube/route.ts` endpoint and its one-hour revalidation / cache headers for a normal Next.js server deployment (for example, Vercel). GitHub Pages cannot run request-time API routes, so the Pages workflow moves that route out of the build workspace only while creating the static export. The route remains tracked in GitHub. The homepage and Creator page render the video feed at build time in the static Pages copy.

1. Open the repository **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`. The workflow installs dependencies, runs ESLint and TypeScript checks, exports `out/`, and publishes the result.
4. The expected project-site URL is `https://aman482006-beep.github.io/MY-WEBSITE/`.

The workflow passes the optional `YOUTUBE_API_KEY` repository secret to the build. Without it, the visitor-friendly “Visit the channel” fallback is shown. With it, the feed is fetched during deployment; on GitHub Pages it updates on the next successful rebuild rather than running a server-side hourly refresh. On a normal Next.js server deployment the preserved `/api/youtube` endpoint runs at request time with the source's one-hour revalidation and cache headers. Do not commit API keys to source files.

## Items intentionally left as TODO(Aman)

- **Résumé PDF:** Add the current approved PDF to `public/Aman-Jain-Resume.pdf`; the button stays disabled until the file exists.
- **Fokus screenshots:** Add 3–4 genuine screenshots from the actual app build. The current case-study slots are labeled placeholders, not fabricated app captures.
- **Finance files:** Attach completed PDF / Excel assets and replace the `TODO(Aman)` takeaways in `src/data/finance-work.ts`. No research conclusions or performance metrics have been invented.
- **Project deployment:** Set GitHub Pages source to GitHub Actions once in Settings, then confirm the first Actions run.

## Contact inbox setup

See [docs/contact-inbox-setup.md](docs/contact-inbox-setup.md) for the Supabase project, password, database and GitHub Actions setup required to activate the form and private inbox.

## Contact

- Website: [amanmalu.me](https://amanmalu.me)
- Email: [jain.aman3789@gmail.com](mailto:jain.aman3789@gmail.com)
- LinkedIn: [amanmalu](https://www.linkedin.com/in/amanmalu/)
- GitHub: [aman482006-beep](https://github.com/aman482006-beep)
- YouTube: [@AmanJain-4](https://www.youtube.com/@AmanJain-4)
- Instagram: [@aman.ja1n](https://www.instagram.com/aman.ja1n/)
