<script lang="ts">
export type Props = {
    photos: { src: string; alt?: string }[]
}
</script>
<script setup lang="ts">
defineProps<Props>()
const emit = defineEmits<{
    (e: 'hovered', image: { src: string; alt?: string }): void
}>()
</script>

<template>
    <div class="carousel__container">
        <div
            class="image__container"
            v-for="{ src, alt } in photos"
            :key="src"
            @mouseover="emit('hovered', { src, alt })"
        >
            <img :src="src" :alt="alt" loading="lazy" decoding="async" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';
.carousel__container {
    display: grid;
    align-items: center;
    grid-template-columns: repeat(2, calc(82px + 0.2rem));
    grid-auto-flow: column;
    gap: 1rem;
    border-radius: calc($radius + 4px);
    width: max-content;
    padding: 0.5rem;
    border: 1px solid $zd-secondary-color;
    overflow: auto;
}
img {
    width: 82px;
    height: auto;
    aspect-ratio: 1;
    border-radius: $radius;
}
.image__container {
    padding: 0.2rem;
    background-image: $zd-gradient-color;
    border-radius: $radius;
    width: max-content;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    transition: all 200ms ease;
    outline: 0px solid $zd-secondary-color;

    &::after {
        content: '';
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        opacity: 0;
        width: 100%;
        aspect-ratio: 1;
        inset-block-start: 0;
        inset-inline-start: 0;
        display: grid;
        place-content: center;
        z-index: 1;
        transform: scale(0) rotate(0deg);
        border-radius: calc($radius * 3);
    }
    &:hover::after {
        opacity: 1;
        transform: scale(0.8) rotate(45deg);
        backdrop-filter: blur(5px);
        outline: 1px solid $zd-secondary-color;
    }
    &:hover,
    &:hover::after {
        outline: 2px solid $zd-secondary-color;
        outline-offset: 0.2rem;
    }
}
</style>
