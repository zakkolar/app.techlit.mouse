<script setup>
defineProps({
    buttonText: String,
    title: String,
    button: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['buttonPress']);

function buttonPress() {
    emit('buttonPress');
}

</script>
<template>
  <div class="text-center p-3 bg-white absolute left-0 right-0 m-auto w-1/2 top-1/3" >
        <h1 class="text-3xl mb-2">{{ title }}</h1>
      <slot></slot>
      <button v-if="button" class="block m-auto bg-lime-400 p-4 mt-4 text-5xl" @click="buttonPress">{{ buttonText }}</button>
    </div>
</template>
