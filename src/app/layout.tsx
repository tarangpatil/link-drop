import type { Metadata } from "next";
import "./globals.css";
import BootstrapClient from "@/ui/BootstrapClient";
import Navbar from "@/ui/Navbar";

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
      <body className={``}>
        <BootstrapClient />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
