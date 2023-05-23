export const state = () => ({
    produto: []
})

export const getters = {
    getProduto(state) {
        return state.produto
    }
}

export const mutations = {
	setSugest(state, sugeridos){
		state.sugeridos = sugeridos;
	},
	setProduct(state, product){
		state.product = product;
	}
}

export const actions = {
    getSubCategory({ state }, code) {
        return this.dispatch('api/get', { base: '/Subcategory/', path: code }, { root: true });
    },
    getProdutos({ state }, code) {
        return this.dispatch('api/get', { base: '/Product', path: code }, { root: true });
    },
    async getProduto({ commit }, code) {

        code = `/${code}`;

        const res = await this.dispatch('api/get', { base: '/Product', path: code }, { root: true });

        return res;
    },
    async getSugeridos({ commit }, code) {

        code = `/${code}/Sugested`;

        let sugeridos = await this.dispatch('api/get', { base: '/Product', path: code }, { root: true });

        if (!Array.isArray(sugeridos)) sugeridos = [sugeridos];

		commit('setSugest', sugeridos);
		
        return sugeridos;
    }
}