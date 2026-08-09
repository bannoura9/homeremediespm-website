# Session Log — Home Remedies PM (Claude)

Running log of what's been done and decided, so future sessions don't re-derive
or re-ask. Newest entries on top. Repo: `bannoura9/homeremediespm-website`.

---

## 2026-08-09 — GitHub setup, full audit, GBP review, STR Management page

### Environment setup (this machine)
- Installed **Homebrew** (Intel path `/usr/local/bin/brew` — no prior brew existed).
- Installed **GitHub CLI (`gh`)** v2.97.0 via brew. Authenticated via device-code
  flow as **`nadirmaaiah-create`** (token scopes: `gist`, `read:org`, `repo`).
  `gh auth setup-git` was run so `git push` uses the same credentials.
- Installed **Node.js** (v26.7.0) via brew — needed for `./build.sh`
  (`npx esbuild`, minifies `assets/css/styles.src.css` → `styles.css` and
  `assets/js/main.src.js` → `main.js`). Wasn't installed before; build.sh would
  have failed silently without it.
- Nadir said: **"you have full control"** — authorized to make repo changes for
  site updates going forward without re-confirming basic edit/push actions each
  time. Still asking first for anything destructive/irreversible, financial, or
  where facts need confirming (see founding-date decision below).

### Full site + GBP audit (findings — see chat for full detail, condensed here)
- **Website**: 78 sitemap pages, 0 broken internal links (5,075 checked), 144
  valid JSON-LD blocks, GA4 installed, HTTPS/fast, minified CSS/JS. Weak spots:
  no HSTS/real 301s (GitHub Pages limitation — needs Cloudflare in front),
  domain DNS still registered at Wix (risk if that plan is ever cancelled
  without moving nameservers first).
- **Google Business Profile** (browser is signed into the managing account):
  address/phone **3923 W 99th Pl, Westminster · (303) 515-1352** — correct,
  matches site. **5.0★, 14 reviews.** Profile interactions jumped from ~0/mo
  (Mar–Jun) to ~24 in July after the SEO push. Gaps found:
  - Photos not updated in 901 days (~2.5 yrs) — biggest easy lever, **needs
    Nadir to supply photo files**, Claude won't upload without them + go-ahead.
  - Google Ads campaign "North Denver Property Management Leads" **paused** —
    billing overdue + advertiser verification incomplete. Financial/account
    action — Nadir has to fix this himself.
  - No social profiles linked on GBP (Facebook/Instagram/LinkedIn) — **needs
    URLs from Nadir**, not yet provided.
  - Business description on GBP is generic, no keywords — **Nadir said leave
    it as-is for now**, don't touch.
  - Real backlink/citation gap confirmed still open: GSC shows ~1 external
    link to the whole domain (a scraper). This remains the #1 lever per
    `CITATIONS.md`, not yet executed (needs Nadir/Mike to create + verify
    listings personally).

### DECISION: founding year is 2024, not 2019 — 2019 not to be mentioned
GBP showed "Opening date: January 1, 2024" while the site/`llms.txt`/SEO docs
all said "Founded 2019" — a real inconsistency. Nadir clarified: **2024 is
when Home Remedies started; 2019 is when he personally managed properties for
himself**, and he does not want that distinction surfaced to future clients.

**Decision taken: 2024 only, everywhere, no mention of 2019 at all.** Fixed in:
`index.html` (meta description, og:description, `foundingDate` schema, hero
eyebrow, "2019" trust badge, "Since 2019" stat, "experience going back to
2019" CTA line — reworded), `about.html` (meta description, og:description,
eyebrow, "experience going back to 2019" line — reworded), `llms.txt`
(intro line + `Founded:` field), `README.md`, `SEO-ACTION-LIST.md` (NAP block
+ both description templates). Left untouched: a mention of "2019 and 2026"
in `blog-colorado-landlord-tenant-law.html` — that's a legislative-history
reference, unrelated to founding date.
**GBP's own "Opening date" field (2024) was already correct — not edited.**

### Reviews work (see `REVIEWS-ACTION.md` in repo for full detail)
- Confirmed no `Review`/`AggregateRating` schema existed anywhere on-site.
  **Decision: did not add it** — Google's structured-data policy treats a
  business's own on-site review markup as self-serving and won't grant the
  star-rating rich result for it. The real 5.0★/14-review stars in Search/Maps
  already come from the GBP itself, which is the only channel that earns that.
- `llms.txt`: added a **Reputation** section with real review excerpts (for AI
  answer engines like ChatGPT/Perplexity).
- `testimonials.html`: retargeted title/meta/H1 at real local keywords
  (Westminster, Arvada, Denver metro property management reviews — previously
  fully generic), added `FAQPage` schema (rating, landlord/tenant coverage,
  buyer/seller coverage — all factual). **Did not alter any review text.**
- `REVIEWS-ACTION.md` (new file): draft owner-reply text for the 11 reviews
  visible on-site (3 more exist on GBP only, not mirrored on-site — their text
  wasn't available to draft against) + a cross-post outreach template asking
  happy reviewers to also post on Yelp/BBB/Nextdoor once those listings exist.
  **Not yet sent/posted anywhere — drafts only, awaiting Nadir's action.**

### New: STR (short-term rental) Management page + sitewide nav rollout
Nadir asked for a new "STR Management" nav tab (next to "Management") for
Airbnb/VRBO/Booking.com management at a **20% flat fee, "we take care of the
rest."** Researched actual Denver-metro STR management competitors first
(WebSearch — see sources below) to ground pricing/features in reality:
- Industry full-service rates run **15–30%**, most commonly **20–30%**; 20%
  flat lands at the competitive low end with no separate cleaning markup.
- Common feature set across competitors: multi-platform listing (Airbnb,
  VRBO, Booking.com/Expedia), dynamic/revenue-optimized pricing, professional
  photography, 24/7 guest communication/concierge, cleaning/turnover
  coordination, maintenance oversight, owner reporting.
- Sources: [BNBCalc Denver PMC roundup](https://www.bnbcalc.com/blog/property-management/pmc-denver-colorado), [SkyRun Denver](https://skyrun.com/denver/management/), [Effortless Rental Group](https://effortlessrentalgroup.com/), [ElevateSTR](https://elevatestr.com/services/short-term-rental-managment-denver/), [Kenna Real Estate STR roundup](https://www.kennarealestate.com/blog/short-term-rental-property-management-colorado-2025/).

**Built `str-management.html`** — full page matching the site's existing
design system and template pattern (same as `free-rental-analysis.html`):
hero, "what's included" feature grid, pricing/comparison section, 4-step
process, prose article, `Service` + `FAQPage` JSON-LD schema, standard footer.

**Important legal guardrail baked into the copy**: the site's own
`blog-boulder-short-term-rental-rules.html` already documents that Denver and
Boulder restrict STR licenses to an operator's *primary residence*, excluding
pure investment properties. The new page is written to be honest about this —
"we check eligibility for your exact address" rather than implying STR is
available everywhere — and cross-links the existing legal article instead of
contradicting it.

**Nav/footer rollout**: added `STR Management` to the primary nav (after
"Management") and mobile menu across all 78 applicable pages via script, plus
the footer "Services" column. Deliberately skipped `404.html` and
`propertymanagement.html` (legacy redirect stub) — both intentionally lack
standard nav. Added `str-management.html` to `sitemap.xml` and `llms.txt`
Services list.

**Verification after all changes**: 0 broken internal links (5,075 checked),
144/144 valid JSON-LD blocks. Nav visually checked in Chrome at 1363px and
1120px widths — fits cleanly with room to spare, no cramming before the
1024px hamburger breakpoint.

### Status as of end of session
- **Nothing has been pushed to GitHub yet.** All changes (founding-date fixes,
  reviews/SEO work, new STR page + nav rollout) are committed or pending
  locally in the working copy at:
  `/private/tmp/claude-501/.../scratchpad/homeremediespm-website`
  (Note: this is a scratch clone — ephemeral. The canonical repo is
  `github.com/bannoura9/homeremediespm-website`.)
- A **local preview server is running**: `python3 -m http.server 8765` in the
  repo dir (background, log at `/tmp/homeremediespm-local-server.log`). Nadir
  asked to review on localhost before anything publishes — pending his
  review/go-ahead to commit + push.
- Earlier commit already pushed this session (before the STR/founding-date
  work): `60a09da` — testimonials SEO retarget + llms.txt reputation section
  + REVIEWS-ACTION.md.

### Open items waiting on Nadir (not yet done, don't re-ask redundantly — just follow up)
1. Review + approve the STR Management page and founding-date fixes on
   localhost:8765, then say go-ahead to push.
2. Supply GBP storefront photo(s) to upload (901 days stale).
3. Confirm/provide social profile URLs (Facebook/Instagram/LinkedIn) to add to GBP.
4. Fix Google Ads billing/verification himself (Claude can't touch billing).
5. Decide when to act on `REVIEWS-ACTION.md` (GBP replies + Yelp/BBB/Nextdoor ask).
6. Execute Tier-1 citation listings from `CITATIONS.md` (needs his phone/email to verify).
7. Eventually move DNS off Wix to Cloudflare (unlocks real 301s + HSTS).
