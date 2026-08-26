import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export async function AppSidebar() {
  const session = await auth();

  return (
    <Sidebar side="right">
      <SidebarHeader className="p-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          홍시현의 페이지
        </Link>
      </SidebarHeader>

      <SidebarContent />

      <SidebarFooter className="gap-3 p-4">
        {session?.user ? (
          <>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {session.user.username}
              </span>
              님 환영합니다
            </p>
            {session.user.role === "admin" && (
              <Button
                variant="outline"
                className="w-full"
                nativeButton={false}
                render={<Link href="/admin" />}
              >
                관리자 페이지
              </Button>
            )}
            <form action={logout}>
              <Button type="submit" variant="outline" className="w-full">
                로그아웃
              </Button>
            </form>
          </>
        ) : (
          <>
            <Button
              className="w-full"
              nativeButton={false}
              render={<Link href="/login" />}
            >
              로그인
            </Button>
            <Button
              variant="outline"
              className="w-full"
              nativeButton={false}
              render={<Link href="/signup" />}
            >
              회원가입
            </Button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
