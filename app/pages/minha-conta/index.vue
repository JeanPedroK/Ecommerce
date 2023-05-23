<template>
    <div class="bgList pb-4">
        <div class="container minha-conta">
            <div class="row p-3">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> CENTRAL DO CLIENTE
                    </span>
                </div>
            </div>
            <div class="row ">
                <div class="col-12 col-sm-2 mb-2">
                    <div class="col-12 card-roud shadow p-2 justify-content-sm-center">
                        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                            <client-only v-for="(m,i) in menus" :key="i">
                                <a class="fake-link nav-link text-secondary" data-toggle="pill" role="tab"
                                    :class="{ 'btn': (m.id == view), 'active': (m.id == view) }"
                                    :id="'v-pills-' + m.menu" @click="setView(m.id)">
                                    {{ m.menu }}
                                </a>
                            </client-only>
                        </div>
                    </div>
                </div>
                <!-- CENTRAL -->
                <div class="col-12 col-sm-10">
                    <!-- PEDIDOS -->
                    <div class="col-12 card-roud shadow p-2 justify-content-sm-center" v-if="view == 'ORDERS'">
                        <div class="tab-content">
                            <div class="tab-pane fade show active">
                                <th class="ml-2">Pedidos em andamento</th>
                                <div class="mb-3">
                                    <order-list-item v-for="(ord, or) in openOrders" :key="or" :order="ord" />
                                </div>

                                <th class="ml-2">Pedidos finalizados</th>
                                <div class="mb-3">
                                    <order-list-item v-for="(fin, or) in closedOrderes" :key="or" :order="fin" />
                                </div>

                                <div class="mb-3">
                                   <pre>{{orders}}</pre>
                                </div>

                            </div>
                        </div>

                    </div>
                    <!-- DADOS PESSOAIS -->
                    <div class="tab-content" v-if="view == 'DATA'">

                        <div class="col-12">

                            <div class="row">
                                <div class="ml-0 card-roud shadow card-endereco p-0 col-12">
                                    <form class="card-body p-2 row">
                                        <div class="form-group has-feedback col-12 col-sm-12 col-md-4">
                                            <label v-if="client.cpf" class="control-label " for="nome">Nome
                                                Completo</label>
                                            <label v-else class="control-label " for="nome"> Razão Social</label>
                                            <div class="controls">
                                                <input class="form-control" id="nome" name="nome" v-model="client.nome"
                                                    placeholder="Nome" type="text" disabled>
                                            </div>
                                        </div>
                                        <div class="form-group col-6 col-sm-12 col-md-3">
                                            <label v-if="client.cpf" class="control-label" for="cpf">Pessoa
                                                Física</label>
                                            <label v-else class="control-label" for="cpf">CNPJ</label>

                                            <input v-if="client.cpf" class="form-control" id="cpf" mask="000.000.000-00"
                                                name="cpf" v-model="client.cpf" placeholder="000.000.000-00" type="text"
                                                disabled>

                                            <input v-else class="form-control" id="cpf" mask="000.000.000-00" name="cpf"
                                                v-model="client.cnpj" placeholder="000.000.000-00" type="text" disabled>

                                        </div>
                                        <div class="form-group has-feedback col-6 col-sm-12 col-md-3">
                                            <label class="control-label" for="rg">RG/IE</label>
                                            <input class="form-control" id="rg" name="rg" v-model="client.rg"
                                                placeholder="RG/IE" type="text" disabled>
                                        </div>
                                        <div class="form-group has-feedback col-6 col-sm-12 col-md-3">
                                            <label for="data_nascimento">Data Nascimento</label>
                                            <input class="form-control" id="data_nascimento" mask="00/00/0000"
                                                name="data_nascimento" v-model="client.data_nascimento"
                                                placeholder="00/00/0000" type="text" disabled>
                                        </div>
                                        <div class="form-group has-feedback col-6 col-sm-12 col-md-3">
                                            <label for="telefone">Telefone</label>
                                            <input class="form-control" id="telefone" name="telefone"
                                                v-model="client.telefone" placeholder="(00) 99999-0000" disabled>
                                        </div>
                                        <div class="form-group has-feedback col-12 col-sm-12 col-md-6">
                                            <label class="control-label" for="email">E-mail</label>
                                            <input class="form-control" id="email" name="email" v-model="client.email"
                                                placeholder="exemplo@gmail.com" type="text" disabled>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                        <div class="col-12">
                            <hr>
                        </div>

                        <h4 class="mb-3 ml-0">
                            <span class="text-muted">Endereços de entrega</span>
                        </h4>

                        <ClientAdress />

                    </div>

                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    data() {
        return {
            idxAddress: 0,
            selectAddress: {},
            view: 'ORDERS',
            editAdress: false,
            menus: [
                {
                    id: 'ORDERS',
                    menu: 'Pedidos'
                },
                {
                    id: 'DATA',
                    menu: 'Dados Pessoais'
                }
            ]
        }
    },
	// middleware: 'authenticated',
    mounted() {
        this.initClient();
        this.getOrders();
    },
    computed: {
        ...mapGetters({
            client: 'client/getClient',
            orders: 'client/getOrders',
        }),
        closedOrderes(){
           return this.orders.filter(o=>{
                return !['Cancelado',"finalizado"].includes(o.status_pedido)
           })
        },
        openOrders(){
            return this.orders.filter(o=>{
                return ['Cancelado',"finalizado"].includes(o.status_pedido)
           })
        }
    },
    methods: {
        ...mapMutations({
            initClient: 'client/init'
        }),
        ...mapActions({
            getOrders: 'client/getOrders'
        }),
        setView(v) {
            this.view = v;
        },

    }
}

</script>

<style lang="scss" scoped>
.minha-conta {
    .segvia {
        svg {
            color: black;

            &:hover {
                color: var(--primary-color);
            }
        }

    }

    .card-endereco {

        * {
            transition: all 200ms;
        }

        &.active h5 {
            color: #fff !important;
        }

        &:hover svg {
            color: #fff !important;
        }
    }

    .card-title {
        font-size: medium;
    }

    .limit-text {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .nav-link {
        transition: all 500ms;
    }

    .btn {
        border: none;
        outline: none;

        &:hover {
            background-color: var(--primary-color);
        }

        &.active {
            background-color: var(--primary-color);
        }

        &.btn-outline-danger {

            &:hover {
                color: #fff;
                background-color: red;
            }
        }

        &.btn-info {
            &:hover {
                background-color: #6c757d;
            }
        }

    }

    .fake-link {
        cursor: pointer;
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

}
</style>