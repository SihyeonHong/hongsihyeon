import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "회원가입 - Hong Sihyeon",
};

export default function SignupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-xl font-semibold">회원가입</h1>
      <SignupForm />
    </div>
  );
}
