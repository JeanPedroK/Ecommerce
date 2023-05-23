<template>
    <!-- ADDRESS -->
    <form name="form" role="form" action="" method="post" class="validate row mr-0" >
        <!-- TAB-ADDRESS -->
        <div class="col-12 ml-0 mr-0">

            <div class="row adressList">
                <div v-for="(end, ed) in client.enderecos" :key="ed" @click="setAddress(ed)"
                    class="card-roud ml-3 btn card-endereco p-1 "
                    :class="{ 'shadow': (ed == idxAddress), 'active': (ed == idxAddress) }" style="max-width: 10rem;">
                    <div class="card-body p-2 limit-text">
                        <h5 class="card-title limit-text text-muted">
                            {{ end.nome }}
                        </h5>
                        <small class="text-muted">{{ end.logradouro }} {{ end.numero }},
                            {{ end.cidade }}/{{ end.estado }}</small>
                    </div>
                </div>

                <div @click="setAddress(null)" class="card-roud ml-3 btn card-endereco p-1"
                    :class="{ 'shadow': (idxAddress == client.enderecos.length), 'active': (idxAddress == client.enderecos.length) }"
                    style="max-width: 10rem;">
                    <div class="card-body p-2">
                        <h5 class="card-title limit-text text-muted">
                            Novo endereço
                        </h5>
                        <p>
                            <b-icon icon="plus-lg"></b-icon>
                        </p>
                    </div>
                </div>

            </div>
        </div>
        <!-- ADDRESS CONTENT -->
        <div class="row  mr-0 mr-1" style="margin-left:-3px">
            <div class="card-roud ml-3 mt-3 shadow card-endereco p-0 mr-2">

                <div class="p-1" style="display: flow-root;">
                    <span class="float-left" v-if="selectAddress.codigo > 0 && editAdress">
                        <button type="button" @click="deleteAddress()" class="btn btn-sm btn-outline-danger">Remover
                        </button>
                    </span>

                    <span class="float-right">
                        <button v-if="!editAdress" type="button" @click="toggleAdressEdit()"
                            class="btn btn-sm btn-info">Editar
                        </button>

                        <button v-if="editAdress" type="button" @click="toggleAdressEdit()"
                            class="btn  btn-sm btn-outline-danger">Cancelar
                        </button>

                        <button v-if="editAdress" type="button" class="btn btn-sm btn-success"
                            @click="saveAdress()">Salvar
                        </button>
                    </span>

                </div>

                <div class="card-body p-2 row">

                    <div class="form-group has-feedback col-12">
                        <label class="control-label" for="endereco.nome">Descrição</label>
                        <input type="text" class="form-control" id="endereco.nome" name="endereco.nome"
                            placeholder="Casa" :class="{ 'is-invalid': fieldError?.nome }" required
                            v-model="selectAddress.nome" :disabled="!editAdress">
                    </div>

                    <div class="form-group has-feedback col-6 col-sm-4">
                        <label class="control-label" for="cep">Cep</label>
                        <input type="text" class="form-control" id="cep" name="cep" placeholder="00000-000" required
                            :class="{ 'is-invalid': fieldError?.cep }" v-model="selectAddress.cep" @blur="changeCep"
                            mask="00000-000" :disabled="!editAdress">
                    </div>

                    <div class="form-group has-feedback col-6 col-sm-4">
                        <label class="control-label" for="estado">Estado</label>
                        <div class="controls">
                            <select required name="estado" id="estado" v-model="selectAddress.estado"
                                :class="{ 'is-invalid': fieldError?.estado }" class="custom-select w-100"
                                :disabled="!editAdress || validCep">
                                <option value="AC" id="AC">AC</option>
                                <option value="AL" id="AL">AL</option>
                                <option value="AM" id="AM">AM</option>
                                <option value="AP" id="AP">AP</option>
                                <option value="BA" id="BA">BA</option>
                                <option value="CE" id="CE">CE</option>
                                <option value="DF" id="DF">DF</option>
                                <option value="ES" id="ES">ES</option>
                                <option value="GO" id="GO">GO</option>
                                <option value="MA" id="MA">MA</option>
                                <option value="MG" id="MG">MG</option>
                                <option value="MS" id="MS">MS</option>
                                <option value="MT" id="MT">MT</option>
                                <option value="PA" id="PA">PA</option>
                                <option value="PB" id="PB">PB</option>
                                <option value="PE" id="PE">PE</option>
                                <option value="PI" id="PI">PI</option>
                                <option value="PR" id="PR">PR</option>
                                <option value="RJ" id="RJ">RJ</option>
                                <option value="RN" id="RN">RN</option>
                                <option value="RO" id="RO">RO</option>
                                <option value="RR" id="RR">RR</option>
                                <option value="RS" id="RS">RS</option>
                                <option value="SC" id="SC">SC</option>
                                <option value="SE" id="SE">SE</option>
                                <option value="SP" id="SP">SP</option>
                                <option value="TO" id="TO">TO</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group has-feedback col-12 col-sm-4">
                        <label class="control-label" for="cidade">Cidade</label>
                        <div required class="controls">
                            <input id="cidade" name="cidade" placeholder="Cidade" class="form-control"
                                :class="{ 'is-invalid': fieldError?.cidade }" data-rule-required="true" type="text"
                                v-model="selectAddress.cidade" :disabled="!editAdress || validCep">
                        </div>
                    </div>

                    <div class="form-group has-feedback col-12 col-sm-4">
                        <label class="control-label" for="bairro">Bairro</label>
                        <div class="controls">
                            <input required id="bairro" name="bairro" placeholder="Bairro" class="form-control"
                                :class="{ 'is-invalid': fieldError?.bairro }" data-rule-required="true" type="text"
                                v-model="selectAddress.bairro" :disabled="!editAdress || validCep">
                        </div>
                    </div>

                    <div class="form-group has-feedback col-8">
                        <label class="control-label" for="endereco">Rua</label>
                        <div class="controls">
                            <input required id="endereco" name="endereco" placeholder="Rua" class="form-control"
                                :class="{ 'is-invalid': fieldError?.logradouro }" data-rule-required="true" type="text"
                                v-model="selectAddress.logradouro" :disabled="!editAdress">
                        </div>
                    </div>

                    <div class="form-group has-feedback col-4 col-sm-4">
                        <label class="control-label" for="numero">Número</label>
                        <div class="controls">
                            <input required id="numero" name="numero" placeholder="Número" class="form-control"
                                type="text" :class="{ 'is-invalid': fieldError?.numero }" v-model="selectAddress.numero"
                                :disabled="!editAdress">
                        </div>
                    </div>

                    <div class="form-group has-feedback col-12 col-sm-8">
                        <label class="control-label" for="complemento">Complemento</label>
                        <div class="controls">
                            <input id="complemento" name="complemento" placeholder="Complemento" class="form-control"
                                data-rule-required="true" type="text" v-model="selectAddress.complemento"
                                :disabled="!editAdress">
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: 'clientAdress',
    data() {
        return {
            validCep: false,
            idxAddress: 0,
            selectAddress: {},
            view: 'DATA',
            editAdress: false,
            fieldError: {},
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
    computed: {
        ...mapGetters({
            client: 'client/getClient'
        }),
    },
    mounted() {
        this.$nextTick(() => {
            this.setAddress(0);
        });
        console.log("loadd client address");
        this.loadAddress();
    },
    methods: {
        ...mapActions({
            getCep: 'cart/checkCep',
            addAddress: 'client/addAddress',
            updateAddress: 'client/updateAddress',
            removeAddress: 'client/removeAddress',
            loadAddress: 'client/loadAddress'
        }),
        ...mapMutations({
            initClient: 'client/init'
        }),
        setView(v) {
            this.view = v;
        },
        setAddress(index) {

            if (index !== null && this.client.enderecos[index]) {

                this.idxAddress = index;
                this.selectAddress = { ...this.client.enderecos[index] };
                this.toggleAdressEdit(false);
                this.$emit('set-address', { address: this.selectAddress, index });
                return
            }

            index = this.client.enderecos.length;

            this.idxAddress = index;

            this.selectAddress = {
                codigo: 0,
                bairro: '',
                cep: '',
                cidade: '',
                complemento: '',
                estado: '',
                logradouro: '',
                nome: '',
                numero: '',
            };

            this.toggleAdressEdit(true);
        },
        async deleteAddress() {
            await this.removeAddress(this.selectAddress);

            this.editAdress = !this.editAdress;
            this.setAddress(0);

            this.$toast.show(`Endereço removido com sucesso!`);
        },
        async saveAdress() {

            var requiredFields = [
                'nome',
                'cep',
                'estado',
                'cidade',
                'bairro',
                'logradouro',
                'numero'
            ];

            let valid = true;

            for (const key of requiredFields) {

                this.fieldError[key] = false;

                if (this.selectAddress[key] == '') {
                    valid = false;
                    this.fieldError[key] = true;
                }
            }

            this.$forceUpdate();

            if (valid) {

                let address;

                console.log(this.selectAddress);

                if (this.selectAddress.codigo && this.selectAddress.codigo > 0 ) {
                    address = await this.updateAddress(this.selectAddress);
                } else {
                    address = await this.addAddress(this.selectAddress);
                }

                this.toggleAdressEdit(false);

                if (address?.erro) {
                    this.$toast.error(`Por favor, confira seus dados`);
                } else {
                    this.$toast.show(`Endereço atualizado com sucesso!`);
                }

            } else {
                this.$toast.error(`Por favor, informe os campos necessários`);
            }
        },
        toggleAdressEdit(val) {

            if (typeof val == 'undefined') {
                this.editAdress = !this.editAdress;

                if (!this.editAdress && this.selectAddress.codigo == 0) {
                    this.setAddress(this.client.enderecos.length - 1);
                }

            } else {
                this.editAdress = (!!val);
            }

            this.$emit('toggleEdit', this.editAdress);
        },
        async changeCep() {

            this.validCep = false;

            if (this.selectAddress.cep == '' || this.selectAddress.cep.length < 8) {
                this.$toast.info(`Informe um CEP valido... `);
                return
            }

            this.$toast.info(`Buscando CEP... `);

            let cep = await this.getCep(this.selectAddress.cep);

            if (!cep || cep?.erro) {

                this.$toast.error(`CEP invalido... `);

            } else {

                this.selectAddress.cepObject = cep;
                this.selectAddress.cidade = cep.localidade;
                this.selectAddress.estado = cep.uf;
                this.selectAddress.bairro = cep.bairro;
                this.selectAddress.logradouro = cep.logradouro;

                this.validCep = true;
            }

        }
    }
}


</script>


<style lang="scss" scoped>
.adressList {
    margin-bottom: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
    flex-wrap: nowrap !important;
    padding-bottom: 17px;
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
</style>