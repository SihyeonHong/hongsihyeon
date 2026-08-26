# 개발 일지 (DEVLOG)

작업 세션(또는 커밋) 단위로 시간순으로 아래에 **추가**한다. 새 항목은 항상 파일 맨 아래에 붙인다.
**마지막 항목만 읽으면 직전에 어디까지 했고 다음에 뭘 해야 하는지 알 수 있어야 한다.**

각 항목 형식 (커밋 1개 = 항목 1개가 기본. 커밋 전 임시로 적어둔 경우 다음 커밋 시 해시를 채워 넣는다):

```
## YYYY-MM-DD - `<commit-hash>` 커밋 메시지 요약

### 한 일
- ...

### 기획 변경
- (없으면 "없음")

### 다음에 할 일
- ...
```

---

## 2026-08-26 - `7569d90` feat: 로그인/DB 기반 컨택트·상태위젯 구현 및 개발 문서 정비

### 한 일
- 로그인/회원가입: `next-auth` v5(JWT 세션) + `bcryptjs` (`src/auth.ts`, `src/app/(auth)/`, `src/app/api/auth/`, `src/lib/actions/auth.ts`).
- DB 도입: Neon + Drizzle ORM (`src/db/`, `drizzle.config.ts`), `scripts/promote-admin.ts`로 role 승격.
- `siteStatus` 싱글톤 테이블 + 관리자 전용 `StatusEditor`로 Online/Offline 상태 위젯 구현 (`src/components/status/`, `src/lib/actions/status.ts`).
- 홈페이지 Contact 섹션: nodemailer + Gmail SMTP 발송, 허니팟 스팸 방지 (`src/components/contact/`, `src/lib/actions/contact.ts`, `src/lib/mailer.ts`).
- shadcn 기반 디자인 시스템 적용 (`components.json`, `src/components/ui/`, `src/components/layout/`), 테두리 없는 스타일 + `--radius: 0.25rem` + 보라 프라이머리, 다크모드 제거.
- `docs/PLANNING.md` 기획 문서 작성, `docs/DEVLOG.md` 신설.
- AGENTS.md: "코드 import는 `@/*` 절대경로만 사용" 규칙 추가, 매 세션/커밋마다 이 개발 일지를 갱신하라는 지침 추가.

### 기획 변경
- 없음 (기존 `docs/PLANNING.md` 범위 내 1차 구현).

### 다음에 할 일
- `docs/PLANNING.md` 기준으로 Blog(`/blog`)·Notes(`/notes`)·Guestbook(`/guestbook`) 라우트 미착수 — 다음 구현 대상.
- 홈페이지 포트폴리오 콘텐츠(자기소개, 프로젝트 카드 등)는 의도적으로 비워둔 상태 — 채울 시점 논의 필요.

---

## 2026-08-26 - `a1a6f0d` feat: admin 페이지 추가

### 한 일
- `/admin` 라우트 추가 (`src/app/admin/page.tsx`): `auth()`로 세션 확인 후 비로그인은 `/login`으로 redirect, 로그인했지만 admin이 아니면 `notFound()`(404)로 존재 자체를 숨김, admin만 페이지 진입 가능.
- 사이드바(`src/components/layout/sidebar-content.tsx`)에 admin 로그인 시에만 보이는 "관리자 페이지" 버튼 추가.
- 검증: `tsc --noEmit` 통과, 개발 서버로 비로그인 상태 `/admin` 접근 시 `/login`으로 307 redirect 확인. admin 계정으로 로그인한 화면은 실제 admin 크리덴셜이 없어 직접 확인은 못 함.

### 기획 변경
- 없음.

### 다음에 할 일
- `docs/PLANNING.md` 기준으로 Blog(`/blog`)·Notes(`/notes`)·Guestbook(`/guestbook`) 라우트 미착수 — 다음 구현 대상.
- 홈페이지 포트폴리오 콘텐츠(자기소개, 프로젝트 카드 등)는 의도적으로 비워둔 상태 — 채울 시점 논의 필요.
- `/admin` 페이지는 현재 플레이스홀더 상태 — 실제 관리 기능(콘텐츠 관리 등)이 생기면 여기에 채울지 논의 필요.

---

## 2026-08-26 - `(커밋 전)` feat: 사이드바를 shadcn 컴포넌트로 교체하고 오른쪽으로 이동

### 한 일
- 직접 구현했던 사이드바(`sidebar-shell.tsx` + `sidebar-content.tsx`)를 shadcn 공식 `sidebar` 컴포넌트로 교체.
  - `npx shadcn@latest add sidebar` 실행. 프로젝트가 Base UI(`@base-ui/react`) 기반 커스텀 스타일(`base-nova`)이라 CLI가 Base UI 호환 코드를 그대로 생성함 — Radix 이식 불필요했음.
  - `button.tsx`, `input.tsx`는 CLI가 덮어쓰려 했으나 **거부**함: 프로젝트의 테두리 없음/`--radius: 0.25rem` 커스텀 스타일을 되돌리고 다크모드 관련 클래스를 재도입하려 했기 때문 (AGENTS.md의 "App-specific decisions"와 충돌). 신규 파일만 추가: `src/components/ui/{sidebar,skeleton,tooltip}.tsx`, `src/hooks/use-mobile.ts`.
  - `sidebar-content.tsx` → `app-sidebar.tsx`로 이름 변경, `Sidebar`/`SidebarHeader`/`SidebarContent`/`SidebarFooter`로 재구성 (async 서버 컴포넌트로 유지, `auth()` 그대로 사용).
  - `src/app/layout.tsx`: `SidebarProvider` + `SidebarInset` + `AppSidebar` 구조로 교체. 오른쪽 배치를 위해 JSX 순서를 `SidebarInset` → `AppSidebar`로 둠(사이드바의 flex 자리(gap div)가 DOM 순서를 따르기 때문에, `side="right"`만으로는 부족하고 순서도 맞춰야 함). 모바일 상단바의 커스텀 햄버거 버튼은 `SidebarTrigger`로 교체.
  - `--sidebar-*` CSS 변수는 이미 `globals.css`에 있어 추가 작업 없이 그대로 재사용됨.
- 검증: `tsc --noEmit` 통과. 개발 서버 + Chrome으로 데스크톱(1400px) 확인 — 사이드바가 화면 오른쪽에 렌더링, 상단 로고/하단 로그인 상태(admin 세션으로 확인)·관리자 페이지·로그아웃 버튼 위치 정상. 모바일 폭(768px 미만)에서의 Sheet 드로어 동작은 브라우저 창 리사이즈가 실제 뷰포트에 반영되지 않아(멀티 모니터 환경 이슈로 추정) 직접 스크린샷으로는 재확인 못함 — 로직은 기존 `md:hidden`/`useIsMobile` 768px 기준과 동일해 회귀 위험 낮다고 판단.

### 기획 변경
- 없음.

### 다음에 할 일
- 다음 세션 시작 시 실제 모바일 폭(또는 별도 디바이스/DevTools)에서 사이드바 Sheet 드로어 열기/닫기 한 번 더 확인.
- `docs/PLANNING.md` 기준 Blog(`/blog`)·Notes(`/notes`)·Guestbook(`/guestbook`) 라우트 미착수.
- 홈페이지 포트폴리오 콘텐츠(자기소개, 프로젝트 카드 등) 비어있음.
- `/admin` 페이지 실제 관리 기능 논의 필요.
