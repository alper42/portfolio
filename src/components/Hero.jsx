import { useEffect, useRef } from 'react';
import './Hero.css';

const CODE_LINES = [
  '<span style="color:#6b7895">// Softwareentwickler</span>',
  '',
  '<span style="color:#0066ff">const</span> <span style="color:#00e5a0">developer</span> = {',
  '  <span style="color:#e8edf5">name</span>: <span style="color:#f4c07a">"Dein Name"</span>,',
  '  <span style="color:#e8edf5">role</span>: <span style="color:#f4c07a">"Softwareentwickler"</span>,',
  '  <span style="color:#e8edf5">available</span>: <span style="color:#0066ff">true</span>,',
  '}',
  '',
  '<span style="color:#6b7895">// Bereit für dein Projekt 🚀</span>',
];

export default function Hero() {
  const codeRef = useRef(null);

  useEffect(() => {
    let lineIdx = 0, charIdx = 0;
    const rendered = [];

    const typeNext = () => {
      if (!codeRef.current || lineIdx >= CODE_LINES.length) return;
      const line = CODE_LINES[lineIdx];
      const stripped = line.replace(/<[^>]+>/g, '');
      if (charIdx <= stripped.length) {
        let shown = 0, result = '';
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '<') {
            const end = line.indexOf('>', i);
            result += line.substring(i, end + 1);
            i = end;
          } else {
            if (shown < charIdx) { result += line[i]; shown++; }
            else break;
          }
        }
        codeRef.current.innerHTML = [...rendered, result].join('\n');
        charIdx++;
        setTimeout(typeNext, charIdx === 1 ? 80 : 22);
      } else {
        rendered.push(CODE_LINES[lineIdx]);
        lineIdx++; charIdx = 0;
        setTimeout(typeNext, 90);
      }
    };
    const t = setTimeout(typeNext, 1200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="grid-lines" />
        <div className="glow glow-1" />
        <div className="glow glow-2" />
      </div>

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
        </div>
        <h1 className="hero-title">
          <span className="line">Alper</span>
          <span className="line highlight">Caliskan</span>
          <span className="line sub">Softwareentwickler</span>
        </h1>
        <p className="hero-desc">
          Ich baue schnelle, skalierbare und schöne digitale Produkte —<br />
          Von Apps bis hin zu modernen Webauftritten.
        </p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scrollTo('projects')}>Projekte ansehen</button>
          <button className="btn-ghost" onClick={() => scrollTo('contact')}>Kontakt aufnehmen</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="code-card">
          <div className="code-header">
            <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
            <span className="code-filename">portfolio.ts</span>
          </div>
          <pre className="code-body"><code ref={codeRef} /></pre>
        </div>
      </div>

      <div className="hero-scroll">
        <span>scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
