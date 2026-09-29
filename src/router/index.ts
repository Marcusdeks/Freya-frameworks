import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'inicio', component: InicioView, meta: { titulo: 'Velas artesanales y personalizadas' } },
    // Las demás vistas se cargan bajo demanda (code splitting): la portada pesa menos
    { path: '/galeria', name: 'galeria', component: () => import('../views/GaleriaView.vue'), meta: { titulo: 'Galería' } },
    { path: '/presupuesto', name: 'presupuesto', component: () => import('../views/PresupuestoView.vue'), meta: { titulo: 'Presupuesto' } },
    { path: '/contacto', name: 'contacto', component: () => import('../views/ContactoView.vue'), meta: { titulo: 'Contacto' } },
    { path: '/aviso-legal', name: 'aviso-legal', component: () => import('../views/AvisoLegalView.vue'), meta: { titulo: 'Aviso legal' } },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, _from, guardada) {
    if (guardada) return guardada
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const titulo = to.meta.titulo as string | undefined
  document.title = to.name === 'inicio' ? `Freyja's Sanctuary — ${titulo}` : `${titulo} — Freyja's Sanctuary`
})

export default router
