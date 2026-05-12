/**
 * Navbar.jsx – Phase 4 a11y
 * - aria-label on <nav> and mobile toggle <button>
 * - aria-expanded / aria-controls on hamburger button
 * - Skip-to-content link for keyboard users
 * - Current-page indicator via aria-current (active link detection)
 */

import React, { useState, useCallback, useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LenisContext } from '../LenisContext';

const NAV_ITEMS = [
  { label: 'Home',    href: '#home'    },
  { label: 'About',   href: '#about'   },
  { label: 'Work',    href: '#work'    },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

function Navigation({ onLinkClick, activeHash }) {
  return (
    <ul className="nav-ul" role="list">
      {NAV_ITEMS.map(({ label, href }) => (
        <li key={href} className="nav-li">
          <a
            className="nav-link"
            href={href}
            onClick={(e) => onLinkClick(e, href)}
            aria-current={activeHash === href ? 'page' : undefined}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = () => {
  const lenis      = useContext(LenisContext);
  const [isOpen,   setIsOpen]   = useState(false);
  const [activeHash, setActiveHash] = useState('#home');

  // Track active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_ITEMS.map(({ href }) => ({
        href,
        el: document.querySelector(href),
      })).filter(({ el }) => el);

      const found = sections.find(({ el }) => {
        const rect = el.getBoundingClientRect();
        return rect.top <= 80 && rect.bottom > 0;
      });
      if (found) setActiveHash(found.href);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el && lenis) lenis.scrollTo(el);
      setIsOpen(false);
      setActiveHash(href);
    },
    [lenis],
  );

  const toggleMenu = useCallback(() => setIsOpen((v) => !v), []);

  return (
    <>
      {/* Skip-to-content for keyboard/screen-reader users */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40"
      >
        <div className="mx-auto c-space max-w-[1360px]">
          <div className="flex items-center justify-between py-3">
            <a
              href="/"
              className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
              aria-label="Chirag Jain – home"
            >
              Chirag
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={toggleMenu}
              className="sm:hidden p-2 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              <img
                src={isOpen ? '/assets/closed.svg' : '/assets/menu.svg'}
                className="w-6 h-6"
                alt=""
                aria-hidden="true"
              />
            </button>

            {/* Desktop nav */}
            <nav aria-label="Primary navigation" className="hidden sm:flex">
              <Navigation onLinkClick={handleNavClick} activeHash={activeHash} />
            </nav>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-nav"
              role="navigation"
              aria-label="Mobile navigation"
              className="block overflow-hidden text-center sm:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <nav className="pb-5">
                <Navigation onLinkClick={handleNavClick} activeHash={activeHash} />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;