export const indiaQuantLabPrompt = String.raw`# INDIA QUANT LAB — CLONE, SET UP, RUN AND VERIFY

You are a senior Python engineer, quantitative researcher and QA engineer. Set up the existing India Quant Lab project from this exact repository:

https://github.com/aman482006-beep/AI-Powered-Quantitative-Trading-System

## WHAT THIS PROJECT IS

India Quant Lab is an India-focused quantitative research and historical strategy backtesting project. Its purpose is to let a user explore quantitative trading ideas, test strategy rules against historical market data, inspect simulated results and evaluate performance/risk before considering any real-world use.

This is a research and simulation workflow. Do not describe it as a live broker-connected trading system or imply that backtest returns predict future performance. Do not add live order execution or broker credentials unless the existing repository explicitly supports it and I separately request that.

## TASK — USE THE EXISTING REPOSITORY

1. Clone the repository above. Confirm the remote URL and repository name before proceeding.
2. Read the README and inspect the complete project structure before installing or changing anything.
3. Identify the actual application entry points, supported Python version, dependency files, environment variables, data sources and run commands from the repository. Do not guess commands or invent missing configuration.
4. Install the dependencies using the repository's documented setup. Use a virtual environment where appropriate.
5. Configure only the environment variables that the existing project requires. Never commit secrets, API keys or credentials.
6. Start each documented application component needed for the normal user experience (including the browser-based terminal and/or Python/Streamlit research app, if both are part of the repository).
7. Resolve setup/runtime errors while preserving the existing architecture and functionality. Avoid unnecessary rewrites or replacing working components.

## VERIFY THE QUANT RESEARCH WORKFLOW

Inspect the code and test the features that are genuinely implemented. In particular, verify where supported:

- The application starts and its main pages/components load.
- A user can access the strategy research/backtesting workflow.
- Strategy parameters and date ranges can be selected where the UI supports them.
- Historical market data can be loaded or the documented sample data can be used.
- A strategy can be run through the backtesting/simulation engine.
- Results are generated from the selected data and rules, not hardcoded demonstration figures.
- Performance outputs and risk statistics are calculated correctly and labelled with their assumptions.
- Charts, tables, filters and exports work where provided.
- Missing data, invalid inputs, look-ahead bias, survivorship bias, transaction costs, slippage and other material backtest limitations are surfaced where relevant.

Do not claim that a feature works unless you have actually run and checked it. If external market-data access requires a key, subscription or network permission, state that clearly and test the available fallback/sample-data path instead.

## QUANTITATIVE INTEGRITY

- Distinguish historical backtest results from live or paper-trading results.
- Do not fabricate historical prices, returns, benchmark data or performance metrics.
- Check whether transaction costs, brokerage, taxes, slippage and liquidity assumptions are included; disclose omissions.
- Check for look-ahead bias and data leakage before treating results as meaningful.
- Compare against a relevant benchmark only when the project has suitable benchmark data.
- Explain the test period, instrument universe, data frequency and strategy assumptions.
- Never present simulated performance as guaranteed returns or personalised investment advice.

## FINAL QUALITY CHECKS

Before finishing:

1. Confirm the exact repository URL is the one used.
2. Confirm dependencies install successfully, or list the exact blocker.
3. Confirm the required app process starts and provide the local URL/port.
4. Open the app and exercise the main research/backtesting flow with available data.
5. Check the browser console and terminal logs for errors where possible.
6. Test one representative strategy run and inspect its output.
7. Fix issues that prevent the documented workflow from operating.
8. Report any features that could not be verified and why.

## DELIVERABLE

Give me:
- The exact setup and run commands.
- The local application URL(s).
- Which components and backtesting steps you successfully tested.
- The test data/strategy used and the resulting output, clearly labelled as historical simulation.
- Any required API keys, paid data access or external services.
- Known limitations and any remaining errors.

Do not stop after writing a plan. Actually clone, install, run and test the existing project to the extent the environment permits. Do not claim success for steps you could not execute.`;