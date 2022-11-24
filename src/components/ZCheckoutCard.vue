<script setup lang="ts">
import ZAccordion from './ZAccordion.vue'
import { toSaudiRiyal } from '../utils/formatters'
import { defineAsyncComponent, ref } from 'vue'
import type { Product } from '@/types/Product'
import { ProductsAPI } from '@/services/products'
import ZLoadingPlaceholder from '../components/ZLoadingPlaceholder.vue'
import ZImageCarousel from '../components/ZImageCarousel.vue'
import { generateNumberInRange } from '../utils/generateNumberInRange'

const ProductImage = defineAsyncComponent({
    loader: () => import('../components/ProductImage.vue'),
    loadingComponent: ZLoadingPlaceholder /* shows while loading */,
})

const expanded = ref(false)
const productImages = ref<Product['images']>([])

const expansion = (isExpanded: boolean): void => {
    console.log('isExpanded', isExpanded)
}
const imageToShow = ref<{
    src: string
    alt?: string | undefined
}>()

const product = ref<Product>({} as Product)
ProductsAPI.getProduct(generateNumberInRange(1,2)).then((data) => {
    product.value = data
    productImages.value = data.images?.map((i) => ({
        src: new URL(i.src, import.meta.url).href,
    }))
    imageToShow.value = productImages.value?.[0]
})

const changeImageToShow = (image: { src: string; alt?: string }): void => {
    imageToShow.value = image
}
</script>

<template>
    <div class="checkout__card">
        <div class="product__details_wrapper">
            <ProductImage
                :src="imageToShow?.src ?? '../assets/profile_picture.png'"
            />
            <div class="product__details">
                <p>
                    <span>{{ product?.description }}</span>
                </p>
                <span class="price-tag">
                    {{ toSaudiRiyal(256) }}
                </span>
            </div>
        </div>
        <ZImageCarousel
            v-if="productImages"
            :photos="productImages"
            style="margin-block: 1rem"
            @hovered="changeImageToShow"
            @mouseleave="imageToShow = productImages?.[0]"
        />
        <div class="product__options">
            <ZAccordion :expanded="expanded" @expand="expansion">
                <template #summary>
                    <span>Description</span>
                </template>
                <template #details>
                    <div>{{ product?.description }}</div>
                </template>
            </ZAccordion>
        </div>
    </div>
</template>
<style scoped lang="scss">
@import '../assets/base.scss';
$borderWidth: 1rem;
$borderStyle: calc($borderWidth / 2) solid $zd-secondary-color-light;
$cornersRadius: $radius * 2 $radius * 2;
.checkout__card {
    @extend .flex-column;
    width: 100%;
    border-radius: $radius * 2;
    padding: 1rem;
    box-shadow: $zd-soft-shadow;
}

.product__details {
    @extend .flex-column;
    padding: 1em;
    border-radius: $radius;
    background-color: $zd-secondary-color-light;
    color: $zd-secondary-color;
    font-weight: 600;
    font-size: 1.25rem;
}
.product__details span {
    font-weight: initial;
    font-size: initial;
}
.product__details .price-tag {
    font-weight: 600;
    background-color: $zd-secondary-color;
    padding: 0.4rem;
    width: max-content;
    margin-block: 1rem;
    border: 4px solid #fff;
    outline: 4px solid $zd-secondary-color;

    border-radius: $radius;
    color: #fff;
}
.product__options {
    @extend .card;
    border: 1px solid $zd-secondary-color;
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 200px;
}
.product__details_wrapper {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
}
</style>
