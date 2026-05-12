import { useLenis } from './hooks/useLenis';
import MatrixRain from './components/MatrixRain';
import GooeyCursor from './components/GooeyCursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import MarqueeStrip from './sections/MarqueeStrip';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import BlogSection from './sections/BlogSection';
import ContactSection from './sections/ContactSection';

function App() {
  useLenis();

  return (
    <>
      <MatrixRain />
      <GooeyCursor />
      <Navigation />
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <BlogSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

export default App;
