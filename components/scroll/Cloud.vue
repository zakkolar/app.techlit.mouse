<script setup>
/*
 CSS cloud (c) 2024 by Josh Bader (https://codepen.io/joshbader/pen/vEKrqz)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const props = defineProps({
    height: {
        required: true
    },
    animate: {
        default: false
    },
    animationStart: {
        default: 0
    }
})

const style = computed(() => {
    let style = `--height: ${props.height};`

    if(props.animate) {
        const duration = (Math.random() * 60) + 220;
        const delay = duration * props.animationStart * -1;
        style+= `animation-duration: ${duration}s; animation-delay: ${delay}s`
    }

    return style;
})
</script>

<template>
    <div class="cloud" :class="{'animated': animate}" :style="style"></div>
</template>

<style scoped>
.cloud {
    font-size: calc(var(--height) / 3);
    position: relative;
    margin-left: 2em;
    display: block;
    width: 3em;
    height: 3em;
    background: #fff;
    border-radius: 50% 50% 0 0;
}

.cloud.absolute {
    position: absolute;
}

.cloud:before,
.cloud:after {
    content: '';
    position: absolute;
    bottom: 0;
    background: inherit;
}

.cloud:before {
    left: 80%;
    width: 60%;
    height: 60%;
    border-radius: 50% 50% 50% 0;
}

.cloud:after {
    right: 80%;
    width: 80%;
    height: 80%;
    border-radius: 50% 50% 0;
}

.cloud.animated {
    animation-name: move;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
}

@keyframes move {
    0% {
        left: 100%;
    }
    100% {
        left: -7em;
    }
}
</style>