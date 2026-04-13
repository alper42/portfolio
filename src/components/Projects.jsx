import { useEffect, useRef } from 'react';
import './Projects.css';

const PROJECTS = [
  {
    num: '01', type: 'Mobile App', year: '2023',
    title: 'Fahrplanauskunft App',
    desc: 'Entwicklung einer mobilen Flutter-App zur Abfrage von Fahrplänen im öffentlichen Nahverkehr. Anzeige von Verbindungen, Abfahrtszeiten und Routen in Echtzeit.',
    stack: ['Flutter'],
  },
  {
    num: '02', type: 'Mobile App', year: '2023',
    title: 'Ticket- / E-Ticket-App',
    desc: 'Entwicklung einer mobilen Flutter-App zum Kauf und zur Verwaltung von Tickets. Speicherung und Anzeige von Tickets per QR-Code sowie Darstellung relevanter Ticketinformationen.',
    stack: ['Flutter'],
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects" id="projects" ref={sectionRef}>
      <div className="section-label">/ Projekte</div>
      <h2 className="section-title">Ausgewählte Arbeiten</h2>
      <div className="projects-list">
        {PROJECTS.map((p) => (
          <div key={p.num} className="project-item reveal" data-num={p.num}>
            <span className="project-num">{p.num}</span>
            <div className="project-info">
              <div className="project-meta">
                <span className="project-type">{p.type}</span>
                <span className="project-year">{p.year}</span>
              </div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
            <div className="project-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}
