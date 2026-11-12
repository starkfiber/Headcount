<p align="center"><img src="classroom-club.webp" alt="Headcount: colourful characters building a staircase together" width="820"></p>

# Headcount · The Classroom Club

**Bring your class together. Make every answer a learning moment.**

Free attendance, teacher-led quizzes and learning check-ins by **Stark Fiber Enterprise**.

[**Start a classroom →**](https://starkfiber.my/headcount/classroom) · [Join a session](https://starkfiber.my/headcount/join) · [Explore Headcount](https://starkfiber.my/headcount)

## One lesson. Three good moments.

| Bring everyone in | Make thinking visible | Know what comes next |
| --- | --- | --- |
| Students scan a QR and choose a nickname. Teachers confirm attendance together. | Lead a quiz from your phone while the classroom screen stays open. | Collect exit tickets and see topics that need another look. |

- **You set the pace.** Start a countdown, reveal the answer, show the leaderboard and move on when ready.
- **No student accounts.** Nicknames, joining codes and optional class lists.
- **A little game-day energy.** Answer feedback, streaks, session badges, animated results and optional projector sound.
- **Reusable lessons.** Save your quizzes or start with a warm-up.
- **Recovery built in.** Retry-safe joining and first-answer-wins submission. Pending answers retry after reconnect, subject to the question deadline.
- **Free hosted classrooms.** 10 classes, 100 learners per class and 30 questions per quiz. No subscription.

## Use it your way

### Teach now

Open [Headcount](https://starkfiber.my/headcount), create a teacher account, name a class and start a session. Students need only the joining code or QR. A class list is optional; use one when you need to record absences. Joining alone never confirms attendance.

### Run the local classroom tool

The repository root is a small browser-only attendance and quiz tool. It stores data on your device; it does not host live rooms.

```sh
git clone https://github.com/starkfiber/Headcount.git
cd Headcount
python3 -m http.server 8080
```

Open `http://localhost:8080`. Download a backup before clearing browser data or switching devices.

For its tests, use Node 22 or later:

```sh
npm test
```

### Build the hosted experience

The readable [`cloud/`](cloud/) source contains the classroom service, API, React screens and tests. [CLOUD-CLASSROOMS.md](CLOUD-CLASSROOMS.md) explains authentication adapters, storage, routes and deployment boundaries. The [source archive](headcount-cloud-source.zip) also includes route wrappers and vendored QR code dependencies.

**The cloud module is integration source, not a one-command standalone server.** It needs the documented host adapters. It does not include SFE account data, secrets or private platform code.

## Built for classrooms, not surveillance

Teachers control sessions and attendance. Exit-ticket reflections stay private to the teacher. Public leaderboards are optional and use nicknames. There is no speed bonus. Students are not verified identities; Headcount is not a secure examination system.

Hosted sessions last six hours. Session records are cleaned after seven days on service access; export what you need. See [Privacy](https://starkfiber.my/privacy) and [the architecture notes](CLOUD-CLASSROOMS.md).

## Help make learning better

Read [CONTRIBUTING.md](CONTRIBUTING.md). Useful contributions include accessibility, translations, clearer teacher workflows and tested recovery behaviour. Include a small reproduction and screenshots for visual changes. Please do not put student records or credentials in issues.

**MIT licensed.** See [LICENSE](LICENSE). Original launch illustration generated for SFE with OpenAI image generation; source prompt in [ARTWORK.md](ARTWORK.md). No Kahoot assets or source code are included.
