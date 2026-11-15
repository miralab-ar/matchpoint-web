import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/SkipLink";
import { ReduxProvider } from "@/components/providers";

/** Marca (ver matchpoint/docs/marca.md): Inter para texto, Barlow Condensed para títulos y marcador. */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Matchpoint — Torneos",
    template: "%s | Matchpoint",
  },
  description:
    "Torneos públicos de vóley playa: listado, equipos, partidos y clasificación. Datos desde la API de Matchpoint.",
  metadataBase: new URL("https://matchpoint.miralab.ar"),
  openGraph: {
    title: "Matchpoint — Torneos de vóley playa",
    description:
      "Torneos públicos de vóley playa: listado, equipos, partidos y clasificación.",
    url: "https://matchpoint.miralab.ar",
    siteName: "Matchpoint",
    type: "website",
    images: ["https://miralab.ar/images/matchpoint-og-v2.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://miralab.ar/images/matchpoint-og-v2.jpg"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/matchpoint-app-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${barlowCondensed.variable} h-full`}>
      <body
        className="min-h-full flex flex-col antialiased"
        suppressHydrationWarning
      >
        <ReduxProvider>
          <SkipLink />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
