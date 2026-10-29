# Aman Jain — Portfolio

A responsive static-site recreation of the live portfolio at https://amanmalu.me/, organised into six pages: Home, Work, Creator, Recruiters, Resources and Contact.

## Preview locally

Open index.html in a browser. The site uses plain HTML, CSS and JavaScript; there is no package installation or build step.

## Deploy with GitHub Pages

1. Open the repository settings on GitHub.
2. Select Pages in the sidebar.
3. Under Build and deployment, choose Deploy from a branch.
4. Select the main branch and the root folder, then save.
5. After GitHub finishes deploying, open the Pages URL shown in Settings → Pages.

The project is structured for a project-site URL such as https://aman482006-beep.github.io/MY-WEBSITE/. Relative asset links are used so the same pages work under the repository path.

## Project structure

- index.html — home route
- work/index.html — Fokus case study
- creator/index.html — creator hub and content pillars
- recruiters/index.html — education, experience, skills and coursework
- resources/index.html — planned resource library
- contact/index.html — contact options
- assets/styles.css — shared design system and responsive layout
- assets/app.js — page content, navigation and lightweight interactions

## Notes

- The portrait is served from the live portfolio domain. If that domain or asset changes, update the portrait URL in assets/app.js.
- The résumé PDF is not included in this repository; the link opens an email request rather than pointing to a missing file.
- Social and project links point to their corresponding external profiles or project pages.
