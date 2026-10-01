import React, { useState, useEffect } from 'react';
import { navLinks, personalInfo } from '../../data/portfolioData';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container-wide navbar-inner">
        {/* Typographic Logo */}
        <a
          href="#"
          className="nav-logo"
          aria-label="Heet Oswal - Back to top"
        >
          <span className="logo-text font-display">HEET</span>
          <span className="logo-dot" />
          <span className="logo-role font-ui">PORTFOLIO</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-menu" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="nav-link font-ui"
            >
              <span className="nav-link-text">{link.label}</span>
              <span className="nav-link-indicator" />
            </a>
          ))}
        </nav>

        {/* Action Button: Resume */}
        <div className="nav-actions">
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline nav-resume-btn font-ui"
          >
            <FileText size={16} />
            <span>RESUME</span>
            <ArrowUpRight size={14} className="arrow-icon" />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <nav className="mobile-nav-links">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="mobile-nav-link font-ui"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={personalInfo.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-cobalt font-ui mobile-resume-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText size={18} />
              <span>VIEW RESUME (PDF)</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
