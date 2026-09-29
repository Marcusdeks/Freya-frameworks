# Freya-frameworks

Web full stack de **Freyja's Sanctuary**, una tienda de velas artesanales y personalizadas de Sant Cugat del Vallès. Construida con **Vue 3, TypeScript, Tailwind CSS y Node.js (Express)**.

| Tecnología | Uso en el proyecto |
|---|---|
| **Vue 3** (Composition API, `<script setup>`) | SPA con componentes reutilizables y **Vue Router** |
| **TypeScript** | Todo el código: cliente, servidor y lógica compartida |
| **Tailwind CSS v4** | Sistema de diseño en `@theme` (colores, tipografías, sombras, animaciones) |
| **Node.js + Express** | API REST: noticias y solicitudes de presupuesto |
| **Vite** | Servidor de desarrollo y build de producción |
| **Leaflet + Leaflet Routing Machine** | Mapa del taller y ruta desde la ubicación del usuario |

## Páginas

- **Inicio** (`/`): hero, valores, servicios, galería destacada, noticias (cargadas desde la API) y llamada a la acción.
- **Galería** (`/galeria`): rejilla de velas con visor *lightbox* (teclado ←/→/Esc, miniaturas, clic en el fondo para cerrar).
- **Presupuesto** (`/presupuesto`): configurador con precio en tiempo real, validación por campo y envío al servidor.
- **Contacto** (`/contacto`): datos de contacto y mapa con ruta hasta el taller.
- **Aviso legal** (`/aviso-legal`).

## Puesta en marcha

Requisitos: **Node.js 20 o superior**.

```bash
npm install
npm run dev
```

Abre **http://localhost:5173** en el navegador.

`npm run dev` arranca dos procesos a la vez:

| Proceso | Puerto | Función |
|---|---|---|
| Vite | 5173 | La web, con recarga automática (aquí se navega) |
| Express | 3001 | La API. Vite le reenvía las peticiones a `/api` |

> **Importante:** la web no se puede abrir haciendo doble clic en `index.html` ni con Live Server. El navegador no entiende Vue ni TypeScript directamente y necesita que Vite los compile. Si la página sale en blanco, comprueba que `npm run dev` sigue ejecutándose.

Producción, con un único servidor para la web y la API:

```bash
npm run build   # comprueba tipos (vue-tsc) y compila en dist/
npm start       # http://localhost:3001  (puerto configurable con PORT)
```

Para cambiar el puerto de la API hay que ajustar `PORT` (por ejemplo `$env:PORT=4000` en PowerShell) y el destino del proxy en `vite.config.ts`.

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Web y API en modo desarrollo |
| `npm run dev:client` | Solo la web (Vite) |
| `npm run dev:server` | Solo la API, con recarga automática |
| `npm run build` | Comprobación de tipos y build de producción |
| `npm run typecheck` | Solo la comprobación de tipos |
| `npm start` | Servidor de producción (sirve `dist/` y la API) |

## Estructura

```
├── server/                 # Node.js + Express
│   ├── index.ts            # API REST y servidor de la SPA en producción
│   └── data/noticias.json
├── shared/
│   └── presupuesto.ts      # Precios, descuentos y validaciones (cliente + servidor)
├── src/                    # Vue 3
│   ├── components/         # Cabecera, pie, lightbox, mapa, iconos...
│   ├── views/              # Una vista por página
│   ├── directives/         # v-revelar: animaciones de entrada al hacer scroll
│   ├── composables/        # Cliente tipado de la API
│   ├── router/             # Rutas y títulos de página
│   └── style.css           # Tema de Tailwind
└── public/imagenes/
```

## API

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/api/noticias` | Noticias del taller, de la más reciente a la más antigua |
| `POST` | `/api/presupuesto` | Valida la solicitud y **recalcula el total en el servidor** |

Ejemplo de solicitud de presupuesto:

```json
{
  "nombre": "Marc", "apellidos": "Carretero", "telefono": "600123456",
  "email": "marc@correo.com", "mensaje": "",
  "producto": "mediana", "extras": ["color", "nombre"],
  "unidad": "meses", "plazo": 4, "condiciones": true
}
```

Respuesta: `{ "ok": true, "id": "…", "total": 30.6 }` (25 € + 5 € + 4 €, con un 10 % de descuento por 4 meses).

La lógica de precios y validación vive en `shared/presupuesto.ts` y la usan el formulario y el servidor, así que las reglas no se duplican y el servidor no depende del precio que envía el navegador.

## Solución de problemas

| Problema | Solución |
|---|---|
| La página sale en blanco | Abre `http://localhost:5173` (no el archivo) y comprueba que `npm run dev` está en marcha |
| `Cannot find module` o errores al arrancar | Ejecuta `npm install` |
| Las noticias no cargan | La API no está en marcha: usa `npm run dev` (arranca web y API a la vez) |
| El puerto 3001 o 5173 está ocupado | Cierra el proceso que lo usa o cambia el puerto (ver arriba) |
| El mapa no muestra la ruta | Permite la ubicación en el navegador; sin permiso muestra solo el taller |

## Autor

Marc Carretero
