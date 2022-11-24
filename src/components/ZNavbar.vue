<script setup lang="ts">
import IconSettings from './icons/IconSettings.vue'
import IconButton from './ZIconButton.vue'

import type { RouteRecord } from 'vue-router'
import IconChevronRight from './icons/IconChevronRight.vue'
const props = defineProps<{ navigationalPages: RouteRecord[] }>()
</script>

<template>
    <aside>
        <nav>
            <div v-for="{ path, name } in props.navigationalPages" :key="path">
                <IconChevronRight class="secondary-color" />
                <RouterLink :to="path"> {{ name }}</RouterLink>
            </div>
        </nav>
        <div class="drawer__options">
            <IconSettings />
        </div>
        <IconButton iconName="IconSettings" />
    </aside>
</template>
<style scoped lang="scss">
@import '../assets/base.scss';
$hoverBg: linear-gradient(
    to left,
    $zd-secondary-color-light,
    lighten($zd-secondary-color, 45%)
);

.secondary-color {
    color: $zd-secondary-color;
    font-size: 1.3rem;
}
nav a {
    padding: 0.25rem 0.5rem;
    border-radius: 8px;
    width: 100%;
    color: $zd-secondary-color;
    font-weight: 600;
    text-decoration: none;
    transition: all 300ms ease;
}
nav a.router-link-exact-active {
    color: $zd-secondary-color;
}
nav a.router-link {
    transition: all 1s ease;
}
aside {
    display: flex;
    flex-direction: column;
    z-index: 9999;
    height: 100vh;
    flex-basis: 3rem;
    flex-shrink: 0;
    overflow: hidden;
    padding: 1rem 0.5rem;
    border-radius: 8px;
    box-shadow: $zd-soft-shadow;
    background-color: rgb(255, 255, 255);
    transition: $zd-default-transition;
    transition-delay: 200ms;
}
aside:hover {
    flex-basis: 220px;
}

nav {
    display: grid;
    padding: 0;
    gap: 0.5rem;
}
nav div {
    display: grid;
    width: 100%;
    align-items: center;
    padding: 0.5rem;
    border-radius: 12px;
    grid-template-columns: 24px 1fr;
    cursor: pointer;
    outline: 1px solid transparent;
    transition: $zd-default-transition;
    border-inline-start: 4px solid transparent;
}
nav div:has(a.router-link-exact-active) {
    background-image: $hoverBg;
    border-inline-start: 4px solid $zd-secondary-color;
}
nav div:hover {
    outline: 4px solid lighten($zd-secondary-color, 45%);
}
.drawer__options {
    display: grid;
    grid-auto-flow: row;
    place-content: center;
    padding: 1rem;
    border-radius: 12px;
    margin-block-start: auto;
    background-color: $zd-secondary-color-light;
}
</style>
