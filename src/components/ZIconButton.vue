<template>
    <div class="icon-button">
        <slot></slot>
    </div>
</template>
<script lang="ts">
export default {
    name: 'IconButton',
}
</script>
<script setup lang="ts"></script>

<style scoped>
.icon-button {
    aspect-ratio: 1;
    width: max-content;
    border-radius: 100%;
    padding: 0.2rem;
    border: 0;
    width: 24px;
}
</style>
