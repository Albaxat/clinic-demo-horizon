# 🏥 Horizon Virtual Care - Telehealth Clinic Website

A clean, fast, high-converting telehealth medical clinic website built for **Horizon Virtual Care** with interactive clinical tools, physician profiles, transparent pricing calculator, and a virtual consultation room simulator.

---

## ✨ Features & Highlights

- **⚡ Fast & Zero-Dependency:** Pure modern HTML5, Tailwind CSS, Lucide icons, and optimized vanilla JavaScript.
- **🚨 24/7 Virtual Urgent Care:** Live real-time wait time counter (`~6 mins`) with one-click intake check-in.
- **🧭 Interactive Symptom Checker & Care Navigator:** Triage engine that categorizes symptoms (Urgent Care, Mental Health, Primary Care, or 911 Emergency).
- **💳 Transparent Pricing & Insurance Copay Estimator:** Instant cost lookup for Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Medicare, and flat cash-pay.
- **🩺 Board-Certified Physician Profiles:** High-resolution portraits, credentials, and Johns Hopkins residency backgrounds for Dr. Sarah Jenkins MD, Dr. Marcus Thorne DO, and Dr. Emily Chen MD.
- **📅 5-Step Appointment Booking Wizard:** Smooth intake flow with service selection, doctor choice, immediate queue / schedule, patient details, and instant confirmation code.
- **📹 Virtual Consultation Room Simulator:** Live video visit demo with camera/mic checks, provider queue status, in-visit EHR notes, and encrypted chat.
- **🔒 Compliance & Safety:** HIPAA compliant 256-bit SSL encryption, 50-state licensing, pharmacy e-Rx routing, and emergency 911/988 crisis notices.

---

## 📂 Project Structure

```
horizon-virtual-care/
├── index.html              # High-converting Homepage (Hero, Symptoms, Services, Reviews, FAQ)
├── services.html           # In-depth breakdown of 4 core services & ER vs Telehealth guide
├── doctors.html            # Physician directory with portraits and credentials
├── pricing.html            # Transparent pricing plans & Insurance Copay Estimator
├── book.html               # 5-step interactive appointment booking intake wizard
├── waiting-room.html       # Virtual consultation video visit simulator & device check
├── contact.html            # About Us, Mission Statement, Austin HQ & Contact Form
├── server.ps1              # Built-in PowerShell localhost HTTP server
├── css/
│   └── style.css           # Custom styles, animations, and typography
├── js/
│   ├── main.js             # Navigation, FAQ accordion, wait time simulator
│   ├── symptom-checker.js  # Interactive clinical triage logic
│   ├── insurance-calculator.js # Instant copay & cash-pay estimator
│   └── booking.js          # Multi-step booking state & confirmation
└── assets/
    ├── clinic-hall.jpg     # Austin HQ clinical command center
    ├── dr-jenkins.jpg      # Dr. Sarah Jenkins, MD (Lead Primary Care)
    ├── dr-thorne.jpg       # Dr. Marcus Thorne, DO (Director of Behavioral Health)
    ├── dr-chen.jpg         # Dr. Emily Chen, MD (Urgent Care Specialist)
    ├── telehealth-consult.jpg # Digital consultation suite
    └── virtual-waiting.jpg # Patient coordination wing
```

---

## 🚀 How to Run Locally

### Option 1: Double-Click
Simply open `index.html` in any web browser.

### Option 2: PowerShell Local Server
Run the included PowerShell server script:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Then visit: `http://localhost:8080/`

---

## 🏢 Clinic Information

- **Clinic Name:** Horizon Virtual Care
- **Tagline:** Quality healthcare, wherever you are.
- **Corporate Address:** 400 W 15th St, Suite 750, Austin, TX 78701
- **Support Email:** support@horizonvirtualcare.com
- **Phone:** +1 (800) 555-0199
- **Operating Hours:** 24/7 Virtual Urgent Care; Scheduled visits Mon–Fri, 8:00 AM – 8:00 PM (EST).
