<script setup>
const games = ref([
    {
        title: "Coin Collector",
        subtitle: "Clicking practice",
        description: "Click as many coins as you can before the time runs out.",
        page: "/click",
        customize: "https://customize.techlit.tools/#url=https://mouse.techlit.app/customize/click.json",
        thumbnail: "/images/coin.png",
        thumbnailAlt: "Illustration of a gold coin on a blue background"
    },{
        title: "Apple Picker",
        subtitle: "Dragging practice",
        description: "Drag as many apples to the basket as you can before the time runs out.",
        page: "/drag",
        customize: "https://customize.techlit.tools/#url=https://mouse.techlit.app/customize/drag.json",
        thumbnail: "/images/apple.png",
        thumbnailAlt: "Illustration of a red apple on a green background"
    },
])
</script>
<template>
    <div class="prose mx-auto p-4">
        <h1>Mouse practice games</h1>
        <p>A collection of games to practice mouse/trackpad skills.</p>
        <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div v-for="game of games" >
                <div class="w-40 h-40 mx-auto">
                    <img :src="game.thumbnail" class="object-contain" :alt="game.thumbnailAlt">
                </div>

                <h2 class="mb-2 mt-6 text-center">{{game.title}}</h2>
                <p class="text-center italic mb-0">{{game.subtitle}}</p>
                <p class="mt-2">{{game.description}}</p>
                <div class="text-center">
                    <router-link :to="game.page" class="p-3 no-underline bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded border-0 dib mr-2">Play</router-link>
                    <a class="p-3 no-underline bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded border-0 dib mr-2" :href="game.customize">Customize settings</a>
                </div>

            </div>
        </div>

    </div>
</template>