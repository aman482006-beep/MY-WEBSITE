import { hasResumePdf, resumePdfPath } from "@/data/profile";

export function ResumeDownload({ compact = false }: { compact?: boolean }) {
  const available = hasResumePdf();

  return (
    <div className={compact ? "aj-resume-cta aj-resume-cta-compact" : "aj-resume-cta"}>
      {available ? (
        <a className="aj-button aj-button-primary" href={resumePdfPath} download>
          Download résumé (PDF) <span aria-hidden="true">↓</span>
        </a>
      ) : (
        <span className="aj-button aj-button-outline aj-resume-disabled" aria-disabled="true" title="Add public/Aman-Jain-Resume.pdf to enable this download">
          Download résumé (PDF) <span aria-hidden="true">↗</span>
        </span>
      )}
      {!available && <p className="aj-resume-note">TODO(Aman): Add the current PDF at <code>public/Aman-Jain-Resume.pdf</code> to enable downloads.</p>}
    </div>
  );
}
