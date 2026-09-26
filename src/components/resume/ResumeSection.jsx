import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { useGaze } from '../../hooks/useGaze';
import { FileText, Download, Eye, ExternalLink, X } from 'lucide-react';
import './ResumeSection.css';

export default function ResumeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { setGazeTarget, clearGazeTarget, triggerGrin } = useGaze();

  const handleHover = (e, label) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGazeTarget({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      label
    });
  };

  return (
    <section className="resume-section section-wrapper" id="resume">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-yellow font-ui">06 // OFFICIAL RESUME</span>
            <span className="section-subtitle font-ui">AUTHORITATIVE DOCUMENTATION</span>
          </div>
          <h2 className="section-title font-display">
            CURATED PROFILE & VERIFIABLE CREDENTIALS.
          </h2>
        </div>

        {/* Resume Banner Card */}
        <motion.div
          className="resume-banner-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          onMouseEnter={(e) => handleHover(e, 'Resume Document')}
          onMouseLeave={clearGazeTarget}
        >
          <div className="resume-card-left">
            <div className="resume-doc-icon-wrapper">
              <FileText size={36} className="resume-doc-icon" />
            </div>

            <div className="resume-info-meta">
              <span className="resume-status-pill font-ui">
                <span className="status-live-dot" />
                VERIFIED PDF RESUME
              </span>
              <h3 className="resume-doc-title font-display">
                Heet Oswal — Curriculum Vitae
              </h3>
              <p className="resume-doc-subtitle font-body">
                Official single-page resume covering Education (PCCOE, HSC, CBSE), full-stack project systems (Ripple, Nirvana, Email Sorter), editorial leadership, and verified skills.
              </p>
            </div>
          </div>

          <div className="resume-card-actions">
            <button
              type="button"
              className="btn btn-yellow font-ui"
              onClick={() => {
                setModalOpen(true);
                triggerGrin('grin', 1200);
              }}
              onMouseEnter={(e) => handleHover(e, 'VIEW RESUME')}
              onMouseLeave={clearGazeTarget}
            >
              <Eye size={18} />
              <span>VIEW RESUME</span>
            </button>

            <a
              href={personalInfo.resumePath}
              download="Heet_Oswal_Resume.pdf"
              className="btn btn-cobalt font-ui"
              onMouseEnter={(e) => handleHover(e, 'DOWNLOAD RESUME')}
              onMouseLeave={clearGazeTarget}
            >
              <Download size={18} />
              <span>DOWNLOAD PDF</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Embedded Resume Modal Preview */}
      {modalOpen && (
        <div className="resume-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <div className="modal-title-group">
                <FileText size={20} className="modal-icon" />
                <span className="font-ui modal-title">RESUME VIEWER — HEET OSWAL</span>
              </div>

              <div className="modal-actions-group">
                <a
                  href={personalInfo.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline modal-btn font-ui"
                >
                  <ExternalLink size={15} />
                  <span>NEW TAB</span>
                </a>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setModalOpen(false)}
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            <div className="resume-iframe-wrapper">
              <iframe
                src={`${personalInfo.resumePath}#toolbar=1&navpanes=0`}
                title="Heet Oswal Resume PDF"
                className="resume-iframe"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
