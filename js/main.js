// Horizon Virtual Care - Main Interactive Scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
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
