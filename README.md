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
public/images/hamper.jpg          hamper prize photo (showcase grid)
public/images/product-*.webp      individual product photos (showcase grid)
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

The "A Little Taste of What We Do" grid shows four real photos:
`public/images/hamper.jpg` (the prize hamper) plus three individual
product shots (`product-bearhugs.webp`, `product-fartsuppressants.webp`,
`product-yourock.webp`). To swap any of them out, replace the file at
the same path and filename, or update the `src` in `public/index.html`
if you're changing filenames too.

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
