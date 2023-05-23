<template>
    <div class="out-produto">
        <nuxt-link :to="link">
            <div class="produto" :to="link" :title="prod.titulo" style="cursor: pointer;">
                <div :style="{ 'background-image': `url(${image})` }" loading="lazy" class="img" style="">
                </div>
                <div class="col-sm-12 bg-white descdiv">
                    <p class="tprod">
                        {{ prod.titulo }}
                    </p>
                    <p class="prodVal">
                        <span v-if="prod.valor_de != '0'">
                            <s>R$ {{ prod.valor_de }}</s>
                        </span>
                        R$ {{ prod.valor_por | formatValue }}
                    </p>
                    <span class="btn-outline-dark col-sm-12 btnComprar">
                        <b-icon icon="cart-plus"></b-icon>
                    </span>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    name: "ProductCard",
    props: {
        prod: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            link: '/produto',
            image: "/product.png",
        }
    },
    created() {

        let link = [this.link];

        link.push(this.prod.codigo);
        link.push(this.prod.referencia.split(' ').join('_'));

        this.link = link.join('/');

        let img = this.prod.slides[0];

        while (typeof img == 'object') {
            img = img[0] || "";
        }

        if (img) {
            this.image = this.$root.$options.filters.placeholder(img, this.image);
        }
    }
}
</script>
<style lang="scss" scoped>
.out-produto {

    a {
        text-decoration: none;
        color: unset !important;
    }

    .produto {
        box-shadow: 1.5px 1.5px 5px 1px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        object-fit: cover;
        background-color: #fff;
        border-radius: 10px;
        margin-left: -8px;
        margin-right: -8px;

        .img {
            border-bottom: 1px solid var(--prodv-color);
            display: block;
            width: 100%;
            max-height: 500px;
            padding-top: 145%;
            background-size: cover;
        }

        &:hover {
            box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.15);

            .descdiv {
                height: 150px;
            }

            .descdiv {
                .btnComprar {
                    opacity: 1;
                }
            }
        }
    }

    .btnComprar {
        opacity: 0;
        bottom: 5px;
        left: 5px;
        right: 5px;
        position: absolute;
        width: calc(100% - 10px);
        height: 35px;
        border-radius: 50px !important;
        transition: all 0.2s 0.1s;
        text-align: center;
        border: solid 1px;
        padding-top: 2px;

        &:after {

            content: var(--btn-buy-text);
        }
    }

    .prodVal {
        position: absolute;
        top: 47px;
        left: 9px;
        right: 9px;
        width: calc(100% - 10px);
        vertical-align: middle;
        font-weight: bold;
        font-size: 1.2em;
        color: var(--prodv-color)
    }

    .tprod {
        vertical-align: middle;
        padding: 5px;
        margin-left: -8px;
        margin-right: -8px;
        line-height: 1.1em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
    }

    .descdiv {
        transition: height 0.3s;
        overflow: hidden;
        height: 80px;
    }

    .col-4 .out-produto {
        height: 530px;
    }

    @media only screen and (max-width: 768px) {
        .descdiv {
            height: 150px;
        }

        .btnComprar {
            opacity: 1;
        }

        .prodVal {
            top: 70px;
        }
    }
}
</style>