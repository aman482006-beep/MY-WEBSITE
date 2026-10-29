import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Caveat, Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { ScrollProgressBar } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MotionRoot } from "@/components/motion/motion-root";

const newsreader = Newsreader({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amanmalu.me"),
  title: {
    default: "Aman Jain — Finance × Technology × Communication",
    template: "%s | Aman Jain",
  },
  description: "I’m Aman Jain, a BBA student at CHRIST University exploring finance, technology and educational content. I’m building Fokus, a cross-platform Flutter productivity app with a Windows version on the Microsoft Store.",
  alternates: { canonical: "/" },
  twitter: {
    card: "summary_large_image",
    title: "Aman Jain — Finance × Technology × Communication",
    description: "I study finance. I build with technology. I create to make ideas useful.",
  },
  openGraph: {
    title: "Aman Jain — Finance × Technology × Communication",
    description: "I study finance. I build with technology. I create to make ideas useful. Featured project: Fokus, a cross-platform Flutter productivity app.",
    url: "https://amanmalu.me",
    siteName: "Aman Jain Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={newsreader.variable + " " + manrope.variable + " " + caveat.variable + " font-body antialiased min-h-screen"}>
        <a className="aj-skip-link" href="#main">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Aman Jain",
              url: "https://amanmalu.me",
              jobTitle: "Finance student",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "CHRIST (Deemed to be University)",
              },
              sameAs: [
                "https://www.linkedin.com/in/amanmalu/",
                "https://www.youtube.com/@AmanJain-4",
                "https://www.instagram.com/aman.ja1n/",
                "https://github.com/aman482006-beep",
              ],
            }),
          }}
        />
        <ScrollProgressBar />
        <SmoothScroll>
          <MotionRoot>
            <Navbar />
            <div className="site-main">{children}</div>
            <Footer />
          </MotionRoot>
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
