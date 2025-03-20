<script setup>
const props = defineProps({
  height: {
    required: true
  }
})
</script>
<template>
  <div class="tree" :style="`--height: ${height}`">
    <div class="leaves left"></div>
    <div class="leaves right"></div>
    <div class="trunk">

    </div>
  </div>
</template>
<style scoped>


.tree {
  height: var(--height);

  --leaf-width: calc(var(--height) * 0.2);
  --leaf-height: calc(var(--height) * 0.8);
  --trunk-width: calc(var(--height) * 0.05);
  --trunk-height: calc(var(--height) * 0.2);
  --light-green: #badc58;
  --dark-green: #6ab04c;

  z-index: 100;
  pointer-events: none;


}

.trunk {

  height: var(--trunk-height);
  width: var(--trunk-width);
  left: calc(((var(--leaf-width) * 2) - var(--trunk-width)) * 0.5);
  top: var(--leaf-height);
  position: absolute;
  background-color: #774f3d;
  pointer-events: auto;
}

.leaves {
  position: absolute;
  z-index: 50;
  width: calc(var(--leaf-width) * 2);
  height: var(--leaf-height);
  pointer-events: auto;
}

.left {
  background-color: var(--dark-green);
  clip-path: polygon(100% 0%, 50% 100%, 100% 100%);
  left: calc(var(--leaf-width) * -1);

}

.right {
  background-color: var(--light-green);
  clip-path: polygon(0% 0%, 50% 100%, 0% 100%);
  left: calc(var(--height) * 0.2);
}

</style>