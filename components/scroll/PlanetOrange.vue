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

const color = ref('#ff762c');

</script>
<template>
  <Planet :height="height" :animate="animate" :color="color"></Planet>
</template>
