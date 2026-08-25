import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";

export async function SidebarContent() {
  const session = await auth();

  return (
    <div className="flex h-full flex-col p-4">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        Hong Sihyeon
      </Link>

      <div className="mt-auto flex flex-col gap-3">
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
      </div>
    </div>
  );
}
