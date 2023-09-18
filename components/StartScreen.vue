<script setup>
defineProps({
    buttonText: {
        type: String,
        default: 'Start'
    },
    title: {
        type: String,
        default: 'Get ready'
    }
});

const emit = defineEmits(['start']);

function start() {
    emit('start');
}

</script>
<template>
    <ButtonScreen :title="title" :button-text="buttonText" @button-press="start">
        <slot></slot>
    </ButtonScreen>
</template>