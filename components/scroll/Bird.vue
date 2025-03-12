<script setup>
const props = defineProps({
    height: {
        required: true
    },
    animate: {
        default: false
    },
    animationStart: {
        default: 0
    },
    color: {
        default: '#ff9b9b'
    }
})

const style = computed(() => {
    let style = `--height: ${props.height};`

    if(props.animate) {
        const duration = 30;
        const delay = duration * props.animationStart * -1;
        style+= `animation-duration: ${duration}s, 1s; animation-delay: ${delay}s, ${delay}s;`
    }

    return style;
})

</script>

<template>
    <div class="bird" :style="style" :class="{'animated': animate}">
        <div class="body"><span class="beak"></span></div>
    </div>
</template>

<style scoped>
@keyframes animateBird {
    0% {
        margin-left: -1em;
    }
    100% {
        margin-left: 100%;
    }
}

@keyframes upDown {
    0% {
        padding-top: 0;
    }
    100% {
        padding-top: calc(1em/12);
    }
}

@keyframes wing {
    0% {
        bottom: 0.25em;
    }
    100% {
        bottom: 0.33em;
    }
}

@keyframes beakTop {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-15deg);
    }
}

@keyframes beakBottom {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(15deg);
    }
}

/* ANIMATIONS */

.bird {
    font-size: var(--height);
    isolation: isolate;
    position: relative;
    --bird-color: v-bind('props.color');
    pointer-events: none; /* Make the container transparent to mouse events */
}

.bird.animated {
    animation-name: animateBird, upDown;
    animation-iteration-count: infinite, infinite;
    animation-timing-function: linear, ease-in-out;
    animation-direction: normal, alternate;
    animation-duration: 20s, 1s;
}

/* OBJECTS */

.body {
    background: var(--bird-color);
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    box-shadow: 0 calc(1em/12) calc(1em/6) rgba(0, 0, 0, 0.1);
    height: 1em;
    position: relative;
    width: 1em;
    pointer-events: auto; /* Re-enable mouse events for the bird body */

}

.body:before, .body:after {
    content: "";
    position: absolute;
    pointer-events: none; /* Decorative elements don't need pointer events */
}

.body:before {
    background: rgba(0,0,0,0.1);
    border-radius: 50% 0 50% 50%;
    bottom: 0.25em;
    height: calc(1em/6);
    left: calc(1em/6);
    width: calc(1em/3.43);
}

.animated .body:before {
  animation: wing 0.2s ease-in-out infinite alternate;
}

.body:after {
    background: var(--bird-color);
    height: calc(1em/6);
    border-radius: 50%;
    box-shadow: calc(1em/24) calc(1em/12) 0 #555 inset;
    right: 0.25em;
    top: 0.25em;
    width: calc(1em/6);
}

.beak:before, .beak:after {
    content: "";
    position: absolute;
    z-index: -1;
    pointer-events: none; /* Beak shouldn't capture clicks */
}

.beak:before {
    border-bottom: 0.25em solid #ffde00;
    border-right: 0.25em solid transparent;
    height: 0;
    right: calc(1em/-12);
    top: 0.25em;
    width: 0;
}

.animated .beak:before {
  animation: beakTop 0.3s ease-in-out infinite alternate;
}

.beak:after {
    border-top: 0.25em solid #ff9200;
    border-right: 0.25em solid transparent;
    height: 0;
    right: calc(1em/-12);
    top: 0.5em;
    width: 0;
}

.animated .beak:after {
    animation: beakBottom 0.3s ease-in-out infinite alternate;
}
</style>