import React from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/portfolioData';
import { GithubIcon } from '../common/BrandIcons';
import { ArrowRight } from 'lucide-react';
import './Projects.css';

export default function Projects() {
  return (
    <section className="projects-section section-wrapper" id="work">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-yellow font-ui">03 // SELECTED WORKS</span>
            <span className="section-subtitle font-ui">SYSTEMS & FULL-STACK APPLICATIONS</span>
          </div>
          <h2 className="section-title font-display">
            ENGINEERED SYSTEMS BUILT FOR SCALE & PREDICTABILITY.
          </h2>
        </div>

        {/* Large Project Showcase List */}
        <div className="projects-list">
          {projectsData.map((project, idx) => (
            <motion.article
              key={project.id}
              className={`project-feature-card theme-${project.theme}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
            >
              <div className="project-grid">
                {/* Left Column: Metadata & Narrative */}
                <div className="project-narrative">
                  <div className="project-header-top">
                    <span className="project-number font-display">{project.number}</span>
                    <div className="project-category-wrapper">
                      <span className="project-subtitle font-ui">{project.subtitle}</span>
                      <h3 className="project-title font-display">{project.title}</h3>
                    </div>
                  </div>

                  <p className="project-description font-body">
                    {project.description}
                  </p>

                  <div className="project-architecture-box">
                    <span className="arch-label font-ui">ARCHITECTURE & PATTERN</span>
                    <p className="arch-text font-body">{project.architecture}</p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="project-highlights">
                    <span className="highlights-title font-ui">KEY TECHNICAL DELIVERABLES</span>
                    <ul className="highlights-list">
                      {project.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="highlight-item font-body">
                          <span className="highlight-bullet" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Badges */}
                  <div className="project-tech-tags">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="badge-pill font-ui project-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links / CTA */}
                  <div className="project-actions">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-yellow font-ui project-cta-btn"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <GithubIcon size={18} />
                      <span>VIEW ON GITHUB</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

                {/* Right Column: Visual Architecture Preview */}
                <div className="project-visual-preview">
                  <div className="preview-card-inner">
                    <div className="preview-header-bar">
                      <span className="bar-circle circle-red" />
                      <span className="bar-circle circle-yellow" />
                      <span className="bar-circle circle-green" />
                      <span className="preview-header-title font-ui">
                        {project.title.toLowerCase()}.system.spec
                      </span>
                    </div>

                    {/* Custom Visual Representation depending on project */}
                    {project.id === 'ripple' && (
                      <div className="visual-diagram ripple-diagram">
                        <div className="diagram-node node-source">
                          <span className="node-id font-ui">TASK-A</span>
                          <span className="node-status font-ui status-delay">+2d Delay</span>
                        </div>
                        <div className="diagram-connector">
                          <span className="connector-pulse" />
                        </div>
                        <div className="diagram-node node-affected">
                          <span className="node-id font-ui">TASK-B (DEPENDENT)</span>
                          <span className="node-status font-ui status-impact">Impact Flagged</span>
                        </div>
                        <div className="diagram-connector">
                          <span className="connector-pulse" />
                        </div>
                        <div className="diagram-node node-recalculated">
                          <span className="node-id font-ui">PROJECT SCHEDULE</span>
                          <span className="node-status font-ui status-calc">Auto-Recalculated</span>
                        </div>

                        <div className="diagram-stats-overlay">
                          <div className="overlay-stat">
                            <span className="stat-num font-display">100%</span>
                            <span className="stat-desc font-ui">Dependency Graph Traversal</span>
                          </div>
                          <div className="overlay-stat">
                            <span className="stat-num font-display">PostgreSQL</span>
                            <span className="stat-desc font-ui">Relational Cascade Engine</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'nirvana' && (
                      <div className="visual-diagram nirvana-diagram">
                        <div className="nirvana-ledger-preview">
                          <div className="ledger-row header-row font-ui">
                            <span>ENTRY</span>
                            <span>TYPE</span>
                            <span>OCR STATUS</span>
                            <span>BALANCE</span>
                          </div>
                          <div className="ledger-row font-body">
                            <span>Cloud Infrastructure</span>
                            <span className="badge-type expense">Expense</span>
                            <span className="ocr-verified">OCR Verified ✓</span>
                            <span className="amount-col font-ui">-₹4,200</span>
                          </div>
                          <div className="ledger-row font-body">
                            <span>P2P Lending - Alex</span>
                            <span className="badge-type lend">Lending</span>
                            <span className="ocr-verified">Active</span>
                            <span className="amount-col font-ui">+₹12,000</span>
                          </div>
                          <div className="ledger-row font-body">
                            <span>Spring Boot Workshop</span>
                            <span className="badge-type income">Income</span>
                            <span className="ocr-verified">Receipt Cached</span>
                            <span className="amount-col font-ui">+₹8,500</span>
                          </div>
                        </div>

                        <div className="diagram-stats-overlay">
                          <div className="overlay-stat">
                            <span className="stat-num font-display">OCR</span>
                            <span className="stat-desc font-ui">Receipt Auto-Parsing</span>
                          </div>
                          <div className="overlay-stat">
                            <span className="stat-num font-display">React + Spring</span>
                            <span className="stat-desc font-ui">Dual-Sided Bookkeeping</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {project.id === 'automated-email-sorter' && (
                      <div className="visual-diagram email-diagram">
                        <div className="n8n-flow-wrapper">
                          <div className="flow-step">
                            <div className="flow-icon-circle gmail-icon font-ui">GMAIL</div>
                            <span className="flow-label font-ui">Incoming Webhook</span>
                          </div>
                          <div className="flow-arrow">→</div>
                          <div className="flow-step">
                            <div className="flow-icon-circle n8n-icon font-ui">n8n</div>
                            <span className="flow-label font-ui">Rule Engine</span>
                          </div>
                          <div className="flow-arrow">→</div>
                          <div className="flow-step">
                            <div className="flow-icon-circle gcp-icon font-ui">GCP</div>
                            <span className="flow-label font-ui">Dynamic Tagged</span>
                          </div>
                        </div>

                        <div className="diagram-stats-overlay">
                          <div className="overlay-stat">
                            <span className="stat-num font-display">Zero-Code</span>
                            <span className="stat-desc font-ui">Serverless Automation</span>
                          </div>
                          <div className="overlay-stat">
                            <span className="stat-num font-display">Gmail API</span>
                            <span className="stat-desc font-ui">Dynamic Categorization</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
