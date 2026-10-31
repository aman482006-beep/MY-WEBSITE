import type { Metadata } from "next";
import { InboxContent } from "./inbox-content";

export const metadata: Metadata = {
  title: "Private Inbox",
  description: "Private message inbox.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function InboxPage() {
  return <InboxContent />;
}
