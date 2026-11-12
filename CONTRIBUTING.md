# Contributing to Headcount

Start with a small issue describing the classroom problem, who it affects and the intended result.

## Two parts of this repository

- Root: browser-local classroom tool. Run `npm test` with Node 22+ and serve with a static server.
- `cloud/`: hosted classroom integration. Requires the authentication, database, validation and rate-limit adapters documented in CLOUD-CLASSROOMS.md. Test in isolated storage, never against a real class.

## Before opening a pull request

1. Keep teacher control explicit. Do not reveal answers or advance a question automatically.
2. Preserve first-answer-wins, retry-safe joins, teacher ownership and private feedback boundaries.
3. Test keyboard navigation, 320px/390px mobile widths, desktop projection and reduced motion.
4. Exercise empty, loading, error, reconnect and completed states—not only a populated screenshot.
5. Explain the change, relevant checks and any limitations. Add before/after screenshots for visible changes.

No student records, credentials or production databases in commits or issues. For a security concern, use the private contact route at https://starkfiber.my/enquire rather than publishing an exploitable report.

All contributions must be compatible with the MIT licence. Keep third-party notices intact. Do not copy another product’s branding or proprietary assets.
