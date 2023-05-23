export const state = () => ({
    produtos: []
})

export const getters = {
    getProdutos(state) {
        return state.produtos
    }
}

export const mutations = {

}

export const actions = {
    async getProdutos(state, categoria) {

        categoria = `/Category/${categoria}`
        const res = await this.dispatch('api/get', { base: '/produtos', path: categoria }, { root: true });
        return res;
    }
}