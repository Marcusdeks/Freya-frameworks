<script setup lang="ts">
import CabeceraPagina from '../components/CabeceraPagina.vue'
import Icono from '../components/Icono.vue'
import MapaContacto from '../components/MapaContacto.vue'
import { CONTACTO } from '../data/velas'

const rotulo = 'block text-[0.72rem] font-bold tracking-[0.14em] text-tinta-50 uppercase'
const enlace = 'hover:text-ambar-600'
</script>

<template>
  <CabeceraPagina
    titulo="Hablemos"
    miga="Contacto"
    entradilla="Estamos en el centro de Sant Cugat. Escríbenos, llámanos o ven a ver el taller."
  />

  <div class="envoltorio py-[clamp(2.5rem,6vw,4.5rem)]">
    <div class="grid items-start gap-[clamp(1.5rem,3vw,2.5rem)] min-[981px]:grid-cols-[minmax(280px,0.85fr)_1.15fr]">
      <div v-revelar class="panel">
        <span class="antetitulo">Datos de contacto</span>
        <h2 class="mt-3 text-paso-2">¿Tienes alguna pregunta?</h2>
        <p class="mt-2.5 text-tinta-70">Resolvemos dudas sobre aromas, plazos y encargos especiales.</p>

        <ul class="mt-6 grid gap-[1.1rem]">
          <li class="flex items-start gap-4">
            <span class="tarjeta-icono size-11 shrink-0 rounded-[13px]"><Icono nombre="ubicacion" :grosor="1.7" class="size-[21px]" /></span>
            <span>
              <strong :class="rotulo">Dirección</strong>
              {{ CONTACTO.direccion }}<br />{{ CONTACTO.ciudad }}
            </span>
          </li>
          <li class="flex items-start gap-4">
            <span class="tarjeta-icono size-11 shrink-0 rounded-[13px]"><Icono nombre="correo" :grosor="1.7" class="size-[21px]" /></span>
            <span>
              <strong :class="rotulo">Correo</strong>
              <a :href="`mailto:${CONTACTO.email}`" :class="enlace">{{ CONTACTO.email }}</a>
            </span>
          </li>
          <li class="flex items-start gap-4">
            <span class="tarjeta-icono size-11 shrink-0 rounded-[13px]"><Icono nombre="telefono" :grosor="1.7" class="size-[21px]" /></span>
            <span>
              <strong :class="rotulo">Teléfono</strong>
              <a :href="CONTACTO.telefonoHref" :class="enlace">{{ CONTACTO.telefono }}</a>
            </span>
          </li>
          <li class="flex items-start gap-4">
            <span class="tarjeta-icono size-11 shrink-0 rounded-[13px]"><Icono nombre="reloj" :grosor="1.7" class="size-[21px]" /></span>
            <span>
              <strong :class="rotulo">Horario</strong>
              Lunes a viernes, 10:00 – 19:00<br />Sábados, 10:00 – 14:00
            </span>
          </li>
        </ul>

        <div class="mt-8 flex flex-wrap gap-3.5">
          <RouterLink to="/presupuesto" class="boton boton--oscuro">Pedir presupuesto</RouterLink>
        </div>
      </div>

      <div v-revelar="120">
        <MapaContacto />
      </div>
    </div>
  </div>
</template>
