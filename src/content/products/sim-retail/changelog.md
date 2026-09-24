# SIM — Retail Edition Changelog

## v0.1.0 — Aug 2026

A single fast-moving pre-1.0 release line — SIM Retail went from fork to functioning multi-branch POS in about two and a half weeks. Grouped below by what landed in each phase.

### Polish (Aug 2026)

- Masked PIN inputs with a show/hide toggle
- POS navigation now uses the synced branding logo instead of a bundled asset
- Moved the set-PIN route so auth tokens attach correctly
- Fixed a false-positive POS/server version-mismatch warning in server discovery

### Stability

- Fixed POS fresh-install crashes, including a native module compile issue affecting receipt printing
- Correctly stamped build version in the backend
- Full user-management UI: create, delete, and PIN-reset for the seeded admin account
- Update detection now flags any SHA difference from the latest release, instead of relying on version-string comparison
- Fixed the auto-updater's repo slug, left over from the original fork
- Log viewer gated to the Admin role instead of a hardcoded username
- Added a built-in support login for remote troubleshooting

### Feature build-out

- Dev/master login flow and an offline user cache so the POS can authenticate without a live connection
- White-label branding: server discovery, branded POS login screen, configurable app identity
- User registration and role-based route guards
- Per-branch sales and stock tracking
- Rebranded from the SIM gym codebase to SIM Retail

### Hardening

- Fixed an unauthenticated password-reset endpoint that allowed account takeover
- Fixed unauthenticated file upload/serve endpoints
- Fixed password hashes leaking through several API responses (`/api/users`, `/api/auth/me`, POS sync)
- Added `class-validator` DTOs across every backend module
- Added a ~790-test Jest suite covering 9 modules, plus a CI workflow to run it
- Fixed a commission-math bug where refunds weren't netted correctly

### Initial build

- Forked from SIM: gym-specific modules (members, NFC check-in, subscriptions, personnel attendance) stripped out
- New retail modules scaffolded: purchasing, suppliers, customers/loyalty, multi-branch, cashflow
- White-label branding groundwork and back-office admin pages
