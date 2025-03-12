<script setup>

import {onMounted} from "vue";
import Tree from "~/components/scroll/Tree.vue";
import Star from "~/components/scroll/Star.vue";
import Cloud from "~/components/scroll/Cloud.vue";
import Sun from "~/components/scroll/Sun.vue";
import Bird from "~/components/scroll/Bird.vue";

useHead({
    title: 'Scavenger Hunt',
    // link: [
    //     {
    //         rel: 'icon',
    //         type: 'image/x-icon',
    //         href: '/icons/apple.ico'
    //     }
    // ]
})


onMounted(() => {

    const sky = document.getElementById('sky');
    // window.scrollTo(0, sky.offsetTop + (window.innerHeight * 0.25) );
    document.addEventListener('keydown', (e) => {

        if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
            e.preventDefault();
        }

    })
})

const numStars = ref(100);

const items = ref([
  {
    component: markRaw(Star),
    section: 'space',
    name: 'star'
  },
  {
     component: markRaw(Cloud),
    section: 'sky',
    name: 'cloud'
  },
  {
    component: markRaw(Sun),
    section: 'sky',
    name: 'sun'
  },
  {
    component: markRaw(Bird),
    section: 'sky',
    name: 'bird'
  },
  {
  component: markRaw(Tree),
    section: 'ground',
    name: 'tree'
  }
])

const currentItem = ref(items.value[0]);


const newItem = () => {
  const currentSection = currentItem.value.section;
  const eligibleItems = items.value.filter(item => item.section !== currentSection);

  currentItem.value = eligibleItems[Math.floor(Math.random() * eligibleItems.length)];
}

const handleClick = item => {
  if(item === currentItem.value.name) {
    newItem();
  }
}


</script>
<template>
    <div id="environment">
        <div id="space" class="section">
            <Star v-for="star of numStars" class="absolute cursor-pointer" :animate="true" height="5vh" @click="handleClick('star')" :randomize="true"></Star>
        </div>
        <div id="sky" class="section">

            <Sun height="25vh" class="absolute cursor-pointer" @click="handleClick('sun')" style="right: 1vh; top: 1vh;"></Sun>

            <Cloud :animate="true" :animation-start="0.1" class="absolute cursor-pointer" @click="handleClick('cloud')" style="bottom: 68vh" height="15vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.22" class="absolute cursor-pointer" @click="handleClick('cloud')" style="bottom: 52vh" height="11vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.35" class="absolute cursor-pointer" @click="handleClick('cloud')" style="bottom: 65vh" height="20vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.45" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 46vh" height="10vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.55" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 60vh" height="7vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.9" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 59vh" height="13vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.15" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 32vh" height="12vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.66" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 42vh" height="10vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.8" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 38vh" height="12vh"></Cloud>
            <Cloud :animate="true" :animation-start="0.95" class="absolute  cursor-pointer" @click="handleClick('cloud')" style="bottom: 29vh" height="13vh"></Cloud>
            <Bird animate="true" class="absolute  cursor-pointer" style="top:0;" @click="handleClick('bird')" height="10vh"></Bird>
            <Bird animate="true" :animation-start="0.54" class="absolute  cursor-pointer" @click="handleClick('bird')" style="top:0;" height="12vh"></Bird>

        </div>
        <div id="ground" class="section">
            <Tree style="left: 5%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick('tree')" height="65vh"></Tree>
            <Tree style="left: 30%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick('tree')" height="65vh"></Tree>
            <Tree style="left: 55%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick('tree')" height="65vh"></Tree>
            <Tree style="left: 80%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick('tree')" height="65vh"></Tree>
        </div>
        <div id="dirt" class="section">
        </div>
    </div>

    <div id="prompt" class="text-white flex px-8">
        <p class="inline-block text-[6vh] my-auto">Can you find a {{currentItem.name}}?</p>
      <div class="ml-5 my-auto inline-block">
        <component :is="currentItem.component" class="relative" height="8vh" ></component>
      </div>
    </div>
</template>
<style>

body {
    --prompt-height: 20vh;
}


.section {
    width: 100%;
    position: relative;

    overflow-x: clip;

    --space: rgba(19, 14, 68, 1);

    ---sky: rgba(69, 238, 255, 1);
}

#space {
    background: rgb(69, 238, 255);
    background: linear-gradient(0deg, var(---sky) 0%, rgba(35, 86, 128, 1) 25%, rgba(21, 22, 75, 1) 50%, var(--space) 60%, var(--space) 100%);
    height: 100vh;
}


#sky {
    @apply section;
    background-color: var(---sky);
    height: 90vh;

}

#ground {
    @apply section;
    background-color: #9ee86b;
    height: 25vh;
}

#dirt {
    @apply section;
    background-color: #774f3d;
    height: 75vh;
}

#prompt {
    background: #2c2626;
    width: 100%;
    height: var(--prompt-height);
    position: fixed;
    top: 0;
    @apply border-b-[0.5vh] border-dashed shadow-2xl;
}

#environment {
    width: 100%;
    height: calc(100vh - var(--prompt-height));
    position: fixed;
    overflow: auto;
    bottom: 0;
}


</style>