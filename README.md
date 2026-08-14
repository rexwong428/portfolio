# rexwong428.github.io/portfolio

Personal portfolio site — Rex Wong, Data Analyst.

**Live:** https://rexwong428.github.io/portfolio/

Static HTML/CSS with one small JS file. No build step, no framework, no
third-party requests — fonts and images are served from this repo.

## Structure

```
index.html                        hero · about · skills · featured projects
projects/eliterewards.html        SQL + Python + Power BI (current role)
projects/electric-vehicles.html   Tableau
projects/bank-loan-report.html    Power BI + SQL
projects/coffee-sales.html        Excel
assets/Resume_RexWong.pdf         what the View Resume button opens
assets/css/site.css               all styles, both themes
assets/js/theme.js                theme toggle only
assets/fonts/                     Montserrat (variable) + Source Sans Pro, self-hosted
assets/img/                       background, headshot, project images
```

## House style

Two rules the copy follows, worth keeping when you edit:

- **No em or en dashes.** Use a colon, a full stop, or rewrite the sentence.
  Date ranges take a plain hyphen (`2011-2023`). Hyphens inside compound
  words are fine.
- **Sizes are rem off a root that scales in points** (18pt / 13pt / 11pt at
  1680px and 980px), copied from the original Carrd build. Don't introduce
  pixel sizes; they will not scale with the rest of the page.

## Editing

Everything is plain HTML — open the file, change the words, commit. Pushing to
`main` republishes the site within a minute or two.

Design values (card colour, radius, blur, the teal accents) are carried over
from the original Carrd build and live as custom properties at the top of
`assets/css/site.css`. Changing `--mint` changes every accent on the site.

### Themes

Dark is the default; the toggle in the top-right switches to light and the
choice is remembered in `localStorage`. Visitors who never touch it follow
their OS setting. Both themes are defined as token blocks in `site.css` — no
component styles need to change to adjust either one.

### Adding a project

1. Copy `projects/coffee-sales.html` to a new file.
2. Replace the title, meta tags, canonical URL, image and body copy.
3. Add a card to the `.projects` list in `index.html`.

## Local preview

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/.
