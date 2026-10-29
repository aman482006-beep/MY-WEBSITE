"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep detailed runtime errors out of the public interface.
    console.error("Portfolio route failed to render.", error.digest);
  }, [error]);

  return (
    <main id="main" className="aj-inner-page aj-error-page">
      <div className="aj-container aj-error-content">
        <p className="aj-eyebrow aj-eyebrow-accent">SOMETHING WENT WRONG</p>
        <h1>This page didn&apos;t load as expected.</h1>
        <p>Nothing you need to do — try loading it again or return to the homepage.</p>
        <div className="aj-feature-actions">
          <button type="button" className="aj-button aj-button-primary" onClick={() => reset()}>Try again <span aria-hidden="true">↻</span></button>
          <Link href="/" className="aj-button aj-button-outline">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
