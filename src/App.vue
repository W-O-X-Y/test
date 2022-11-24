<script setup lang="ts">
import AppLayout from './layouts/AppLayout.vue'
</script>

<template>
    <AppLayout>
        <RouterView v-slot="{ Component }">
            <Transition name="slide-fade" mode="out-in">
                <Component :is="Component" />
            </Transition>
        </RouterView>
    </AppLayout>
</template>
