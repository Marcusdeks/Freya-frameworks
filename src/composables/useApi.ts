import type {
  Noticia,
  RespuestaError,
  RespuestaPresupuesto,
  SolicitudPresupuesto,
} from '../../shared/presupuesto'

// Cliente tipado para la API de Node.js (servidor Express en /api)

export async function obtenerNoticias(): Promise<Noticia[]> {
  const res = await fetch('/api/noticias')
  if (!res.ok) throw new Error(`Error ${res.status} al cargar las noticias`)
  return res.json()
}

export async function enviarPresupuesto(solicitud: SolicitudPresupuesto): Promise<RespuestaPresupuesto | RespuestaError> {
  try {
    const res = await fetch('/api/presupuesto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(solicitud),
    })
    return await res.json()
  } catch {
    return { ok: false, error: 'No se ha podido contactar con el servidor. Inténtalo de nuevo más tarde.' }
  }
}
