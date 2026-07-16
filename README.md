# Home Remedies Property Management — Website

A modern, fast, fully static redesign of [homeremediespm.com](https://www.homeremediespm.com) for **Home Remedies Property Management and Real Estate Services** — a family-owned company serving Arvada, Westminster, and the greater Denver metro since 2019.

> *Where Excellence Meets Management.*

## What's inside

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | Hero, services, story, pricing preview, testimonials, blog |
| Property Management | `management.html` | Full service breakdown + process |
| Buy & Sell | `buy-sell.html` | Real estate services for buyers & sellers |
| Pricing | `pricing.html` | Transparent, detailed pricing tiers |
| About | `about.html` | Company story + owner bios |
| Testimonials | `testimonials.html` | All client reviews |
| Blog | `blog.html` | Articles for owners & investors |
| Contact | `contact.html` | Contact form, details, and map |

## Tech

- **100% static** — plain HTML, CSS, and vanilla JS. No build step, no dependencies.
- **Design system** in `assets/css/styles.css` (deep forest green + warm gold + cream; Fraunces + Inter type).
- **SEO-ready** — semantic markup, meta/OpenGraph tags, `sitemap.xml`, `robots.txt`, and LocalBusiness JSON-LD schema.
- **Google Analytics 4** installed on every page (measurement ID `G-9JYD588DNB`).
- **Accessible & responsive** — mobile-first, keyboard-friendly nav, reduced-motion support.
- The contact form opens a pre-filled email (no backend required for static hosting).

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Hosted via **GitHub Pages** from the `main` branch. To point the real domain (`homeremediespm.com`) at it later, add a `CNAME` file and configure DNS.

## Contact

**Home Remedies Property Management and Real Estate Services**
3923 West 99th Pl., Westminster, CO 80031
(720) 722-0357 · homeremediespm@gmail.com · Mon–Fri 9:00 am – 5:00 pm

---

© 2024 Home Remedies Property Management and Real Estate Services.
