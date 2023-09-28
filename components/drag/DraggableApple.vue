<script setup>
import { v4 as uuidv4 } from 'uuid';
import Apple from "~/components/drag/Apple.vue";

const id = uuidv4();

defineExpose({
    id,
    moveTo
})

const props = defineProps({
    height: {
        required: true
    },
    initialX: {
        required: true
    },
    initialY: {
        required: true
    },
    initialColor: {
        default: '#f54b40'
    }
})

const x = ref(props.initialX), y = ref(props.initialY), color = ref(props.initialColor);

function moveTo(newX, newY, newColor) {
    x.value = newX;
    y.value = newY;
    color.value = newColor;
}

// drag and drop handlers

const dragging = ref(false);

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', JSON.stringify({id, color:color.value}));
}

function handleDrag (e) {
    dragging.value = true;
}

function handleDragEnd (e) {
    dragging.value = false;
}
</script>
<template>
     <Apple
             :height="height"
             :class="{ dragging, draggable: true }"
             :draggable="true"
             @dragstart="handleDragStart"
             @dragend="handleDragEnd"
             @drag="handleDrag"
             :style="{top:`${y}vh`, left: `${x}vh`}"
             :color="color"
     >
     </Apple>
</template>
<style scoped>

.draggable {
    cursor: pointer;
}

.dragging {
  opacity:0;
}

</style>