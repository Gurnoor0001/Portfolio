# Gurnoor Singh - Cosmic Portfolio

An immersive, space-themed 3D developer portfolio designed to showcase my journey as an AI/ML Engineer. It features an interactive 3D universe, an integrated AI Chatbot, a retro command-line terminal, and a dynamic presentation of my projects, skills, and certifications.

---

## 🛠️ Technology Stack

This portfolio was built using modern web technologies to ensure high performance and a rich user experience:

- **Core**: Next.js (App Router), React, TypeScript
- **Styling & Animation**: Tailwind CSS, Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **AI Integration**: Google Gemini API (`gemini-3.5-flash`)
- **Utilities**: Lenis (Smooth Scrolling), Lucide React (Icons), Web Audio API (Ambient Sounds)

## ✨ Key Features

- **Interactive 3D Universe**: A dynamic background featuring stars, nebulas, and rotating planets that you can explore.
- **AI Chat Assistant**: An embedded AI chatbot powered by Google Gemini, capable of answering questions about my experience and skills.
- **Retro Terminal**: A fully functional command-line interface to navigate the portfolio and view information using commands like `about`, `skills`, and `projects`.
- **In-App Certificate Viewer**: Seamlessly view PDF certifications in a beautifully styled, natively scrollable modal overlay.
- **Ambient Sound Engine**: A custom procedural synthesizer that generates atmospheric space sounds (toggleable via the HUD).
- **Performance Toggle**: A "Fast Mode" switch to optimize 3D rendering and animations for lower-end devices.

## ⌨️ Keyboard Shortcuts

- `` ` `` or `~` : Toggle the Retro Terminal window open/closed.
- `Esc` : Close the terminal if it is currently open.
- `↑ ↑ ↓ ↓ ← → ← → B A` : (Konami Code) Triggers a secret cosmic easter egg!

## 🚀 The Process: How I Built It

1. **Foundation**: I started by scaffolding a Next.js application with Tailwind CSS for rapid styling and layout management.
2. **3D Environment**: Using React Three Fiber, I engineered the cosmic background. I layered particle systems for stars, a custom shader-like approach for nebulas, and textured spheres for the planets.
3. **Interface Design (HUD)**: I built a Head-Up Display inspired by sci-fi aesthetics to serve as the main navigation hub, complete with glassmorphism effects.
4. **AI & Terminal**: I integrated the Google Gemini API through a serverless route to create the AI Chatbot. I then built the Terminal component to parse text commands and read dynamically from a centralized `data.ts` file.
5. **Refinement**: The final phases involved fine-tuning the UX. I implemented Lenis for natural, buttery-smooth scrolling, added custom ambient audio via the Web Audio API, and ensured PDF certificates loaded seamlessly in centered modals without disrupting the scroll behavior.

## 🌱 How It Could Be Improved

While the portfolio is fully functional, there are a few areas for future enhancement:
- **Mobile Optimization**: Further aggressive culling of 3D objects and lowering texture resolutions specifically for older mobile browsers to ensure 60fps.
- **Advanced AI Context**: Integrating a RAG (Retrieval-Augmented Generation) system to allow the chatbot to deeply analyze my project codebases and provide technical insights.
- **Post-Processing**: Adding WebGL bloom and chromatic aberration effects for a more cinematic feel.
- **Expanded Easter Eggs**: Adding complex particle explosions or "hyperdrive" visual effects when specific interactions are triggered.

## 💻 How to Run Locally

If you'd like to run this project on your own machine:

1. **Clone the repository** (Requires permission as per copyright).
2. **Navigate to the directory**:
   ```bash
   cd gurnoor-portfolio
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**: 
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```
5. **Start the development server**:
   ```bash
   npm run dev
   ```
6. Open `http://localhost:3000` in your browser to view the portfolio.

---

*Copyright (c) 2026 Gurnoor Singh. All Rights Reserved.*
