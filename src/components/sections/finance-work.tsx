import Link from "next/link";
import { financeWork } from "@/data/finance-work";

type FinanceWorkSectionProps = {
  compact?: boolean;
  insideContainer?: boolean;
};

function FinanceWorkCards() {
  return (
    <div className="aj-finance-work-grid">
      {financeWork.map((item) => (
        <article className="aj-finance-work-card" key={item.id}>
          <div className="aj-finance-work-card-top">
            <span className="aj-finance-format">{item.format}</span>
            <span className="aj-finance-status">In preparation</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p className="aj-finance-takeaway">{item.takeaway}</p>
          {item.assetPath ? (
            <a className="aj-button aj-button-outline aj-work-tag" href={item.assetPath}>
              Open {item.format} file <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="aj-finance-work-pending">TODO(Aman): Add completed {item.format} file</span>
          )}
        </article>
      ))}
    </div>
  );
}

export function FinanceWorkSection({
  compact = false,
  insideContainer = false,
}: FinanceWorkSectionProps) {
  const content = (
    <>
      <div className="aj-section-heading aj-section-heading-inline">
        <div>
          <p className="aj-eyebrow aj-eyebrow-accent">SELECTED FINANCE WORK</p>
          <h2>Analysis with the evidence attached.</h2>
          <p className="aj-heading-subtitle">
            Financial analysis is being prepared for publication. Each item stays marked as in progress until its real file and verified takeaway are available.
          </p>
        </div>
        {!compact && (
          <Link className="aj-text-link" href="/recruiters">
            About my background <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <FinanceWorkCards />
    </>
  );

  return (
    <section
      className={"aj-section aj-finance-work-section" + (compact ? " aj-finance-work-compact" : "")}
      id={compact ? "finance-work" : "selected-finance-work"}
    >
      {insideContainer ? content : <div className="aj-container">{content}</div>}
    </section>
  );
}
