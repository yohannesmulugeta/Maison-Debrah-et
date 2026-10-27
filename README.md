# Maison Debrah Ethiopia — local staging-reference draft

A separate English-language React/Vite draft based on the public structure and visual direction of [Maison Debrah's Dutch staging site](https://staging5.nl.maisondebrah.com/). This project is a draft for review. The GitHub Pages preview is public, but it is not an approved franchise launch.

## Public draft preview

[View the Ethiopia draft](https://yohannesmulugeta.github.io/Maison-Debrah-et/) after the Pages workflow finishes. The URL is a GitHub Pages preview, not a Maison Debrah-controlled domain.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. Available routes include `/`, `/shop`, `/collection/<category>`, `/product/<product>`, `/about`, `/projects`, and `/contact`.

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run build
```

## What is implemented

- Responsive English homepage adapted from the Dutch reference's campaign, collection, product, brand, and newsletter structure.
- Searchable, categorized, paginated catalogue with 268 product records and 27 categories captured from the staging site's public WooCommerce Store API on 27 October 2026.
- Product detail pages with the reference site's names, images, SKU, available descriptions, and published attributes. Product and collection names are unchanged.
- Local images for 693 product gallery entries, reused by filename from the user's earlier public Maison Debrah recreation. The remaining 159 entries still use the staging host and may be unavailable when that site is down.
- Clear loading, empty, and error states. The local draft does not accept orders, enquiries, or newsletter submissions.

## Before this could launch

Maison Debrah must confirm the Ethiopia sitemap, wireframes, visual design, functions, staging build, and launch in writing under the supplied website agreement. The franchisee or brand also needs to provide:

- Approved Ethiopia business name, contact information, location, hours, languages, product availability, prices, delivery and returns rules, and local legal pages.
- Approved imagery and rights for all local use, plus final English brand copy and product specifications.
- Approved domain, hosting, source repository ownership, administrator and recovery access.
- Approved CRM or secure lead workflow, newsletter system, privacy notices, cookie consent, analytics, backups, monitoring, maintenance, and incident process.
- Express permission before adding account, basket, or checkout functions.

`index.html` includes `noindex, nofollow` for this draft. Remove that only at an approved launch. GitHub Pages uses hash routes such as `/#/product/orvella` so page refreshes work without server rewrites.

See [PLAN.md](PLAN.md) for the reference audit, delivery stages, and risks.
