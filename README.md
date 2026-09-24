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
public/images/hamper.jpg          hamper prize photo (showcase hero banner)
public/images/product-*.{webp,jpg}  6 linked product photos (showcase grid)
```

(Vercel's zero-config static deploy uses `public/` as the output directory
by default when one exists — putting the site there avoids needing any
extra Vercel project configuration.)

## Finishing setup

### 1. Klaviyo company ID — done

The loader script in `public/index.html` `<head>` is already wired to
company ID `Tvjjzr`, and the form itself (`<div class="klaviyo-form-X7wWZm">`)
is embedded and centred on the page. If the form ID ever changes, update
both the div's class and, if needed, the company ID in that same script tag.

### 2. Real logo — done

`public/sweet-disorder-logo.png` is the real badge mark (background
made transparent so it sits cleanly on the cream header). The header
in `public/index.html` (`.header-logo`) already points at that path —
to swap the logo later, replace the file at the same path or filename.

### 3. Product photos — done

`public/images/hamper.jpg` is the hero banner above the heading. Below
it, six product photos each link out to their real product page on
sweetdisorder.co.nz (`target="_blank"`):

| File | Product |
| --- | --- |
| `product-fartsuppressants.webp` | Fart Suppressants |
| `product-card.jpg` | Emergency Card Stash (Christmas Edition) |
| `product-thymeout.jpg` | Thyme Out |
| `product-firstaid.jpg` | First Aid Survival Kit |
| `product-chillout-treatmint.jpg` | Chill Out Treatmint |
| `product-yourock.webp` | You Rock |

`product-card.jpg`, `product-thymeout.jpg`, `product-firstaid.jpg`,
and `product-chillout-treatmint.jpg` are cropped from the hamper
flat-lay (no dedicated studio photo existed for those four) — swap in
a proper product shot any time by replacing the file at the same path,
or update the `src`/`href` pair in `public/index.html` if the filename
changes too. `product-bearhugs.webp` is no longer used on the page but
is still in the repo if needed later.

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
