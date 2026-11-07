# FOXPHASE Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the FOXPHASE bilingual producer platform with a polished public experience and secure commerce/admin foundations.

**Architecture:** Use Next.js App Router for public routes and route handlers, typed content and locale dictionaries for editorial content, client providers for locale/cart/audio state, and Supabase SQL/RLS as the persistence contract. The current storefront is live-ready but uses clearly labelled demo catalog content and an order-request flow until a verified payment provider is configured.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, Motion, Lucide React, Vitest, React Testing Library, Supabase SQL.

**Spec:** `docs/superpowers/specs/2026-11-07-foxphase-product-design.md`

## Global Constraints

- Use English as default and Russian as a complete alternative; never lose the current route when switching language.
- Do not fabricate real FOXPHASE music, sales, collaboration credits, reviews, or confirmed payments.
- Protect administrative and delivery behavior on the server; no public admin registration or client secrets.
- Animation must honor `prefers-reduced-motion`; layout must remain usable from 320px upward.

## Review Focus

- A persisted cart must not accept a non-existent beat or license price from browser storage.
- Locale storage may be malformed and must fall back safely to English.
- Checkout must not report payment success without a verified provider webhook.
- Admin access must fail closed when Supabase credentials or role information are absent.
- Original audio file locations must never be exposed in public beat payloads.

### Task 1: Foundation and test harness

**Files:** configuration, Tailwind styles, root layout, test configuration and one initial smoke test.

- [ ] Add Next.js/TypeScript/Tailwind/Vitest configuration and scripts.
- [ ] Write the failing root-layout smoke test; run it and observe the missing-module failure.
- [ ] Implement minimal layout and styles; run the test green.

### Task 2: Typed content and safe commerce primitives

**Files:** `src/content/*`, `src/lib/cart.ts`, `src/lib/i18n.ts`, tests under `src/lib/*.test.ts`.

**Interfaces:** Produces `addCartItem`, `changeCartLicense`, `safeLocale`, catalog/license types consumed by UI.

- [ ] Write failing tests for license pricing, invalid product rejection and malformed locale fallback.
- [ ] Implement the pure data/model functions and run the focused tests green.

### Task 3: Public bilingual producer experience

**Files:** public route pages, shared navigation/footer, homepage sections, beat store/player, locale/cart providers and responsive styles.

**Interfaces:** Consumes typed content and commerce primitives from Task 2.

- [ ] Write failing component tests for the EN/RU switch and cart total behavior.
- [ ] Implement public routes for home, beats, services, releases, collaborations, about, contact and cart; run tests green.

### Task 4: Lead, checkout, account and admin safety boundaries

**Files:** checkout/contact forms, route handlers, auth/admin guards and their tests.

**Interfaces:** Consumes cart data; returns typed `manual_review` state when a payment provider is not configured.

- [ ] Write failing tests for checkout safe-mode and admin fail-closed behavior.
- [ ] Implement validated request routes and protected shells; run tests green.

### Task 5: Supabase, SEO and operations

**Files:** SQL migration, `.env.example`, sitemap/robots/manifest, README and test coverage.

- [ ] Add a schema migration for profiles, catalog, orders, entitlements, leads, role/RLS policies and private storage policy.
- [ ] Add metadata routes and operational documentation; run lint, test and production build.
