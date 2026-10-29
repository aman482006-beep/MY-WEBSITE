(function () {
  'use strict';

  const root = document.body.dataset.root || './';
  const email = 'jain.aman3789@gmail.com';
  const portraitUrl = 'https://amanmalu.me/_next/image?q=75&url=%2Fprofile-2.png&w=3840';
  const pathPart = window.location.pathname.replace(/\/+$/, '').split('/').pop();
  const routeNames = ['work', 'creator', 'recruiters', 'resources', 'contact'];
  const page = routeNames.indexOf(pathPart) >= 0 ? pathPart : 'home';
  const app = document.getElementById('app');

  function hrefFor(slug) {
    return slug === 'home' ? root : root + slug + '/';
  }

  function navLink(slug, label) {
    return '<a href="' + hrefFor(slug) + '"' +
      (page === slug ? ' aria-current="page"' : '') + '>' + label + '</a>';
  }

  document.getElementById('site-header').innerHTML =
    '<div class="nav-wrap">' +
      '<a class="brand" href="' + root + '" aria-label="Aman Jain home"><span class="brand-mark">AJ.</span><span>AMAN JAIN</span></a>' +
      '<nav class="main-nav" id="primary-nav" aria-label="Main navigation">' +
        navLink('home', 'Home') +
        navLink('work', 'Work') +
        navLink('creator', 'Creator') +
        navLink('recruiters', 'Recruiters') +
        navLink('resources', 'Resources') +
        navLink('contact', 'Contact') +
      '</nav>' +
      '<a class="nav-cta" href="' + hrefFor('contact') + '">Let’s connect <span>↗</span></a>' +
      '<button class="menu-toggle" id="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-nav"><span></span><span></span></button>' +
    '</div>';

  document.getElementById('site-footer').innerHTML =
    '<div class="footer-wrap">' +
      '<div class="footer-brand"><a class="brand" href="' + root + '"><span class="brand-mark">AJ.</span><span>AMAN JAIN</span></a><p>Finance, technology and communication — built with curiosity.</p></div>' +
      '<nav class="footer-nav" aria-label="Footer navigation">' +
        navLink('home', 'Home') + navLink('work', 'Work') + navLink('creator', 'Creator') +
        navLink('recruiters', 'Recruiters') + navLink('resources', 'Resources') + navLink('contact', 'Contact') +
      '</nav>' +
      '<div class="footer-bottom"><span>© <span id="footer-year">2026</span> Aman Jain.</span><span>Built with curiosity. <a href="#top" class="footer-top-link">Back to top ↑</a></span></div>' +
    '</div>';

  const views = {
    home: function () {
      return [
        '<section class="hero wrap">',
          '<div class="hero-copy">',
            '<p class="eyebrow"><span class="dot"></span> FINANCE × TECHNOLOGY × COMMUNICATION</p>',
            '<h1>I study finance.<br><span>I build with technology.</span><br>I create to make ideas useful.</h1>',
            '<p class="hero-lead">I’m Aman Jain, a BBA student exploring finance, useful technology and educational content. I turn what I learn into projects I can test, improve and share.</p>',
            '<div class="meta-row"><span class="meta-chip">BBA · CHRIST University</span><span class="meta-chip">CFA Level II candidate</span><span class="meta-chip">Bengaluru, India</span></div>',
            '<div class="button-row"><a class="button button-primary" href="' + hrefFor('work') + '">Explore my work <span>↗</span></a><a class="button button-secondary" href="' + hrefFor('creator') + '">Explore my content</a></div>',
            '<div class="social-row"><a href="https://github.com/aman482006-beep" target="_blank" rel="noreferrer">GitHub<span>↗</span></a><a href="https://www.linkedin.com/in/amanmalu/" target="_blank" rel="noreferrer">LinkedIn<span>↗</span></a><a href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer">YouTube<span>↗</span></a><a href="https://www.instagram.com/aman.ja1n/" target="_blank" rel="noreferrer">Instagram<span>↗</span></a></div>',
          '</div>',
          '<div class="hero-art" aria-label="Aman Jain portrait and areas of interest">',
            '<div class="art-topline"><span>Personal portfolio · 2026</span><span class="art-status"><span class="live-dot"></span> In progress</span></div>',
            '<figure class="portrait-frame"><img src="' + portraitUrl + '" alt="Portrait of Aman Jain" fetchpriority="high"><figcaption class="portrait-note"><span>Aman Jain<br>BBA · Finance &amp; Marketing Analytics</span><span>Bengaluru<br>India</span></figcaption></figure>',
            '<div class="art-sticker sticker-left">Three lenses<strong>Ideas · Markets · Tech</strong></div>',
            '<div class="art-sticker sticker-right">Curiosity in motion<strong>Learn → Build → Share</strong></div>',
            '<div class="art-bottomline"><span>Same curiosity. Different ways.</span><span>↘</span></div>',
          '</div>',
        '</section>',
        '<div class="ticker"><div class="ticker-inner"><span>FINANCE</span><span class="ticker-star">✳</span><span>BUILD</span><span class="ticker-star">✳</span><span>CREATE</span><span class="ticker-star">✳</span><span>REPEAT WITH INTENTION</span></div></div>',
        '<section class="section wrap">',
          '<div class="section-head"><div><p class="section-kicker">THREE AREAS I EXPLORE</p><h2>Different interests.<br>A common mindset.</h2></div><p class="section-note">I like learning how things work, testing the idea in the real world, then making the result easier for someone else to use.</p></div>',
          '<div class="card-grid">',
            '<a class="info-card" href="' + hrefFor('work') + '"><span class="card-index">01 / FINANCE</span><span class="card-icon">↗</span><div><h3>Markets &amp; analysis</h3><p>Markets, valuation, financial analysis and the business stories behind the numbers.</p></div><span class="card-link">Explore finance work <span>↗</span></span></a>',
            '<a class="info-card" href="' + hrefFor('work') + '"><span class="card-index">02 / BUILD</span><span class="card-icon">⌘</span><div><h3>Useful technology</h3><p>AI experiments, financial-data tools, dashboards and useful software.</p></div><span class="card-link">See what I build <span>↗</span></span></a>',
            '<a class="info-card" href="' + hrefFor('creator') + '"><span class="card-index">03 / CREATE</span><span class="card-icon">◉</span><div><h3>Explain and share</h3><p>Finance explainers, educational videos and resources shared as I learn.</p></div><span class="card-link">Watch my content <span>↗</span></span></a>',
          '</div>',
        '</section>',
        '<section class="section section-muted"><div class="wrap featured-project">',
          '<div class="project-visual"><div class="visual-orb"></div><div class="visual-label"><span>FEATURED PROJECT</span><span>FOCUS / 01</span></div><div class="app-window"><div class="app-window-top"><strong>◉ Fokus</strong><span>Focus together</span></div><div class="app-big-number">45:00 <small>deep work</small></div><div class="app-progress"><span></span></div><div class="app-session"><strong>Deep Work</strong><em>45 min</em></div><div class="app-session"><strong>CFA Study</strong><em>30 min</em></div><div class="app-session"><strong>Reading</strong><em>20 min</em></div></div></div>',
          '<div class="project-copy"><p class="section-kicker">FEATURED PROJECT · PRODUCTIVITY</p><h2>Fokus</h2><p class="project-subtitle">Stay on Track, Together.</p><p>A Flutter productivity app bringing focus sessions, ambient environments, reminders and progress tracking into one workspace. The idea: less noise, more focus.</p><div class="tag-row"><span class="tag">Flutter</span><span class="tag">Windows</span><span class="tag">Productivity</span><span class="tag">Active development</span></div><div class="button-row"><a class="button button-primary" href="' + hrefFor('work') + '">View case study <span>↗</span></a><a class="text-link" href="https://github.com/aman482006-beep/FOKUS-PRODUCTIVITY" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div></div>',
        '</div></section>',
        '<section class="section wrap"><div class="work-in-progress"><div><p class="section-kicker">FINANCE · WORK IN PROGRESS</p><h3>Files first.<br>Findings second.</h3></div><div><p>I’m preparing shareable models and analysis. I’ll publish each with its real file and verified takeaways—not a case study that only looks finished.</p><a class="text-link" href="' + hrefFor('recruiters') + '">Explore finance work and background <span>↗</span></a></div></div></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">CREATOR</p><h2>Learning in public.</h2></div><p class="section-note">Finance, career resources and the tools I experiment with along the way.</p></div><div class="featured-project"><a class="video-placeholder" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer" aria-label="Visit Aman Jain on YouTube"><span class="play-button">▶</span><span class="video-caption"><span>Latest on YouTube</span><span>Watch channel ↗</span></span></a><div class="project-copy"><p class="section-kicker">FINANCE · LEARNING · USEFUL IDEAS</p><h2>Make complex ideas easier to use.</h2><p>Long-form videos and concise explainers about finance, learning and practical resources. Featured videos will appear here when ready to spotlight.</p><div class="button-row"><a class="button button-primary" href="' + hrefFor('creator') + '">Explore creator hub <span>↗</span></a><a class="text-link" href="https://www.instagram.com/aman.ja1n/" target="_blank" rel="noreferrer">Instagram <span>↗</span></a></div></div></div></div></section>',
        '<section class="section wrap"><div class="section-head"><div><p class="section-kicker">RECRUITERS</p><h2>A quick overview.</h2></div><p class="section-note">Education, internships, skills and career interests in one place.</p></div><div class="stat-grid"><div class="stat-card"><strong>BBA</strong><span>Finance &amp; Marketing Analytics · CHRIST University</span></div><div class="stat-card"><strong>2024–27</strong><span>Undergraduate programme</span></div><div class="stat-card"><strong>Level II</strong><span>CFA Program candidate</span></div><div class="stat-card"><strong>Finance</strong><span>Internship experience at Nuvama Wealth and DAGAS</span></div></div><div class="button-row"><a class="button button-secondary" href="' + hrefFor('recruiters') + '">View full profile <span>↗</span></a><a class="text-link" href="mailto:' + email + '?subject=Resume%20request%20-%20Aman%20Jain">Request résumé by email <span>↗</span></a></div></section>',
        '<section class="section wrap section-tight"><div class="contact-band"><div><p class="section-kicker">CONTACT</p><h2>Have something interesting in mind?</h2><p>Professional opportunities, project collaborations or just a thoughtful conversation — let’s connect.</p></div><a class="button" href="' + hrefFor('contact') + '">Let’s talk <span>↗</span></a></div></section>'
      ].join('');
    },

    work: function () {
      return [
        '<section class="page-hero wrap"><p class="eyebrow"><span class="dot"></span> SELECTED WORK · CASE STUDY</p><h1>Fokus — Stay on Track, Together.</h1><p class="page-intro">Fokus is a cross-platform Flutter productivity app designed to make deep work easier to start and easier to sustain. It brings focus sessions, ambient environments, reminders, analytics and local persistence into one application.</p><div class="page-meta"><span>Cross-platform Flutter app</span><span>Windows version on Microsoft Store</span><span>Personal project · Active development</span></div><div class="button-row"><a class="button button-primary" href="https://apps.microsoft.com/detail/9P7NJLDQ8GKK?gl=IN&amp;hl=en-us&amp;ocid=pdpshare" target="_blank" rel="noreferrer">Get Fokus <span>↗</span></a><a class="button button-secondary" href="https://github.com/aman482006-beep/FOKUS-PRODUCTIVITY" target="_blank" rel="noreferrer">View on GitHub <span>↗</span></a></div></section>',
        '<div class="wrap"><div class="project-visual case-visual"><div class="visual-orb"></div><div class="visual-label"><span>PRODUCTIVITY WORKSPACE</span><span>BUILD / 01</span></div><div class="app-window"><div class="app-window-top"><strong>◉ Fokus</strong><span>Focus together</span></div><div class="app-big-number">45:00 <small>deep work</small></div><div class="app-progress"><span></span></div><div class="app-session"><strong>Deep Work</strong><em>45 min</em></div><div class="app-session"><strong>CFA Study</strong><em>30 min</em></div><div class="app-session"><strong>Reading</strong><em>20 min</em></div></div></div></div>',
        '<section class="section wrap"><div class="content-section content-grid"><div class="content-label">01 · THE PROBLEM</div><div class="content-main"><h2>Make focused work easier to begin and sustain.</h2><p>The project is built around a straightforward idea: a timer by itself is not a complete productivity system. Fokus combines focus sessions with ambient environments, reminders and lightweight personal systems so the work session sits inside a broader routine.</p><p><strong>Who it is for:</strong> people who want a focused workspace with fewer separate tools for sessions, sound, reminders and progress.</p><p class="small-muted">Project scope and feature descriptions are based on the Fokus repository README.</p></div></div>',
        '<div class="content-section content-grid"><div class="content-label">02 · WHAT I BUILT</div><div class="content-main"><h2>A small productivity workspace, not just a timer.</h2><div class="feature-list"><div class="feature-item"><b>01</b><div><strong>Focus sessions</strong><span>Structured blocks for deliberate work.</span></div></div><div class="feature-item"><b>02</b><div><strong>Ambient audio and visual scenes</strong><span>Environment controls to support a session.</span></div></div><div class="feature-item"><b>03</b><div><strong>Reminders and notifications</strong><span>Prompts that help a routine stick.</span></div></div><div class="feature-item"><b>04</b><div><strong>Productivity analytics</strong><span>A view of sessions and progress over time.</span></div></div><div class="feature-item"><b>05</b><div><strong>Local persistence</strong><span>Keep user state across sessions.</span></div></div><div class="feature-item"><b>06</b><div><strong>File and PDF workflows</strong><span>Support for document-related tasks.</span></div></div><div class="feature-item"><b>07</b><div><strong>Desktop window controls</strong><span>Platform-aware desktop behavior.</span></div></div><div class="feature-item"><b>08</b><div><strong>Deep links</strong><span>Open into the right part of the app.</span></div></div></div></div></div>',
        '<div class="content-section content-grid"><div class="content-label">03 · STACK</div><div class="content-main"><h2>Tools and integrations.</h2><p>The technology stack below is listed in the project README; packages may not be used by every platform build.</p><div class="chip-cloud"><span>Flutter / Dart</span><span>Riverpod</span><span>GetIt</span><span>SharedPreferences</span><span>just_audio</span><span>flutter_local_notifications</span><span>fl_chart</span><span>file_picker</span><span>Syncfusion PDF</span><span>Google ML Kit</span><span>window_manager</span><span>Win32 / FFI</span><span>app_links</span></div></div></div>',
        '<div class="content-section content-grid"><div class="content-label">04 · FINANCE &amp; ANALYSIS</div><div class="content-main"><h2>Finance work, published with the evidence attached.</h2><p>I’m preparing shareable models and analysis. This section will grow when the underlying files and findings are ready to verify.</p><a class="text-link" href="' + hrefFor('recruiters') + '">View background and focus areas <span>↗</span></a></div></div></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">NEXT</p><h2>Fokus is still under active development.</h2></div><p class="section-note">This page covers product scope and technology. Genuine screenshots and specific engineering decisions can be added as the case study develops.</p></div><div class="button-row"><a class="button button-primary" href="https://apps.microsoft.com/detail/9P7NJLDQ8GKK?gl=IN&amp;hl=en-us&amp;ocid=pdpshare" target="_blank" rel="noreferrer">Get Fokus <span>↗</span></a><a class="button button-secondary" href="https://github.com/aman482006-beep/FOKUS-PRODUCTIVITY" target="_blank" rel="noreferrer">View source <span>↗</span></a></div></div></section>',
        '<section class="section wrap section-tight"><div class="contact-band"><div><p class="section-kicker">HAVE A PROJECT IN MIND?</p><h2>Let’s build something useful.</h2><p>For thoughtful collaborations around finance, software or learning, start a conversation.</p></div><a class="button" href="' + hrefFor('contact') + '">Get in touch <span>↗</span></a></div></section>'
      ].join('');
    },

    creator: function () {
      return [
        '<section class="page-hero wrap"><p class="eyebrow"><span class="dot"></span> CREATOR HUB</p><h1>Finance, learning and useful ideas — shared in public.</h1><p class="page-intro">I create educational content around finance, investing concepts, career resources and the tools I explore along the way. The aim is to make useful ideas easier to understand and apply.</p><div class="button-row"><a class="button button-primary" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer">Subscribe on YouTube <span>↗</span></a><a class="button button-secondary" href="https://www.instagram.com/aman.ja1n/" target="_blank" rel="noreferrer">Follow on Instagram <span>↗</span></a></div></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">CREATOR</p><h2>Latest on YouTube</h2></div><p class="section-note">Long-form videos, fresh from my channel. Featured videos will appear here when they are ready to highlight.</p></div><div class="featured-project"><a class="video-placeholder" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer" aria-label="Visit the YouTube channel"><span class="play-button">▶</span><span class="video-caption"><span>Finance · Learning · Useful ideas</span><span>Open channel ↗</span></span></a><div class="project-copy"><p class="section-kicker">YOUTUBE CHANNEL</p><h2>Learn it.<br>Test it.<br>Explain it.</h2><p>Browse the channel for videos on finance and learning. New featured videos will appear here when available, rather than filling the page with unverified or outdated embeds.</p><div class="button-row"><a class="button button-primary" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer">Visit the channel <span>↗</span></a></div></div></div></div></section>',
        '<section class="section wrap"><div class="section-head"><div><p class="section-kicker">CONTENT PILLARS</p><h2>What I like to share.</h2></div><p class="section-note">Three related lanes: understand the money, learn the craft, and experiment with the tools.</p></div><div class="card-grid">',
          '<article class="info-card"><span class="card-index">01 / BREAKDOWNS</span><span class="card-icon">₹</span><div><h3>Finance education</h3><p>Financial concepts, mutual funds, investment fundamentals, valuation frameworks and explainers that connect classroom ideas to real-world mechanics.</p></div><span class="card-link">Breakdowns and explainers <span>↗</span></span></article>',
          '<article class="info-card"><span class="card-index">02 / STUDY</span><span class="card-icon">↗</span><div><h3>Learning and careers</h3><p>CFA preparation, undergraduate career resources, analytical certifications and study systems for students learning finance.</p></div><span class="card-link">Guides and study blueprints <span>↗</span></span></article>',
          '<article class="info-card"><span class="card-index">03 / EXPERIMENTS</span><span class="card-icon">⌘</span><div><h3>Tools and experiments</h3><p>Software tools, AI workflows, dashboards and code experiments built to test ideas and document the learning process.</p></div><span class="card-link">Build notes and walkthroughs <span>↗</span></span></article>',
        '</div></section>',
        '<section class="section section-dark"><div class="wrap"><div class="section-head"><div><p class="section-kicker">THE APPROACH</p><h2>Useful beats impressive-looking.</h2></div><p class="section-note">The goal is to explain clearly, show the work where possible, and be upfront about what is still a work in progress.</p></div><div class="stat-grid"><div class="stat-card"><strong>Explain</strong><span>Start with the question someone actually has.</span></div><div class="stat-card"><strong>Build</strong><span>Use real examples, models and tools where relevant.</span></div><div class="stat-card"><strong>Verify</strong><span>Separate facts and evidence from assumptions.</span></div><div class="stat-card"><strong>Share</strong><span>Leave people with something practical to use.</span></div></div></div></section>',
        '<section class="section wrap section-tight"><div class="contact-band"><div><p class="section-kicker">COLLABORATE</p><h2>Want to make something useful together?</h2><p>For creator partnerships, finance education or a project worth documenting, get in touch.</p></div><a class="button" href="' + hrefFor('contact') + '">Start a conversation <span>↗</span></a></div></section>'
      ].join('');
    },

    recruiters: function () {
      return [
        '<section class="page-hero wrap"><p class="eyebrow"><span class="dot"></span> FOR RECRUITERS &amp; COLLABORATORS</p><h1>A clear picture of my background.</h1><p class="page-intro">I’m Aman Jain, a BBA student at CHRIST (Deemed to be University), Bengaluru, specialising in Finance &amp; Marketing Analytics. I explore finance, analytical tools, fintech, technology and educational content.</p><div class="note-card" style="max-width:690px;margin-top:25px"><p class="section-kicker">CURRENTLY</p><p>Exploring internships in finance, fintech, business analysis or financial analysis.</p></div><div class="button-row"><a class="button button-primary" href="mailto:' + email + '?subject=Resume%20request%20-%20Aman%20Jain">Request résumé (PDF) <span>↗</span></a><a class="button button-secondary" href="https://www.linkedin.com/in/amanmalu/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">AT A GLANCE</p><h2>A quick overview.</h2></div><p class="section-note">A snapshot of education, internships, CFA progress and the areas I want to keep developing.</p></div><div class="two-column-cards">',
          '<article class="note-card"><p class="section-kicker">EDUCATION</p><h3>BBA — Finance &amp; Marketing Analytics</h3><p>CHRIST (Deemed to be University), Bengaluru · 2024–2027</p></article>',
          '<article class="note-card"><p class="section-kicker">INTERNSHIPS</p><h3>Finance internship experience</h3><p>Nuvama Wealth · DAGAS</p></article>',
          '<article class="note-card"><p class="section-kicker">CFA PROGRAM</p><h3>Level II candidate</h3><p>Continuing to build financial analysis, valuation and portfolio knowledge.</p></article>',
          '<article class="note-card"><p class="section-kicker">FOCUS</p><h3>Finance, analytics and technology</h3><p>Content and communication alongside analytical and practical project work.</p></article>',
        '</div></div></section>',
        '<section class="section wrap"><div class="section-head"><div><p class="section-kicker">SKILLS</p><h2>Areas I work across.</h2></div><p class="section-note">A mix of finance fundamentals, commercial thinking, software tools and communication.</p></div><div class="four-column-cards">',
          '<article class="skill-card"><h3>Finance &amp; analytics</h3><ul><li>Financial analysis</li><li>Financial modelling fundamentals</li><li>Valuation fundamentals</li><li>Portfolio risk and return</li><li>Market research</li><li>Financial data analysis</li></ul></article>',
          '<article class="skill-card"><h3>Business &amp; commercial</h3><ul><li>Commercial analysis</li><li>Finance-related business problems</li><li>Sales and marketing analytics</li><li>Competitive market research</li></ul></article>',
          '<article class="skill-card"><h3>Technology &amp; software</h3><ul><li>Microsoft Excel</li><li>Python · Pandas · NumPy · FastAPI</li><li>GitHub and version control</li><li>Financial data workflows and APIs</li><li>AI-assisted development</li><li>Next.js · PostgreSQL</li></ul></article>',
          '<article class="skill-card"><h3>Content &amp; communication</h3><ul><li>Finance content creation</li><li>Explaining technical and financial concepts</li><li>DaVinci Resolve</li><li>Canva and visual presentation</li></ul></article>',
        '</div></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">COURSEWORK &amp; PROGRAMMES</p><h2>Selected qualifications.</h2></div><p class="section-note">Selected courses and programmes supporting finance, valuation and market knowledge.</p></div><div class="two-column-cards">',
          '<article class="credential-card"><span class="credential-meta">SOIC · SCHOOL OF INTRINSIC COMPOUNDING</span><h3>Learn to Analyse Stocks</h3><p>Fundamental stock analysis, business moat evaluation and reading Indian annual reports.</p></article>',
          '<article class="credential-card"><span class="credential-meta">FINANCIAL VALUATION SIMULATION</span><h3>Investment Banking Simulator</h3><p>Core transaction mechanics, DCF projections and comparable company analysis.</p></article>',
          '<article class="credential-card"><span class="credential-meta">PROFESSIONAL COURSEWORK</span><h3>Financial Modeling &amp; Excel Analysis</h3><p>Three-statement modelling, sensitivity tables and scenario forecasting.</p></article>',
          '<article class="credential-card"><span class="credential-meta">ACADEMIC &amp; PROFESSIONAL SEMINAR</span><h3>Private Equity &amp; Venture Capital Course</h3><p>Term sheets, capitalization tables, deal sourcing and investment committee evaluation.</p></article>',
          '<article class="credential-card"><span class="credential-meta">SEBI / NISM PROGRAMMES</span><h3>Investor Awareness &amp; Market Regulations</h3><p>Investor protection, market regulation and financial-market fundamentals.</p></article>',
        '</div></div></section>',
        '<section class="section wrap section-tight"><div class="contact-band"><div><p class="section-kicker">GET IN TOUCH</p><h2>Interested in working together?</h2><p>For internships, projects or professional conversations, email is the simplest way to reach me.</p></div><a class="button" href="mailto:' + email + '?subject=Professional%20opportunity%20-%20Aman%20Jain">Email Aman <span>↗</span></a></div></section>'
      ].join('');
    },

    resources: function () {
      const resourceSubject = 'Resource suggestion for Aman Jain’s portfolio';
      const resourceBody = 'Hi Aman,%0D%0A%0D%0AI would find this resource useful:%0D%0A%0D%0A';
      const resourceMail = 'mailto:' + email + '?subject=' + encodeURIComponent(resourceSubject) + '&body=' + resourceBody;
      return [
        '<section class="page-hero wrap"><p class="eyebrow"><span class="dot"></span> RESOURCE LIBRARY</p><h1>Useful tools for learning finance.</h1><p class="page-intro">I’m shaping this library around practical tools, not downloads for the sake of having downloads. These are the areas I plan to build and share as each resource is tested and ready.</p></section>',
        '<section class="section section-muted"><div class="wrap"><div class="section-head"><div><p class="section-kicker">PLANNED FOCUS</p><h2>Resources with a job to do.</h2></div><p class="section-note">Each tool will be published when it is useful, tested and clear enough to stand on its own.</p></div><div class="card-grid">',
          '<article class="resource-card"><span class="card-index">PLANNED FOCUS 01</span><h2>Finance toolkits</h2><p>Clear, practical ways to explore financial statements, valuation assumptions and portfolio risk.</p><div class="tag-row"><span class="tag">Excel</span><span class="tag">Analysis</span><span class="tag">Valuation</span></div></article>',
          '<article class="resource-card"><span class="card-index">PLANNED FOCUS 02</span><h2>CFA study systems</h2><p>Revision trackers, formula references and ways to organise a demanding study plan.</p><div class="tag-row"><span class="tag">Revision</span><span class="tag">Fixed income</span><span class="tag">FSA</span></div></article>',
          '<article class="resource-card"><span class="card-index">PLANNED FOCUS 03</span><h2>Creator workflows</h2><p>Frameworks for turning a finance topic into a concise, useful video or visual explanation.</p><div class="tag-row"><span class="tag">Scripting</span><span class="tag">Storytelling</span><span class="tag">Video</span></div></article>',
        '</div></div></section>',
        '<section class="section wrap"><div class="contact-band"><div><p class="section-kicker">SHAPE THE LIBRARY</p><h2>What would actually help you?</h2><p>Suggest a topic and I’ll use it to prioritise future resources. This opens an email draft; it does not submit data to the website.</p></div><a class="button" href="' + resourceMail + '">Suggest a resource <span>↗</span></a></div></section>'
      ].join('');
    },

    contact: function () {
      const starter = 'Hi Aman, I came across your portfolio and would like to discuss an opportunity regarding...';
      const subject = 'Professional Opportunity Inquiry - Aman Jain';
      const mailto = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(starter);
      return [
        '<section class="page-hero wrap"><p class="eyebrow"><span class="dot"></span> CONTACT</p><h1>Have something interesting in mind?</h1><p class="page-intro">Whether it’s a professional opportunity, a project collaboration, or a creator partnership, I’m open to a thoughtful conversation.</p></section>',
        '<section class="section section-muted"><div class="wrap"><div class="contact-grid">',
          '<div class="contact-panel"><p class="section-kicker">START A CONVERSATION</p><h2>What would you like to discuss?</h2><p>Choose the closest starting point. Each option opens an email draft so you can add context and send it when you are ready.</p><div class="contact-options">',
            '<a class="contact-option" href="mailto:' + email + '?subject=Professional%20opportunity%20-%20Aman%20Jain"><span class="option-symbol">↗</span><div><strong>Professional opportunities</strong><span>Internships, roles and professional introductions.</span></div></a>',
            '<a class="contact-option" href="mailto:' + email + '?subject=Project%20collaboration%20-%20Aman%20Jain"><span class="option-symbol">⌘</span><div><strong>Project collaborations</strong><span>Software, analytics and finance projects.</span></div></a>',
            '<a class="contact-option" href="mailto:' + email + '?subject=Creator%20partnership%20-%20Aman%20Jain"><span class="option-symbol">◉</span><div><strong>Creator &amp; brand partnerships</strong><span>Educational content and brand partnerships.</span></div></a>',
            '<a class="contact-option" href="mailto:' + email + '?subject=Hello%20Aman%20Jain"><span class="option-symbol">✳</span><div><strong>General questions</strong><span>Feedback, a question or a simple hello.</span></div></a>',
          '</div><div class="email-preview"><p class="preview-label">EMAIL SUBJECT</p><p>' + subject + '</p><p class="preview-label">MESSAGE STARTER</p><p>' + starter + '</p><a class="text-link" href="' + mailto + '">Open email draft <span>↗</span></a></div></div>',
          '<aside class="contact-panel"><p class="section-kicker">DIRECT DETAILS</p><h2>Reach me directly.</h2><p>For internships, projects or professional conversations, email is the simplest way to reach me.</p><div class="copy-row"><strong>' + email + '</strong><button id="copy-email" class="copy-button" type="button">Copy email address</button></div><p class="copy-feedback" id="copy-feedback" aria-live="polite"></p><div class="copy-row"><strong>Bengaluru, India</strong><span class="tag">Location</span></div><div class="copy-row"><strong>Open to opportunities, projects and collaborations.</strong></div><div class="tag-row"><a class="tag" href="https://www.linkedin.com/in/amanmalu/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a class="tag" href="https://www.youtube.com/@AmanJain-4" target="_blank" rel="noreferrer">YouTube ↗</a><a class="tag" href="https://www.instagram.com/aman.ja1n/" target="_blank" rel="noreferrer">Instagram ↗</a></div></aside>',
        '</div></div></section>'
      ].join('');
    }
  };

  const pageTitles = {
    home: 'Aman Jain — Finance × Technology × Communication',
    work: 'Fokus Case Study — Aman Jain',
    creator: 'Creator Hub — Aman Jain',
    recruiters: 'Recruiters — Aman Jain',
    resources: 'Resources — Aman Jain',
    contact: 'Contact — Aman Jain'
  };

  document.title = pageTitles[page];
  document.body.dataset.page = page;
  app.innerHTML = views[page]();

  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Toggle navigation');
    });
    nav.querySelectorAll('a').forEach(function (item) {
      item.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Toggle navigation');
      });
    });
  }

  const copyButton = document.getElementById('copy-email');
  if (copyButton) {
    copyButton.addEventListener('click', async function () {
      const feedback = document.getElementById('copy-feedback');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temp = document.createElement('textarea');
          temp.value = email;
          temp.style.position = 'fixed';
          temp.style.opacity = '0';
          document.body.appendChild(temp);
          temp.select();
          const success = document.execCommand('copy');
          temp.remove();
          if (!success) throw new Error('Clipboard is unavailable');
        }
        copyButton.textContent = 'Copied ✓';
        if (feedback) feedback.textContent = 'Email address copied to your clipboard.';
      } catch (error) {
        if (feedback) feedback.textContent = 'Copy was blocked by the browser. Select the email address to copy it manually.';
      }
    });
  }

  const year = document.getElementById('footer-year');
  if (year) year.textContent = String(new Date().getFullYear());

  document.querySelectorAll('.footer-top-link').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
})();