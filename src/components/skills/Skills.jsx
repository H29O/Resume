import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillsData } from '../../data/portfolioData';
import { Terminal, Database, Wrench, Globe, Sparkles } from 'lucide-react';
import './Skills.css';

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(skillsData.categories[0].skills[0]);

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'Languages': return <Terminal size={18} />;
      case 'Frameworks & Web': return <Globe size={18} />;
      case 'Databases': return <Database size={18} />;
      case 'Tools & Cloud': return <Wrench size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <section className="skills-section section-wrapper" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label-group">
            <span className="badge-pill badge-cobalt font-ui">04 // TOOLKIT & ECOSYSTEM</span>
            <span className="section-subtitle font-ui">TECHNICAL ECOSYSTEM FROM RESUME</span>
          </div>
          <h2 className="section-title font-display">
            FOCUSED STACK FOR RELIABLE SYSTEMS & FAST INTERFACES.
          </h2>
        </div>

        <div className="skills-interactive-layout">
          {/* Categories Grid */}
          <div className="skills-categories-grid">
            {skillsData.categories.map((category, catIdx) => (
              <motion.div
                key={catIdx}
                className="skill-category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              >
                <div className="category-header">
                  <div className="category-icon-box">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="category-title font-ui">{category.name}</h3>
                </div>

                <div className="skills-pill-group">
                  {category.skills.map((skill, sIdx) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        className={`skill-pill font-ui ${isSelected ? 'skill-pill-active' : ''}`}
                        onMouseEnter={() => setSelectedSkill(skill)}
                        onClick={() => setSelectedSkill(skill)}
                        aria-pressed={isSelected}
                      >
                        <span className="skill-name">{skill.name}</span>
                        {isSelected && <span className="skill-active-indicator" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Selected Skill Detail Card without evaluative labels */}
          <motion.div
            className="skill-inspector-card"
            key={selectedSkill?.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <h4 className="inspector-skill-title font-display">
              {selectedSkill?.name}
            </h4>

            <div className="inspector-content">
              <p className="inspector-desc font-body">
                {selectedSkill?.note}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
