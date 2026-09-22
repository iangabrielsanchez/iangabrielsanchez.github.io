# SIM — Retail Edition

SIM (Sales and Inventory Management), generalized for retail — a white-labeled, multi-branch point-of-sale system forked from the gym edition and turned into a standalone retail product in under three weeks.

![SIM Retail POS checkout screen](https://placehold.co/1200x675/000000/FFFFFF?text=Retail+Checkout)

*Branch checkout: barcode scan, VAT handling, and offline-first sync.*

## The Fork

The Retail Edition started as a copy of the Gym Edition's codebase with every gym-specific module — members, NFC check-in, subscriptions, packages, personnel attendance — stripped out and replaced with retail-specific modules: purchasing, suppliers, customer loyalty, multi-branch inventory, and cashflow accounting. Same backend architecture, same Electron POS pattern, different business.

## What It Does

- **Multi-branch POS** — shift open/close with cash counts, full and partial refunds, petty cash logging, and offline-first sync so a branch keeps selling through a dropped connection.
- **Purchasing & suppliers** — supplier records, purchase orders, and stock received against a PO, matched to inventory.
- **Customer loyalty** — customer profiles with purchase history and a points program, with redemption guarded at both the database and application layer.
- **Cashflow tracking** — a categorized expense ledger, income-vs-expense statement, accounts payable/receivable, and cash short/over reconciliation at shift close.
- **Employee commissions** — sales tied to the cashier who made them, with commission rates correctly netted against refunds.
- **White-labeling** — POS terminals auto-discover the backend server on the local network, and pull branding (logo, app identity) from the server instead of a bundled asset, so the same install works across differently-branded deployments.

![SIM Retail back-office dashboard with branch reporting](https://placehold.co/1200x675/000000/FFFFFF?text=Back-Office+Dashboard)

*Multi-branch back-office: sales, inventory variance, and cashflow in one view.*

![SIM Retail purchasing and supplier management screen](https://placehold.co/1200x675/000000/FFFFFF?text=Purchasing+%26+Suppliers)

*Supplier records and purchase orders, matched against received stock.*

## Built Fast, Hardened Properly

The generalization itself took a few days. Most of the following two and a half weeks went into things that don't show up in a feature list: adding `class-validator` DTOs across every module (a gap in the original codebase), writing a ~790-test Jest suite, and fixing real vulnerabilities found along the way — password hashes leaking through a handful of API responses, and an unauthenticated password-reset endpoint that allowed account takeover.

Raw ingredient inventory and a cafe menu module are planned but not yet built — everything else in this changelog is implemented and covered by the test suite, though not all of it has had a full UI-level pass yet.

## Tech Stack

- NestJS backend with parameterized queries over `pg`, `class-validator`/`class-transformer` DTOs
- Angular 21 back-office admin app with dynamic white-label theming
- Angular POS terminal renderer, offline-first with a local SQLite mirror synced over Electron IPC
- Electron desktop shell, plus a Docker/nginx static deployment option for the back-office
- PostgreSQL
- Role-based access control with route and endpoint guards
- ~790 Jest tests across 9 backend modules, GitHub Actions CI
