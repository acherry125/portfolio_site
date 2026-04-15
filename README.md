# portfolio

Alexander Cherry's personal portfolio — a Yarn workspaces monorepo containing
the Astro web app and its Pulumi infrastructure.

## Workspaces

| Path | Package | Description |
| --- | --- | --- |
| [projects/web](projects/web) | `@portfolio/web` | Astro 6 + React + TypeScript site |
| [projects/infra](projects/infra) | `@portfolio/infra` | Pulumi IaC for AWS deployment |

## Getting started

```bash
nvm use          # respects .nvmrc (Node 22, required by Astro 6)
yarn install     # Yarn 4 via Corepack — see "packageManager" in package.json
yarn web:dev     # start the Astro dev server at http://localhost:4321
```

## Root scripts

| Command | Description |
| --- | --- |
| `yarn web:dev` | Dev server for the web workspace |
| `yarn web:build` | Production build of the web workspace |
| `yarn web:deploy` | Deploy the built site (`scripts/deploy-web.sh`) |
| `yarn infra:preview` | `pulumi preview` via `scripts/infra.sh` |
| `yarn infra:deploy` | `pulumi up` via `scripts/infra.sh` |
| `yarn lint` / `yarn lint:fix` | Run ESLint |
| `yarn format` / `yarn format:check` | Run Prettier |

Workspace-specific scripts can also be invoked directly, e.g.
`yarn workspace @portfolio/web build`.

## Repository layout

```
projects/
  web/      Astro site — pages, components, layouts, legacy static projects
  infra/    Pulumi stack (index.ts, Pulumi.*.yaml)
scripts/
  deploy-web.sh   Build + upload the web workspace
  infra.sh        Wrapper around pulumi preview / up
```

Design tokens (colors, fonts, easing) live in `:root` inside the web workspace's
`src/layouts/Layout.astro`. Component styles are co-located as `<style>` tags
within each `.tsx` component.

## Tooling notes

- **Package manager:** Yarn 4, pinned via the `packageManager` field in
  `package.json`. Corepack will fetch the correct version automatically — do
  not use `npm install` (there is no `package-lock.json`).
- **Node:** pinned via `.nvmrc`.
- **Linting/formatting:** ESLint + Prettier, configured at the repo root and
  per-workspace where needed.

## License

See [LICENSE](LICENSE).
