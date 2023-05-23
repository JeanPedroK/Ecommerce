<template>
    <div class="bgList">
        <div class="container cadastro">
            <!-- CABECARIO -->
            <div class="row p-3 mr-0" style="margin-left: -17px;margin-right: 0px;">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> MINHA CONTA / CADASTRO
                    </span>
                </div>
            </div>
            <div class="wizard card-round shadow" style="max-width:300px;">
                <div class="wizard-inner">
                    <div class="connecting-line"></div>
                    <div class="connecting-line-progress"
                        :style="{ width: (((step) * 100) / 2) + (step >= 1 ? 0 : 23) + '%' }">
                    </div>
                    <ul class="nav nav-tabs col-12" style="margin-top: -15px;" role="tablist">
                        <li role="presentation col-6" class="nav-item" style="margin-left: 30px;">
                            <a data-toggle="tab" aria-controls="step1" role="tab" title="Step 1" class="nav-link disabled"
                                :class="{ active: (step >= 0) }">
                                <span class="round-tab" :class="{ shadow: (step == 0) }">
                                    <b-icon icon="person-lines-fill" shift-v="2"></b-icon>
                                </span>
                            </a>
                        </li>
                        <li role="presentation col-6" class="nav-item" style="margin-left: 120px;">
                            <a data-toggle="tab" aria-controls="step2" role="tab" title="Step 2" class="nav-link disabled"
                                :class="{ active: (step >= 1) }">
                                <span class="round-tab" :class="{ shadow: (step == 1) }">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                        class="bi bi-house-heart" viewBox="0 0 16 16" style="margin-bottom: 15px;">
                                        <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z" />
                                        <path
                                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                                    </svg>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- PESSOA -->
            <form class="row ml-0" v-if="step == 0">
                <div class="col-12">
                    <div class="row col-12 card-roud shadow p-2 justify-content-sm-center">
                        <div class="form-group has-feedback col col-12 col-md-6">
                            <label class="control-label" for="nome">Nome
                                Completo</label> /
                            <label class="control-label" for="nome">Razão
                                Social</label>
                            <div class="controls">
                                <input id="nome" name="nome" placeholder="Nome Completo" class="form-control" required
                                    formControlName="nome" type="text" v-model="client.name"
                                    :class="{ 'is-invalid': fieldError?.name }" />
                            </div>
                        </div>

                        <div class="form-group col col-12 col-md-6">
                            <label class="control-label" for="cpf">CPF / CNPJ</label>
                            <input id="cpf" name="cpf" formControlName="cpf" type="text" class="form-control" required
                                placeholder="000.000.000-00" v-model="client.cpf"
                                v-mask="['###.###.###-##', '##.###.###/####-##']" :class="{ 'is-invalid': fieldError?.cpf }"
                                @blur="checkDocmentNumber()" />
                        </div>

                        <div class="form-group has-feedback col col-12 col-md-4">
                            <label class="control-label" for="rg">RG/IE</label>
                            <input id="rg" name="rg" placeholder="RG/IE" class="form-control" type="text" required
                                formControlName="rg" v-model="client.rg" :class="{ 'is-invalid': fieldError?.rg }"
                                v-mask="['###.###.###-##', '###.###.###.###-#', '##.###.###', '#.###.###']" />
                        </div>

                        <div class="form-group has-feedback col col-12 col-md-8">
                            <label class="control-label" for="email">E-mail</label>
                            <input id="email" name="email" placeholder="exemplo@gmail.com" formControlName="email" required
                                class="form-control" type="email" value="" v-model="client.email"
                                :class="{ 'is-invalid': fieldError?.email }" />
                        </div>

                        <div class="form-group has-feedback col col-12 col-md-4">
                            <label for="data_nascimento">Data de Nascimento</label>
                            <input id="data_nascimento" name="data_nascimento" formControlName="data_nascimento" required
                                placeholder="00/00/0000" class="form-control" type="tel" v-mask="'##/##/####'"
                                v-model="client.data_nascimento" :class="{ 'is-invalid': fieldError?.data_nascimento }" />
                        </div>

                        <div class="form-group has-feedback col col-12 col-md-4">
                            <label for="senha" class="control-label">Senha: </label>
                            <input type="password" name="senha" id="senha" class="form-control senha1 valida" required
                                placeholder="Senha" formControlName="senha" data-rule-minlength="5" data-rule-maxlength="50"
                                data-rule-confsenha="true" v-model="client.senha"
                                :class="{ 'is-invalid': fieldError?.senha }" />
                        </div>

                        <div class="form-group has-feedback col col-12 col-md-4">
                            <label for="conf_senha" class="control-label">Confirmar senha: </label>
                            <input :class="{ 'is-invalid': client.senha != client.conf_senha || fieldError?.conf_senha }
                            " type="password" name="conf_senha" id="conf_senha" class="form-control senha2" required
                                placeholder="Confirmar senha" formControlName="conf_senha" v-model="client.conf_senha" />
                        </div>

                        <div class="form-group has-feedback col-4">
                            <label for="telefone">Telefone</label>
                            <input id="telefone" name="telefone" placeholder="(00) 99999-9999" class="form-control" required
                                formControlName="telefone" v-model="client.telefone"
                                v-mask="['(##) ####-####', '(##) #####-####']"
                                :class="{ 'is-invalid': fieldError?.telefone }" />
                        </div>
                    </div>
                </div>
            </form>

            <!-- ENDEREÇO -->
            <ClientAdress v-if="step == 1" style="padding-bottom: 50px;" />


            <div class="col-12 row mt-4 ml-0 term pb-2" v-if="step == 0">
                <div class="row col-12 card-roud shadow p-3">
                    <div class="form-group form-check col-12">
                        <div class="col-12">
                            <input type="checkbox" formControlName="acceptTerms" id="acceptTerms" v-model="terms"
                                class="form-check-input" :class="{ 'is-invalid': fieldError.terms }" />
                            <label for="acceptTerms" class="form-check-label" style="color:black"> Estou ciente de que
                                os meus dados
                                serão processador de acordo com a
                                <nuxt-link :to="'/sobre/Privacidade'">
                                    Política de Privacidade
                                </nuxt-link>
                            </label>
                        </div>
                    </div>
                    <div class="text-center col-12">
                        <button class="float-left btn btn-outline-danger" type="reset">
                            Limpar
                        </button>
                        <button type="button" @click="next()" class="float-right btn btn-outline-success md-2"
                            :disabled="!terms">
                            Cadastrar Endereço
                        </button>
                    </div>
                </div>
            </div>

            <!-- TERMOS DE USO -->
            <div class="col-12 row mt-4 ml-0 term pb-2" v-if="step == 1">
                <div class="row col-12 card-roud shadow p-3">
                    <div class="text-center col-12">
                        <button type="button" @click="next()" class="btn btn-outline-success md-2"
                            :disabled="!getAddress.length">
                            CONCLUIR CADASTRO
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { checkCpf, cnpjValidation } from '~/plugins/documentValidator';

export default {
    data() {
        return {
            submitted: false,
            client: {
                name: '',
                cpf: '',
                rg: '',
                email: '',
                data_nascimento: '',
                senha: '',
                conf_senha: '',
                telefone: '',
            },
            fieldError: {},
            step: 0,
            terms: false,
        }
    },
    middleware: 'authenticated',
    computed: {
        ...mapGetters({
            getAddress: 'client/getAdresses'
        })
    },
    methods: {
        ...mapMutations({
            setToken: 'client/setToken',
            setClient: 'client/setClient'
        }),
        ...mapActions({
            createClient: 'client/create'
        }),
        async createNewClient() {

            var requiredFields = [
                'name',
                'cpf',
                'rg',
                'email',
                'data_nascimento',
                'senha',
                'conf-senha',
                'telefone'
            ];

            let valid = true;

            for (const key of requiredFields) {

                this.fieldError[key] = false;

                if (this.client[key] == '') {
                    valid = false;
                    this.fieldError[key] = true;
                }
            }


            if (!this.terms) {
                this.fieldError.terms = true;
                valid = false;
            }


            if (valid) {

                this.$nuxt.$loading.start();

                this.$toast.info(`Cadastrando cliente..`);

                try {
                    const user = await this.createClient(this.client);

                    this.setToken(user.token);

                    this.setClient(user);

                    this.$nuxt.$loading.finish();

                } catch (error) {
                    this.$forceUpdate();
                    this.$toast.error(`Houve um erro ao cadastrar o cliente, por favor tente mais tarde.`);
                    return false;
                }

                return true;

            } else {
                this.$forceUpdate();
                this.$toast.error(`Por favor, informe os campos necessários`);
                return false;
            }
        },

        async next() {

            if (this.step == 0) {

                if (await this.createNewClient()) this.step++;



            } else if (this.step == 1) {

                let path = this.$route.query.r;

                if (!path) {
                    path = 'minha-conta';
                }

                path = `/${path}`;

                this.$router.push({ path });
            }

        },
        checkDocmentNumber() {

            if (this.client.cpf.length <= 17) {

                let res = checkCpf(this.client.cpf);

                if (res === false) {
                    this.fieldError.cpf = true;
                    this.$toast.error(`CPF informado inválido!`);
                    this.$forceUpdate();
                }

            } else if (this.client.cpf.length >= 18) {

                let res = cnpjValidation(this.client.cpf);

                if (res === false) {
                    this.fieldError.cpf = true;
                    this.$toast.error(`CNPJ informado inválido!`);
                    this.$forceUpdate();

                }
            }


        }
    },

}
</script>
<style lang="scss" scoped>
.cadastro {
    .term {
        margin-left: -15px;
        max-width: 102%;
        width: 1125px;
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

    .wizard {
        margin: 20px auto;
        background: #fff;
        border-radius: 5px;

        >div {
            &.wizard-inner {
                position: relative;
            }
        }

        .nav-tabs {
            margin: 40px auto;
            position: relative;
            margin-bottom: 0;
            border-bottom-color: #e0e0e0;

            >li {
                width: 20%;

                a {
                    width: 50px;
                    height: 50px;
                    margin: 20px auto;
                    border-radius: 100%;
                    padding: 0;
                    position: relative;

                    &:hover {
                        background: transparent;
                    }
                }

                &.active {
                    >a {
                        cursor: default;
                        border: 0;
                        border-bottom-color: transparent;

                        &:hover {
                            cursor: default;
                            border: 0;
                            border-bottom-color: transparent;
                        }

                        &:focus {
                            cursor: default;
                            border: 0;
                            border-bottom-color: transparent;
                        }
                    }
                }
            }
        }


        li {
            a {

                &.active span.round-tab {
                    background: #fff;
                    border: 2px solid var(--first-color);
                    color: var(--first-color);
                }

                &:after {
                    content: " ";
                    position: relative;
                    left: 46%;
                    top: -20px;
                    opacity: 0;
                    margin: 0 auto;
                    bottom: 0px;
                    border: 5px solid transparent;
                    border-bottom-color: var(--first-color);
                    transition: 0.1s ease-in-out;
                }
            }

            &.active.nav-item:after {
                content: " ";
                position: relative;
                left: 46%;
                top: -20px;
                opacity: 1;
                margin: 0 auto;
                bottom: 0px;
                border: 10px solid transparent;
                border-bottom-color: var(--first-color);
            }
        }

        .tab-pane {
            position: relative;
            padding-top: 50px;
        }

        h3 {
            margin-top: 0;
        }
    }

    .connecting-line {
        height: 2px;
        background: #a0a0a0;
        position: absolute;
        width: 25%;
        margin: 0 auto;
        left: 70px;
        right: 0;
        top: 50%;
        z-index: 1;
    }

    .connecting-line-progress {
        height: 2px;
        background: var(--first-color);
        position: absolute;
        width: 22%;
        left: 27%;
        right: 0;
        top: 50%;
        z-index: 1;
    }

    span {
        &.round-tab {
            width: 50px;
            height: 50px;
            line-height: 50px;
            display: inline-block;
            border-radius: 100px;
            background: #fff;
            border: 2px solid #a0a0a0;
            z-index: 2;
            position: absolute;
            left: 0;
            text-align: center;
            font-size: 25px;
        }
    }

    .nav-link.active {
        border-color: transparent;
    }

}
</style>