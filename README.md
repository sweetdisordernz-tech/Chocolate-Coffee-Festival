# Sweet Disorder — Choc + Coffee Festival Landing Page

A standalone, static competition landing page for people who scan the QR
code at the Sweet Disorder stand at the Chocolate & Coffee Festival. It's
built to look and feel like part of [sweetdisorder.co.nz](https://sweetdisorder.co.nz/)
itself — same fonts, colours, sharp corners, and full site navigation (every
nav link goes straight to the real live site).

No database, no auth, no backend — plain HTML/CSS/JS, deployed as a static
site on Vercel. The only "backend" is a Klaviyo embedded form for the
competition entry.

## Project structure

Everything that gets served lives inside `public/` — that's the site root:

```
public/index.html                the whole page
public/css/styles.css             styling (brand tokens live at the top as CSS variables)
public/js/main.js                  mobile menu + dropdown behaviour + scroll effects
public/sweet-disorder-logo.png    header logo (see below)
public/images/product-1.jpg …     product showcase photos (see below)
```

(Vercel's zero-config static deploy uses `public/` as the output directory
by default when one exists — putting the site there avoids needing any
extra Vercel project configuration.)

## Finishing setup

### 1. Klaviyo company ID

Open `public/index.html`, find this line in `<head>`:

```html
<script async type="text/javascript" src="https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=KLAVIYO_COMPANY_ID_PLACEHOLDER"></script>
```

Replace `KLAVIYO_COMPANY_ID_PLACEHOLDER` with your real public company ID.
That's the only change needed — the form itself (`<div class="klaviyo-form-X7wWZm">`)
is already embedded and centred on the page.

### 2. Real logo

Save the logo file as `public/sweet-disorder-logo.png`. The header already
points at that path (`public/index.html`, inside `.header-logo`) — it'll
appear automatically, no code change needed. Until the file exists, a text
wordmark fallback is shown instead.

### 3. Product photos

Save photos as `public/images/product-1.jpg` through `product-6.jpg`
(square images, ~1200×1200px work best). Each of the six grid slots in the
"A Little Taste of What We Do" section already points at those exact
filenames — they'll appear automatically once saved, no layout changes
needed. Placeholder frames show until then.

## Local preview

No build step — just serve the `public` folder statically, e.g.:

```bash
npx serve public
```

or open `public/index.html` directly in a browser.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel, "Add New… → Project", import the repo.
3. Framework preset: **Other**. Leave Build Command and Output Directory
   on their defaults — Vercel will automatically serve `public/` as the
   site root, no override needed.
4. Deploy.

Every nav link, the "Shop Now" header button, and the "Shop All Gifts"
button all point directly at `sweetdisorder.co.nz` — this project never
hosts those pages itself.
