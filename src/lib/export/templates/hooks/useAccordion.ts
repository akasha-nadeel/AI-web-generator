'use client';
import { useEffect } from 'react';

export function useAccordion(): void {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const trigger = target.closest<HTMLElement>('[data-accordion-trigger]');
      if (!trigger) return;
      const item = trigger.closest('[data-accordion-item]') ?? trigger.parentElement;
      if (!item) return;
      const content = item.querySelector('[data-accordion-content]');
      if (content) content.classList.toggle('hidden');
      const icon = trigger.querySelector<HTMLElement>('[data-accordion-icon]');
      if (icon) {
        icon.style.transition = 'transform .3s ease';
        icon.style.transform = content && !content.classList.contains('hidden') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
