import { useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="section-label">/ Über mich</div>
      <div className="about-grid">
        <div className="about-text reveal">
          <h2>Ich entwickle Produkte,<br /><em>die begeistern.</em></h2>
          <p>Mit Leidenschaft für sauberen Code und nutzerzentriertes Design entwickle ich Software, die nicht nur funktioniert – sondern überzeugt.</p>
          <p>Ob iOS-App, Android-App oder responsives Webprojekt: ich setze Anforderungen in sauberen, wartbaren Code um.</p>
        </div>
        <div className="about-image reveal">
          <div className="avatar-box">
            <div className="avatar-inner">
              <div className="avatar-initials">AC</div>
            </div>
            <div className="avatar-ring" />
            <span className="avatar-tag tag-1">Flutter</span>
            <span className="avatar-tag tag-2">Node.js</span>
            <span className="avatar-tag tag-3">Next.js</span>
          </div>
        </div>
      </div>
    </section>
  );
}
