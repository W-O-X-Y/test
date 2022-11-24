<script lang="ts" setup>
import ZNavbar from '@/components/ZNavbar.vue'
import router from '@/router'

import IconPayment from '@/components/icons/IconPayment.vue'
import { computed } from 'vue'

const navigationalPages = computed(() =>
    router.getRoutes().filter(({ meta }) => meta.navigational)
)
</script>

<template>
    <div class="view__container">
        <ZNavbar :navigationalPages="navigationalPages" />
        <main>
            <slot></slot>
        </main>
    </div>
</template>

<style scoped>
.view__container {
    display: flex;
    width: 100%;
    height: 100%;
}
main {
    display: flex;
    flex-basis: 100%;
    padding-inline: 1rem;
}
</style>
