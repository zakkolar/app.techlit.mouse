<script setup>
/*
Copyright (c) 2025 by Zahra (https://codepen.io/za-h-ra/pen/mdXEYRK)

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
  color: {
    default: '#ff762c'
  }
})


</script>
<template>
  <div class="container" :class="{animated: animate}">
    <div class="planet" :style="style">
      <div class="circle circle-one"></div>
      <div class="circle circle-two"></div>
      <div class="circle circle-three"></div>
      <div class="circle circle-four"></div>
      <div class="circle circle-five"></div>
    </div>
  </div>
</template>
<style scoped>

.container {
  pointer-events: none;

}

.planet {
  --primary-color: v-bind('color');
  --shadow-color: rgba(0,0,0,0.4);
  --crater-colors: rgba(0,0,0,0.6);

  --size: v-bind('height');

  font-size: calc(var(--size) / 2.5);

  background-color: var(--primary-color);
  height: 2.5em;
  width: 2.5em;
  border-radius: 50%;
  position: relative;
  overflow: hidden;

  box-shadow: 0 0 0.5em var(--primary-color);

  pointer-events: auto;
}

.animated .planet {
  animation: pulse 3s ease-in-out infinite;
}


.planet::after {
  content: '';
  background-color: var(--shadow-color);
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  opacity: 0.3;
  top: -30px;
  left: 30px;
  z-index: 4;
  border-radius: 50%;
}

.circle {
  background: var(--crater-colors);
  width: 0.3em;
  height: 0.3em;
  border-radius: 50%;
  z-index: 2;
}

.circle-one {
  position: absolute;
  width: 0.35em;
  height: 0.35em;
  top: 1em;
  left: 1em;
  opacity: 0.5;
}

.circle-two {
  position: absolute;
  width: 0.2em;
  height: 0.2em;
  top: 0.6em;
  left: 0.6em;
  opacity: 0.5;
}

.circle-three {
  position: absolute;
  width: 0.4em;
  height: 0.4em;
  top: 1.4em;
  left: 2em;
  opacity: 0.5;
}

.circle-four {
  position: absolute;
  width: 0.3em;
  height: 0.3em;
  top: 1.4em;
  left: 0.55em;
  opacity: 0.5;
}

.circle-five {
  position: absolute;
  width: 0.5em;
  height: 0.5em;
  top: 0.1em;
  left: 1.8em;
  opacity: 0.5;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0.09em var(--primary-color);
  }
  50% {
    box-shadow: 0 0 0.5em var(--primary-color);
    transform: scale(1.03);
  }
  100% {
    box-shadow: 0 0 0.09em var(--primary-color);
  }
}

</style>