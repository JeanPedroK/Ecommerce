export const state = () => ({
    menus: []
})

export const getters = {
    getMenus(state) {
        return state.menus
    }
}

export const mutations = {

}

export const actions = {
    async getMenus(state) {
        const res = await this.dispatch('api/get', { base: '/menus', path: "" }, { root: true });
        state.menus = res;
        return state.menus;
    }
}