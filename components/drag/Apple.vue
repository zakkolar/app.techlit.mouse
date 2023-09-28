<script setup>
/*
Original CSS Apple design
Copyright (c) 2023 by Likii (https://codepen.io/likiipedia/pen/zYwXvMq)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
const props = defineProps({
    height: {
        required: true
    },
    color: {
        default: '#f54b40'
    }
})

</script>
<template>
  <div class="apple-wrapper"  :style="{'--height':height, '--color': color}">
    <!-- APPLE STEM -->
      <div class="stem"></div>
      <!-- APPLE -->
       <div class="apple">
            <div class="apple-left" ></div>
            <div class="apple-right" ></div>
            <div class="apple-shine"></div>
       </div>
  </div>
</template>

<style scoped>
:root {
    --height: 10vh;
    --color: green;
}

.apple-wrapper {
    position: absolute;
    z-index: 100;
    background: yellow;
}
.apple {
    position: relative;
}

.stem {
    background: #175638;
    width: calc(4/35 * var(--height));
    height: calc(12/35 * var(--height));
    z-index: 1;
    position: absolute;
    top: calc(-0.15 * var(--height));
    left: calc(39/70 * var(--height));
}

.apple-shine {
    background: white;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 50px;
    border-bottom-left-radius: 50px;
    width: calc(5/35 * var(--height));
	  height: calc(10/35 * var(--height));
    z-index: 1;
    transform: rotate(-45deg);
    position: absolute;
    right: calc(-0.95 * var(--height));
    top: calc(5/35 * var(--height));
}

.apple-left {
	width: calc(0.71 * var(--height));
	height: var(--height);
	border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  border-top-right-radius: 50%;
  //position: relative;
  //left: calc(0.14 * var(--height));
    position: absolute;
  left: calc(0 * var(--height));
    top:0;
  background: var(--color);
	z-index: 1;
}
.apple-right {
	width: calc(0.71 * var(--height));
	height: var(--height);
	border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top-left-radius: 50%;
  background: var(--color);
	z-index: 1;
  position: absolute;
    top:0;
  right: calc(-1.2 * var(--height));
}
</style>