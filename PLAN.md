# Detailed build plan and reference audit

Date: 27 October 2026  
Reference: https://staging5.nl.maisondebrah.com/  
Target: English-language local draft for Ethiopia

## 1. Current-state assessment

The reference is a Dutch WordPress site using WooCommerce. The observed homepage has a large seasonal hero, paired furniture and lighting editorial panels, a featured product area, catalogue callout, showroom and design-consult calls to action, newsletter form, and a multi-column footer. The shop has search, nested furniture/lighting/decoration categories, product cards, prices and a cart. Its public Store API returned 268 products and 27 categories during this audit. The WordPress pages API listed 21 pages, including service, FAQ, delivery, returns, privacy, terms, account, cart, and checkout pages.

The earlier local `Maisondebrah website` and `Maisondebrah-et website` folders are independent React/Vite recreations of the public global site. They use a different content snapshot and were left unchanged. This new folder uses the staging reference as its source and shares its React/Vite/TypeScript approach.

## 2. Target scope

Build a separate English Ethiopia draft for review and publish a clearly labelled GitHub Pages preview at the user-specified repository. Preserve the Maison Debrah visual direction: spacious image-led layouts, Playfair Display headings, Inter body text, dark green accents, simple navigation, and responsive product imagery. Keep product and collection names. Hide Dutch euro prices and showroom details because they are not verified for Ethiopia.

The draft includes a homepage, catalogue, category pages, product pages, About, Projects, and Contact. It intentionally has no active form, newsletter submission, account, cart, or checkout. Those need approved business data, a secure destination, or express e-commerce approval.

## 3. Delivery stages

| Stage | Work | Status |
| --- | --- | --- |
| Audit | Inspect staging homepage, shop, public APIs and local projects | Done |
| Plan | Define structure, scope, files, local gaps and approvals | Done in this file |
| Build | Create separate Vite app, snapshot catalogue, implement responsive pages | Local draft done |
| Verify | Type-check, lint, production build, desktop/mobile browser flows | Done for draft; see README |
| Brand review | Submit sitemap, wireframes, design and staging build for written approval | Awaiting Maison Debrah |
| Operational work | Connect approved domain, CRM, legal text, analytics and maintenance | Awaiting approved inputs |
| Launch | Complete security, accessibility, performance, backup and acceptance checks | Not started |

## 4. Files and data

- `src/App.tsx`: layout, pages, navigation, catalogue search and product detail flow.
- `src/styles.css`: responsive visual system based on the reference direction.
- `src/data/categories.json`, `src/data/catalog.ts`: captured categories and English navigation labels.
- `public/data/products.json`: static snapshot of reference product names, descriptions, categories and image links. No Dutch prices are included.
- `public/images/`: logo and editorial images from the reference/public site for local review.
- `public/media/`: reused public product images, copied only when filenames matched staging product images.
- `index.html`: metadata and draft noindex setting.
- `package.json`, lockfile and TypeScript/Vite configuration: local build and checks.

There is no database, migration, CRM integration, or secret in this draft. The GitHub Actions workflow publishes a public review preview from `main`; it is not brand-controlled production hosting.

## 5. Risks and decisions

1. **Approval:** The supplied agreement requires written stage approvals. This draft is preparation for review, not evidence of approval.
2. **Content rights:** Public availability of images and product descriptions does not establish permission for official local publication. Brand approval is needed.
3. **Product accuracy:** The snapshot can drift. Ethiopia stock, price, lead time, dimensions and specifications need verification before publication. The reference API returned `N/A` for all formatted dimensions; those values are omitted from product pages.
4. **Remote images:** 159 gallery image entries still point to the Dutch staging host. These need approved local assets and reliable hosting before launch.
5. **Local operations:** A real enquiry/newsletter workflow needs a centrally approved CRM and consent wording. The local draft collects no visitor information.
6. **E-commerce:** Cart and checkout in the Dutch reference are outside this draft because local e-commerce requires express approval and verified payment, tax, delivery, returns and security processes.
7. **Deployment:** Brand-controlled domain/hosting, account recovery, restricted staging, backups and monitoring are not configured. The GitHub Pages preview is public and must not be treated as the official franchise launch.
8. **Legal and accessibility:** Ethiopia-specific legal pages and a full WCAG 2.2 AA audit remain required. Do not publish empty legal pages.

## 6. Next implementation after approvals

1. Replace draft wording and assets with approved English/local content.
2. Add verified Ethiopia contact details, customer service and legal pages.
3. Connect approved form and newsletter destinations through a secure server-side flow; add validation, abuse protection, delivery confirmation, and auditability.
4. Add approved analytics/cookie controls and monthly reporting.
5. Move source and hosting into Maison Debrah-controlled accounts, configure restricted staging and recovery access.
6. Complete end-to-end, accessibility, performance, security and backup-restore checks before the brand's written launch decision.
