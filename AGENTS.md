<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project-specific notes for future sessions

Full product/architecture context lives in `docs/PLANNING.md` — read that first for scope and decisions. This section is operational gotchas discovered while building the current codebase; skim before editing.

## Dev log — read and update every session

`docs/DEVLOG.md` is a chronological log of what happened, session by session (roughly one entry per commit/work session). Its last entry is the source of truth for "where did we leave off" — **read it at the start of a session** before asking the user for context.

At the end of any session that changed code, plans, or scope, **append** a new entry (never edit past entries) covering: what was done, any planning/scope changes, and what's left for next time. Follow the format documented at the top of that file.

## Import conventions

- Always import project code with the `@/*` absolute alias (maps to `./src/*` in `tsconfig.json`), never relative paths (`../../lib/foo`) — regardless of how close the files are to each other.

## Windows/npm-specific gotchas

- `node_modules/.bin/<tool>` shims are POSIX shell scripts on this machine — do NOT invoke them as `node ./node_modules/.bin/foo`, it fails with a syntax error. Point directly at the real JS entry instead (see `package.json` scripts: `node_modules/drizzle-kit/bin.cjs`, `node_modules/tsx/dist/cli.mjs`).
- `drizzle-kit` only auto-loads `.env` by default, not `.env.local`. All `db:*`/`promote-admin` scripts explicitly pass `node --env-file=.env.local` — keep that pattern for any new script that needs DB access outside the Next.js runtime.
- `package.json` has no `"type": "module"`, so standalone scripts run via `tsx` can't use top-level `await` (esbuild error: "Top-level await is currently not supported with the cjs output format"). Wrap script bodies in an `async function main() { ... }; main();`.
- `.gitignore` has a blanket `.env*` rule — `.env.example` needs the `!.env.example` exception right after it to stay tracked, otherwise it silently stops showing up in `git status`.

## App-specific decisions (don't relitigate without asking)

- **Login uses email, not username.** This was tried and explicitly reverted mid-session — signup's "이름" field maps to the `username` DB column but is a display name, not a login identifier.
- **JWT sessions**: role changes in the DB (e.g. via `npm run promote-admin -- <email-or-username>`) do not apply to an already-issued session cookie. The user must log out and log back in before admin-only UI (e.g. `StatusEditor`) appears.
- **Design system**: no visible borders anywhere (inputs/buttons/selects use `bg-muted` fill instead of `border`), `--radius` capped at `0.25rem` (sm), purple `--primary`/`--ring`, dark mode fully removed (`.dark {}` block deleted from `globals.css` — don't reintroduce a theme toggle without asking).
- **`siteStatus` table is a singleton**: always one row keyed by the fixed id `SITE_STATUS_SINGLETON_ID`, updated via `onConflictDoUpdate`. Don't add multi-row status history unless asked.
- **Current scope**: only `/`, `/login`, `/signup` exist. Contact is a section on the homepage, not its own route. Blog/Notes/Guestbook are planned (see `docs/PLANNING.md`) but not started.
