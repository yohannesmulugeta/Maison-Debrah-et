# Maison Debrah Ethiopia — staging-reference React preview

A separate English-language React/Vite preview of [Maison Debrah's Dutch staging site](https://staging5.nl.maisondebrah.com/). The header, homepage sections, reference imagery, catalogue navigation and footer now follow the staging reference closely. The GitHub Pages preview is public, but it is not an approved franchise launch.

## Public draft preview

[View the Ethiopia draft](https://yohannesmulugeta.github.io/Maison-Debrah-et/) after the Pages workflow finishes. The URL is a GitHub Pages preview, not a Maison Debrah-controlled domain.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite. Available routes include `/`, `/shop`, `/collection/<category>`, `/product/<product>`, `/cart`, `/checkout`, `/account`, `/about`, `/projects`, `/contact`, and the customer-service, brochure-request and design-consultation pages.

## Checks

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run validate:content
npm.cmd run build
```

## Edit content with Pages CMS

This repository is configured for [Pages CMS](https://pagescms.org/). After the `.pages.yml` configuration is on GitHub `main`, sign in at [app.pagescms.org](https://app.pagescms.org/) with GitHub, install the Pages CMS GitHub App for this repository, and select the `main` branch. The editor provides **Products** and **Homepage and contact**. Saving a change commits the JSON file to GitHub; the existing Pages workflow then validates, builds, and deploys the site. Check the workflow result before treating an edit as published.

- Products are kept in `public/data/products.json` as one list. Give new products a unique numeric ID and slug; keep existing IDs and slugs to preserve page links. Category IDs must match `src/data/categories.json`.
- Upload new product photos in the CMS Media area (`public/media`). Copy the resulting `/media/...` path into both image URL and thumbnail URL; existing local and external image URLs remain unchanged.
- Homepage copy and Ethiopia contact details live in `src/data/site.json`. The CMS does not edit layout, other page copy, or `index.html` metadata.
- Because all products share one JSON file, simultaneous product edits can conflict. Coordinate edits and review Git history if a save needs to be reverted.

## What is implemented

- Responsive English homepage using the reference's hero, paired collection panels, eight featured products, catalogue banner, five chair cards, showroom/consultation panels, newsletter panel and five-column footer.
- Reference-style desktop header with category dropdowns, product search, brochure, account and cart links; mobile menu; floating cart and language links.
- Searchable, categorized, paginated catalogue with the same 268 product records and 27 categories as the staging site. Desktop cards follow the staging shop order and show its published euro prices where available.
- Product detail pages with the reference site's names, images, available summary text, euro price where published, category and related products. Product and collection names are unchanged. A browser-stored cart supports add, quantity, remove and persistence across refreshes.
- Local images for 693 product gallery entries, reused by filename from the user's earlier public Maison Debrah recreation. The remaining 159 entries still use the staging host and may be unavailable when that site is down.
- Clear loading, empty and error states. Forms, account access, checkout, payment and newsletter delivery are visible but not connected to a server; the preview does not submit orders or personal information.

## Remaining reference gaps

The desktop homepage, shop and a representative product page were compared directly with the staging site on 28 October 2026. The 268 product records retain existing images and now include the source shop order and published euro prices; products without a published price show a request message. These prices are reference data, not approved Ethiopia selling prices. Policy and service page copy has not been matched page by page. Account, checkout and forms remain preview-only. Mobile layout was not part of this desktop alignment pass.

## Before this could launch

Maison Debrah must confirm the Ethiopia sitemap, wireframes, visual design, functions, staging build, and launch in writing under the supplied website agreement. The franchisee or brand also needs to provide:

- Approved Ethiopia business name, contact information, location, hours, languages, product availability, prices, delivery and returns rules, and local legal pages.
- Approved imagery and rights for all local use, plus final English brand copy and product specifications.
- Approved domain, hosting, source repository ownership, administrator and recovery access.
- Approved CRM or secure lead workflow, newsletter system, privacy notices, cookie consent, analytics, backups, monitoring, maintenance, and incident process.
- Express permission before adding account, basket, or checkout functions.

`index.html` includes `noindex, nofollow` for this draft. Remove that only at an approved launch. GitHub Pages uses hash routes such as `/#/product/orvella` so page refreshes work without server rewrites.

See [PLAN.md](PLAN.md) for the reference audit, delivery stages, and risks.
