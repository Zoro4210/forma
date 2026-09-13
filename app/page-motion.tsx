'use client';

import { useEffect, useRef, useState } from 'react';

export default function PageMotion() {
  const [progress, setProgress] = useState(0);
  const queued = useRef(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const sections = [...document.querySelectorAll<HTMLElement>('.material-grid, .details-grid, .studio-note')];
    const configure = () => {
      observer?.disconnect();
      sections.forEach(section => section.classList.remove('reveal-pending'));
      if (media.matches) return;
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove('reveal-pending'); observer?.unobserve(entry.target); }
      }), { threshold: .08 });
      sections.forEach(section => {
        if (section.getBoundingClientRect().top > window.innerHeight) { section.classList.add('reveal-pending'); observer?.observe(section); }
      });
    };
    const update = () => {
      cancelAnimationFrame(queued.current);
      queued.current = requestAnimationFrame(() => {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(distance > 0 ? window.scrollY / distance : 0);
      });
    };
    configure(); update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    media.addEventListener('change', configure);
    return () => { observer?.disconnect(); sections.forEach(section => section.classList.remove('reveal-pending')); cancelAnimationFrame(queued.current); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); media.removeEventListener('change', configure); };
  }, []);
  return <div className="reading-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true"/>;
}
