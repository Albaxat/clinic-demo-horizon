// Interactive Multi-Step Appointment Booking Engine

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  const totalSteps = 4;

  const bookingState = {
    service: 'urgent-care',
    doctor: 'first-available',
    dateType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    state: 'TX',
    pharmacy: 'CVS Pharmacy (Local)',
    paymentType: 'insurance',
    insuranceProvider: 'BCBS'
  };

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('service')) {
    bookingState.service = urlParams.get('service');
  }
  if (urlParams.get('doctor')) {
    bookingState.doctor = urlParams.get('doctor');
  }

  // DOM Elements
  const stepIndicators = document.querySelectorAll('.step-item');
  const stepSections = document.querySelectorAll('.step-section');
  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-prev');
  const btnSubmit = document.getElementById('btn-submit');

  // Pre-select radio/cards based on query params
  if (bookingState.service) {
    const serviceRadio = document.querySelector(`input[name="service"][value="${bookingState.service}"]`);
    if (serviceRadio) serviceRadio.checked = true;
  }
  if (bookingState.doctor) {
    const docRadio = document.querySelector(`input[name="doctor"][value="${bookingState.doctor}"]`);
    if (docRadio) docRadio.checked = true;
  }

  // Update UI Step Visibility
  const showStep = (step) => {
    stepSections.forEach(section => {
      const s = parseInt(section.getAttribute('data-step'), 10);
      if (s === step) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });

    stepIndicators.forEach(ind => {
      const s = parseInt(ind.getAttribute('data-step'), 10);
      ind.classList.remove('active', 'completed');
      if (s === step) {
        ind.classList.add('active');
      } else if (s < step) {
        ind.classList.add('completed');
      }
    });

    // Control Buttons
    if (btnPrev) {
      btnPrev.classList.toggle('hidden', step === 1 || step === 5);
    }
    if (btnNext) {
      btnNext.classList.toggle('hidden', step >= 4);
    }
    if (btnSubmit) {
      btnSubmit.classList.toggle('hidden', step !== 4);
    }

    // Scroll to top of booking card
    const bookingContainer = document.getElementById('booking-wizard-card');
    if (bookingContainer) {
      bookingContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Next Step Validation & Navigation
  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep === 1) {
        const selectedService = document.querySelector('input[name="service"]:checked');
        if (!selectedService) {
          alert('Please select a service to continue.');
          return;
        }
        bookingState.service = selectedService.value;
      } else if (currentStep === 2) {
        const selectedDoctor = document.querySelector('input[name="doctor"]:checked');
        if (!selectedDoctor) {
          alert('Please select a provider preference.');
          return;
        }
        bookingState.doctor = selectedDoctor.value;
      } else if (currentStep === 3) {
        const timeChoice = document.querySelector('input[name="time-choice"]:checked');
        if (!timeChoice) {
          alert('Please select whether you need immediate care or a scheduled visit.');
          return;
        }
        bookingState.dateType = timeChoice.value;
      }

      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });
  }

  // Previous Step
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  // Handle Form Submission
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Collect Patient info
      bookingState.firstName = document.getElementById('patient-first-name')?.value || 'Guest';
      bookingState.lastName = document.getElementById('patient-last-name')?.value || 'Patient';
      bookingState.email = document.getElementById('patient-email')?.value || 'patient@example.com';
      bookingState.phone = document.getElementById('patient-phone')?.value || '+1 (555) 000-0000';
      bookingState.state = document.getElementById('patient-state')?.value || 'TX';
      bookingState.pharmacy = document.getElementById('patient-pharmacy')?.value || 'Local CVS';
      bookingState.paymentType = document.querySelector('input[name="payment-type"]:checked')?.value || 'insurance';

      const randomId = 'HVC-' + Math.floor(100000 + Math.random() * 900000);

      // Populate Confirmation Step
      document.getElementById('conf-app-id').textContent = randomId;
      document.getElementById('conf-name').textContent = `${bookingState.firstName} ${bookingState.lastName}`;
      document.getElementById('conf-service').textContent = formatServiceName(bookingState.service);
      document.getElementById('conf-doctor').textContent = formatDoctorName(bookingState.doctor);
      document.getElementById('conf-time').textContent = bookingState.dateType === 'now' ? 'Immediate Urgent Care Queue (~15 mins)' : 'Scheduled Visit (Mon-Fri)';
      document.getElementById('conf-pharmacy').textContent = bookingState.pharmacy;
      
      const roomLink = document.getElementById('conf-waiting-room-btn');
      if (roomLink) {
        roomLink.href = `waiting-room.html?id=${randomId}&name=${encodeURIComponent(bookingState.firstName)}&service=${encodeURIComponent(bookingState.service)}`;
      }

      // Show Step 5 (Confirmation)
      currentStep = 5;
      showStep(5);
    });
  }

  function formatServiceName(code) {
    switch (code) {
      case 'urgent-care': return 'Virtual Urgent Care';
      case 'primary-care': return 'Primary Care & Wellness';
      case 'mental-health': return 'Mental Health Counseling';
      case 'refill': return 'Prescription Refill Renewal';
      default: return 'Telehealth Consultation';
    }
  }

  function formatDoctorName(code) {
    switch (code) {
      case 'dr-jenkins': return 'Dr. Sarah Jenkins, MD (Family Medicine)';
      case 'dr-thorne': return 'Dr. Marcus Thorne, DO (Psychiatry)';
      case 'dr-chen': return 'Dr. Emily Chen, MD (Urgent Care)';
      default: return 'First Available Board-Certified Doctor';
    }
  }

  // Schedule toggle in step 3
  const timeChoiceRadios = document.querySelectorAll('input[name="time-choice"]');
  const scheduleSlotsDiv = document.getElementById('scheduled-slots-picker');
  timeChoiceRadios.forEach(r => {
    r.addEventListener('change', () => {
      if (r.value === 'scheduled' && r.checked) {
        if (scheduleSlotsDiv) scheduleSlotsDiv.classList.remove('hidden');
      } else {
        if (scheduleSlotsDiv) scheduleSlotsDiv.classList.add('hidden');
      }
    });
  });

  // Initialize
  showStep(currentStep);
});
