<template>
    <div class="bgList">
        <div class="container confirm">
            <div class="row p-3">
                <div class="card-roud shadow col-12 p-3">
                    <span class="text-secondary">
                        <b-icon icon="caret-right-fill"></b-icon> CENTRAL DO CLIENTE
                    </span>
                </div>
            </div>
            <div class="row">
                <div class="col-12 mb-5 mt-5 text-center">
                    Estamos validando o seu e-mail aguarde! ...
                </div>
            </div>

        </div>
    </div>
</template>


<script>
import { mapActions, mapMutations } from 'vuex';
export default {
    data() {
        return {

        }
    },
    async mounted() {

        const { email, pass } = this.$route.params;

        let res = await this.validaCli({ email, pass });

        if (res && !res?.error) {

            this.setToken(res.token);

            this.setClient(res.user);

            this.$router.push({
                path: '/minha-conta'

            })
        } else {
            this.$toast.error(`Erro ao cadastrar sua conta, verifique suas informações e tente novamente!`);
        }


    },
    methods: {
        ...mapActions({
            validaCli: 'client/validaCliente'
        }),
        ...mapMutations({
            setToken: 'client/setToken',
            setClient: 'client/setClient'
        })
    }
}
</script>


<style lang="scss" scoped>
.confirm {
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