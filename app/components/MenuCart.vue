<template>
    <nuxt-link class="menu-cart" to="/carrinho" alt="Carrinho" title="Carrinho">
        <span v-if="amount > '0'" class="badge badge-secondary badge-pill cardp">{{ amount }}</span>
        <button class="car btn">
            <svg id="cardtImg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" :fill="color">
                <path :d="iconPath" />
            </svg>
        </button>
    </nuxt-link>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
    name: "MenuCart",
    data() {
        return {
            color: '#ffc0cb',
            path: "M28 7H5.8L5 2.8A1 1 0 0 0 4 2H0v2h3.2L7 23.2a1 1 0 0 0 1 .8h18v-2H8.8L8 18h18a1 1 0 0 0 1-.8l2-9A1 1 0 0 0 28 7Zm-2.8 9H7.6L6.2 9h20.6Z M 8, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0 M 22, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0",
            path1: "M5 2.8A1 1 0 0 0 4 2H0v2h3.2L7 23.2a1 1 0 0 0 1 .8h18v-2H8.8L8 18h18a1 1 0 0 0 1-.8L29.2 7h-2l-2 9H7.6Z M 8, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0  M 22, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0 M18 6 18 2 16 2 16 6 12 6 12 8 16 8 16 12 18 12 18 8 22 8 22 6 18 6z",
            iconPath: "M28 7H5.8L5 2.8A1 1 0 0 0 4 2H0v2h3.2L7 23.2a1 1 0 0 0 1 .8h18v-2H8.8L8 18h18a1 1 0 0 0 1-.8l2-9A1 1 0 0 0 28 7Zm-2.8 9H7.6L6.2 9h20.6Z M 8, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0 M 22, 28 a 2,2 0 1,1 4,0 a 2,2 0 1,1 -4,0"
        };
    },
    created() {
        this.init();
    },
    watch: {
        amount(n, o) {

            if (n > o) {

                this.color = '#b38b4a';
                this.iconPath = this.path1;
                setTimeout(() => {
                    this.color = '#ffc0cb';
                    this.iconPath = this.path;

                }, 500);
            }

        }
    },
    computed: {
        ...mapGetters({
            amount: 'cart/getProductsAmount'
        })
    },
    methods: {
        ...mapMutations({
            init: 'cart/initCart'
        })
    },
};
</script>

<style lang="scss" scoped >
.menu-cart {
    position: relative;

    .car {
        margin-right: 28px;
        margin-top: 8px;
        cursor: pointer;
        width: 45px;
        height: 45px;
        background-color: transparent;
        border: transparent;


        #cardtImg {
            width: 35px;
            height: 51px;
            margin-left: -15px;
            padding-bottom: 5px;
            margin-top: 0px;
        }
    }

    .badge-pill {
        position: absolute;
        right: 29px;
        cursor: pointer;
        margin-top: 14px;
    }

    @media screen and (max-width: 414px) {
        .badge-pill {
            margin-top: -6px;
            right: -6px;

        }

        .car {
            width: 20px;
            height: 20px;
            position: relative;
            margin-top: 5px;

            #cardtImg {
                width: 28px;
                height: 41px;
                margin-left: -20px;

            }

            svg {
                position: absolute;
                top: -11px;
                left: 154%;
            }
        }
    }
}
</style>
<style lang="scss">
.menu-cart {
    .btn:focus {
        box-shadow: none !important;
    }
}
</style>
