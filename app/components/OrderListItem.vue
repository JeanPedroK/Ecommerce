<template>
    <div v-if="order.valor_total != '0'">
        <div class="card mb-2">

            <span @click="openModal" class="list-group-item d-flex justify-content-between lh-condensed pl-0"
                style="cursor:pointer">
                <div class="col-7">
                    <h6 class="my-0">#{{ order.codigo }}</h6>
                    <small class="text-muted">
                        <b>Status: {{ order.acompanhamento }}</b>
                    </small>
                    <br>
                    <small class="text-muted">
                        <b>Data pedido: {{dateFormat( order.data_pedido )}}</b>
                    </small>
                </div>
                <div class="col-5 row" style="float: right; text-align: right;">
                    <span class="col-12 text-muted">R$ {{ formatValue(order.valor_total) }}</span>
                    <span class="col-12" style="padding-right: 29px;">
                        <svg v-if="order.metodo_pgto == 'CREDIT_CARD'" xmlns="http://www.w3.org/2000/svg" width="28"
                            height="28" fill="currentColor" class="bi bi-credit-card"
                            style="margin-top: 2%;margin-left: 32%;color: black;" viewBox="0 0 16 16">
                            <path
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                        </svg>
                        <a v-if="order.metodo_pgto == 'BOLETO'" :href="order.url_pag" target="_blank" class=" segvia">
                            <svg v-if="order.metodo_pgto == 'BOLETO'" xmlns="http://www.w3.org/2000/svg" width="28"
                                height="28" fill="currentColor" class="bi bi-upc-scan"
                                style="margin-top: 2%;margin-left: 32%;" viewBox="0 0 16 16">
                                <path
                                    d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
                            </svg>
                        </a>
                        <a v-if="order.metodo_pgto == 'PIX'" class=" segvia" target="_blank">
                            <svg v-if="order.metodo_pgto == 'PIX'" xmlns="http://www.w3.org/2000/svg" width="28"
                                height="28" fill="currentColor" class="bi bi-qr-code-scan"
                                style="margin-top: 2%;margin-left: 32%;color: black;" viewBox="0 0 16 16">
                                <path
                                    d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z" />
                                <path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
                                <path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
                                <path
                                    d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z" />
                                <path d="M12 9h2V8h-2v1Z" />
                            </svg>
                        </a>
                    </span>
                </div>
            </span>
        </div>


        <b-modal v-model="modalShow" size="lg">
            <template #modal-title>
                <h4 class="ml-2">PEDIDO #{{ order.codigo }}</h4>
            </template>
            <!-- LISTA PRODUTOS -->
            <div>

                <h5 class="text-center"> ITENS DO PEDIDO #{{ order.codigo }}</h5>

                <li v-for="(prod, pdt) in fullOrder.itens" :key="pdt"
                    class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row">
                        <span class="lixt">
                            <h6 class="my-0">{{ prod.titulo }}</h6>
                            <small class="text-muted"> <b>Cor:</b> {{ prod.cor }}</small>
                            <br>
                            <small class="text-muted">
                                <b>Tamanho:</b> {{ prod.tama }}
                            </small>
                            
                            <br>
                            <small class="text-muted">
                                <b>Quantidade:</b> {{ prod.quantidade }}
                            </small>
                        </span>
                    </div>
                    <span class="text-muted text-center  vtl">R$ {{ formatValue(prod.valor) }}</span>
                </li>

                <li class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row">
                        <span class="lixt">
                            <h6 class="my-0" style="color: #c74f8c;">Tipo do frete (&nbsp;{{ order.tipo_frete|| 'normal' }}&nbsp;) </h6>
                            <!-- <pre>{{ order }}</pre> -->
                        </span>
                    </div>
                    <span class="text-muted text-center vtl">{{ order.valor_frete > 0 ? 'R$ ' + (formatValue(order.valor_frete)) : 'Grátis'
                    }}</span>
                </li>

                <li class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row">
                        <span class="lixt">
                            <h6 class="my-0"> <b> Valor total do pedido</b>
                            </h6>
                        </span>
                    </div>
                    <span class="text-muted text-center vtl">R$ {{ formatValue(order.valor_total) }}</span>
                </li>

                <!-- DADOS DO ENTREGA -->

                <h6 class="text-center mt-2" style="color: #c74f8c;"> <b> Dados de Entrega</b> </h6>

                <li class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row">
                        <span class="lixt">
                            <h6 class="my-0"> <b> Tipo de frete:</b>
                            </h6>
                        </span>
                    </div>
                    <span class="text-muted text-center vtl">{{ order.tipo_frete }}</span>
                </li>

                <li v-if="fullOrder.client && order.tipo_frete != 'Retirar na Loja'"
                    class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row col-12" style="margin-left: -35px;">
                        <div class="col-sm-6">
                            <span class="text-muted"> <b>Endereço:</b> {{ order.endereco }}</span>
                            <br>
                            <span class="text-muted"> <b>CEP:</b> {{ fullOrder.client.cep }}</span>
                            <br>
                            <span class="text-muted"> <b>Número:</b> {{ order.numero }}</span>
                            <br>
                            <span class="text-muted"> <b>Bairro:</b> {{ fullOrder.client.bairro }}</span>
                            <br>
                        </div>

                        <div class="col-sm-6">
                            <span class="text-muted"> <b>Cidade:</b> {{ fullOrder.client.cidade }}</span>
                            <br>
                            <span class="text-muted"> <b>Estado:</b> {{ fullOrder.client.estado }}</span>
                            <br>
                            <span class="text-muted"> <b>Complemento:</b> {{ fullOrder.client.complemento
                            }}</span>
                            <br>
                        </div>
                    </div>
                </li>
                <!-- DADOS DO CLIENTE -->
                <h6 class="text-center mt-2" style="color: #c74f8c;"> <b> Dados do Cliente</b> </h6>

                <li v-if="fullOrder.client"
                    class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row col-12" style="margin-left: -35px;">
                        <div class="col-sm-6">
                            <span class="text-muted"> <b>Nome:</b> {{ fullOrder.client.nome }}</span>
                            <br>
                            <span class="text-muted"> <b>CPF/CNPJ:</b> {{ fullOrder.client.cpf }} {{
                                    fullOrder.client.cnpj
                            }}</span>
                            <br>
                            <span class="text-muted"> <b>RG:</b> {{ fullOrder.client.rg }}</span>
                            <br>
                            <span class="text-muted"> <b>Data Nascimento:</b> {{ fullOrder.client.data_nascimento  }}</span>
                            <br>
                        </div>

                        <div class="col-sm-6">
                            <span class="text-muted"> <b>E-mail:</b> {{ fullOrder.client.email }}</span>
                            <br>
                            <span class="text-muted"> <b>Telefone:</b> {{ fullOrder.client.telefone }}</span>
                            <br>
                        </div>
                    </div>
                </li>

                <!-- DADOS DO PAGAMENTO -->
                <h6 class="text-center mt-2 " style="color: #c74f8c;"> <b> Dados do Pagamento</b> </h6>

                <li v-if="fullOrder.client"
                    class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row col-12" style="margin-left: -35px;">
                        <div class="col-sm-6">
                            <span class="text-muted"> <b>Metodo de pagamento:</b> {{ fullOrder.metodo_pgto }}</span>
                            <br>
                            <span class="text-muted"> <b>Data do pedido:</b> {{ fullOrder.data_pedido }} {{
                                    fullOrder.client.cnpj
                            }}</span>
                            <br>
                            <span class="text-muted"> <b>Desconto: R$</b> {{ formatValue(fullOrder.desconto) }}</span>
                            <br>
                            <span class="text-muted"> <b>Valor do frete: R$</b> {{ formatValue(fullOrder.valor_frete) }}</span>
                            <br>
                        </div>
                        <div class="col-sm-6">
                            <span class="text-muted"> <b>Valor total: R$</b> {{ formatValue(order.valor_total) }}</span>
                            <br>
                        </div>
                    </div>
                </li>

                
                <br>
                <li v-if="fullOrder.observacoes" class="list-group-item d-flex justify-content-between lh-condensed main-max">
                    <div class="row col-12">
                        <b>Observações:</b>
                        {{ fullOrder.observacoes }}
                    </div>
                </li>

            </div>

        </b-modal>

    </div>
</template>
<script>

import { mapActions } from "vuex";

export default {
    name: "OrderListItem",
    props: {
        order: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            modalShow: false,
            fullOrder: {},
            cliente: {},
            items: []
        }
    },
    methods: {
        ...mapActions({
            getOrder: 'client/getOrder'
        }),
        async openModal() {
            let setfullOrder = await this.getOrder(this.order.codigo);
            this.fullOrder = setfullOrder;
            this.modalShow = true;
        },
        formatValue(value){
            return parseFloat(value).toFixed(2).toString().replace('.', ',');
        },
        dateFormat(value){
            return value.replace(/(\d{2,4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})/gm,"$3/$2/$1 $4:$5");
        }
    }

}
</script>
<style lang="scss" scoped>
.segvia {
    svg {
        color: black;

        &:hover {
            color: var(--primary-color);
        }
    }

}
</style>