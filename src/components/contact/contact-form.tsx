"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { sendContactEmail } from "@/lib/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendContactEmail,
    undefined
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success("메시지를 보냈습니다.");
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">이름</Label>
        <Input id="name" name="name" required maxLength={50} />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="replyEmail">답변 받을 이메일</Label>
        <Input id="replyEmail" name="replyEmail" type="email" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">내용</Label>
        <Textarea id="message" name="message" required maxLength={2000} rows={5} />
      </div>
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "보내는 중..." : "보내기"}
      </Button>
    </form>
  );
}
