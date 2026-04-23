import { useEffect, useRef } from 'react';
import './Skills.css';

const SKILLS = [
  {
    icon: '📱', title: 'App-Entwicklung', category: 'mobile',
    desc: 'Cross-Platform Apps für iOS und Android mit modernen Frameworks.',
    tags: ['Flutter'],
  },
  {
    icon: '🌐', title: 'Web-Entwicklung', category: 'web',
    desc: 'Performante, responsive Websites und Webanwendungen von Frontend bis Backend.',
    tags: ['Next.js', 'JavaScript', 'Node.js'],
  },
  {
    icon: '🎨', title: 'UI/UX Design', category: 'design',
    desc: 'Nutzerzentrierte Interfaces mit Fokus auf Usability, Ästhetik und Conversion.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
  },
  {
    icon: '⚙️', title: 'Backend & APIs', category: 'backend',
    desc: 'Skalierbare Server-Architekturen, REST & GraphQL APIs, Datenbanken.',
    tags: ['Node.js', 'PostgreSQL', 'Firebase'],
  },
];

export default function Skills() {
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
    <section className="skills" id="skills" ref={sectionRef}>
      <div className="section-label">/ Skills</div>
      <h2 className="section-title">Was ich kann</h2>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div key={s.title} className="skill-card reveal">
            <div className="skill-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <div className="skill-tags">
              {s.tags.map(t => <span key={t}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
