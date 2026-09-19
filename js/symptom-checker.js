// Symptom Checker & Care Navigator Widget Logic

document.addEventListener('DOMContentLoaded', () => {
  const symptomSelect = document.getElementById('symptom-select');
  const severitySelect = document.getElementById('severity-select');
  const checkBtn = document.getElementById('check-symptom-btn');
  const triageResult = document.getElementById('triage-result');
  const careRecTitle = document.getElementById('care-rec-title');
  const careRecDesc = document.getElementById('care-rec-desc');
  const careRecAction = document.getElementById('care-rec-action');
  const careBadge = document.getElementById('care-badge');

  if (checkBtn && symptomSelect && severitySelect) {
    checkBtn.addEventListener('click', () => {
      const symptom = symptomSelect.value;
      const severity = severitySelect.value;

      if (!symptom || !severity) {
        alert('Please select both a symptom category and severity level.');
        return;
      }

      // Check for emergency conditions
      if (severity === 'emergency' || symptom === 'chest_pain') {
        careBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-800';
        careBadge.textContent = '🚨 Immediate Emergency';
        careRecTitle.textContent = 'Call 911 or Visit Nearest ER';
        careRecDesc.textContent = 'Your reported symptoms indicate a potential medical emergency (severe shortness of breath, sudden weakness, chest pain). Telehealth is not appropriate for life-threatening conditions.';
        careRecAction.href = 'tel:911';
        careRecAction.textContent = 'Call 911 Immediately';
        careRecAction.className = 'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition';
        triageResult.classList.remove('hidden');
        return;
      }

      // Route to Mental Health
      if (symptom === 'mental_health') {
        careBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800';
        careBadge.textContent = '🧠 Behavioral Health';
        careRecTitle.textContent = 'Mental Health Counseling Recommended';
        careRecDesc.textContent = 'Connect with Dr. Marcus Thorne DO or a licensed therapist for confidential video support regarding anxiety, depression, and life transitions.';
        careRecAction.href = 'book.html?service=mental-health';
        careRecAction.textContent = 'Book Therapy Session';
        careRecAction.className = 'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition';
        triageResult.classList.remove('hidden');
        return;
      }

      // Route to Prescription Refill / Primary Care
      if (symptom === 'refill' || symptom === 'chronic') {
        careBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800';
        careBadge.textContent = '💊 Prescription / Primary Care';
        careRecTitle.textContent = 'Primary Care & Prescription Renewal';
        careRecDesc.textContent = 'Schedule a consult with Dr. Sarah Jenkins MD for chronic condition oversight, routine lab review, or medication renewals sent straight to your local pharmacy.';
        careRecAction.href = 'book.html?service=primary-care';
        careRecAction.textContent = 'Book Primary Care Visit';
        careRecAction.className = 'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-sky-600 hover:bg-sky-700 transition';
        triageResult.classList.remove('hidden');
        return;
      }

      // Default: Virtual Urgent Care
      careBadge.className = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800';
      careBadge.textContent = '⚡ 24/7 Virtual Urgent Care';
      careRecTitle.textContent = 'Urgent Care Visit (Wait ~15 Mins)';
      careRecDesc.textContent = 'Perfect for quick diagnosis of sinus infections, UTI, pink eye, cold & flu, or mild rashes. Talk to Dr. Emily Chen MD or an on-demand provider right now.';
      careRecAction.href = 'book.html?service=urgent-care';
      careRecAction.textContent = 'Start Urgent Care Visit Now';
      careRecAction.className = 'inline-flex items-center justify-center px-4 py-2 text-sm font-semibold rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition';
      triageResult.classList.remove('hidden');
    });
  }
});
