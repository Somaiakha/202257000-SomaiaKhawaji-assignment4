# AI Usage Report — Assignment 4

## Tools I Used

* I used **Claude AI, ChatGPT** as my main helper throughout this assignment — for asking
  questions, getting unstuck, understanding new concepts, and reviewing my work
  before submitting.

---

## How I Used It

* For the GitHub API integration, I asked Claude to explain how `fetch()` works
  with `async/await` and how to handle different HTTP error codes. I then wrote
  the fetch function myself and structured the error handling around my use case.
* For the Visitor Timer, I described what I wanted (a live counter that formats
  seconds into minutes and hours) and Claude explained the `setInterval` pattern.
  I implemented and placed the feature myself.
* For the Welcome Back feature, I asked how `localStorage` works. Claude explained
  the get/set/remove methods and I built the full popup, validation logic, and
  badge display myself.
* For Assignment 4 final polish, I used Claude to review code quality, improve
  documentation, and assist with deploying the site to GitHub Pages.

---

## Use Cases

* **GitHub API**: Asked how to fetch data from a public REST API and how to show
  user-friendly error messages for each HTTP error case (403, 404, 500).
* **Visitor Timer**: Got help understanding `setInterval` and how to format raw
  seconds into a readable string (30s, 2m 15s, 1h 5m).
* **localStorage / Welcome Back**: Asked how `localStorage` differs from
  `sessionStorage`. Claude explained the concept and I designed the full UI,
  validation flow, and return-visit logic myself.
* **Debugging**: When the GitHub cards weren't picking up the fade-in animation,
  I described the issue and Claude explained that dynamically created elements
  need the observer attached after they are added to the DOM.
* **Deployment**: Asked Claude for step-by-step guidance on deploying to GitHub
  Pages and writing professional documentation.

---

## Benefits

* Understanding async/await and API error handling became clearer once I could
  ask specific questions about my exact code rather than reading generic docs.
* I learned to think about features in terms of states (loading, success, error,
  empty) — a pattern I will carry into future projects.
* localStorage felt abstract before this assignment; building the Welcome Back
  feature gave me a concrete working example I can reference later.
* Having AI assistance for documentation helped me write clearer and more
  professional technical writing.

---

## Challenges

* Some explanations assumed I was starting from scratch, so I had to ask
  follow-up questions to get advice that fit my existing code structure.
* I had to resist using code snippets directly — I rewrote everything in my own
  style and made sure I understood each line before adding it.
* Positioning the timer badge and welcome badge without overlapping on mobile
  required extra CSS work that I handled entirely on my own.

---

## Learning Outcomes

* I now understand how to connect a web page to a real external API, handle the
  response, and show meaningful feedback at every stage (loading, success, error).
* I learned that good state management means thinking about what data needs to
  persist, where to store it, and how the UI should react when it changes.
* I got comfortable building multi-condition validation — not just checking if a
  field is empty, but checking length and giving specific feedback for each case.
* I learned how to deploy a website professionally using GitHub Pages.
* I improved my technical writing skills through documenting my work clearly.

---

## How I Modified AI Suggestions Responsibly

* I never copy-pasted anything directly — I read every suggestion, made sure
  I understood it, and then wrote my own version that fit my project.
* All personal content (bio, project descriptions, skills) is mine. Claude
  never wrote anything about me.
* I chose which features to build, how they look, and how they behave.
* I tested everything manually across desktop, tablet, and mobile.
* I used Claude the same way I'd use a tutor — to understand concepts and
  get unstuck, not to get the work done for me.
