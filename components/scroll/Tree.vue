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

    z-index:100;

}

.trunk {

  height: var(--trunk-height);
    width: var(--trunk-width);
    left: calc( ((var(--leaf-width) * 2) - var(--trunk-width)) * 0.5);
    top: var(--leaf-height);
    position: absolute;
    background-color: #774f3d;
}

.leaves {
    position: absolute;
    z-index: 50;
     width: var(--leaf-width);
    height: var(--leaf-height);


}

.left {
    background: linear-gradient(to bottom right, transparent 0%, transparent 50%, var(--dark-green) 50%, var(--dark-green) 100%);

}

.right {
    background: linear-gradient(to bottom left, transparent 0%, transparent 50%, var(--light-green) 50%, var(--light-green) 100%);
    left: calc(var(--height) * 0.2);
}

</style>