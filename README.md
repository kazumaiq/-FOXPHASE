# FOXPHASE — OFFICIAL PRODUCER DIGITAL EXPERIENCE

**Independent Sound. No Limits.**

Official international digital platform, Beat Store, Discography, Licensing Engine, and Studio Control Center for independent music producer **FOXPHASE** (ex. FOXMXNAXM, Omsk, Russia).

---

## 01. Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling & Visual Direction**: Tailwind CSS, Custom Chrome/Obsidian Design System (`#050505` Deep Black, `#101114` Graphite, `#85878D` Dark Silver, `#E8E8E8` Metallic White, `#FFFFFF` Pure White)
- **Typography**: Geometric & Display Sans (`Syne`, `Space Grotesk`, `JetBrains Mono`) — zero handwritten fonts
- **Motion & 60fps Interactive Engine**: `motion` (Framer Motion 12) spring-damped parallax, staggered kinetic text reveals, magnetic CTAs, and a custom 60fps HTML5 interactive frequency field (`InteractiveSonicCanvas`) with `prefers-reduced-motion` support
- **Database, Auth & Storage**: Supabase (`@supabase/supabase-js`, `@supabase/ssr`), PostgreSQL with full Row-Level Security (RLS) across 14 tables
- **Validation & Testing**: `zod`, `vitest`, `@testing-library/react`

---

## 02. Implemented Pages & Routes

- `/` — **Home**: Official 3D Chrome FOX emblem hero, kinetic typography, parallax emblem showcase, genre matrix (`Trap`, `Rage`, `Ambient`, `Phonk`, `House`, `Experimental`), featured instrumentals with interactive waveform triggers, approximate career milestones (`~1–2M` streams, `100,000+` listening plaque), official releases, services rate schedule, collaborations roster, and direct studio CTA.
- `/beats` — **Beat Store**: Full filterable catalog by genre, BPM, musical key, popularity, date, search query, and favorites. Persistent global bottom audio player with single active stream and honest studio preview state (no fake/stock audio substitution).
- `/beats/[slug]` — **Individual Beat Page**: Detailed beat telemetry, interactive license tier selector (`Basic`, `Premium`, `Unlimited`, `Exclusive`), and instant cart/checkout actions.
- `/licenses` — **Licenses**: Comprehensive breakdown of `BASIC`, `PREMIUM`, `UNLIMITED`, and `EXCLUSIVE` licenses with transparent editable legal notices requiring direct confirmation with FOXPHASE.
- `/services` — **Services & Price Schedule**: Official services (`Beat Production`, `Custom Beats`, `Mixing`, `Mastering`, `Exclusive Rights`) and exact verified pricing (`MP3 Beat: $15 / 1500 ₽`, `WAV Beat: $20 / 2000 ₽`, `Exclusive Rights: По договорённости`, `Custom Beat: По договорённости`, `Mixing: Уточняется`, `Mastering: Уточняется`).
- `/releases` — **Discography**: Official releases (`BLADE`, `DREAMS`, `Last Breath`, `Forgotten Memories`) linked to the verified Yandex Music artist profile (`https://music.yandex.com/artist/21691221`).
- `/collaborations` — **Portfolio**: Verified artist collaboration roster (`RONVXER`, `TendyOne`, `Balekajon`, `D4RKWAV3`, `mishix`, `ByBllessed`, `STAROX`, `Hxlkart`, `gostlxne`, `OXBRIDGE`, `Chelsy smile`) and modular case-study architecture.
- `/about` — **About Producer**: 5 years of production experience, Omsk origin, evolution from `FOXMXNAXM` to `FOXPHASE`, and strict anonymous identity manifesto.
- `/contact` — **Contact & Leads**: Verified social channels (`Telegram`, `Instagram`, `TikTok`, `YouTube`, `Yandex Music`) and server-validated studio inquiry form (`/api/leads`).
- `/cart` & `/checkout` — **E-Commerce & Safe Manual Review**: Persistent cart, license switching, server-verified pricing (`/api/checkout`), and HMAC-verified payment webhook receiver (`/api/webhooks/payment`). Never confirms fake payments on client return URLs.
- `/account` — **Customer Account**: Supabase Auth integration point, saved favorites, order history, and signed download entitlements.
- `/admin` — **Protected Admin Panel**: Dashboard, Beat Management, Release Management, Orders & Delivery, Services, Content/SEO, and Studio Leads protected by server role validation (`public.is_admin()`).

---

## 03. Local Development Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Quality & Verification Scripts

```bash
npm test          # Run Vitest unit & component tests
npm run lint      # Run ESLint verification
npm run build     # Run production Next.js build & typecheck
```

---

## 04. Connecting Supabase

1. Create a new project in [Supabase](https://supabase.com).
2. Copy your project URL and anon public key into `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Server-only)
3. Open the Supabase SQL Editor (or run `supabase db push`) and execute:
   `supabase/migrations/20261107100000_foxphase_core.sql`
4. Create a **private** Storage bucket named `originals` for master WAV and stem archives, and a **public** bucket named `public-media` for cover art and tagged MP3 previews.
5. Sign up your owner user via Supabase Auth and elevate its role in `public.profiles`:
   ```sql
   update public.profiles set role = 'admin' where id = '<YOUR_AUTH_USER_UUID>';
   ```

---

## 05. Deploying to Vercel

1. Push the repository to GitHub (`https://github.com/kazumaiq/-FOXPHASE`).
2. Import the repository into [Vercel](https://vercel.com/new).
3. Add all environment variables from `.env.example` in **Vercel Project Settings → Environment Variables**.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.
