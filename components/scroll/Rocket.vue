<script setup>
/*
Copyright (c) 2025 by Suzanne Aitchison (https://codepen.io/aitchiss/pen/OJMGqJr)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const props = defineProps({
  height: {
    required: true,
  },
  animate: {
    default: false
  }
})
</script>
<template>
  <div class="container" :class="{animated: animate}">
    <div class="wing left"></div>
    <div class="wing right"></div>
    <div class="rocket">
      <div class="main">
        <div class="window"></div>
      </div>
    </div>
    <div class="flame-outer">
      <div class="flame-inner"></div>
    </div>
    <div class="wing-center"></div>
  </div>
</template>
<style scoped>


.container {
  --rocket-color: #FFFFFF;
  --detail-color: #DD4D2D;
  --window-color: #076AA1;
  --flame-outer-color: #F6AD14;
  --flame-inner-color: #F2E718;

  --height: v-bind('height');

  font-size: calc(var(--height) / 2.5);

  position: relative;

  width: 1.5em;
  height: 2.5em;


  pointer-events: none;
}


.rocket {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0.66em;
  height: 1.7em;
  overflow: hidden;
  border-radius: 50% 50% 0 0;
  pointer-events: auto;
}


.wing {
  position: absolute;
  top: 1.5em;
  width: 0.6em;
  height: 0.7em;
  border-radius: 40%;
  pointer-events: auto;
}

.wing.left {
  box-shadow: -0.15em -0.2em 0 var(--detail-color);
  left: 0.4em;
}

.wing.right {
  box-shadow: 0.15em -0.2em 0 var(--detail-color);
  right: 0.4em;
}

.wing-center {
  position: absolute;
  left: 50%;
  top: 1.3em;
  transform: translateX(-50%);
  height: 0.6em;
  width: 0.03em;
  background: var(--detail-color);
  border-radius: 0 0 50% 50%;
}

.main {
  content: '';
  position: absolute;
  top: 0.2em;
  width: 0.66em;
  height: 1.7em;
  background: var(--rocket-color);
  border-radius: 50%;
  overflow: hidden;
  pointer-events: auto;
}

/* Cone at top */
.main::before {
  content: '';
  position: absolute;
  height: 0.4em;
  border-radius: 50%;
  width: 0.66em;
  background: var(--detail-color);
}

.main::after {
  content: '';
  position: absolute;
  width: 0.66em;
  height: 1.7em;
  border-radius: 50%;
  box-shadow: 0.1em 0 0 rgba(0, 0, 0, 0.2);
  left: -0.09em;
}

.window {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0.6em;
  width: 0.27em;
  height: 0.27em;
  background: var(--window-color);
  border: 0.03em solid var(--detail-color);
  border-radius: 50%;
  overflow: hidden;
}

/* Glare */
.window::before {
  content: '';
  position: absolute;
  width: 0.5em;
  height: 0.6em;
  transform: rotate(45deg);
  background: rgba(255, 255, 255, 0.5);
  top: 0.1em;
  left: 0.05em;
}

.flame-outer {
  position: absolute;
  top: 1.8em;
  left: 50%;
  transform: translateX(-50%);
  width: 0.3em;
  height: 0.3em;
  border-radius: 50%;
  background: var(--flame-outer-color);
}

.flame-outer::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  top: 0.2em;
  border-left: 0.14em solid transparent;
  border-right: 0.14em solid transparent;
  border-top: 0.3em solid var(--flame-outer-color);
  pointer-events: auto;
}

.flame-outer::after {
  content: '';
  position: absolute;
  top: -0.1em;
  left: 50%;
  transform: translateX(-50%);
  width: 0.4em;
  height: 0.15em;
  background: linear-gradient(to bottom, var(--window-color), var(--window-color) 0.05em, var(--detail-color) 0.05em);
  clip-path: polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%);
  pointer-events: auto;
}

.flame-inner {
  position: absolute;
  width: 0.2em;
  height: 0.2em;
  left: 50%;
  transform: translateX(-50%);
  background: var(--flame-inner-color);
  border-radius: 50%;
}

.flame-inner::before {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  top: 0.14em;
  border-left: 0.09em solid transparent;
  border-right: 0.09em solid transparent;
  border-top: 0.2em solid var(--flame-inner-color);
}

@keyframes flight {
  0% {
    margin-left: -3em;
  }

100% {
    margin-left: 100%;
  }


}





@keyframes flamePulse {
  0% {
    height: 0.3em;
  }
  100% {
    height: 0.4em;
  }
}


@keyframes flameInnerPulse {
  0% {
    height: 0.2em;
  }
  100% {
    height: 0.3em;
  }
}

/* Window glow animation */
@keyframes windowGlow {
  0%, 100% {
    box-shadow: 0 0 5px rgba(7, 106, 161, 0.3);
  }
  50% {
    box-shadow: 0 0 10px rgba(7, 106, 161, 0.7);
  }
}



.animated {
  &.container {
    /* Update container to be absolute positioned within parent */
    position: absolute;

     animation: flight 50s linear infinite;
    transform: rotate(90deg);

  }

  .flame-outer {
    animation: flamePulse 0.2s linear infinite alternate;
  }

  .flame-inner {
    animation: flameInnerPulse 0.1s ease-in-out infinite alternate;
  }

  .window {
    animation: windowGlow 2s infinite alternate;
  }

}

</style>