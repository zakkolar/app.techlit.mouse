<script setup>/**
 Original CSS Basket design
 * Copyright (c) 2023 by Likii (https://codepen.io/likiipedia/pen/KKqdGJB)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
import Apple from "~/components/drag/Apple.vue";

const props = defineProps({
    label: {},
    height: {
        required: true
    },
    bottom: {
        default: '0'
    },
    left: {
        default: '0'
    }
})



defineExpose({
    resetApples
})

const apples = ref([]);
const basketApples = computed(()=> apples?.value.slice(0,15));

const emit = defineEmits(['appleDrop'])

const dragOver = ref(false);

function handleDragEnter() {
    dragOver.value = true;
}

function handleDragLeave() {
    dragOver.value = false;
}

function handleDrop(e) {
    handleDragLeave();
    const data = JSON.parse(e.dataTransfer.getData('text'));
    apples.value.push(data.color);
    emit('appleDrop', data.id);
}

function calculateBottomOffset(apple) {
    return 5.3 + (Math.floor((apple)/5) * 5) ;
}

function calculateLeftOffset(apple) {
    return (((apple) % 5) * 5) + 3.4;
}


function resetApples() {
    apples.value.length = 0;
}


</script>
<template>
 <div :class="{'garden-plot':true, dragOver}" @drop="handleDrop" @dragleave="handleDragLeave" @dragover.prevent="handleDragEnter" @dropover.prevent :style="{'--height':height, '--bottom':bottom, '--left':left}">
  <Apple v-for="(color, index) in basketApples" height="4.2vh" :color="color"
         :style="{bottom:`${calculateBottomOffset(index)}vh`, left: `${(calculateLeftOffset(index))}vh`, 'z-index':1}"
  ></Apple>
     <div class="vertical-planks">
    <div class="vertical-planky"></div>
    <div class="vertical-planky"></div>
  </div>
  <div class="horizontal-planks">
    <div class="horizontal-planky"></div>
    <div class="horizontal-planky"></div>
    <div class="horizontal-planky"></div>
    <!-- PLANT NAME -->
    <p class="plant-name">{{ label }} </p>
  </div>
</div>
</template>
<style scoped>
:root {
    --height: 10vh;
    --bottom: 0;
    --left: 0;
}

.dragOver {
    box-shadow: 0 calc(0.4 * var(--height)) calc(0.5 * 0.5 * var(--height)) calc(0.5 * 0.25 * var(--height)) rgba(0, 255, 255, 0.8);
}

.garden-plot {
    position: absolute;
    display: flex;
    left: var(--left);
    bottom: var(--bottom);
}

    .vertical-planks {
        display: flex;
        justify-content: space-between;
        width: calc(var(--height) * 2 + 10px);
        height: var(--height);
    }

    .horizontal-planks {
        position: absolute;
        top: calc(12/200 * var(--height) * 2);
        z-index: 1;
        left: calc(-5/200 * var(--height) * 2);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .horizontal-planky {
        height: calc(27/200 * var(--height) * 2);
        width: calc(210/200 * var(--height) * 2);
        background:#a9633d;
        margin-bottom: calc(3/200 * var(--height) * 2);
        //border-bottom: solid 1px rgba(0, 0, 0, 0.93);
        box-shadow: 0 calc(4/200 * var(--height) * 2) calc(2/200 * var(--height) * 2) calc(-2/200 * var(--height) * 2) rgba(95, 55, 33, 0.96);
    }

    .vertical-planky {
        height: var(--height);
        width: calc(20/200 * var(--height) * 2);
        background:#a9633d;
        box-shadow: 0 calc(4/200 * var(--height) * 2) calc(2/200 * var(--height) * 2) calc(-2/200 * var(--height) * 2) rgba(95, 55, 33, 0.96);

        border-top-left-radius: calc(4/200 * var(--height) * 2);
        border-top-right-radius: calc(4/200 * var(--height) * 2);

    }

       .plant-name {
        color: #582806;
        font-size: calc(20/200 * var(--height) * 2);
        font-weight: bold;
        text-transform: uppercase;
        text-align: center;
        position: absolute;
        top: calc(27/200 * var(--height) * 2);
           user-select: none;
    }
</style>