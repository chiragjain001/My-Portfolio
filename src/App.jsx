import React, { useCallback, useMemo } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experiences from './sections/Experiences'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

// Memoized section component to prevent unnecessary re-renders
const Section = React.memo(({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.5,
      delay: delay,
      ease: [0.25, 0.1, 0.25, 1] // Custom easing for smoother animation
    }}
  >
    {children}
  </motion.div>
))

const App = () => {
  const { scrollYProgress } = useScroll()
  
  // Optimize scroll progress animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50, // Reduced for smoother animation
    damping: 20,
    restDelta: 0.001
  })

  // Memoize the progress bar component
  const ProgressBar = useMemo(() => (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-50"
      style={{ scaleX }}
    />
  ), [scaleX])

  // Memoize the main content to prevent unnecessary re-renders
  const MainContent = useMemo(() => (
    <motion.div 
      style={{ flexGrow: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <Section>
        <Hero />
      </Section>
      <Section delay={0.1}>
        <About />
      </Section>
      <Section delay={0.2}>
        <Projects />
      </Section>
      <Section delay={0.3}>
        <Experiences />
      </Section>
      <Section delay={0.4}>
        <Contact />
      </Section>
    </motion.div>
  ), [])

  return (
    <>
      {ProgressBar}
      <div className='container mx-auto max-w-7xl flex flex-col min-h-screen'>
        {MainContent}
        <Footer />
      </div>
    </>
  )
}

export default React.memo(App)
