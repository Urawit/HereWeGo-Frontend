<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/creativetimofficial/tailwind-starter-kit/tailwind.css">
  <NavBar></NavBar>
    <slot/>
</template>



<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// import { FwbTab, FwbTabs } from 'flowbite-vue'


const activeTab = ref('first')


// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

