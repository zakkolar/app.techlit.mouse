<script setup>
const props = defineProps({
    height: {
        required: true
    }
})
</script>

<template>
  <div class="sun" :style="`--height: ${height}`"></div>
</template>

<style scoped>
    .sun {

        --color: #ffd841;

        background: var(--color);
        width: var(--height);
        height: var(--height);
        border-radius: var(--height);
        box-shadow: 0 0 calc(var(--height) * 0.75) 0 var(--color);
    }
</style>