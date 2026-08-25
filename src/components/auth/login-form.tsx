"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">이메일</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="mt-2">
        {pending ? "로그인 중..." : "로그인"}
      </Button>
      <p className="text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link href="/signup" className="text-primary underline-offset-4 hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
