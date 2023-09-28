<script setup lang="ts">
import Basket from "~/components/drag/Basket.vue";
import DraggableApple from "~/components/drag/DraggableApple.vue";
import {getMinutes, getSeconds} from "~/utilities/MinutesAndSeconds";
import {getParam, hashToParams, PARAM_TYPES} from "~/utilities/UrlParams";

enum GAME_STATES {LOADING, READY,PLAYING,GAME_OVER}

const defaults = {
    timeLimit: 60,
    newAppleInterval: 0,
    startingApples: 1,
    showPlayAgain: false,
    useSound: true
}

// user settings
const startingApples = ref(defaults.startingApples),
    timeLimit = ref(defaults.timeLimit),
    newAppleInterval = ref(defaults.newAppleInterval),
    showPlayAgain = ref(defaults.showPlayAgain),
    useSound = ref(defaults.useSound);


// internal data
const treeWidth = ref(-1),
    appleStarts = ref([]),
    appleRefs = ref([]),
    basket = ref(null),

    gameState = ref(GAME_STATES.LOADING),

    timeRemaining = ref(timeLimit.value),
    minutes = computed(() => getMinutes(timeRemaining.value)),
    seconds = computed(() => getSeconds(timeRemaining.value)),

    collectedApples = ref(0),
    numApples = ref(startingApples),
    newAppleCounter = ref(0),

    draggedApples = ref(0)


onMounted(() => {
    window.addEventListener('resize', windowResize)
    window.addEventListener('hashchange', updateGameSettingsFromHash)
    windowResize();
    updateGameSettingsFromHash();
})

function addApple() {
    appleStarts.value.push({
        x: randomX(),
        y: randomY(),
        color: randomColor()
    })
}

function setApples() {
    appleStarts.value.length = 0;
    for(let i=0; i< numApples.value; i++) {
        addApple();
    }
}

function resetGame() {
    collectedApples.value = 0;
    basket.value?.resetApples();
    numApples.value = startingApples.value;
    timeRemaining.value = timeLimit.value;
    setApples();
}

function handleAppleDrop(id) {
    const apple = appleRefs.value.find(apple => apple.id === id);
    if(apple) {
        playSound('pop');
        apple.moveTo(randomX(),randomY(), randomColor());
        collectedApples.value++;
    }

}

function randomX() {
    return randBetween(4, 75);
}

function randomY() {
    return randBetween(10,45)
}

function randBetween(min, max) {
    return (Math.random() * (max - min)) + min;
}

function randomColor() {
    const colors = [
        '#f54b40',
        '#f0ff68'
    ]
    return colors[Math.floor(Math.random()*colors.length)];
}

function windowResize() {
    treeWidth.value = document.getElementById('tree')?.offsetWidth || -1;
}

function updateGameSettingsFromHash() {
    const params = hashToParams();
    // initial time on the countdown timer
    timeLimit.value = getParam(params, 'timeLimit', PARAM_TYPES.INTEGER, defaults.timeLimit);
    // add a new coin every newCoinInterval seconds. set to 0 for no new coins
    newAppleInterval.value = getParam(params, 'newAppleInterval', PARAM_TYPES.INTEGER, defaults.newAppleInterval);
    // number of coins to start with on the screen
    startingApples.value = getParam(params, 'startingApples', PARAM_TYPES.INTEGER, defaults.startingApples);
    // show the player a "play again" button after the game ends
    showPlayAgain.value = getParam(params, 'showPlayAgain', PARAM_TYPES.BOOLEAN, defaults.showPlayAgain);
    // play sound effects
    useSound.value = getParam(params, 'useSound', PARAM_TYPES.BOOLEAN, defaults.useSound);

    resetGame();
    gameState.value = GAME_STATES.READY
}

function startGame() {
    resetGame();
    gameState.value = GAME_STATES.PLAYING;
    updateTimer();
}

function playSound(s: string) {
    if(useSound.value) {
        const sound = new Audio(`/sounds/${s}.mp3`)
        sound.play();
    }
}

function updateTimer() {
    if(gameState.value === GAME_STATES.PLAYING) {
        if(timeRemaining.value > 0) {
            timeRemaining.value--;
            if(newAppleInterval.value > 0) {
                newAppleCounter.value++;
                if(newAppleCounter.value === newAppleInterval.value) {
                    numApples.value++;
                    addApple();
                    newAppleCounter.value = 0;
                }
            }
            setTimeout(updateTimer, 1000);
        }
        else {
            checkGameOver();
        }
    }
}

function checkGameOver() {
    if(timeRemaining.value === 0 && draggedApples.value === 0) {
        gameState.value = GAME_STATES.GAME_OVER;

    }
}

function handleDragStart() {
    draggedApples.value++;
}

function handleDragEnd() {
    draggedApples.value--;
    checkGameOver();
}

</script>
<template>
    <div v-if="gameState !== GAME_STATES.GAME_OVER" style="font-size: 7vh">
        <div class="absolute left-2 top-2">{{minutes}}:{{seconds}}</div>
        <div id="coinCount" class="absolute right-2 top-2">Apples: {{collectedApples}}</div>
    </div>

    <div class="game">
        <div class="grass"></div>
        <div id="tree"></div>
        <DraggableApple v-if="gameState === GAME_STATES.PLAYING"
                        v-for="apple in appleStarts" ref="appleRefs"
                        height="10vh"
                        :initial-x="apple.x"
                        :initial-y="apple.y"
                        :initial-color="apple.color"
                        @dragstart="handleDragStart"
                        @dragend="handleDragEnd"
        >
        </DraggableApple>
        <Basket ref="basket"
                @apple-drop="handleAppleDrop"
                v-if="treeWidth >= 0"
                label="Apples"
                height="15vh"
                bottom="1vh"
                :left="`${treeWidth * 0.75}px`">
        </Basket>
    </div>

    <StartScreen @start="startGame" v-if="gameState === GAME_STATES.READY" title="Apple Picker">
        Click and drag as many apples to the basket as you can before time runs out.
    </StartScreen>

    <EndScreen v-if="gameState === GAME_STATES.GAME_OVER" @play-again="startGame" :button="showPlayAgain">
        You picked {{collectedApples}} apple<span v-if="collectedApples !== 1">s</span>!
    </EndScreen>
</template>
<style lang="scss">
body {
  user-select: none;
}

.game {
  width:100%;
  height:100vh;
  background:deepskyblue;
  border-bottom:4px;
  overflow: clip;
}

.grass {
  width: 100%;
  height: 5vh;
  background: #79d920;
  position: absolute;
  bottom:0;
}

#tree {
  --height: 98vh;
  height: var(--height);
  width: calc(1626/1714 * var(--height));
  position: absolute;
  bottom: 1vh;
  margin: auto;
  left: 5vh;
  background-image:url('/images/tree.svg');
}

</style>
