<script setup>
const games = ref([
    {
        title: "Coin Collector",
        subtitle: "Clicking practice",
        description: "Click as many coins as you can before the time runs out.",
        page: "/click",
        customize: "https://customize.techlit.tools/#url=https://mouse.techlit.app/customize/click.json",
        documentation: "https://docs.techlit.tools/mouse-games/click/",
        thumbnail: "/images/coin.png",
        thumbnailAlt: "Illustration of a gold coin on a blue background"
    },{
        title: "Apple Picker",
        subtitle: "Dragging practice",
        description: "Drag as many apples to the basket as you can before the time runs out.",
        page: "/drag",
        customize: "https://customize.techlit.tools/#url=https://mouse.techlit.app/customize/drag.json",
        documentation: "https://docs.techlit.tools/mouse-games/drag/",
        thumbnail: "/images/apple.png",
        thumbnailAlt: "Illustration of a red apple on a green background"
    },
])
</script>
<template>
    <div class="prose text-center mx-auto p-4">
        <h1>Mouse practice games</h1>
        <p>A collection of games to practice mouse/trackpad skills.</p>
        <p><a href="https://techlit.tools/about">About</a> | <a href="https://docs.techlit.tools/mouse-games/privacy/">Privacy</a></p>
    </div>
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 max-w-prose m-auto">
            <div v-for="game of games" class="p-4">
                <div class="w-40 h-40 mx-auto">
                    <img :src="game.thumbnail" class="object-contain" :alt="game.thumbnailAlt">
                </div>

                <h2 class="mb-2 text-2xl mt-6 text-center">{{game.title}}</h2>
                <p class="text-center italic mb-0">{{game.subtitle}}</p>
                <p class="mt-2 text-center">{{game.description}}</p>
                <div class="text-center">
                    <router-link :to="game.page" class="action">Play</router-link>
                    <a class="action" :href="game.documentation">Documentation</a>
                    <a class="action" :href="game.customize">Customize settings</a>
                </div>

            </div>
        </div>
</template>
<style scoped>
.action {
    @apply hover:underline text-blue-500 rounded border-0 md:inline-block block md:mr-4 mt-2;
}
</style>