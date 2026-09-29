<script setup lang="ts">
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { CONTACTO } from '../data/velas'

const contenedor = ref<HTMLDivElement>()
const aviso = ref('')
let mapa: L.Map | null = null

const POPUP_TALLER = `<b>Freyja's Sanctuary</b><br>
  📍 Dirección: ${CONTACTO.direccion}, ${CONTACTO.ciudad}.<br>
  📧 Email: ${CONTACTO.email}.<br>
  📞 Teléfono: ${CONTACTO.telefono}.`

const icono = (color: 'green' | 'red' | 'orange') =>
  L.icon({
    iconUrl: `/imagenes/leaf-${color}.png`,
    shadowUrl: '/imagenes/leaf-shadow.png',
    iconSize: [38, 95],
    shadowSize: [50, 64],
    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],
    popupAnchor: [-3, -76],
  })

function crearMapa(centro: L.LatLngExpression) {
  mapa = L.map(contenedor.value!, { center: centro, zoom: 16 })
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapa)
  return mapa
}

/** Sin geolocalización: mapa centrado en el taller */
function mostrarSoloTaller() {
  const m = crearMapa(CONTACTO.coordenadas)
  L.marker(CONTACTO.coordenadas, { icon: icono('red') }).addTo(m).bindPopup(POPUP_TALLER).openPopup()
}

/** Con geolocalización: ruta desde la ubicación del usuario hasta el taller */
async function mostrarRuta(latitud: number, longitud: number) {
  // leaflet-routing-machine se engancha al objeto global L
  ;(window as unknown as { L: typeof L }).L = L
  await import('leaflet-routing-machine')

  const m = crearMapa([latitud, longitud])
  L.Routing.control({
    waypoints: [L.latLng(latitud, longitud), L.latLng(...CONTACTO.coordenadas)],
    router: L.Routing.osrmv1({ language: 'es' }),
    // El control construye su Formatter con estas mismas opciones
    language: 'es',
    createMarker(i: number, wp: L.Routing.Waypoint, total: number) {
      if (i === 0) return L.marker(wp.latLng, { icon: icono('green'), draggable: true }).bindPopup('Usted está aquí')
      if (i === total - 1) return L.marker(wp.latLng, { icon: icono('red'), draggable: true }).bindPopup(POPUP_TALLER)
      return L.marker(wp.latLng, { icon: icono('orange'), draggable: true }).bindPopup('Descanso')
    },
  } as L.Routing.RoutingControlOptions).addTo(m)
}

onMounted(() => {
  if (!navigator.geolocation) {
    aviso.value = 'Los datos para la geolocalización no están disponibles.'
    mostrarSoloTaller()
    return
  }

  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      if (contenedor.value) void mostrarRuta(coords.latitude, coords.longitude)
    },
    () => {
      if (contenedor.value) mostrarSoloTaller()
    },
    { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
  )
})

onBeforeUnmount(() => {
  mapa?.remove()
  mapa = null
})
</script>

<template>
  <div class="overflow-hidden rounded-l border border-borde bg-white text-tinta shadow-alta">
    <div ref="contenedor" class="h-[clamp(340px,55vh,560px)] w-full" />
  </div>
  <p class="mt-3.5 text-[0.85rem] text-tinta-70">
    {{ aviso || 'El mapa calcula la ruta desde tu ubicación si autorizas la geolocalización en el navegador.' }}
  </p>
</template>
