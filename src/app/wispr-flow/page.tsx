import type { Metadata } from "next";
import { WisprFlowChallenge } from "@/components/sections/wispr-flow-challenge";

export const metadata: Metadata = {
  title: "Wispr Flow — Growth Challenge",
  description: "Five honest screens about speaking up, experimenting with content, and continuing to build.",
  alternates: { canonical: "/wispr-flow" },
  robots: { index: true, follow: true },
};

export default function WisprFlowPage() {
  return <WisprFlowChallenge />;
}
