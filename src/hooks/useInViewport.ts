import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true once `ref` has entered the viewport (with a small rootMargin so
 * cards just-below-the-fold start loading slightly before they're visible).
 *
 * Stays true once tripped — we don't want iframes unmounting + reloading their
 * external resources every time they scroll out of view.
 */
export function useInViewport(
  ref: RefObject<Element | null>,
  rootMargin = "200px"
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, inView]);

  return inView;
}
