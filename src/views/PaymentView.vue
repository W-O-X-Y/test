<script setup lang="ts">
import CheckoutCard from '../components/ZCheckoutCard.vue'
import PaymentPanel from '@/components/ZPaymentPanel.vue'
</script>

<template>
    <main>
        <section>
            <CheckoutCard />
            <PaymentPanel />
        </section>
    </main>
</template>

<style lang="scss">
@import '../assets/base.scss';

main {
    display: grid;
    align-items: center;
}

main section {
    display: grid;
    justify-self: center;
    grid-template-columns: 50% 1fr;
    overflow: hidden;
    max-width: 85%;
    height: 700px;
    border-radius: $radius;
    background-color: #fff;
    border-radius: calc($radius * 2);
    box-shadow: $zd-soft-shadow;
}
</style>
