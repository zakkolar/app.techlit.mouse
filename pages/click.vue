<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getParam, hashToParams, PARAM_TYPES} from "~/utilities/UrlParams";
import Coin from "~/components/click/Coin.vue";

enum GAME_STATES {LOADING, READY,PLAYING,GAME_OVER}

const defaults = {
    coinSize: 100,
    timeLimit: 60,
    newCoinInterval: 0,
    startingCoins: 1,
    showPlayAgain: false,
    useSound: true
}

// user settings
const coinSize = ref(defaults.coinSize),
    timeLimit = ref(defaults.timeLimit),
    newCoinInterval=ref(defaults.newCoinInterval),
    startingCoins = ref(defaults.startingCoins),
    showPlayAgain = ref(defaults.showPlayAgain),
    useSound = ref(defaults.useSound),

    // internal data
    gameState = ref(GAME_STATES.LOADING),

    timeRemaining = ref(timeLimit.value),
    minutes = computed(() => Math.floor(timeRemaining.value/60).toString().padStart(2, '0')),
    seconds = computed(() => (timeRemaining.value % 60).toString().padStart(2,'0')),

    collectedCoins = ref(0),
    numCoins = ref(1),
    newCoinCounter = ref(0),

    xMax = ref(-1),
    yMax = ref(-1),
    xMin = ref(-1),
    yMin = ref(-1);

onMounted(()=> {

    window.addEventListener('resize', updateBounds);
    window.addEventListener('hashchange', updateGameSettingsFromHash)

    updateBounds();
    updateGameSettingsFromHash();

})

function collectCoin() {
    collectedCoins.value++;
    playSound('coin');
}

function updateBounds() {
    xMax.value = window.innerWidth;
    xMin.value = 0;
    yMax.value = window.innerHeight;
    yMin.value = document.getElementById('coinCount')?.offsetHeight || 0;
}

function playSound(s: string) {
    if(useSound.value) {
        const sound = new Audio(`/sounds/${s}.mp3`)
        sound.play();
    }
}

function updateGameSettingsFromHash() {
    const params = hashToParams();
    // width and height of each coin in pixels
    coinSize.value = getParam(params, 'coinSize', PARAM_TYPES.INTEGER, defaults.coinSize);
    // initial time on the countdown timer
    timeLimit.value = getParam(params, 'timeLimit', PARAM_TYPES.INTEGER, defaults.timeLimit);
    // add a new coin every newCoinInterval seconds. set to 0 for no new coins
    newCoinInterval.value = getParam(params, 'newCoinInterval', PARAM_TYPES.INTEGER, defaults.newCoinInterval);
    // number of coins to start with on the screen
    startingCoins.value = getParam(params, 'startingCoins', PARAM_TYPES.INTEGER, defaults.startingCoins);
    // show the player a "play again" button after the game ends
    showPlayAgain.value = getParam(params, 'showPlayAgain', PARAM_TYPES.BOOLEAN, defaults.showPlayAgain);
    // play sound effects
    useSound.value = getParam(params, 'useSound', PARAM_TYPES.BOOLEAN, defaults.useSound);

    resetGame();

    gameState.value = GAME_STATES.READY;

}

function resetGame() {
    collectedCoins.value = 0;
    numCoins.value = startingCoins.value;
    timeRemaining.value = timeLimit.value;
}

function startGame() {
    resetGame();
    gameState.value = GAME_STATES.PLAYING;
    updateTimer();
}

function updateTimer() {
    if(gameState.value === GAME_STATES.PLAYING) {
        if(timeRemaining.value > 0) {
            timeRemaining.value--;
                if(newCoinInterval.value > 0) {
                    newCoinCounter.value++;
                    if(newCoinCounter.value === newCoinInterval.value) {
                        numCoins.value++;
                        newCoinCounter.value = 0;
                    }
                }
                setTimeout(updateTimer, 1000);
            }
            else {
                gameState.value = GAME_STATES.GAME_OVER;
            }
    }

}

</script>
<template>
    <div v-if="gameState !== GAME_STATES.GAME_OVER">
        <div class="absolute left-2 top-2 text-5xl">{{minutes}}:{{seconds}}</div>
        <div id="coinCount" class="absolute right-2 top-2 text-5xl">Coins: {{collectedCoins}}</div>
    </div>

    <StartScreen @start="startGame" v-if="gameState === GAME_STATES.READY" title="Coin Collector">
        Click on as many coins as you can before the time runs out.
    </StartScreen>

    <EndScreen v-if="gameState === GAME_STATES.GAME_OVER" @play-again="startGame" :button="showPlayAgain">
        You collected {{collectedCoins}} coin<span v-if="collectedCoins !== 1">s</span>!
    </EndScreen>

    <div class="game" v-if="gameState !== GAME_STATES.LOADING">
        <Coin v-if="gameState === GAME_STATES.PLAYING" v-for="coin of numCoins" :x-min="xMin" :x-max="xMax" :y-min="yMin" :y-max="yMax" :size="coinSize"
              @caught="collectCoin">
        </Coin>
    </div>
</template>

<style>

.game {
    width:100%;
    height:100vh;
    background:deepskyblue;
    border-bottom:4px;

}
</style>