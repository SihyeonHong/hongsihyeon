import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin"]);

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").notNull().default("user"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const siteStatus = pgTable("site_status", {
  id: text("id").primaryKey(),
  state: text("state").notNull().default("offline"),
  message: text("message"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedBy: text("updated_by").references(() => users.id),
});

export const SITE_STATUS_SINGLETON_ID = "singleton";
