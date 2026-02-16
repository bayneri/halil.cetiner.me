# halil.cetiner.me

Personal website and notes archive for me.

## Stack
- Jekyll 4
- Liquid templates
- Custom CSS theme (zen mono)
- `jekyll-paginate-v2` for notes pagination

## Local Development
```bash
bundle install
bundle exec jekyll serve
```

Default local URL: `http://127.0.0.1:4000`

## Site Structure
- `/index.md` home page
- `/about.md` about page
- `/notes/index.html` notes listing (paginated archive)
- `/_posts/notes/*.md` all notes
- `/_layouts/*` page and post layouts
- `/_includes/*` reusable snippets
- `/assets/css/site.css` site styles
- `/assets/images/*` images and favicons

## Note Types
Labels are derived in `/_includes/note_label.html`:
- `essay` for `category: blog`
- `poem` when tags include `poem`
- `story` when tags include `story`
- `scribble` as fallback

## Theme
- Zen mono visual style
- Navbar includes a light/dark toggle:
- Follows system theme by default
- Persists manual choice in `localStorage`

## Identity
- Favicons live in `/assets/images/favicon/`
- Wired in `/_layouts/default.html`

## Build
```bash
bundle exec jekyll build
```

Output is generated into `/_site/` (ignored by git).

## Social Images
- OG/Twitter images are generated for every post into `/assets/images/og/`.
- Run manually:
```bash
npm install
npm run og:generate
```
- CI runs this automatically before `jekyll build` in `/.github/workflows/deploy.yml`.
