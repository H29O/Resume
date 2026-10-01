import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../../data/portfolioData';
import { CheckCircle2, Building, Calendar } from 'lucide-react';
import './Experience.css';

export default function Experience() {
  return (
    <section className="experience-section section-wrapper" id="experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-cobalt font-ui">02 // ORGANIZATIONS</span>
            <span className="section-subtitle font-ui">LEADERSHIP & RESPONSIBILITIES</span>
          </div>
          <h2 className="section-title font-display">
            EDITORIAL LEADERSHIP & STUDENT COLLABORATION.
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="experience-timeline">
          <div className="timeline-track-line" aria-hidden="true" />

          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Visual Node */}
              <div className="timeline-node">
                <div className="timeline-node-inner" />
              </div>

              {/* Experience Card */}
              <div className="experience-card">
                <div className="experience-card-header">
                  <div>
                    <span className="badge-pill badge-yellow font-ui exp-badge">
                      {exp.type}
                    </span>
                    <h3 className="exp-role font-display">{exp.role}</h3>
                  </div>

                  <div className="exp-meta">
                    <span className="exp-org font-ui">
                      <Building size={14} />
                      {exp.organization}
                    </span>
                    <span className="exp-institution font-body">
                      {exp.institution}
                    </span>
                    <span className="exp-period font-ui">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <div className="exp-body">
                  <h4 className="exp-bullets-title font-ui">DOCUMENTED RESPONSIBILITIES & CONTRIBUTIONS</h4>
                  <ul className="exp-bullets-list">
                    {exp.contributions.map((contribution, cIdx) => (
                      <li key={cIdx} className="exp-bullet-item font-body">
                        <CheckCircle2 size={16} className="bullet-check-icon" />
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
