# eHadir × SFE Academy

This module prepares attendance for the existing SFE Academy service. It does not create another student database or bypass Academy authentication.

`attendanceAction({classId,date,roster,rows})` validates a complete reviewed roster and returns the existing `{type:"attendance",classId,date,values}` action. Supply IDs from the current authorised class roster. In the Academy action envelope, use the returned classId/date/values as its action payload. The server remains authoritative for centre membership, teacher assignment, enrolment, subscription and writes.

Every enrolled learner must have one row with `studentId` and `status`: Present, Absent, Late, Excused or Unmarked. Partial imports are rejected because Academy attendance replaces the current roster. Withdrawn learner history is preserved by the Academy service. Dates are validated as actual calendar dates. `attendanceSummary(values)` returns counts without learner identifiers; rate is (Present + Late) / (marked − Excused), or null when undefined.

Run `node --test attendance.test.mjs` with Node 22+. No network, storage or paid inference dependencies.

Status: adapter and unit tests; not yet wired into the live Academy import interface. Next: an authorised preview/confirm import screen, concurrency/version checks, export audit and centre-isolation integration tests with synthetic learners. No live learner data has been copied or changed.

