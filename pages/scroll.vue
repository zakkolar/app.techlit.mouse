<script setup lang="ts">

import {onMounted} from "vue";
import Tree from "~/components/scroll/Tree.vue";
import Star from "~/components/scroll/Star.vue";
import Cloud from "~/components/scroll/Cloud.vue";
import Sun from "~/components/scroll/Sun.vue";
import Bird from "~/components/scroll/Bird.vue";
import {getParam, hashToParams, PARAM_TYPES} from "~/utilities/UrlParams";
import {getMinutes, getSeconds} from "~/utilities/MinutesAndSeconds";
import PlanetOrange from "~/components/scroll/PlanetOrange.vue";
import PlanetBlue from "~/components/scroll/PlanetBlue.vue";
import Rocket from "~/components/scroll/Rocket.vue";
import Bone from "~/components/scroll/Bone.vue";
import Worm from "~/components/scroll/Worm.vue";
import Treasure from "~/components/scroll/Treasure.vue";

enum GAME_STATES {LOADING, READY, PLAYING, GAME_OVER}

const defaults = {
  timeLimit: 60,
  showPlayAgain: false,
  useSound: true,
  disableArrowKeys: false,
  disableTouchScreen: false
}

// user settings
const timeLimit = ref(defaults.timeLimit),
    showPlayAgain = ref(defaults.showPlayAgain),
    useSound = ref(defaults.useSound),
    disableArrowKeys = ref(defaults.disableArrowKeys)
disableTouchScreen = ref(defaults.disableTouchScreen);

// internal data
const gameState = ref(GAME_STATES.LOADING),

    timeRemaining = ref(timeLimit.value),
    minutes = computed(() => getMinutes(timeRemaining.value)),
    seconds = computed(() => getSeconds(timeRemaining.value)),

    foundItems = ref(0);

useHead({
  title: 'Scavenger Hunt',
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/icons/bird.ico'
    }
  ]
})

const startGame = () => {
  resetGame();
  const sky = document.getElementById('sky');
  gameState.value = GAME_STATES.PLAYING;

  currentItem.value = ITEMS.STAR;
  updateTimer();

  setTimeout(() => {
    sky?.scrollIntoView({behavior: 'smooth'});
  }, 200)
}

function updateTimer() {
  if (gameState.value === GAME_STATES.PLAYING) {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
      setTimeout(updateTimer, 1000);
    } else {
      gameState.value = GAME_STATES.GAME_OVER;
    }
  }
}


onMounted(() => {
  updateGameSettingsFromHash();

  window.addEventListener('hashchange', updateGameSettingsFromHash)


  document.addEventListener('keydown', (e) => {

    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      if (disableArrowKeys.value) {
        e.preventDefault();
      }
    }

  })

  const touchEvents = [
    'touchstart',
    'touchmove',
    'touchend',
    'touchcancel'
  ];

  touchEvents.forEach(eventType => {
    document.addEventListener(eventType, (e) => {
      if (disableTouchScreen.value) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, {passive: false});
  });

})

function updateGameSettingsFromHash() {
  const params = hashToParams();
  // initial time on the countdown timer
  timeLimit.value = getParam(params, 'timeLimit', PARAM_TYPES.INTEGER, defaults.timeLimit);
  // show the player a "play again" button after the game ends
  showPlayAgain.value = getParam(params, 'showPlayAgain', PARAM_TYPES.BOOLEAN, defaults.showPlayAgain);
  // disable the arrow keys for scrolling
  disableArrowKeys.value = getParam(params, 'disableArrowKeys', PARAM_TYPES.BOOLEAN, defaults.disableArrowKeys);

  // disable any touch events
  disableTouchScreen.value = getParam(params, 'disableTouchScreen', PARAM_TYPES.BOOLEAN, defaults.disableTouchScreen);

  // play sound effects
  useSound.value = getParam(params, 'useSound', PARAM_TYPES.BOOLEAN, defaults.useSound);

  resetGame();

  if (getParam(params, 'devMode', PARAM_TYPES.BOOLEAN, false)) {
    gameState.value = GAME_STATES.PLAYING;
  } else {
    gameState.value = GAME_STATES.READY;
  }
}

const resetGame = () => {
  foundItems.value = 0;
  timeRemaining.value = timeLimit.value;
  currentItem.value = null;
}

const numStars = ref(100);

const ITEMS = {
  STAR: {
    component: markRaw(Star),
    section: 'space',
    name: 'star'
  },
  PLANET_ORANGE: {
    component: markRaw(PlanetOrange),
    section: 'space',
    name: 'orange planet'
  },
  PLANET_BLUE: {
    component: markRaw(PlanetBlue),
    section: 'space',
    name: 'blue planet'
  },
  ROCKET: {
    component: markRaw(Rocket),
    section: 'space',
    name: 'rocket',
    previewHeight: 10
  },
  CLOUD: {
    component: markRaw(Cloud),
    section: 'sky',
    name: 'cloud'
  },
  SUN: {
    component: markRaw(Sun),
    section: 'sky',
    name: 'sun'
  },
  BIRD: {
    component: markRaw(Bird),
    section: 'sky',
    name: 'bird'
  },
  TREE: {
    component: markRaw(Tree),
    section: 'ground',
    name: 'tree'
  },
  BONE: {
    component: markRaw(Bone),
    section: 'dirt',
    name: 'bone',
    previewHeight: 2
  },
  WORM: {
    component: markRaw(Worm),
    section: 'dirt',
    name: 'bone',
    previewHeight: 4
  },
  TREASURE: {
    component: markRaw(Treasure),
    section: 'dirt',
    name: 'treasure'
  }

}


const currentItem = ref(null);


const newItem = () => {
  const currentSection = currentItem.value.section;

  const eligibleItems = Object.keys(ITEMS).map(item => ITEMS[item]).filter(item => item.section !== currentSection);

  currentItem.value = eligibleItems[Math.floor(Math.random() * eligibleItems.length)];
}

const handleClick = item => {
  if (item.name === currentItem.value.name && gameState.value === GAME_STATES.PLAYING) {
    foundItems.value++;

    playSound(currentItem.value.sound || 'pop');

    newItem();
  }
}

function playSound(s: string) {
  if (useSound.value) {
    const sound = new Audio(`/sounds/${s}.mp3`)
    sound.play();
  }
}


</script>
<template>
  <div id="environment">
    <div id="space" class="section">

      <Star v-for="star of numStars" class="absolute cursor-pointer" :animate="true" height="5vh"
            @click="handleClick(ITEMS.STAR)" :randomize="true"></Star>


      <PlanetOrange @click="handleClick(ITEMS.PLANET_ORANGE)" class="absolute cursor-pointer"
                    style="top: 20vh; left: 10%;" height="15vh" :animate="true"></PlanetOrange>

      <PlanetOrange @click="handleClick(ITEMS.PLANET_ORANGE)" class="absolute cursor-pointer"
                    style="top: 7vh; left: 80%;"
                    height="12vh" :animate="true"></PlanetOrange>

      <PlanetBlue @click="handleClick(ITEMS.PLANET_BLUE)" class="absolute cursor-pointer" style="top: 4vh; left: 42%;"
                  height="9vh" :animate="true"></PlanetBlue>

      <Rocket height="20vh" @click="handleClick(ITEMS.ROCKET)" class="cursor-pointer absolute" :animate="true"></Rocket>


    </div>
    <div id="sky" class="section">

      <Sun height="25vh" class="absolute cursor-pointer" @click="handleClick(ITEMS.SUN)"
           style="right: 1vh; top: 1vh;"></Sun>

      <Cloud :animate="true" :animation-start="0.1" class="absolute cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 68vh" height="15vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.22" class="absolute cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 52vh" height="11vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.35" class="absolute cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 65vh" height="20vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.45" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 46vh" height="10vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.55" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 60vh" height="7vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.9" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 59vh" height="13vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.15" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 32vh" height="12vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.66" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 42vh" height="10vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.8" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 38vh" height="12vh"></Cloud>
      <Cloud :animate="true" :animation-start="0.95" class="absolute  cursor-pointer" @click="handleClick(ITEMS.CLOUD)"
             style="bottom: 29vh" height="13vh"></Cloud>
      <Bird :animate="true" class="absolute  cursor-pointer" style="top:0;" @click="handleClick(ITEMS.BIRD)"
            height="10vh"></Bird>
      <Bird :animate="true" :animation-start="0.54" class="absolute  cursor-pointer" @click="handleClick(ITEMS.BIRD)"
            style="top:0;" height="12vh"></Bird>

    </div>
    <div id="ground" class="section">
      <Tree style="left: 5%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick(ITEMS.TREE)"
            height="55vh"></Tree>
      <Tree style="left: 30%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick(ITEMS.TREE)"
            height="55vh"></Tree>
      <Tree style="left: 55%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick(ITEMS.TREE)"
            height="55vh"></Tree>
      <Tree style="left: 80%; bottom: 15vh" class="absolute cursor-pointer" @click="handleClick(ITEMS.TREE)"
            height="55vh"></Tree>
    </div>
    <div id="dirt" class="section">
      <Bone height="3vh" @click="handleClick(ITEMS.BONE)" class="cursor-pointer absolute"
            style="top: 20vh; left: 15%;"></Bone>
      <Bone height="2.5vh" @click="handleClick(ITEMS.BONE)" class="cursor-pointer absolute"
            style="top: 30vh; left: 80%;"></Bone>
      <Bone height="2vh" @click="handleClick(ITEMS.BONE)" class="cursor-pointer absolute"
            style="top: 48vh; left: 36%;"></Bone>


      <Worm height="3vh" @click="handleClick(ITEMS.WORM)" class="cursor-pointer absolute" style="top: 65vh; left: 52%"
            :animate="true"></Worm>

      <Worm height="5vh" @click="handleClick(ITEMS.WORM)" class="cursor-pointer absolute" style="top: 35vh; left: 8%"
            :animate="true"></Worm>

      <Worm height="4vh" @click="handleClick(ITEMS.WORM)" class="cursor-pointer absolute" style="top: 14vh; left: 45%"
            :animate="true"></Worm>

      <Treasure :animate="true" height="12vh" @click="handleClick(ITEMS.TREASURE)" class="cursor-pointer absolute"
                style="top: 56vh; left: 80%"></Treasure>

    </div>
  </div>

  <div id="prompt" class="text-white justify-between flex px-8">
    <div class="my-auto flex">
      <p class="inline-block my-auto text-[6vh]">
        <span v-if="currentItem">Can you find this?</span>
        <span v-else>Can you find...</span>
      </p>
      <div v-if="currentItem && gameState === GAME_STATES.PLAYING" class="ml-5 my-auto inline-block">
        <component :is="currentItem.component" class="relative"
                   :height="`${currentItem.previewHeight || 8}vh`"></component>
      </div>
    </div>
    <div class="text-right text-[3vh] ml-auto my-auto">
      <p>Found items: {{ foundItems }}</p>
      <p>Time remaining: {{ minutes }}:{{ seconds }}</p>
    </div>
  </div>
  <div v-if="[GAME_STATES.READY, GAME_STATES.GAME_OVER].includes(gameState)"
       class="absolute top-0 left-0 right-0 bottom-0 bg-[#00000040]">

  </div>
  <StartScreen title="Scavenger hunt" @start="startGame" v-if="gameState === GAME_STATES.READY">
    Scroll up and down to find each item.
  </StartScreen>


  <EndScreen v-if="gameState === GAME_STATES.GAME_OVER" @play-again="startGame" :button="showPlayAgain">
    You found {{ foundItems }} item<span v-if="foundItems !== 1">s</span>!
  </EndScreen>
</template>
<style>

:root {
  --prompt-height: 20vh;
}

body {

  scroll-behavior: smooth;
  user-select: none;
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