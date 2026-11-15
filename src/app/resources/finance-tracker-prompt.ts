export const financeTrackerPrompt = String.raw\`# BUILD MY PERSONAL FINANCE TRACKER — COMPLETE DEVELOPMENT PROMPT

You are a senior full-stack developer, financial product designer, UI/UX specialist and software architect.

Build a complete, personalised Personal Finance Tracker inspired by the functionality and user experience of Moneta.

Reference implementation:
https://github.com/aman482006-beep/AI-Personal-Finance-Manager

Your task is to recreate the reference project's core functionality as a usable application, while allowing me to personalise it with my own financial requirements.

IMPORTANT: I do not want a static dashboard, a UI mockup or a basic expense tracker. I want a fully functional application in which every button, chart, calculation, import function and financial insight actually works.

If you can access the reference repository, inspect its files and functionality before implementation. Use it as a behavioural reference. Do not stop at describing a plan: implement the application.

============================================================
1. PERSONALISE THE APPLICATION FIRST
============================================================

Start by asking me a concise set of questions:

- What should the application be called?
- Which country and currency should it use?
- What are my main sources of income?
- Which expense categories matter to me?
- Which monthly budgets would I like to track?
- Do I need to track multiple accounts?
- Which colour theme do I prefer?

Do not make this process unnecessarily complicated. Allow me to skip questions and use sensible defaults. All preferences must remain editable in Settings.

The application must be usable immediately, even before I import any real financial data.

============================================================
2. MAIN APPLICATION STRUCTURE
============================================================

Build a clean dashboard with these sections:

A. OVERVIEW

Display four key metrics:
- Net cash flow.
- Total income.
- Total expenses.
- Savings rate.

Also include:
- Monthly income versus expense chart.
- Interactive expense breakdown by category.
- Recent transactions.
- Monthly budget progress.
- A useful observation about my spending.

Provide date filters:
- This month.
- Last 30 days.
- This quarter.
- This year.
- All time.

Every chart and metric must update when the selected period changes.

B. TRANSACTIONS

Allow me to:
- Add income manually.
- Add expenses manually.
- Record transfers between accounts.
- Set the transaction date, description, amount, category and account.
- Add optional notes.
- Search transactions.
- Filter by category and transaction type.
- Delete transactions.
- Import transactions through CSV files.
- Export transactions into CSV format.

Store amounts as positive numbers and distinguish income, expenses and transfers using transaction types. Transfers must not inflate income or expenses.

C. CSV STATEMENT IMPORT

This is an essential feature.

Allow me to upload bank statements and financial transaction CSV files.

The application must:
1. Read CSV files.
2. Display the available columns.
3. Let me map columns to the correct fields.
4. Support transaction date, description, debit, credit, amount, balance, reference number and account name.
5. Identify income or expenditure where possible.
6. Validate dates and amounts.
7. Identify potential duplicate transactions.
8. Show skipped or invalid rows.
9. Let me review the import before saving.
10. Categorise transactions using merchant and description-based rules.

Handle different bank statement formats without assuming every CSV uses identical column names. Never silently import invalid transactions or fabricate missing amounts.

============================================================
3. FINANCIAL ANALYTICS
============================================================

Calculate:
- Total income.
- Total expenditure.
- Net cash flow.
- Savings amount.
- Savings rate.

Use:

Savings Rate = (Income - Expenses) / Income × 100

Exclude transfers from these calculations.

Create default categories such as:
- Food & dining.
- Groceries.
- Transport.
- Shopping.
- Entertainment.
- Education.
- Rent.
- Utilities.
- Healthcare.
- Travel.
- Investments.
- Insurance.
- Subscriptions.
- Income.
- Transfers.
- Other.

Allow me to create custom categories and reclassify transactions.

Show interactive charts for:
- Expense distribution by category.
- Monthly income versus expenditure.
- Category-wise spending trends.
- Changes in spending over time.
- Largest spending categories.

All calculations and charts must use actual transaction records, not hardcoded example numbers.

============================================================
4. BUDGET MANAGEMENT
============================================================

Create a dedicated budgeting section.

Let me establish monthly spending limits for individual categories.

For every budget, show:
- Monthly limit.
- Amount spent.
- Remaining budget.
- Percentage utilised.
- Overspending indicator.

Budgets must update automatically when a transaction is added, imported, edited or deleted.

Allow budgets to be created, changed and removed at any time. Any example budget amounts must be clearly labelled as examples, not assumed to be my real limits.

============================================================
5. SPENDING INSIGHTS
============================================================

Create a dedicated Insights section.

A. CATEGORY TRENDS
Show category-wise expenditure distribution and useful comparisons across available periods.

B. RECURRING PAYMENTS
Identify potential recurring payments by analysing descriptions, merchants, dates and historical patterns.

Examples include rent, subscriptions, memberships and utility bills.

Distinguish between possible and likely recurring payments. Do not claim that a heuristic is a confirmed subscription.

C. UNUSUAL SPENDING
Identify transactions that are significantly higher than historical spending in the same category.

For each flag, show:
- Transaction and date.
- Amount.
- Category.
- Why it was flagged.

These are statistical observations, not fraud detection or proof of wrongdoing.

============================================================
6. AI FINANCIAL ANALYST
============================================================

Create a dedicated AI Analyst section that lets me ask natural-language questions about my finances.

Examples:
- Where did most of my money go this month?
- How much did I save this month?
- Which categories are exceeding my budgets?
- What are my recurring expenses?
- Has my spending increased compared with previous months?
- What are my largest expenditure categories?
- What can I improve in my monthly budget?

The application must include a local financial analysis engine for common questions. It must work without an API key and use actual calculated figures.

Additionally, offer optional integrations with:
- OpenAI.
- Grok by xAI.
- Google Gemini.

Let users select a provider, enter a model identifier and supply their own API key.

Privacy and security requirements:
- Never hardcode API keys.
- Never store API keys in localStorage.
- Keep a browser-supplied key in tab memory only.
- Clearly explain that a direct browser integration exposes the key to the active browser environment and is not equivalent to a secure server-side integration.
- Do not send raw financial transaction rows or merchant names to an AI provider.
- When AI mode is enabled, send only the user's question and the minimum necessary aggregated financial summaries.
- Explain that provider charges and provider privacy policies apply.
- Distinguish actual figures from estimates and never invent financial information.

============================================================
7. SETTINGS AND PERSONALISATION
============================================================

Create a Settings section that allows users to change:
- Display currency.
- Country preference.
- Colour theme.
- Categories.
- Budgets.
- Sample data.
- Financial records.

Provide five theme choices:
1. Sage.
2. Ocean.
3. Lavender.
4. Sand.
5. Midnight.

Use correct currency formatting throughout the application. Make all preferences editable after the initial setup.

============================================================
8. DATA MANAGEMENT AND PRIVACY
============================================================

For the browser-only edition, use localStorage to persist transactions, budgets, categories and preferences.

Include:
- JSON backup export.
- JSON backup restoration.
- Complete transaction CSV export.
- Monthly financial report as PDF.
- Monthly financial report as TXT.
- Clear workspace functionality.

Clearly disclose these limitations:
- Data is stored in the current browser.
- Data is not automatically synchronised across devices.
- localStorage is not encrypted.
- The application does not connect directly to bank accounts.
- There is no real user authentication or secure multi-user database.

Allow manual transfer between devices through a JSON backup. Explain that backups are not encrypted and must be stored privately.

Keep the architecture suitable for static GitHub Pages deployment. Never put private credentials, GitHub access tokens or other secrets in frontend code.

If a future version needs secure multi-device sync, explain that a separately hosted backend and authenticated database are required. Do not pretend browser storage provides this.

============================================================
9. FIRST-VISIT WELCOME SCREEN
============================================================

On first visit, show three clear options:

1. Explore with fictional demo data.
2. Start with a clean workspace.
3. Import a CSV statement.

Demo transactions must be clearly identified as fictional. Let users restore demo data or clear their workspace through Settings.

============================================================
10. DESIGN AND USER EXPERIENCE
============================================================

Use a polished, minimal fintech dashboard design.

Include:
- Clean sidebar navigation.
- Professional, readable typography.
- Spacious dashboard cards.
- Calm background colours.
- Well-organised transaction tables.
- Interactive charts.
- Consistent icons.
- Subtle animations.
- Responsive desktop and mobile layouts.
- Mobile-friendly navigation.

The result should feel like a real personal finance product, not an academic project, generic template or spreadsheet.

Prioritise functionality and readability over unnecessary decoration.

============================================================
11. TECHNICAL IMPLEMENTATION
============================================================

For the closest match to the reference implementation, use:
- HTML.
- CSS.
- Vanilla JavaScript.
- Chart.js for interactive charts.
- PapaParse for CSV parsing.
- jsPDF for PDF reports.
- localStorage for local persistence.

Use public CDNs where appropriate.

Organise the project into maintainable files:
- index.html
- styles.css
- app.js
- README.md
- sample-transactions.csv
- tests/

The browser-only edition must be deployable through GitHub Pages without a build process or API credentials.

Do not introduce an unnecessary backend or framework for this edition.

============================================================
12. QUALITY CONTROL AND TESTING
============================================================

Before declaring the application complete, test:

- Manual income and expense entry.
- Transfers and cash-flow calculations.
- Savings-rate calculations.
- CSV import with different column arrangements.
- Duplicate detection and invalid-row handling.
- Automatic and manual categorisation.
- Budget creation and updates.
- Dashboard chart updates.
- Recurring-payment identification.
- Unusual-spending flags.
- Local financial Q&A.
- Optional AI provider connection and disconnection.
- CSV export.
- JSON backup and restoration.
- PDF and TXT report generation.
- Currency and theme changes.
- Transaction deletion.
- Workspace clearing.
- Responsive mobile behaviour.

Fix errors before delivery. Do not leave placeholder buttons, fake charts, fabricated financial figures or non-functional sections.

============================================================
13. FINAL DELIVERABLE
============================================================

Deliver an actual working Personal Finance Tracker, not a development proposal.

After building it:
1. Show me the completed application.
2. Explain how to run it locally.
3. Explain how to deploy it on GitHub Pages.
4. Provide a sample CSV for testing.
5. Explain its storage and privacy limitations.
6. Summarise the functionality tested and any limitations that remain.

Do not stop after producing a design or development plan. Implement the application and verify its functionality.

FINAL OBJECTIVE:

Build a personalised finance tracker through which I can record income and expenses, import bank statements, visualise cash flow, manage budgets, identify spending patterns, export financial reports and interact with an AI financial analyst.\`