"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SidebarShell({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between bg-background p-2 md:hidden">
        <span className="pl-2 text-sm font-medium tracking-tight">
          Hong Sihyeon
        </span>
        <Sheet>
          <SheetTrigger render={<Button variant="ghost" size="icon" />}>
            <Menu className="size-5" />
            <span className="sr-only">메뉴 열기</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>메뉴</SheetTitle>
            </SheetHeader>
            {children}
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden w-56 shrink-0 bg-muted/40 md:flex">
        {children}
      </aside>
    </>
  );
}
