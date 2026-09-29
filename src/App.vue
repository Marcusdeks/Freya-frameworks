<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <main class="flex flex-1 flex-col">
    <RouterView :key="$route.path" />
  </main>
  <AppFooter />
</template>
