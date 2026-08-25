import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { siteStatus, SITE_STATUS_SINGLETON_ID } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { StatusEditor } from "@/components/status/status-editor";

export async function StatusCard() {
  const [session, [status]] = await Promise.all([
    auth(),
    db
      .select()
      .from(siteStatus)
      .where(eq(siteStatus.id, SITE_STATUS_SINGLETON_ID))
      .limit(1),
  ]);

  const currentState = status?.state ?? "offline";
  const currentMessage = status?.message ?? null;
  const isAdmin = session?.user.role === "admin";

  return (
    <section className="flex flex-col gap-4 rounded-sm bg-muted/40 p-6">
      <div className="flex items-center gap-2">
        <Badge
          variant={currentState === "online" ? "default" : "secondary"}
          className="rounded-sm capitalize"
        >
          {currentState}
        </Badge>
        {currentMessage && (
          <p className="text-sm text-muted-foreground">{currentMessage}</p>
        )}
      </div>
      {isAdmin && (
        <StatusEditor
          key={`${currentState}:${currentMessage ?? ""}`}
          currentState={currentState}
          currentMessage={currentMessage}
        />
      )}
    </section>
  );
}
