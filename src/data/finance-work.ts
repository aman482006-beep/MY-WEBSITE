export type FinanceWorkItem = {
  id: string;
  title: string;
  format: "PDF" | "Excel";
  description: string;
  takeaway: string;
  assetPath: string | null;
  status: "placeholder";
};

export const financeWork: FinanceWorkItem[] = [
  {
    id: "equity-note",
    title: "Equity Research Note",
    format: "PDF",
    description: "A structured company note covering its business model, financial drivers, valuation framework and key risks.",
    takeaway: "TODO(Aman): Add the actual company, thesis and takeaway from a completed note.",
    assetPath: null,
    status: "placeholder",
  },
  {
    id: "valuation-model",
    title: "DCF / Three-Statement Model",
    format: "Excel",
    description: "An integrated operating model with cash-flow valuation, assumptions and scenario analysis.",
    takeaway: "TODO(Aman): Add the model file and a verified takeaway from the analysis.",
    assetPath: null,
    status: "placeholder",
  },
  {
    id: "portfolio-analysis",
    title: "Portfolio Risk & Return Analysis",
    format: "Excel",
    description: "A portfolio review covering allocation, returns, volatility and risk-adjusted performance.",
    takeaway: "TODO(Aman): Add the completed workbook and its actual findings.",
    assetPath: null,
    status: "placeholder",
  },
];
