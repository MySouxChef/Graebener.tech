import type { Metadata } from "next";
import { Barlow, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShaderBackground } from "@/components/ui/ShaderBackground";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Graebener.tech | Agentic Engineering",
    template: "%s | Graebener.tech",
  },
  description:
    "Building intelligent systems with agentic engineering. Full-stack development, AI integration, and innovative solutions.",
  openGraph: {
    title: "Graebener.tech | Agentic Engineering",
    description: "Building intelligent systems with agentic engineering.",
    url: "https://graebener.tech",
    siteName: "Graebener.tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-black text-[#f0f0fa] antialiased">
        <ShaderBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
