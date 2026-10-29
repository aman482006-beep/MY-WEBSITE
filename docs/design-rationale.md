# Design research & implementation rationale

Updated: 29 October 2026

## The design problem

This is not a generic software-engineer portfolio. It needs to communicate three related identities in the first few seconds:

1. Finance student with an interest in analysis and markets.
2. Builder who can make real software and research tools.
3. Creator who can explain what he learns clearly.

The site should feel personal, editorial and recognisable without making it difficult for recruiters to scan education, internships, skills, projects and contact information. The locked visual direction remains paper cream, near-black ink, one orange accent, restrained peach/blue/green panels, serif headlines and a clean sans-serif body.

## Reference set reviewed

This is a selected review of relevant portfolio, editorial and interaction references—not a claim that every website on the internet was inspected.

### 1. EASIN — editorial portfolio template
Reference: https://www.framplates.com/easin

Useful ideas: a warm paper palette with near-black text and one red-orange accent; editorial typography; small metadata labels; generous whitespace; project pages that communicate role and process; and motion that supports storytelling.

Used here: editorial headings, cream surfaces, concise uppercase labels, quiet section dividers and a clear project hierarchy.

Deliberately not copied: grain overlays, custom cursors, excessive parallax, or a full-viewport condensed wordmark. Those additions would be ornamental rather than useful for this portfolio.

### 2. Nik Klemenc — personal portfolio
Reference: https://www.landing.love/sites/klemenc/

Useful ideas: strong serif display type, a muted beige background, restrained orange emphasis and a clear statement of who the person is and what they do.

Used here: a strong personal statement, orange used as an accent rather than a background takeover, and readable content hierarchy.

### 3. Zhenya Rynzhuk — process-led portfolio
Reference: https://www.landing.love/sites/zhenyary/

Useful ideas: large editorial type, generous whitespace and an obvious sense of progression from introduction to process and work.

Used here: numbered project metadata, clear section labels and a more deliberate progression from the hero to projects and the Fokus case study.

### 4. Brooke Lighton — creator portfolio
Reference: https://www.brookelighton.com/

Useful ideas: state the creative role and value proposition immediately, then make the visitor's next action obvious.

Used here: content creation is presented as one of the core disciplines, with direct links to the real YouTube and Instagram accounts. The copy stays grounded rather than adding unverified creator metrics.

### 5. CSS Design Awards — 2025 Website of the Year and best-in-class winners
Reference: https://www.cssdesignawards.com/blog/2025-website-of-the-year-winners/430/

Useful ideas: the quality bar for typography, visual consistency, interaction design and a distinctive experience. The listed winners include Dropbox Brand, The Symphony of Vines, Bruno Simon's portfolio and Exat Typeface.

Used here: small but meaningful interaction states, custom project artwork and a coherent design language across pages.

Deliberately not copied: experimental 3D/WebGL-heavy experiences. They are not necessary to explain a finance student's work, and can add performance, accessibility and mobile-complexity costs.

### 6. Framer Awards — storytelling, interaction and animation
Reference: https://www.framer.com/awards/

Useful ideas: interactions feel better when each one serves a purpose—guiding attention, explaining a process or making a control's state obvious.

Used here: functional category filters on the project grid, visible selected states, working external links and restrained hover feedback.

Deliberately not copied: animation for animation's sake. The core story and links must still work if motion is reduced or unavailable.

### 7. Website Design Awards — interaction, accessibility and portfolio categories
Reference: https://websitedesignawards.com/

Useful ideas: assess the site as both a visual experience and a functional interface. Visual design, accessibility and interaction are separate quality dimensions.

Used here: explicit filter button states, focus styles inherited from the design system, responsive card grids and text labels that describe projects without depending on decorative graphics.

## Implemented changes in this pass

- Added a Selected Projects section to the homepage featuring four real repositories: Market Monitor, Agentic Finance Research Lab, Ideas to Execution and AirMath AI.
- Added category filters: All work, Finance & data, AI & systems, Product & web, and Education.
- Created project-specific interface illustrations with CSS/SVG rather than using unverified screenshots or fake product images.
- Marked the market chart as schematic, the maths example as illustrative, and the venture project as an independent recreation.
- Linked each project to its source repository; only Ideas to Execution is presented as having a public live demo in this section.
- Added Resources to the main navigation so the route is accessible on desktop as well as mobile.
- Preserved the warm editorial visual system, existing shared layout, animation layer, and the original YouTube API source.
- Expanded the Fokus case-study outline with clear TODOs for missing genuine screenshots and first-person engineering details.
- Kept finance work and résumé downloads marked as in preparation until real files and verified findings are supplied.

## Content integrity rules

- Do not show fabricated market prices, portfolio returns, revenue, users, testimonials, client logos or creator metrics.
- Do not imply every repository is a deployed production application.
- Ideas to Execution is an independent reproduction inspired by public venture-firm storytelling. It is not an official site or an affiliation.
- The Agentic Finance Research Lab repository contains an original research layer and also retains attributed upstream code; the portfolio should not claim ownership of upstream work.
- The project artworks are illustrations, not screenshots of the actual running apps.

## Verification checklist

### Completed
- npm run lint passed on commit 25f820bef987507a27dc83ac72cc8ad614e3e255.
- npx tsc --noEmit passed on that commit.
- npm run build completed successfully and generated static output for the six main page routes, metadata images, robots.txt and sitemap.xml.
- GitHub Pages artifact upload completed successfully.

### Still pending
- GitHub Pages deployment: GitHub returned HTTP 404 because Pages has not yet been enabled for this repository. Enable Pages in Settings → Pages and select GitHub Actions, then rerun the deployment.
- Visual QA in a real browser at 1440, 1280, 980, 700, 390 and 360 px.
- Lighthouse mobile run and documented scores.
- Reduced-motion, JavaScript-disabled and keyboard-only walkthrough.
- Add genuine Fokus screenshots, the approved résumé PDF and real finance-project files/takeaways.

## Remaining TODO(Aman)

1. Add public/Aman-Jain-Resume.pdf to enable the résumé download button.
2. Add 3–4 genuine screenshots of the current Fokus build.
3. Replace TODO(Aman) finance-work entries with completed PDF/Excel files and verified takeaways.
4. Add details about individual Fokus engineering decisions, testing and lessons learned.
5. Enable GitHub Pages and complete live browser QA.
