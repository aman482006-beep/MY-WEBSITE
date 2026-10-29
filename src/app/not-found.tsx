import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="aj-inner-page aj-error-page">
      <div className="aj-container aj-error-content">
        <p className="aj-eyebrow aj-eyebrow-accent">404 · PAGE NOT FOUND</p>
        <h1>That page seems to have wandered off.</h1>
        <p>The link may be old or the address may have changed. Head back home and keep exploring.</p>
        <div className="aj-feature-actions">
          <Link href="/" className="aj-button aj-button-primary">Back to home <span aria-hidden="true">→</span></Link>
          <Link href="/contact" className="aj-button aj-button-outline">Get in touch</Link>
        </div>
      </div>
    </main>
  );
}
