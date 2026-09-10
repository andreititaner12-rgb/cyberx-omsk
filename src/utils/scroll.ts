import Lenis from 'lenis';

/**
 * Единый экземпляр Lenis (плавный скролл).
 * App.tsx регистрирует его здесь, компоненты используют scrollToSection()
 * вместо нативного scrollIntoView, чтобы скролл всегда проходил
 * через инерцию Lenis и не «дёргал» страницу.
 */
let lenisInstance: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset: -72, // компенсация фиксированной шапки
      duration: 1.4,
    });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration: 1.6 });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
