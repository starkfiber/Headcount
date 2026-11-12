# Classroom pilot — v0.3.1

A bounded, synthetic pilot of **prepare → teach → reflect → prepare again**. No real student records were used.

## What ran
- Codex authored a four-question fractions lesson and saved/read it through OAuth-protected MCP.
- Six synthetic participants joined; teacher attendance confirmation remained required.
- A browser at phone size started the countdown, revealed answers, advanced the question and controlled the fullscreen leaderboard.
- A lost join response recovered one participant, without duplication.
- A lost answer response and refresh preserved the first answer. Repeated submissions did not replace it.
- Stale teacher commands returned 409.
- Aggregate results informed a Codex-authored three-question follow-up, saved through MCP for teacher review.

## Failure found and fixed
An interrupted exit-ticket submission lost its text after refresh. Drafts now stay in session storage, bound to the participant, with a six-hour expiry. Refresh restores them for review and retry. Successful submission or a completed session clears the draft. Drafts do not automatically submit after reconnect.

## Test limits
WhatIF tested a fresh browser join/reload, anonymous access denial and 50 public-page reads with five workers. This is not a real classroom or high-capacity certification. Network faults were injected through an isolated loopback proxy; physical phone lock/Wi-Fi behaviour needs a device pilot. The teacher UI was exercised at mobile viewport size, not on a physical phone.

AI remains optional and teacher-led. Agent responses exclude student identities and written exit-ticket text. No model inference service or new paid subscription is introduced by this release.
