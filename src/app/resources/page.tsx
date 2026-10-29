import type { Metadata } from "next";
import { ResourcesContent } from "./resources-content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Planned finance toolkits, CFA study systems and creator workflows from Aman Jain, with a way to request future resources.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return <ResourcesContent />;
}
