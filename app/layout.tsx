import { AuthProvider } from "@/components/auth-provider";
import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import "./globals.css";

const font = Funnel_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Application Tracker",
  description: "Track your job applications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.variable} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
