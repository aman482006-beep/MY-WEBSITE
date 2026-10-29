import Link from "next/link";
import { SocialIcon, type SocialIconName } from "@/components/layout/social-icon";
import { BackToTop } from "@/components/layout/back-to-top";

const socials: { label: string; href: string; icon: SocialIconName }[] = [
  { label: "GitHub", href: "https://github.com/aman482006-beep", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/amanmalu/", icon: "linkedin" },
  { label: "YouTube", href: "https://www.youtube.com/@AmanJain-4", icon: "youtube" },
  { label: "Instagram", href: "https://www.instagram.com/aman.ja1n/", icon: "instagram" },
];

export function Footer() {
  return (
    <footer className="aj-footer">
      <div className="aj-container aj-footer-inner">
        <Link href="/" className="aj-brand" aria-label="Aman Jain — Home">
          <span className="aj-brand-monogram">AJ<span>.</span></span>
          <span className="aj-brand-name">AMAN JAIN</span>
        </Link>
        <nav aria-label="Footer navigation" className="aj-footer-nav">
          <Link href="/">Home</Link><Link href="/projects">Projects</Link><Link href="/creator">Creator</Link><Link href="/recruiters">Recruiters</Link><Link href="/resources">Resources</Link><Link href="/contact">Contact</Link>
        </nav>
        <div className="aj-footer-socials">
          {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} title={social.label}><SocialIcon name={social.icon} /></a>)}
        </div>
        <p className="aj-footer-copy">© {new Date().getFullYear()} Aman Jain.<br />Built with curiosity.</p>
      </div>
      <BackToTop />
    </footer>
  );
}
