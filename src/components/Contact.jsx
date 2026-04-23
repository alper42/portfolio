import { useState, useRef, useEffect } from 'react';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('https://portfolio-backend-um5v.onrender.com/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
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
                <input
                  type="text"
                  name="name"
                  placeholder="Dein Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="deine@email.de"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Nachricht</label>
              <textarea
                name="message"
                placeholder="Erzähl mir von deinem Projekt..."
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            {error && (
              <p style={{ color: '#ff5f57', marginBottom: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                ❌ Fehler beim Senden. Bitte versuche es erneut.
              </p>
            )}
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
