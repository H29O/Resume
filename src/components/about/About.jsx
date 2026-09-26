import React from 'react';
import { motion } from 'framer-motion';
import { educationData, personalInfo } from '../../data/portfolioData';
import { useGaze } from '../../hooks/useGaze';
import { GraduationCap, Award, Terminal } from 'lucide-react';
import './About.css';

export default function About() {
  const { setGazeTarget, clearGazeTarget } = useGaze();

  const handleCardHover = (e, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGazeTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      label
    });
  };

  return (
    <section className="about-section section-wrapper" id="about">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-yellow font-ui">01 // ABOUT HEET</span>
            <span className="section-subtitle font-ui">EDUCATION & TECHNICAL DIRECTION</span>
          </div>
          <h2 className="section-title font-display">
            A BUILDER DRIVEN BY RIGOR AND PRACTICAL ARCHITECTURE.
          </h2>
        </div>

        {/* Editorial Introduction */}
        <div className="about-grid">
          <motion.div
            className="about-editorial-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            onMouseEnter={(e) => handleCardHover(e, 'Editorial Statement')}
            onMouseLeave={clearGazeTarget}
          >
            <div className="editorial-header">
              <Terminal size={22} className="editorial-icon" />
              <span className="font-ui editorial-tag">FOUNDATIONAL PERSPECTIVE</span>
            </div>
            <p className="editorial-lead font-display">
              "Software engineering is most rewarding when complex task interdependencies and business workflows become predictable, reliable, and measurable."
            </p>
            <p className="editorial-body font-body">
              Currently pursuing my <strong>Bachelor of Technology in Information Technology</strong> at <strong>PCCOE (Pimpri Chinchwad College of Engineering)</strong>, maintaining a cumulative <strong>CGPA of 8.21</strong>. My core technical pursuits revolve around full-stack system architecture, microservices using <strong>Java Spring Boot</strong>, and stateful user interfaces built with <strong>React</strong>.
            </p>
            <p className="editorial-body font-body">
              Whether modeling delay cascades in project schedules (Ripple) or constructing OCR-integrated financial ledgers (Nirvana), I prioritize maintainable architectures, clean relational data models, and disciplined engineering.
            </p>

            {/* Quick Stats Grid */}
            <div className="stats-row">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="stat-box">
                  <span className="stat-value font-display">{stat.value}</span>
                  <span className="stat-label font-ui">{stat.label}</span>
                  <span className="stat-detail">{stat.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline Cards */}
          <div className="about-education-column">
            <div className="column-title-box">
              <GraduationCap size={20} className="column-icon" />
              <h3 className="column-title font-ui">ACADEMIC JOURNEY</h3>
            </div>

            <div className="education-cards-list">
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  className="education-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  onMouseEnter={(e) => handleCardHover(e, item.degree)}
                  onMouseLeave={clearGazeTarget}
                >
                  <div className="education-card-top">
                    <span className="education-period font-ui">{item.period}</span>
                    <span className="badge-pill badge-yellow font-ui education-score">
                      <Award size={13} />
                      {item.score}
                    </span>
                  </div>

                  <h4 className="education-degree font-display">{item.degree}</h4>
                  <p className="education-institution font-ui">{item.institution}</p>

                  <ul className="education-bullets">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="education-bullet font-body">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
