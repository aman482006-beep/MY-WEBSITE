import type { Metadata } from "next";
import { StoryExperience } from "@/components/sections/story-experience";

export const metadata: Metadata = {
  title: "Explore My Story",
  description: "The story behind Aman Jain's work across finance, analytics, content creation and building products.",
  alternates: { canonical: "/story" },
};

export default function StoryPage() {
  return <StoryExperience />;
}
