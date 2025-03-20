<script setup>

/*
Copyright (c) 2025 by James (https://codepen.io/jamestrenda/pen/YzKmpLN)

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
  }
})
</script>
<template>
  <div class="wrapper" :class="{animated: animate}">
    <div class="treasure">
      <div class="chest">
        <div class="lid">
          <div class="bar">

          </div>
          <div class="handle"></div>

        </div>
        <div class="bottom">
          <div class="bottom__left"></div>
          <div class="bottom__center">
            <div class="lock"></div>
          </div>
          <div class="bottom__right"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>


.wrapper {
  --yellow: yellow;
  --brown: saddlebrown;
  --gold: gold;
  --blue: torquoise;
  --blue-light: lightblue;
  --blue-dark: darkblue;
  --orange: #ffbb1b;
  --orange-dark: #bf7c08;
  --gray: #eee;
  --border-radius: 0.2em;
  --wood-panels: linear-gradient(180deg, #8b4513 42.37%, #6b340a 42.37%, #6b340a 50%, #8b4513 50%, #8b4513 92.37%, #6b340a 92.37%, #6b340a 100%);

}

.treasure {
  --height: v-bind('height');
  font-size: calc(var(--height) / 3.5);
  width: 5em;

}

.chest {
  display: grid;
}

.bar {
  --height: 0.2em;
  width: calc(5em + var(--height) + 0.2em);
  height: var(--height);
  background: var(--orange);
  position: absolute;
  z-index: 10;
  border-radius: 0.2em;
  bottom: calc(var(--height) * -0.5);
  left: calc((var(--height) * -0.5) - 0.1em);
}


.lid {
  height: 1em;
  display: block;
  background-color: var(--brown);
  position: relative;

}

.lid::before, .lid::after {
  position: absolute;
  background-color: var(--gold);
  content: "";
  display: block;
  width: 0.8em;
  height: 1.2em;
  top: -0.2em;
  margin: 0 -0.03em;
  border-radius: var(--border-radius);
}

.lid::after {
  right: 0;

}

.handle {
  position: relative;
}

.handle::before {
  content: "";
  display: block;
  height: 0.3em;
  position: absolute;
  transform: translateY(-50%);
  background-color: var(--orange);
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 0.1em;
  z-index: -1;
}

.bottom {
  background: var(--gold);
  border-radius: 0.2em;
  display: grid;
  width: 5em;
  height: 2.5em;
  grid-template-columns: minmax(0.2em, 0.8em) minmax(1.2em, 1fr) minmax(0.2em, 0.8em);
}

.bottom__center {
  height: calc(100% - 0.35em);
  background-image: var(--wood-panels);
  background-color: var(--brown);
  background-size: 1.18em 1.18em;
  margin: 0 -0.3em;
  border-radius: var(--border-radius);
  position: relative;
  z-index: 1;
}

.bottom__left,
.bottom__right {
  background-color: var(--gold);
  border-radius: var(--border-radius);
  position: relative;
  z-index: 2;
  background-image: linear-gradient(136deg, #ffd700 22.22%, #ffbb1b 22.22%, #ffbb1b 50%, #ffd700 50%, #ffd700 72.22%, #ffbb1b 72.22%, #ffbb1b 100%);
  background-size: 2.5em 2.5em;
}

.bottom__right {
  background-size: 6em 2.5em;
  border-bottom-left-radius: 0;
}

.bottom__left {
  background-size: 1.39em 2.5em;
  border-bottom-right-radius: 0;
}

.bottom__left::before,
.bottom__left::after,
.bottom__right::before,
.bottom__right::after {
  content: "";
  display: block;
  position: absolute;
  height: 0.2em;
  width: 0.2em;
  background-color: var(--orange-dark);
  border-radius: 50%;
  top: 0.2em;
  left: 0;
  right: 0;
  margin: auto;
}

.bottom__left::after,
.bottom__right::after {
  top: auto;
  bottom: 0.2em;
}

.lock {
  position: absolute;
  top: 0.2em;
  right: 0;
  left: 0;
  margin: 0 auto;
  height: 1em;
  width: 0.8em;
  background: var(--orange);
  border-radius: var(--border-radius);
  z-index: 999;
}

.lock::before,
.lock::after {
  content: "";
  display: block;
  position: absolute;
  left: 0.1em;
  right: 0.1em;
  margin: 0 auto;
  z-index: 999;
}

.lock::before {
  height: 0.3em;
  width: 0.3em;
  border-radius: 100%;
  top: 0.15em;
  background-color: var(--orange-dark);
}

.lock::after {
  height: 0;
  width: 0;
  border-color: transparent transparent var(--orange-dark);
  border-width: 0.3em 0.15em 0.3em 0;
  border-style: solid;
  border-radius: var(--border-radius);
  top: 0;
}

@keyframes treasure-glow {
  0% {
    box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.1);
  }
  50% {
    box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 10px 2px rgba(255, 215, 0, 0.1);
  }
}


/* Apply animations only when the wrapper has the animated class */
.wrapper.animated .treasure {
  animation: treasure-glow 3s infinite ease-in-out;
}


</style>