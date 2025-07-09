import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.7,
      class: 'is-reveal',
      lerp: 0.05,
      getDirection: true,
      getSpeed: true,
      smartphone: {
        smooth: true,
        multiplier: 0.5,
        lerp: 0.05
      },
      tablet: {
        smooth: true,
        multiplier: 0.6,
        lerp: 0.05
      }
    });

    // Update scroll position on resize
    window.addEventListener('resize', () => {
      scroll.update();
    });

    return () => {
      scroll.destroy();
      window.removeEventListener('resize', () => {
        scroll.update();
      });
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default SmoothScroll; 