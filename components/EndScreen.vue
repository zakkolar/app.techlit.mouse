<script setup>
defineProps({
    buttonText: {
        type: String,
        default: 'Play again'
    },
    title: {
        type: String,
        default: 'Game over'
    },
    button: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits(['playAgain']);

function playAgain() {
    emit('playAgain');
}

</script>

<template>
  <ButtonScreen @button-press="playAgain" :button="button" :title="title" :button-text="buttonText">
      <slot></slot>
  </ButtonScreen>
</template>