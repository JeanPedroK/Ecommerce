<template>
    <div class="col-12">
        <div class="p-2 mb-2 section-title" v-if="secction">
            <div class="col-12 p-3">
                <span class="text-secondary">
                    <b-icon icon="caret-right-fill"></b-icon> {{ title }}
                </span>
            </div>
        </div>

        <div class="row justify-content-center" style="margin-left: -7px;margin-right: -37px;">
            <div :class="classe" v-for="(prod, i) in products" :key="i">
                <product-card :prod="prod"></product-card>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
    name: 'homeList',
    props: {
        list: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            products: [],
            secction: true,
            title: "Produtos",
            classe: "col-lg-2 col-sm-4 col-6 mb-2 produtoPai",
            classConstant: "mb-2",
        }
    },
    async mounted() {

        this.setClass();
        let url = this.list.url;

        if (url == '') {
            url = '/?destaque'
        } else {
            url = url.replace('categoria', 'category');
        }

        const data = await this.getProdutos(url);
        this.products = data;

        url = url.toLowerCase();
        let list = url.split('/');

        if (list.includes('category')) {

            const category = await this.getSubCategory(list.pop());
            this.category = category;

            console.log(category);

            this.title = `${category.categoria} / ${category.titulo} `
        }
    },
    methods: {
        ...mapActions({
            getProdutos: 'produto/getProdutos',
            getSubCategory: 'produto/getSubCategory',
        }),
        reduceClass(item) {

            var classe = "";

            if (Array.isArray(item)) {

                for (const iterator of item) {
                    classe += this.reduceClass(iterator);
                    if (classe != "") {
                        return classe;
                    }
                }

            } else {

                if (item?.class.indexOf('produtoPai') > -1) {
                    classe += item.class;
                } else if (item?.child) {
                    classe += this.reduceClass(item.child);
                }
            }

            return classe;
        },
        setClass() {
            this.classe = this.reduceClass(this.list) + " " + this.classConstant;
        }
    },
}
</script>
<style>
.card-roud {
    background-color: #fff;
    border-radius: 5px;
}
</style>