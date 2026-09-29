// ------------------------------------------------------------
// Lógica de negocio compartida entre el cliente (Vue) y el servidor (Node).
// El servidor recalcula el total con estas mismas funciones, así que nunca
// se fía del precio que envía el navegador.
// ------------------------------------------------------------

export type UnidadPlazo = 'meses' | 'dias'

export interface Opcion<T extends string> {
  id: T
  nombre: string
  precio: number
}

export type IdProducto = 'pequena' | 'mediana' | 'grande'
export type IdExtra = 'color' | 'tipografia' | 'terminacion' | 'nombre'

export const PRODUCTOS: readonly Opcion<IdProducto>[] = [
  { id: 'pequena', nombre: 'Pequeña', precio: 15 },
  { id: 'mediana', nombre: 'Mediana', precio: 25 },
  { id: 'grande', nombre: 'Grande', precio: 35 },
]

export const EXTRAS: readonly Opcion<IdExtra>[] = [
  { id: 'color', nombre: 'Color personalizado', precio: 5 },
  { id: 'tipografia', nombre: 'Tipografía personalizada', precio: 7 },
  { id: 'terminacion', nombre: 'Terminación personalizada', precio: 6 },
  { id: 'nombre', nombre: 'Nombre grabado', precio: 4 },
]

export interface ConfiguracionVela {
  producto: IdProducto | ''
  extras: IdExtra[]
  unidad: UnidadPlazo
  plazo: number
}

export interface DatosContacto {
  nombre: string
  apellidos: string
  telefono: string
  email: string
  mensaje: string
}

export interface SolicitudPresupuesto extends DatosContacto, ConfiguracionVela {
  condiciones: boolean
}

export interface RespuestaPresupuesto {
  ok: true
  id: string
  total: number
}

export interface RespuestaError {
  ok: false
  error: string
}

export interface Noticia {
  titulo: string
  descripcion: string
  fecha: string
}

/**
 * Porcentaje de descuento según el plazo de entrega.
 * Positivo = descuento, negativo = recargo.
 *  - Meses: 1 = 0 %, 2–3 = 5 %, 4–6 = 10 %, 7+ = 15 %
 *  - Días:  3 = +5 % de recargo, 4–7 = 0 %, 8–10 = −5 %
 */
export function descuentoPorPlazo(unidad: UnidadPlazo, plazo: number): number {
  const n = Number.isFinite(plazo) ? Math.trunc(plazo) : 0

  if (unidad === 'dias') {
    if (n === 3) return -5
    if (n >= 8 && n <= 10) return 5
    return 0
  }

  if (n <= 1) return 0
  if (n <= 3) return 5
  if (n <= 6) return 10
  return 15
}

export function calcularTotal(config: ConfiguracionVela): number {
  const producto = PRODUCTOS.find((p) => p.id === config.producto)
  let total = producto?.precio ?? 0

  for (const extra of EXTRAS) {
    if (config.extras.includes(extra.id)) total += extra.precio
  }

  const descuento = descuentoPorPlazo(config.unidad, config.plazo)
  return Math.round(total * (1 - descuento / 100) * 100) / 100
}

// ---------------- VALIDACIONES ----------------
const SOLO_LETRAS = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/

export const validarNombre = (nombre: string) =>
  nombre.length > 0 && nombre.length <= 15 && SOLO_LETRAS.test(nombre)

export const validarApellidos = (apellidos: string) =>
  apellidos.length > 0 && apellidos.length <= 40 && SOLO_LETRAS.test(apellidos)

export const validarTelefono = (telefono: string) => /^[0-9]{9}$/.test(telefono)

export const validarEmail = (email: string) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(email)

export type ErroresFormulario = Partial<Record<keyof SolicitudPresupuesto, string>>

/** Devuelve un objeto con un mensaje por campo inválido (vacío si todo es correcto). */
export function validarSolicitud(s: SolicitudPresupuesto): ErroresFormulario {
  const errores: ErroresFormulario = {}

  if (!PRODUCTOS.some((p) => p.id === s.producto)) errores.producto = 'Debes elegir al menos un producto.'
  if (!validarNombre(s.nombre.trim())) errores.nombre = 'El nombre solo puede contener letras y máximo 15 caracteres.'
  if (!validarApellidos(s.apellidos.trim())) errores.apellidos = 'Los apellidos solo pueden contener letras y máximo 40 caracteres.'
  if (!validarTelefono(s.telefono.trim())) errores.telefono = 'El teléfono ha de contener 9 dígitos.'
  if (!validarEmail(s.email.trim())) errores.email = 'El correo electrónico no tiene un formato válido.'
  if (!Number.isInteger(s.plazo) || s.plazo < 1 || s.plazo > 365) errores.plazo = 'El plazo debe estar entre 1 y 365.'
  if (s.unidad !== 'meses' && s.unidad !== 'dias') errores.unidad = 'Unidad de plazo no válida.'
  if (!Array.isArray(s.extras) || s.extras.some((e) => !EXTRAS.some((x) => x.id === e))) errores.extras = 'Extras no válidos.'
  if (s.condiciones !== true) errores.condiciones = 'Debes aceptar las condiciones de privacidad.'

  return errores
}

export const formatearEuros = (valor: number) =>
  valor.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €'
