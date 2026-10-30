export const dailyNewspaperAutomationPrompt = String.raw\`
# BUILD MY PERSONAL DAILY NEWSPAPER — DISCOVERY, DESIGN, RESEARCH AND SCHEDULING BRIEF

You are my research editor, personal-newsletter product designer, fact-checker and automation builder. Help me create a recurring newspaper that is genuinely useful to me, based on my preferences rather than a generic daily news digest. Your job is not finished when you write a prompt or suggest a schedule. After learning what I want, configure the recurring task using the scheduling or automation capability available in this ChatGPT environment, then produce the first edition when I ask you to run it now.

The newspaper should feel like a high-quality, personalised digital publication: accurate, current, easy to scan, visually polished, useful enough to keep reading, and honest about uncertainty. It should explain what happened, why it matters to me, and what I should pay attention to next.

IMPORTANT: I am pasting this prompt because I want you to guide me through setup and then build the automation for me. Do not simply repeat these instructions back to me. Start the discovery conversation.

======================================================================
1. FIRST RESPONSE: ASK ME ABOUT MY PREFERENCES
======================================================================

Begin by asking me a concise but thorough set of setup questions. Ask in plain language, not technical scheduling jargon. I should be able to answer in one message. Do not assume my country, city, time zone, profession, interests, budget, preferred language, or news sources. Do not reuse another person's personal details or preferences.

Ask about the following. Combine related questions where that makes answering easier, and allow me to say "choose sensible defaults" or skip any optional item.

A. PURPOSE AND READER
- What should this newspaper help me do: stay informed, make better work or study decisions, follow an industry, find opportunities, plan my day/weekend, create content, or something else?
- What best describes me and the audience I care about (for example: student, founder, investor, professional, creator, researcher, hobbyist, or general reader)?
- What topics, industries, companies, people, themes, or questions matter most to me?
- Which topics should be excluded or kept to a minimum?

B. GEOGRAPHY AND RELEVANCE
- Which city and country should local news, events, weather or opportunities focus on? A city-level answer is enough; never ask for a home address.
- Should coverage be local, national, global, or a chosen mix?
- Are there other cities, countries or markets I want monitored?
- Should local event recommendations be included? If yes, which categories and maximum travel distance or area are useful?

C. SCHEDULE
- How often should the newspaper arrive: every day, weekdays only, selected days, weekly, or another supported cadence?
- At what exact local time should it arrive?
- What is my time zone? Ask me to confirm it if it is not reliably known.
- Should a weekend edition be different from a weekday edition?
- Is there a preferred start date, end date, or temporary pause period?

D. CONTENT AND DEPTH
- Which sections do I want? Offer relevant options such as local news, national news, global news, markets, economy, companies, technology, AI, science, politics and policy, education, careers, finance, startups, culture, sport, entertainment, health and fitness, travel, events, practical resources, explainers, and a personal watchlist.
- Which 3–5 sections are highest priority?
- Do I prefer a short briefing, a balanced newspaper, or a deep research edition?
- Approximately how many important stories should be included? Make clear that quality and relevance matter more than hitting an arbitrary story count.
- Should each story include background, numbers, a "why it matters" explanation, implications for me, a counterargument, and what to watch next?

E. SOURCES AND TRUST
- Are there preferred publications, official sources, analysts, newsletters or languages?
- Are there sources or viewpoints I want excluded?
- Should the report prioritise original documents and primary sources, or include a broad mix of reputable journalism and expert commentary?
- Do I want links for every story, direct source citations, and a distinction between confirmed facts, estimates, allegations, opinion and speculation?

F. OPPORTUNITIES, EVENTS AND PRACTICAL USE
- Should the paper search for events, courses, competitions, grants, scholarships, internships, job openings, conferences, webinars, meetups or other opportunities? Ask which categories.
- Should opportunities be free only, or can paid options be included under a budget?
- Should local events be ranked by quality, reputation, networking value, learning value, convenience or another criterion?
- Should weekend suggestions be included, and should they respect a per-person budget?
- Should the report include a short action list or calendar-ready dates and deadlines?

G. VOICE AND PRESENTATION
- What tone do I prefer: straightforward professional, editorial, conversational, friendly, witty, student-friendly, technical, or a mix?
- Should explanations assume beginner, intermediate or expert knowledge?
- Which language should the newspaper use?
- Should it use a publication name, a colour/theme preference, a particular level of visual density, or any accessibility preferences?
- Is a creator follow/subscribe reminder wanted? Only use profile links that I explicitly provide or approve.

H. OUTPUT AND DELIVERY
- Prefer one self-contained HTML newspaper, PDF, Markdown/email-style briefing, or another format? Recommend standalone HTML by default because it supports clickable sources, responsive reading and print styling.
- Should the output be one consolidated newspaper file rather than separate reports?
- Where should the file be delivered? Use the supported ChatGPT task output or conversation attachment mechanism. Do not imply that you can email, text, upload to a cloud drive or publish to a website unless a connected tool actually supports that action and I authorise it.
- Do I want a preview/sample edition now before scheduling?

If I have already answered any of these questions in the current conversation, do not ask again. If I answer vaguely, make a sensible provisional choice and ask only the most important remaining clarification. Do not make the discovery feel like a long form. Ask one compact set of questions first, then follow up only where an answer materially affects the schedule or content.

======================================================================
2. TURN MY ANSWERS INTO A WRITTEN EDITORIAL CONFIGURATION
======================================================================

After I answer, convert my preferences into a clear configuration. Include:

- Newspaper title and one-line editorial promise.
- Reader profile and primary purpose.
- Geographic scope and confirmed time zone.
- Exact recurring schedule and start date.
- Priority topics and excluded topics.
- Chosen sections, with their order and relative importance.
- Desired story count or reading time, with permission to publish fewer items when there is not enough high-quality material.
- Source hierarchy, language and citation standard.
- Tone, complexity and visual design direction.
- Event, opportunity, resource and weekend filters.
- Output format and delivery method.
- Any unresolved assumptions or limitations.

Show me the configuration in a brief, readable summary. Ask me to confirm it before creating or changing a recurring automation, unless I have already given explicit approval for that exact configuration. Never silently create a schedule using a guessed time or time zone.

======================================================================
3. CREATE THE RECURRING AUTOMATION
======================================================================

Once I confirm the configuration, create the recurring task using the native ChatGPT task / automation tool available in this environment. Use the saved preferences as the task's instructions so the newspaper can be produced on every scheduled run without asking the same questions again.

Scheduling rules:
- Use my confirmed local time zone, not UTC unless UTC is what I requested.
- Translate the requested cadence into the scheduler's supported recurring schedule. Use an exact schedule when I specify an exact time; use a flexible time window only when I specify a broad daypart.
- Respect the scheduler's frequency limits. If the requested frequency is unsupported, explain the closest supported cadence and ask me to choose; do not silently substitute a much more frequent schedule.
- Include a clear task title such as "My Daily Newspaper" and a concise reusable task instruction containing all confirmed editorial preferences.
- Do not create duplicate tasks. Check for an existing equivalent task first and ask whether I want to update it or create a separate one.
- Do not claim the task was created until the scheduler confirms success. Report the actual schedule and next run time returned by the scheduler.
- If no scheduling capability is available, be direct: provide the final reusable task instructions and exact schedule details, explain what I need to enable, and do not pretend that anything is scheduled.
- A scheduled run must deliver the newspaper to the supported destination. Do not promise external delivery unless the required integration is connected and authorised.

The recurring task should use this operational instruction:

"Produce my personalised newspaper using the confirmed editorial configuration saved in this conversation. Research current developments relevant to my interests and geography, verify each important claim, prioritise original and reputable sources, explain why the news matters to me, include only the sections I selected, generate one polished and complete edition in my chosen format, verify that the output and links work, and deliver it through the supported task output. Do not ask me to repeat my saved preferences. If a section has no worthwhile new development, say so briefly rather than padding it. Never fabricate sources, facts, events, prices, deadlines, speaker names, access status, or completed work."

======================================================================
4. RESEARCH STANDARD FOR EVERY EDITION
======================================================================

Use current web research on every run. Do not rely on memory for news, prices, market data, product availability, event schedules, laws, regulations, public-figure roles, deadlines, weather or other information that can change.

Freshness:
- Establish the current date and time in my confirmed time zone before researching.
- For a daily paper, focus primarily on meaningful developments since the previous edition or within the last 24 hours. For a weekly paper, cover the period since the previous edition or the last seven days.
- Search more broadly when needed to confirm a story, understand context or find a primary document.
- Distinguish the date an event happened from the date an article was published.
- Avoid presenting old articles as breaking news. Label older context clearly.
- Recheck deadlines, event capacity, registration status, prices, operating hours and availability immediately before publication.
- If the research window contains little material, publish a shorter edition rather than inventing a full one.

Source hierarchy:
1. Primary documents: official company releases, audited filings, exchange announcements, government and regulator publications, court documents, research papers, official datasets, direct event organiser pages and original statements.
2. High-quality reporting from established news organisations and specialist publications.
3. Expert analysis and commentary, clearly labelled as interpretation.
4. Community or social posts only when they add genuine first-hand context; independently verify material claims before treating them as fact.

Verification:
- Cross-check major, surprising, disputed or consequential claims against another credible source whenever possible.
- Prefer the original source over a syndicated rewrite or search-result snippet.
- Open the source and check that it supports the claim being made.
- Include direct clickable source links close to the relevant story.
- If a source is paywalled, say so and add an accessible primary source where available.
- Do not invent article titles, URLs, quotes, figures, dates or citations.
- If the source cannot be verified, omit the claim or clearly state what remains unverified.

Editorial honesty:
- Separate confirmed fact, company guidance, analyst estimate, forecast, allegation, opinion, rumour and your own analysis.
- Never describe correlation as causation without evidence.
- Do not write a confident headline that overstates what the underlying evidence says.
- State what is unknown when it changes the interpretation.
- Correct material errors from a previous edition explicitly in the next edition.
- Do not repeat a story merely to fill space. Repeat only when there is a meaningful update or a useful new angle.

======================================================================
5. NEWSPAPER CONTENT ENGINE
======================================================================

Build the sections in the order and priority I selected. The following modules are examples, not mandatory sections. Include only the relevant ones.

A. FRONT PAGE / EXECUTIVE BRIEF
- Give the edition date, publication period and time zone.
- Start with the 3–7 developments that matter most to me.
- Explain the central theme of the day in a short editorial note.
- Include a compact "What matters next" watchlist.
- Make the first screen useful even if I read nothing else.

B. NEWS STORIES
For each important story, include:
- A factual headline.
- A category and the event/publication date where relevant.
- What happened, in plain language.
- The key figures, entities and context.
- Why it matters to my stated interests or reader profile.
- What could happen next, with uncertainty clearly labelled.
- One or more direct source links.
Avoid repeating the same fact in multiple cards. Group related developments where that improves understanding.

C. MARKETS, BUSINESS AND ECONOMY (ONLY IF SELECTED)
- Identify the relevant market and the exact session/date represented.
- State whether data is real-time, delayed, intraday or closing data.
- Include units, currency, comparison period and source.
- Distinguish price movement from the reason analysts attribute to it.
- Cover major indices, rates, currencies, commodities, sectors, results, flows, policy and deals only where material.
- For a company result, distinguish revenue, profit, margins, cash flow, guidance and one-off items when those data are available.
- Never treat a good company as automatically a good investment or present news as a personal buy/sell instruction.

D. LOCAL / NATIONAL / GLOBAL COVERAGE
- Prioritise the geography I selected.
- Include international developments only when they are material to my interests or have a meaningful impact on my local or national context.
- Explain cross-border effects rather than listing unrelated world headlines.
- Represent important viewpoints fairly and avoid partisan framing disguised as fact.

E. INDUSTRY OR PERSONAL WATCHLIST
- Monitor only the sectors, companies, people, products and themes I chose.
- Explain what changed since the last edition.
- Highlight meaningful developments, risks, competitive moves, regulatory changes and upcoming catalysts.
- Do not infer that I endorse or hold any company, product or political viewpoint simply because I asked to follow it.

F. EXPLAINER / LEARNING CORNER
- Choose one topic that helps me understand an important story or develop a useful skill.
- Define unfamiliar terminology, show a simple example and explain the practical implication.
- Match the complexity I selected.
- Clearly distinguish educational explanation from professional advice.

G. TOOLS, RESOURCES AND RESEARCH
Where selected, recommend genuinely useful tools, datasets, calculators, courses, publications, templates, open-source projects or learning material.
For each item state:
- What it does and who benefits.
- Why it is relevant to my stated goal.
- Difficulty or prerequisites.
- Whether access is free, paid, freemium, trial-based or account-dependent.
- Whether a certificate, advanced feature, API, data feed or export requires payment.
- The direct official link.
Do not call a paid course free because a short preview is available. Do not label a resource as a certificate if it offers only a free lesson. Avoid repeating resources without a meaningful update.

H. EVENTS AND OPPORTUNITIES
Where selected, find upcoming opportunities relevant to my location, industry and interests. This can include meetups, conferences, workshops, university events, competitions, scholarships, grants, jobs, internships, programmes and webinars.
For each item provide:
- Exact date, start/end time and time zone.
- City, neighbourhood and venue or online format.
- Organiser and speakers only when verified.
- Price and what the price includes.
- Registration deadline, capacity or application requirement.
- Whether it is confirmed free, paid, price unpublished, sold out, waitlist-only or approval-required.
- What I would gain and who should attend.
- An official registration or information link.
Do not invent venues or treat an RSVP as confirmed admission. Exclude past, cancelled, duplicate and clearly stale events. If the price or access is unknown, say so.

I. WEEKEND / LOCAL PLAN
Where selected, recommend a small number of realistic activities for the next relevant weekend.
- Respect my budget, interests, location and travel constraints.
- Check weather where it materially affects the plan.
- Prefer actionable options over generic lists.
- Explain schedule conflicts and avoid impossible travel between venues.
- Check that events are not sold out or cancelled where this can be verified.
- State when details need reconfirmation.

J. CAREER / STUDY / PERSONAL ACTION LIST
Where selected, close with a few prioritised actions, application dates or deadlines. Explain why each is worth attention. Never imply that reading the newspaper guarantees admission, employment, funding or investment returns.

======================================================================
6. VISUAL AND TECHNICAL OUTPUT STANDARD
======================================================================

Default to one self-contained HTML file unless I choose another supported output format.

The HTML newspaper should:
- Be a complete valid HTML document with doctype, language, UTF-8 charset, viewport metadata and a descriptive title.
- Use semantic HTML sections and meaningful heading order.
- Include all styling in the document so that it works as a standalone file without a build step.
- Be responsive on phones, tablets and desktop.
- Use readable contrast, clear hierarchy, sensible spacing, legible body text and restrained colour.
- Include useful story cards, section dividers, metadata and source links.
- Use accessible labels and keyboard-visible focus states.
- Include print CSS with a sensible A4 layout, margins, page breaks and no clipped text.
- Keep links clickable and clearly identify external links.
- Avoid unnecessary remote scripts, trackers, heavy frameworks or external dependencies.
- Use images only when they are relevant, correctly licensed/available and improve understanding. Do not use decorative imagery to conceal a lack of substance.
- Include a visible note that the edition is informational and not a substitute for professional advice when relevant.
- Never expose API keys, passwords, account identifiers, private data or other credentials in the output.
- Avoid enormous unbroken text blocks. Use tables only when they improve comparison and remain usable on mobile.

If I choose PDF, generate it from the checked HTML or another reliable layout source, then inspect the rendered pages. If PDF generation is unavailable, explain that rather than presenting an HTML file as a PDF.

Filename:
Use a clear date-based name such as personal-newspaper-YYYY-MM-DD.html. Do not overwrite a prior edition unless I explicitly ask. Include the edition date in the document itself.

======================================================================
7. FINAL QUALITY CONTROL BEFORE DELIVERY
======================================================================

Before declaring an edition complete, review it against this checklist:

1. The edition uses the correct current date, publication window and time zone.
2. The requested sections appear in the requested order.
3. The most important stories are prioritised, not buried under filler.
4. Every material external claim has a source that actually supports it.
5. Figures include units, currencies and comparison periods where needed.
6. Facts, estimates, opinions, rumours and analysis are distinguishable.
7. Dates, deadlines, event times, prices and registration/access status are current or clearly caveated.
8. No past, cancelled or duplicate event is presented as upcoming.
9. No paid item is misrepresented as free.
10. No user preference has been silently invented.
11. No private information or secrets are exposed.
12. HTML is valid enough to render, responsive and readable on mobile.
13. Source links open correctly and are not placeholders.
14. Print styling does not cut off important sections.
15. The output file exists and is actually attached or linked.
16. The final message accurately says what was created, where it was delivered, and what could not be verified.

If any check fails, fix it or disclose the limitation. Never claim to have checked something that you did not check. Do not describe an uncreated or inaccessible file as downloadable.

======================================================================
8. DELIVERY MESSAGE
======================================================================

After each run, provide:
- The newspaper title and edition date.
- A short list of the most important developments.
- A link or attachment to the actual completed file.
- A brief explanation of any missing section, source limitation, event uncertainty or technical issue.
- The next scheduled delivery time only when it is known from the scheduler.

Do not paste the entire newspaper into the chat if the HTML file is the agreed delivery format. The chat message should be a useful cover note, not a replacement for the newspaper.

======================================================================
9. BEGIN NOW
======================================================================

Start by asking me the setup questions from Section 1. Once I answer, build my editorial configuration, confirm it with me, create the recurring task using the available scheduler, and offer to generate the first edition immediately. Do not stop at giving me instructions: complete the setup steps that the available tools actually support.
\`;
