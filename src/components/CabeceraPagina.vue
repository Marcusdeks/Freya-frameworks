<script setup lang="ts">
defineProps<{ titulo: string; miga: string; entradilla: string }>()
</script>

<template>
  <section
    class="relative isolate overflow-hidden bg-linear-150 from-verde-900 to-verde-700 py-[clamp(2.75rem,7vw,5rem)] text-center text-crema-50 before:absolute before:inset-0 before:-z-10 before:bg-[url(/imagenes/fondoBambu.png)] before:bg-cover before:bg-center before:opacity-10"
  >
    <div class="envoltorio">
      <nav aria-label="Migas de pan" class="mb-3.5 flex justify-center gap-2 text-[0.8rem] tracking-widest text-crema-50/55 uppercase">
        <RouterLink to="/" class="hover:text-ambar-400">Inicio</RouterLink>
        <span>/</span>
        <span>{{ miga }}</span>
      </nav>
      <h1>{{ titulo }}</h1>
      <p class="entradilla mx-auto mt-3.5 text-crema-50/78">{{ entradilla }}</p>
    </div>
  </section>
</template>
