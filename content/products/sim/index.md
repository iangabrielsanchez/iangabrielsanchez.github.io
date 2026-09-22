# SIM — Gym Edition

SIM (Sales and Inventory Management) built for a real gym, running on hardware I set up and maintain. Front desk check-in, subscriptions, retail checkout, staff attendance, and financial reporting — all in one offline-capable desktop app.

![SIM check-in screen with NFC scanner active](https://placehold.co/1200x675/000000/FFFFFF?text=Check-In+Screen)

*Front desk check-in: NFC tap or manual entry, with live reader status.*

## The Problem

Most gym software is either a subscription SaaS priced for a multi-location chain, or a spreadsheet-and-notebook system that breaks down the moment a member forgets their number at the desk. Neither fits a single-location gym that wants fast check-in, accurate billing, and reporting it can actually trust — without paying per-member SaaS fees or depending on an internet connection to let someone in the door.

## What It Does

- **NFC check-in** — members tap a card at the front desk; a WebSocket gateway pushes reader events (scan, connect, error) to the UI in real time. Manual check-in by member number is available as a fallback.
- **Subscriptions & packages** — session-based or date-based expiry, freeze/unfreeze with custom re-expiry dates, renewal grace-period pricing, inline discounts, partial payments, and payment-method tracking, with payment status recomputed automatically as payments come in.
- **Retail & cafe POS** — a separate companion Electron terminal app for front-desk retail and cafe sales, with its own inventory (stock in/out, computed stock levels) and thermal receipt printing.
- **Staff attendance** — personnel clock in/out via card swipe, generating attendance reports without a separate timeclock system.
- **Financial dashboard** — revenue actuals and forecasts, daily breakdowns, average transaction value, and member counts, all computed from the same transaction data driving check-in and billing.
- **Session confirmations queue** — a review step for pending sessions before they're logged, so front-desk mistakes don't silently corrupt billing.

![SIM financial dashboard with revenue charts](https://placehold.co/1200x675/000000/FFFFFF?text=Financial+Dashboard)

*Revenue actuals vs. forecast, daily breakdown, and transaction averages.*

![SIM retail POS terminal at checkout](https://placehold.co/1200x675/000000/FFFFFF?text=Retail+POS+Terminal)

*The companion POS terminal app, used at the front desk for retail and cafe sales.*

## Why It's Built This Way

SIM runs as an Electron desktop app talking to a local NestJS backend and PostgreSQL database — no cloud dependency for day-to-day operation. Auto-migration on startup keeps the schema current without manual DB work, and an auto-updater (with a separate release channel for the POS terminal) keeps the gym's install current without me physically visiting.

Hand-written SQL migrations for full control over the schema, and direct integration with an ACR122 NFC reader and USB thermal printer via ESC/POS — the kind of hardware-facing work that doesn't show up in a typical web app, and that surfaces its own class of bugs: printer memory corruption, timezone boundaries that only break at midnight, silent installer mismatches on auto-update.

## Tech Stack

- NestJS backend with parameterized queries over `pg`
- Angular 21 admin console + a separate Angular POS terminal renderer
- Electron desktop shell (Mac/Windows/Linux), electron-builder, electron-updater
- PostgreSQL
- NFC hardware integration (`pcsclite`, `nfc-pcsc`) and ESC/POS thermal printing
- JWT auth, WebSocket gateway for real-time reader events
- GitHub Actions CI on a self-hosted runner, publishing to a private release channel
