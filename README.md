# Gallery2 — Bootstrap 5 Gallery Website

A responsive, single-page gallery prototype built with Bootstrap 5, vanilla JavaScript, and a small amount of jQuery. The project showcases modern UI patterns (neumorphism, glass effects), a masonry-style gallery with modal viewer, flip-card feature tiles, a testimonial carousel, and a light/dark theme toggle.

This README documents the project's structure, how to run and test features locally, accessibility considerations, and suggested next steps.

## Quick start

1. Open `index.html` in your browser for a local file preview. For best results run a small static server (recommended):

   # from the project root (Windows PowerShell)

   python -m http.server 8000

   Then visit http://localhost:8000 in your browser.

2. The site is intentionally static and self-contained — no build step is required.

## Main features

- Responsive layout using Bootstrap 5
- Masonry gallery with modal viewer (spinner + keyboard navigation)
- Flip-card feature tiles (hover on desktop, tap/keyboard toggle on mobile) with accessibility improvements
- Testimonial carousel with previous/next controls and auto-rotation
- Light / Dark theme toggle — persistent preference stored in localStorage (`hm_theme`)
- Legal pages: `legal/privacy.html`, `legal/terms.html`, `legal/cookies.html`

## File map (important files)

- `index.html` — main page and markup for all sections
- `css/styles.css` — primary styling and component rules
- `css/style_darkmode.css` — dark-mode overrides (applies when `html.dark-theme` is present)
- `js/dark_mode.js` — accessible dark-mode toggle (persists `hm_theme` in localStorage)
- `js/masonry-modal.js` — gallery modal logic (jQuery) with spinner and keyboard handlers
- `js/flipcards.js` — flip-card interaction (creates inner wrapper if missing, toggles `.is-flipped` on click/keyboard)
- `js/dark_mode.js` — toggles `html.dark-theme` and swaps Bootstrap Icons
- `legal/` — privacy, terms and cookie policy pages

## How to test key features

- Gallery modal:

  - Open the Gallery section and click any image.
  - A modal opens with a spinner; images load and can be navigated with Prev/Next buttons or left/right arrows.

- Flip-cards (Technology section):

  - Hover on desktop to flip, or tap the circular flip button on mobile.
  - You can also focus a card and press Enter/Space to toggle it.

- Carousel (Service section):

  - The testimonial carousel auto-rotates every 3 seconds and can be controlled by the prev/next buttons.
  - If it fails to start, open DevTools Console and check for JS errors.

- Theme toggle:
  - Click the moon/sun icon in the navbar. The preference is saved to `localStorage.hm_theme`.

## Accessibility notes

- Flip-cards are keyboard-focusable (`tabindex=0`) and support Enter/Space toggling. The JS keeps `aria-hidden` in sync for front/back content.
- Contrast and dark-mode styles were tuned; test with system dark mode and using accessibility contrast tools.
- `prefers-reduced-motion` is respected for flip animations.

## Known issues & debugging tips

- If the carousel or other scripts don't run, check the browser console for errors and ensure `bootstrap.bundle.min.js` is loaded before the inline init script.
- If dark mode doesn't apply, confirm `html` has the `dark-theme` class or `localStorage.hm_theme` is set to `dark`.

## Suggested next steps

- Add a lightweight build step (npm + esbuild/rollup) to bundle and minify JS/CSS for production.
- Replace jQuery modal code with a vanilla JS implementation to remove the jQuery dependency.
- Add unit tests (Jest + jsdom) for critical JS functions (dark mode toggle, flip-card toggles).
- Improve SEO and meta tags on legal pages.

## License & credits

This project is a personal prototype. Replace placeholder images/content and add appropriate license notices if you publish.

---

If you want, I can add a short CONTRIBUTING.md, an ESLint config, or wire a small dev server task for convenience. Which would you like next?
