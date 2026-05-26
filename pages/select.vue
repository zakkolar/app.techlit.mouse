<script setup lang="ts">

import {onMounted} from "vue";

const phrases = [
  {
    phrase: "Drag over the bold words to select them.",
    target: "bold"
  },
  {
    phrase: "Try it one more time.",
    target: "one"
  },
  {
    phrase: "Can you do two words at once?",
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
    target: "iddl"
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
    phrase: "Now select everything except the period.",
    target: "Now select everything except the period"
  },
  {
    phrase: "Did you know there's another creature hidden in panther?",
    target: "ant"
  },
  {
    phrase: "You make this look so easy!",
    target: "so easy"
  },
  {
    phrase: "Can you find this one?",
    target: "y"
  },
  {
    phrase: "I'll bet you can't guess what's next...",
    target: "can't guess"
  }
]

const nextPhrase = () => {
  currentPhraseIndex.value++;
  if (currentPhraseIndex.value === phrases.length) {
    currentPhraseIndex.value = 0;
  }
}

const currentPhraseIndex = ref(0);

const currentPhrase = computed(() => {
  return phrases[currentPhraseIndex.value].phrase;
})

const currentTarget = computed(() => {
  return phrases[currentPhraseIndex.value].target;
})

const currentMarkup = computed(() => {
  return currentPhrase.value
      .replace(currentTarget.value, `<span id='target'>${currentTarget.value}</span>`)
})

const selectionCorrect = computed(() => {
  return currentSelection.value === currentTarget.value;
})

const currentSelection = ref("");

const transitioning = ref(false);

const collectedPhrases = ref(0);

function checkSelection() {
  const selection = window.getSelection();
  currentSelection.value = selection?.toString() ?? "";

  if (selectionCorrect.value && !transitioning.value) {
    transitioning.value = true;
    const target = document.getElementById('target');
    const clone = target?.cloneNode(true) as HTMLElement;
    const phraseEl = document.getElementById('phrase');
    if (clone && phraseEl && target) {

      const rect = target.getBoundingClientRect();

      target.classList.add('correct');

      clone.classList.add('clone');
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;

      document.body.appendChild(clone);

      // Vector to top-right corner
      const tx = window.innerWidth - rect.left - rect.width;
      const ty = 0 - rect.top - rect.height;

      const anim = clone.animate([
        {
          transform: 'translate(0, 0) rotate(0deg) scale(1)',
          opacity: 1,
        },
        {
          // Brief "grabbed" recoil before flying off
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
      };
    }
  }
}

const events = ['mouseup', 'mousedown', 'keyup'];

onMounted(() => {

  events.forEach(e => {
    window.addEventListener(e, checkSelection);
  })
})

onBeforeUnmount(() => {
  events.forEach(e => {
    window.removeEventListener(e, checkSelection);
  })
})

</script>

<template>
  <div class="text-gray-900">
    <!--  <div v-if="gameState !== GAME_STATES.GAME_OVER">-->
    <!--    <div class="absolute left-2 top-2 text-5xl">{{ minutes }}:{{ seconds }}</div>-->
    <div id="phraseCount" class="select-none absolute right-2 top-2 text-5xl">Score: {{ collectedPhrases }}</div>
    <!--  </div>-->
    <div class="text-center justify-center h-screen items-center flex w-full max-w-4xl text-6xl mx-auto">

      <div id="phrase" class="selection:bg-blue-500 selection:text-white" v-html="currentMarkup"></div>

    </div>
  </div>
</template>

<style>

#target {
  @apply font-bold underline underline-offset-8 decoration-gray-600 decoration-dotted decoration-2
}

#target.correct {
  visibility: hidden;
}

.clone {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  white-space: nowrap;
  @apply bg-blue-500 text-white text-6xl;
}
</style>