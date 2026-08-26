"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";

export type FormActionState = { error: string } | undefined;

export async function login(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const rememberMe = formData.get("rememberMe") === "on";

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "이메일 또는 비밀번호가 올바르지 않습니다." };
    }
    throw error;
  }

  // "자동로그인" 미체크 시, 발급된 세션 쿠키를 브라우저 세션 쿠키(만료 시간 없음)로 재발급해
  // 브라우저를 닫으면 로그아웃되도록 한다. 체크 시 next-auth 기본 만료(30일)를 그대로 둔다.
  if (!rememberMe) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore
      .getAll()
      .find((c) => c.name.endsWith("authjs.session-token"));
    if (sessionCookie) {
      cookieStore.set(sessionCookie.name, sessionCookie.value, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: sessionCookie.name.startsWith("__Secure-"),
      });
    }
  }

  redirect("/");
}

const SignupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "아이디는 2자 이상이어야 합니다.")
    .max(24, "아이디는 24자 이하여야 합니다.")
    .regex(/^[a-zA-Z0-9_]+$/, "아이디는 영문/숫자/밑줄만 사용할 수 있습니다."),
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
});

export async function signup(
  _prevState: FormActionState,
  formData: FormData
): Promise<FormActionState> {
  const parsed = SignupSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." };
  }

  const { username, email, password } = parsed.data;

  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(or(eq(users.email, email), eq(users.username, username)))
    .limit(1);
  if (existing) {
    return { error: "이미 사용 중인 이메일 또는 아이디입니다." };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await db.insert(users).values({ username, email, passwordHash });

  await signIn("credentials", { email, password, redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
