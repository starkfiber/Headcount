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
