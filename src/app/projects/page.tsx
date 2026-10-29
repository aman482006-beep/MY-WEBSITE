import type { Metadata } from "next";
import { ProjectShowcase } from "@/components/sections/project-showcase";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected finance, AI, education and product projects by Aman Jain, with source code and demos where available.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <main id="main" className="aj-inner-page aj-projects-page">
      <ProjectShowcase />
    </main>
  );
}
