<template>
    <div class="col-12">
        <div class="p-2 mb-2 section-title" v-if="secction">
            <div class="col-12 p-3">
                <span class="text-secondary">
                    <b-icon icon="caret-right-fill"></b-icon> {{ title }}
                </span>
            </div>
        </div>
        <div id="btnsecprev" class="shadow ctr-btn prev" @click="scrollLeft()">
            <b-icon icon="arrow-left"></b-icon>
        </div>

        <div class="container testimonial-group justify-content-center">
            <div class="flex-nowrap row mb-2" ref="div">
                <div class="col-lg-2 col-sm-4 col-6 produtoPai" v-for="(prod, i) in products" :key="i">
                    <product-card :prod="prod"></product-card>
                </div>
            </div>
        </div>

        <div id="btnsecnext" class="shadow ctr-btn next" @click="scrollRight()">
            <b-icon icon="arrow-right"></b-icon>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: 'homeSidelist',
    props: {
        list: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            products: [],
            secction: null,
            title: "Produtos",
        }
    },
    async mounted() {

        this.secction = this.list.child[0].child[0] ?? null;

        const data = await this.getProdutos(this.list.url);
        this.products = data;
        let url = this.list.url;
        let list = url.split('/');

        if (list.includes(['Category', 'category'])) {

            const category = await this.getSubCategory(list.pop());
            this.category = category;

            this.title = `${category.categoria} / ${category.titulo} `
        }
    },
    methods: {
        ...mapActions({
            getProdutos: 'produto/getProdutos',
            getSubCategory: 'produto/getSubCategory',
        }),
        scrollLeft() {
            this.$refs.div.scrollLeft -= 100;

        },
        scrollRight() {
            this.$refs.div.scrollLeft += 100;
        },
    },
}
</script>

<style lang="scss" scoped>
/* The heart of the matter */

.card-roud {
    background-color: #fff;
    border-radius: 5px;
}

.testimonial-group {

    // max-height: 600px;
    >.row {
        overflow-x: auto;
        overflow-y: hidden;
        white-space: nowrap;

        &.flex-nowrap {
            scroll-behavior: smooth;
            max-width: 100vw;
            margin-right: -51px;
            margin-left: -22px;
        }


        &::-webkit-scrollbar {
            height: 6px;
            background-color: #e0e0e0;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #3f3f3f;
        }

        >.col-sm-4 {
            display: inline-block;
            float: none;
        }
    }

}

.ctr-btn {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color: #fff;
    opacity: 0.5;
    z-index: 1;
    top: calc(60% - 50px);
    padding-top: 14px;
    cursor: pointer;
    transition: all 200ms;

    &:hover {
        opacity: 1;
    }

    &.next {
        left: calc(100% - 14px);
        padding-left: 17px;
        margin-left: 0%;
    }

    &.prev {
        left: -9px;
        padding-left: 17px;
    }
}

@media screen and (max-width: 414px) {
    .ctr-btn {
        &.prev {
            left: -8px;
        }

        &.next {
            left: calc(100% - 14px);
            padding-left: 17px;
            margin-left: 0%;
        }
    }
}
</style>