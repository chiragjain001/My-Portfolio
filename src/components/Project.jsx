/**
 * Project.jsx – Phase 4 a11y + Phase 5 spring micro-interactions
 *
 * a11y:
 * - Article semantic element
 * - aria-label on the read-more button describes which project
 * - Arrow icon aria-hidden (decorative)
 * - data-cursor-hover triggers custom cursor expansion
 *
 * Phase 5:
 * - motion.article with whileHover spring physics (lift + subtle scale)
 * - motion.button "Read More" with spring hover + tap
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const CARD_SPRING = {
  type: 'spring',
  stiffness: 300,
  damping: 22,
  mass: 0.8,
};

const BTN_SPRING = {
  type: 'spring',
  stiffness: 420,
  damping: 20,
};

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  tags,
  setPreview,
}) => {
  const [showLocalPreview, setShowLocalPreview] = useState(false);

  const handleReadMoreClick = () => {
    if (href && href.trim() !== '') {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.article
      data-cursor-hover
      className="relative flex flex-col sm:flex-row items-start sm:items-center w-full py-10 rounded-xl px-2 -mx-2 transition-colors"
      /* Phase 5: spring lift on hover */
      whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.03)' }}
      transition={CARD_SPRING}
    >
      {/* Hover/Touch Trigger Area */}
      <div
        className="flex-1 sm:flex-[0.7] sm:basis-[70%] cursor-pointer group pr-4 z-20 mb-6 sm:mb-0"
        onMouseEnter={() => setShowLocalPreview(true)}
        onMouseLeave={() => setShowLocalPreview(false)}
        onClick={() => setShowLocalPreview((prev) => !prev)}
      >
        <p className="text-2xl font-medium group-hover:text-white transition-colors uppercase tracking-tight">{title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sand/70 uppercase text-xs tracking-widest">
          {tags.map((tag) => (
            <span key={tag.id}>{tag.name}</span>
          ))}
        </div>
      </div>

      {/* Preview + View Button */}
      <div className="flex-1 w-full sm:flex-[0.3] sm:basis-[30%] flex items-center justify-start sm:justify-end sm:pl-4 z-20">
        {/* Floating Overlay Image */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
          <AnimatePresence>
            {showLocalPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                className="w-full max-w-[420px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl border border-white/20 bg-neutral-900/80 backdrop-blur-sm"
              >
                <img src={image} alt={title} className="w-full h-auto object-contain" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View button */}
        <motion.button
          onClick={handleReadMoreClick}
          aria-label={`View ${title}`}
          className="flex items-center gap-2 cursor-pointer group/btn relative z-30"
          whileHover={{ x: 4 }}
          transition={BTN_SPRING}
          disabled={!href}
          style={{ opacity: !href ? 0.3 : 1 }}
        >
          <span className="text-sm uppercase tracking-widest font-semibold group-hover/btn:text-white transition-colors">View</span>
          <img src="assets/arrow-right.svg" className="w-4 opacity-70 group-hover/btn:opacity-100 transition-opacity" alt="" />
        </motion.button>
      </div>
    </motion.article>
  );
};

export default Project;