<template>
  <NuxtLink :to="to">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps([
  'to'
])

</script>