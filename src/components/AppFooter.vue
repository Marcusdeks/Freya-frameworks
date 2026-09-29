<script setup lang="ts">
import { CONTACTO } from '../data/velas'
import Icono, { type NombreIcono } from './Icono.vue'
import MarcaLogo from './MarcaLogo.vue'

const redes: { nombre: string; url: string; icono: NombreIcono }[] = [
  { nombre: 'Instagram', url: 'https://www.instagram.com/', icono: 'instagram' },
  { nombre: 'Facebook', url: 'https://www.facebook.com/', icono: 'facebook' },
  { nombre: 'Twitter', url: 'https://twitter.com/', icono: 'twitter' },
]

const navegacion = [
  { to: '/', texto: 'Inicio' },
  { to: '/galeria', texto: 'Galería' },
  { to: '/presupuesto', texto: 'Presupuesto' },
  { to: '/contacto', texto: 'Contacto' },
  { to: '/aviso-legal', texto: 'Aviso legal' },
]

const anio = new Date().getFullYear()
const titulo = 'mb-4.5 font-sans text-xs font-bold tracking-[0.18em] text-ambar-400 uppercase'
const enlace = 'transition-all duration-200 hover:pl-1 hover:text-ambar-400'
</script>

<template>
  <footer class="mt-auto border-t border-ambar-500/18 bg-linear-to-b from-verde-900 to-verde-950 text-crema-50/72">
    <div class="envoltorio">
      <div class="grid grid-cols-1 gap-[clamp(2rem,5vw,4rem)] py-[clamp(2.5rem,5vw,3.75rem)] min-[761px]:grid-cols-2 min-[981px]:grid-cols-[1.3fr_1fr_1fr]">
        <div class="min-[761px]:max-[980px]:col-span-full">
          <div class="mb-4"><MarcaLogo /></div>
          <p class="max-w-[40ch] text-[0.9rem]">
            Velas artesanales y personalizadas, hechas a mano con cera vegetal en Sant Cugat del Vallès.
          </p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="red in redes"
              :key="red.nombre"
              :href="red.url"
              :title="red.nombre"
              :aria-label="red.nombre"
              target="_blank"
              rel="noopener"
              class="grid size-[42px] place-items-center rounded-full border border-crema-50/18 text-crema-50/85 transition-all duration-200 hover:-translate-y-[3px] hover:border-ambar-500 hover:bg-ambar-500 hover:text-verde-950"
            >
              <Icono :nombre="red.icono" :grosor="1.8" class="size-[19px]" />
            </a>
          </div>
        </div>

        <div>
          <h4 :class="titulo">Navegación</h4>
          <ul class="grid gap-2.5 text-[0.9rem]">
            <li v-for="item in navegacion" :key="item.to">
              <RouterLink :to="item.to" :class="enlace">{{ item.texto }}</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 :class="titulo">Contacto</h4>
          <ul class="grid gap-2.5 text-[0.9rem]">
            <li>
              <RouterLink to="/contacto" :class="enlace">{{ CONTACTO.direccion }}<br />{{ CONTACTO.ciudad }}</RouterLink>
            </li>
            <li><a :href="`mailto:${CONTACTO.email}`" :class="enlace">{{ CONTACTO.email }}</a></li>
            <li><a :href="CONTACTO.telefonoHref" :class="enlace">{{ CONTACTO.telefono }}</a></li>
          </ul>
        </div>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-4 border-t border-crema-50/10 py-5 text-[0.82rem] text-crema-50/55 max-[760px]:justify-center max-[760px]:text-center">
        <p>&copy; {{ anio }} Freyja's Sanctuary. Todos los derechos reservados.</p>
        <p><RouterLink to="/aviso-legal" class="hover:text-ambar-400">Aviso legal y privacidad</RouterLink></p>
      </div>
    </div>
  </footer>
</template>
