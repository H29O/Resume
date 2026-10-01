import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { ArrowDown, Code2, FileText, Sparkles } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section" id="hero">
      {/* Environmental Backdrop Accents */}
      <div className="hero-background-shapes" aria-hidden="true">
        <div className="shape-blob blob-yellow" />
        <div className="shape-blob blob-cobalt" />
        <div className="hero-grid-pattern" />
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          {/* Status Eyebrow Badge */}
          <motion.div
            className="hero-eyebrow-wrapper"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-status-pill font-ui">
              <span className="status-live-dot" />
              <span>AVAILABLE FOR OPPORTUNITIES</span>
              <span className="status-pill-sep">•</span>
              <span className="status-pill-highlight">PUNE, IN</span>
            </div>
          </motion.div>

          {/* Core Typographic Statement */}
          <motion.div
            className="hero-title-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="hero-name font-display">
              {personalInfo.name}
            </h1>
            <div className="hero-role-wrapper">
              <span className="hero-role font-ui">
                B.Tech Information Technology Student
              </span>
              <span className="hero-role-separator">•</span>
              <span className="hero-role-accent font-ui">
                Full-Stack Developer
              </span>
            </div>
          </motion.div>

          {/* Bio Narrative */}
          <motion.p
            className="hero-bio font-body"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            Engineering robust backend microservices with Java Spring Boot, developing responsive React applications, and architecting task dependency analytics.
          </motion.p>

          {/* Quick Technical Competencies Strip */}
          <motion.div
            className="hero-competencies-strip"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="competency-tag font-ui">JAVA SPRING BOOT</span>
            <span className="competency-sep">•</span>
            <span className="competency-tag font-ui">REACT & JAVASCRIPT</span>
            <span className="competency-sep">•</span>
            <span className="competency-tag font-ui">POSTGRESQL</span>
            <span className="competency-sep">•</span>
            <span className="competency-tag font-ui">PCCOE '26 (8.21 CGPA)</span>
          </motion.div>

          {/* Primary Call-to-Actions */}
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              className="btn btn-yellow font-ui hero-cta"
            >
              <Code2 size={18} />
              <span>EXPLORE WORK</span>
            </a>

            <a
              href="#contact"
              className="btn btn-cobalt font-ui"
            >
              <Sparkles size={16} />
              <span>GET IN TOUCH</span>
            </a>

            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline font-ui hero-resume-btn"
            >
              <FileText size={17} />
              <span>VIEW RESUME</span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Cue */}
        <motion.div
          className="hero-scroll-cue"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <a
            href="#about"
            className="scroll-cue-link font-ui"
            aria-label="Scroll down to About section"
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
