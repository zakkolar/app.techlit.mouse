<script setup>
/*
Copyright (c) 2025 by SassTantrum (https://codepen.io/sasstantrum/pen/deQQLm)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 */

const props = defineProps({
  height: {
    required: true,
  }
})

</script>
<template>
  <div class="container">
     <div class="bone"></div>
  </div>
</template>
<style scoped>

.container {
  position: relative;
  pointer-events: none;
}

.bone {
  --height: v-bind('height');
  --bone-color: ghostwhite;


  font-size: calc(var(--height) / 0.4);

  background: var(--bone-color);
  height: 0.4em;
  width: 2em;
  position: relative;

  pointer-events: auto;

}
.bone::before, .bone::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  top: -0.2em;
  width: 0.4em;
  height: 0.4em;
  background: var(--bone-color);
  box-shadow: 0 0.4em 0 var(--bone-color);
  pointer-events: auto;
}
.bone::before {
  left: -0.2em;
}
.bone::after {
  right: -0.2em;
}
</style>