import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGaze } from '../../hooks/useGaze';
import './Character.css';

export default function Character({
  scrollCompanion = true,
  size = 'hero',
  showStatusBadge = false,
  interactive = true,
  className = ''
}) {
  const containerRef = useRef(null);
  const headWrapperRef = useRef(null);
  const leftPupilGroupRef = useRef(null);
  const rightPupilGroupRef = useRef(null);

  const { gazeTarget, characterMood, triggerCelebration } = useGaze();

  // Eye tracking physics references
  const currentGaze = useRef({ x: 0, y: 0 });
  const targetGaze = useRef({ x: 0, y: 0 });
  const rawCursorGaze = useRef({ x: 0, y: 0 });

  // Expressions & toasts
  const [isBlinking, setIsBlinking] = useState(false);
  const [isGrinning, setIsGrinning] = useState(false);
  const [isDockedState, setIsDockedState] = useState(false);
  const [interactionToast, setInteractionToast] = useState(null);
  const toastTimeoutRef = useRef(null);
  const grinTimeoutRef = useRef(null);

  // Sync smile with global mood
  useEffect(() => {
    if (characterMood === 'grin' || characterMood === 'happy') {
      setIsGrinning(true);
      if (grinTimeoutRef.current) clearTimeout(grinTimeoutRef.current);
      grinTimeoutRef.current = setTimeout(() => {
        setIsGrinning(false);
      }, 1600);
    }
  }, [characterMood]);

  // Click & tap handler: triggers full-face smile
  const handleCharacterClick = useCallback((e) => {
    if (!interactive) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height * 0.35) / window.innerHeight;

    triggerCelebration(originX, originY);

    setIsGrinning(true);
    if (grinTimeoutRef.current) clearTimeout(grinTimeoutRef.current);
    grinTimeoutRef.current = setTimeout(() => {
      setIsGrinning(false);
    }, 1600);

    const friendlyMessages = [
      "Hey! Thanks for visiting my portfolio! ✨",
      "I'm Heet — B.Tech IT student & developer!",
      "Exploring full-stack & backend systems!",
      "Feel free to check out Ripple and Nirvana below 🚀",
      "Ready to build something awesome together!"
    ];
    const msg = friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];
    setInteractionToast(msg);

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setInteractionToast(null);
    }, 3200);
  }, [interactive, triggerCelebration]);

  // Symmetrical natural blinking (both eyes synchronous, zero winks)
  useEffect(() => {
    let blinkTimer;
    const scheduleNextBlink = () => {
      const delay = 3200 + Math.random() * 2800;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          // 25% chance of realistic double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => {
              setIsBlinking(true);
              setTimeout(() => {
                setIsBlinking(false);
                scheduleNextBlink();
              }, 110);
            }, 140);
          } else {
            scheduleNextBlink();
          }
        }, 130);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Store gazeTarget in ref to prevent effect teardown on hover
  const gazeTargetRef = useRef(gazeTarget);
  useEffect(() => {
    gazeTargetRef.current = gazeTarget;
  }, [gazeTarget]);

  // Global mousemove & touchmove listener with asymmetric full-range viewport normalization
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width * 0.5;
      const faceCenterY = rect.top + rect.height * 0.37;

      // Distance from face center
      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      // Asymmetric normalization based on available distance to each viewport edge
      // Guarantees norm reaching [-1, 1] in all 4 cardinal directions and diagonals
      const availLeft = Math.max(60, faceCenterX);
      const availRight = Math.max(60, window.innerWidth - faceCenterX);
      const availUp = Math.max(60, faceCenterY);
      const availDown = Math.max(60, window.innerHeight - faceCenterY);

      const normX = deltaX < 0
        ? Math.max(-1, deltaX / availLeft)
        : Math.min(1, deltaX / availRight);

      const normY = deltaY < 0
        ? Math.max(-1, deltaY / availUp)
        : Math.min(1, deltaY / availDown);

      // Natural power curve: responsive and visible everywhere across the viewport
      const signX = Math.sign(normX);
      const signY = Math.sign(normY);
      const easedX = signX * Math.pow(Math.abs(normX), 0.82);
      const easedY = signY * Math.pow(Math.abs(normY), 0.82);

      rawCursorGaze.current = { x: easedX, y: easedY };
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        handleMouseMove(e.touches[0]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Persistent scroll progress ref — survives re-renders and hovers with ZERO position jumping
  const smoothedProgressRef = useRef(0);

  // Scroll Companion & 60FPS Physics Loop (Direct DOM updates: ZERO re-renders, ZERO glitching!)
  useEffect(() => {
    let animationFrameId;
    let wasDocked = false;

    const updateLoop = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;

      if (scrollCompanion && containerRef.current) {
        const anchorEl = document.getElementById('hero-character-anchor') || document.getElementById('hero-character-stage');
        let heroRect = null;
        if (anchorEl) {
          const r = anchorEl.getBoundingClientRect();
          heroRect = {
            left: r.left,
            top: r.top + scrollY,
            width: r.width,
            height: r.height
          };
        }

        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024 && !isMobile;

        // BOTTOM-RIGHT destination dimensions & positioning
        const dockWidth = isMobile ? 74 : (isTablet ? 96 : 118);
        const dockHeight = dockWidth / (1624 / 1496);
        const dockRight = isMobile ? 16 : Math.min(48, Math.max(24, window.innerWidth * 0.032));
        const dockBottom = isMobile ? 20 : Math.min(48, Math.max(24, window.innerHeight * 0.042));
        const dockLeft = window.innerWidth - dockRight - dockWidth;
        const dockTop = window.innerHeight - dockBottom - dockHeight;

        // Transition progress: 0 at scrollY <= 25, 1 at scrollY >= 380
        const startScroll = 25;
        const endScroll = 380;
        const rawTargetProgress = Math.min(1, Math.max(0, (scrollY - startScroll) / (endScroll - startScroll)));

        smoothedProgressRef.current += (rawTargetProgress - smoothedProgressRef.current) * 0.16;
        if (Math.abs(smoothedProgressRef.current - rawTargetProgress) < 0.002) {
          smoothedProgressRef.current = rawTargetProgress;
        }
        if (rawTargetProgress === 1 && smoothedProgressRef.current >= 0.985) {
          smoothedProgressRef.current = 1;
        } else if (rawTargetProgress === 0 && smoothedProgressRef.current <= 0.015) {
          smoothedProgressRef.current = 0;
        }

        const isDocked = smoothedProgressRef.current > 0.85;
        if (isDocked !== wasDocked) {
          wasDocked = isDocked;
          setIsDockedState(isDocked);
          if (isDocked) {
            containerRef.current.classList.add('character-is-docked');
          } else {
            containerRef.current.classList.remove('character-is-docked');
          }
        }

        const p = smoothedProgressRef.current;
        const easeP = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;

        if (heroRect && heroRect.width > 0) {
          let curLeft, curTop, curWidth, curHeight;

          if (smoothedProgressRef.current >= 0.985) {
            curLeft = dockLeft;
            curTop = dockTop;
            curWidth = dockWidth;
            curHeight = dockHeight;
          } else {
            const heroCurrentTop = Math.max(-50, heroRect.top - scrollY);
            const heroCurrentLeft = heroRect.left;
            const heroCurrentWidth = heroRect.width;
            const heroCurrentHeight = heroRect.height;

            curLeft = heroCurrentLeft * (1 - easeP) + dockLeft * easeP;
            curTop = heroCurrentTop * (1 - easeP) + dockTop * easeP;
            curWidth = heroCurrentWidth * (1 - easeP) + dockWidth * easeP;
            curHeight = heroCurrentHeight * (1 - easeP) + dockHeight * easeP;
          }

          // Authoritative position strictly derived from scroll state (immune to hover / animations)
          const style = containerRef.current.style;
          style.position = 'fixed';
          style.left = `${curLeft}px`;
          style.top = `${curTop}px`;
          style.width = `${curWidth}px`;
          style.height = `${curHeight}px`;
          style.zIndex = smoothedProgressRef.current > 0.5 ? '900' : '10';
          style.opacity = '1';
        }
      }

      // Compute target gaze:
      // When at Hero: cursor tracking active
      // As scroll proceeds: cursor tracking disengages completely
      // When docked at bottom-right: settled gaze looking UP-LEFT toward portfolio content
      const cursorWeight = Math.max(0, Math.min(1, 1 - smoothedProgressRef.current * 1.5));
      const settledWeight = 1 - cursorWeight;

      // Authoritative UP-LEFT gaze looking back at content above and to the left
      const upLeftGaze = { x: -0.85, y: -0.78 };

      let desiredX = rawCursorGaze.current.x;
      let desiredY = rawCursorGaze.current.y;

      // Only follow gazeTarget if in Hero mode (scrollY <= 60 and cursorWeight > 0.6)
      if (gazeTargetRef.current && cursorWeight > 0.6 && scrollY <= 60) {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const faceCenterX = rect.left + rect.width * 0.5;
          const faceCenterY = rect.top + rect.height * 0.37;
          const availLeft = Math.max(60, faceCenterX);
          const availRight = Math.max(60, window.innerWidth - faceCenterX);
          const availUp = Math.max(60, faceCenterY);
          const availDown = Math.max(60, window.innerHeight - faceCenterY);

          const dX = gazeTargetRef.current.x - faceCenterX;
          const dY = gazeTargetRef.current.y - faceCenterY;

          const nX = dX < 0 ? Math.max(-1, dX / availLeft) : Math.min(1, dX / availRight);
          const nY = dY < 0 ? Math.max(-1, dY / availUp) : Math.min(1, dY / availDown);

          desiredX = Math.sign(nX) * Math.pow(Math.abs(nX), 0.82);
          desiredY = Math.sign(nY) * Math.pow(Math.abs(nY), 0.82);
        }
      }

      targetGaze.current = {
        x: desiredX * cursorWeight + upLeftGaze.x * settledWeight,
        y: desiredY * cursorWeight + upLeftGaze.y * settledWeight
      };

      // Snappy, responsive interpolation with natural smoothing (reduced lag)
      const lerpFactor = 0.22;
      const cur = currentGaze.current;
      const tgt = targetGaze.current;

      cur.x += (tgt.x - cur.x) * lerpFactor;
      cur.y += (tgt.y - cur.y) * lerpFactor;

      // Significantly increased eye/pupil movement range in BOTH directions (especially vertical)
      const maxDx = 20;
      const maxDy = 14;

      const rx = cur.x * maxDx;
      const ry = cur.y * maxDy;

      // Direct DOM updates on pupil groups (bypasses React reconciliation for 60fps smoothness)
      if (leftPupilGroupRef.current) {
        leftPupilGroupRef.current.setAttribute('transform', `translate(${rx}, ${ry})`);
      }
      if (rightPupilGroupRef.current) {
        rightPupilGroupRef.current.setAttribute('transform', `translate(${rx}, ${ry})`);
      }

      // 3D head tilt in Hero, stabilizing when docked
      if (headWrapperRef.current) {
        const headTiltDampener = Math.max(0, 1 - smoothedProgressRef.current * 1.2);
        const rotX = -cur.y * 5.5 * headTiltDampener;
        const rotY = cur.x * 6.5 * headTiltDampener;
        const transX = cur.x * 4.0 * headTiltDampener;
        const transY = cur.y * 3.0 * headTiltDampener;

        headWrapperRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${transX}px, ${transY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollCompanion]);

  // Exact Resting Eye Centers in native 2752 x 1536 ref.png coordinate space:
  // Left eye (viewer left): rest center (1250.5, 558.0)
  // Right eye (viewer right): rest center (1514.0, 580.5)
  const leftEyeCenter = { x: 1250.5, y: 558.0 };
  const rightEyeCenter = { x: 1514.0, y: 580.5 };

  const containerClasses = [
    'character-container',
    `character-${size}`,
    scrollCompanion ? 'character-companion-mode' : '',
    interactive ? 'character-interactive' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={scrollCompanion ? { position: 'fixed', opacity: 0 } : undefined}
      onClick={handleCharacterClick}
      title={interactive ? "Click me to smile! 😊" : undefined}
      role={interactive ? "button" : "img"}
      aria-label="Interactive character of Heet Oswal"
      tabIndex={interactive ? 0 : -1}
      onKeyDown={(e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
          handleCharacterClick(e);
        }
      }}
    >
      {/* Speech Toast Bubble */}
      {interactionToast && (
        <div className="character-speech-bubble" role="status">
          <span>{interactionToast}</span>
          <div className="speech-tail" />
        </div>
      )}

      {/* 3D Tilting Character Wrapper */}
      <div
        ref={headWrapperRef}
        className="character-head-wrapper"
      >
        <svg
          viewBox="560 40 1624 1496"
          className="character-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Left Eye Socket Clip Path — Snug to authentic eyelid boundaries */}
            <clipPath id="left-eye-socket-clip">
              <path d="M 1180 563 C 1210 545, 1270 544, 1310 558 C 1280 584, 1215 584, 1180 563 Z" />
            </clipPath>

            {/* Right Eye Socket Clip Path — Snug to authentic eyelid boundaries */}
            <clipPath id="right-eye-socket-clip">
              <path d="M 1460 574 C 1485 566, 1545 566, 1572 581 C 1550 604, 1488 604, 1460 574 Z" />
            </clipPath>
          </defs>

          {/* Layer 1: High-Resolution Authoritative Illustration Base with Clean Sclera Sockets */}
          <image
            href="/character_clean_base.webp"
            width="2752"
            height="1536"
            className="character-base-art"
          />

          {/* Layer 2: Dynamic Left Eye System */}
          <g id="dynamic-left-eye" className="eye-interactive-layer">
            <g clipPath="url(#left-eye-socket-clip)">
              {/* Moving Authentic Iris Group */}
              <g ref={leftPupilGroupRef} className="iris-pupil-group">
                <image
                  href="/character_iris_left.png"
                  x={leftEyeCenter.x - 32}
                  y={leftEyeCenter.y - 32}
                  width="64"
                  height="64"
                />
              </g>

              {/* Upper Eyelid for Blinking (Synchronous & Symmetrical) */}
              <path
                d="M 1175 530 Q 1245 535, 1315 530 L 1315 585 Q 1245 590, 1175 585 Z"
                fill="#B88875"
                className={`eyelid-flap ${isBlinking ? 'eyelid-closed' : 'eyelid-open'}`}
                style={{
                  transform: isBlinking ? 'translateY(20px)' : 'translateY(-70px)',
                  transition: isBlinking ? 'transform 0.08s ease-in' : 'transform 0.12s ease-out'
                }}
              />
            </g>
          </g>

          {/* Layer 3: Dynamic Right Eye System */}
          <g id="dynamic-right-eye" className="eye-interactive-layer">
            <g clipPath="url(#right-eye-socket-clip)">
              {/* Moving Authentic Iris Group */}
              <g ref={rightPupilGroupRef} className="iris-pupil-group">
                <image
                  href="/character_iris_right.png"
                  x={rightEyeCenter.x - 32}
                  y={rightEyeCenter.y - 32}
                  width="64"
                  height="64"
                />
              </g>

              {/* Upper Eyelid for Blinking (Synchronous & Symmetrical) */}
              <path
                d="M 1445 545 Q 1515 550, 1585 545 L 1585 605 Q 1515 610, 1445 605 Z"
                fill="#B88875"
                className={`eyelid-flap ${isBlinking ? 'eyelid-closed' : 'eyelid-open'}`}
                style={{
                  transform: isBlinking ? 'translateY(22px)' : 'translateY(-75px)',
                  transition: isBlinking ? 'transform 0.08s ease-in' : 'transform 0.12s ease-out'
                }}
              />
            </g>
          </g>

          {/* Layer 4: Genuine Natural Full-Face Smile Overlay (Tap / Click Triggered, NO BLUSH!) */}
          <image
            href="/character_smile_overlay.webp"
            width="2752"
            height="1536"
            className={`character-smile-overlay ${isGrinning ? 'smile-active' : ''}`}
            aria-hidden={!isGrinning}
          />
        </svg>
      </div>

      {/* Floating Status Pill */}
      {showStatusBadge && (
        <div className="character-status-badge">
          <span className="status-dot-pulse" />
          <span className="status-text">
            {isGrinning
              ? "Delighted to meet you! 😊"
              : isDockedState
              ? "Observing your journey"
              : gazeTarget
              ? "Looking at selection"
              : "Tracking your cursor"}
          </span>
        </div>
      )}
    </div>
  );
}
