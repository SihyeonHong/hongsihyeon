import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
      <body className="min-h-full">
        <SidebarProvider className="min-h-full">
          <SidebarInset>
            <div className="sticky top-0 z-40 flex items-center justify-between bg-background p-2 md:hidden">
              <span className="pl-2 text-sm font-medium tracking-tight">
                Hong Sihyeon
              </span>
              <SidebarTrigger />
            </div>
            <main className="flex flex-1 flex-col">{children}</main>
          </SidebarInset>
          <AppSidebar />
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
