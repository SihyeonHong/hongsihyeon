"use server";

import { z } from "zod";
import { createMailTransport } from "@/lib/mailer";

export type ContactActionState = { error?: string; success?: boolean } | undefined;

const ContactSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요.").max(50),
  replyEmail: z.string().trim().email("올바른 이메일 형식이 아닙니다."),
  message: z
    .string()
    .trim()
    .min(1, "내용을 입력해주세요.")
    .max(2000, "내용은 2000자 이하여야 합니다."),
});

export async function sendContactEmail(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  // Honeypot: real visitors never fill this hidden field.
  if (formData.get("company")) {
    return { success: true };
  }

  const parsed = ContactSchema.safeParse({
    name: formData.get("name"),
    replyEmail: formData.get("replyEmail"),
    message: formData.get("message"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "입력값을 확인해주세요." };
  }

  const { name, replyEmail, message } = parsed.data;

  try {
    const transport = createMailTransport();
    await transport.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: replyEmail,
      subject: `[Contact] ${name}님으로부터 새 메시지`,
      text: `보낸 사람: ${name} <${replyEmail}>\n\n${message}`,
    });
  } catch {
    return { error: "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요." };
  }

  return { success: true };
}
