# Headcount

**Know who is here. Find out what clicked. Plan what comes next.**

A colourful classroom space for attendance, live lesson quizzes and private exit tickets. Built by Stark Fiber Enterprise. MIT open source.

Rounded Nunito typography, warm paper surfaces and four distinct answer colours give Headcount its own identity. Letter labels, focus rings and reduced-motion support keep playfulness usable.

[Start a classroom](https://starkfiber.my/headcount/classroom) · [Join with a code](https://starkfiber.my/headcount/join) · [Explore Headcount](https://starkfiber.my/headcount)

![Headcount classroom home](headcount-preview.png)

## Make room for a little fun

- Reconnect on wake, online and refresh; retry-safe joining and locally queued answers.
- Phone remote: scan from your teacher workspace, sign in, then start, reveal, advance and show the leaderboard while the projector stays fullscreen.
- Teacher-started 15, 30 or 60 second rounds, or no timer. Add time when the class needs it.
- Full-page classroom lobby with a large QR code and arriving nickname tiles. Native fullscreen where supported.
- Select waiting students and confirm attendance together; students never mark themselves present.
- Optional nickname leaderboard, shared ranks and equal points for correct answers.
- Session streaks, levels and gentle answer celebrations, with reduced-motion support.
- Three free starter quizzes: numbers, nature and digital safety.
- A PNG or SVG learning keepsake at the end of the session.

The teacher decides when to reveal, move on and show scores. No speed bonus, paid inference or public display of private exit tickets. Levels and streaks are session activities, not academic credentials.

## One lesson, one clear flow

1. **Prepare:** name your class and start a session. Class lists and quizzes are optional.
2. **Welcome:** show the QR code; students join with a nickname, without email. Confirm attendance yourself. Add a class list only to track expected absences.
3. **Teach:** present questions, collect responses, reveal and discuss.
4. **Listen:** open exit tickets for confidence, one learning point and a request for help.
5. **Follow up:** review topic results and private learner responses; export before retention expires.

Teachers see missing answers separately from incorrect answers. Feedback suggests **teach again**, **practise together** or **extend**, based on submitted answers. It is a conversation starter, not a judgement of student ability. Participant nicknames are not verified roster identities.

## Choose your edition

| | Browser-local | Hosted classrooms |
|---|---|---|
| Start | Serve this repository’s index.html | Open the website |
| Accounts | None | Teacher account; students use a code |
| Data | This browser; export your backups | Teacher-owned classes and temporary sessions |
| Activities | Attendance and local quiz practice | Live quiz, exit tickets, topic feedback, lesson library |
| Source | Root JavaScript files | [MIT cloud module](headcount-cloud-source.zip) |

The cloud module is integration source, not a turnkey hosting package. [Read setup, limits and architecture](CLOUD-CLASSROOMS.md). The standalone root app does not yet include cross-device sessions or exit tickets.

## Run locally

Use Node 22+ and run `npm test`. Serve this directory with a static HTTP server and open `index.html`; browser modules cannot run from `file://`. The local edition supports up to 300 learners and portable JSON/CSV records. Browser storage is not encrypted; use initials and keep protected backups.

## Help build it

[Contributor guide](CONTRIBUTING.md) · [Learning roadmap](ROADMAP.md) · [MIT licence](LICENSE)

Useful contributions: keyboard/mobile accessibility, teacher-tested question templates, translations, connection recovery and portable self-hosting adapters. Use synthetic learners in tests and screenshots. Never submit real classroom records or credentials.

## Origins

Headcount continues the eHadir initiative. The original licence and Academy attendance adapter remain in this repository with their history and attribution. No original school database or learner records are included. SFE brand artwork is separate from the MIT code; use your own identity for forks.

## Dedicated quiz play screen

Live play has a compact player bar, responsive four-answer grid, clear selected/revealed states and short question/result transitions. Reduced-motion preferences are respected. Teacher pacing, attendance confirmation and retry-safe answer recovery remain unchanged. The hosted classroom integration source is included in `headcount-cloud-source.zip`; it requires the documented SFE authentication/runtime integration.
