// JavaScript for Horizon Virtual Care Website

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set default appointment date to today
  const dateInput = document.getElementById('modalDateInput');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

  // Setup Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when links are clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Setup FAQ Accordion
  initFaqAccordion();
});

// FAQ Accordion Handler
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Set first item active by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
  }

  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherContent = other.querySelector('.faq-content');
        if (otherContent) otherContent.classList.add('hidden');
        other.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        content.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

// Open Booking Modal with Optional Pre-filled Service and Doctor
function openBookingModal(serviceName = null, doctorName = null) {
  const modal = document.getElementById('bookingModal');
  const serviceSelect = document.getElementById('modalServiceSelect');
  const doctorSelect = document.getElementById('modalDoctorSelect');

  if (serviceName && serviceSelect) {
    serviceSelect.value = serviceName;
  }
  if (doctorName && doctorSelect) {
    doctorSelect.value = doctorName;
  }

  // Reset to step 1
  goToStep(1);

  if (modal) {
    modal.classList.remove('hidden');
    // Allow browser reflow before adding opacity/scale class
    setTimeout(() => {
      modal.classList.add('modal-open');
    }, 10);
  }
}

// Close Booking Modal
function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.remove('modal-open');
    setTimeout(() => {
      modal.classList.add('hidden');
      // Reset form if submitted
      const form = document.getElementById('appointmentForm');
      if (form) form.reset();
      const dateInput = document.getElementById('modalDateInput');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    }, 200);
  }
}

// Wizard Step Navigation
function goToStep(stepNumber) {
  const step1 = document.getElementById('wizardStep1');
  const step2 = document.getElementById('wizardStep2');
  const step3 = document.getElementById('wizardStep3');

  const ind1 = document.getElementById('stepIndicator1');
  const ind2 = document.getElementById('stepIndicator2');
  const ind3 = document.getElementById('stepIndicator3');

  if (step1 && step2 && step3) {
    step1.classList.add('hidden');
    step2.classList.add('hidden');
    step3.classList.add('hidden');

    if (stepNumber === 1) {
      step1.classList.remove('hidden');
      updateIndicator(ind1, true);
      updateIndicator(ind2, false);
      updateIndicator(ind3, false);
    } else if (stepNumber === 2) {
      step2.classList.remove('hidden');
      updateIndicator(ind1, true);
      updateIndicator(ind2, true);
      updateIndicator(ind3, false);
    } else if (stepNumber === 3) {
      step3.classList.remove('hidden');
      updateIndicator(ind1, true);
      updateIndicator(ind2, true);
      updateIndicator(ind3, true);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

function updateIndicator(el, active) {
  if (!el) return;
  const badge = el.querySelector('span:first-child');
  const label = el.querySelector('span:last-child');
  if (active) {
    badge.className = 'w-6 h-6 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-bold';
    label.className = 'text-brand-700 font-bold';
  } else {
    badge.className = 'w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs';
    label.className = 'text-slate-500 font-medium';
  }
}

// Hero Quick Start button
function handleQuickStart() {
  const select = document.getElementById('quickServiceSelect');
  const selectedService = select ? select.value : 'Virtual Urgent Care';
  openBookingModal(selectedService);
}

// Form Submit Handler
function handleFormSubmit(event) {
  event.preventDefault();

  const service = document.getElementById('modalServiceSelect')?.value || 'Virtual Urgent Care';
  const doctor = document.getElementById('modalDoctorSelect')?.value || 'First Available Doctor';
  const date = document.getElementById('modalDateInput')?.value || 'Today';
  const time = document.getElementById('modalTimeSelect')?.value || 'Now';
  const name = document.getElementById('patientName')?.value || 'Patient';
  const email = document.getElementById('patientEmail')?.value || '';
  const phone = document.getElementById('patientPhone')?.value || '';

  // Populate confirmation details
  document.getElementById('confService').innerText = service;
  document.getElementById('confDoctor').innerText = doctor;
  document.getElementById('confTime').innerText = `${date} at ${time}`;
  document.getElementById('confPatient').innerText = `${name} (${phone})`;

  goToStep(3);
  showToast(`Visit scheduled for ${name}! Check email & SMS.`);
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.remove('opacity-0', 'translate-y-20', 'pointer-events-none');
    toast.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      toast.classList.remove('opacity-100', 'translate-y-0');
      toast.classList.add('opacity-0', 'translate-y-20', 'pointer-events-none');
    }, 4000);
  }
}

// Close modal when clicking on backdrop
window.addEventListener('click', (e) => {
  const modal = document.getElementById('bookingModal');
  if (e.target === modal) {
    closeBookingModal();
  }
});
