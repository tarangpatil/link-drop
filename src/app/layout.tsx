import type { Metadata } from "next";
import "./globals.css";
import BootstrapClient from "@/ui/BootstrapClient";
import Navbar from "@/ui/Navbar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Link Drop",
  description: "Drop a link. Share a moment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``} data-bs-theme="dark">
        <SessionProvider>
          <BootstrapClient />
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
