# KoinX – Tax Loss Harvesting Tool

A responsive React application for tax loss harvesting, built for the KoinX Frontend Internship assignment.

## 🚀 Setup Instructions

### Prerequisites
- Node.js ≥ 18
- npm or yarn

### Install & Run

```bash
# Clone the repo
git clone <your-repo-url>
cd koinx-tax-harvesting

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open http://localhost:5173 in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to Vercel – it auto-detects Vite + React.

## 🗂 Folder Structure

```
koinx-tax-harvesting/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx       # Entry point
    ├── App.jsx        # Main component (all logic + UI)
    └── index.css      # Global styles
```

## ⚙️ Tech Stack

- **React 18** with hooks (useState, useEffect, useMemo)
- **Vite** for fast development + builds
- **Vanilla CSS** with CSS custom properties (no Tailwind dependency needed)
- **Mock APIs** via in-app Promises (simulates real API latency)
- **Google Fonts** – Sora + JetBrains Mono for crisp financial UI

## 🧠 Business Logic

### Pre-Harvesting Card
- Reads from Capital Gains API mock
- Net ST = STCG profits − STCG losses
- Net LT = LTCG profits − LTCG losses
- Realised Capital Gains = Net ST + Net LT

### After Harvesting Card
- Starts with same base capital gains
- For each **selected** holding:
  - If `stcg.gain > 0` → add to STCG profits; else add abs to STCG losses
  - If `ltcg.gain > 0` → add to LTCG profits; else add abs to LTCG losses
- Shows "You save ₹X" badge when post-harvest realised gains < pre-harvest

### Holdings Table
- All 17 holdings rendered from mock API
- Sorted largest gains first (most impactful for harvesting)
- Checkbox per row + select-all header checkbox
- "Amount to Sell" = totalHolding, shown only when row is selected
- View All / Show Less toggle (shows 5 initially)

## ✅ Features

- [x] Pre & After Harvesting cards with real-time updates
- [x] Holdings table with select-all support
- [x] Savings indicator with animation
- [x] Loader states for both API calls
- [x] Error states
- [x] View All / Collapse toggle
- [x] Mobile responsive layout
- [x] Sticky header
- [x] Number formatting (Indian locale, scientific notation for tiny values)

## 🔧 Assumptions

1. When a holding has `stcg.gain = 0` exactly, it's treated as neutral (no change to profits or losses).
2. Holdings are sorted by total absolute gain (stcg + ltcg) descending for user relevance.
3. The "Amount to Sell" column shows `totalHolding` (not just stcg.balance) when selected, as the user would sell their full position.
4. API latency is simulated at 600–800ms to demonstrate loader states.

## 📸 Screenshots

_(Add screenshots after deployment)_

- **Pre-Harvesting view** – dark card showing baseline capital gains
- **After Harvesting view** – blue card updating in real-time on checkbox selections
- **Holdings Table** – full list with select-all, gain values, and sell amounts
