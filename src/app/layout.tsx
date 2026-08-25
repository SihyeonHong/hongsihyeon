import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarContent } from "@/components/layout/sidebar-content";
import { SidebarShell } from "@/components/layout/sidebar-shell";
import { Toaster } from "@/components/ui/sonner";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-sans",
  weight: "45 920",
});

export const metadata: Metadata = {
  title: "Hong Sihyeon",
  description: "Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-full flex-1 flex-col md:flex-row">
          <SidebarShell>
            <SidebarContent />
          </SidebarShell>
          <main className="flex flex-1 flex-col">{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
