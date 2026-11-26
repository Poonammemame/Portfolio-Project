/**
 * ==============================================================================
 * POONAM MEMANE - PORTFOLIO JAVASCRIPT
 * Pure Vanilla JavaScript (Zero third-party library dependencies)
 * Clean, Modular, and 100% Simple to Understand and Explain in Interviews
 * 
 * TABLE OF CONTENTS:
 * 1. Global Initialization (DOMContentLoaded)
 * 2. Live Typing Animation (Hero Section)
 * 3. Navbar Scroll Behavior & Scrollspy (Active Section Tracking)
 * 4. Dark / Light Mode Toggle with LocalStorage Memory
 * 5. Certificate Category Filter System
 * 6. Certificate Full-Size Image Preview Modal
 * 7. Copy to Clipboard with Modern Bootstrap Toast Alert
 * 8. Contact Form Mailto Handler
 * 9. Smooth Scroll-to-Top Floating Button
 * ==============================================================================
 */

// 1. GLOBAL INITIALIZATION
// Ensure the complete HTML DOM is parsed before attaching listeners
document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initNavbarScroll();
  initThemeToggle();
  initCertificateFilters();
  initCertificateModal();
  initContactForm();
  initScrollTop();
});

/**
 * ------------------------------------------------------------------------------
 * 2. LIVE TYPING ANIMATION (HERO SECTION)
 * How it works:
 * - Iterates through an array of professional titles.
 * - Adds characters one-by-one to create a typing effect.
 * - Pauses when the word is complete, then removes characters one-by-one.
 * - Switches to the next title in a continuous loop.
 * ------------------------------------------------------------------------------
 */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const titles = [
    'Java Full Stack Developer',
    'Spring Boot & REST API Developer',
    'Computer Engineering Graduate',
    'Web & Database Enthusiast'
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      // Backspace: remove 1 character
      typingElement.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Deletion is faster
    } else {
      // Type: add 1 character
      typingElement.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing speed
    }

    // Word is fully typed -> pause before deleting
    if (!isDeleting && charIndex === currentTitle.length) {
      typingSpeed = 1800; // 1.8 second pause
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Word is fully deleted -> move to next word
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 400; // Brief pause before typing next word
    }

    setTimeout(type, typingSpeed);
  }

  // Start the typing loop
  type();
}

/**
 * ------------------------------------------------------------------------------
 * 3. NAVBAR SCROLL BEHAVIOR & SCROLLSPY
 * How it works:
 * - Detects vertical window scroll position.
 * - Adds subtle shadow and compact padding (.navbar-scrolled) when scrolled past 50px.
 * - Matches current scroll position with section offsets to highlight the active menu link.
 * - Automatically collapses mobile navbar when any nav link is tapped.
 * ------------------------------------------------------------------------------
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // 1. Sticky navbar shadow
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }

    // 2. Active nav link highlight (ScrollSpy)
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 3. Auto-close mobile drawer when a link is clicked
  const navCollapse = document.getElementById('navbarNav');
  if (navCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }
}

/**
 * ------------------------------------------------------------------------------
 * 4. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE
 * How it works:
 * - Uses Bootstrap 5's native 'data-bs-theme' attribute on <html>.
 * - On load, retrieves saved user preference from localStorage (defaults to 'light').
 * - Toggling flips between 'light' and 'dark', changes the icon (sun/moon),
 *   and saves the state back to localStorage.
 * ------------------------------------------------------------------------------
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('i');

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('pm_portfolio_theme') || 'light';
  applyTheme(savedTheme);

  // Click event listener
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
    localStorage.setItem('pm_portfolio_theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun';
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      } else {
        themeIcon.className = 'bi bi-moon-stars';
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      }
    }
  }
}

/**
 * ------------------------------------------------------------------------------
 * 5. CERTIFICATE CATEGORY FILTER SYSTEM
 * How it works:
 * - Listen for clicks on filter buttons ('All', 'Certifications', 'Research', 'Hackathons').
 * - Grabs the clicked filter category from 'data-filter'.
 * - Compares it with each card's 'data-category' attribute.
 * - Displays matching cards and hides non-matching cards using CSS display.
 * ------------------------------------------------------------------------------
 */
function initCertificateFilters() {
  const filterButtons = document.querySelectorAll('.cert-filter-btn');
  const certItems = document.querySelectorAll('.cert-col');

  if (!filterButtons.length || !certItems.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button styling
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const selectedFilter = button.getAttribute('data-filter');

      // Filter cards
      certItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (selectedFilter === 'all' || selectedFilter === itemCategory) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. CERTIFICATE FULL-SIZE PREVIEW MODAL
 * How it works:
 * - Each certificate card has an image wrapper with 'data-img-src' and titles.
 * - On click, populates the modal image and text dynamically.
 * - Uses Bootstrap 5 Modal API to show the modal popup.
 * ------------------------------------------------------------------------------
 */
function initCertificateModal() {
  const modalEl = document.getElementById('certificateModal');
  if (!modalEl) return;

  const modalImg = document.getElementById('certificateModalImg');
  const modalTitle = document.getElementById('certificateModalLabel');
  const modalDesc = document.getElementById('certificateModalDesc');
  const modalTriggerButtons = document.querySelectorAll('.view-cert-trigger');

  modalTriggerButtons.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const imgSrc = trigger.getAttribute('data-img-src');
      const title = trigger.getAttribute('data-title');
      const desc = trigger.getAttribute('data-desc');

      if (modalImg) modalImg.src = imgSrc;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;

      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    });
  });
}

/**
 * ------------------------------------------------------------------------------
 * 7. COPY TO CLIPBOARD WITH MODERN BOOTSTRAP TOAST
 * How it works:
 * - Uses the modern Navigator Clipboard API (navigator.clipboard.writeText).
 * - Triggers an elegant non-intrusive Bootstrap Toast message.
 * - Has an execCommand fallback for older legacy browsers.
 * ------------------------------------------------------------------------------
 */
function copyToClipboard(text, label) {
  function showToast(message) {
    const toastEl = document.getElementById('copyToast');
    const toastMsgEl = document.getElementById('toastMessage');
    if (toastEl && toastMsgEl) {
      toastMsgEl.textContent = message;
      const bsToast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
      bsToast.show();
    } else {
      alert(message);
    }
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard: ${text}`);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  } else {
    // Fallback for older browsers
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`Copied ${label} to clipboard: ${text}`);
  }
}

/**
 * ------------------------------------------------------------------------------
 * 8. CONTACT FORM SUBMISSION HANDLER
 * How it works:
 * - Listens to form 'submit' event and prevents standard browser reload.
 * - Extracts and trims user input values (Name, Email, Subject, Message).
 * - Constructs a URI-encoded 'mailto:' link to compose an email draft directly.
 * - Resets the input fields after sending.
 * ------------------------------------------------------------------------------
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('senderName').value.trim();
    const email = document.getElementById('senderEmail').value.trim();
    const subject = document.getElementById('emailSubject').value.trim();
    const message = document.getElementById('emailMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const emailBody = `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:pmemane2612@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open user's default email client
    window.location.href = mailtoUrl;

    // Reset form fields
    contactForm.reset();
  });
}

/**
 * ------------------------------------------------------------------------------
 * 9. BACK-TO-TOP BUTTON
 * How it works:
 * - Detects when the user has scrolled more than 300px down.
 * - Adds class '.show' to make the floating button smoothly fade in.
 * - On click, calls window.scrollTo({ top: 0, behavior: 'smooth' }).
 * ------------------------------------------------------------------------------
 */
function initScrollTop() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
