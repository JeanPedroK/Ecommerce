export const state = () => ({
    textos: {}
})

export const getters = {
    getText(state) {
        return state.menus
    }
}

export const mutations = {

}

export const actions = {
    async getText(state, tela) {
        const { texto: { texto } } = await this.dispatch('api/post', { base: '/textos', body: { texto: tela } }, { root: true });
        return texto;
    }
}