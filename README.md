# Somaia's Portfolio — Assignment 3

This is the third version of my portfolio website, built on top of Assignment 2.
The goal this time was to connect the site to the real world — live data from an
external API, smarter logic that reacts to user choices, and state that actually
persists between visits. Still plain HTML, CSS, and JavaScript. No frameworks ✨

---

## What's new in Assignment 3

### API Integration — GitHub Repositories
The portfolio now fetches my public repositories live from the **GitHub API**.
Every time a visitor opens the GitHub section, the site pulls real data — repo
names, descriptions, languages, stars, forks, and last updated date — and
displays them as cards that match the site's design. No hardcoded projects.

### Complex Logic — Visitor Timer
A live timer in the bottom-right corner tracks exactly how long the visitor has
been on the page. It counts up in seconds, then switches to minutes and seconds,
then hours and minutes — always showing the most readable format. The logic
combines `setInterval`, `Date.now()`, and a multi-condition `formatTime` function
to decide which format to display at each threshold.

### State Management — Welcome Back (localStorage)
On a first visit, a popup appears and asks for the visitor's name. The name is
validated (not empty, at least 2 characters, max 30) and then saved to
`localStorage`. On every return visit, a badge greets them by name with a
time-aware message (Good morning / afternoon / evening / night). A pencil button
lets them update their name at any time.

### Error Handling — API States
The GitHub section never leaves the user confused. It handles three states:
- **Loading** → spinner while the API call is in progress
- **Error** → clear message + "Try Again" button if the fetch fails
- **Success** → repo cards rendered and ready to click

---

## Features (full list)

- **GitHub API** → live repositories fetched and displayed as cards
- **Visitor timer** → live counter, auto-formats into s / m s / h m
- **Welcome Back** → name saved in `localStorage`, greeted on return
- **Name validation** → empty, min length, max length — all checked
- **API error handling** → loading / error / success states with feedback
- **Tab navigation** → switches sections instantly on click *(from A2)*
- **Form validation** → name, email, message checked before submit *(from A2)*
- **Dark / Light theme** → toggle persisted in `localStorage` *(from A2)*
- **Time-based greeting** → Good Morning / Afternoon / Evening / Night *(from A2)*
- **Mobile menu** → hamburger toggle for small screens *(from A2)*
- **Fade-in on scroll** → elements reveal as they enter the viewport *(from A2)*
- **Animated hero shape** → morphing blob with orbiting ring *(from A2)*

---

## Project structure

```
assignment-3/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
│       ├── profile.jpg
│       ├── course-route.jpg
│       └── volunteering-platform.jpg
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
├── README.md
└── .gitignore
```

---

## How to run locally

1. Clone the repository:
```bash
git clone https://github.com/SomaiaKha/assignment-3.git
```
2. Open `index.html` in any modern browser — no server needed.
3. The GitHub API works without a key (public repos only). If you hit the rate
   limit (60 requests/hour per IP), wait a few minutes and try again.

---

## API used

| API | Endpoint | Auth needed |
|-----|----------|-------------|
| GitHub REST API | `https://api.github.com/users/SomaiaKha/repos` | None (public) |

---

## AI usage summary

I used **Claude AI** throughout this assignment:
- Helped me understand how `fetch()` and `async/await` work with REST APIs
- Explained HTTP error codes and how to handle each one with a user-friendly message
- Walked me through `setInterval` and `Date.now()` for the visitor timer
- Clarified how `localStorage` works for persisting state between visits
- Helped me spot a conflict between my `IntersectionObserver` and dynamically
  created GitHub cards

I reviewed, tested, and modified everything to make sure I understand it and
that it fits my project. Full details in `docs/ai-usage-report.md`.

---

## Notes from building this

- The GitHub API is surprisingly easy to use — no key needed for public repos
- Thinking in states (loading / success / error) made the API feature much cleaner
- `localStorage` for the welcome name felt like a natural extension of the theme toggle from A2
- The timer's `formatTime` function was more fun to write than expected — lots of little conditions
- Lazy-loading the API with `IntersectionObserver` instead of on page load was a good call

---

## Checklist

- [x] API integration (GitHub Repositories — live data, error handling)
- [x] Complex logic (visitor timer with multi-condition formatting)
- [x] State management (Welcome Back — localStorage, validation, return visits)
- [x] Error handling & user feedback (loading / error / success states)
- [x] AI tools used and documented
- [x] README + technical documentation complete
- [x] Responsive across desktop, tablet, mobile