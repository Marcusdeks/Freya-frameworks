<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  EXTRAS,
  PRODUCTOS,
  calcularTotal,
  formatearEuros,
  validarSolicitud,
  type ErroresFormulario,
  type SolicitudPresupuesto,
} from '../../shared/presupuesto'
import CabeceraPagina from '../components/CabeceraPagina.vue'
import { enviarPresupuesto } from '../composables/useApi'

const estadoInicial = (): SolicitudPresupuesto => ({
  nombre: '',
  apellidos: '',
  telefono: '',
  email: '',
  mensaje: '',
  producto: '',
  extras: [],
  unidad: 'meses',
  plazo: 1,
  condiciones: false,
})

const form = reactive(estadoInicial())
const errores = ref<ErroresFormulario>({})
const enviando = ref(false)
const resultado = ref<{ tipo: 'ok' | 'error'; texto: string } | null>(null)

// Total en vivo: se recalcula solo cuando cambia producto, extras o plazo
const total = computed(() => calcularTotal(form))

/**
 * Valida en cliente y, si todo es correcto, envía la solicitud a la API.
 * El servidor vuelve a validar y a calcular el precio: esta validación solo mejora la experiencia.
 */
async function enviar() {
  resultado.value = null
  errores.value = validarSolicitud(form)

  const primerError = Object.keys(errores.value)[0]
  if (primerError) {
    document.querySelector<HTMLElement>(`[data-campo="${primerError}"]`)?.focus()
    return
  }

  enviando.value = true
  const respuesta = await enviarPresupuesto({ ...form, extras: [...form.extras] })
  enviando.value = false

  if (respuesta.ok) {
    resultado.value = {
      tipo: 'ok',
      texto: `Sus datos han sido procesados correctamente. Presupuesto confirmado: ${formatearEuros(respuesta.total)}. Te responderemos en menos de 24 horas.`,
    }
    restablecer(false)
  } else {
    resultado.value = { tipo: 'error', texto: respuesta.error }
  }
}

function restablecer(limpiarResultado = true) {
  Object.assign(form, estadoInicial())
  errores.value = {}
  if (limpiarResultado) resultado.value = null
}

const campos = [
  { id: 'nombre', etiqueta: 'Nombre', tipo: 'text', placeholder: 'Tu nombre', autocompletar: 'given-name' },
  { id: 'apellidos', etiqueta: 'Apellidos', tipo: 'text', placeholder: 'Tus apellidos', autocompletar: 'family-name' },
  { id: 'telefono', etiqueta: 'Teléfono', tipo: 'tel', placeholder: '600000000', autocompletar: 'tel' },
  { id: 'email', etiqueta: 'Correo electrónico', tipo: 'email', placeholder: 'tu@correo.com', autocompletar: 'email' },
] as const

const etiqueta = 'text-[0.85rem] font-semibold tracking-[0.02em]'
const leyenda = 'px-2.5 text-[0.72rem] font-bold tracking-[0.16em] text-ambar-400 uppercase'
const fieldset = 'flex flex-col gap-3 rounded-m border border-crema-50/16 px-5 pt-4 pb-5'
const linea = 'flex flex-wrap items-center justify-between gap-3.5'
</script>

<template>
  <CabeceraPagina
    titulo="Configura tu vela"
    miga="Presupuesto"
    entradilla="Elige tamaño, extras y plazo. El precio se actualiza al instante, sin compromiso."
  />

  <div class="envoltorio py-[clamp(2.5rem,6vw,4.5rem)]">
    <form novalidate @submit.prevent="enviar" @reset.prevent="restablecer()">
      <div
        id="cForm"
        class="grid grid-cols-[repeat(auto-fit,minmax(min(330px,100%),1fr))] items-start gap-[clamp(1.5rem,3vw,2.5rem)]"
      >
        <!-- ---------- Datos de contacto ---------- -->
        <div v-revelar class="flex flex-col gap-4 rounded-l border border-borde bg-white p-[clamp(1.5rem,3.5vw,2.4rem)] shadow-media">
          <h3 class="mb-1">Tus datos</h3>
          <p class="mb-2 text-[0.92rem] text-tinta-70">Te responderemos en menos de 24 horas laborables.</p>

          <div v-for="campo in campos" :key="campo.id" class="flex flex-col gap-1.5">
            <label :for="campo.id" :class="etiqueta">{{ campo.etiqueta }}</label>
            <input
              :id="campo.id"
              v-model.trim="form[campo.id]"
              :data-campo="campo.id"
              :type="campo.tipo"
              :placeholder="campo.placeholder"
              :autocomplete="campo.autocompletar"
              :inputmode="campo.id === 'telefono' ? 'numeric' : undefined"
              :aria-invalid="!!errores[campo.id]"
              :aria-describedby="errores[campo.id] ? `${campo.id}-error` : undefined"
              class="campo-input"
              :class="errores[campo.id] && 'border-red-600/60'"
            />
            <p v-if="errores[campo.id]" :id="`${campo.id}-error`" class="text-[0.82rem] text-red-700">{{ errores[campo.id] }}</p>
          </div>

          <div class="flex flex-col gap-1.5">
            <label for="mensaje" :class="etiqueta">Cuéntanos tu idea</label>
            <textarea
              id="mensaje"
              v-model="form.mensaje"
              maxlength="2000"
              placeholder="Aroma, colores, nombre a grabar, fecha del evento..."
              class="campo-input min-h-[130px] resize-y"
            />
          </div>

          <div class="mt-2 flex flex-wrap gap-3">
            <button type="submit" class="boton boton--primario disabled:cursor-wait disabled:opacity-70" :disabled="enviando">
              {{ enviando ? 'Enviando…' : 'Enviar solicitud' }}
            </button>
            <button type="reset" class="boton border-borde text-tinta-70 hover:translate-y-0 hover:bg-crema-100 hover:text-tinta">
              Restablecer
            </button>
          </div>

          <p
            v-if="resultado"
            role="status"
            class="rounded-s border px-4 py-3 text-[0.9rem]"
            :class="resultado.tipo === 'ok' ? 'border-verde-500/40 bg-verde-500/10 text-verde-800' : 'border-red-600/40 bg-red-600/8 text-red-800'"
          >
            {{ resultado.texto }}
          </p>
        </div>

        <!-- ---------- Configurador de precio ---------- -->
        <div
          v-revelar="120"
          class="flex flex-col gap-4 rounded-l border border-ambar-500/22 bg-linear-165 from-verde-900 to-verde-700 p-[clamp(1.5rem,3.5vw,2.4rem)] text-crema-50 shadow-media min-[981px]:sticky min-[981px]:top-[calc(var(--alto-cabecera)+1.5rem)]"
        >
          <h3 class="mb-1 text-ambar-400">Tu presupuesto</h3>

          <fieldset :class="fieldset">
            <legend :class="leyenda">Producto</legend>
            <div :class="linea">
              <label for="producto" :class="etiqueta">Tamaño de la vela</label>
              <select
                id="producto"
                v-model="form.producto"
                data-campo="producto"
                :aria-invalid="!!errores.producto"
                class="campo-input--oscuro max-w-[180px]"
              >
                <option value="">Seleccionar</option>
                <option v-for="p in PRODUCTOS" :key="p.id" :value="p.id">{{ p.nombre }} — {{ p.precio }}€</option>
              </select>
            </div>
            <p v-if="errores.producto" class="text-[0.82rem] text-ambar-200">{{ errores.producto }}</p>
          </fieldset>

          <fieldset :class="fieldset">
            <legend :class="leyenda">Plazo de entrega</legend>
            <div :class="linea">
              <label for="unidad" :class="etiqueta">Unidad</label>
              <select id="unidad" v-model="form.unidad" class="campo-input--oscuro max-w-[180px]">
                <option value="meses">Meses</option>
                <option value="dias">Días</option>
              </select>
            </div>
            <div :class="linea">
              <label for="plazo" :class="etiqueta">Cantidad</label>
              <input
                id="plazo"
                v-model.number="form.plazo"
                data-campo="plazo"
                type="number"
                min="1"
                max="365"
                step="1"
                class="campo-input--oscuro max-w-[180px]"
              />
            </div>
            <p v-if="errores.plazo" class="text-[0.82rem] text-ambar-200">{{ errores.plazo }}</p>
            <p class="text-[0.8rem] leading-[1.55] text-crema-50/62">
              Meses: 1 = 0&nbsp;%, 2 = 5&nbsp;%, 6 = 10&nbsp;%, +7 = 15&nbsp;% de descuento.<br />
              Días: 3 = +5&nbsp;% de recargo, 4–7 = 0&nbsp;%, 8–10 = −5&nbsp;%.
            </p>
          </fieldset>

          <fieldset :class="fieldset">
            <legend :class="leyenda">Extras</legend>
            <ul class="grid gap-2">
              <li v-for="extra in EXTRAS" :key="extra.id" class="text-[0.92rem]">
                <label
                  :for="`extra-${extra.id}`"
                  class="flex cursor-pointer items-center gap-3 rounded-s border border-crema-50/14 px-3.5 py-2.5 font-medium transition-colors duration-200 hover:border-ambar-500/45 hover:bg-crema-50/8"
                >
                  <input
                    :id="`extra-${extra.id}`"
                    v-model="form.extras"
                    type="checkbox"
                    :value="extra.id"
                    class="size-[18px] shrink-0 cursor-pointer accent-ambar-500"
                  />
                  {{ extra.nombre }}
                  <span class="ml-auto text-ambar-400">+{{ extra.precio }}€</span>
                </label>
              </li>
            </ul>
          </fieldset>

          <div class="flex items-center justify-between gap-4 rounded-m border border-ambar-500/40 bg-linear-135 from-ambar-500/20 to-ambar-500/7 px-5 py-4">
            <h5 class="font-sans text-[0.74rem] font-bold tracking-[0.16em] text-crema-50/75 uppercase">Presupuesto total</h5>
            <output for="producto unidad plazo" aria-live="polite" class="font-display text-paso-2 leading-none font-bold whitespace-nowrap text-ambar-400">
              {{ formatearEuros(total) }}
            </output>
          </div>

          <div class="mt-1.5 text-[0.85rem] text-crema-50/80">
            <label class="flex cursor-pointer items-center gap-2.5 font-medium">
              <input
                v-model="form.condiciones"
                data-campo="condiciones"
                type="checkbox"
                class="size-[18px] shrink-0 cursor-pointer accent-ambar-500"
              />
              <span>
                Acepto las
                <RouterLink to="/aviso-legal" class="text-ambar-400 underline underline-offset-[3px]">condiciones de privacidad</RouterLink>
              </span>
            </label>
            <p v-if="errores.condiciones" class="mt-1.5 text-[0.82rem] text-ambar-200">{{ errores.condiciones }}</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
