<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Noticia } from '../../shared/presupuesto'
import BandaCta from '../components/BandaCta.vue'
import Icono, { type NombreIcono } from '../components/Icono.vue'
import { obtenerNoticias } from '../composables/useApi'
import { VELAS } from '../data/velas'

const datos = [
  { valor: '100%', texto: 'Cera vegetal' },
  { valor: '+450', texto: 'Velas creadas' },
  { valor: '7 días', texto: 'Entrega media' },
]

const cinta: { icono: NombreIcono; texto: string }[] = [
  { icono: 'gota', texto: 'Cera 100% vegetal' },
  { icono: 'check', texto: 'Personalización total' },
  { icono: 'camion', texto: 'Envío en 7 días' },
  { icono: 'estrella', texto: 'Taller local en Sant Cugat' },
]

const servicios: { icono: NombreIcono; titulo: string; texto: string }[] = [
  { icono: 'vela', titulo: 'Elige tu aroma', texto: 'Lavanda, cedro, vainilla o cítricos. Mezclamos esencias naturales hasta dar con tu perfume.' },
  { icono: 'paleta', titulo: 'Diseña el color', texto: 'Del blanco roto al verde bosque. Ajustamos el tono a tu espacio, tu marca o tu celebración.' },
  { icono: 'lapiz', titulo: 'Añade tu nombre', texto: 'Grabamos nombres, fechas o personajes. El detalle que convierte una vela en un recuerdo.' },
]

const destacadas = [
  { vela: VELAS[0]!, pie: 'Serie natural' },
  { vela: VELAS[1]!, pie: 'Aromas de invierno' },
  { vela: VELAS[2]!, pie: 'Piezas personalizadas' },
]

const collage = [
  { vela: VELAS[0]!, clase: 'row-[1/4] animate-flotar', alt: 'Vela artesanal con acabado natural' },
  { vela: VELAS[3]!, clase: 'row-[2/6] animate-flotar [animation-delay:1.2s]', alt: 'Vela personalizada con diseño propio' },
  { vela: VELAS[2]!, clase: 'row-[4/6] animate-flotar [animation-delay:2.4s]', alt: 'Detalle de vela aromática' },
]

// ---------------- Noticias (API Node.js) ----------------
const noticias = ref<Noticia[]>([])
const estadoNoticias = ref<'cargando' | 'ok' | 'error'>('cargando')

onMounted(async () => {
  try {
    noticias.value = (await obtenerNoticias()).slice(0, 2)
    estadoNoticias.value = 'ok'
  } catch (err) {
    console.error('No se han podido cargar las noticias:', err)
    estadoNoticias.value = 'error'
  }
})

// Convierte "2025-10-13" en "13 de octubre de 2025"
function formatearFecha(fecha: string) {
  const d = new Date(fecha)
  if (Number.isNaN(d.getTime())) return fecha
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <!-- ---------------- HERO ---------------- -->
  <section
    class="relative isolate overflow-hidden bg-linear-160 from-verde-950 via-verde-800 via-48% to-verde-700 text-crema-50 before:absolute before:inset-0 before:-z-20 before:bg-[url(/imagenes/fondoBambu.png)] before:bg-cover before:bg-center before:opacity-13 before:mix-blend-luminosity"
  >
    <div
      aria-hidden="true"
      class="absolute -top-[18%] -right-[12%] -z-10 size-[60vw] max-h-[720px] max-w-[720px] animate-latir bg-[radial-gradient(circle,rgb(227_168_87/0.3),transparent_62%)] blur-[30px]"
    />

    <div class="envoltorio grid items-center gap-[clamp(2rem,5vw,4.5rem)] py-[clamp(3.5rem,9vw,7.5rem)] min-[981px]:grid-cols-[1.05fr_0.95fr]">
      <div v-revelar>
        <span class="antetitulo text-ambar-400">Hecho a mano en Sant Cugat</span>
        <h1 class="mt-[1.1rem] mb-[1.4rem]">
          Luz que cuenta
          <span class="bg-linear-120 from-ambar-400 to-ambar-200 bg-clip-text text-transparent italic">tu historia</span>
        </h1>
        <p class="max-w-[52ch] text-paso-1 text-crema-50/78">
          Cada vela es una pieza única, elaborada con cera vegetal y aromas naturales.
          Elige el color, el diseño y el perfume: nosotros le damos vida.
        </p>

        <div class="mt-9 flex flex-wrap gap-3.5">
          <RouterLink to="/presupuesto" class="boton boton--primario">
            Calcular presupuesto
            <Icono nombre="flecha" />
          </RouterLink>
          <RouterLink to="/galeria" class="boton boton--fantasma">Ver la galería</RouterLink>
        </div>

        <div class="mt-12 flex flex-wrap gap-[clamp(1.5rem,4vw,3rem)] border-t border-crema-50/14 pt-8">
          <div v-for="dato in datos" :key="dato.texto">
            <strong class="block font-display text-paso-2 leading-none text-ambar-400">{{ dato.valor }}</strong>
            <span class="text-[0.8rem] tracking-[0.12em] text-crema-50/60 uppercase">{{ dato.texto }}</span>
          </div>
        </div>
      </div>

      <div
        v-revelar="150"
        class="grid aspect-[1/0.85] max-w-[520px] grid-cols-2 grid-rows-4 gap-4 min-[761px]:grid-rows-5 min-[981px]:aspect-[1/1.06] min-[981px]:max-w-none"
      >
        <figure
          v-for="(item, i) in collage"
          :key="item.vela.src"
          class="group overflow-hidden rounded-l border border-crema-50/12 shadow-alta"
          :class="item.clase"
        >
          <img
            :src="item.vela.src"
            :alt="item.alt"
            :width="item.vela.ancho"
            :height="item.vela.alto"
            :loading="i === 0 ? 'eager' : 'lazy'"
            class="size-full object-cover transition-transform duration-900 ease-suave group-hover:scale-107"
          />
        </figure>
      </div>
    </div>
  </section>

  <!-- ---------------- CINTA ---------------- -->
  <div class="border-t border-ambar-500/18 bg-verde-900 text-crema-50/90">
    <div class="envoltorio flex flex-wrap justify-center gap-[clamp(1rem,4vw,3.5rem)] py-[1.15rem] text-[0.85rem] tracking-[0.06em]">
      <span v-for="item in cinta" :key="item.texto" class="inline-flex items-center gap-2">
        <Icono :nombre="item.icono" class="size-[18px] shrink-0 text-ambar-500" />
        {{ item.texto }}
      </span>
    </div>
  </div>

  <!-- ---------------- SOBRE NOSOTROS ---------------- -->
  <section id="sobreNosotros" class="py-[clamp(3.5rem,8vw,7rem)]">
    <div class="envoltorio">
      <div v-revelar class="mx-auto mb-[clamp(2rem,4vw,3.25rem)] flex max-w-[62ch] flex-col items-center gap-3.5 text-center">
        <span class="antetitulo">Sobre nosotros</span>
        <h2>Artesanía que se enciende despacio</h2>
        <p class="entradilla">
          En Freyja's Sanctuary cada vela nace de un proceso lento y cuidado.
          Trabajamos por encargo, en pequeñas series, para que ninguna pieza se parezca a otra.
        </p>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[clamp(1.25rem,2.5vw,2rem)]">
        <article
          v-for="(servicio, i) in servicios"
          :key="servicio.titulo"
          v-revelar="i * 120"
          class="group relative flex flex-col gap-3.5 overflow-hidden rounded-l border border-borde bg-white p-[clamp(1.5rem,3vw,2.1rem)] shadow-suave transition-all duration-300 ease-suave before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:origin-left before:scale-x-0 before:bg-linear-to-r before:from-ambar-500 before:to-verde-500 before:transition-transform before:duration-600 before:ease-suave hover:-translate-y-1.5 hover:border-ambar-500/40 hover:shadow-alta hover:before:scale-x-100"
        >
          <div class="tarjeta-icono">
            <Icono :nombre="servicio.icono" :grosor="1.6" class="size-[26px]" />
          </div>
          <h3 class="text-paso-1">{{ servicio.titulo }}</h3>
          <p class="text-[0.96rem] text-tinta-70">{{ servicio.texto }}</p>
        </article>
      </div>
    </div>
  </section>

  <!-- ---------------- GALERÍA ---------------- -->
  <section id="proyectos" class="pb-[clamp(3.5rem,8vw,7rem)]">
    <div class="envoltorio">
      <div v-revelar class="mx-auto mb-[clamp(2rem,4vw,3.25rem)] flex max-w-[62ch] flex-col items-center gap-3.5 text-center">
        <span class="antetitulo">Galería</span>
        <h2>Un pequeño ejemplo de nuestra artesanía</h2>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[clamp(1.25rem,2.5vw,2rem)]">
        <RouterLink
          v-for="(item, i) in destacadas"
          :key="item.vela.src"
          v-revelar="i * 120"
          to="/galeria"
          class="group relative block aspect-[4/5] overflow-hidden rounded-l shadow-media after:absolute after:inset-0 after:bg-[linear-gradient(to_top,rgb(10_19_13/0.82)_0%,rgb(10_19_13/0.12)_45%,transparent_70%)] after:opacity-85 after:transition-opacity after:duration-300 hover:after:opacity-100"
        >
          <img
            :src="item.vela.src"
            :alt="item.vela.alt"
            :width="item.vela.ancho"
            :height="item.vela.alto"
            loading="lazy"
            class="size-full object-cover transition-transform duration-800 ease-suave group-hover:scale-106"
          />
          <span class="absolute right-5 bottom-[1.15rem] left-5 z-10 translate-y-1.5 font-display text-paso-1 text-crema-50 transition-transform duration-300 ease-suave group-hover:translate-y-0">
            {{ item.pie }}
          </span>
        </RouterLink>
      </div>

      <div v-revelar class="mt-10 flex justify-center">
        <RouterLink to="/galeria" class="boton boton--claro">Ver todas las velas</RouterLink>
      </div>
    </div>
  </section>

  <!-- ---------------- NOTICIAS ---------------- -->
  <section id="noticias" class="pb-[clamp(3.5rem,8vw,7rem)]">
    <div class="envoltorio">
      <div v-revelar class="mb-[clamp(2rem,4vw,3.25rem)] flex max-w-[62ch] flex-col gap-3.5">
        <span class="antetitulo">Noticias</span>
        <h2>Lo último del taller</h2>
        <p class="entradilla">Novedades, talleres y opiniones sobre nuestro trabajo.</p>
      </div>

      <div v-revelar class="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-[clamp(1.25rem,2.5vw,2rem)]">
        <p v-if="estadoNoticias === 'error'" class="text-tinta-70">Las noticias no están disponibles en este momento.</p>

        <template v-else-if="estadoNoticias === 'cargando'">
          <div v-for="n in 2" :key="n" class="h-40 animate-pulse rounded-m border border-borde bg-white/60" />
        </template>

        <template v-else>
          <article
            v-for="noticia in noticias"
            :key="noticia.titulo"
            class="flex flex-col gap-3 rounded-m border border-l-[3px] border-borde border-l-ambar-500 bg-white p-[clamp(1.5rem,3vw,2.1rem)] shadow-suave transition-all duration-300 ease-suave hover:-translate-y-1 hover:shadow-media"
          >
            <small class="text-xs font-semibold tracking-widest text-ambar-600 uppercase">
              <time :datetime="noticia.fecha">{{ formatearFecha(noticia.fecha) }}</time>
            </small>
            <h4 class="text-verde-800">{{ noticia.titulo }}</h4>
            <p class="text-[0.95rem] text-tinta-70">{{ noticia.descripcion }}</p>
          </article>
        </template>
      </div>
    </div>
  </section>

  <!-- ---------------- CTA ---------------- -->
  <div class="envoltorio mb-[clamp(3.5rem,8vw,7rem)]">
    <BandaCta
      titulo="¿Imaginas tu vela perfecta?"
      texto="Cuéntanos cómo la quieres y calcula el precio en menos de un minuto. Sin compromiso."
    >
      <RouterLink to="/presupuesto" class="boton boton--primario">Pedir presupuesto</RouterLink>
      <RouterLink to="/contacto" class="boton boton--fantasma">Hablar con nosotros</RouterLink>
    </BandaCta>
  </div>
</template>
