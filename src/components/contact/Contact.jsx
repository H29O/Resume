import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from '../common/BrandIcons';
import { Mail, ArrowUpRight, Copy, Check, Sparkles } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const contactLinks = [
    {
      label: "EMAIL DIRECTLY",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: <Mail size={22} />,
      color: "yellow",
      description: "Direct email contact for opportunities & queries"
    },
    {
      label: "LINKEDIN",
      value: "linkedin.com/in/heet-oswal",
      href: personalInfo.linkedin,
      icon: <LinkedinIcon size={22} />,
      color: "cobalt",
      description: "Professional updates, network & experience"
    },
    {
      label: "GITHUB",
      value: "github.com/H29O",
      href: personalInfo.github,
      icon: <GithubIcon size={22} />,
      color: "charcoal",
      description: "Code repositories, projects & commit history"
    },
    {
      label: "LEETCODE",
      value: "leetcode.com/u/Heet29/",
      href: personalInfo.leetcode,
      icon: <LeetcodeIcon size={22} />,
      color: "yellow",
      description: "Algorithmic problem solving & data structures"
    }
  ];

  return (
    <section className="contact-section section-wrapper" id="contact">
      <div className="container">
        {/* Large Typographic Statement */}
        <div className="contact-statement-wrapper">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="badge-pill badge-yellow font-ui contact-pill">
              <Sparkles size={14} />
              <span>07 // GET IN TOUCH</span>
            </span>

            <h2 className="contact-statement font-display">
              LET'S BUILD SOMETHING.
            </h2>

            <p className="contact-subtitle font-body">
              Available for software engineering roles, internships, and technical collaborations. Whether you have a project in mind or want to discuss Spring Boot microservices, feel free to reach out.
            </p>

            {/* Email Fast Copy Bar */}
            <div className="email-copy-bar">
              <span className="email-display font-ui">{personalInfo.email}</span>
              <button
                type="button"
                className={`btn font-ui copy-email-btn ${copied ? 'copied-btn' : 'btn-yellow'}`}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    <span>COPIED TO CLIPBOARD!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="contact-links-grid">
          {contactLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`contact-link-card card-${item.color}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="contact-card-header">
                <div className="contact-icon-box">{item.icon}</div>
                <ArrowUpRight size={20} className="contact-card-arrow" />
              </div>

              <div className="contact-card-info">
                <span className="contact-card-label font-ui">{item.label}</span>
                <span className="contact-card-value font-display">{item.value}</span>
                <p className="contact-card-desc font-body">{item.description}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
