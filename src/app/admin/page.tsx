import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "관리자 - Hong Sihyeon",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "admin") {
    notFound();
  }

  return (
    <div className="flex w-full flex-col gap-6 p-6 md:p-10">
      <h1 className="text-xl font-semibold">관리자 페이지</h1>
      <p className="text-sm text-muted-foreground">
        {session.user.username}님, 관리자 권한으로 접속했습니다.
      </p>
    </div>
  );
}
