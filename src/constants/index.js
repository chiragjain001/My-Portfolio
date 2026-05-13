// NOTE: Use optimized image assets (compressed, modern formats) for all project images for best performance.
export const myProjects = [
  {
    id: 1,
    title: "Jinsetu AI Platform",
    description:
      "An AI-powered Jain scripture platform delivering precise, source-cited answers via a custom knowledge base.",
    subDescription: [
      "Designed a hybrid RAG + rule-based intent router to cut LLM costs while improving response accuracy.",
      "Implemented SSE streaming for real-time token-by-token responses with in-memory caching to reduce latency.",
      "Built scalable backend architecture handling concurrent users with graceful degradation and error recovery.",
    ],
    href: "https://www.jinsetu.in/",
    logo: "",
    image: "/assets/projects/jinsetu-image.png",
    tags: [
      { id: 1, name: "Python", path: "/assets/logos/javascript.svg" }, // Assuming Python doesn't have a logo in the list, using JS as fallback or finding one
      { id: 2, name: "RAG", path: "/assets/logos/vitejs.svg" },
      { id: 3, name: "Vector Database", path: "/assets/logos/sqlite.svg" },
    ],
  },
  {
    id: 2,
    title: "Mindsync",
    description:
      "A full-featured social platform supporting text posts, voice uploads, likes, comments, and user interactions.",
    subDescription: [
      "Implemented JWT authentication, real-time database sync, saved posts, and a complete admin moderation panel.",
      "Optimised data fetching strategies and responsive UI, improving load time and user retention.",
      "Integrated Firebase for seamless real-time backend updates.",
    ],
    href: "https://mindsync-five.vercel.app/",
    logo: "",
    image: "/assets/projects/mindsync-image.png",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "Node.js", path: "/assets/logos/javascript.svg" },
      { id: 3, name: "Firebase", path: "/assets/logos/vitejs.svg" },
    ],
  },
  {
    id: 3,
    title: "PixHunt",
    description:
      "An image discovery and prompt inspiration platform with a modern cinematic UI/UX.",
    subDescription: [
      "Integrated intelligent search and category-based exploration for wallpapers, AI art, and creative inspiration.",
      "Optimized performance and mobile responsiveness for fast, seamless browsing.",
      "Leveraged Framer Motion for highly dynamic and fluid animations.",
    ],
    href: "https://pixhunt.vercel.app/",
    logo: "",
    image: "/assets/projects/image-genrate.jpg",
    tags: [
      { id: 1, name: "React", path: "/assets/logos/react.svg" },
      { id: 2, name: "Tailwind CSS", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A responsive web app integrating real-time APIs to fetch and display global weather data with glassmorphism UI.",
    subDescription: [
      "Developed city-based search and multi-city forecast with smooth horizontal scrolling for comparative insights.",
      "Optimised cross-device performance using CSS Flexbox and custom media queries.",
      "Implemented secure API fetching for real-time accurate weather details.",
    ],
    href: "https://wheather-forecast-omega.vercel.app/",
    logo: "",
    image: "/assets/projects/wheather.jpg",
    tags: [
      { id: 1, name: "JavaScript", path: "/assets/logos/javascript.svg" },
      { id: 2, name: "CSS", path: "/assets/logos/css3.svg" },
    ],
  },
  {
    id: 5,
    title: "My Portfolio",
    description:
      "A fully customizable, immersive 3D portfolio optimized for performance.",
    subDescription: [
      "Developed a responsive cinematic experience using React, Three.js, and Framer Motion.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized cross-browser performance and implemented lazy-loaded Draco-compressed WebGL models.",
    ],
    href: "https://chirag-portfolio-001.vercel.app/",
    logo: "",
    image: "/assets/projects/portfolio-image.png",
    tags: [
      { id: 1, name: "Three js", path: "/assets/logos/threejs.svg" },
      { id: 2, name: "React", path: "/assets/logos/react.svg" },
      { id: 3, name: "TailwindCss", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
];

export const mySocials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/919588201369",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/chirag-jain001",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/chirag.kachhara/",
    icon: "/assets/socials/instagram.svg",
  },
];

export const experiences = [
  {
    title: "Data Analyst Virtual Intern",
    job: "IBM",
    date: "June – August 2024",
    contents: [
      "Team Leadership: Served as Team Leader for a group of 4, coordinating task distribution and ensuring timely completion of analytical workflows.",
      "Data Processing: Performed data cleaning, transformation, and analysis using Python and MySQL to extract meaningful insights from real-world datasets.",
      "Visualization & Reporting: Built interactive dashboards and reports using Tableau and MS Excel to support data-driven decision-making.",
    ],
  },
  {
    title: "Full Stack & AI Development",
    job: "Personal & Open Source Projects",
    date: "2024 - Present",
    contents: [
      "Engineered the Jinsetu AI Platform utilizing RAG pipelines, Supabase, Gemini API, and FastAPI.",
      "Built MindSync, a full-featured social platform supporting authentication, real-time sync, and media uploads.",
      "Developed PixHunt, an image discovery platform with modern cinematic UI and framer motion animations.",
      "Mastered Next.js, Node.js, and LLM-based architectures including vector databases.",
    ],
  },
  {
    title: "B.Tech – Computer Science",
    job: "Jaipur National University",
    date: "Graduating 2026",
    contents: [
      "Hackathon Champion – 1st place across 3 judging criteria; Runner-up in separate edition.",
      "Mastered core programming in Python, Java, C++, and Data Structures & Algorithms.",
      "Tech Content Creator – shares development journey & technical insights online.",
      "Active college participant – Dance competition winner and volleyball player.",
    ],
  },
];

 