<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import braintree from 'braintree-web'
import visaCardImage from '../assets/VisaCard.jpg'
import masterCardImage from '../assets/masterCard.png'
import type { HostedFieldsHostedFieldsFieldName } from 'braintree-web/modules/hosted-fields'

const braintreeClientInstance = ref<braintree.Client | null>(null)
braintree.client
    .create({
        authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
    })
    .then((clientInstance) => {
        braintreeClientInstance.value = clientInstance
    })
    .catch(console.error)

watch(
    braintreeClientInstance,
    (newestInstance, previousInstance) => {
        if (!previousInstance && newestInstance)
            braintree.hostedFields
                .create({
                    client: newestInstance,
                    styles: {
                        input: {
                            color: 'rgb(0, 207, 145)',
                            'font-size': '16px',
                            transition: 'color 0.1s ease-in-out',
                            'line-height': '3',
                            'font-weight': '500',
                        },
                        'input.invalid': {
                            color: 'rgb(255, 0, 76)',
                        },
                        // placeholder styles need to be individually adjusted
                        '::-webkit-input-placeholder': {
                            color: 'rgba(0,0,0,0.3)',
                        },
                        ':-moz-placeholder': {
                            color: 'rgba(0,0,0,0.3)',
                        },
                        '::-moz-placeholder': {
                            color: 'rgba(0,0,0,0.3)',
                        },
                        ':-ms-input-placeholder': {
                            color: 'rgba(0,0,0,0.3)',
                        },

                        'input::-ms-clear': {
                            opacity: '0',
                        },
                    },
                    // Add information for individual fields
                    fields: {
                        cardholderName: {
                            selector: '#cc-name',
                            prefill: 'Ibrahim Muhammad Abdallah',
                            placeholder: 'Name as it appears in your card',
                        },
                        number: {
                            selector: '#card-number',
                            placeholder: '4242 1111 1111 1111',
                            prefill: '424242424242424242',
                        },
                        cvv: {
                            selector: '#cvv',
                            placeholder: '123',
                            prefill: '058',
                        },
                        expirationDate: {
                            selector: '#expiration-date',
                            placeholder: '10 / 2022',
                            prefill: '10 / 2027',
                        },
                    },
                })
                .then((hostedFieldsInstance) => {
                    hostedFieldsInstance?.on(
                        'validityChange',
                        function (event) {
                            // Check if all fields are valid, then show submit button
                            const formValid = Object.keys(event.fields).every(
                                (key) => {
                                    return event.fields[
                                        key as HostedFieldsHostedFieldsFieldName
                                    ].isValid
                                }
                            )

                            if (formValid) {
                                paymentButton.value?.classList.add(
                                    'show-button'
                                )
                            } else {
                                paymentButton.value?.classList.add(
                                    'show-button'
                                )
                            }
                        }
                    )

                    hostedFieldsInstance?.on('empty', () => {
                        cardImage.value.classList.remove()
                    })

                    hostedFieldsInstance?.on(
                        'cardTypeChange',
                        function (event) {
                            // Change card bg depending on card type
                            if (event.cards.length === 1) {
                                cardImage.value.classList.toggle(
                                    event.cards[0].type
                                )
                                if (event.cards[0].type === 'visa') {
                                    visa.value.classList.add('transform3D')
                                }
                                if (event.cards[0].type === 'master-card') {
                                    mastercard.value.classList.add(
                                        'transform3D'
                                    )
                                }

                                // Change the CVV length for AmericanExpress cards
                                if (event.cards[0].code.size === 4) {
                                    hostedFieldsInstance
                                        .getState()
                                        .fields.cvv.container.setAttribute(
                                            'placeholder',
                                            '123'
                                        )
                                }
                            } else {
                                mastercard.value.classList.remove('transform3D')
                                visa.value.classList.remove('transform3D')

                                hostedFieldsInstance
                                    .getState()
                                    .fields.cvv.container.setAttribute(
                                        'placeholder',
                                        '123'
                                    )
                            }
                        }
                    )

                    paymentButton.value?.addEventListener(
                        'click',
                        function (event) {
                            event.preventDefault()

                            hostedFieldsInstance.tokenize(function (err) {
                                if (err) {
                                    console.error(err)
                                    return
                                }

                                // This is where you would submit payload.nonce to your server
                                alert('Submit your nonce to your server here!')
                            })
                        },
                        false
                    )
                })
                .catch(console.error)
    },
    { flush: 'post' }
)
onBeforeUnmount(() =>
    braintreeClientInstance.value?.teardown((err) => console.log('error:', err))
)

const form = ref()
const paymentButton = ref<HTMLButtonElement | undefined>()
const cardImage = ref()
const visa = ref()
const mastercard = ref()

const CARD_LIST = ref({
    visa: {
        src: visaCardImage,
    },
    mastercard: {
        src: masterCardImage,
    },
})
</script>

<template>
    <div class="form-container">
        <form ref="form">
            <h2>Payment Method</h2>

            <div class="cardinfo-card-number">
                <label class="input-label" for="#cc-name"
                    >Card Holder Name</label
                >
                <div class="input-wrapper" id="cc-name"></div>
            </div>
            <div class="cardinfo-card-number">
                <label class="input-label" for="card-number">Card Number</label>
                <div class="input-wrapper" id="card-number"></div>
                <div class="card-image" ref="cardImage">
                    <div
                        style="
                            position: absolute;
                            inset-inline-end: 0;
                            width: 100%;
                        "
                    >
                        <img
                            ref="visa"
                            :src="CARD_LIST.visa.src"
                            style="width: 60px; height: auto"
                        />
                        <img
                            ref="mastercard"
                            :src="CARD_LIST.mastercard.src"
                            style="width: 60px; height: auto"
                        />
                    </div>
                </div>
            </div>

            <div class="cardinfo-wrapper">
                <div class="cardinfo-exp-date">
                    <label class="input-label" for="expiration-date"
                        >Valid Thru</label
                    >
                    <div class="input-wrapper" id="expiration-date"></div>
                </div>

                <div class="cardinfo-cvv">
                    <label class="input-label" for="cvv">CVV</label>
                    <div class="input-wrapper" id="cvv"></div>
                </div>
            </div>
            <button
                type="submit"
                id="button-pay"
                ref="paymentButton"
                class="payment-button"
            >
                pay
            </button>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';

$small-screen: 476px;
$grey: #111;
$blue: #5db6e8;
$darkBlue: #282c37;
$red: #e53a40;
$green: #8cd790;
$white: #fff;
$bouncy: cubic-bezier(0.2, 1.3, 0.7, 1);
img {
    transform: rotateY(30deg);
    transform: rotate3d(2, -1, -1, -0.2turn);
    border-radius: calc($radius / 2);
    transition: all 300ms ease-in-out;
    z-index: 2;
    position: absolute;
    inset-inline-end: 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

.form-container {
    display: flex;
    background-color: #b8c0d034;
    justify-content: center;
    align-items: center;
    max-height: 100%;
    max-width: 100%;
    margin-block: 1rem;
    margin-inline: 0 1rem;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    border-radius: 0 $radius $radius 0;

    @media (max-width: $small-screen) {
        border: none;
    }
}

#cvv {
    width: 124px;
}

.cardinfo-wrapper {
    display: flex;
    justify-content: space-around;
}

.card-shape {
    width: 90%;
    height: 75%;
    border-radius: 12px;
    @media (max-width: $small-screen) {
        padding: 2em 1.5em 1em;
    }
}

form {
    border-radius: $radius * 2;
    background-color: $white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    padding: 2em;
    width: 90%;
    height: 500px;
    margin-bottom: 2em;
    transition: all 300ms $bouncy;
    animation: cardIntro 500ms $bouncy;
    z-index: 1;
    position: relative;
    isolation: isolate;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.06);
    }

    @media (max-width: $small-screen) {
        box-sizing: border-box;
        padding: 7em 2em 2em;
        width: 100%;
    }
    & h2 {
        color: $zd-secondary-color;
        font-weight: 600;
        margin-block-end: 2rem;
    }
}

.cardinfo-exp-date {
    margin-right: 1em;
    width: 100%;
}

.cardinfo-cvv {
    width: 100%;
}
.transform3D {
    transform: rotate3d(0, 0, 0, 0.2turn) translateX(-50%) !important;
    box-shadow: 0 2px 8px 2px rgb(0, 0, 0, 0.2) !important;
    outline: 2px solid $zd-secondary-color;
    transition: all 500ms ease-in-out;
    z-index: 99999;
    transform-style: preserve-3d;
    backface-visibility: hidden;
}

.payment-button {
    position: absolute;
    inset-block-end: 0;
    inset-inline-start: 50%;
    transform: translateX(-50%) translateY(-80%);
    cursor: pointer;
    font-weight: 600;
    font-size: 1.5em;
    width: 12em;
    border: 0;
    margin-block-start: 2rem;
    padding: 1em 0.8em;
    color: #fff;
    background-color: $zd-secondary-color;
    border-radius: calc($radius * 1.5);
    z-index: 0;
    transition: all 500ms $bouncy;
    opacity: 0;
    text-transform: uppercase;
    &:hover {
        background: darken($zd-secondary-color, 5%);
    }

    &.show-button {
        transform: translateY(50%) translateX(-50%);
        opacity: 1;
    }
}

// Card type image styles
.cardinfo-card-number {
    position: relative;
}

.card-image {
    position: absolute;
    inset-inline-end: 1em;
    inset-block-start: 50%;
    transform: translateY(-50%);
    background-size: 86px 458px;
    border-radius: $radius;
    background-position: -100px 0;
    background-repeat: no-repeat;
    &.visa {
        background-position: 0 -398px;
    }
    &.master-card {
        background-position: 0 -281px;
    }
    &.american-express {
        background-position: 0 -370px;
    }
    &.discover {
        background-position: 0 -163px;
    }
    &.maestro {
        background-position: 0 -251px;
    }
    &.jcb {
        background-position: 0 -221px;
    }
    &.diners-club {
        background-position: 0 -133px;
    }
}

/*--------------------
Inputs
--------------------*/

// Styling for input wrappers, internal font styles are handled in javascript

.cardinfo-card-number,
.cardinfo-exp-date,
.cardinfo-cvv {
    transition: transform 0.3s;
}

.braintree-hosted-fields-focused {
    outline: 2px solid $blue;
}

// Styles the wrapper of the invalid input
.braintree-hosted-fields-invalid {
    border-color: $red;
    animation: shake 500ms $bouncy both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
}

/*--------------------
Animations
--------------------*/

@keyframes cardIntro {
    0% {
        transform: scale(0.8) translate(0, 0);
        opacity: 0;
    }
    100% {
        transform: scale(1) translate(0, 0);
        opacity: 1;
    }
}
</style>
