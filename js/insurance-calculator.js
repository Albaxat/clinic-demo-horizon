// Insurance Copay & Cash-Pay Estimator

document.addEventListener('DOMContentLoaded', () => {
  const insurerSelect = document.getElementById('calc-insurer');
  const serviceSelect = document.getElementById('calc-service');
  const planTypeSelect = document.getElementById('calc-plan-type');
  const calculateBtn = document.getElementById('calc-btn');
  const resultBox = document.getElementById('calc-result-box');
  const copayEstEl = document.getElementById('calc-copay-estimate');
  const cashPriceEl = document.getElementById('calc-cash-price');
  const coverageNotesEl = document.getElementById('calc-coverage-notes');

  const cashPrices = {
    'urgent-care': 49,
    'primary-care': 79,
    'mental-health': 89,
    'refill': 39
  };

  if (calculateBtn && insurerSelect && serviceSelect) {
    calculateBtn.addEventListener('click', () => {
      const insurer = insurerSelect.value;
      const service = serviceSelect.value;
      const plan = planTypeSelect ? planTypeSelect.value : 'standard';

      if (!insurer || !service) {
        alert('Please choose an insurance provider and visit type.');
        return;
      }

      const flatCash = cashPrices[service] || 49;
      cashPriceEl.textContent = `$${flatCash}`;

      if (insurer === 'uninsured') {
        copayEstEl.textContent = `$${flatCash}`;
        coverageNotesEl.textContent = 'Transparent self-pay pricing. No surprise bills. HSA/FSA cards accepted.';
      } else if (insurer === 'medicare') {
        copayEstEl.textContent = '$0 - $15';
        coverageNotesEl.textContent = 'Standard Medicare Part B telehealth copay or deductible applies. Most patients pay $0.';
      } else if (['aetna', 'bcbs', 'cigna', 'uhc'].includes(insurer)) {
        if (plan === 'hdhp') {
          copayEstEl.textContent = '$20 - $35';
          coverageNotesEl.textContent = 'In-network telehealth rate applies towards deductible / HSA eligible.';
        } else {
          copayEstEl.textContent = '$0 - $25';
          coverageNotesEl.textContent = 'In-Network covered benefit! Most patients pay a standard primary/urgent care copay.';
        }
      } else {
        copayEstEl.textContent = '$15 - $30';
        coverageNotesEl.textContent = 'Partner in-network rate. Actual copay determined by your specific plan tier.';
      }

      resultBox.classList.remove('hidden');
    });
  }
});
