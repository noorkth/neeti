# Neeti Kayastha — Portfolio Site

A production-ready **React + Vite + Tailwind CSS** portfolio and consultation booking website for Neeti Kayastha, Clinical Dietician & Registered Nurse.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # Production bundle → /dist
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx            # Sticky nav, scroll-aware, mobile hamburger
│   ├── HeroSection.jsx       # Full-viewport hero with stats + dual CTAs
│   ├── AboutSection.jsx      # Bio, current roles, credential highlights
│   ├── ServicesSection.jsx   # 8-card expertise grid
│   ├── CredentialsSection.jsx# Dual timelines + certification badges
│   ├── ConsultationForm.jsx  # React Hook Form + EmailJS ready
│   └── Footer.jsx            # Contact, nav, services, legal
├── services/
│   └── emailService.js       # EmailJS module (configure your credentials here)
├── App.jsx
├── main.jsx
└── index.css                 # Tailwind v4 theme tokens + custom animations
```

---

## 📧 Wiring Up the Consultation Form (EmailJS)

1. Sign up at https://www.emailjs.com
2. Create a Service (Gmail, Outlook, etc.)
3. Create an Email Template using these variables:
   - {{from_name}}, {{from_email}}, {{phone}}
   - {{age}}, {{gender}}, {{health_goal}}
   - {{consultation}}, {{message}}
4. Open `src/services/emailService.js` and replace:
   - SERVICE_ID:  'YOUR_SERVICE_ID'
   - TEMPLATE_ID: 'YOUR_TEMPLATE_ID'
   - PUBLIC_KEY:  'YOUR_PUBLIC_KEY'

---

## 🌐 Deploy to Vercel

Option A — Vercel CLI:
```bash
npm i -g vercel
vercel --prod
```

Option B — GitHub:
1. Push repo to GitHub
2. Import project at vercel.com
3. Framework preset: Vite (auto-detected via vercel.json)

---

## 🎨 Design System

| Token               | Value                              |
|---------------------|------------------------------------|
| Primary green       | sage-500 (#4e7e4e)                |
| Dark green          | sage-700 (#2e542e)                |
| Background          | cream-50 (#fefcf8)                |
| Heading font        | Playfair Display (serif)          |
| Body font           | Inter (sans-serif)                |
| Hero background     | Dark botanical gradient            |
| Cards               | Glass morphism + subtle shadows    |
