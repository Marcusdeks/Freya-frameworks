<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import MarcaLogo from './MarcaLogo.vue'

const enlaces = [
  { to: '/', texto: 'Inicio' },
  { to: '/galeria', texto: 'Galería' },
  { to: '/presupuesto', texto: 'Presupuesto' },
  { to: '/contacto', texto: 'Contacto' },
]

const route = useRoute()
const menuAbierto = ref(false)
const compacta = ref(false)
const botonMenu = ref<HTMLButtonElement>()

// Cierra el menú móvil al navegar (el componente persiste entre rutas)
watch(() => route.fullPath, () => (menuAbierto.value = false))

// Cabecera más opaca y con sombra en cuanto se desplaza la página
const alDesplazar = () => (compacta.value = window.scrollY > 24)

function alPulsarTecla(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuAbierto.value) {
    menuAbierto.value = false
    botonMenu.value?.focus()
  }
}

onMounted(() => {
  alDesplazar()
  window.addEventListener('scroll', alDesplazar, { passive: true })
  document.addEventListener('keydown', alPulsarTecla)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', alDesplazar)
  document.removeEventListener('keydown', alPulsarTecla)
})

const barra = 'absolute left-1/2 h-0.5 w-[22px] -translate-x-1/2 rounded-sm bg-current transition-all duration-300 ease-suave'
</script>

<template>
  <header
    class="sticky top-0 z-[1000] border-b backdrop-blur-lg backdrop-saturate-[1.4] transition-all duration-300 ease-suave"
    :class="
      compacta
        ? 'border-ambar-500/30 bg-verde-950/95 shadow-[0_8px_32px_rgb(0_0_0/0.28)]'
        : 'border-ambar-500/16 bg-verde-900/82'
    "
  >
    <div class="envoltorio flex h-(--alto-cabecera) items-center justify-between gap-6">
      <MarcaLogo />

      <button
        ref="botonMenu"
        type="button"
        class="relative size-11 rounded-s text-crema-50 min-[761px]:hidden"
        :aria-label="menuAbierto ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="menuAbierto"
        aria-controls="navPrincipal"
        @click="menuAbierto = !menuAbierto"
      >
        <span :class="[barra, menuAbierto ? 'top-[21px] rotate-45' : 'top-[15px]']" />
        <span :class="[barra, 'top-[21px]', menuAbierto && 'opacity-0']" />
        <span :class="[barra, menuAbierto ? 'top-[21px] -rotate-45' : 'top-[27px]']" />
      </button>

      <nav
        id="navPrincipal"
        aria-label="Navegación principal"
        class="flex items-center gap-1.5 max-[760px]:fixed max-[760px]:inset-x-0 max-[760px]:top-(--alto-cabecera) max-[760px]:flex-col max-[760px]:items-stretch max-[760px]:gap-1 max-[760px]:border-b max-[760px]:border-ambar-500/20 max-[760px]:bg-verde-950/97 max-[760px]:px-(--gutter) max-[760px]:pt-4 max-[760px]:pb-6 max-[760px]:shadow-[0_20px_40px_rgb(0_0_0/0.35)] max-[760px]:backdrop-blur-xl max-[760px]:transition-all max-[760px]:duration-300"
        :class="menuAbierto ? '' : 'max-[760px]:invisible max-[760px]:-translate-y-3 max-[760px]:opacity-0'"
      >
        <RouterLink
          v-for="enlace in enlaces"
          :key="enlace.to"
          :to="enlace.to"
          class="group relative rounded-full px-4 py-2 text-[0.92rem] font-medium text-crema-50/82 transition-colors duration-200 hover:bg-white/7 hover:text-crema-50 max-[760px]:rounded-s max-[760px]:px-4 max-[760px]:py-3.5 max-[760px]:text-base"
          exact-active-class="bg-ambar-500/12! text-ambar-400! activo"
        >
          {{ enlace.texto }}
          <span
            class="absolute bottom-[0.28rem] left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-sm bg-ambar-500 transition-[width] duration-300 ease-suave group-hover:w-[42%] group-[.activo]:w-[42%] max-[760px]:hidden"
          />
        </RouterLink>

        <RouterLink
          :to="route.name === 'presupuesto' ? { hash: '#cForm' } : '/presupuesto'"
          class="boton boton--primario boton--pequeno ml-2 max-[760px]:mt-2 max-[760px]:ml-0"
        >
          Pide tu vela
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
