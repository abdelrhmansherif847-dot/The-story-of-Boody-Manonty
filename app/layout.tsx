import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { site } from "@/content/site";
import { ThemeProvider, ThemeScript } from "@/components/providers/theme-provider";
import { ExperienceProvider } from "@/components/providers/experience-provider";

export const metadata: Metadata = {
  title: {
    default: `${site.title} · ${site.couple}`,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  applicationName: site.title,
  authors: [{ name: site.couple }],
  keywords: ["our story", "memories", "love", "Boody", "Manonty"],
  // This is a private keepsake — keep it out of search engines.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: `${site.title} · ${site.couple}`,
    description: site.tagline,
    type: "website",
  },
  formatDetection: { telephone: false },
  appleWebApp: { capable: true, title: site.title, statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060b18" },
    { media: "(prefers-color-scheme: light)", color: "#fffdf9" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <ExperienceProvider>{children}</ExperienceProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
