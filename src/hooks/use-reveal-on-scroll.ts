import { useEffect } from "react";

/**
 * Ajoute la classe `is-visible` à tous les éléments `.reveal`
 * dès qu'ils entrent dans le viewport. SSR-safe.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (els.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}