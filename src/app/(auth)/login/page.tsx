import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인 - Hong Sihyeon",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-xl font-semibold">로그인</h1>
      <LoginForm />
    </div>
  );
}
