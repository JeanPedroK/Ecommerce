<template>
    <div class="bgList">
        <div class="container novasenha">
            <div class="row md-3 p-3 mr-0">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> REDEFINIR SENHA
                    </span>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-4"></div>
                <div class="col-12 col-sm-4">
                    <div>
                        <form id="loginForm">
                            <div class="row card-roud shadow col-12 p-3 mb-3">
                                <div class="form-group col-12">
                                    <label class="control-label" for="email">E-mail</label>
                                    <input type="text" id="email" class="form-control-plaintext" readonly
                                        v-model="pwClient.email">
                                </div>
                                <div class="form-group col-12">
                                    <label for="senha" class="control-label">Senha:</label>
                                    <input :class="{'is-invalid': fieldError?.senha }" type="password" name="senha"
                                        id="senha" class="form-control" placeholder="senha" minlength="6"
                                        data-rule-maxlength="50" v-model="pwClient.senha">
                                </div>
                                <div class="form-group col-12">
                                    <label for="conf_senha" class="control-label">Confirmar senha:</label>
                                    <input :class="{'is-invalid': pwClient.senha != pwClient.conf_senha || fieldError?.conf_senha }
                                    " type="password" name="conf_senha" id="conf_senha" class="form-control"
                                        placeholder="Confirmar senha" v-model="pwClient.conf_senha">
                                </div>
                                <div class="col-12 text-center">
                                    <b-button class="btn-success" @click="newPassword()" :disabled="submited">
                                        Salvar
                                    </b-button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
    data() {
        return {
            code: '',
            pwClient: {
                email: '',
                senha: '',
                conf_senha: '',
            },
            fieldError: {},
            submited: false,
        }
    },
    async mounted() {

        if (this.$route.params?.code) {
            this.code = this.$route.params.code;

            try {
                const data = await this.resetPassClient(this.code);


                if (data?.error) {

                    this.$router.push({
                        path: '/'
                    });
                    return
                }

                this.pwClient.email = data.email
            } catch (error) {
                this.$toast.error(`Link inválido ou expirado`);

                this.$router.push({
                    path: '/'
                });
                return
            }

        } else {

            this.$toast.error(`Link inválido ou expirado`);

            this.$router.push({
                path: '/'
            });
        }

    },
    methods: {
        ...mapActions({
            resetPassClient: 'client/resetPassClient',
            newPassClient: 'client/newPassClient'
        }),
        ...mapMutations({
            setToken: 'client/setToken',
            setClient: 'client/setClient'
        }),
        async newPassword() {

            let valid = true;


            var requiredFields = [
                'senha',
                'conf_senha',
            ];


            for (const key of requiredFields) {

                this.fieldError[key] = false;

                if (this.pwClient[key] == '') {
                    valid = false;
                    this.fieldError[key] = true;
                }
            }


            if (valid) {

                var nwPass = await this.newPassClient({
                    code: this.code,
                    cliente: this.pwClient
                });

                this.$toast.info(`Nova senha cadastrada com sucesso!`);

                if (nwPass && !nwPass?.error) {

                    this.setToken(nwPass.token);

                    this.setClient(nwPass.user);

                    this.$router.push({
                        path: '/minha-conta'

                    })

                }

            }

            this.submited = false;

        }
    }
}


</script>

<style lang="scss">
.novasenha {
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