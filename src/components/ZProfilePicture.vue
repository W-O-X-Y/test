<template>
    <div class="shape">
        <div class="shape__inner">
            <img :src="props.src" />
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ userTag: string; src: string }>()
</script>

<style scoped lang="scss">
@import '../assets/base.scss';
$shadow-color: #b6e0e3;

.shape {
    overflow: hidden;
    position: relative;
    aspect-ratio: 2/2.5;
    width: 50%;
    border-radius: 20rem / 12rem;
    box-shadow: $doubleShadows;
    &::after {
        inset-block-end: 10%;
        inset-inline: 50%;
        transform: translate(-50%, -20%);
        position: absolute;
        content: v-bind(userTag);
        display: grid;
        place-content: center;
        color: #fff;
        backdrop-filter: blur(12px);
        padding: 0.2rem;
        font-size: max(1rem, 100%);
        z-index: 999;
        width: 90%;
        background-clip: text;
        -webkit-background-clip: text;
        border: 1px solid #fff;
        border-radius: calc($radius * 5);
    }
}
.shape__inner {
    aspect-ratio: 2/2.5;
    width: 100%;
    border-radius: 20rem / 12rem;
    overflow: hidden;
    position: relative;
    content: '';
}

img {
    object-fit: cover;
    object-position: center;
    width: 150%;
    aspect-ratio: 1;
    animation: 3s zoom infinite alternate;
    animation-timing-function: ease-in-out;
    animation-play-state: paused;
    will-change: transform;
}
.shape:has(*:hover) img {
    animation-play-state: running;
}

@keyframes zoom {
    from {
        transform: translateY(0) scale(1);
    }
    to {
        transform: translateY(20%) scale(1.5);
    }
}
</style>
