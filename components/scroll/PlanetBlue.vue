<script setup>
import Planet from "~/components/scroll/Planet.vue";

const props = defineProps({
  height: {
    required: true
  },
  animate: {
    default: false
  }
})

const color = ref('#3360e0');

</script>
<template>
  <Planet :height="height" :animate="animate" :color="color"></Planet>
</template>
