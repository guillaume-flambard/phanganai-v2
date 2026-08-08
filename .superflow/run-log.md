# Run log — phanganai-v2 (superflow T2 report, 2026-08-08)

| check | result |
|---|---|
| stack | node — Next.js 16 static-export app, Capacitor wrapper, Supabase, "Neon Jungle" design |
| gates | typecheck:ok (tsc clean) · tests:n/a (aucun framework configuré — CLAUDE.md) · lint:ok (0 err, 14 warnings) · audit:9 vulns (8 high, 1 critical) |
| web | boot:ok (dev :3001 — :3000 déjà pris par le portfolio) · routes:7/7 real routes 200 (/events /wallet /profile /notifications /checkout /referral + /) · console errors:4 (root) · a11y:2 types (link-name/serious, meta-viewport/moderate) |
| verdict | red |
| findings P1/P2/P3 | P1 · backend Supabase local hors ligne → `ERR_CONNECTION_REFUSED` sur `http://127.0.0.1:54321/rest/v1/events` (8 requêtes échouées au root) : l'app rend vide sans `supabase start`. P1 · `npm audit --omit=dev` = 9 vulns (8 high dont `ws` 8.0.0–8.20.1 GHSA-58qx/96hv, 1 critical) → au-dessus du seuil 0-high. P2 · a11y `link-name`/serious sur `.relative[href$="profile"]` (lien icône sans accessible name). P2 · a11y `meta-viewport`/moderate manquant/incorrect. P3 · lint : 14 warnings `@next/next/no-img-element` (8 fichiers, LCP). P3 · walk.js par défaut couvre `/book*` inexistants → 404 (routes réelles testées manuellement, toutes 200). |

Evidence: gates 2026-08-08 10:59, walk+axe 11:02, screens in `.superflow/screens/`. No fixes, no commits.

---

## Remediation run — dependency sweep (2026-08-08 ~11:30)

| check | result |
|---|---|
| root cause (npm) | `package-lock.json` had 7 `@next/swc-*` entries with empty `version` → npm arborist `Invalid Version` crash on any `npm install`/`audit fix`. node_modules had been built by bun (no `.package-lock.json`). |
| fix path | regenerated `package-lock.json` from scratch (`rm package-lock.json && npm install`), then `npm audit fix` (15→6) then `npm audit fix --force` (6→3). |
| audit before | 15 vulns (1 critical `tar`, 12 high incl. `ws`, `next`/`postcss`/`sharp` chain, 1 moderate, 1 low) |
| audit after | 3 moderate — all via `@capacitor/cli@8.5.0` (latest stable) → `xcode@3.0.1`, `uuid@7.0.3`. Only fix = nightly cli `8.5.1-nightly-*`; not applied (build-time mobile CLI tooling, not runtime). |
| package.json | `next` `16.1.6` → `^16.3.0` (clears `next`/`postcss`/`sharp` highs; postcss 8.5.23, sharp ^0.35.3 in lock) |
| lockfiles | `package-lock.json` regenerated (was corrupt), `bun.lock` reconciled via `bun install --lockfile-only` (523 pkgs, next@16.3.0) |
| gates | `npx tsc --noEmit` exit 0 · `npm run build` exit 0 (17 static routes) · `npm run lint` 0 errors / 14 warnings (pre-existing `@next/next/no-img-element`) |
| committed | yes — single commit, pushed |

### Supabase local (P1 runtime)
- `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321` → dead local instance (no docker containers running, `supabase/config.toml` absent, only `supabase/{functions,migrations,snippets}` + `.branches/` present).
- App renders empty because every query to `/rest/v1/*` gets `ERR_CONNECTION_REFUSED`.
- Not a build failure: `npm run build` passes clean without the DB (all routes static/prerendered).
- To restore runtime: start local Supabase — `npx supabase start` (creates `config.toml`; long-running infra, intentionally NOT spun up here). Or point `.env.local` at a hosted Supabase project (needs URL + anon key swap).
