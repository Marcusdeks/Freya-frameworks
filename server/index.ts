// ------------------------------------------------------------
// Servidor Node.js (Express) de Freyja's Sanctuary
//  - GET  /api/noticias      → noticias del taller
//  - POST /api/presupuesto   → valida la solicitud y recalcula el total
//  - En producción sirve además la SPA compilada (dist/)
// ------------------------------------------------------------
import express, { type NextFunction, type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  calcularTotal,
  validarSolicitud,
  type Noticia,
  type RespuestaError,
  type RespuestaPresupuesto,
  type SolicitudPresupuesto,
} from '../shared/presupuesto.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUERTO = Number(process.env.PORT ?? 3001)
const PRODUCCION = process.env.NODE_ENV === 'production'

const app = express()
app.use(express.json({ limit: '20kb' }))

// Solicitudes recibidas (en memoria: suficiente para la demo)
const solicitudes: (SolicitudPresupuesto & { id: string; total: number; recibida: string })[] = []

// ---------------- API ----------------
app.get('/api/noticias', async (_req, res, next) => {
  try {
    const contenido = await readFile(path.join(__dirname, 'data', 'noticias.json'), 'utf-8')
    const noticias = JSON.parse(contenido) as Noticia[]
    noticias.sort((a, b) => b.fecha.localeCompare(a.fecha))
    res.json(noticias)
  } catch (err) {
    next(err)
  }
})

app.post('/api/presupuesto', (req: Request, res: Response<RespuestaPresupuesto | RespuestaError>) => {
  // El cuerpo viene del exterior: no se confía en su forma ni en sus tipos.
  // Se normaliza campo a campo y se valida con las mismas reglas que el cliente.
  const cuerpo = req.body as Partial<SolicitudPresupuesto> | undefined

  const solicitud: SolicitudPresupuesto = {
    nombre: String(cuerpo?.nombre ?? ''),
    apellidos: String(cuerpo?.apellidos ?? ''),
    telefono: String(cuerpo?.telefono ?? ''),
    email: String(cuerpo?.email ?? ''),
    mensaje: String(cuerpo?.mensaje ?? '').slice(0, 2000),
    producto: (cuerpo?.producto ?? '') as SolicitudPresupuesto['producto'],
    extras: Array.isArray(cuerpo?.extras) ? cuerpo.extras : [],
    unidad: (cuerpo?.unidad ?? 'meses') as SolicitudPresupuesto['unidad'],
    plazo: Number(cuerpo?.plazo),
    condiciones: cuerpo?.condiciones === true,
  }

  const errores = Object.values(validarSolicitud(solicitud))
  if (errores.length > 0) {
    res.status(400).json({ ok: false, error: errores[0]! })
    return
  }

  // El total lo calcula el servidor; el navegador nunca envía el precio
  const total = calcularTotal(solicitud)
  const id = randomUUID()
  solicitudes.push({ ...solicitud, id, total, recibida: new Date().toISOString() })
  console.log(`[presupuesto] ${solicitud.nombre} ${solicitud.apellidos} — ${total.toFixed(2)} € (${solicitudes.length} en total)`)

  res.status(201).json({ ok: true, id, total })
})

app.use('/api', (_req, res) => {
  res.status(404).json({ ok: false, error: 'Recurso no encontrado' })
})

// ---------------- SPA en producción ----------------
if (PRODUCCION) {
  const dist = path.resolve(__dirname, '..', 'dist')
  app.use(express.static(dist))
  // Cualquier otra ruta la resuelve Vue Router
  app.get(/.*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

// ---------------- Errores ----------------
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  res.status(500).json({ ok: false, error: 'Error interno del servidor' })
})

app.listen(PUERTO, () => {
  console.log(`Servidor de Freyja's Sanctuary en http://localhost:${PUERTO}`)
})
