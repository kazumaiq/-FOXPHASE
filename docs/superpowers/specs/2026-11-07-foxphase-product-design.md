# FOXPHASE Product Design

## Intent

Build FOXPHASE as an English-first, bilingual independent producer platform: an immersive public identity and beat discovery experience with a safe, extensible commerce, account and administration foundation. The present release must never imply real sales, releases, licenses, or payments that cannot be substantiated.

## Goals

- Provide a responsive EN/RU music-producer site with an expressive dark art direction, accessible navigation, a functional beat catalogue, audio-preview controls, license-aware cart, and contact lead capture.
- Provide an order-request checkout state until a real payment provider verifies a signed webhook.
- Define Supabase-compatible database, RLS and private delivery architecture; protect admin routes server-side and never allow public admin registration.
- Keep all displayed copy, sample beats and artworks explicitly demonstrative/replaceable rather than claimed FOXPHASE releases.

## Non-goals

- A live payment integration, file delivery, or production Supabase instance without owner-provided credentials.
- Invented artist collaborations, testimonials, release metadata, sales, analytics, streaming counts or audio recordings.
- Public administrator signup.

## Decisions

- Next.js App Router, TypeScript, Tailwind CSS, Motion, Lucide, Vitest and React Testing Library.
- Browser-local cart, locale and favorites persist behind small testable libraries. Server mutations are route handlers with validation and a safe unavailable/manual-review response until Supabase keys are configured.
- Content is typed data and locale dictionaries, separate from components. Abstract CSS-generated cover art is used instead of fabricated assets.
- Supabase migrations are an operational foundation; runtime adapters fail closed when credentials are absent.

## Constraints

- English defaults; locale choice persists and preserves the logical route.
- Honor reduced-motion preferences.
- No secrets in code or Git; include only `.env.example`.
- Original files are private Storage objects; grants yield short-lived, authenticated download URLs only after a confirmed order.
