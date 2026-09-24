# SIM — Gym Edition Changelog

## v0.6.0 — Sep 2026

### New

- **Personnel attendance report**: staff clock-in/out via card swipe now generates an attendance report, no separate timeclock needed.

### Fixed

- **Timezone correctness**: pinned the app to GMT+8 with whole-day date boundaries — fixes a class of bugs where reports and check-ins near midnight landed on the wrong day.

---

## v0.5.1 — Aug 2026

### Fixed

- Fixed the financial dashboard returning zero results when the date range collapses to a single day (Date From equals Date To).

---

## v0.5.0 — Jul 2026

### New

- **Financial dashboard**: revenue actuals and forecasts, daily breakdown, average transaction value, and member counts in one view.

---

## v0.4.3 — Jun 2026

### Fixed

- Fixed a `GROUP BY` bug in payment status recalculation
- Added a Windows `EndPagePrinter` fix for receipt printing
- Retail products now soft-delete instead of failing on a foreign-key conflict
- Added version bump scripts (major/minor/patch) for releases

---

## v0.4.2 — May 2026

### Fixed

- Fixed retail inventory stock-level computation.

---

## v0.4.1 — May 2026

### New

- **Subscription freeze/unfreeze**, including a custom unfreeze/re-expiry date picker.

---

## v0.4.0 — May 2026

### Fixed

- Fixed a printing service bug affecting receipt output.

---

## v0.3.0 — May 2026

### New

- **Subscriptions**: inline discounts, partial payments, and payment-method tracking.

### Fixed

- Further thermal printer stability fixes.

---

## v0.2.3 — Apr 2026

### Fixed

- Fixed a printer memory-corruption bug
- Added a printer selector and print debug logging
- Fixed a duplicated SHA/version string in the UI

---

## v0.2.2 — Apr 2026

### New

- Auto DB migration on app startup.

### Fixed

- Deduplicated cashier sessions during sync
- Fixed a `lib_usb_error not supported` printer error

---

## v0.2.1 — Apr 2026

### New

- **Discounts module**
- **Packages and Subscriptions** feature
- Configurable check-in screen timeout
- Subscription start-date picker
- Text-to-speech confirmation on check-in scan

### Changed

- POS auto-updater now installs silently with the correct installer, without an implicit background download

### Fixed

- Fixed a "no printer found" banner shown in error
- Fixed a Personnel page bug

---

## v0.2.0 — Mar 2026

Initial tagged release, after roughly two weeks of scaffolding.

- NFC check-in via ACR122 reader, with real-time WebSocket events for scan/connect/error
- Member management: CRUD, search, active-subscription filtering
- Consolidated CI/CD pipeline with parallelized builds
- App icon and packaging groundwork for Mac/Windows/Linux builds
