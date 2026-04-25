# Technical Documentation — Assignment 4

## Overview

This is the final version of my personal portfolio website, built on top of
Assignment 3. It's still plain HTML, CSS, and JavaScript — no frameworks. This
version focuses on polish, professional quality, and deployment. The warm
pink/coral theme and all features from previous assignments are carried forward.

🌐 **Live URL:** https://somaiakha.github.io/202257000-SomaiaKhawaji-assignment4/

---

## Project Structure

* `index.html` → the main page with all sections (hero, about, skills, projects,
  github, contact, footer) plus the welcome popup and badge.
* `css/styles.css` → all styling including rules for the GitHub grid, repo
  cards, visitor timer badge, welcome popup, and welcome badge.
* `js/script.js` → all interactivity: GitHub API fetch, repo card builder,
  visitor timer, welcome/localStorage logic, plus everything from previous assignments.
* `assets/images/` → profile photo and project images.
* `docs/` → this technical doc + the AI usage report.
* `presentation/` → slides and demo video.
* `README.md` → project description and setup instructions.
* `.gitignore` → ignores system/config files.

---

## Deployment

The site is deployed using **GitHub Pages** directly from the `main` branch.

Steps taken:
1. Pushed all files to the `main` branch on GitHub.
2. Enabled GitHub Pages in repository Settings → Pages.
3. Selected `main` branch and `/ (root)` as the source.
4. The site became live at the URL above within minutes.

No build step or server is needed — the site is pure static HTML/CSS/JS.

---

## Features

### GitHub API Integration

The GitHub section fetches public repositories from the GitHub REST API using
`fetch()` and `async/await`.

The function handles three distinct states:

* **Loading** → a spinner is shown while the request is in progress.
* **Error** → a user-friendly message is shown for each HTTP error case,
  plus a "Try Again" button that re-calls the fetch function.
* **Success** → repo cards are built dynamically and injected into the grid.

---

### Visitor Timer

A fixed badge in the bottom-right corner displays how long the visitor has been
on the page. It starts at `0s` and updates every second using `setInterval`.

The `formatTime(seconds)` function uses multiple conditions to decide the
display format:

* Under 60 seconds → `30s`
* 60 seconds to 1 hour → `2m 15s`
* 1 hour or more → `1h 5m`

---

### Welcome Back — localStorage State

On a visitor's first arrival, a modal popup appears and asks for their name.
The name goes through multi-step validation before being saved:

1. Must not be empty
2. Must be at least 2 characters
3. Must be no longer than 30 characters

On return visits, a badge appears with a time-aware greeting (Good morning /
afternoon / evening / night). A pencil button lets the visitor update their
name at any time.

---

## Design and Responsiveness

* **CSS Grid** → GitHub repos grid, plus all grids from previous assignments.
* **Flexbox** → repo card header, repo footer stats, timer badge, welcome badge.
* **Desktop** → three-column repo grid where space allows.
* **Mobile (≤ 640px)** → repo grid collapses to single column.
* **`clamp()`** → fluid typography throughout.

---

## Accessibility

* **Semantic HTML** → `<nav>`, `<section>`, `<article>`, `<footer>`.
* **ARIA labels** → theme toggle and mobile menu buttons have `aria-label`.
* **Form labels** → every input has a linked `<label>`.
* **Keyboard support** → welcome popup submits on Enter key press.
* **Color contrast** → all components maintain readable contrast in both themes.

---

## Known Limitations

* The GitHub API allows 60 unauthenticated requests per hour per IP.
* The contact form is demo-only — it does not send data anywhere.
* `localStorage` does not persist in private/incognito browsing on some browsers.
* Google Fonts require an internet connection.
