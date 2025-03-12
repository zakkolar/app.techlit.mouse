<script setup>
/** CSS Star copyright (c) 2024 by Ion Emil Negoita (https://codepen.io/inegoita/pen/XWgvKYm)

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. */

const props = defineProps({
    height: {
        required: true
    },
    randomize: {
        default: false
    },
    animate: {
        default: false
    }
})


const style = computed(() => {

    let scale = 1;

    let style = '';

    if (props.randomize) {
        scale = Math.random();
        const x = Math.random() * 100;
        const y = Math.random() * 80;
        style += `top: ${y}%; left: ${x}%;`;
    }

    style += `--height:calc(${props.height} * ${scale});`


    if (props.animate) {
        const animationTime = 1.25;
        const delay = Math.random() * animationTime;
        style += `animation-delay: ${delay}s; animation-duration: ${animationTime}s;`;
    }

    return style;


})
</script>
<template>
    <div class="star" :class="{'animated': animate}" :style="style">

    </div>

</template>
<style scoped>
.star {
    width: 1em;
    height: 1em;
    padding-top: 0.575em;
    padding-left: 0.575em;
    font-size: calc(var(--height) / 2.3);
    --star-color: white;
  --star-offset: -0.5em;
  transform: translateY(var(--star-offset));
}

.star:before {
    content: "";
    position: absolute;
    background: var(--star-color);
    width: 1em;
    height: 1.15em;
    transform: rotate(-45deg) skewX(22.5deg) skewY(22.5deg);
}

.star:after {
    content: "";
    position: absolute;
    background: var(--star-color);
    width: 1em;
    height: 1.15em;
    transform: rotate(45deg) skewX(22.5deg) skewY(22.5deg);
}

.star.animated {
    animation-name: twinkle;
    animation-iteration-count: infinite;
}

@keyframes twinkle {
    50% {
        transform: scale(0.95) translateY(var(--star-offset));
        opacity: 0.8;
    }
}


</style>