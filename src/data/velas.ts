export interface Vela {
  src: string
  alt: string
  ancho: number
  alto: number
}

export const VELAS: Vela[] = [
  { src: '/imagenes/vela1.jpeg', alt: 'Vela artesanal 1', ancho: 1334, alto: 1080 },
  { src: '/imagenes/vela2.jpg', alt: 'Vela artesanal 2', ancho: 1337, alto: 1080 },
  { src: '/imagenes/vela3.jpg', alt: 'Vela artesanal 3', ancho: 1203, alto: 1080 },
  { src: '/imagenes/vela4.jpg', alt: 'Vela artesanal 4', ancho: 1047, alto: 1080 },
  { src: '/imagenes/vela5.jpg', alt: 'Vela artesanal 5', ancho: 1347, alto: 1080 },
  { src: '/imagenes/vela6.jpg', alt: 'Vela artesanal 6', ancho: 1386, alto: 1080 },
]

export const CONTACTO = {
  direccion: "Plaça d'Octavià, 7",
  ciudad: 'Sant Cugat 08892, España',
  email: 'info@freyjasanctuary.com',
  telefono: '+34 123 456 789',
  telefonoHref: 'tel:+34123456789',
  coordenadas: [41.473361, 2.084071] as [number, number],
}
