export const state = () => ({
	codpedido: 0,
	codcliente: 0,
	produtos: [],
	frete: null,
	valorTotal: 0,
	subTotal: 0,
	cep: '',
	cupom: '',
	desconto: 0,
	endereco: {},
	initialized: false
})

export const getters = {
	getProductsAmount(state) {
		let ammout = state.produtos.map(p => (p.qtd));

		if (ammout.length) {
			return ammout.reduce((a, b) => (a + b));
		}

		return 0;
	},
	getCart(state) {
		return { ...state };
	},
	getProducts(state) {
		return state.produtos;
	}
}

export const mutations = {
	calcCart(state, options = {}) {

		state.produtos = state.produtos.map((p) => {
			p.valorTotal = p.valor * p.qtd;
			return p;
		});

		if (state.produtos.length == 0) {
			state.desconto = 0;
			state.cupom = {};
			state.frete = {};
			state.subTotal = 0;
			state.valorTotal = 0;
		}

		let subTotal = state.produtos.map((p) => (parseFloat(p.valorTotal || 0)));

		if (subTotal.length) {
			subTotal = subTotal.reduce((a, b) => (a + b));
		} else {
			subTotal = parseFloat(0);
		}

		state.subTotal = parseFloat(subTotal).toFixed(2);

		state.valorTotal = state.subTotal;

		this.commit("cart/calcDiscount", options);

		if (state.frete && state.frete.valor) {
			subTotal = parseFloat(subTotal) + parseFloat(state.frete.valor);
			state.valorTotal = parseFloat(subTotal).toFixed(2);
		}

		if (parseFloat(state.desconto) > 0) {
			subTotal = parseFloat(subTotal) - parseFloat(state.desconto)
			state.valorTotal = parseFloat(subTotal).toFixed(2);
		}

		this.$cookies.set('cart', state, {
			path: '/',
			maxAge: (15 * 24 * 60 * 60 * 1000)
		});

	},
	calcDiscount(state, options) {

		state.desconto = 0;

		if (!state.cupom?.codigo) {
			return;
		}

		let valido = true;
		let valor = parseFloat(state.cupom.valor);
		let sub = state.subTotal;
		let cupom = state.cupom;

		function fixNbr(val) {
			return parseFloat(val);
		}

		const rules = cupom.rules || [{ field: cupom.campo, type: cupom.condicao, value: cupom.valor_condicao }];

		const fields = [
			state.subTotal,
			state.subTotal,
			state.frete?.valor,
		];

		const types = {
			'1': (field, value) => {
				if (fixNbr(field) >= fixNbr(value)) return valido;
				return false;
			},
			'2': (field, value) => {
				if (fixNbr(field) <= fixNbr(value)) return valido;
				return false;
			},
			'3': (field, value) => {
				if (fixNbr(field) == fixNbr(value)) return valido;
				return false;
			},
		};

		for (const r of rules) {
			valido = types[r.type](fields[r.field], r.value);
			if (valido == false) {
				break
			}
		}

		if (valido) {

			if (cupom.campo_alvo == '1') {

				sub = state.subTotal

			} else if (cupom.campo_alvo == '2') {

				sub = state.frete?.valor || 0;
			}

			if (cupom.tipo_valor == '2') {

				valor = (parseFloat(valor) * parseFloat(sub)) / 100;

			}

			if (parseFloat(valor) > parseFloat(sub)) {

				valor = parseFloat(sub);
			}
			if (options.showToast) this.$toast.show(`Cupom (${cupom.cupom}) aplicado com sucesso! `);

			state.desconto = valor;

			return state.desconto;
		}

		if (options.showToast) this.$toast.error(`Cupom (${cupom.cupom}) não atende aos requisitos. `);

		return state.desconto;
	},
	async updateField(state, { key, value }) {

		state[key] = value;

		this.$cookies.set('cart', state, {
			path: '/',
			maxAge: (15 * 24 * 60 * 60 * 1000)
		});
	},
	async initCart(state) {

		if (state.initialized) return
		state.initialized = true;

		const cart = this.$cookies.get('cart', { parseJSON: true })

		if (cart) {
			for (const key in cart) {
				if (Object.hasOwnProperty.call(state, key)) {
					state[key] = cart[key];
				}
			}
		}

		this.dispatch('cart/clientCheck');

		if (state.codpedido == 0) {
			await this.dispatch('cart/initCart');
		}
	},
	pushProduct(state, prod) {
		state.produtos.push(prod);
	},
	async addToCart(state, { prod, callback }) {

		let product = { ...prod };

		if (product.qtd < 1) {
			this.$toast.info('Selecione a quantidade desejada!')
			return
		}

		if (!product.tamanho?.codigo) {
			this.$toast.info('Selecione o tamanho desejado!')
			return
		}

		if (!product.cor?.codigo) {
			this.$toast.info('Selecione a cor desejada!')
			return
		}

		const has = state.produtos.find((p) => {
			return p.codigo == product.codigo && p.tamanho.codigo == product.tamanho.codigo && p.cor.codigo == product.cor.codigo;
		});

		if (has) {

			const i = state.produtos.indexOf(has);

			state.produtos[i].qtd += product.qtd;

			let itpe;

			if (state.produtos[i]?.itpe) {
				const { codigo } = this.dispatch('cart/udpateQtdItem', { ...state.produtos[i] });
				itpe = codigo;
			} else {
				const { codigo } = this.dispatch('cart/addProductToCart', { ...state.produtos[i] });
				itpe = codigo;
			}

			state.produtos[i].itpe = codigo;

		} else {

			const { codigo } = await this.dispatch('cart/addProductToCart', { ...prod });

			this.commit("cart/pushProduct", { ...prod, itpe: codigo });

		}

		this.$toast.show(`Produto (${product.titulo}) adicionado ao cart`);

		this.commit("cart/calcCart");

		callback();
	},
	removeFromCart(state, index) {

		const prod = state.produtos[index];

		console.log(prod?.itpe);
		if (prod?.itpe) {
			this.dispatch('cart/removeItem', { ...prod });
		}

		state.produtos.splice(index, 1);

		this.commit('cart/calcCart');
	},
	updateQtdProd(state, { index, qtd }) {

		state.produtos[index].qtd = parseFloat(qtd, 10);

		this.commit('cart/calcCart');
	},
	setCupom(state, cupom) {

		state.cupom = cupom;

		this.commit('cart/calcCart', { showToast: true });
	},
	setFrete(state, frete) {
		state.frete = frete;
		this.commit('cart/calcCart');
	},
	async addProdQtd(state, index) {
		state.produtos[index].qtd++;

		this.commit("cart/calcCart");
		this.dispatch('cart/udpateQtdItem', { ...state.produtos[index] });
	},
	async subProdQtd(state, index) {

		state.produtos[index].qtd--;

		if (state.produtos[index].qtd <= 0) {
			state.produtos[index].qtd = 1;
		}

		this.commit("cart/calcCart");
		this.dispatch('cart/udpateQtdItem', { ...state.produtos[index] });
	},
	reinit(state) {

		state.codpedido = 0;
		state.codcliente = 0;
		state.produtos = [];
		state.frete = null;
		state.valorTotal = 0;
		state.subTotal = 0;
		state.cep = '';
		state.cupom = '';
		state.desconto = 0;
		state.endereco = {};
		state.initialized = false;

		this.$cookies.set('cart', state, {
			path: '/',
			maxAge: (15 * 24 * 60 * 60 * 1000)
		});

		this.commit('cart/initCart');
	},
	setClient(state, codcliente) {

		state.codcliente = codcliente

		this.$cookies.set('cart', state, {
			path: '/',
			maxAge: (15 * 24 * 60 * 60 * 1000)
		});
	}
}

var initializing = false;

export const actions = {
	async initCart(state) {

		if (initializing) return;

		initializing = true;

		if (state.codpedido > 0) {
			return state.codpedido
		}

		console.log('initialize cart');

		const { codigo } = await this.dispatch('api/get', { base: '/cart', path: "/new" }, { root: true });

		if (parseInt(codigo, 10) > 0) {
			this.commit('cart/updateField', { key: 'codpedido', value: parseInt(codigo, 10) });
		}

		initializing = false;
	},
	async getCupom(state, cupom) {
		const res = await this.dispatch('api/get', { base: '/cupom', params: { cupom } }, { root: true });
		return res.cupom;
	},
	async checkCep(state, cep) {
		const ccep = await this.dispatch('api/get', { base: '/Adress/cep/' + cep }, { root: true });
		return ccep;
	},
	async getFrete({ state }, { cep }) {
		const fft = await this.dispatch('api/post', { base: '/cart/calculaFrete/', path: state.codpedido, body: { cep } }, { root: true });
		return fft;
	},
	async clientCheck({ state, commit, rootState }, ssta) {

		const client = rootState.client;

		if (!state.initialized && !client.initialized) return

		if (state.codcliente > 0 && state.codcliente != client.codigo) {
			commit('reinit');
			return
		}

		if (state.codcliente == 0 && client.codigo > 0) {

			const cck = await this.dispatch('api/patch', { base: '/cart/' + state.codpedido, body: { cod_cliente : client.codigo } }, { root: true })

			if (cck) {
				commit('setClient', client.codigo);
			}
		}
	},
	addProductToCart({ state }, prod) {
		return this.dispatch('api/post', { base: '/Cart/' + state.codpedido, path: '/item/', body: { prod } }, { root: true })
	},
	removeItem({ state }, prod) {
		return this.dispatch('api/delete', { base: '/Cart/' + state.codpedido, path: '/item/' + prod.itpe }, { root: true })
	},
	udpateQtdItem({ state }, prod) {
		return this.dispatch('api/patch', { base: '/Cart/' + state.codpedido, path: '/item/' + prod.itpe, body: { prod } }, { root: true })
	}
}