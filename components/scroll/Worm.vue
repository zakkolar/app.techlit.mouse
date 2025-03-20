<script setup>
const props = defineProps({
  height: {
    required: true,
  },
  animate: {
    default: false
  }
})

const animationBase = (Math.random() * 5) + 3;

const animationTime = `${animationBase}s`;

const animationDelay = `${Math.random() * animationBase}s`;

</script>
<template>
  <div class="worm-container" :class="{animated: animate}">
    <div class="worm">
      <div class="worm-segment">
        <div class="worm-face">
          <div class="worm-eye left">
            <div class="worm-pupil"></div>
          </div>
          <div class="worm-eye right">
            <div class="worm-pupil"></div>
          </div>
        </div>
      </div>
      <div class="worm-segment"></div>
      <div class="worm-segment"></div>
      <div class="worm-segment"></div>
      <div class="worm-segment"></div>
      <div class="worm-segment"></div>
    </div>
  </div>
</template>
<style scoped>


.worm-container {
  --height: v-bind('height');
  font-size: calc(var(--height) / 0.7);
  width: 100%;
  pointer-events: none;
}

.worm {
  position: relative;
  width: 3.5em;
  height: 0.8em;
  display: flex;
}

.worm-segment {
  width: 0.7em;
  height: 0.7em;
  background-color: #ff6b6b;
  border-radius: 50%;
  margin-left: -0.2em;
  position: relative;
  pointer-events: auto;
}

.animated .worm-eye {
  animation: blink v-bind('animationTime') infinite ease-in-out;
  animation-delay: v-bind('animationDelay');
}

.worm-segment:nth-child(odd) {
  background-color: #f06060;
}


.worm-segment:first-child {
  margin-left: 0;
  background-color: #ff5252;
  width: 0.9em;
  height: 0.9em;
}

.worm-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.worm-eye {
  position: absolute;
  width: 0.2em;
  height: 0.2em;
  background-color: white;
  border-radius: 50%;
  top: 25%;
}

.worm-eye.left {
  left: 20%;
}

.worm-eye.right {
  right: 35%;
}

.worm-pupil {
  position: absolute;
  width: 0.08em;
  height: 0.08em;
  background-color: black;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes blink {
  0%, 93%, 98% {
    transform: scaleY(1);
    height: 0.2em;
  }
  94%, 97% {
    transform: scaleY(0.1);
    height: 0.02em;
  }
}


</style>