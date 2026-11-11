# eHadir repository

## SFE Academy attendance adapter

The new [Academy integration](ACADEMY-INTEGRATION.md) validates complete attendance rosters, real calendar dates and privacy-preserving summaries. Run `node --test attendance.test.mjs` on Node 22+. This is a tested adapter foundation; the live Academy import interface is not yet connected. Centre permissions, teacher assignments and student records remain controlled by Academy.


Before the Academy adapter release, this repository contained only a [licence file](LICENSE). The repository now includes the adapter and tests above; a standalone attendance app and production deployment are not included.

Maintained in the [Stark Fiber Enterprise](https://starkfiber.my) portfolio.

## Development checklist

Before publishing an attendance product here, define user roles, consent and data retention; add source code, a setup guide and synthetic test data; and verify authentication, attendance permissions, exports and backup recovery.

Do not commit student or staff records. Repository presence is not a claim that a school system has been released or qualified.

