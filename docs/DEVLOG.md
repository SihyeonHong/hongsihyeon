# 개발 일지 (DEVLOG)

작업 세션(또는 커밋) 단위로 시간순으로 아래에 **추가**한다. 새 항목은 항상 파일 맨 아래에 붙인다.
**마지막 항목만 읽으면 직전에 어디까지 했고 다음에 뭘 해야 하는지 알 수 있어야 한다.**

각 항목 형식:

```
## YYYY-MM-DD - 한 줄 요약

### 한 일
- ...

### 기획 변경
- (없으면 "없음")

### 다음에 할 일
- ...
```

---

## 2026-08-26 - 로그인/DB/컨택트 1차 구현 (누적 정리) + 개발 일지 시작

### 한 일
- (이전 세션 누적, 아직 커밋 전) 로그인/회원가입 구현: `next-auth` v5(JWT 세션) + `bcryptjs`, `src/auth.ts`, `src/app/(auth)/`, `src/app/api/`.
- DB 도입: Neon + Drizzle ORM (`src/db/`, `drizzle.config.ts`), `scripts/promote-admin.ts`로 role 승격.
- `siteStatus` 싱글톤 테이블 + 관리자 전용 `StatusEditor`로 Online/Offline 상태 위젯 구현.
- 홈페이지 Contact 섹션: nodemailer + Gmail SMTP 발송, 허니팟 스팸 방지.
- shadcn 기반 디자인 시스템 적용 (`components.json`, `src/components/`), 테두리 없는 스타일 + `--radius: 0.25rem` + 보라 프라이머리, 다크모드 제거.
- AGENTS.md에 Windows/npm 관련 운영 노하우 및 앱 결정사항 문서화, `docs/PLANNING.md` 기획 문서 작성.
- (오늘) AGENTS.md에 "코드 import는 `@/*` 절대경로만 사용" 규칙 추가.
- (오늘) 이 개발 일지(`docs/DEVLOG.md`) 신설 + AGENTS.md에 매 세션 업데이트 지시 추가.

### 기획 변경
- 없음 (오늘은 운영 규칙 정비만 진행).

### 다음에 할 일
- 위 누적 작업들이 아직 git에 커밋되지 않은 상태(`git status`에 `src/auth.ts`, `src/db/`, `src/app/api/`, `src/app/(auth)/` 등이 untracked/modified로 남아 있음) — 커밋 단위 정리 필요.
- `docs/PLANNING.md` 기준으로 Blog(`/blog`)·Notes(`/notes`)·Guestbook(`/guestbook`) 라우트 미착수 — 다음 구현 대상.
- 홈페이지 포트폴리오 콘텐츠(자기소개, 프로젝트 카드 등)는 의도적으로 비워둔 상태 — 채울 시점 논의 필요.
