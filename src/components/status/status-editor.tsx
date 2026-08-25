"use client";

import { useActionState } from "react";
import { updateStatus } from "@/lib/actions/status";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusEditor({
  currentState,
  currentMessage,
}: {
  currentState: string;
  currentMessage: string | null;
}) {
  const [state, formAction, pending] = useActionState(updateStatus, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <Select name="state" defaultValue={currentState}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="상태 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="online">Online</SelectItem>
          <SelectItem value="offline">Offline</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        name="message"
        placeholder="예: 업무시간 평일 09시-17시, 공휴일엔 쉽니다"
        defaultValue={currentMessage ?? ""}
        maxLength={200}
      />
      {state?.error && <p className="text-sm text-destructive">{state.error}</p>}
      <Button type="submit" disabled={pending} className="self-start">
        {pending ? "저장 중..." : "상태 저장"}
      </Button>
    </form>
  );
}
