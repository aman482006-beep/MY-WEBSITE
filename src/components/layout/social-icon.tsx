export type SocialIconName = "github" | "linkedin" | "youtube" | "instagram";

export function SocialIcon({ name }: { name: SocialIconName }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    focusable: false as const,
  };

  switch (name) {
    case "github":
      return <svg {...common}><path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.7 2.62 1.2 3.26.91.1-.73.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.1-1.43 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.16 1.77 1.16 2.99 0 4.29-2.61 5.23-5.1 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
    case "linkedin":
      return <svg {...common}><path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.73H4.98V9.22h2.95v9.51ZM6.45 7.92a1.71 1.71 0 1 1 .02-3.42 1.71 1.71 0 0 1-.02 3.42Zm12.3 10.81H15.8V14.1c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.76 1.2-1.76 2.43v4.71H9.56V9.22h2.83v1.3h.04c.4-.75 1.36-1.53 2.8-1.53 3 0 3.56 1.97 3.56 4.54v5.2Z" /></svg>;
    case "youtube":
      return <svg {...common}><path d="M23.5 6.2a3 3 0 0 0-2.11-2.12C19.53 3.56 12 3.56 12 3.56s-7.53 0-9.39.52A3 3 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3 3 0 0 0 2.11 2.12c1.86.52 9.39.52 9.39.52s7.53 0 9.39-.52a3 3 0 0 0 2.11-2.12C24 15.93 24 12 24 12s0-3.93-.5-5.8ZM9.55 15.55v-7.1L15.82 12l-6.27 3.55Z" /></svg>;
    case "instagram":
      return <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>;
  }
}
