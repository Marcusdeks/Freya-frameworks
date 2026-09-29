<script setup lang="ts">
// Iconos de trazo usados en toda la web (mismo set que la versión original)
const ICONOS = {
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  gota: '<path d="M12 2s4 4 4 8a4 4 0 0 1-8 0c0-4 4-8 4-8Z"/><path d="M12 22v-4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  camion: '<path d="M3 7h13v10H3z"/><path d="M16 10h4l1 3v4h-5"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  estrella: '<path d="M12 3 14.9 9l6.1.9-4.5 4.3 1.1 6.1L12 17.4 6.4 20.3l1.1-6.1L3 9.9 9.1 9Z"/>',
  vela: '<path d="M12 2s3.5 3.6 3.5 7a3.5 3.5 0 0 1-7 0C8.5 5.6 12 2 12 2Z"/><rect x="7" y="12" width="10" height="10" rx="2"/>',
  paleta: '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9 4.5 4.5 0 0 1 0-9Z"/>',
  lapiz: '<path d="M17 3a2.8 2.8 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  ubicacion: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  telefono: '<path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
  reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
} as const

// Iconos de relleno (logotipos de redes)
const RELLENOS = {
  facebook: '<path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/>',
  twitter: '<path d="M18.9 3H21l-6.5 7.4L22 21h-6l-4.7-6.1L5.9 21H3.8l7-8-6.6-10h6.2l4.2 5.6ZM17.8 19.5h1.2L8.3 4.4H7Z"/>',
} as const

export type NombreIcono = keyof typeof ICONOS | keyof typeof RELLENOS

const props = withDefaults(defineProps<{ nombre: NombreIcono; grosor?: number }>(), { grosor: 2 })

const relleno = props.nombre in RELLENOS
const contenido = relleno
  ? RELLENOS[props.nombre as keyof typeof RELLENOS]
  : ICONOS[props.nombre as keyof typeof ICONOS]
</script>

<template>
  <svg
    v-if="relleno"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    v-html="contenido"
  />
  <svg
    v-else
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="grosor"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    v-html="contenido"
  />
</template>
