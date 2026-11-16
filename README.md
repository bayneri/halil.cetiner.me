# halil.cetiner.me

Personal website and notes archive for me.

## Stack
- Jekyll 4
- Liquid templates
- Custom editorial theme with serif typography and neutral light/dark palettes
- `jekyll-paginate-v2` for notes pagination

## Local Development
```bash
bundle install
bundle exec jekyll serve
```

Default local URL: `http://127.0.0.1:4000`

## Site Structure
- `/index.md` home page and personal introduction
- `/about.md` legacy about URL; redirects to the home page
- `/notes/index.html` notes listing (paginated archive)
- `/_posts/notes/*.md` all notes
- `/_layouts/*` page and post layouts
- `/_includes/*` reusable snippets
- `/assets/css/site.css` site styles
- `/assets/js/site.js` homepage disclosures and color theme controls
- `/assets/images/*` images and favicons

## Note Types
Labels are derived in `/_includes/note_label.html` and shared by the archive, topic pages, and posts:
- `essay` for `category: blog`
- `poem` when tags include `poem`
- `story` when tags include `story`
- `scribble` as fallback

## Theme
- Newsreader for headings and reading text; DM Sans for the conversational homepage introduction, navigation, and metadata. System serif and sans-serif fallbacks work when web fonts are unavailable.
- White and graphite in light mode; neutral charcoal and grey in dark mode.
- The navbar theme toggle follows the system by default and persists a manual choice in `localStorage` when available.
- Soft blue badges mark expandable homepage phrases; ordinary links have straight underlines. An open badge has a subtle inset border, and all details expand within their paragraphs. Text fades in and out while the surrounding paragraphs and footer move smoothly. Transitions can be interrupted by another click and respect reduced-motion preferences. Details remain readable when JavaScript is disabled.
- Notes and topic archives share `/_includes/note_list.html` and `/_includes/pagination.html`.

## Identity
- Favicons live in `/assets/images/favicon/`
- Wired in `/_layouts/default.html`

## Build
```bash
bundle exec jekyll build
```

Output is generated into `/_site/` (ignored by git).

## Social Images
- Post OG/Twitter cards combine each hero artwork with its title and date.
- A text-based fallback card is generated for pages without hero artwork.
- Generate the cards manually:
```bash
npm install
npm run og:generate
```
- CI runs this automatically before `jekyll build` in `/.github/workflows/deploy.yml`.
