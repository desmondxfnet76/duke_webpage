// ===================================
// DUKE WEBSITE - COMPLETE REWRITE
// Version 4.0 - Production Ready
// Fully Correlated with HTML & CSS
// ===================================

(function () {
  "use strict";

  // ===================================
  // CONFIGURATION & CONSTANTS
  // ===================================

  const CONFIG = {
    carouselAutoplayDelay: 5000,
    carouselPauseOnInteraction: 10000,
    notificationDuration: 5000,
    scrollThrottleDelay: 100,
    navbarScrollThreshold: 50,
    backToTopThreshold: 300,
  };

  // Gallery images configuration
  const GALLERY_IMAGES = [
    {
      src: "assets/photos/IMG_20251220_073145.jpg",
      caption: "The Distinguished Gentleman",
      alt: "Duke the Giant Schnauzer portrait",
    },
    {
      src: "assets/photos/1766523055283.jpg",
      caption: "Vocal Masterpiece",
      alt: "Duke howling majestically",
    },
    {
      src: "assets/photos/IMG_20251220_073014.jpg",
      caption: "Close & Personal",
      alt: "Duke close-up portrait",
    },
    {
      src: "assets/photos/IMG_20251220_073259.jpg",
      caption: "Perfect Stance",
      alt: "Duke showing perfect conformation",
    },
    {
      src: "assets/photos/IMG_20251220_073310.jpg",
      caption: "The Full Package",
      alt: "Duke full body professional shot",
    },
  ];

  // ===================================
  // DOM ELEMENT CACHE
  // ===================================

  const DOM = {
    // Navigation
    navbar: null,
    hamburger: null,
    mobileMenu: null,
    mobileLinks: [],
    navLinks: [],

    // Gallery
    mainImage: null,
    imageCaption: null,
    prevBtn: null,
    nextBtn: null,
    thumbnails: [],
    indicators: [],
    carouselMain: null,

    // Contact Form
    contactForm: null,
    nameInput: null,
    emailInput: null,
    phoneInput: null,
    messageInput: null,

    // Other
    backToTop: null,
    yearSpan: null,
    hero: null,
    progressBar: null,
  };

  // ===================================
  // STATE MANAGEMENT
  // ===================================

  const STATE = {
    currentImageIndex: 0,
    isAutoplayPaused: false,
    autoplayInterval: null,
    touchStartX: 0,
    touchEndX: 0,
    scrollTicking: false,
    easterEggClicks: 0,
  };

  // ===================================
  // INITIALIZATION
  // ===================================

  function init() {
    console.log(
      "%c🐕 DUKE WEBSITE V4.0 - PRODUCTION READY",
      "background: #E63946; color: white; font-size: 18px; padding: 12px 20px; font-weight: bold; border-radius: 8px;"
    );

    // Cache DOM elements
    cacheDOMElements();

    // Initialize features
    initNavigation();
    initGallery();
    initContactForm();
    initScrollEffects();
    initBackToTop();
    initFooter();
    initAnimations();

    // Performance monitoring
    monitorPerformance();

    console.log(
      "%c✅ All features initialized successfully!",
      "color: #10b981; font-size: 14px; font-weight: bold;"
    );
  }

  // ===================================
  // DOM CACHING
  // ===================================

  function cacheDOMElements() {
    // Navigation
    DOM.navbar = document.getElementById("navbar");
    DOM.hamburger = document.getElementById("hamburger");
    DOM.mobileMenu = document.getElementById("mobileMenu");
    DOM.mobileLinks = Array.from(document.querySelectorAll(".mobile-link"));
    DOM.navLinks = Array.from(document.querySelectorAll(".nav-links a"));

    // Gallery
    DOM.mainImage = document.getElementById("mainImage");
    DOM.imageCaption = document.getElementById("imageCaption");
    DOM.prevBtn = document.getElementById("prevBtn");
    DOM.nextBtn = document.getElementById("nextBtn");
    DOM.thumbnails = Array.from(document.querySelectorAll(".thumbnail"));
    DOM.indicators = Array.from(document.querySelectorAll(".indicator"));
    DOM.carouselMain = document.querySelector(".carousel-main");

    // Contact Form
    DOM.contactForm = document.getElementById("contactForm");
    DOM.nameInput = document.getElementById("name");
    DOM.emailInput = document.getElementById("email");
    DOM.phoneInput = document.getElementById("phone");
    DOM.messageInput = document.getElementById("message");

    // Other
    DOM.backToTop = document.getElementById("backToTop");
    DOM.yearSpan = document.getElementById("year");
    DOM.hero = document.querySelector(".hero");

    // Log missing critical elements
    logMissingElements();
  }

  function logMissingElements() {
    const critical = {
      navbar: DOM.navbar,
      hamburger: DOM.hamburger,
      mobileMenu: DOM.mobileMenu,
    };

    const missing = Object.keys(critical).filter((key) => !critical[key]);

    if (missing.length > 0) {
      console.warn(
        `%c⚠️ Missing critical elements: ${missing.join(", ")}`,
        "color: #F59E0B; font-weight: bold;"
      );
      console.log(
        "%c💡 Check your HTML for these element IDs",
        "color: #9CA3AF;"
      );
    }
  }

  // ===================================
  // NAVIGATION MODULE
  // ===================================

  function initNavigation() {
    if (!DOM.navbar || !DOM.hamburger || !DOM.mobileMenu) {
      console.warn("⚠️ Navigation elements missing - skipping initialization");
      return;
    }

    console.log("✓ Navigation initialized");

    // Sticky navbar on scroll
    window.addEventListener(
      "scroll",
      throttle(handleNavbarScroll, CONFIG.scrollThrottleDelay)
    );

    // Mobile menu toggle
    DOM.hamburger.addEventListener("click", toggleMobileMenu);

    // Close menu on link click
    DOM.mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    // Close menu on outside click
    document.addEventListener("click", handleOutsideClick);

    // Smooth scrolling
    setupSmoothScrolling();

    // Active link highlighting
    window.addEventListener(
      "scroll",
      throttle(updateActiveNavLink, CONFIG.scrollThrottleDelay)
    );
  }

  function handleNavbarScroll() {
    if (!DOM.navbar) return;

    if (window.scrollY > CONFIG.navbarScrollThreshold) {
      DOM.navbar.classList.add("scrolled");
    } else {
      DOM.navbar.classList.remove("scrolled");
    }
  }

  function toggleMobileMenu() {
    const isActive = DOM.mobileMenu.classList.contains("active");
    const isExpanded = DOM.hamburger.getAttribute("aria-expanded") === "true";

    DOM.hamburger.classList.toggle("active");
    DOM.mobileMenu.classList.toggle("active");
    DOM.hamburger.setAttribute("aria-expanded", !isExpanded);
    DOM.mobileMenu.setAttribute("aria-hidden", isExpanded);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? "" : "hidden";
  }

  function closeMobileMenu() {
    if (!DOM.hamburger || !DOM.mobileMenu) return;

    DOM.hamburger.classList.remove("active");
    DOM.mobileMenu.classList.remove("active");
    DOM.hamburger.setAttribute("aria-expanded", "false");
    DOM.mobileMenu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function handleOutsideClick(e) {
    if (!DOM.hamburger || !DOM.mobileMenu) return;

    const isMenuActive = DOM.mobileMenu.classList.contains("active");
    const clickedInside =
      DOM.hamburger.contains(e.target) || DOM.mobileMenu.contains(e.target);

    if (isMenuActive && !clickedInside) {
      closeMobileMenu();
    }
  }

  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");

        if (!href || href === "#") return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const navbarHeight = DOM.navbar ? DOM.navbar.offsetHeight : 80;
          const targetPosition = target.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Add ripple effect to buttons
          if (this.classList.contains("btn-pill")) {
            createRipple(e, this);
          }

          // Close mobile menu if open
          closeMobileMenu();
        }
      });
    });
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remove active from all
        DOM.navLinks.forEach((link) => link.classList.remove("active"));

        // Add active to current
        const activeLink = document.querySelector(
          `.nav-links a[href="#${sectionId}"]`
        );
        if (activeLink && !activeLink.classList.contains("btn-pill")) {
          activeLink.classList.add("active");
        }
      }
    });
  }

  function createRipple(event, element) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    // Ensure parent positioning
    const position = window.getComputedStyle(element).position;
    if (position === "static") {
      element.style.position = "relative";
    }
    element.style.overflow = "hidden";

    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // ===================================
  // GALLERY CAROUSEL MODULE
  // ===================================

  function initGallery() {
    if (!DOM.mainImage || !DOM.prevBtn || !DOM.nextBtn) {
      console.warn("⚠️ Gallery elements missing - skipping initialization");
      return;
    }

    console.log("✓ Gallery carousel initialized");

    // Set initial image
    updateCarousel(0);

    // Navigation buttons
    DOM.prevBtn.addEventListener("click", () => navigateCarousel(-1));
    DOM.nextBtn.addEventListener("click", () => navigateCarousel(1));

    // Thumbnails
    DOM.thumbnails.forEach((thumb, index) => {
      thumb.addEventListener("click", () => {
        updateCarousel(index);
        pauseAutoplayTemporarily();
      });
    });

    // Indicators
    DOM.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        updateCarousel(index);
        pauseAutoplayTemporarily();
      });
    });

    // Keyboard navigation
    document.addEventListener("keydown", handleCarouselKeyboard);

    // Touch/swipe support
    setupTouchNavigation();

    // Autoplay
    startAutoplay();

    // Pause on tab visibility change
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Preload images
    preloadImages();

    // Set transition
    DOM.mainImage.style.transition = "opacity 0.3s ease";
  }

  function navigateCarousel(direction) {
    const newIndex = STATE.currentImageIndex + direction;
    updateCarousel(newIndex);
    pauseAutoplayTemporarily();
  }

  function updateCarousel(index) {
    // Ensure index is within bounds
    STATE.currentImageIndex =
      ((index % GALLERY_IMAGES.length) + GALLERY_IMAGES.length) %
      GALLERY_IMAGES.length;

    const image = GALLERY_IMAGES[STATE.currentImageIndex];

    // Fade out
    DOM.mainImage.style.opacity = "0";

    setTimeout(() => {
      // Update image
      DOM.mainImage.src = image.src;
      DOM.mainImage.alt = image.alt;

      if (DOM.imageCaption) {
        DOM.imageCaption.textContent = image.caption;
      }

      // Fade in
      DOM.mainImage.style.opacity = "1";
    }, 300);

    // Update thumbnails
    DOM.thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === STATE.currentImageIndex);
      thumb.setAttribute("aria-selected", i === STATE.currentImageIndex);
    });

    // Update indicators
    DOM.indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === STATE.currentImageIndex);
    });

    // Reset autoplay
    if (!STATE.isAutoplayPaused) {
      resetAutoplay();
    }
  }

  function handleCarouselKeyboard(e) {
    const gallerySection = document.getElementById("gallery");
    if (!gallerySection || !isInViewport(gallerySection)) return;

    if (e.key === "ArrowLeft") {
      navigateCarousel(-1);
    } else if (e.key === "ArrowRight") {
      navigateCarousel(1);
    }
  }

  function setupTouchNavigation() {
    if (!DOM.carouselMain) return;

    DOM.carouselMain.addEventListener(
      "touchstart",
      (e) => {
        STATE.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    DOM.carouselMain.addEventListener(
      "touchend",
      (e) => {
        STATE.touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = STATE.touchStartX - STATE.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      navigateCarousel(diff > 0 ? 1 : -1);
    }
  }

  function startAutoplay() {
    stopAutoplay();
    STATE.autoplayInterval = setInterval(() => {
      navigateCarousel(1);
    }, CONFIG.carouselAutoplayDelay);
  }

  function stopAutoplay() {
    if (STATE.autoplayInterval) {
      clearInterval(STATE.autoplayInterval);
      STATE.autoplayInterval = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    if (!STATE.isAutoplayPaused) {
      startAutoplay();
    }
  }

  function pauseAutoplayTemporarily() {
    stopAutoplay();
    setTimeout(() => {
      if (!STATE.isAutoplayPaused) {
        startAutoplay();
      }
    }, CONFIG.carouselPauseOnInteraction);
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      stopAutoplay();
    } else if (!STATE.isAutoplayPaused) {
      startAutoplay();
    }
  }

  function preloadImages() {
    GALLERY_IMAGES.forEach((image) => {
      const img = new Image();
      img.src = image.src;
    });
  }

  // ===================================
  // CONTACT FORM MODULE
  // ===================================

  function initContactForm() {
    if (!DOM.contactForm) {
      console.warn("⚠️ Contact form not found");
      return;
    }

    console.log("✓ Contact form initialized");

    // Get all form inputs
    const formInputs = DOM.contactForm.querySelectorAll("input, textarea");

    // Floating label effects
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => handleInputFocus(input, true));
      input.addEventListener("blur", () => handleInputFocus(input, false));

      // Set initial state
      if (input.value) {
        handleInputFocus(input, true);
      }
    });

    // Email validation
    if (DOM.emailInput) {
      DOM.emailInput.addEventListener("blur", () =>
        validateEmail(DOM.emailInput)
      );
      DOM.emailInput.addEventListener("input", () => {
        if (DOM.emailInput.value) validateEmail(DOM.emailInput);
      });
    }

    // Phone formatting
    if (DOM.phoneInput) {
      DOM.phoneInput.addEventListener("input", () =>
        formatPhoneNumber(DOM.phoneInput)
      );
    }

    // Form submission
    DOM.contactForm.addEventListener("submit", handleFormSubmit);
  }

  function handleInputFocus(input, isFocused) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    if (isFocused || input.value) {
      formGroup.classList.add("focused");
    } else {
      formGroup.classList.remove("focused");
    }
  }

  function validateEmail(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(input.value);

    if (input.value && !isValid) {
      input.style.borderColor = "#E63946";
      showFieldError(input, "Please enter a valid email address");
      return false;
    } else {
      input.style.borderColor = "rgba(196, 196, 196, 0.2)";
      hideFieldError(input);
      return true;
    }
  }

  function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, "");
    value = value.substring(0, 10); // Limit to 10 digits

    if (value.length > 0) {
      if (value.length <= 3) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
      } else {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
      }
    }

    input.value = value;
  }

  function showFieldError(input, message) {
    hideFieldError(input);

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.style.color = "#E63946";
    errorDiv.style.fontSize = "0.75rem";
    errorDiv.style.marginTop = "0.5rem";
    errorDiv.textContent = message;

    const formGroup = input.closest(".form-group");
    if (formGroup) {
      formGroup.appendChild(errorDiv);
    }
  }

  function hideFieldError(input) {
    const formGroup = input.closest(".form-group");
    if (formGroup) {
      const errorDiv = formGroup.querySelector(".error-message");
      if (errorDiv) errorDiv.remove();
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    // Clear previous errors
    const formInputs = DOM.contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.style.borderColor = "rgba(196, 196, 196, 0.2)";
      hideFieldError(input);
    });

    // Validate all fields
    let isValid = true;
    const errors = [];

    if (!DOM.nameInput?.value?.trim()) {
      isValid = false;
      DOM.nameInput.style.borderColor = "#E63946";
      showFieldError(DOM.nameInput, "Name is required");
      errors.push("name");
    }

    if (!DOM.emailInput?.value?.trim()) {
      isValid = false;
      DOM.emailInput.style.borderColor = "#E63946";
      showFieldError(DOM.emailInput, "Email is required");
      errors.push("email");
    } else if (!validateEmail(DOM.emailInput)) {
      isValid = false;
      errors.push("email format");
    }

    if (!DOM.messageInput?.value?.trim()) {
      isValid = false;
      DOM.messageInput.style.borderColor = "#E63946";
      showFieldError(DOM.messageInput, "Message is required");
      errors.push("message");
    }

    if (!isValid) {
      showNotification("Please fill in all required fields correctly", "error");
      return;
    }

    // Collect form data
    const formData = {
      name: DOM.nameInput.value.trim(),
      email: DOM.emailInput.value.trim(),
      phone: DOM.phoneInput?.value || "",
      message: DOM.messageInput.value.trim(),
      timestamp: new Date().toISOString(),
    };

    // Show loading state
    const submitBtn = DOM.contactForm.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector(".btn-text");
    const btnLoading = submitBtn.querySelector(".btn-loading");

    if (btnText) btnText.style.display = "none";
    if (btnLoading) btnLoading.style.display = "inline";
    submitBtn.disabled = true;

    // Simulate submission (replace with actual API call)
    setTimeout(() => {
      console.log("📧 Form submitted:", formData);

      // Show success
      showNotification(
        "Thank you for your inquiry! We'll get back to you within 24 hours.",
        "success"
      );

      // Reset form
      DOM.contactForm.reset();

      // Reset button
      if (btnText) btnText.style.display = "inline";
      if (btnLoading) btnLoading.style.display = "none";
      submitBtn.disabled = false;

      // Remove focused states
      formInputs.forEach((input) => {
        const formGroup = input.closest(".form-group");
        if (formGroup) formGroup.classList.remove("focused");
      });

      // Scroll to top of form
      DOM.contactForm.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 2000);

    /* FOR PRODUCTION - Replace above with:
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      showNotification('Thank you! We will contact you soon.', 'success');
      DOM.contactForm.reset();
    })
    .catch(error => {
      console.error('Form error:', error);
      showNotification('Oops! There was a problem. Please try again.', 'error');
    })
    .finally(() => {
      // Reset button state
    });
    */
  }

  // ===================================
  // NOTIFICATION SYSTEM
  // ===================================

  function showNotification(message, type = "success") {
    // Remove existing
    const existing = document.querySelector(".custom-notification");
    if (existing) existing.remove();

    const notification = document.createElement("div");
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === "success" ? "✓" : "✕"}</span>
        <span class="notification-message">${message}</span>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#E63946"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 400px;
      cursor: pointer;
    `;

    document.body.appendChild(notification);

    // Auto-hide
    const hideTimeout = setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, CONFIG.notificationDuration);

    // Click to close
    notification.addEventListener("click", () => {
      clearTimeout(hideTimeout);
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    });
  }

  // ===================================
  // SCROLL EFFECTS MODULE
  // ===================================

  function initScrollEffects() {
    console.log("✓ Scroll effects initialized");

    // Create progress bar
    createProgressBar();

    // Parallax effect
    if (DOM.hero) {
      window.addEventListener("scroll", handleParallax);
    }

    // Scroll animations
    setupScrollAnimations();
  }

  function createProgressBar() {
    DOM.progressBar = document.createElement("div");
    DOM.progressBar.className = "scroll-progress";
    DOM.progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #E63946, #ff6b6b, #f7e7ce);
      width: 0%;
      z-index: 9999;
      transition: width 0.1s ease;
      box-shadow: 0 0 10px rgba(230, 57, 70, 0.6);
    `;
    document.body.appendChild(DOM.progressBar);

    window.addEventListener("scroll", throttle(updateProgressBar, 50));
  }

  function updateProgressBar() {
    if (!DOM.progressBar) return;

    const windowHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    DOM.progressBar.style.width = Math.min(Math.max(scrolled, 0), 100) + "%";
  }

  function handleParallax() {
    if (!STATE.scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;

        if (DOM.hero && scrolled < window.innerHeight) {
          DOM.hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        STATE.scrollTicking = false;
      });
      STATE.scrollTicking = true;
    }
  }

  function setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add("animated");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".fact-card, .service-card, .testimonial-card, .section-header, .stat-box"
    );

    elements.forEach((element, index) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = `opacity 0.6s ease ${
        index * 0.1
      }s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(element);
    });
  }

  // ===================================
  // BACK TO TOP BUTTON
  // ===================================

  function initBackToTop() {
    if (!DOM.backToTop) {
      console.warn("⚠️ Back to top button not found");
      return;
    }

    console.log("✓ Back to top button initialized");

    window.addEventListener("scroll", throttle(handleBackToTopVisibility, 100));
    DOM.backToTop.addEventListener("click", scrollToTop);
  }

  function handleBackToTopVisibility() {
    if (!DOM.backToTop) return;

    if (window.scrollY > CONFIG.backToTopThreshold) {
      DOM.backToTop.classList.add("visible");
      DOM.backToTop.style.display = "block";
    } else {
      DOM.backToTop.classList.remove("visible");
      setTimeout(() => {
        if (!DOM.backToTop.classList.contains("visible")) {
          DOM.backToTop.style.display = "none";
        }
      }, 300);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ===================================
  // FOOTER MODULE
  // ===================================

  function initFooter() {
    if (!DOM.yearSpan) {
      console.warn("⚠️ Year span not found");
      return;
    }

    console.log("✓ Footer initialized");

    // Set current year
    DOM.yearSpan.textContent = new Date().getFullYear();

    // Easter egg
    DOM.yearSpan.style.cursor = "pointer";
    DOM.yearSpan.style.userSelect = "none";
    DOM.yearSpan.addEventListener("click", handleEasterEgg);
  }

  function handleEasterEgg() {
    STATE.easterEggClicks++;

    if (STATE.easterEggClicks === 5) {
      showNotification(
        "🐕 Duke says WOOF! You found the easter egg! 🎉",
        "success"
      );

      // Add pulse animation
      DOM.yearSpan.style.animation = "pulse 0.5s ease";
      setTimeout(() => {
        DOM.yearSpan.style.animation = "";
      }, 500);

      STATE.easterEggClicks = 0;
    }
  }

  // ===================================
  // ANIMATIONS MODULE
  // ===================================

  function initAnimations() {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }

      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
      }

      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .notification-icon {
        font-size: 1.25rem;
        font-weight: bold;
      }

      .custom-notification:hover {
        opacity: 0.95;
      }
    `;
    document.head.appendChild(style);
  }

  // ===================================
  // UTILITY FUNCTIONS
  // ===================================

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // ===================================
  // PERFORMANCE MONITORING
  // ===================================

  function monitorPerformance() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");

      if (performance.timing) {
        const loadTime =
          performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(
          `%c⚡ Page loaded in ${loadTime}ms`,
          "color: #10b981; font-weight: bold;"
        );
      }

      // Log feature status
      logFeatureStatus();
    });
  }

  function logFeatureStatus() {
    console.log(
      "%c📊 Feature Status:",
      "color: #FFD700; font-size: 12px; font-weight: bold;"
    );

    const features = {
      Navigation: !!(DOM.navbar && DOM.hamburger && DOM.mobileMenu),
      Gallery: !!(DOM.mainImage && DOM.prevBtn && DOM.nextBtn),
      "Contact Form": !!DOM.contactForm,
      "Back to Top": !!DOM.backToTop,
      Footer: !!DOM.yearSpan,
      "Scroll Effects": !!DOM.progressBar,
    };

    Object.entries(features).forEach(([name, status]) => {
      console.log(
        `  ${status ? "✅" : "❌"} ${name}`,
        status ? "color: #10b981;" : "color: #EF4444;"
      );
    });
  }

  // ===================================
  // START APPLICATION
  // ===================================

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
// ===================================
// ENHANCED GALLERY & CONTACT SECTIONS
// Scroll Animations & Interactive Features
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log(
    "%c📸 Enhanced Gallery & Contact Loaded",
    "color: #E63946; font-size: 14px; font-weight: bold;"
  );

  // ===================================
  // GALLERY SCROLL ANIMATIONS
  // ===================================

  function initGalleryScrollAnimations() {
    const galleryItems = document.querySelectorAll(".gallery-photo-wrapper");

    if (galleryItems.length === 0) {
      console.warn("⚠️ No gallery items found");
      return;
    }

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for sequential animation
          setTimeout(() => {
            entry.target.classList.add("in-view");
          }, index * 150);
        }
      });
    }, observerOptions);

    galleryItems.forEach((item) => {
      observer.observe(item);
    });

    console.log("✓ Gallery scroll animations initialized");
  }

  // ===================================
  // GALLERY FILTERING
  // ===================================

  function initGalleryFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-photo-wrapper");

    if (filterButtons.length === 0 || galleryItems.length === 0) {
      return;
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active to clicked button
        this.classList.add("active");

        // Get filter value
        const filter = this.dataset.filter;

        // Filter items
        galleryItems.forEach((item) => {
          const categories = item.dataset.category || "";

          if (filter === "all" || categories.includes(filter)) {
            item.classList.remove("hidden");
            item.classList.remove("in-view"); // Reset animation

            // Retrigger animation
            setTimeout(() => {
              item.classList.add("in-view");
            }, 100);
          } else {
            item.classList.add("hidden");
          }
        });
      });
    });

    console.log("✓ Gallery filtering initialized");
  }

  // ===================================
  // LIGHTBOX FUNCTIONALITY
  // ===================================

  function initLightbox() {
    const expandButtons = document.querySelectorAll(".photo-expand");
    const lightbox = document.getElementById("galleryLightbox");

    if (!lightbox || expandButtons.length === 0) {
      return;
    }

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCategory = lightbox.querySelector(".lightbox-category");
    const lightboxTitle = lightbox.querySelector(".lightbox-title");
    const lightboxDescription = lightbox.querySelector(".lightbox-description");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");

    let currentPhotoIndex = 0;
    const photos = [];

    // Collect photo data
    expandButtons.forEach((button, index) => {
      const photoCard = button.closest(".gallery-photo-wrapper");
      const img = photoCard.querySelector("img");
      const category = photoCard.querySelector(".photo-category");
      const title = photoCard.querySelector(".photo-title");
      const description = photoCard.querySelector(".photo-description");

      photos.push({
        src: img.src,
        alt: img.alt,
        category: category ? category.textContent : "",
        title: title ? title.textContent : "",
        description: description ? description.textContent : "",
      });

      button.addEventListener("click", function (e) {
        e.stopPropagation();
        openLightbox(index);
      });
    });

    function openLightbox(index) {
      currentPhotoIndex = index;
      updateLightboxContent();
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function updateLightboxContent() {
      const photo = photos[currentPhotoIndex];
      lightboxImage.src = photo.src;
      lightboxImage.alt = photo.alt;
      lightboxCategory.textContent = photo.category;
      lightboxTitle.textContent = photo.title;
      lightboxDescription.textContent = photo.description;
    }

    function navigateLightbox(direction) {
      if (direction === "next") {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
      } else {
        currentPhotoIndex =
          (currentPhotoIndex - 1 + photos.length) % photos.length;
      }
      updateLightboxContent();
    }

    // Event listeners
    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => navigateLightbox("prev"));
    nextBtn.addEventListener("click", () => navigateLightbox("next"));

    // Close on background click
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", function (e) {
      if (lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
        else if (e.key === "ArrowLeft") navigateLightbox("prev");
        else if (e.key === "ArrowRight") navigateLightbox("next");
      }
    });

    console.log("✓ Lightbox initialized");
  }

  // ===================================
  // ENHANCED CONTACT FORM
  // ===================================

  function initEnhancedContactForm() {
    const form = document.getElementById("contactForm");

    if (!form) {
      console.warn("⚠️ Contact form not found");
      return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const serviceInput = document.getElementById("service");
    const messageInput = document.getElementById("message");
    const privacyCheckbox = document.getElementById("privacy");
    const charCount = document.getElementById("charCount");
    const formStatus = document.getElementById("formStatus");

    // Character counter for message
    if (messageInput && charCount) {
      messageInput.addEventListener("input", function () {
        const count = this.value.length;
        charCount.textContent = count;

        if (count > 500) {
          charCount.style.color = "#E63946";
        } else {
          charCount.style.color = "";
        }
      });
    }

    // Phone number formatting
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        let value = this.value.replace(/\D/g, "");
        value = value.substring(0, 10);

        if (value.length > 0) {
          if (value.length <= 3) {
            value = `(${value}`;
          } else if (value.length <= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
          } else {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
              6
            )}`;
          }
        }

        this.value = value;
      });
    }

    // Email validation
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    // Real-time email validation
    if (emailInput) {
      emailInput.addEventListener("blur", function () {
        if (this.value && !validateEmail(this.value)) {
          this.style.borderColor = "#E63946";
          showFieldError(this, "Please enter a valid email address");
        } else {
          this.style.borderColor = "";
          hideFieldError(this);
        }
      });
    }

    function showFieldError(input, message) {
      hideFieldError(input);
      const errorDiv = document.createElement("div");
      errorDiv.className = "field-error";
      errorDiv.style.color = "#E63946";
      errorDiv.style.fontSize = "0.75rem";
      errorDiv.style.marginTop = "0.5rem";
      errorDiv.textContent = message;
      input.closest(".form-field").appendChild(errorDiv);
    }

    function hideFieldError(input) {
      const errorDiv = input
        .closest(".form-field")
        .querySelector(".field-error");
      if (errorDiv) errorDiv.remove();
    }

    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear previous errors
      document.querySelectorAll(".field-error").forEach((err) => err.remove());
      document.querySelectorAll(".form-input").forEach((input) => {
        input.style.borderColor = "";
      });

      // Validate
      let isValid = true;
      let errors = [];

      if (!nameInput.value.trim()) {
        isValid = false;
        nameInput.style.borderColor = "#E63946";
        showFieldError(nameInput, "Name is required");
        errors.push("name");
      }

      if (!emailInput.value.trim()) {
        isValid = false;
        emailInput.style.borderColor = "#E63946";
        showFieldError(emailInput, "Email is required");
        errors.push("email");
      } else if (!validateEmail(emailInput.value)) {
        isValid = false;
        emailInput.style.borderColor = "#E63946";
        showFieldError(emailInput, "Please enter a valid email");
        errors.push("email format");
      }

      if (!serviceInput.value) {
        isValid = false;
        serviceInput.style.borderColor = "#E63946";
        showFieldError(serviceInput, "Please select a service");
        errors.push("service");
      }

      if (!messageInput.value.trim()) {
        isValid = false;
        messageInput.style.borderColor = "#E63946";
        showFieldError(messageInput, "Message is required");
        errors.push("message");
      }

      if (!privacyCheckbox.checked) {
        isValid = false;
        showFieldError(privacyCheckbox, "You must agree to the privacy policy");
        errors.push("privacy");
      }

      if (!isValid) {
        showFormStatus("Please correct the errors above", "error");
        return;
      }

      // Collect form data
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value || "",
        service: serviceInput.value,
        message: messageInput.value.trim(),
        timestamp: new Date().toISOString(),
      };

      // Show loading
      const submitBtn = form.querySelector(".form-submit-premium");
      const btnText = submitBtn.querySelector(".btn-text");
      const btnLoading = submitBtn.querySelector(".btn-loading");

      btnText.style.display = "none";
      btnLoading.style.display = "flex";
      submitBtn.disabled = true;

      // Simulate submission (replace with actual API call)
      setTimeout(() => {
        console.log("📧 Form submitted:", formData);

        showFormStatus(
          "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
          "success"
        );

        // Reset form
        form.reset();
        if (charCount) charCount.textContent = "0";

        // Reset button
        btnText.style.display = "flex";
        btnLoading.style.display = "none";
        submitBtn.disabled = false;

        // Scroll to status
        formStatus.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 2000);

      /* FOR PRODUCTION - Replace above with:
      fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        showFormStatus('Thank you! We will contact you soon.', 'success');
        form.reset();
      })
      .catch(error => {
        console.error('Form error:', error);
        showFormStatus('Oops! There was a problem. Please try again.', 'error');
      })
      .finally(() => {
        // Reset button state
      });
      */
    });

    function showFormStatus(message, type) {
      if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = "block";

        setTimeout(() => {
          formStatus.style.display = "none";
        }, 10000);
      }
    }

    console.log("✓ Enhanced contact form initialized");
  }

  // ===================================
  // INITIALIZE ALL FEATURES
  // ===================================

  initGalleryScrollAnimations();
  initGalleryFilter();
  initLightbox();
  initEnhancedContactForm();

  console.log(
    "%c✅ All enhanced features initialized!",
    "color: #10b981; font-weight: bold;"
  );
});

// ===================================
// END OF SCRIPT
// ===================================
