'use client';
import { useEffect } from 'react';

const EASE = 'cubic-bezier(.22,1,.36,1)';
const STAGGER_MS = 70;

const inViewport = (el: Element): boolean => {
  const r = el.getBoundingClientRect();
  return r.top < window.innerHeight && r.bottom > 0;
};

const hide = (el: HTMLElement): void => {
  el.style.willChange = 'opacity, transform';
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity .65s ${EASE}, transform .65s ${EASE}`;
};

const show = (el: HTMLElement, delay = 0): void => {
  el.style.transitionDelay = `${delay}ms`;
  el.style.opacity = '1';
  el.style.transform = 'none';
  window.setTimeout(() => {
    el.style.willChange = 'auto';
  }, 900 + delay);
};

export function useScrollReveal(): void {
  useEffect(() => {
    const solos = document.querySelectorAll<HTMLElement>('[data-reveal]');
    const groups = document.querySelectorAll<HTMLElement>('[data-reveal-stagger]');

    solos.forEach((el) => {
      if (!inViewport(el)) hide(el);
    });
    groups.forEach((g) => {
      if (!inViewport(g)) {
        Array.from(g.children).forEach((c) => hide(c as HTMLElement));
      }
    });

    if (!('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          requestAnimationFrame(() => {
            if (el.hasAttribute('data-reveal-stagger')) {
              Array.from(el.children).forEach((c, i) => show(c as HTMLElement, i * STAGGER_MS));
            } else {
              show(el);
            }
          });
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.01 },
    );

    solos.forEach((el) => {
      if (!inViewport(el)) io.observe(el);
    });
    groups.forEach((el) => {
      if (!inViewport(el)) io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}
