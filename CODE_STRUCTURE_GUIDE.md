# Portfolio Code Structure Guide & Interview Reference

Welcome to your personal portfolio codebase! This guide provides a **clear, simple-to-understand explanation** of how your portfolio website is built using **HTML5, CSS3, Bootstrap 5, and pure Vanilla JavaScript**.

Whether you want to customize your website or explain your code with complete confidence in technical and HR interviews, this document covers everything you need.

---

## 📂 1. Project Folder Structure

```text
portfolio-code/
├── index.html                    # Main HTML5 semantic page
├── CODE_STRUCTURE_GUIDE.md       # This complete code structure guide
├── INTERVIEW_EXPLANATION.md      # Detailed interview speaking cheat sheet
├── README.md                     # GitHub repository overview & live demo links
└── assets/
    ├── css/
    │   └── style.css             # Modular custom stylesheet (variables & theming)
    ├── js/
    │   └── script.js             # 100% Vanilla JS (typing, theme, filter, modal, toast)
    ├── img/
    │   ├── poonam.jpeg           # Main profile photograph
    │   ├── favicon.png           # Browser tab icon
    │   └── portfolio/            # 10 verified certificate & publication images
    │       ├── infosys.jpeg      # Infosys AI certification
    │       ├── product-1.jpeg    # IJIRID research paper
    │       ├── ijaresm.jpeg      # IJARESM research publication
    │       ├── branding-1.jpeg   # Smart India Hackathon (SIH 2023)
    │       ├── techsaksham.jpeg  # Microsoft & SAP Generative AI
    │       ├── app-1.jpeg        # Quizeethon Flutter contest finalist
    │       ├── workshop.jpeg     # MERN & MEAN full stack workshop
    │       ├── npit.jpeg         # Web development training
    │       ├── emertxe.jpeg      # IoT internship
    │       └── gpt-learning.jpeg # Python seminar
    └── vendor/
        ├── bootstrap/            # Official Bootstrap 5 CSS & JS bundle
        └── bootstrap-icons/      # Official Bootstrap vector icon set
```

---

## 🧱 2. HTML5 Semantic Structure (`index.html`)

The HTML file uses modern **semantic tags** instead of generic `<div>` wrappers. This improves search engine indexing (SEO) and web accessibility (a11y).

| Section | HTML Tag | Purpose & Implementation |
| :--- | :--- | :--- |
| **Sticky Navigation** | `<header>` & `<nav>` | Sticky header (`.fixed-top`) with responsive menu, theme toggle button, and "Hire Me" button. |
| **Hero Section** | `<section id="hero">` | Profile image with pulsing "Open to Work" badge, typewriter text, and social links (GitHub, LinkedIn, LeetCode, Email, Phone). |
| **About Me** | `<section id="about">` | Resume professional summary, core soft skills badges, and quick academic highlight cards. |
| **Technical Skills** | `<section id="skills">` | 6 responsive cards organizing programming languages, backend frameworks, frontend UI, database, tools, and deployment. |
| **Experience & Training** | `<section id="experience">` | Highlights 6-month Mavertech Technologies internship and Giri's Tech Hub training. |
| **Featured Projects** | `<section id="projects">` | 2 cards showcasing Smart Career Recommendation System and Personal Portfolio with live demo and GitHub links. |
| **Certifications & Research** | `<section id="certifications">` | 10 verified credentials with live category filter buttons and click-to-preview full certificate modal. |
| **Education** | `<section id="education">` | B.E. Computer Engineering (ZCOER, Pune) and Diploma in Computer Technology (Amrutvahini Polytechnic). |
| **Contact Me** | `<section id="contact">` | 1-click clipboard copy cards for email and phone, plus a working contact form. |
| **Footer** | `<footer>` | Copyright information and technical stack credits. |

---

## 🎨 3. CSS3 Architecture (`assets/css/style.css`)

The stylesheet is divided into 13 numbered, clean sections:

### A. CSS Variables (`:root` & `[data-bs-theme="dark"]`)
All colors are centralized in CSS variables. When Dark Mode is toggled, only the variables change—no duplicate CSS rules:
```css
:root {
  --primary-color: #2563eb;  /* Blue */
  --bg-body: #ffffff;        /* White background */
  --text-main: #0f172a;      /* Dark text */
}

[data-bs-theme="dark"] {
  --primary-color: #3b82f6;  /* Brighter blue */
  --bg-body: #0b1120;        /* Deep slate background */
  --text-main: #f8fafc;      /* Crisp white text */
}
```

### B. Mobile-First Media Queries
Standard Bootstrap breakpoints are refined in Section 13:
- `@media (max-width: 991.98px)`: Tablet & mobile layouts (compact hero, scaled headings).
- `@media (max-width: 575.98px)`: Smartphone screens (smaller buttons, optimized card padding).

---

## ⚡ 4. Pure Vanilla JavaScript (`assets/js/script.js`)

Zero third-party dependencies—every single feature is written in pure, explainable JavaScript:

### 1. `initTypingEffect()`
- Creates a looping typewriter animation in the Hero section without external libraries like `typed.js`.
- Uses recursive `setTimeout()` to type letters one-by-one, pause when complete, backspace, and advance to the next title.

### 2. `initNavbarScroll()`
- Attaches a `scroll` listener to `window`.
- Adds a subtle shadow (`.navbar-scrolled`) when scrolling beyond 50px.
- Dynamically highlights the active section in the navbar (`ScrollSpy`).
- Closes the mobile hamburger menu automatically when a user clicks any navigation link.

### 3. `initThemeToggle()`
- Checks `localStorage` for a saved preference (`'light'` or `'dark'`).
- Toggles the `data-bs-theme` attribute on the `<html>` root element.
- Updates the sun/moon icon and saves the user's choice so it persists across page refreshes.

### 4. `initCertificateFilters()`
- Categorizes credentials into: `all`, `cert`, `research`, and `hackathon`.
- Toggles card visibility (`style.display = 'block' | 'none'`) based on the button clicked.

### 5. `initCertificateModal()`
- On clicking any certificate thumbnail, reads the image source and title attributes (`data-img-src`, `data-title`, `data-desc`).
- Populates the Bootstrap 5 Modal and displays the certificate in full resolution.

### 6. `copyToClipboard(text, label)`
- Uses `navigator.clipboard.writeText(text)` to copy email or phone number.
- Triggers a non-intrusive, floating Bootstrap Toast notification (e.g., *"Copied Email to clipboard: pmemane2612@gmail.com"*).

### 7. `initContactForm()`
- Prevents default form refresh with `e.preventDefault()`.
- Validates that fields are non-empty.
- Formats input into a `mailto:` URI link and opens the user's email client directly.

### 8. `initScrollTop()`
- Displays a floating arrow button when scrolled down more than 300px.
- Smoothly scrolls the window back to `top: 0` on click.

---

## 🛠️ 5. How to Customize Your Portfolio

### 1. Add a New Project
In `index.html`, find `<!-- SECTION 6: FEATURED PROJECTS -->` and duplicate one `<div class="col-lg-6">` block. Update the title, description, tech badges, and demo/GitHub links.

### 2. Add a New Certificate
In `index.html`, find `<!-- SECTION 7: CERTIFICATIONS -->` and duplicate a `<div class="col-lg-4 col-md-6 cert-col">` card. Update the image path in `assets/img/portfolio/`, set the `data-category` (`cert`, `research`, or `hackathon`), and fill in the title.

### 3. Update Social Links
All social profile URLs (LinkedIn, GitHub, LeetCode, Email, Phone) are defined in both Section 2 (Hero) and Section 9 (Contact).

---

## 💬 6. Top Interview Questions & Ready Answers

### Q1: "Why did you build your portfolio using pure Vanilla JavaScript instead of React or jQuery?"
> **Answer:** *"I wanted complete control over performance, bundle size, and DOM lifecycle. By writing custom Vanilla JS for typing animations, theme switching, certificate filtering, and clipboard toasts, I avoided loading heavy third-party dependencies. This proves my strong grasp of core JavaScript fundamentals, asynchronous programming with `setTimeout`, DOM event listeners, and the Web Storage API."*

### Q2: "How does the Dark/Light mode toggle work?"
> **Answer:** *"I take advantage of Bootstrap 5's native `data-bs-theme` attribute on the root `<html>` element combined with custom CSS variables. In JavaScript, I listen for button clicks, toggle between `'light'` and `'dark'`, and persist the setting in browser `localStorage`. When the page reloads, JavaScript reads `localStorage` and restores the user's preferred theme immediately."*

### Q3: "How does the Bootstrap 12-column grid work in your layout?"
> **Answer:** *"Bootstrap's grid is mobile-first and uses flexbox. In my Hero section, for example, I use `.row` with `.col-lg-7` and `.col-lg-5`. On desktop screens (>=992px), these take 7 and 5 columns respectively, totaling 12. On mobile devices (<992px), they stack vertically to 100% width, providing a natural responsive experience."*
