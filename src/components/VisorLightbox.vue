<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { Vela } from '../data/velas'

const props = defineProps<{ imagenes: Vela[] }>()

/** Índice de la imagen abierta, o null si el visor está cerrado */
const indice = defineModel<number | null>({ required: true })

const abierto = computed(() => indice.value !== null)
const actual = computed(() => (indice.value === null ? null : props.imagenes[indice.value]))
const botonCerrar = ref<HTMLButtonElement>()

/** Avanza o retrocede `paso` posiciones; al llegar a un extremo da la vuelta (carrusel circular). */
function mover(paso: number) {
  if (indice.value === null) return
  const total = props.imagenes.length
  indice.value = (indice.value + paso + total) % total
}

const cerrar = () => (indice.value = null)

function alPulsarTecla(e: KeyboardEvent) {
  if (e.key === 'Escape') cerrar()
  if (e.key === 'ArrowRight') mover(1)
  if (e.key === 'ArrowLeft') mover(-1)
}

// Al abrir: bloquea el scroll de la página, activa el teclado y da el foco al botón de cerrar.
// Al cerrar: lo deshace todo (los listeners globales no deben quedarse activos).
watch(abierto, async (estaAbierto) => {
  document.body.style.overflow = estaAbierto ? 'hidden' : ''
  if (estaAbierto) {
    document.addEventListener('keydown', alPulsarTecla)
    await nextTick()
    botonCerrar.value?.focus()
  } else {
    document.removeEventListener('keydown', alPulsarTecla)
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', alPulsarTecla)
})

const flecha =
  'absolute top-[38%] z-10 grid size-[42px] place-items-center rounded-full border border-crema-50/20 bg-verde-950/55 text-base font-semibold text-crema-50 backdrop-blur-md transition-all duration-200 select-none hover:border-ambar-500 hover:bg-ambar-500 hover:text-verde-950 min-[769px]:top-[40%] min-[769px]:size-12 min-[769px]:text-lg'
</script>

<template>
  <Teleport to="body">
    <div
      v-if="abierto && actual"
      class="fixed inset-0 z-[2000] flex animate-aparecer items-center justify-center overflow-auto bg-[rgb(6_12_8/0.92)] p-[clamp(1rem,4vw,3rem)] backdrop-blur-[10px]"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
      @click.self="cerrar"
    >
      <button
        ref="botonCerrar"
        type="button"
        aria-label="Cerrar"
        class="fixed top-[clamp(1rem,3vw,2rem)] right-[clamp(1rem,3vw,2rem)] z-10 grid size-[46px] place-items-center rounded-full border border-crema-50/22 bg-verde-950/60 text-[26px] leading-none text-crema-50 transition-all duration-200 hover:rotate-90 hover:border-ambar-500 hover:bg-ambar-500 hover:text-verde-950"
        @click="cerrar"
      >
        &times;
      </button>

      <div class="relative m-auto flex w-full max-w-[940px] animate-subir flex-col gap-3.5">
        <div class="relative">
          <div class="absolute top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-verde-950/72 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.12em] text-crema-50 backdrop-blur-sm">
            {{ indice! + 1 }} / {{ imagenes.length }}
          </div>
          <img
            :src="actual.src"
            :alt="actual.alt"
            :width="actual.ancho"
            :height="actual.alto"
            class="max-h-[56vh] w-full rounded-l object-contain min-[769px]:max-h-[66vh]"
          />
          <button type="button" aria-label="Anterior" :class="[flecha, 'left-4 hover:-translate-x-[3px]']" @click="mover(-1)">&#10094;</button>
          <button type="button" aria-label="Siguiente" :class="[flecha, 'right-4 hover:translate-x-[3px]']" @click="mover(1)">&#10095;</button>
        </div>

        <p class="min-h-[2.9rem] rounded-m border border-crema-50/12 bg-crema-50/6 px-4 py-2.5 text-center font-display text-[0.92rem] text-crema-50 min-[481px]:text-[1.05rem]">
          {{ actual.alt }}
        </p>

        <div class="flex flex-wrap justify-center gap-2.5">
          <button
            v-for="(imagen, i) in imagenes"
            :key="imagen.src"
            type="button"
            :aria-label="`Ver ${imagen.alt}`"
            :aria-current="i === indice"
            class="overflow-hidden rounded-[10px] border-2 transition-all duration-200 hover:-translate-y-0.5"
            :class="i === indice ? 'border-ambar-500 opacity-100' : 'border-transparent opacity-45 hover:opacity-85'"
            @click="indice = i"
          >
            <img :src="imagen.src" :alt="imagen.alt" class="h-[52px] w-[62px] object-cover min-[769px]:h-[68px] min-[769px]:w-[84px]" />
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
