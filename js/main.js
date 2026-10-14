/**
 * Portfolio Interactive Logic
 * Owner: Yukti Patil — Frontend Developer
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemePalettes();
  initAudioFeedback();
  initScrollProgressBar();
  initSpotlightCards();
  initDeveloperTerminal();
  initTypewriter();
  initNavigation();
  initProjectFiltering();
  initProjectModal();
  initEmailCopy();
  initContactForm();
  initBackToTop();
  initChatbot();
});

/* ==========================================================================
   1. THEME SWITCHER (Dark & Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const savedTheme = localStorage.getItem('theme');

  // Set initial theme
  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      if (currentTheme === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }
}

/* ==========================================================================
   2. TYPEWRITER EFFECT (Hero Subtitle)
   ========================================================================== */
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const words = [
    'Frontend Developer',
    'React Enthusiast',
    'UI/UX Crafter',
    'Python Programmer',
    'Problem Solver'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenWords = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
    } else {
      charIndex++;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   3. NAVIGATION (Scroll spy & Mobile Drawer)
   ========================================================================== */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect for navbar styling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside or on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }

  // Active section scroll spy
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-80px 0px -40% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. PROJECT DATA & FILTERING
   ========================================================================== */
const projectsData = [
  {
    id: 'proj-1',
    category: 'react',
    title: 'ShopSphere — Modern E-Commerce UI',
    shortDesc: 'A sleek, responsive online shopping experience with interactive cart management, dynamic product filtering, and dark/light mode.',
    tags: ['React.js', 'CSS Modules', 'State Management', 'Responsive Design'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    fullDesc: 'ShopSphere is a high-performance modern e-commerce storefront designed with a focus on seamless UI/UX, instant cart updates, and mobile responsiveness.',
    features: [
      'Interactive cart drawer with dynamic subtotal recalculation',
      'Filter and search products by categories and price range',
      'Optimized performance with lazy-loading product visual assets',
      'Fully responsive UI adapting effortlessly from 360px to 4K displays'
    ],
    demoUrl: '#',
    repoUrl: 'https://github.com'
  },
  {
    id: 'proj-2',
    category: 'javascript',
    title: 'DevPulse — Task & Workflow Board',
    shortDesc: 'A Kanban-style project and task management dashboard featuring drag-and-drop mechanics, persistent storage, and tag filtering.',
    tags: ['JavaScript ES6+', 'HTML5 Drag & Drop', 'LocalStorage', 'CSS Grid'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`,
    fullDesc: 'DevPulse enables developers and students to stay organized. Built without external libraries to showcase deep mastery of Vanilla JavaScript DOM manipulation and browser storage APIs.',
    features: [
      'Smooth native HTML5 Drag and Drop across backlog, in-progress, and done columns',
      'Local persistence saving all task data, priorities, and custom colors',
      'Search and priority badge filtering (High, Medium, Low)',
      'Subtle audio feedback and clean card animations'
    ],
    demoUrl: '#',
    repoUrl: 'https://github.com'
  },
  {
    id: 'proj-3',
    category: 'javascript',
    title: 'WeatherScope — Live Global Weather App',
    shortDesc: 'Clean glassmorphic weather application retrieving live forecasts, atmospheric indicators, and dynamic conditions via REST APIs.',
    tags: ['JavaScript', 'REST API', 'Async/Await', 'Glassmorphism CSS'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>`,
    fullDesc: 'WeatherScope fetches global live weather reports with intuitive visual indicators, UV index, humidity, wind velocity, and 5-day weather trends.',
    features: [
      'Real-time search with city auto-suggestions and coordinate lookup',
      'Adaptive background gradients that change based on sunny, cloudy, or rainy status',
      'Robust error handling for invalid city queries or offline state',
      'Detailed metric cards showing wind direction, humidity, and atmospheric pressure'
    ],
    demoUrl: '#',
    repoUrl: 'https://github.com'
  },
  {
    id: 'proj-4',
    category: 'ui',
    title: 'Personal Portfolio & Design Showcase',
    shortDesc: 'Fast, accessible, and responsive personal developer portfolio engineered with modern CSS variables, glassmorphism, and vanilla JS.',
    tags: ['HTML5', 'Modern CSS3', 'JavaScript', 'Responsive UI'],
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
    fullDesc: 'The very website you are browsing! Tailored for Yukti Patil to showcase skills, RCPIT academic achievements, and front-end development capabilities.',
    features: [
      'Dual-theme engine (Dark mode & Light mode) with localStorage remembering your choice',
      'Smooth scroll-spy navigation tracking section visibility',
      'Zero dependencies or bundlers required — ultra fast loading speed',
      'Responsive mobile drawer navigation and accessible dialog modal'
    ],
    demoUrl: '#',
    repoUrl: 'https://github.com'
  }
];

function initProjectFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.transition = 'all 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. PROJECT DETAILS MODAL
   ========================================================================== */
function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalRepoBtn = document.getElementById('modal-repo-btn');
  const viewDetailButtons = document.querySelectorAll('.view-project-details');

  if (!modalOverlay) return;

  function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.fullDesc;

    // Render tags
    modalTags.innerHTML = project.tags
      .map(tag => `<span class="project-tag">${tag}</span>`)
      .join('');

    // Render features
    modalFeatures.innerHTML = project.features
      .map(feat => `
        <div class="modal-feature-item">
          <span style="color: #10b981;">✔</span>
          <span>${feat}</span>
        </div>
      `).join('');

    modalDemoBtn.setAttribute('href', project.demoUrl);
    modalRepoBtn.setAttribute('href', project.repoUrl);

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  viewDetailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.project-card');
      const projectId = card.getAttribute('data-id');
      openModal(projectId);
    });
  });

  modalCloseBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. COPY EMAIL BUTTON
   ========================================================================== */
function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = 'yuktip2011@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        <span style="color: #10b981;">Copied!</span>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 2200);
    } catch (err) {
      // Fallback
      window.location.href = `mailto:${emailText}`;
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const toast = document.getElementById('form-toast');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');

    let isValid = true;

    // Helper validation
    function validateField(input, condition) {
      if (!condition) {
        input.classList.add('is-invalid');
        isValid = false;
      } else {
        input.classList.remove('is-invalid');
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    validateField(nameInput, nameInput.value.trim().length >= 2);
    validateField(emailInput, emailRegex.test(emailInput.value.trim()));
    validateField(subjectInput, subjectInput.value.trim().length >= 3);
    validateField(messageInput, messageInput.value.trim().length >= 10);

    if (!isValid) return;

    // Simulate submission loading
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
        <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-linecap="round"></circle>
      </svg>
      <span>Sending...</span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();

      // Trigger Confetti & Sound Feedback
      if (typeof triggerConfetti === 'function') triggerConfetti();
      if (typeof playUiSound === 'function') playUiSound('success');

      // Show success toast
      if (toast) {
        toast.className = 'form-toast success';
        toast.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong>Thank you, ${nameInput.value.trim() || 'friend'}!</strong> Your message has been prepared. I will get back to you shortly at ${emailInput.value.trim()}!
          </div>
        `;
        setTimeout(() => {
          toast.className = 'form-toast';
        }, 6000);
      }
    }, 1200);
  });
}

/* ==========================================================================
   8. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   9. PORTFOLIO AI CHATBOT SYSTEM & KNOWLEDGE BASE
   ========================================================================== */
const YUKTI_KNOWLEDGE_BASE = [
  {
    topics: ['who', 'about', 'intro', 'name', 'yukti', 'profile', 'bio', 'developer'],
    answer: `
      <p>👋 <strong>Hi there! I am Yukti's Portfolio Assistant.</strong></p>
      <p><strong>Yukti Patil</strong> is a passionate <strong>Frontend Developer</strong> and engineering student from <strong>Shirpur, Maharashtra, India</strong>.</p>
      <p>She specializes in building modern, responsive, and accessible web experiences using <strong>HTML5, CSS3, JavaScript (ES6+), React.js, and Python</strong>.</p>
      <p>💡 Feel free to ask about her <a href="#education">Education & CGPA</a>, <a href="#skills">Skills</a>, or <a href="#projects">Projects</a>!</p>
    `
  },
  {
    topics: ['college', 'education', 'degree', 'study', 'rcpit', 'cgpa', 'marks', 'academic', 'semester', 'school', 'university'],
    answer: `
      <p>🎓 <strong>Academic Credentials & Education:</strong></p>
      <ul>
        <li><strong>College:</strong> R. C. Patel Institute of Technology (RCPIT), Shirpur</li>
        <li><strong>Degree:</strong> Bachelor of Technology (B.Tech) in Engineering</li>
        <li><strong>Academic Standing:</strong> <span class="chat-badge">8.20 CGPA</span> (till 2nd semester)</li>
        <li><strong>Core Subjects:</strong> Data Structures, OOP, Web Engineering, Computational Thinking</li>
      </ul>
      <p>Yukti maintains strong academic performance alongside practical web development mastery!</p>
    `
  },
  {
    topics: ['skill', 'skills', 'stack', 'technology', 'technologies', 'react', 'javascript', 'js', 'html', 'css', 'python', 'tools', 'figma', 'git', 'github'],
    answer: `
      <p>💻 <strong>Technical Stack & Proficiencies:</strong></p>
      <p><strong>Frontend Core:</strong></p>
      <div>
        <span class="chat-badge">HTML5</span>
        <span class="chat-badge">CSS3</span>
        <span class="chat-badge">JavaScript (ES6+)</span>
        <span class="chat-badge">React.js</span>
        <span class="chat-badge">Responsive Design</span>
        <span class="chat-badge">CSS Grid/Flexbox</span>
      </div>
      <p style="margin-top:0.4rem;"><strong>Programming & Logic:</strong></p>
      <div>
        <span class="chat-badge">Python</span>
        <span class="chat-badge">Data Structures</span>
        <span class="chat-badge">DOM Manipulation</span>
      </div>
      <p style="margin-top:0.4rem;"><strong>Tools & Workflow:</strong></p>
      <div>
        <span class="chat-badge">Git</span>
        <span class="chat-badge">GitHub</span>
        <span class="chat-badge">VS Code</span>
        <span class="chat-badge">Chrome DevTools</span>
        <span class="chat-badge">Figma</span>
      </div>
    `
  },
  {
    topics: ['project', 'projects', 'work', 'shopsphere', 'devpulse', 'weather', 'weatherscope', 'portfolio', 'ecommerce'],
    answer: `
      <p>🚀 <strong>Featured Projects in Yukti's Portfolio:</strong></p>
      <ul>
        <li><strong>ShopSphere:</strong> Modern React E-Commerce UI featuring interactive cart drawer, dynamic filters, and dark/light modes.</li>
        <li><strong>DevPulse:</strong> Kanban-style task & productivity board built with pure JavaScript ES6+, HTML5 Drag & Drop, and LocalStorage.</li>
        <li><strong>WeatherScope:</strong> Real-time weather web app integrating OpenWeather REST API with dynamic glassmorphism UI.</li>
        <li><strong>Personal Portfolio:</strong> Responsive developer website featuring Dark/Light mode, colorful animated text, and this custom AI chatbot!</li>
      </ul>
      <p>👉 You can explore all details and live previews in the <a href="#projects">Projects Section</a>!</p>
    `
  },
  {
    topics: ['contact', 'email', 'mail', 'reach', 'message', 'phone', 'call', 'talk', 'connect'],
    answer: `
      <p>📬 <strong>Get In Touch with Yukti:</strong></p>
      <ul>
        <li><strong>Email:</strong> <a href="mailto:yuktip2011@gmail.com">yuktip2011@gmail.com</a></li>
        <li><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yukti-patil-9443b838a" target="_blank">linkedin.com/in/yukti-patil-9443b838a</a></li>
        <li><strong>Location:</strong> Shirpur, Maharashtra, India</li>
      </ul>
      <p>Feel free to send a message directly using the <a href="#contact">Contact Form</a> on this page!</p>
    `
  },
  {
    topics: ['linkedin', 'linkdin', 'linked in', 'profile link', 'social'],
    answer: `
      <p>🌐 <strong>LinkedIn Profile:</strong></p>
      <p>You can connect with Yukti Patil on LinkedIn here:</p>
      <p>👉 <a href="https://www.linkedin.com/in/yukti-patil-9443b838a" target="_blank" rel="noopener noreferrer"><strong>linkedin.com/in/yukti-patil-9443b838a</strong></a></p>
      <p>She actively connects with fellow developers, recruiters, and tech mentors!</p>
    `
  },
  {
    topics: ['intern', 'internship', 'hire', 'job', 'available', 'opportunity', 'freelance', 'work together', 'collaborate'],
    answer: `
      <p>💼 <strong>Availability for Internships & Projects:</strong></p>
      <p>✅ <strong>Yes! Yukti is actively seeking Frontend Developer Internships and collaborative opportunities!</strong></p>
      <p>She is prepared to contribute with clean code, dedication, and modern React/JavaScript web development skills.</p>
      <p>📧 Email her at <a href="mailto:yuktip2011@gmail.com">yuktip2011@gmail.com</a> or connect on <a href="https://www.linkedin.com/in/yukti-patil-9443b838a" target="_blank">LinkedIn</a>.</p>
    `
  },
  {
    topics: ['location', 'city', 'live', 'where', 'place', 'shirpur', 'india', 'address'],
    answer: `
      <p>📍 <strong>Location:</strong></p>
      <p>Yukti is located in <strong>Shirpur, Maharashtra, India</strong>.</p>
      <p>She is open to <strong>Remote</strong>, hybrid, and relocation opportunities for suitable roles!</p>
    `
  },
  {
    topics: ['theme', 'dark', 'light', 'mode', 'color', 'toggle', 'switch'],
    answer: `
      <p>🌓 <strong>Theme Switcher:</strong></p>
      <p>This portfolio supports both <strong>Dark Mode</strong> (default) and <strong>Light Mode</strong> with smooth transitions!</p>
      <p>Click the <strong>Sun / Moon icon</strong> at the top right of the navigation bar to switch your theme anytime. Your choice is automatically remembered!</p>
    `
  },
  {
    topics: ['hi', 'hello', 'hey', 'greetings', 'morning', 'afternoon', 'evening', 'sup', 'namaste'],
    answer: `
      <p>👋 <strong>Hello! Welcome to Yukti Patil's portfolio!</strong></p>
      <p>I'm her automated assistant. I have all details stored about her <strong>education, CGPA, projects, tech skills, and contact info</strong>.</p>
      <p>What would you like to explore today?</p>
    `
  },
  {
    topics: ['thanks', 'thank you', 'awesome', 'great', 'cool', 'nice', 'good bot', 'bye'],
    answer: `
      <p>✨ <strong>You're very welcome!</strong></p>
      <p>If you'd like to collaborate with Yukti or have any questions, feel free to reach her directly at <a href="mailto:yuktip2011@gmail.com">yuktip2011@gmail.com</a>!</p>
      <p>Have an awesome day! 🌟</p>
    `
  }
];

function initChatbot() {
  const wrapper = document.getElementById('chatbot-wrapper');
  const trigger = document.getElementById('chatbot-trigger');
  const closeBtn = document.getElementById('chatbot-close-window-btn');
  const clearBtn = document.getElementById('chatbot-clear-btn');
  const messagesBox = document.getElementById('chatbot-messages');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const chips = document.querySelectorAll('.chat-chip');

  if (!wrapper || !trigger || !messagesBox || !form || !input) return;

  function appendBotMessage(htmlContent) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble-wrap bot';
    wrap.innerHTML = `
      <div class="chat-bubble-avatar">
        <img src="assets/images/profile.jpg" alt="Yukti AI">
      </div>
      <div class="chat-bubble">
        ${htmlContent}
      </div>
    `;
    messagesBox.appendChild(wrap);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function appendUserMessage(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble-wrap user';
    wrap.innerHTML = `
      <div class="chat-bubble">
        <p>${escapeHtml(text)}</p>
      </div>
    `;
    messagesBox.appendChild(wrap);
    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  function showTypingIndicator() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble-wrap bot typing-indicator-wrap';
    wrap.innerHTML = `
      <div class="chat-bubble-avatar">
        <img src="assets/images/profile.jpg" alt="Yukti AI">
      </div>
      <div class="chat-bubble">
        <div class="chat-typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    messagesBox.appendChild(wrap);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    return wrap;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function showWelcomeMessage() {
    messagesBox.innerHTML = '';
    appendBotMessage(`
      <p>👋 <strong>Hi! I'm Yukti's Portfolio Assistant.</strong></p>
      <p>I can tell you all about Yukti's <strong>education at RCPIT (8.20 CGPA)</strong>, <strong>React & frontend skills</strong>, <strong>projects</strong>, and <strong>contact information</strong>.</p>
      <p>Feel free to click any suggestion below or type your question!</p>
    `);
  }

  function handleQuery(queryText) {
    if (!queryText.trim()) return;

    appendUserMessage(queryText);
    const typing = showTypingIndicator();

    setTimeout(() => {
      if (typing && typing.parentNode) {
        typing.parentNode.removeChild(typing);
      }

      const reply = getBotReply(queryText);
      appendBotMessage(reply);
    }, 450);
  }

  function getBotReply(userQuery) {
    const query = userQuery.toLowerCase().trim();

    let bestMatch = null;
    let highestScore = 0;

    for (const entry of YUKTI_KNOWLEDGE_BASE) {
      let score = 0;
      for (const topic of entry.topics) {
        if (query.includes(topic)) {
          score += topic.length > 3 ? 3 : 1;
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = entry;
      }
    }

    if (highestScore > 0 && bestMatch) {
      return bestMatch.answer;
    }

    return `
      <p>🤖 I'm here to help! Here is what you can ask me about Yukti:</p>
      <ul>
        <li>🎓 <strong>College & CGPA:</strong> RCPIT Shirpur, 8.20 CGPA</li>
        <li>💻 <strong>Skills:</strong> React, JavaScript, HTML/CSS, Python, Git</li>
        <li>🚀 <strong>Projects:</strong> ShopSphere, DevPulse, WeatherScope</li>
        <li>📬 <strong>Contact:</strong> Email & LinkedIn profile</li>
        <li>💼 <strong>Internships:</strong> Open for opportunities</li>
      </ul>
      <p>Click any quick topic below or ask another question!</p>
    `;
  }

  // Toggle open / close
  trigger.addEventListener('click', () => {
    wrapper.classList.toggle('is-open');
    if (wrapper.classList.contains('is-open')) {
      if (messagesBox.children.length === 0) {
        showWelcomeMessage();
      }
      setTimeout(() => input.focus(), 200);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      wrapper.classList.remove('is-open');
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      showWelcomeMessage();
    });
  }

  // Chips click handlers
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        handleQuery(query);
      }
    });
  });

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    if (val) {
      input.value = '';
      handleQuery(val);
    }
  });

  // Initial welcome message
  showWelcomeMessage();
}

/* ==========================================================================
   10. SCROLL PROGRESS BAR
   ========================================================================== */
function initScrollProgressBar() {
  const bar = document.getElementById('scroll-progress-bar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   11. MULTI-THEME PALETTES (Violet, Cyberpunk, Emerald, Sunset, Light)
   ========================================================================== */
function initThemePalettes() {
  const paletteWrapper = document.getElementById('theme-palette-wrapper');
  const paletteBtn = document.getElementById('theme-palette-btn');
  const optionBtns = document.querySelectorAll('.theme-option-btn');

  // Load saved theme palette
  const savedPalette = localStorage.getItem('theme-palette') || 'violet';
  applyTheme(savedPalette, false);

  if (paletteBtn && paletteWrapper) {
    paletteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      paletteWrapper.classList.toggle('active');
      if (typeof playUiSound === 'function') playUiSound('click');
    });

    document.addEventListener('click', (e) => {
      if (!paletteWrapper.contains(e.target)) {
        paletteWrapper.classList.remove('active');
      }
    });
  }

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTheme = btn.getAttribute('data-theme');
      applyTheme(selectedTheme, true);
      if (paletteWrapper) paletteWrapper.classList.remove('active');
      if (typeof playUiSound === 'function') playUiSound('success');
    });
  });

  function applyTheme(themeName, animate = true) {
    if (themeName === 'violet') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeName);
    }
    localStorage.setItem('theme-palette', themeName);
    localStorage.setItem('theme', themeName === 'light' ? 'light' : 'dark');

    optionBtns.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
}

/* ==========================================================================
   12. NATIVE WEB AUDIO UI FEEDBACK (No external files)
   ========================================================================== */
let isAudioMuted = localStorage.getItem('ui-audio-muted') === 'true';

function initAudioFeedback() {
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (!soundToggleBtn) return;

  if (isAudioMuted) {
    soundToggleBtn.classList.add('muted');
  }

  soundToggleBtn.addEventListener('click', () => {
    isAudioMuted = !isAudioMuted;
    localStorage.setItem('ui-audio-muted', isAudioMuted ? 'true' : 'false');
    soundToggleBtn.classList.toggle('muted', isAudioMuted);
    if (!isAudioMuted) {
      playUiSound('success');
    }
  });

  // Attach sound to common interactive clicks
  document.querySelectorAll('.btn, .nav-link, .filter-btn, .theme-toggle, .social-icon-btn, .copy-email-btn').forEach(el => {
    el.addEventListener('click', () => {
      playUiSound('click');
    });
  });
}

function playUiSound(type = 'click') {
  if (isAudioMuted) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } else if (type === 'command') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch (err) {
    // Ignore audio autoplay restrictions
  }
}

/* ==========================================================================
   13. 3D SPOTLIGHT HOVER EFFECT (Linear / Vercel style)
   ========================================================================== */
function initSpotlightCards() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   14. DEVELOPER CLI TERMINAL (yukti-cli)
   ========================================================================== */
function initDeveloperTerminal() {
  const modal = document.getElementById('terminal-modal');
  const navBtn = document.getElementById('terminal-nav-btn');
  const heroBtn = document.getElementById('hero-terminal-btn');
  const closeDot = document.getElementById('term-close-dot');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  if (!modal || !form || !input || !output) return;

  const commandHistory = [];
  let historyIndex = -1;

  function openTerminal() {
    modal.classList.add('active');
    setTimeout(() => input.focus(), 100);
    playUiSound('command');
  }

  function closeTerminal() {
    modal.classList.remove('active');
    playUiSound('click');
  }

  if (navBtn) navBtn.addEventListener('click', openTerminal);
  if (heroBtn) heroBtn.addEventListener('click', openTerminal);
  if (closeDot) closeDot.addEventListener('click', closeTerminal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeTerminal();
  });

  // Keyboard shortcut Ctrl + K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (modal.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    } else if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeTerminal();
    }
  });

  // History navigation with arrow keys
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        input.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        input.value = '';
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawCmd = input.value.trim();
    if (!rawCmd) return;

    commandHistory.push(rawCmd);
    historyIndex = -1;
    input.value = '';

    executeCommand(rawCmd);
  });

  function executeCommand(cmdStr) {
    playUiSound('command');
    const cmd = cmdStr.toLowerCase().trim();
    const parts = cmd.split(' ');
    const primary = parts[0];
    const arg = parts.slice(1).join(' ');

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="terminal-prompt-label">yukti@portfolio:~$</span> <span class="cmd-highlight">${escapeTerminal(cmdStr)}</span>`;
    output.appendChild(line);

    const response = document.createElement('div');
    response.className = 'terminal-output';

    switch (primary) {
      case 'help':
        response.innerHTML = `Available commands:
  • <span class="accent-text">about</span>        : Summary of Yukti Patil
  • <span class="accent-text">skills</span>       : View technical stack & proficiencies
  • <span class="accent-text">education</span>    : RCPIT engineering degree & CGPA
  • <span class="accent-text">projects</span>     : List of featured projects
  • <span class="accent-text">contact</span>      : Email, LinkedIn, and location
  • <span class="accent-text">theme &lt;name&gt;</span>  : Switch theme (violet, cyberpunk, emerald, sunset, light)
  • <span class="accent-text">hire</span>         : Trigger the candidate hire protocol 🎉
  • <span class="accent-text">clear</span>        : Clear terminal output
  • <span class="accent-text">exit</span>         : Close terminal`;
        break;

      case 'about':
      case 'bio':
        response.innerHTML = `Yukti Patil — Frontend Developer & Undergraduate Engineer at RCPIT Shirpur.
Specializes in crafting responsive, high-performance web applications with HTML5, CSS3, JavaScript ES6+, React, and Python.`;
        break;

      case 'education':
      case 'college':
      case 'cgpa':
        response.innerHTML = `Institution : R. C. Patel Institute of Technology (RCPIT), Shirpur
Degree      : B.Tech in Engineering / Technology
CGPA Record : <span class="success-text">8.20 / 10.0</span> (till 2nd semester)
Status      : Active Undergraduate (2024–Present)`;
        break;

      case 'skills':
      case 'stack':
        response.innerHTML = `Frontend Core   : HTML5, CSS3, JavaScript (ES6+), React.js, Responsive UI
Programming     : Python, Data Structures & Logic, DOM Events
Workflow & Dev  : Git, GitHub, VS Code, Chrome DevTools, Figma UI`;
        break;

      case 'projects':
        response.innerHTML = `1. ShopSphere    [React.js]     — E-Commerce UI with cart drawer & dynamic filters
2. DevPulse      [JavaScript]   — Kanban board with HTML5 Drag-and-Drop & LocalStorage
3. WeatherScope  [REST API]     — Live atmospheric weather forecasts with glassmorphism
4. Portfolio     [HTML/CSS/JS]  — Responsive personal site with AI Chatbot & multi-themes`;
        break;

      case 'contact':
      case 'email':
      case 'linkedin':
        response.innerHTML = `Email    : <a href="mailto:yuktip2011@gmail.com" class="accent-text">yuktip2011@gmail.com</a>
LinkedIn : <a href="https://www.linkedin.com/in/yukti-patil-9443b838a" target="_blank" class="accent-text">linkedin.com/in/yukti-patil-9443b838a</a>
Location : Shirpur, Maharashtra, India`;
        break;

      case 'theme':
        if (['violet', 'cyberpunk', 'emerald', 'sunset', 'light'].includes(arg)) {
          const btn = document.querySelector(`.theme-option-btn[data-theme="${arg}"]`);
          if (btn) btn.click();
          response.innerHTML = `<span class="success-text">✔ Theme successfully switched to '${arg}'!</span>`;
        } else {
          response.innerHTML = `Usage: theme &lt;violet | cyberpunk | emerald | sunset | light&gt;`;
        }
        break;

      case 'hire':
      case 'sudo':
        if (cmd === 'hire' || cmd === 'sudo hire' || cmd.includes('hire')) {
          triggerConfetti();
          playUiSound('success');
          response.innerHTML = `╔════════════════════════════════════════════════════════════════╗
║  <span class="success-text">🎉 INITIATING CANDIDATE HIRE PROTOCOL...</span>                          ║
║  Candidate: Yukti Patil (Frontend Developer)                   ║
║  Status   : Ready for internships & high-impact projects!      ║
║  Email    : yuktip2011@gmail.com                               ║
║  LinkedIn : linkedin.com/in/yukti-patil-9443b838a              ║
╚════════════════════════════════════════════════════════════════╝`;
        } else {
          response.innerHTML = `Command not recognized. Type 'help' for available commands.`;
        }
        break;

      case 'clear':
        output.innerHTML = '';
        return;

      case 'exit':
      case 'quit':
        closeTerminal();
        return;

      default:
        response.innerHTML = `Command not found: '<span style="color:#f85149;">${escapeTerminal(cmdStr)}</span>'. Type <span class="accent-text">'help'</span> for a list of commands.`;
        break;
    }

    output.appendChild(response);
    const body = document.getElementById('terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
  }

  function escapeTerminal(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
}

/* ==========================================================================
   15. FULLSCREEN CANVAS CONFETTI PARTICLE SYSTEM
   ========================================================================== */
function triggerConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#ec4899', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#f43f5e'];
  const particles = [];
  const particleCount = 120;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.45 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -12 - 4,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.vx *= 0.99;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0 && p.y < canvas.height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}
