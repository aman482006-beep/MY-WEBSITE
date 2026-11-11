export const financialModelWithAiPrompt = String.raw`You are a senior equity research analyst. I've attached
(1) a Screener.in Excel export for [COMPANY] and
(2) my input form below.

INPUT FORM
- Company / basis: [name], [consolidated/standalone]
- Business type: [type]
- CMP & date: [₹ price], [date]
- Horizon: [5/10] years
- Management guidance: [paste]
- Scenario views: Bull [..] Base [..] Bear [..]
- Segments (if any): [paste]
- One-offs to normalize: [..]
- Peers: [..]
- WACC inputs (optional): [..]

TASK: Build ONE Excel workbook with live formulas
(no hardcoded forecast numbers):

1. Data sheet: clean 10-yr historicals from the export.
   Flag any missing or inconsistent data. Never invent numbers.
2. Ratio analysis: growth, margins, ROE/ROCE (with DuPont),
   working-capital days, leverage, FCF conversion.
   Add a one-line interpretation per ratio.
3. Assumptions sheet: all drivers as input cells
   (growth, EBITDA margin, tax, capex %, WC days, D&A,
   interest), with a Bull/Base/Bear switch.
4. Three-statement model: income statement, balance sheet,
   cash flow, linked. Checks: balance sheet balances every
   year; closing cash ties to the balance sheet.
5. DCF (FCFF): WACC build-up, terminal value by Gordon growth
   and exit multiple, EV to equity bridge, value per share vs CMP.
6. Sensitivity tables: WACC vs terminal growth,
   and growth vs margin.
7. Reverse DCF: what growth does the CMP imply?
8. Comps cross-check using the peers given.
9. Summary sheet: value per share by scenario, upside/downside,
   terminal value as % of EV, key risks, red flags.

RULES
- State every assumption and its source.
- If the business is a bank/NBFC, do NOT use FCFF.
  Use residual income or P/B-ROE instead and say why.
- Flag if terminal growth exceeds long-run nominal GDP, if TV
  is >75% of EV, or if forecast margins leave the historical range.
- Challenge my inputs if they look unrealistic.
- Finish with a plain-English verdict. This is analysis,
  not investment advice.`;
