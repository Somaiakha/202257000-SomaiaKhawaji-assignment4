# Technical Documentation — Assignment 3

## Overview

This is the third version of my personal portfolio website, built on top of
Assignment 2. It's still plain HTML, CSS, and JavaScript — no frameworks. The
main additions in this version are a live GitHub API integration, a visitor
timer with multi-condition formatting, and a localStorage-based welcome system
that greets returning visitors by name. The warm pink/coral theme and all
features from Assignment 2 are carried forward.

---

## Project Structure

* `index.html` → the main page with all sections (hero, about, skills, projects,
  github, contact, footer) plus the welcome popup and badge.
* `css/styles.css` → all styling including new rules for the GitHub grid, repo
  cards, visitor timer badge, welcome popup, and welcome badge.
* `js/script.js` → all interactivity: GitHub API fetch, repo card builder,
  visitor timer, welcome/localStorage logic, plus everything from Assignment 2.
* `assets/images/` → profile photo and project images.
* `docs/` → this technical doc + the AI usage report.
* `README.md` → project description and setup instructions.
* `.gitignore` → ignores system/config files.

---

## New Features in Assignment 3

### GitHub API Integration

The GitHub section fetches public repositories from the GitHub REST API using
`fetch()` and `async/await`. The request is sent to:

```
https://api.github.com/users/SomaiaKha/repos?sort=updated&per_page=6&type=public
```

The function handles three distinct states:

* **Loading** → a spinner is shown while the request is in progress.
* **Error** → a user-friendly message is shown for each HTTP error case,
  plus a "Try Again" button that re-calls the fetch function.
* **Success** → repo cards are built dynamically and injected into the grid.

Error cases handled:
* `403` → GitHub API rate limit reached
* `404` → username not found
* Any other status → generic error with the status code shown

```javascript
async function fetchGithubRepos() {
    const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPOS_TO_SHOW}&type=public`
    );
    if (!res.ok) {
        if (res.status === 403) throw new Error('Rate limit reached.');
        if (res.status === 404) throw new Error('Profile not found.');
        throw new Error(`GitHub API error (${res.status}).`);
    }
    const repos = await res.json();
    repos.forEach(repo => gridEl.appendChild(buildRepoCard(repo)));
}
```

The fetch is triggered lazily — an `IntersectionObserver` watches the GitHub
section and only calls `fetchGithubRepos()` when the section enters the
viewport. This avoids an unnecessary network request if the user never scrolls
that far.

Each repo card displays: name, description (or a fallback message), star count,
fork count, last updated date, and programming language with a color dot.

---

### Visitor Timer

A fixed badge in the bottom-right corner displays how long the visitor has been
on the page. It starts at `0s` and updates every second using `setInterval`.

The `formatTime(seconds)` function uses multiple conditions to decide the
display format:

* Under 60 seconds → `30s`
* 60 seconds to 1 hour → `2m 15s`
* 1 hour or more → `1h 5m`

```javascript
function formatTime(seconds) {
    if (seconds < 60) return seconds + 's';
    if (seconds < 3600) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return s > 0 ? `${m}m ${s}s` : `${m}m`;
    }
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
}
```

The timer is wrapped in an IIFE so it starts immediately on page load without
polluting the global scope.

---

### Welcome Back — localStorage State

On a visitor's first arrival, a modal popup appears after a 1-second delay and
asks for their name. The name goes through multi-step validation before being
saved:

1. Must not be empty
2. Must be at least 2 characters
3. Must be no longer than 30 characters

If any check fails, a specific error message is shown inline and the input
stays focused. On success, the name is capitalized and saved to `localStorage`.

On return visits, the popup is skipped entirely and a badge appears in the
top-right corner with a time-aware greeting:

* Before 12:00 → `Good morning, [name]! 👋`
* 12:00–17:00 → `Good afternoon, [name]! 👋`
* 17:00–21:00 → `Good evening, [name]! 👋`
* After 21:00 → `Good night, [name]! 👋`

A pencil button (✏️) on the badge clears `localStorage` and re-opens the popup
so the visitor can update their name at any time.

```javascript
const saved = localStorage.getItem('visitorName');
if (saved) {
    showBadge(saved);
} else {
    setTimeout(() => { overlay.style.display = 'flex'; }, 1000);
}
```

---

## Design and Responsiveness

* **CSS Grid** → GitHub repos grid (`repeat(auto-fit, minmax(280px, 1fr))`),
  plus all grids from Assignment 2.
* **Flexbox** → repo card header, repo footer stats, timer badge, welcome badge.
* **Desktop** → three-column repo grid where space allows.
* **Mobile (≤ 640px)** → repo grid collapses to single column; badges resize
  and reposition to avoid overlap.
* **`clamp()`** → fluid typography carried forward from Assignment 2.

---

## Theming System

* All new components (repo cards, timer badge, welcome popup, welcome badge)
  use the same CSS custom properties as Assignment 2.
* No hardcoded colors anywhere — everything switches automatically with
  `data-theme="dark"` on `<html>`.
* Language color dots in repo cards use a hardcoded map (`LANG_COLORS`) since
  the GitHub API does not return hex colors.

---

## JavaScript Features (full list)

* **GitHub API fetch** → async fetch with loading / error / success states.
* **Repo card builder** → dynamically creates and injects cards into the DOM.
* **Lazy API load** → `IntersectionObserver` triggers fetch on section entry.
* **Visitor timer** → `setInterval` counter with multi-condition `formatTime`.
* **Welcome popup** → first-visit modal with name input and validation.
* **Welcome badge** → return-visit greeting with time-aware message.
* **localStorage (name)** → persists visitor name across sessions.
* **Name reset** → pencil button clears storage and re-opens popup.
* **Tab navigation** → shows/hides sections on click *(from A2)*.
* **Form validation** → name, email (regex), message *(from A2)*.
* **localStorage (theme)** → dark/light preference persists *(from A2)*.
* **Time-based greeting** → Good Morning / Afternoon / Evening / Night *(from A2)*.
* **Mobile menu toggle** → hamburger opens/closes nav *(from A2)*.
* **Fade-in on scroll** → `IntersectionObserver` reveal animations *(from A2)*.

---

## Accessibility

* **Semantic HTML** → `<nav>`, `<section>`, `<article>`, `<footer>`.
* **ARIA labels** → theme toggle and mobile menu buttons have `aria-label`.
* **Form labels** → every input has a linked `<label>`.
* **Keyboard support** → welcome popup submits on Enter key press.
* **Focus management** → input is focused automatically when popup opens.
* **Color contrast** → all new badges and cards maintain readable contrast in
  both light and dark modes.

---

## Known Limitations

* The GitHub API allows 60 unauthenticated requests per hour per IP. If the
  rate limit is hit, a clear error message and retry button are shown.
* The contact form is still demo-only — it does not send data anywhere.
* `localStorage` does not persist in private/incognito browsing on some browsers.
* Google Fonts load externally — custom fonts require an internet connection.
* Language color dots use a manually maintained map — any language not in the
  map falls back to the pink accent color.
* Tab navigation and scroll spy can still conflict briefly when switching
  sections, carried over from Assignment 2.