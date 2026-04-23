'use client';
import { useEffect } from 'react';

export function useSmoothScroll(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const a = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const dest = document.getElementById(id);
      if (!dest) return;

      e.preventDefault();
      const header = document.querySelector<HTMLElement>('header,nav');
      const offset = header ? header.offsetHeight : 0;
      window.scrollTo({
        top: dest.getBoundingClientRect().top + window.scrollY - offset - 8,
        behavior: 'smooth',
      });

      const menu = document.querySelector('[data-mobile-menu]');
      if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
