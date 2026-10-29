import type { Metadata } from "next";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Aman Jain about finance internships, project collaborations, creator partnerships and other professional conversations.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
