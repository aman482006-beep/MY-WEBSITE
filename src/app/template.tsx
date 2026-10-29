"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Keep route rendering native to Next.js.
 *
 * We intentionally do not intercept document-level clicks here. On touch
 * browsers, a custom capture-phase click handler + View Transitions + router.push
 * can swallow a tap if the transition callback is delayed or interrupted.
 * Next <Link> should own navigation; CSS provides a restrained transition.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="aj-route-transition">
      {children}
    </div>
  );
}
