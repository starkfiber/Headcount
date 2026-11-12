# Cloud classroom module

The [source archive](headcount-cloud-source.zip) contains the current MIT service, API, React screens and behavior tests. Extract it and follow its README for host adapters. Node 24, Next.js 16, React 19, Zod 4 and Vitest 4 are the tested runtime family. Enable SQLite foreign keys and protect persistent storage. Reuse secure server-side authentication; never accept a client-provided teacher ID.

## What is available

- Saved classrooms and manually confirmed attendance.
- Teacher-controlled live quizzes and projector view, with correct answers withheld until reveal.
- Per-question topics and reusable private lesson library; loading a lesson copies questions into the class.
- Exit tickets: confidence, learning reflection and help request. Students can revise while tickets are open.
- Teacher-only topic summaries and participant feedback, with JSON export.

## Limits and retention

10 saved classes per teacher, 100 learners per class, 100 participants per session, 30 questions per quiz and 30 saved reusable lessons. Sessions last six hours. Session attendance, nicknames, answers and exit tickets are cleaned after seven days on service access. Export records you need. Saved classes and lessons remain until the owner deletes them. Class deletion cascades to its sessions. Students are not verified identities; do not use this as a secure exam system.

## Architecture and scaling

The browser renders the classroom; the server remains authoritative for access, phase transitions and responses. SQLite WAL stores isolated sessions. Student/projector polling runs every three seconds and teacher polling every four; hidden tabs pause, requests do not overlap, and ended sessions stop polling. A participant/session index supports room queries.

This is not peer-to-peer, serverless or unlimited-capacity hosting. Keep a single writer deployment today. Horizontal scaling requires a shared store, distributed rate limits and measured realtime fan-out. A future WebSocket/SSE adapter must preserve auth, recovery, privacy and scoring behavior before replacing polling. No paid inference is used for feedback.

## Feedback meaning

Topic accuracy uses submitted responses to revealed questions. Below 60% suggests reteaching; 60–79% practice; 80%+ extension. No responses means check understanding. Missing responses are displayed separately. A participant is highlighted for check-in after an explicit help request, low confidence or below 60% accuracy among submitted revealed answers. Small samples are not reliable ability assessments. Never expose private reflections on the projector or automatically link nicknames to roster identities.

## Verification

Unit tests cover teacher isolation, stale saves, answer withholding, phase transitions, lesson ownership, exit-ticket privacy/updates, missing-response semantics and deletion. Integration and browser results for this release are recorded in the release handover. The earlier 100-participant synthetic smoke test was not a sustained production capacity benchmark. No Kahoot parity claim.

## Classroom game controls

Countdown0/15/30/60 seconds is selected before a question. The server rejects answers at the deadline. Time expiry never reveals or advances automatically; the teacher can add15 seconds. Refresh/rejoin reads the existing deadline rather than restarting it. Leaderboards are off by default; when enabled, only nicknames and revealed-answer points appear. Correct answers earn100 points, ties share ranks, and no speed bonus applies. Streaks and levels reset with each session. PNG/SVG keepsakes are generated on the student's device.

QR generation uses vendored MIT qrcode-generator2.0.4; codes contain the public joining URL and code, not participant or projector credentials. Scan prefills the code. Classroom feedback and exit-ticket notes remain private even when the scoreboard is enabled. Countdown rendering uses local monotonic elapsed time against a server snapshot; network synchronization still uses polling.

## Scan-first attendance

Start session saves the classroom and opens its QR invite without requiring a roster or quiz. Class lists are optional. Joining never marks attendance. Teachers can add a joined nickname to this session and confirm present, or mark an existing roster entry to avoid duplicates. Repeated confirmation is idempotent. This does not add the nickname to the saved class list. Attendance remains editable and exportable; identifying absences needs an expected class list.

## Classroom projection and bulk confirmation

The read-only screen token exposes joining nicknames only in the lobby, never teacher attendance records or feedback. The teacher selects a snapshot of participants and submits one authenticated batch; new arrivals remain unselected. Validation completes before one database update; invalid or stale participant IDs reject the whole batch. Existing roster entries should be marked instead of duplicated. Native fullscreen is user-initiated with a full-page fallback; nickname tiles respect reduced motion. Refresh uses the existing three-second polling, not WebSockets. No extra dependency or external skill was needed; reviewed screenfull on GitHub for browser support considerations.

## Teacher phone remote

Open “Control from your phone” in a running classroom and scan its QR. The phone must sign into the owning teacher account. The URL carries only the session ID, never a control token. Login preserves a strictly validated remote destination. The remote submits expected phase, question and leaderboard state; stale commands return409, so retrying an old tap cannot advance another question or toggle the board again. The screen polls without navigation and shows a dedicated leaderboard panel when enabled; hide it to return to the question. Native fullscreen remains user-initiated on the display. No new dependency.

## Interrupted connections

Student joins use a browser-generated256bit recovery token saved before sending; repeat requests recover the same participant even if joining was locked after the original response was lost. Token is scoped to the session. Existing sessionStorage identities remain valid. Pending answers are stored before sending and retried on reconnect/refresh. The server acknowledges already-recorded answers after reveal without overwriting them; genuinely unsent late answers are rejected with a visible notice. Server-confirmed answers remain authoritative. Wake, pageshow and online events trigger refresh; fetches time out after10seconds. Teacher commands are not replayed automatically. Storage clearing, a new browser/device or a closed private session cannot recover a browser-only identity. No guarantee of delivery after a teacher deadline; no physical device-lock automation claimed.

## Dedicated quiz play screen

Live play has a compact player bar, responsive four-answer grid, clear selected/revealed states and short question/result transitions. Reduced-motion preferences are respected. Teacher pacing, attendance confirmation and retry-safe answer recovery remain unchanged. The hosted classroom integration source is included in `headcount-cloud-source.zip`; it requires the documented SFE authentication/runtime integration.

## Classroom Club release

Readable service/API/UI/test files now live under `cloud/` at their original integration paths. The archive includes additional route wrappers, QR vendor code and installation notes. The root local tool remains independent.

A teacher-triggered five-second lead-in uses a server deadline (`countdownEnds`). During countdown, students and the projector receive no question, and answers are rejected. Subsequent reads resolve the same round after the deadline; refresh does not start another countdown. The question timer starts at that deadline. Correct answers and progression still require teacher actions. Polling means a late-connected device may observe only part of the countdown.

Projector sounds are synthesized locally, muted by default and enabled through a user gesture. Fresh loads do not replay event sounds. They announce countdown/reveal/end, not correctness of an individual student. Reduced-motion CSS suppresses decorative animation. Do not infer physical-device testing from browser viewport checks.

## v0.3.0 — teaching assistant

The source archive includes the lesson metadata migration, aggregate session reports, MCP dispatcher, authenticated HTTP endpoint and connection page. Existing lessons remain readable. Draft writes are idempotent by teacher/request ID; retries cannot silently create duplicate lessons.

Host OAuth requirements: register the exact `/api/sfe/headcount/mcp` resource and `headcount:read` / `headcount:prepare` scopes, expose protected-resource metadata, allow these scopes/resources during dynamic client registration and display the requested permissions on signed consent. Do not extend existing Kit grants automatically. Require verified accounts, ownership checks, audience-bound JWTs, current consent and immediate revocation. `sfe-headcount-agent.ts` illustrates the adapter contract against SFE's host services; private account infrastructure is not included. Supply equivalent host adapters before running this integration.

See TEACHING-ASSISTANT.md for setup, privacy, tools and limits. Tests that import SFE auth adapters run in the host application, not the root standalone tool.
