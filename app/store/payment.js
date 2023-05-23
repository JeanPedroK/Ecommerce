export const state = () => ({
  sessionid: 0,
  amount: 0.0,
  nameCard: "",
  senderHash: "",
  cardNumber: "",
  hashCard: '',
  cvv: "",
  expirationMonth: "",
  expirationYear: "",
  brandCard: "",
  installments: [],
  imgCardBase:
    "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/",
  brandCardImg:
    "https://stc.pagseguro.uol.com.br/public/img/payment-methods-flags/68x30/mastercard.png",
  isValidCard: false,
  installment: {},
});

export const getters = {
  brandCardName(state) {
    return state.brandCard;
  },
  brandCard(state) {
    return state.brandCardImg;
  },
  isValidCard(state) {
    return state.isValidCard;
  },
  getInstallments(state) {
    return state.installments;
  },
  getInstallment(state) {
    return state.installment;
  },
  getSanderHash(state) {
    return state.senderHash;
  }
};

export const mutations = {
  async init(state) { },
  setState(state, { name, value }) {

    if (name == "cardNumber") {
      this.dispatch("payment/getBrand", {
        cardNumber: value,
      });
    }

    if (state) {
      state[name] = value;
    }

  },
  setSessionID(state, sessionid) {
    window.pGatway.setSessionId(sessionid);
    state.sessionid = sessionid;
  },
  setSenderHash(state, senderHash) {
    state.senderHash = senderHash;
  },
  setBrandCard(state, brand) {
    state.brandCard = brand;
    state.brandCardImg = `${state.imgCardBase}${brand}.png`;
  },
  setcardNumber(state, cardNumber) {
    state.cardNumber = cardNumber;
  },
  setAmount(state, amount) {
    state.amount = amount;
  },
  setInstallment(state, installment) {
    state.installment = installment;
  },
  setInstallments(state, installment) {
    state.installments = installment;
  },
};

export const actions = {
  async startSession({ dispatch, rootState }) {
    const codpedido = rootState.cart.codpedido;

    const sessionid = await this.dispatch(
      "api/get",
      {
        base: "/Payment/start",
        secure: true,
        body: { pedido: codpedido },
      },
      { root: true }
    );

    console.log(sessionid);
    return;

    if (typeof sessionid == "string") {
      dispatch("onSenderHashReady", { sessionid });
    }
  },
  onSenderHashReady({ commit }, { sessionid }) {
    return new Promise((resolve, reject) => {
      window.pGatway.onSenderHashReady((res) => {

        if (res.status == "error") {
          console.error(res.message);
          reject(res);
        }
        commit("setSessionID", sessionid);
        commit("setSenderHash", res.senderHash);
        resolve(res);
      });
    });
  },
  getBrand({ commit, state }, { cardNumber, onError, success }) {

    if (!window.pGatway) return

    const cardBin = cardNumber.replace(/\s/gm, "");

    commit("setcardNumber", cardNumber);

    return new Promise((resolve, reject) => {
      window.pGatway.getBrand({
        cardBin,
        success: (res) => {
          commit("setBrandCard", res.brand.name);
          if (success) {
            success(res);
          }
          resolve(res.brand.name);
        },
        error: (response) => {
          reject(response);
        },
      });
    });
  },
  async createCardToken({ state, commit }) {
    const {
      cardNumber,
      cvv,
      expirationMonth,
      expirationYear,
      brandCard: brand,
    } = state;

    // this.dados.hashCard = response.card.token;

    let res = new Promise((resolve, reject) => {
      window.pGatway.createCardToken({
        cardNumber,
        cvv,
        expirationMonth,
        expirationYear,
        brand,
        success: (response) => {
          resolve(response);
        },
        error: (response) => {
          reject(response);
        },
      });
    });

    res = await res;

    console.log(res);

    commit('setState', { name: 'hashCard', value: res.card.token });
  },

  /**
   *
   * @param amount valor total da compra (deve ser informado)
   * @param brand bandeira do cartão (capturado na função buscaBandeira)
   * @returns Promise
   */
  async getInstallments({ commit, state, dispatch }, response) {
    let { amount, brandCard: brand, cardNumber } = state;

    console.log({ amount, brand, cardNumber });

    if (brand == '') {
      brand = await dispatch('getBrand', { cardNumber });
    }

    console.log({ amount, brand });

    return new Promise((resolve, reject) => {
      window.pGatway.getInstallments({
        amount,
        brand,
        maxInstallmentNoInterest: 3,
        success: (response) => {

          console.log(response.installments[brand]);

          commit('setInstallments', response.installments[brand] || []);

          resolve(response);
        },
        error: (response) => {
          reject(response);
        },
      });
    });
  },
  checkSession({ state }) {
    return new Promise((resolve, reject) => {
      const interval = setInterval(() => {
        if (state.sessionid != 0) {
          clearInterval(interval);
          resolve(true);
        }
      }, 100);
    })
  },
  async makePayment({ dispatch, state }, { codpedido, pedido, carrinho, extra }) {

    await dispatch('checkSession');

    if (extra.paymentMethod == 'CREDIT_CARD') {

      await dispatch('createCardToken');
      await dispatch('getInstallments');

      console.log(state.installments, extra.parcelas);

      extra.dados.hashComprador = state.senderHash;
      extra.dados.hashCard = state.hashCard;
      extra.parcelas = state.installments.find((p) => {
        return p.quantity == extra.parcelas;
      });

    }

    return await this.dispatch('api/post', { base: '/Payment/', path: codpedido, body: { pedido, extra, carrinho } }, { root: true });
  },
  setAddress({ state }, { codpedido, address, cliente }) {
    address.endereco = address.logradouro;
    return this.dispatch('api/patch', { base: '/Cart/' + codpedido, path: '/Address/', body: { address, client: cliente.codigo } }, { root: true });
  }
};
