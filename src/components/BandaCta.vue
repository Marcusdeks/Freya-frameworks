<script setup lang="ts">
defineProps<{ titulo: string; texto: string }>()
</script>

<template>
  <section
    v-revelar
    class="relative isolate overflow-hidden rounded-l bg-linear-135 from-verde-800 to-verde-600 p-[clamp(2.5rem,6vw,4.5rem)] text-center text-crema-50 shadow-alta after:absolute after:inset-0 after:-z-10 after:bg-[radial-gradient(circle_at_20%_120%,rgb(227_168_87/0.35),transparent_55%)] min-[761px]:rounded-xl"
  >
    <h2 class="mb-3.5">{{ titulo }}</h2>
    <p class="mx-auto max-w-[55ch] text-crema-50/80">{{ texto }}</p>
    <div class="mt-9 flex flex-wrap justify-center gap-3.5">
      <slot />
    </div>
  </section>
</template>
