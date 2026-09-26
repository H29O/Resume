import React, { useEffect, useState, useRef } from 'react';
import './CursorFollower.css';

export default function CursorFollower() {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show on devices with mouse/fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check if hovering interactive element
      const targetEl = e.target;
      const isInteractive = targetEl.closest('a, button, [role="button"], input, textarea, .skill-pill, .education-card, .contact-link-card, .character-container');
      setIsHovering(!!isInteractive);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animId;
    const render = () => {
      // Smooth interpolation for ring
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'dot-hover' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovering ? 'ring-hover' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
