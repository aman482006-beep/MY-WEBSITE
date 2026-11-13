import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/sections/project-showcase";

export const metadata: Metadata = {
  title: "What I’ve Built",
  description: "Finance and AI projects by Aman Jain, including Finance Roast Room, a 20-advisor AI investment debate room, Fokus and financial modelling tools.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="aj-inner-page aj-projects-page">
      <ProjectShowcase />
    </main>
  );
}
