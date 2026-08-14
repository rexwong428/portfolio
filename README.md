# rexwong428.github.io/portfolio

Personal portfolio site — Rex Wong, Data Analyst.

**Live:** https://rexwong428.github.io/portfolio/

Static HTML/CSS with one small JS file. No build step, no framework, no
third-party requests — fonts and images are served from this repo.

## Structure

```
index.html                        hero · about · skills · featured projects
projects/electric-vehicles.html   Tableau
projects/bank-loan-report.html    Power BI + SQL
projects/coffee-sales.html        Excel
assets/css/site.css               all styles, both themes
assets/js/theme.js                theme toggle only
assets/fonts/                     Montserrat (variable) + Source Sans Pro, self-hosted
assets/img/                       background, headshot, project images
```

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
