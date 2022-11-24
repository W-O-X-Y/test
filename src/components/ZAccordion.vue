<script lang="ts">
import { computed, ref } from 'vue'
import IconChevronRight from './icons/IconChevronRight.vue'

export type AcccordionProps = {
    expanded: boolean
}

export default {
    name: 'ZAccordion',
    components: { IconChevronRight },
}
</script>
<script setup lang="ts">
const props = defineProps({
    expanded: {
        type: Boolean,
        required: true,
    },
})
const emit = defineEmits<{ (e: 'expand', isExpanded: boolean): void }>()
const isExpanded = ref(props.expanded)

const setExpanded = () => {
    isExpanded.value = !isExpanded.value
    emit('expand', isExpanded.value)
}
const iconRotationAngel = computed(() => (isExpanded.value ? '90deg' : '0deg'))
</script>
<template>
    <div class="summary" @click.stop="setExpanded">
        <slot name="summary">
            <span>{{ 'SummarySlot' }} </span></slot
        >

        <IconChevronRight class="translate-icon" />
    </div>
    <Transition name="slide-fade" mode="out-in">
        <div v-if="isExpanded" class="details">
            <slot name="details"
                ><span>{{ 'DetailsSlot' }}</span></slot
            >
        </div>
    </Transition>
</template>
<style scoped lang="scss">
@import '../assets/base.scss';

.details {
    @extend .card;
    transition: all 500ms ease;
    background-color: $zd-secondary-color-light;
    color: $zd-secondary-color;
}
.translate-icon {
    rotate: v-bind(iconRotationAngel);
    transition: rotate 300ms ease-in-out;
}
.summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $zd-secondary-color;
    font-weight: 600;
    font-size: 1.25rem;
    cursor: pointer;
}
</style>
