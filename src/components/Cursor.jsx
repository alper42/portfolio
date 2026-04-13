import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const cursorPos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      cursorPos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      trailPos.current.x += (cursorPos.current.x - trailPos.current.x) * 0.12;
      trailPos.current.y += (cursorPos.current.y - trailPos.current.y) * 0.12;
      if (trailRef.current) {
        trailRef.current.style.left = trailPos.current.x + 'px';
        trailRef.current.style.top = trailPos.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const grow = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2.5)';
      if (trailRef.current) trailRef.current.style.transform = 'translate(-50%,-50%) scale(1.5)';
    };
    const shrink = () => {
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
      if (trailRef.current) trailRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
    };

    const interval = setInterval(() => {
      document.querySelectorAll('a, button, .project-item, .skill-card').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    }, 500);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />
    </>
  );
}
