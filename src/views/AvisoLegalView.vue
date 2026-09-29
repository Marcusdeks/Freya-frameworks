<script setup lang="ts">
import CabeceraPagina from '../components/CabeceraPagina.vue'
import { CONTACTO } from '../data/velas'
</script>

<template>
  <CabeceraPagina
    titulo="Aviso legal"
    miga="Aviso legal"
    entradilla="Política de privacidad y cookies de Freyja's Sanctuary."
  />

  <div class="envoltorio py-[clamp(2.5rem,6vw,4.5rem)]">
    <article
      v-revelar
      class="panel mx-auto max-w-[78ch] [&_a]:text-ambar-600 [&_a]:underline [&_a]:underline-offset-[3px] [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-paso-2 [&_li]:mb-1.5 [&_p]:mb-4 [&_p]:text-tinta-70 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:text-tinta-70"
    >
      <span class="mb-6 inline-block rounded-full border border-borde bg-crema-100 px-3.5 py-1.5 text-[0.78rem] tracking-[0.06em] text-tinta-70">
        Última actualización: 30 de enero de 2025
      </span>

      <p>
        Como responsable del tratamiento de los datos, Freyja's Sanctuary se compromete a proteger sus datos
        personales. Mediante esta política queremos informarle y responder a cualquier pregunta que pueda tener
        sobre la recopilación y el tratamiento de sus datos personales, de conformidad con la normativa vigente
        en España y la Unión Europea.
      </p>

      <p>
        Los datos personales se refieren a cualquier información relativa a una persona física que pueda ser
        identificada directa o indirectamente (por ejemplo, nombre, apellidos, identificador, dirección de correo
        electrónico o datos de ubicación), en adelante denominados «Datos personales» o «Datos».
      </p>

      <p>
        La presente política se aplica a sus datos recopilados por Freyja's Sanctuary con independencia del canal
        y, en particular, cuando visita nuestro sitio web
        <RouterLink to="/">https://www.freyjas-sanctuary.com/</RouterLink> y sus extensiones (colectivamente, el «Sitio»),
        cuando se suscribe a nuestras ofertas por correo postal o cuando se comunica con nuestro departamento de
        atención al cliente por teléfono.
      </p>

      <h2 class="first-of-type:mt-0">1. Responsable del tratamiento de los datos</h2>
      <p>Sus datos personales son recopilados por:</p>
      <ul>
        <li>Freyja's Sanctuary, S.L.</li>
        <li>Inscrita en el Registro Mercantil de Huesca, CIF H-31.018914.</li>
        <li>Domicilio social: Calle de las Velas, 123, Sant Cugat 08892, España.</li>
        <li>Contacto: <a :href="`mailto:${CONTACTO.email}`">{{ CONTACTO.email }}</a>.</li>
      </ul>

      <h2>2. Finalidad del tratamiento</h2>
      <p>
        Tratamos los datos que nos facilita para gestionar las solicitudes de presupuesto, responder a sus
        consultas y, si lo autoriza, enviarle información sobre nuevos productos y talleres. No cedemos sus datos
        a terceros salvo obligación legal.
      </p>

      <h2>3. Conservación de los datos</h2>
      <p>
        Conservamos sus datos mientras exista una relación comercial o hasta que solicite su supresión. Después,
        se mantienen bloqueados durante los plazos legalmente previstos para atender posibles responsabilidades.
      </p>

      <h2>4. Sus derechos</h2>
      <p>
        Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
        portabilidad escribiendo a <a :href="`mailto:${CONTACTO.email}`">{{ CONTACTO.email }}</a>.
        También puede presentar una reclamación ante la Agencia Española de Protección de Datos.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Este sitio utiliza únicamente cookies técnicas necesarias para su funcionamiento. La página de contacto
        solicita su ubicación para calcular la ruta hasta el taller; ese dato se procesa en su navegador y no se
        almacena en nuestros servidores.
      </p>

      <div class="mt-8 flex flex-wrap gap-3.5">
        <RouterLink to="/contacto" class="boton boton--oscuro no-underline! text-crema-50!">Contactar</RouterLink>
        <RouterLink to="/" class="boton boton--claro no-underline! text-verde-800!">Volver al inicio</RouterLink>
      </div>
    </article>
  </div>
</template>
