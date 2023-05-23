<template>
    <div class="bgList">
        <div class="container produto">
            <div class="row md-3 p-3">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> {{ produto.titulo }}
                    </span>
                </div>
            </div>

            <div class="col-sm-12 pl-3" style="padding-right: 1px;">
                <div class="row card-roud shadow main">
                    <div class="col-2 rowpn border-right">
                        <div class="morePictures">
                            <div class="Pictures">
                                <client-only v-for="(img, i) in produto.slides" :key="i">
                                    <img class="img-thumbnail" :src="img.img" alt="" @click="setfullSizeImg(img.img)">
                                </client-only>
                            </div>
                        </div>
                    </div>
                    <div class="col col-10 col-sm-4 border-right destaque">
                        <img class="" :src="fullSizeImg" alt="">

                    </div>
                    <div class="col col-12 col-sm-6">
                        <div class="card-body">
                            <h4 class="card-title"> {{ produto.titulo }}</h4>
                            <h5 class="prodVal">R$ {{ produto.valor_por | formatValue }}</h5>
                            <div>
                                <nav>
                                    <h5>Cores:
                                        <small>
                                            <span v-if="prod.cor.codigo" class="badge badge-pill badge-secondary"> {{
                                                    prod.cor.titulo
                                            }} </span>
                                        </small>
                                    </h5>
                                    <div class="selecao-cores">
                                        <client-only v-for="(cor, i) in produto.colors" :key="i">
                                            <div id="act" class="cores" @click="setCor(cor)"
                                                :class="{ 'active': cor.active }">
                                                <a class="cor-link fake-link" :title="cor.titulo" :alt="cor.titulo">
                                                    <img :src="cor.imagem">
                                                </a>
                                            </div>
                                        </client-only>
                                    </div>
                                </nav>
                            </div>

                            <div class="row ml-0">
                                <nav>
                                    <h5 class="mt-2">Tamanhos:</h5>

                                    <client-only v-for="(tam, i) in produto.sizes" :key="i">
                                        <div id="act" class="tama-button" @click="setSize(tam)"
                                            :class="{ 'active': tam.active }">
                                            <a class="fake-link"> {{ tam.tam }}</a>
                                        </div>
                                    </client-only>
                                </nav>
                            </div>

                            <div class="row ml-0">
                                <nav>
                                    <h5 class="mt-2">Quantidade:</h5>

                                    <div class="input-group">
                                        <div class="input-group-append">
                                            <b-btn class="prev" variant="outline-secondary" @click="subQtd()">
                                                <b-icon icon="dash-lg"></b-icon>
                                            </b-btn>
                                            <b-form-input type="number" class="col-5" v-model="prod.qtd"
                                                @change="checkValue()">
                                            </b-form-input>
                                            <b-btn variant="outline-secondary" @click="addQtd()">
                                                <b-icon icon="plus-lg"></b-icon>
                                            </b-btn>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                            <br>
                            <div>
                                <div class="row ml-0 pl-3 buy">
                                    <button class="row btn btn-outline-secondary"
                                        @click="addToCart({ prod, callback: unselectAtive })">
                                        Adicionar &nbsp;
                                        R$ {{ subtotal | formatValue }}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div class="col-12 row">
                <hr>
            </div>

            <div class="col-sm-12" style="padding-right: 1px;">
                <div class="row card-roud shadow main">
                    <div class="col col-12" :class="{ 'col-sm-6': produto.medida }">
                        <h5 class="border-bottom">Descrição:</h5>
                        <p v-if="produto.descricao" v-html="formatObs(produto.descricao)"></p>
                    </div>
                    <div class="col col-12 col-sm-6 ">
                        <h5 class="border-bottom">Tabela de Medidas:</h5>
                        <p><img :src="produto.medida" width="100%"></p>
                    </div>
                </div>
            </div>

            <div class="col-12 row">
                <hr>
            </div>

            <div class="col-12 row">
                <p>
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> Relacionados /
                    </span>{{ produto.titulo }}
                </p>
            </div>

            <div class="col-12 row mx-auto">
                <client-only v-for="(prod, si) in sugeridos" :key="si">
                    <div class="col-6 col-xs-6 col-sm-4 col-md-3 produtoPai">
                        <product-card :prod="prod"></product-card>
                    </div>
                </client-only>
            </div>



        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            code: "",
            fullSizeImg: "",
            valorBase: "",
            sugeridos: [],
            produto: {},
            prod: {
                codigo: '',
                titulo: '',
                img: '',
                medida: '',
                valor: 0,
                valorTotal: 0,
                tamanho: {},
                cor: {},
                qtd: 1
            }
        };
    },
    mounted() {
        this.$nextTick(async () => {
            this.$nuxt.$loading.start();

            this.code = this.$route.params.codi;

            const produto = await this.getProduto(this.code);
            this.produto = { ...produto };

            if (this.produto.slides[0]) {
                this.setfullSizeImg(this.produto.slides[0].img)
            };

            for (const key in this.prod) {
                if (Object.hasOwnProperty.call(this.produto, key)) {
                    this.prod[key] = this.produto[key];
                }
            }

            this.valorBase = this.produto.valor_por;

            this.sugeridos = await this.getSugeridos(this.code);

            this.$nuxt.$loading.finish();
        });
    },
    computed: {
        subtotal: function () {
            var valorTotal = this.prod.qtd * this.produto.valor_por;
            this.prod.valorTotal = valorTotal;
            return valorTotal;
        },
    },
    methods: {
        ...mapMutations({
            addToCart: "cart/addToCart"
        }),
        ...mapActions({
            getProduto: "produto/getProduto",
            getSugeridos: "produto/getSugeridos",
        }),
        unselectAtive() {
            this.prod.cor = {};
            this.prod.tamanho = {};

            this.produto.colors = this.produto.colors.map((c) => {
                c.active = false;
                return c;
            });

            this.produto.sizes = this.produto.sizes.map((tt) => {
                tt.active = false;
                return tt;
            });

            this.prod.qtd = 1;
        },

        setfullSizeImg(img) {
            this.fullSizeImg = img;
        },
        setCor(cor) {
            this.prod.cor = cor;

            this.produto.colors = this.produto.colors.map((c) => {
                c.active = false;
                return c;
            });

            cor.active = true;

            var img = this.produto.slides.find((i) => {
                return i.cor == cor.codigo;
            });

            if (img) {
                this.prod.img = img.img;
                this.setfullSizeImg(img.img);
            }
        },
        setSize(t) {
            this.prod.tamanho = t;

            this.produto.valor_por = this.valorBase;

            if (t.valor && t.valor > 0) this.produto.valor_por = t.valor;

            this.prod.valor = this.produto.valor_por;

            this.produto.sizes = this.produto.sizes.map((tt) => {
                tt.active = false;
                return tt;
            })

            t.active = true;
        },
        addQtd() {
            this.prod.qtd += 1;

            // addCart(){

            // }



        },
        subQtd() {
            this.prod.qtd -= 1;

            if (this.prod.qtd <= 0) {
                this.prod.qtd = 1;
            }
        },
        checkValue() {
            if (this.prod.qtd <= 0) {
                this.prod.qtd = 1;
            }
        },
        formatObs(str) {
            str = str.replace(/&nbsp;/gi, '');
            str = str.split('\n').join('');
            str = str.split('  ').join(' ');
            return str;
        }
    }
}
</script>
<style lang="scss">
.produto {
    .produtoPai {
        margin-bottom: 30px;
    }

    .buy {
        button {
            &:hover {
                background-color: green;

            }
        }

    }

    .input-group {
        width: 150px;

        &-append {

            .prev {
                border-top-left-radius: 5px !important;
                border-bottom-left-radius: 5px !important;
            }

            .btn {
                font-size: 10px;
            }

            .form-control {
                border-radius: 0;
            }
        }
    }

    .card.shadow {
        input {
            outline: none;
            border: none;

            &::-webkit-input-placeholder {
                color: #acacac;
            }

            &:-moz-placeholder {
                color: #acacac;
            }

            &::-moz-placeholder {
                color: #acacac;
            }

            &:-ms-input-placeholder {
                color: #acacac;
            }
        }
    }

    .card-title {
        margin-left: 0px;
    }

    .prodVal {
        color: var(--prodv-color);
    }

    .selecao-cores {
        display: flow-root;
        cursor: pointer;

        img {
            border-radius: 50%;
        }

        div {
            float: left;
            padding: 0.5rem;
            border-radius: 50%;
            border: solid 1px var(--border-color);
            margin: 1px;
        }

        a {
            border-radius: 50%;
            border: none;
        }

        .active {
            color: var(--first-color);
            background-color: var(--first-color);
            border-color: var(--prodv-color);
        }

        .text-secondary {
            color: #6c757d !important;
        }

    }

    .cores img {
        width: 40px;
        height: 40px;
        -webkit-box-shadow: 5px 5px 11px 2px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 5px 5px 11px 2px rgba(0, 0, 0, 0.15);
        box-shadow: 5px 5px 11px 2px rgba(0, 0, 0, 0.15);
    }

    .tama-button {
        cursor: pointer;
        float: left;
        line-height: 1;
        padding: 0.45em;
        border: 1px solid #ddd;
        display: block;
        border-radius: 5px;
        margin: 2px;

        &:hover {
            border: 1px solid var(--prodv-color);
        }

        a {
            text-decoration: none;
            color: var(--prodv-color);
        }

        &.active {
            background-color: var(--first-color);
            font-weight: bold;
            border-color: var(--prodv-color);

        }
    }

    .card-roud {
        background-color: #fff;
        border-radius: 5px;
    }

    .main {
        padding: 10px;
        margin-right: 0;

        .morePictures {
            position: relative;
            display: flex;
            width: calc(100% + 20px);
            margin: 1px;
            margin-left: -10px;
            margin-right: -10px;
            overflow: hidden;
            max-height: 500px;


        }

        .destaque {
            align-content: center;
            align-items: center;
            align-self: center;

            img {
                width: 100%;
            }
        }
    }

    .Pictures {
        display: inline-block;
        white-space: normal;
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: #fff;

        &::-webkit-scrollbar {
            width: 6px;
            background-color: #e0e0e0;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #3f3f3f;
        }

        img {
            max-height: 100%;
            max-width: 100%;
            margin-bottom: 1px;
            border: 1px solid;
            border-color: #ccc;
        }

    }
}
</style>