import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { useGaze } from '../../hooks/useGaze';
import { ArrowDown, Code2 } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const { setGazeTarget, clearGazeTarget } = useGaze();

  const handleElementHover = (e, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGazeTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      label
    });
  };

  return (
    <section className="hero-section" id="hero">
      {/* Subtle Environmental Backdrop Accents */}
      <div className="hero-background-shapes" aria-hidden="true">
        <div className="shape-blob blob-yellow" />
        <div className="shape-blob blob-cobalt" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-container">
        {/* Central Visual Focus: Animated Character Anchor */}
        <div
          className="hero-character-stage"
          id="hero-character-stage"
        >
          <div id="hero-character-anchor" className="hero-character-placeholder" aria-hidden="true" />
        </div>

        {/* Core Typography & Identity */}
        <div className="hero-content">
          <motion.div
            className="hero-title-group"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-name font-display">
              {personalInfo.name}
            </h1>
            <div className="hero-role-wrapper">
              <p className="hero-role font-ui">
                B.Tech Information Technology Student
              </p>
              <span className="hero-role-separator">•</span>
              <p className="hero-role-accent font-ui">
                Full-Stack Developer
              </p>
            </div>
          </motion.div>

          <motion.p
            className="hero-bio font-body"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            Engineering robust backend microservices with Java Spring Boot, developing responsive React applications, and architecting task dependency analytics.
          </motion.p>

          {/* Quick CTA Actions */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
          >
            <a
              href="#work"
              className="btn btn-yellow font-ui hero-cta"
              onMouseEnter={(e) => handleElementHover(e, 'EXPLORE WORK')}
              onMouseLeave={clearGazeTarget}
            >
              <Code2 size={18} />
              <span>EXPLORE WORK</span>
            </a>

            <a
              href="#contact"
              className="btn btn-cobalt font-ui"
              onMouseEnter={(e) => handleElementHover(e, 'GET IN TOUCH')}
              onMouseLeave={clearGazeTarget}
            >
              <span>GET IN TOUCH</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.58 }}
        >
          <a
            href="#about"
            className="scroll-cue-link font-ui"
            aria-label="Scroll down to About section"
            onMouseEnter={(e) => handleElementHover(e, 'EXPLORE DOWN')}
            onMouseLeave={clearGazeTarget}
          >
            <span className="scroll-cue-text">EXPLORE</span>
            <div className="scroll-arrow-box">
              <ArrowDown size={16} className="scroll-arrow-icon" />
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
