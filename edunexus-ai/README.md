# EduNexus AI

> Premium AI-powered academic service platform — built with Next.js 15, TypeScript, Tailwind CSS v4, Shadcn UI, and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

---

## Overview

EduNexus AI is a next-generation academic assistance platform combining human expert knowledge with AI capabilities. Students can order help with assignments, essays, research papers, coding problems, dissertations, and more — with guaranteed fast delivery and original work.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + CSS variables |
| Components | Shadcn UI + custom shared components |
| Animations | Framer Motion |
| Theme | next-themes (dark / light / system) |
| Icons | Lucide React |
| HTTP Client | Custom typed `api` wrapper (fetch) |

---

## Project Structure

```
edunexus-ai/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout (ThemeProvider, Navbar, Footer)
│   ├── page.tsx            # Landing / home page
│   ├── globals.css         # Global styles, CSS variables, Tailwind v4 theme
│   └── dashboard/
│       └── page.tsx        # Dashboard shell
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Responsive sticky navbar with theme toggle
│   │   └── Footer.tsx      # Site footer with links
│   ├── providers/
│   │   └── ThemeProvider.tsx
│   ├── shared/
│   │   ├── Button.tsx      # CVA button with variants + Framer tap animation
│   │   ├── Card.tsx        # CVA card with glass/glow variants
│   │   └── SectionHeading.tsx  # Animated section title component
│   └── ui/                 # Shadcn UI components (add via `npx shadcn@latest add`)
│
├── hooks/
│   ├── useTheme.ts         # Thin wrapper around next-themes
│   ├── useMediaQuery.ts    # Responsive breakpoint detection
│   └── useLocalStorage.ts  # Persistent state with SSR guard
│
├── lib/
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
│
├── services/
│   ├── api.ts              # Typed fetch wrapper with ApiError
│   ├── authService.ts      # Auth API calls
│   └── orderService.ts     # Order API calls
│
├── store/
│   └── index.ts            # State management barrel (add Zustand slices here)
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces & types
│
├── utils/
│   ├── cn.ts               # Re-export of lib/utils cn()
│   ├── format.ts           # Date, currency, text formatters
│   └── constants.ts        # App-wide constants
│
├── components.json         # Shadcn UI configuration
├── .env.example            # Environment variable template
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repo
git clone https://github.com/your-org/edunexus-ai.git
cd edunexus-ai

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Design System

The UI follows a **premium dark SaaS** aesthetic:

- **Background**: Near-black (`#05050d` → `#0a0a14`)
- **Glassmorphism**: `.glass` utility — `backdrop-blur`, semi-transparent fill, subtle border
- **Accent colors**: Neon blue (`#3b82f6`) + neon purple (`#a855f7`)
- **Gradient text**: `.gradient-text` — blue-to-purple background clip
- **Glow effects**: `.glow-blue`, `.glow-purple`, `.glow-text-blue`
- **Background mesh**: `.bg-mesh` — subtle grid + radial gradients

### Adding Shadcn Components

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
# etc.
```

---

## Scripts

```bash
npm run dev      # Development server (Turbopack)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

---

## Roadmap

- [ ] Authentication (NextAuth.js / Clerk)
- [ ] Order placement flow
- [ ] Expert matching system
- [ ] Real-time chat (WebSocket / Pusher)
- [ ] Stripe payment integration
- [ ] Admin dashboard
- [ ] Email notifications (Resend)
- [ ] AI document review pipeline

---

## License

Private — All rights reserved © EduNexus AI
