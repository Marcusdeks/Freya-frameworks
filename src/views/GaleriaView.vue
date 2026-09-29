<script setup lang="ts">
import { ref } from 'vue'
import BandaCta from '../components/BandaCta.vue'
import CabeceraPagina from '../components/CabeceraPagina.vue'
import VisorLightbox from '../components/VisorLightbox.vue'
import { VELAS } from '../data/velas'

const abierta = ref<number | null>(null)
</script>

<template>
  <CabeceraPagina
    titulo="Nuestra galería"
    miga="Galería"
    entradilla="Seis piezas del taller. Pulsa cualquier imagen para verla a pantalla completa."
  />

  <div class="envoltorio py-[clamp(2.5rem,6vw,4.5rem)]">
    <div class="grid grid-cols-2 gap-3 min-[481px]:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] min-[481px]:gap-[clamp(1rem,2vw,1.75rem)] min-[769px]:grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
      <button
        v-for="(vela, i) in VELAS"
        :key="vela.src"
        v-revelar="i * 80"
        type="button"
        :aria-label="`Ampliar ${vela.alt}`"
        class="block"
        @click="abierta = i"
      >
        <img
          :src="vela.src"
          :alt="vela.alt"
          :width="vela.ancho"
          :height="vela.alto"
          loading="lazy"
          class="h-40 w-full rounded-m border border-borde object-cover shadow-media transition-all duration-600 ease-suave hover:-translate-y-1.5 hover:scale-[1.015] hover:shadow-alta hover:saturate-[1.08] min-[481px]:h-[210px] min-[769px]:h-[clamp(280px,30vw,400px)] min-[769px]:rounded-l"
        />
      </button>
    </div>

    <VisorLightbox v-model="abierta" :imagenes="VELAS" />

    <div class="mt-[clamp(3rem,6vw,5rem)]">
      <BandaCta
        titulo="¿Te gusta lo que ves?"
        texto="Podemos hacerla igual, o completamente distinta. Tú decides el aroma, el color y el diseño."
      >
        <RouterLink to="/presupuesto" class="boton boton--primario">Pedir presupuesto</RouterLink>
        <RouterLink to="/contacto" class="boton boton--fantasma">Contactar</RouterLink>
      </BandaCta>
    </div>
  </div>
</template>
