# Headcount cloud classrooms — first release

Headcount at https://starkfiber.my/headcount now offers free teacher classrooms, manually confirmed attendance and teacher-led quizzes. Students join with a code and nickname; no student email is requested. The original browser-local application in this repository remains available.

## Source integration

`headcount-cloud-source.zip` contains the MIT-licensed classroom service, Next.js route/client pages and behavior tests used for this first release. This is an integration module, not a standalone replacement for SFE’s account platform. The archive README documents host adapters. Production credentials and classroom records are never included.

Free limits: 10 saved classes per teacher, 100 learners per class, 100 participants per session, 30 questions per quiz. Sessions expire after six hours; transient attendance/nickname/response records are cleaned after seven days on service access. Class setup remains until its owner removes it. Download records you need. Nicknames and attendance are not verified student identities; this is not a secure examination system.

## Verified scope

Store tests cover cross-owner denial, stale revisions, validated roster/questions, correct-answer withholding, first-response-wins, teacher reveal/lock/end transitions, frozen session snapshots, expiry and deletion. An isolated signup-to-session HTTP flow and browser teacher/student flow were exercised. A synthetic smoke test admitted 100 participants, rejected participant 101 and served 100 reads with 20 concurrent readers. It is not a sustained production load benchmark.

Development continues with pilot classroom feedback, improved question editing/imports and richer reports. No claim of Kahoot feature parity.
