// Import PWA registration
import './pwa-register';

// Modern JavaScript features
const doc = document.documentElement;

// Remove no-js class and add js class
doc.classList.remove('no-js');
doc.classList.add('js');

// Theme handling
const theme = localStorage.getItem('theme') || 'light';
doc.setAttribute('data-theme', theme);

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = doc.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    doc.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// Reveal animations
if (document.body.classList.contains('has-animations')) {
  /* global ScrollReveal */
  const sr = window.sr = ScrollReveal();

  sr.reveal('.feature, .testimonial', {
    duration: 600,
    distance: '50px',
    easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
    origin: 'bottom',
    interval: 100
  });

  /* global anime */
  const heroAnimation = anime.timeline({ autoplay: false });
  const strokedElement = document.querySelector('.stroke-animation');

  if (strokedElement) {
    strokedElement.setAttribute('stroke-dashoffset', anime.setDashoffset(strokedElement));

    heroAnimation.add({
      targets: '.stroke-animation',
      strokeDashoffset: {
        value: 0,
        duration: 2000,
        easing: 'easeInOutQuart'
      },
      strokeWidth: {
        value: [0, 2],
        duration: 2000,
        easing: 'easeOutCubic'
      },
      strokeOpacity: {
        value: [1, 0],
        duration: 1000,
        easing: 'easeOutCubic',
        delay: 1000
      },
      fillOpacity: {
        value: [0, 1],
        duration: 500,
        easing: 'easeOutCubic',
        delay: 1300
      }
    }).add({
      targets: '.fadeup-animation',
      offset: 1300,
      translateY: {
        value: [100, 0],
        duration: 1500,
        easing: 'easeOutElastic',
        delay: function (el, i) {
          return i * 150;
        }
      },
      opacity: {
        value: [0, 1],
        duration: 200,
        easing: 'linear',
        delay: function (el, i) {
          return i * 150;
        }
      }
    }).add({
      targets: '.fadeleft-animation',
      offset: 1300,
      translateX: {
        value: [40, 0],
        duration: 400,
        easing: 'easeOutCubic',
        delay: function (el, i) {
          return i * 100;
        }
      },
      opacity: {
        value: [0, 1],
        duration: 200,
        easing: 'linear',
        delay: function (el, i) {
          return i * 100;
        }
      }
    });

    doc.classList.add('anime-ready');
    heroAnimation.play();
  }
}

// Lazy loading for images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// Error tracking
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Add your error tracking service here
});

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    console.log('Page load time:', pageLoadTime);
    // Add your analytics service here
  });
}
