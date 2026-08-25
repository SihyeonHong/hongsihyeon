import { eq, or } from "drizzle-orm";
import { db } from "../src/db";
import { users } from "../src/db/schema";

async function main() {
  const identifier = process.argv[2];

  if (!identifier) {
    console.error("Usage: npm run promote-admin -- <email-or-username>");
    process.exit(1);
  }

  const [updated] = await db
    .update(users)
    .set({ role: "admin" })
    .where(or(eq(users.email, identifier), eq(users.username, identifier)))
    .returning({ id: users.id, username: users.username, email: users.email });

  if (!updated) {
    console.error(`No user found with email or username: ${identifier}`);
    process.exit(1);
  }

  console.log(`Promoted to admin: ${updated.username} <${updated.email}>`);
}

main();
