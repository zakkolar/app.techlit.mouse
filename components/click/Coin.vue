<script setup>
/*
Spinning coin CSS:

Copyright (c) 2023 by Michael Lai (https://codepen.io/keiwo/pen/ZONRgx)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

import {onMounted} from "vue";

const props = defineProps({
    size: {
        type: Number,
        default: 50
    },
    xMin: {
        type:Number,
        required:true
    },
    xMax: {
        type:Number,
        required: true
    },
    yMin: {
        type: Number,
        required: true
    },
    yMax: {
        type: Number,
        required: true
    }
});

const x = ref(-1), y = ref(-1);

function moveCoin() {
    x.value = ((props.xMax - props.xMin - props.size) * Math.random()) + props.xMin;
    y.value = ((props.yMax - props.yMin - props.size) * Math.random()) + props.yMin;
}

const emit = defineEmits(['caught']);

function caught() {
    moveCoin();
    emit('caught');
}

onMounted(() => {
    moveCoin();
})

watch([() => props.yMin, () => props.yMax, () => props.xMin, () => props.xMax], (values) => {
    const [yMin, yMax, xMin, xMax] = values;
    if(y.value < yMin || y.value > yMax - props.size || x.value < xMin || x.value > xMax - props.size) {
        moveCoin();
    }


})

</script>
<template>
  <div v-if="x > -1 && y > -1" @click="caught" class="coin" :style="{top:`${y}px`, left: `${x}px`, '--coin-size':`${props.size}px`}">
    <div class="tails"></div>
    <div class="heads"></div>
  </div>
</template>

<style scoped lang="scss">
:root {
  --coin-size: 50px;
}
.coin{
	background: #FFDE00;
	width: var(--coin-size);
	height: var(--coin-size);
	border-radius: 50%;
	position: absolute;
    -webkit-transform-style: preserve-3d;
	animation: spin 2.46s linear infinite;
  cursor: pointer;

	@keyframes spin{
		0%{
			transform: rotateY(0deg);
		}
		100%{
			transform: rotateY(360deg);
		}
	}

	&:before{
		background-color: #FF9900;
		position: absolute;
		border-radius: 50%;
		content: '';
		height: var(--coin-size);
		width: var(--coin-size);
		transform: translateZ(calc(var(--coin-size) * -0.075));
	}

	&:after{
		background-color: #FF9900;
		content: '';
		left: calc(0.425 * var(--coin-size));
		position: absolute;
		height: var(--coin-size);
		width: calc(0.075 * var(--coin-size));
		z-index: -10;
		transform: rotateY(-90deg);
		transform-origin: 100% 50%;
	}
}

.tails{
	background-color: #FF9900;
	position: absolute;
	border-radius: 50%;
	content: '';
	height: var(--coin-size);
	width: var(--coin-size);
	transform: translateZ(calc(-0.0005 * var(--coin-size)));
	border: 1px solid #FF9900;
}

.heads{
	background-color: #FFDE00;
	position: absolute;
	border-radius: 50%;
	content: '';
	height: var(--coin-size);
	width: var(--coin-size);
	transform: translateZ(calc(-0.0755 * var(--coin-size)));
	border: 1px solid #FF9900;
}
</style>