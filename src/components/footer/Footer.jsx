import React from 'react';
import { ArrowUp } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-inner">
        <div className="footer-left">
          <span className="footer-brand font-display">HEET OSWAL</span>
          <p className="footer-subtext font-body">
            B.Tech Information Technology Student at PCCOE. Built with intentional craftsmanship, Fontshare Array & Khand typography, and responsive modern engineering.
          </p>
        </div>

        <div className="footer-center">
          <div className="footer-meta-item">
            <span className="meta-label font-ui">LOCATION</span>
            <span className="meta-value font-ui">Pune, Maharashtra, India</span>
          </div>
          <div className="footer-meta-item">
            <span className="meta-label font-ui">LOCAL TIME</span>
            <span className="meta-value font-ui">IST (UTC +5:30)</span>
          </div>
        </div>

        <div className="footer-right">
          <button
            type="button"
            className="btn btn-outline back-to-top-btn font-ui"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </button>
          <span className="footer-copyright font-ui">
            © {new Date().getFullYear()} HEET OSWAL. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
}
