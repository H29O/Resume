import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../../data/portfolioData';
import { useGaze } from '../../hooks/useGaze';
import { Trophy, Award, Flame } from 'lucide-react';
import './Achievements.css';

export default function Achievements() {
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
    <section className="achievements-section section-wrapper" id="achievements">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-yellow font-ui">05 // COMPETITIVE TRACK</span>
            <span className="section-subtitle font-ui">HACKATHONS & RECOGNITION</span>
          </div>
          <h2 className="section-title font-display">
            COMPETITION, PROBLEM SOLVING & INNOVATION.
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="achievements-grid">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onMouseEnter={(e) => handleCardHover(e, item.title)}
              onMouseLeave={clearGazeTarget}
            >
              <div className="achievement-card-top">
                <div className="achievement-icon-circle">
                  {idx === 0 ? <Trophy size={20} /> : idx === 1 ? <Flame size={20} /> : <Award size={20} />}
                </div>
                <span className="achievement-year font-ui">{item.year}</span>
              </div>

              <span className="badge-pill badge-cobalt font-ui achievement-tag">
                {item.tag}
              </span>

              <h3 className="achievement-title font-display">
                {item.title}
              </h3>

              <div className="achievement-result-box">
                <span className="result-label font-ui">STATUS / RESULT</span>
                <span className="result-value font-ui">{item.result}</span>
              </div>

              <p className="achievement-desc font-body">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
