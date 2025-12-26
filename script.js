// ===================================
// DUKE WEBSITE - JAVASCRIPT
// Red, Black, White Theme
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  // ===================================
  // NAVIGATION - Sticky Nav & Mobile Menu
  // ===================================

  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Make navbar sticky on scroll
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // ===================================
  // SMOOTH SCROLLING
  // ===================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        const navbarHeight = 80;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===================================
  // GALLERY CAROUSEL
  // ===================================

  const images = [
    {
      src: "images/IMG_20251220_073145.jpg",
      caption: "The Distinguished Gentleman",
    },
    {
      src: "images/1766523055283.jpg",
      caption: "Vocal Masterpiece",
    },
    {
      src: "images/IMG_20251220_073014.jpg",
      caption: "Close & Personal",
    },
    {
      src: "images/IMG_20251220_073259.jpg",
      caption: "Perfect Stance",
    },
    {
      src: "images/IMG_20251220_073310.jpg",
      caption: "The Full Package",
    },
  ];

  let currentImageIndex = 0;

  const mainImage = document.getElementById("mainImage");
  const imageCaption = document.getElementById("imageCaption");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const thumbnails = document.querySelectorAll(".thumbnail");
  const indicators = document.querySelectorAll(".indicator");

  // Function to update carousel to specific index
  function updateCarousel(index) {
    currentImageIndex = index;

    // Fade out current image
    mainImage.style.opacity = "0";

    // Update image and caption after fade
    setTimeout(() => {
      mainImage.src = images[index].src;
      mainImage.alt = images[index].caption;
      imageCaption.textContent = images[index].caption;
      mainImage.style.opacity = "1";
    }, 300);

    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
      if (i === index) {
        thumb.classList.add("active");
      } else {
        thumb.classList.remove("active");
      }
    });

    // Update active indicator
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add("active");
      } else {
        indicator.classList.remove("active");
      }
    });
  }

  // Previous button click
  prevBtn.addEventListener("click", function () {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateCarousel(newIndex);
  });

  // Next button click
  nextBtn.addEventListener("click", function () {
    const newIndex = (currentImageIndex + 1) % images.length;
    updateCarousel(newIndex);
  });

  // Thumbnail clicks
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener("click", function () {
      updateCarousel(index);
    });
  });

  // Indicator clicks
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      updateCarousel(index);
    });
  });

  // Keyboard navigation (arrow keys)
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    }
  });

  // Optional: Auto-play carousel (uncomment to enable)
  /*
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(function() {
            const newIndex = (currentImageIndex + 1) % images.length;
            updateCarousel(newIndex);
        }, 5000); // Change image every 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay when user interacts
    prevBtn.addEventListener('click', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 10000); // Resume after 10 seconds
    });
    
    nextBtn.addEventListener('click', function() {
        stopAutoplay();
        setTimeout(startAutoplay, 10000);
    });
    */

  // ===================================
  // CONTACT FORM
  // ===================================

  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
    };

    // Log to console (for testing)
    console.log("Form Data:", formData);

    // Show success message
    alert("Thank you for your inquiry! We will get back to you soon.");

    // Reset form
    contactForm.reset();

    // ===================================
    // TO CONNECT TO EMAIL SERVICE:
    // ===================================
    // Replace the alert above with one of these options:

    // OPTION 1: Use Formspree (easiest)
    /*
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! We will contact you soon.');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem. Please try again.');
        });
        */

    // OPTION 2: Use your own backend API
    /*
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Thank you! We will contact you soon.');
            contactForm.reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem. Please try again.');
        });
        */

    // OPTION 3: Send to email using EmailJS
    /*
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(function(response) {
                alert('Thank you! We will contact you soon.');
                contactForm.reset();
            }, function(error) {
                alert('Oops! There was a problem. Please try again.');
            });
        */
  });

  // ===================================
  // SCROLL ANIMATIONS
  // ===================================

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll(
    ".fact-card, .service-card, .testimonial-card"
  );
  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });

  // ===================================
  // FOOTER YEAR
  // ===================================

  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ===================================
  // IMAGE TRANSITIONS
  // ===================================

  // Add smooth transition to main carousel image
  if (mainImage) {
    mainImage.style.transition = "opacity 0.3s ease";
  }

  // Preload all images for smoother transitions
  images.forEach(function (image) {
    const img = new Image();
    img.src = image.src;
  });

  // ===================================
  // PARALLAX EFFECT (Optional)
  // ===================================

  // Uncomment to enable parallax scrolling on hero
  /*
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
    */

  // ===================================
  // LOADING INDICATOR
  // ===================================

  // Hide loading indicator when page is fully loaded
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // ===================================
  // CONSOLE MESSAGE
  // ===================================

  console.log(
    "%c🐕 DUKE WEBSITE LOADED SUCCESSFULLY! ",
    "background: #E63946; color: white; font-size: 16px; padding: 10px; font-weight: bold;"
  );
  console.log(
    "%cPowered by Duke Swagger 💪",
    "color: #E63946; font-size: 12px; font-weight: bold;"
  );
  console.log(
    "%cNeed to customize? Edit js/script.js",
    "color: #C4C4C4; font-size: 10px;"
  );

  // ===================================
  // PERFORMANCE MONITORING (Optional)
  // ===================================

  // Log page load time
  window.addEventListener("load", function () {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`%cPage loaded in ${loadTime}ms`, "color: #00ff00;");
  });
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Debounce function for scroll events (improves performance)
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events (alternative to debounce)
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
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
// END OF SCRIPT
// ===================================
