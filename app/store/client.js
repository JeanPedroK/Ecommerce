export const state = () => ({
    codigo: 0,
    data_cadastro: '',
    ativo: '',
    nome: '',
    email: '',
    pessoa: '',
    cpf: '',
    rg: '',
    cnpj: '',
    data_nascimento: '',
    telefone: '',
    cep: '',
    endereco: '',
    bairro: '',
    numero: '',
    complemento: '',
    cidade: '',
    estado: '',
    senha: '',
    enderecos: [],
    initialized: false,
    orders: []
})

export const getters = {
    getAdresses(state) {
        return state.enderecos;
    },
    getClient(state) {
        return state;
    },
    getOrders(state) {
        return state.orders
    }
}

export const mutations = {
    setClient(state, user) {

        if (user) {

            user.codigo = parseInt(user.codigo, 10)
            for (const key in user) {
                if (Object.hasOwnProperty.call(state, key)) {
                    state[key] = user[key];
                }
            }

            this.dispatch('cart/clientCheck', user);

            this.$cookies.set('client', { ...state }, {
                path: '/',
                maxAge: (24 * 60 * 60 * 1000)
            });
        }
    },
    logout(state) {
        const emptyState = {
            codigo: 0,
            data_cadastro: '',
            ativo: '',
            nome: '',
            email: '',
            pessoa: '',
            cpf: '',
            rg: '',
            cnpj: '',
            data_nascimento: '',
            telefone: '',
            cep: '',
            endereco: '',
            bairro: '',
            numero: '',
            complemento: '',
            cidade: '',
            estado: '',
            senha: '',
            enderecos: [],
            initialized: false,
        }

        for (const key in emptyState) {
            if (Object.hasOwnProperty.call(state, key)) {
                state[key] = emptyState[key];
            }
        }

        this.$cookies.set('client', state, {
            path: '/',
            maxAge: (24 * 60 * 60 * 1000)
        });

        this.$router.push({
            path: '/'
        });

        this.$cookies.remove('token', state, {
            path: '/'
        });

        this.dispatch('cart/clientCheck', state);

    },
    update(state) {
        state.initialized = false;
        this.commit('client/init');
    },
    async init(state) {

        if (state.initialized) return
        state.initialized = true;

        const token = this.$cookies.get('token');
        const client = this.$cookies.get('client', { parseJSON: true });

        if ((token && token != '') && (client && client.codigo)) {

            this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })

            const client = await this.dispatch('api/get', { base: '/client', secure: true }, { root: true });

            this.commit('client/setClient', client);
        }
    },
    setToken(state, token) {
        this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })
        this.$cookies.set('token', token, {
            path: '/',
            maxAge: (24 * 60 * 60 * 1000)
        });
    },
    setOrders(state, orders) {
        state.orders = orders;
    },
    setAddress(state, enderecos) {
        state.enderecos = enderecos;
    },
}

export const actions = {
    async login({ state, commit }, { user, pass, callback }) {

        try {
            const userData = await this.dispatch('api/post', { base: 'Client/Auth/', body: { user, pass } }, { root: true });

            console.log(userData);

            if (userData?.token) {
                commit("setToken", userData.token);
            }

            if (userData) {
                commit("setClient", userData);
                if (callback) callback(userData);
            }
        } catch (error) {
            this.$toast.error(`E-mail ou senha inválido`);
        }

    },
    async authenticated({ commit }) {

        const token = this.$cookies.get('token');
        const client = this.$cookies.get('client', { parseJSON: true });

        console.log({ token }, { client });

        if ((token && token != '') && (client && client.codigo)) {

            try {

                this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })

                // const auth = await this.dispatch('api/get', { base: '/me/' }, { root: true });
                const auth = await this.dispatch('api/get', { base: '/me/' }, { root: true });

                console.log({ auth });

                if (!auth.token) {
                    this.$cookies.remove('token');
                } else {
                    commit('setToken', auth.token);
                }

                return auth.token

            } catch (error) {
                this.commit('api/removeHeaders', { name: 'Authorization' });

                return false;
            }
        }

        this.commit('api/removeHeaders', { name: 'Authorization' });

        return false;
    },
    async loadAddress({ state, commit }) {

        const { enderecos } = await this.dispatch('api/get', { base: '/client/', secure: true }, { root: true });

        console.log(enderecos);

        commit('setAddress', enderecos);

    },
    async create({ state, commit }, client) {

        const token = this.$cookies.get('token');
        this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })

        const response = await this.dispatch('api/post', { base: '/client/', body: { client } }, { root: true });

        return response;
    },
    async addAddress({ state, commit }, address) {

        address.endereco = address.logradouro;

        const token = this.$cookies.get('token');
        this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })

        const response = await this.dispatch('api/post', { base: '/client/', path: `${state.codigo}/address/`, body: { address } }, { root: true });
        commit('update');

        return response;
    },
    async removeAddress({ state, commit }, address) {

        address.endereco = address.logradouro;

        const token = this.$cookies.get('token');
        this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` });

        const response = await this.dispatch('api/delete', { base: '/client/', path: `${state.codigo}/address/${address.codigo}`, secure: true }, { root: true });
        commit('update');

        return response;
    },
    async updateAddress({ state, commit }, address) {

        address.endereco = address.logradouro;

        const token = this.$cookies.get('token');
        this.commit('api/setHeaders', { name: 'Authorization', value: `Bearer ${token}` })

        const response = await this.dispatch('api/put', { base: '/client/', path: `${state.codigo}/address/${address.codigo}`, body: { address }, secure: true }, { root: true });
        commit('update');

        return response;
    },
    async checkEmail({ state }, email) {
        return await this.dispatch('api/get', { base: '/clients/hasEmail/', path: email }, { root: true });
    },
    async addClient({ state }, cliente) {
        return await this.dispatch('api/post', { base: '/client/', body: { cliente } }, { root: true });
    },
    async validaCliente({ state }, confirm) {
        return await this.dispatch('api/post', { base: '/client/valida', body: { cliente: confirm } }, { root: true });
    },
    async resetPassClient({ state }, code) {
        return await this.dispatch('api/post', { base: '/client/reset_pass', body: { code } }, { root: true });
    },
    async newPassClient({ state }, { cliente }) {
        return await this.dispatch('api/post', { base: '/client/new_pass/', body: { cliente } }, { root: true });
    },
    async recoverPassword({ state }, email) {
        return await this.dispatch('api/post', { base: '/client/recover', body: { email } }, { root: true })
    },
    async getOrders({ state, commit }) {
        const orders = await this.dispatch('api/get', { base: '/order', secure: true }, { root: true });
        commit('setOrders', orders);
        return orders;
    },
    async getOrder({ state }, id) {
        const orders = await this.dispatch('api/get', { base: '/order/', path: id, secure: true }, { root: true });
        return orders;
    }
}