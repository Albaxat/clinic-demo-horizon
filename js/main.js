// Horizon Virtual Care - Main Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle — animated hamburger
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    // Replace the plain Lucide icon with our own animated bars
    mobileMenuBtn.innerHTML = `
      <svg id="hamburger-icon" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line id="bar-top"    x1="3" y1="6"  x2="21" y2="6"  class="transition-all duration-300 origin-center"/>
        <line id="bar-mid"    x1="3" y1="12" x2="21" y2="12" class="transition-all duration-300 origin-center"/>
        <line id="bar-bot"    x1="3" y1="18" x2="21" y2="18" class="transition-all duration-300 origin-center"/>
      </svg>`;

    const barTop = document.getElementById('bar-top');
    const barMid = document.getElementById('bar-mid');
    const barBot = document.getElementById('bar-bot');

    function openMenu() {
      mobileMenu.classList.remove('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenuBtn.setAttribute('aria-label', 'Close navigation menu');
      // Animate to X
      barTop.setAttribute('x1', '4');  barTop.setAttribute('y1', '4');
      barTop.setAttribute('x2', '20'); barTop.setAttribute('y2', '20');
      barMid.style.opacity = '0';
      barBot.setAttribute('x1', '4');  barBot.setAttribute('y1', '20');
      barBot.setAttribute('x2', '20'); barBot.setAttribute('y2', '4');
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
      // Animate back to bars
      barTop.setAttribute('x1', '3');  barTop.setAttribute('y1', '6');
      barTop.setAttribute('x2', '21'); barTop.setAttribute('y2', '6');
      barMid.style.opacity = '1';
      barBot.setAttribute('x1', '3');  barBot.setAttribute('y1', '18');
      barBot.setAttribute('x2', '21'); barBot.setAttribute('y2', '18');
    }

    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.setAttribute('aria-label', 'Open navigation menu');
    mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    // Close when clicking a nav link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => closeMenu());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMenu();
      }
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = !answer.classList.contains('hidden');
        
        // Close all other FAQs in the container
        faqItems.forEach(otherItem => {
          const otherAns = otherItem.querySelector('.faq-answer');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        });

        if (!isOpen) {
          answer.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });

  // Simulated Live Urgent Care Wait Time Fluctuator
  const waitTimeElements = document.querySelectorAll('.live-wait-time');
  if (waitTimeElements.length > 0) {
    const times = ['4 mins', '6 mins', '8 mins', '5 mins', '7 mins'];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % times.length;
      waitTimeElements.forEach(el => {
        el.textContent = times[index];
      });
    }, 18000);
  }

  // Testimonials Slider / Switcher
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const nextTestimonialBtn = document.getElementById('next-testimonial');
  const prevTestimonialBtn = document.getElementById('prev-testimonial');

  if (testimonialCards.length > 0 && nextTestimonialBtn && prevTestimonialBtn) {
    let currentTestimonial = 0;

    const updateTestimonials = () => {
      testimonialCards.forEach((card, idx) => {
        if (idx === currentTestimonial) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    };

    nextTestimonialBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
      updateTestimonials();
    });

    prevTestimonialBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
      updateTestimonials();
    });
  }
});
