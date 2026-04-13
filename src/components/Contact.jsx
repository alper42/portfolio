import { useState, useRef, useEffect } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <section className="contact" id="contact" ref={sectionRef}>
      <div className="contact-inner reveal">
        <div className="section-label">/ Kontakt</div>
        <h2 className="contact-title">Lass uns etwas<br /><em>Großartiges bauen.</em></h2>
        <p className="contact-sub">Hast du ein Projekt im Kopf? Ich freue mich auf deine Nachricht.</p>

        {submitted ? (
          <div className="success-msg">
            <span>✅</span>
            <h3>Nachricht erhalten!</h3>
            <p>Ich melde mich innerhalb von 24 Stunden bei dir.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Dein Name" required />
              </div>
              <div className="form-group">
                <label>E-Mail</label>
                <input type="email" placeholder="deine@email.de" required />
              </div>
            </div>
            <div className="form-group">
              <label>Nachricht</label>
              <textarea placeholder="Erzähl mir von deinem Projekt..." rows={5} required />
            </div>
            <button type="submit" className="btn-primary submit-btn" disabled={loading}>
              <span>{loading ? 'Wird gesendet...' : 'Nachricht senden'}</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
