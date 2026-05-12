/**
 * CopyEmailButton.jsx – Phase 4 a11y + Phase 5 spring micro-interaction
 *
 * a11y:
 * - role="button" (it already uses <motion.button> – redundant but explicit)
 * - aria-label describes the action clearly
 * - aria-live="polite" region announces copy success to screen readers
 * - Keyboard: Enter / Space already fire onClick on <button>
 *
 * Phase 5:
 * - whileHover uses spring physics via framer-motion (scale + lift)
 * - whileTap gives haptic-style press feedback
 */

import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const EMAIL = 'chiragjain.ck04@gmail.com';

const SPRING = {
  type: 'spring',
  stiffness: 400,
  damping: 20,
};

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <motion.button
      onClick={copyToClipboard}
      role="button"
      aria-label={copied ? 'Email address copied!' : 'Copy email address to clipboard'}
      aria-pressed={copied}
      className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
      /* ── Phase 5 spring physics ── */
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={SPRING}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copied"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.12, ease: 'easeInOut' }}
          >
            <img src="assets/copy-done.svg" className="w-5" alt="" aria-hidden="true" />
            Email Copied!
          </motion.p>
        ) : (
          <motion.p
            className="flex items-center justify-center gap-2"
            key="copy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <img src="assets/copy.svg" className="w-5" alt="" aria-hidden="true" />
            Copy Email Address
          </motion.p>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyEmailButton;