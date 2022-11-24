<script lang="ts" setup>
const props = defineProps<{ src: string }>()
</script>

<template>
    <div class="product__image__wrapper">
        <img
            alt="product"
            :src="props.src"
            class="product__image"
            loading="lazy"
            decoding="async"
        />
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';

$borderWidth: 1rem;
$borderStyle: calc($borderWidth / 2) solid $zd-secondary-color-light;
$cornersRadius: $radius * 2 $radius * 2;

.product__image {
    border-radius: $radius;
    width: 100%;
    aspect-ratio: 1;
    filter: drop-shadow(6px 6px 6px $dropShadowColor);
    transition: all 600ms ease-in-out;
}

.product__image__wrapper {
    position: relative;
    isolation: isolate;
    border: 1px solid lighten($zd-secondary-color, 30%);
    border-radius: $radius * 2;
    background-image: $zd-gradient-color;
    height: 320px;
    display: grid;
    place-content: center;

    &::before,
    &::after {
        content: '';
        width: 20%;
        aspect-ratio: 1;
        position: absolute;
        padding: 2rem;
        border-radius: $radius;
        background-image: $zd-gradient-color;
        backdrop-filter: blur(5px);
        filter: drop-shadow(3px 3px 6px $dropShadowColor);
        z-index: 1;
    }

    &::before {
        inset-block-start: calc(0rem - $borderWidth / 2);
        inset-inline-start: calc(0rem - $borderWidth / 2);
    }

    &::after {
        inset-inline-end: calc(0rem - $borderWidth / 2);
        inset-block-end: calc(0rem - $borderWidth / 2);
    }

    &:hover img {
        transform: scale(1.1);
        filter: drop-shadow(12px 8px 8px lighten($dropShadowColor, 10%));
    }
}
</style>
