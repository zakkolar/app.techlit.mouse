<script setup lang="ts">
import { hashToParams, getParam, PARAM_TYPES } from '~/utilities/UrlParams';
import { getMinutes, getSeconds } from '~/utilities/MinutesAndSeconds';
import StartScreen from '~/components/StartScreen.vue';
import EndScreen from '~/components/EndScreen.vue';

useHead({
  title: 'Word Selector',
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: '/icons/cursor.svg'
    }
  ]
})

enum GAME_STATES { LOADING, READY, PLAYING, GAME_OVER }

interface Phrase {
  phrase: string;
  target: string;
  hints?: Record<string, string>;
}

const phrases: Phrase[] = [
  {
    phrase: "Can you select the bold words?",
    target: "bold"
  },
  {
    phrase: "Try it one more time.",
    target: "one"
  },
  {
    phrase: "Can you select two words at once?",
    target: "two words"
  },
  {
    phrase: "Wow! You're a pro!",
    target: "Wow!"
  },
  {
    phrase: "I'll bet you can't select this whole sentence.",
    target: "I'll bet you can't select this whole sentence.",
  },
  {
    phrase: "Here's a challenge: just select the period at the end.",
    target: "."
  },
  {
    phrase: "Now try just the middle of a word.",
    target: "iddl",
    hints: {
      "middle": "Just select the letters \"iddl\" - not the whole word!",
    }
  },
  {
    phrase: "You're a selecting superstar!",
    target: "superstar"
  },
  {
    phrase: "Can you grab me a pizza?",
    target: "pizza"
  },
  {
    phrase: "Yum! That was delicious!",
    target: "delicious!"
  },
  {
    phrase: "Now select these three words.",
    target: "these three words"
  },
  {
    phrase: "Now select everything EXCEPT the period.",
    target: "Now select everything EXCEPT the period"
  },
  {
    phrase: "Did you know there's another creature hidden in panther?",
    target: "ant",
    hints: {
      "panther": "Try again - just select the letters \"ant\"!",
    }
  },
  {
    phrase: "You make this look so easy!",
    target: "so easy"
  },
  {
    phrase: "Can you find this one?",
    target: "y",
    hints: {
      "you": "Try again - just select the \"y\" in \"you\"",
    }
  },
  {
    phrase: "I'll bet you can't guess what's next...",
    target: "can't guess"
  }
]

const defaults = {
  timeLimit: 60,
  showPlayAgain: false,
}

const gameState = ref(GAME_STATES.LOADING);
const timeLimit = ref(defaults.timeLimit);
const showPlayAgain = ref(defaults.showPlayAgain);
const timeRemaining = ref(defaults.timeLimit);
const minutes = computed(() => getMinutes(timeRemaining.value));
const seconds = computed(() => getSeconds(timeRemaining.value));

const currentPhraseIndex = ref(0);
const hint = ref("");
const currentSelection = ref("");
const transitioning = ref(false);
const collectedPhrases = ref(0);
const isSelecting = ref(false);

const nextPhrase = () => {
  currentPhraseIndex.value++;
  if (currentPhraseIndex.value === phrases.length) {
    currentPhraseIndex.value = 0;
  }
}

const currentTarget = computed(() => {
  return phrases[currentPhraseIndex.value].target;
})

const currentMarkup = computed(() => {
  const phrase = phrases[currentPhraseIndex.value];
  return phrase.phrase.replace(phrase.target, `<span id='target'>${phrase.target}</span>`);
})

const selectionCorrect = computed(() => {
  return currentSelection.value === currentTarget.value;
})

function resetGame() {
  currentPhraseIndex.value = 0;
  collectedPhrases.value = 0;
  timeRemaining.value = timeLimit.value;
  hint.value = '';
  transitioning.value = false;
}

function startGame() {
  gameState.value = GAME_STATES.PLAYING;
  updateTimer();
}

function playAgain() {
  resetGame();
  gameState.value = GAME_STATES.READY;
}

function checkGameOver() {
  if (timeRemaining.value === 0 && !isSelecting.value && !transitioning.value) {
    gameState.value = GAME_STATES.GAME_OVER;
  }
}

function updateTimer() {
  if (gameState.value === GAME_STATES.PLAYING) {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
      setTimeout(updateTimer, 1000);
    } else {
      checkGameOver();
    }
  }
}

function updateGameSettingsFromHash() {
  const params = hashToParams();
  timeLimit.value = getParam(params, 'timeLimit', PARAM_TYPES.INTEGER, defaults.timeLimit);
  showPlayAgain.value = getParam(params, 'showPlayAgain', PARAM_TYPES.BOOLEAN, defaults.showPlayAgain);
  resetGame();
  gameState.value = GAME_STATES.READY;
}

function charLabel(c: string): string {
  if (/[a-zA-Z]/.test(c)) { return 'letter'; }
  if (/[0-9]/.test(c)) { return 'number'; }
  if (c === ' ') { return 'space'; }
  return `"${c}"`;
}

function getHint(selection: string, target: string, phraseHints?: Record<string, string>): string {
  if (phraseHints?.[selection]) {
    return phraseHints[selection];
  }

  if (selection.trim() === target) {
    const leading = selection[0] === ' ';
    const trailing = selection[selection.length - 1] === ' ';
    if (leading && trailing) {
      return 'You selected the spaces at the beginning and end. Try again without them!';
    }
    if (leading) {
      return 'You selected a space at the beginning. Try again without it!';
    }
    return 'You selected a space at the end. Try again without it!';
  }

  if (Math.abs(selection.length - target.length) === 1) {
    const isPunct = (c: string) => /[^\w\s]/.test(c);
    const extra = selection.length > target.length;
    const longer = extra ? selection : target;
    const shorter = extra ? target : selection;
    let diffChar = '';
    let diffPos: 'start' | 'end' | '' = '';
    if (longer.slice(1) === shorter) { diffChar = longer[0]; diffPos = 'start'; }
    else if (longer.slice(0, -1) === shorter) { diffChar = longer[longer.length - 1]; diffPos = 'end'; }

    if (diffChar) {
      if (isPunct(diffChar)) {
        return extra
          ? `Try again! Don't include the "${diffChar}"`
          : `So close! Make sure you include the "${diffChar}"`;
      }
      const label = charLabel(diffChar);
      if (extra) {
        return diffPos === 'start' ? `Almost! You have an extra ${label} at the beginning.` : `Almost! You have an extra ${label} at the end.`;
      }
      return diffPos === 'start' ? `Almost! You're missing a ${label} at the beginning.` : `Almost! You're missing a ${label} at the end.`;
    }
  }

  if (selection.length > target.length) {
    const extra = selection.length - target.length;
    if (selection.startsWith(target) && extra <= 2) {
      return 'So close! You went a little past the bold part.';
    }
    if (selection.endsWith(target) && extra <= 2) {
      return 'So close! You started a little before the bold part.';
    }
    if (selection.includes(target) && extra <= 2) {
      return 'You selected too much! Click anywhere in the background to clear your selection and try again.';
    }
  }
  if (selection.length < target.length) {
    if (target.startsWith(selection)) {
      return "You didn't get all the way to the end. Try one more time!";
    }
    if (target.endsWith(selection)) {
      return "You missed the beginning. Try again!";
    }
    if (target.includes(selection)) {
      return "Make sure you select everything that's bold!";
    }
  }
  return "Not quite! Click anywhere in the background to clear your selection and try again.";
}

function checkSelection(event: Event) {
  if (gameState.value !== GAME_STATES.PLAYING) { return; }

  if (event.type === 'mousedown') {
    isSelecting.value = true;
  } else if (event.type === 'mouseup') {
    isSelecting.value = false;
  }

  const selection = window.getSelection();
  currentSelection.value = (selection?.toString() ?? "").replace(/[\n\r]/g, '');

  if (currentSelection.value && !selectionCorrect.value) {
    hint.value = getHint(currentSelection.value, currentTarget.value, phrases[currentPhraseIndex.value].hints);
  } else {
    hint.value = "";
  }

  if (selectionCorrect.value && !transitioning.value) {
    transitioning.value = true;
    window.getSelection()?.removeAllRanges();
    const target = document.getElementById('target');
    if (target) {

      const rect = target.getBoundingClientRect();

      target.classList.add('correct');

      const clone = document.createElement('div');
      clone.classList.add('clone');
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;

      const inner = document.createElement('span');
      inner.textContent = target.textContent;
      inner.classList.add('clone-inner');
      clone.appendChild(inner);

      document.body.appendChild(clone);

      const tx = window.innerWidth - rect.left - rect.width;
      const ty = 0 - rect.top - rect.height;

      const anim = clone.animate([
        {
          transform: 'translate(0, 0) rotate(0deg) scale(1)',
          opacity: 1,
        },
        {
          offset: 0.1,
          transform: 'translate(0, 0) rotate(-5deg) scale(1.07)',
          opacity: 1,
        },
        {
          offset: 0.45,
          transform: `translate(${tx * 0.52}px, ${ty * 0.52}px) rotate(42deg) scale(0.62)`,
          opacity: 1,
        },
        {
          offset: 0.8,
          transform: `translate(${tx * 0.88}px, ${ty * 0.88}px) rotate(76deg) scale(0.22)`,
          opacity: 0.7,
        },
        {
          transform: `translate(${tx}px, ${ty}px) rotate(90deg) scale(0)`,
          opacity: 0,
        },
      ], {
        duration: 620,
        easing: 'cubic-bezier(0.4, 0, 0.9, 0.6)',
        fill: 'forwards',
      });

      anim.onfinish = () => {
        clone.remove();
        transitioning.value = false;
        collectedPhrases.value++;
        nextPhrase();
        checkGameOver();
      };
    }
  }

  if (event.type === 'mouseup') {
    checkGameOver();
  }
}

const events = ['mouseup', 'mousedown', 'keyup'];

onMounted(() => {
  window.addEventListener('hashchange', updateGameSettingsFromHash);
  updateGameSettingsFromHash();
  events.forEach(e => window.addEventListener(e, checkSelection));
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateGameSettingsFromHash);
  events.forEach(e => window.removeEventListener(e, checkSelection));
})

</script>

<template>
  <div class="text-gray-900 bg-purple-100 h-screen w-screen">
    <div v-if="gameState !== GAME_STATES.GAME_OVER">
      <div class="absolute left-2 top-2 text-5xl select-none">{{ minutes }}:{{ seconds }}</div>
    </div>
    <div id="phraseCount" class="select-none absolute right-2 top-2 text-5xl">Score: {{ collectedPhrases }}</div>

    <StartScreen v-if="gameState === GAME_STATES.READY" title="Select" @start="startGame">
      Click and drag over the <span class="target">bold</span> words to select them. Select as many as you can before the timer runs out!
    </StartScreen>

    <div v-if="gameState === GAME_STATES.PLAYING" class="text-center justify-center h-screen items-center flex flex-col w-full max-w-4xl mx-auto">
      <div class="relative">
        <div id="phrase" class="text-6xl selection:bg-purple-500 selection:text-white" v-html="currentMarkup"></div>
        <div v-if="hint" class="absolute select-none text-3xl w-full text-center mt-10 top-full">{{ hint }}</div>
      </div>
    </div>

    <EndScreen v-if="gameState === GAME_STATES.GAME_OVER" title="Time's up!" :button="showPlayAgain" @play-again="playAgain">
      You selected {{ collectedPhrases }} phrase{{ collectedPhrases === 1 ? '' : 's' }}!
    </EndScreen>
  </div>
</template>

<style>

#target, .target {
  @apply font-bold underline underline-offset-8 decoration-gray-600 decoration-dotted decoration-2
}

#target.correct {
  visibility: hidden;
}

.clone {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  @apply text-6xl text-center;
}

.clone-inner {
  @apply bg-purple-500;
  color: white;
  font-weight: bold;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
</style>
