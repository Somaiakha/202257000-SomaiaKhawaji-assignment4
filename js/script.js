/* ============================================================
   PORTFOLIO SCRIPTS — Somaia
   Features:
   1. Time-based greeting message
   2. Dark / Light theme toggle (persisted via localStorage)
   3. Mobile menu toggle
   4. Contact form validation with feedback
   5. Scroll-triggered fade-in animations
   6. Tab navigation
   ============================================================ */

// Run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. TIME-BASED GREETING
       Displays a different greeting depending on the time of day.
    ---------------------------------------------------------- */
    const greetingEl = document.getElementById('greeting');

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning ☀️';
        if (hour < 17) return 'Good Afternoon 🌤️';
        if (hour < 21) return 'Good Evening 🌅';
        return 'Good Night 🌙';
    }

    if (greetingEl) {
        greetingEl.textContent = getGreeting();
    }


    /* ----------------------------------------------------------
       2. DARK / LIGHT THEME TOGGLE
       Switches the data-theme attribute on <html> and
       saves the preference in localStorage.
    ---------------------------------------------------------- */
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const current = htmlEl.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        htmlEl.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });


    /* ----------------------------------------------------------
       3. MOBILE MENU TOGGLE
       Opens / closes the navigation menu on small screens.
    ---------------------------------------------------------- */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });


    /* ----------------------------------------------------------
       4. CONTACT FORM VALIDATION
       Validates Name, Email, and Message fields on submit.
       Shows success or error feedback below the button.
       (No backend — demonstration only.)
    ---------------------------------------------------------- */
    const submitBtn = document.getElementById('submitBtn');
    const feedbackEl = document.getElementById('formFeedback');

    submitBtn.addEventListener('click', () => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        feedbackEl.textContent = '';
        feedbackEl.className = 'form-feedback';

        if (!name || !email || !message) {
            feedbackEl.textContent = 'Please fill in all fields.';
            feedbackEl.classList.add('error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedbackEl.textContent = 'Please enter a valid email address.';
            feedbackEl.classList.add('error');
            return;
        }

        feedbackEl.textContent = 'Thank you! Your message has been received.';
        feedbackEl.classList.add('success');

        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';
    });


    /* ----------------------------------------------------------
       5. SCROLL-TRIGGERED FADE-IN ANIMATIONS
       Uses IntersectionObserver to add a "visible" class to
       elements with the "fade-in" class when they enter view.
    ---------------------------------------------------------- */
    const animatableSelectors = [
        '.section-title',
        '.section-label',
        '.about-image-wrapper',
        '.about-text',
        '.skill-category',
        '.project-card',
        '.contact-form-wrapper',
        '.contact-info'
    ];

    animatableSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
        });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    /* ----------------------------------------------------------
       6. TAB NAVIGATION
       Shows the selected section and hides the rest.
    ---------------------------------------------------------- */
    const allNavLinks = document.querySelectorAll('.nav-link');

    function showSection(id) {
        document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
        document.getElementById(id).style.display = 'block';
        allNavLinks.forEach(b => b.classList.remove('active'));
        document.querySelector(`a[href="#${id}"]`).classList.add('active');
    }

    // Show first section by default
    showSection('about');

    // Attach to nav links
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const id = link.getAttribute('href').replace('#', '');
            showSection(id);
            // Close mobile menu if open
            navLinks.classList.remove('open');
            menuToggle.classList.remove('active');
        });
    });
/* ===== GITHUB API ===== */
const LANG_COLORS = {
    JavaScript: '#F7DF1E', TypeScript: '#3178C6', Python: '#3572A5',
    HTML: '#E34C26', CSS: '#563D7C', Java: '#B07219', 'C#': '#178600',
    'C++': '#F34B7D', SQL: '#e38c00', Shell: '#89E051', default: '#D4638F'
};

const GITHUB_USERNAME = 'SomaiaKha';
const REPOS_TO_SHOW = 6;

async function fetchGithubRepos() {
    const loadingEl = document.getElementById('githubLoading');
    const errorEl   = document.getElementById('githubError');
    const errorMsg  = document.getElementById('githubErrorMsg');
    const gridEl    = document.getElementById('githubGrid');

    loadingEl.style.display = 'flex';
    errorEl.style.display   = 'none';
    gridEl.innerHTML        = '';

    try {
        const res = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${REPOS_TO_SHOW}&type=public`
        );

        if (!res.ok) {
            if (res.status === 403) throw new Error('GitHub API rate limit reached. Try again in a few minutes.');
            if (res.status === 404) throw new Error('GitHub profile not found.');
            throw new Error(`GitHub API error (${res.status}). Please try again later.`);
        }

        const repos = await res.json();
        loadingEl.style.display = 'none';

        if (repos.length === 0) {
            errorMsg.textContent = 'No public repositories found.';
            errorEl.style.display = 'flex';
            return;
        }

        repos.forEach(repo => gridEl.appendChild(buildRepoCard(repo)));

    } catch (err) {
        loadingEl.style.display = 'none';
        errorMsg.textContent    = err.message || 'Could not load repositories. Please try again later.';
        errorEl.style.display   = 'flex';
    }
}

function buildRepoCard(repo) {
    const card = document.createElement('a');
    card.className = 'repo-card fade-in';
    card.href      = repo.html_url;
    card.target    = '_blank';
    card.rel       = 'noopener noreferrer';

    const langColor = LANG_COLORS[repo.language] || LANG_COLORS.default;
    const langHTML  = repo.language
        ? `<span class="repo-lang"><span class="lang-dot" style="background:${langColor}"></span>${repo.language}</span>`
        : '';

    const descHTML = repo.description
        ? `<p class="repo-description">${repo.description}</p>`
        : `<p class="repo-no-desc">No description provided.</p>`;

    const updated = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    card.innerHTML = `
        <div class="repo-header">
            <span class="repo-icon">📁</span>
            <span class="repo-name">${repo.name}</span>
            <span class="repo-arrow">→</span>
        </div>
        ${descHTML}
        <div class="repo-footer">
            <span class="repo-stat">⭐ ${repo.stargazers_count}</span>
            <span class="repo-stat">🍴 ${repo.forks_count}</span>
            <span class="repo-stat">🕒 ${updated}</span>
            ${langHTML}
        </div>
    `;
    return card;
}

const githubSection = document.getElementById('github');
if (githubSection) {
    const githubObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchGithubRepos();
            githubObserver.disconnect();
        }
    }, { threshold: 0.1 });
    githubObserver.observe(githubSection);
}
});