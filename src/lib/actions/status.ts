"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";
import { siteStatus, SITE_STATUS_SINGLETON_ID } from "@/db/schema";

export type StatusActionState = { error: string } | undefined;

const StatusSchema = z.object({
  state: z.enum(["online", "offline"]),
  message: z.string().trim().max(200, "메시지는 200자 이하여야 합니다.").optional(),
});

export async function updateStatus(
  _prevState: StatusActionState,
  formData: FormData
): Promise<StatusActionState> {
  const session = await auth();
  if (session?.user.role !== "admin") {
    return { error: "권한이 없습니다." };
  }

  const parsed = StatusSchema.safeParse({
    state: formData.get("state"),
    message: formData.get("message") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." };
  }

  await db
    .insert(siteStatus)
    .values({
      id: SITE_STATUS_SINGLETON_ID,
      state: parsed.data.state,
      message: parsed.data.message ?? null,
      updatedBy: session.user.id,
    })
    .onConflictDoUpdate({
      target: siteStatus.id,
      set: {
        state: parsed.data.state,
        message: parsed.data.message ?? null,
        updatedAt: new Date(),
        updatedBy: session.user.id,
      },
    });

  revalidatePath("/");
}
