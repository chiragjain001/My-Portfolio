/**
 * Footer.jsx – Phase 4 a11y
 * - <footer> semantic element with role/aria
 * - Social links have aria-label with platform name
 * - Social icons have aria-hidden (decorative; label is on the <a>)
 * - Opens external links safely (rel="noopener noreferrer")
 */

import { mySocials } from '../constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space"
      aria-label="Site footer"
    >
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      <div className="flex gap-2">
        <p>Terms &amp; Conditions</p>
        <p aria-hidden="true">|</p>
        <p>Privacy Policy</p>
      </div>

      {/* Social links */}
      <nav aria-label="Social media links">
        <ul className="flex gap-3" role="list">
          {mySocials.map((social) => (
            <li key={social.name}>
              <a
                href={social.href || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${social.name} profile (opens in new tab)`}
                className="transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 rounded"
              >
                <img
                  src={social.icon}
                  className="w-5 h-5"
                  alt=""
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p>© {year} Chirag Jain. All rights reserved.</p>
    </footer>
  );
};

export default Footer;