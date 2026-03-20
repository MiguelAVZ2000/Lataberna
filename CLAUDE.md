# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start development server (http://localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
npm run test       # Playwright E2E tests (requires dev server or starts it automatically)
npm run test:ui    # Playwright with interactive UI
```

To run a single test file:
```bash
npx playwright test tests/wiki.spec.ts
```

## Environment Variables

Copy `.env.example` to `.env.local`. Required variables:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase admin key |
| `MERCADOPAGO_ACCESS_TOKEN` | Payment processing |
| `ENCRYPTION_MASTER_KEY` | 64-char hex key for encryption (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Rate limiting (production only; dev uses in-memory) |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |

## Architecture

**La Taberna** is a Next.js 15 app (App Router) for D&D 5e players. It has three main features: Wiki, Character Builder, and Store (Tienda).

### Supabase clients — two separate ones

- **Client-side**: `lib/supabase.ts` — singleton `createBrowserClient`, used in React components and hooks. Includes a 1.5s safety timeout if Supabase is unreachable.
- **Server-side**: `lib/supabase/server.ts` — `createClient()` async factory, used in Server Components and API routes. Handles session cookies via `next/headers`.

Never import the browser client in Server Components; use `lib/supabase/server.ts` there.

### Auth

`AuthProvider` (wraps the entire app in `app/layout.tsx`) exposes `useAuth()` which returns `{ user, loading, signOut }`. All authenticated operations in hooks and client components go through `useAuth()` — do not call `supabase.auth.getUser()` directly in components.

### Global context providers (app/layout.tsx)

```
AuthProvider
  └── CartProvider
        └── {children}
              └── CartSidebar (always rendered, toggled via CartContext)
```

### Character Builder

A multi-step wizard at `/personaje` using:
- `CharacterContext` (`components/character/character-context.tsx`) for all wizard state
- `useCharacters` hook (`hooks/use-characters.ts`) for Supabase CRUD against the `personajes` table
- Steps are dynamically composed in `character-wizard.tsx` — the "Hechizos" (Spells) step is conditionally included only for caster classes
- `lib/pdf-service.ts` generates a downloadable PDF character sheet

### Wiki

Static data pages at `/wiki/{razas,clases,trasfondos,conceptos}`. Data lives in `lib/character-data.ts` and `lib/spells-data.ts`. The wiki layout (`app/wiki/layout.tsx`) wraps all wiki pages with `WikiSidebar`.

### Store (Tienda)

Products are fetched from Supabase (`productos` table). Cart state is managed by `CartContext` and persisted to `localStorage` under the key `lataberna-cart`. Checkout uses MercadoPago.

### Security layers

- **Input sanitization**: `lib/security.ts` — `sanitizeString` uses DOMPurify client-side, regex server-side. Use these on all user input.
- **Rate limiting**: `lib/rate-limit.ts` — call `checkRateLimit(key, 'LOGIN' | 'REGISTER' | ...)` in API routes. Uses Upstash Redis in production, in-memory Map in dev. Preset configs for LOGIN, REGISTER, API, CHARACTER_CREATION, PDF_GENERATION, CHECKOUT.
- **Security headers**: configured globally in `next.config.mjs` (CSP, HSTS, X-Frame-Options, etc.).

### Path alias

All imports use `@/` for the project root (configured in `tsconfig.json`).

### UI components

`components/ui/` contains shadcn/ui primitives (Radix UI + Tailwind). Do not edit these directly — treat them as library code. Feature components live in `components/{auth,character,tienda,perfil,wiki,guides}/`.

### Styling

Tailwind CSS v4 (alpha). Global styles in `app/globals.css`. Fonts: Roboto (body) and Roboto Condensed (headings) via `--font-roboto` and `--font-roboto-condensed` CSS variables.
