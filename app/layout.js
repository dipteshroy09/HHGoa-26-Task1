import { Space_Grotesk, DM_Mono, Inter, Anton, Noto_Sans_Devanagari, Bebas_Neue } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-dm",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["700", "900"],
  variable: "--font-devanagari",
  display: "swap",
});

export const metadata = {
  title: "HH Goa 2026 - FrameInGoa",
  description:
    "Turn your photo into an HH Goa 2026 profile frame or Builder ID in seconds. Upload, personalize, download, and share to X. #FrameInGoa",
  openGraph: {
    title: "HH Goa 2026 — Frame & Builder ID Generator",
    description:
      "Turn your photo into an HH Goa 2026 profile frame or Builder ID in seconds. #FrameInGoa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HH Goa 2026 — Frame & Builder ID Generator",
    description:
      "Turn your photo into an HH Goa 2026 profile frame or Builder ID in seconds. #FrameInGoa",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${dmMono.variable} ${inter.variable} ${anton.variable} ${notoDevanagari.variable} ${bebas.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
