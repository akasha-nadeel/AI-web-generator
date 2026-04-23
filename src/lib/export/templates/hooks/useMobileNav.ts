'use client';
import { useEffect } from 'react';

export function useMobileNav(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const toggle = target.closest('[data-mobile-toggle]');
      if (!toggle) return;
      e.preventDefault();
      const menu = document.querySelector('[data-mobile-menu]');
      if (menu) menu.classList.toggle('hidden');
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
