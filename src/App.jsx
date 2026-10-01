import React from 'react';
import Navbar from './components/navigation/Navbar';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';
import Achievements from './components/achievements/Achievements';
import ResumeSection from './components/resume/ResumeSection';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import CursorFollower from './components/common/CursorFollower';
import './App.css';

export default function App() {
  return (
    <div className="portfolio-app">
      <CursorFollower />
      <Navbar />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <ResumeSection />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
