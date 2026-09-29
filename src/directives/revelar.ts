import type { Directive } from 'vue'

// ------------------------------------------------------------
// v-revelar: animación de entrada al hacer scroll.
// Uso: <div v-revelar> o <div v-revelar="120"> (retraso en ms)
// ------------------------------------------------------------

const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observador: IntersectionObserver | null = null
const retrasos = new WeakMap<Element, number>()

function obtenerObservador() {
  observador ??= new IntersectionObserver(
    (entradas, obs) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        const retraso = retrasos.get(entrada.target) ?? 0
        setTimeout(() => entrada.target.classList.add('visible'), retraso)
        obs.unobserve(entrada.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )
  return observador
}

export const vRevelar: Directive<HTMLElement, number | undefined> = {
  mounted(el, { value }) {
    el.classList.add('revelar')

    if (sinMovimiento() || !('IntersectionObserver' in window)) {
      el.classList.add('visible')
      return
    }

    retrasos.set(el, value ?? 0)
    obtenerObservador().observe(el)
  },
  unmounted(el) {
    observador?.unobserve(el)
  },
}
