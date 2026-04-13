import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">Alper Caliskan<span>.</span></div>
      <ul className="nav-links">
        {['about','skills','projects'].map(id => (
          <li key={id}>
            <a
              href={`#${id}`}
              style={{ color: active === id ? 'var(--accent)' : '' }}
              onClick={e => { e.preventDefault(); scrollTo(id); }}
            >
              {id === 'about' ? 'Über mich' :
               id === 'skills' ? 'Skills' : 'Projekte'}
            </a>
          </li>
        ))}
      </ul>
      <button className="nav-cta" onClick={() => scrollTo('contact')}>Contact me →</button>
    </nav>
  );
}
