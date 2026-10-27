import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/noto-sans-kr";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url ?? "http://localhost:3000"),
  title: {
    default: "MAENGDI — Game UI/UX & Visual Designer",
    template: "%s — MAENGDI",
  },
  description: site.description,
  applicationName: "MAENGDI Portfolio",
  openGraph: {
    title: "MAENGDI — Game UI/UX & Visual Designer",
    description: site.description,
    siteName: "MAENGDI",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MAENGDI — Game UI/UX & Visual Designer",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#f7f7f2" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body id="top">
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
