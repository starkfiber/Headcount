# Headcount

Attendance and quick classroom quizzes, by Stark Fiber Enterprise. Formerly the eHadir initiative. MIT licensed.

## Free hosted classrooms

[Open Headcount](https://starkfiber.my/headcount) for saved teacher classrooms, attendance and live quizzes. Students join by session code and nickname. See [cloud source and integration notes](CLOUD-CLASSROOMS.md) for the new MIT source module, free limits and validation scope. The cloud module needs a host account/database integration; the root app below stays standalone.

## Standalone browser-local edition
Browser-local classroom of up to 300 learners, date-based attendance, four-option quizzes, practice grading, CSV export, validated JSON backup/restore. No server, accounts, uploads or paid inference. Names are rendered as text and CSV formulas are neutralised. Use initials on shared devices. Browser storage is not encrypted and is not a durable school record system; keep protected backups and follow your organisation’s retention rules.

Serve this directory with a static HTTP server and open index.html. Run `npm test` with Node 22+. The hosted version is https://starkfiber.my/headcount . Do not open modules using file://.

Quizzes are local practice, not secure exams: answers are in the source/backup and no student identity is verified. No cross-device portal or LMS is claimed. Multiple browser tabs are not a collaborative session; use one editing tab per classroom.

## Development track
1. Local classroom, import/export and reproducible tests.
2. Academy integration with existing SFE sign-in, verified teachers, class permissions and audit history.
3. Opt-in student check-in and quiz submissions with server-side scoring, consent and retention controls.
4. Only after those foundations: student portal, progress and LMS integrations.

The earlier `attendance.mjs` adapter remains available for Academy integration. Its server-authorised path is separate from this local classroom. No live Academy student data is included.

## Origins

Headcount continues the eHadir initiative. The original licence and the Academy attendance adapter remain in this repository with their history and attribution. No original school application source or student records were present. The new dependency-free classroom workspace is a first release, not a migration of existing school records.
