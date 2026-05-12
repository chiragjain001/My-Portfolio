# 🚀 Chirag Jain — Portfolio

An immersive, cinematic 3D portfolio built with **React**, **Three.js**, **Framer Motion**, and **Tailwind CSS**. Designed to showcase projects, skills, and experience through a premium, interactive web experience.

[![Live Demo](https://img.shields.io/badge/Live-chiragjain.dev-indigo?style=for-the-badge)](https://chiragjain.dev)

---

## ✨ Features

- **Immersive 3D Hero** — Astronaut model with adaptive quality via `PerformanceMonitor`
- **Cinematic Parallax** — Multi-layer parallax background with a UFO scene
- **Smooth Scrolling** — Lenis-powered buttery smooth scroll experience
- **Interactive Globe** — COBE-based 3D globe in the About section
- **Orbiting Tech Stack** — Animated skill icons orbiting in rings
- **Spring Micro-Interactions** — Physics-based hover and tap animations
- **Custom Cursor** — Vanilla JS magnetic cursor with zero React overhead
- **Lazy Loading** — Code-split sections with `React.lazy` + `Suspense`
- **PWA Ready** — Installable with offline caching via Workbox
- **SEO Optimized** — Structured data (JSON-LD), Open Graph, meta tags
- **Accessibility** — ARIA labels, skip navigation, semantic HTML
- **Responsive** — Fully optimized for mobile, tablet, and desktop

---

## 🛠️ Tech Stack

| Category       | Technologies                                          |
| -------------- | ----------------------------------------------------- |
| **Frontend**   | React 19, Tailwind CSS 4, Framer Motion               |
| **3D/WebGL**   | Three.js, React Three Fiber, React Three Drei          |
| **Scrolling**  | Lenis                                                  |
| **Globe**      | COBE                                                   |
| **Email**      | EmailJS                                                |
| **Build**      | Vite 6, PWA Plugin, Image Optimizer                    |
| **Deployment** | Vercel / Netlify                                       |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/chiragjain001/My-Portfolio.git
cd My-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Astronaut.jsx        # 3D astronaut model
│   ├── CustomCursor.jsx     # Vanilla JS magnetic cursor
│   ├── Globe.jsx            # COBE interactive globe
│   ├── HeroText.jsx         # Animated hero typography
│   ├── Loader.jsx           # Canvas & page loaders
│   ├── OrbitingCircles.jsx  # Orbiting tech stack rings
│   ├── ParallaxBackground.jsx  # Multi-layer parallax + UFO
│   ├── Particles.jsx        # Contact section particles
│   ├── Project.jsx          # Project card with hover preview
│   ├── Timeline.jsx         # Journey timeline component
│   └── ...
├── sections/            # Page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Experiences.jsx
│   ├── Contact.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
├── constants/           # Data & content
│   └── index.js
├── App.jsx              # Root layout with Lenis & lazy loading
├── main.jsx             # Entry point
└── index.css            # Design system & global styles
```

---

## ⚡ Performance

- **Adaptive Quality** — `PerformanceMonitor` + `AdaptiveDpr` auto-degrade 3D on slow GPUs
- **Code Splitting** — Manual chunks: `vendor-react`, `vendor-three`, `vendor-motion`, `vendor-utils`
- **Image Optimization** — Build-time compression via `vite-plugin-image-optimizer`
- **Draco Compression** — 3D models loaded with Draco decoder for smaller file sizes
- **PWA Caching** — Heavy assets (`.glb`, `.hdr`) cached at runtime; fonts cached via `CacheFirst`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📬 Contact

- **Email:** chiragjain.ck04@gmail.com
- **LinkedIn:** [chirag-jain001](https://www.linkedin.com/in/chirag-jain001)
- **Instagram:** [chirag.kachhara](https://www.instagram.com/chirag.kachhara/)
