<template>
    <div class="bgList">
        <div class="container carrinho">
            <div class="row p-3">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> MEU CARRINHO
                    </span>
                </div>
            </div>
            <div class="row ml-2">
                <div class="row col-12">
                    <div class="col-md-4 order-2 mb-2">
                        <ul class="list-group mb-3">

                            <li class="list-group-item d-flex justify-content-between" v-if="carrinho.cupom?.codigo">
                                <div :class="{'text-success':carrinho.desconto,'text-warning':!carrinho.desconto}">
                                    <h6 v-if="carrinho.desconto" class="my-0">Cupom</h6>
                                    <h6 v-else class="my-0">Cupom Inválido</h6>
                                    <small>{{carrinho.cupom.cupom}}</small>
                                    <span v-if="carrinho.cupom.tipo_valor == '1' "
                                        :class="{'text-success':carrinho.desconto,'text-warning':!carrinho.desconto}">
                                        <small>| - R$ {{ carrinho.cupom.valor | formatValue }}</small>
                                    </span>
                                    <span v-if="carrinho.cupom.tipo_valor == '2' "
                                        :class="{'text-success':carrinho.desconto,'text-warning':!carrinho.desconto}">
                                        <small>| {{ carrinho.cupom.valor }} % OFF</small>
                                        <br>
                                    </span>
                                </div>
                                <span v-if="carrinho.desconto" class="text-success ml-4">
                                    - R$ {{ carrinho.desconto | formatValue }}
                                </span>

                                <span class="remove-btn mt-0" @click="setCupom(false)">Alterar</span>
                            </li>

                            <li class="list-group-item d-flex justify-content-between "
                                v-if="carrinho.frete?.descricao">
                                <div :class="{'text-success':carrinho.frete}">
                                    <h6 v-if="carrinho.frete" class="my-0">Frete: {{ carrinho.frete.descricao }}
                                    </h6>
                                    <small class="text-muted">
                                        Prazo: {{ carrinho.frete.prazo}} Dia(s)
                                    </small>
                                    <br>
                                </div>
                                <span class="text-secondary"> R$ {{ carrinho.frete.valor | formatValue }}</span>
                                <span @click="setFrete({})" class="remove-btn">Alterar</span>
                            </li>

                            <li class="list-group-item d-flex justify-content-between">
                                <span>Total </span>
                                <strong>R$ {{ carrinho.valorTotal | formatValue }}</strong>
                            </li>
                        </ul>

                        <div class="card p-2 mb-3">
                            <div class="input-group">
                                <input name="cupom" id="cupom" type="text" class="form-control" v-model="cupom"
                                    @keyup.enter="rescueCode()" placeholder="Código promocional">
                                <div class="input-group-append" @click="rescueCode()">
                                    <button type="button" class="btn btn-secondary">Resgatar</button>
                                </div>
                            </div>
                        </div>

                        <form class="card p-2">
                            <div class="input-group">
                                <input name="cep" id="cep" type="text" class="form-control" v-mask="'#####-###'"
                                    v-model="cep" @keyup.enter="validaCep()" placeholder="00000-000">
                                <div class="input-group-append" @click="validaCep()">
                                    <button type="button" class="btn btn-secondary">Buscar</button>
                                </div>
                            </div>
                        </form>

                        <ul class="list-group mb-3" v-if="!carrinho.frete?.descricao">
                            <client-only v-for="(trans, trs) in delivery" :key="trs">
                                <li @click="setFrete(trans)"
                                    class="list-group-item d-flex justify-content-between lh-condensed frete">
                                    <div>
                                        <h6 class="my-0">{{trans.descricao}}</h6>
                                        <small class="text-muted"> <b>Prazo:</b> {{trans.prazo}} Dia(s) </small><br>
                                    </div>
                                    <span v-if="trans.valor" class="text-muted"> <b>Valor:</b> {{trans.valor |
                                    formatValue }} </span>
                                    <span v-else class="text-muted"> <b>Grátis</b></span>
                                </li>
                            </client-only>
                        </ul>
                    </div>

                    <div class="col-md-8 order-md-0">

                        <div class="row-pn shadow2">
                            <client-only v-for="(prod, pdt) in carrinho.produtos" :key="pdt">
                                <li class="list-group-item d-flex justify-content-between lh-condensed main-max">
                                    <div class="row">
                                        <span class="img1">
                                            <a>
                                                <img :src="prod.img" :alt="prod.titulo" class="rounded float-left">
                                            </a>
                                        </span>
                                        <span class="lixt">
                                            <h6 class="my-0">{{prod.titulo}}</h6>
                                            <small class="text-muted"> <b>Cor:</b> {{prod.cor.titulo}}</small><br>
                                            <small class="text-muted"> <b>Tamanho:</b>
                                                {{prod.tamanho.tam}}</small><br>
                                            <span>
                                                <div class="addo">
                                                    <div class="input-group">
                                                        <div class="input-group-append">
                                                            <b-btn class="prev" variant="outline-secondary"
                                                                @click="subQtd(pdt)">
                                                                <b-icon icon="dash-lg"></b-icon>
                                                            </b-btn>
                                                            <b-form-input type="number" class="col-5" :value="prod.qtd"
                                                                @keyup="checkValue($event,prod, pdt)"
                                                                @change="checkValue($event,prod, pdt)">
                                                            </b-form-input>
                                                            <b-btn class="next" variant="outline-secondary"
                                                                @click="addQtd(pdt)">
                                                                <b-icon icon="plus-lg"></b-icon>
                                                            </b-btn>
                                                        </div>
                                                    </div>
                                                </div>
                                            </span>
                                        </span>
                                    </div>
                                    <span class="trash">
                                        <b-button variant="outline-secondary" type="submit" id="outline"
                                            @click="removeProd(prod, pdt)">
                                            <b-icon icon="trash" variant="danger"></b-icon>
                                        </b-button>
                                    </span>
                                    <span class="text-muted text-center  vtl">R$ {{prod.valorTotal | formatValue}}</span>
                                </li>
                            </client-only>
                            <br>
                            <li class="mb-1 list-group-item d-flex justify-content-between" style="margin-top:-2%">
                                <span>Subtotal </span>
                                <strong>R$ {{ carrinho.subTotal | formatValue}}</strong>
                            </li>

                        </div>
                    </div>
                </div>

                <div class="row col-12 mb-4 mt-1">
                    <div class="col-12 col-sm-6 col-lg-4 ">
                        <nuxt-link to="/">
                            <button class="col-12 btn draw-background-coco">
                                Continuar comprando
                                <b-icon icon="cart-plus" animation="throb" font-scale="1"></b-icon>
                            </button>
                        </nuxt-link>
                    </div>
                    <div class="col-12 d-block d-sm-none ">
                        <hr>
                    </div>
                    <div class="d-md-none d-none d-sm-none d-lg-block col-lg-4">
                    </div>
                    <div class="col-12 col-sm-6 col-lg-4 ">
                        <nuxt-link to="/checkout">
                            <button class=" col-12 btn draw-background">
                                <b-icon icon="chevron-double-right"></b-icon>
                                Finalizar
                            </button>
                        </nuxt-link>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

export default {
    data() {
        return {
            cupom: '',
            cep: '',
            delivery: []
        }
    },
    computed: {
        ...mapGetters({
            produtos: "cart/getProducts",
            carrinho: "cart/getCart",
        }),
    },
    methods: {
        ...mapMutations({
            frete: "cart/setFrete",
            addQtd: "cart/addProdQtd",
            subQtd: "cart/subProdQtd",
            remPdt: "cart/removeFromCart",
            updQtd: "cart/updateQtdProd",
            setCupom: "cart/setCupom",
            setFrete: "cart/setFrete"
        }),
        ...mapActions({
            getCupom: "cart/getCupom",
            checkCep: "cart/checkCep",
            calcFrete: "cart/getFrete"
        }),

        removeProd(prod, index) {
            this.$swal({
                font: 'sans-serif',
                title: 'Atenção!',
                text: `Remover (${prod.titulo}) do seu carrinho ? `,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim!',
                cancelButtonText: 'Cancelar!',
            }).then(({ isConfirmed }) => {
                if (isConfirmed) {
                    this.remPdt(index);
                }
            });
        },
        checkValue(event, prod, index) {

            let value = event;

            if (event?.target) {
                value = event.target.value;
            }

            if (prod.qtd == value) return

            if (value == '' || value == 0) {
                value = 1;
            }

            if (event?.target) {
                event.target.value = value;
            }

            this.updQtd({ index, qtd: value });

        },
        async validaCep() {

            if (this.cep == '') {
                this.$toast.info(`Informe um CEP valido... `);
                return
            }

            this.$toast.info(`Buscando CEP... `);
            const cep = await this.checkCep(this.cep);

            if (cep?.erro) {

                this.$toast.error(`CEP invalido... `);

            } else {

                this.$toast.info(`Calculando opções de frete... `);


                console.log(this.cep, cep);

                let frete = await this.calcFrete({ cep });

                frete = frete.map((f) => {
                    f.valor = parseFloat(f.valor);
                    return f
                })


                this.delivery = [...new Map(frete.map(item => [item['descricao'], item])).values()];

            }
        },

        async rescueCode() {

            if (this.cupom != '') {

                this.$toast.info(`Validando cupom (${this.cupom}) ... `);

                var valid = await this.getCupom(this.cupom);

                if (valid !== false) {

                    this.setCupom(valid);

                } else {
                    this.$toast.error(`Cupom (${this.cupom}) Invalido! `);
                }
            }
        },
    },
}
</script>

<style lang="scss">
.carrinho {

    .remove-btn {
        cursor: pointer;
        height: 25px;
        background-color: transparent;
        border-radius: 5px;
        padding: 1px 4px 6px 4px;
        color: red;

        &:hover {
            background-color: red;
            color: white;
        }
    }

    .trash {
        display: none;
    }

    .card.p-2 {
        width: 100%;
        border: none;

    }

    .row-pn.shadow2 {
        display: inherit;
        border-radius: 5px !important;
    }

    .main-max {
        .vtl {
            padding-top: 44px;
        }

        &:hover {
            .trash {
                display: flex;
                position: absolute;
                margin-left: calc(100% - 70px);
                margin-top: -1%;

                button {
                    border: none;
                    background-color: transparent;
                }
            }
        }

        .row {
            display: contents;

            .img1 {
                width: 80px;

                img {
                    width: 80px;
                    margin-right: 8px;
                }
            }

            .lixt {
                width: 71%;

                .addo {
                    width: 150px;
                    margin-top: 9px;
                }
            }
        }
    }

    .input-group {

        &-append {

            .prev {

                border-top-left-radius: 5px !important;
                border-bottom-left-radius: 5px !important;
                font-size: 10px;

            }

            .next {
                border-bottom-right-radius: 5px !important;
                border-top-right-radius: 5px !important;
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

    .text-secondary {
        color: #6c757d !important;
    }

    .card-roud {
        background-color: #fff;
        border-radius: 5px;
    }

    .btn.draw-background-coco {
        background: none;
        line-height: 1.5;
        color: grey;
        border: 2px solid grey;
        letter-spacing: 0.05rem;
        transition: all 500ms;


        &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
        }
    }

    .btn.draw-background {
        background: none;
        line-height: 1.5;
        border: 2px solid green;
        letter-spacing: 0.05rem;
        color: green;
        transition: all 500ms;

        &:hover,
        &:focus {
            border-color: green;
            color: white;
            box-shadow: inset 24em 0 0 0 green;
        }
    }

}
</style>