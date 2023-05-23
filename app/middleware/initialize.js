export default async function ({ store, redirect }) {
    // Se o usuário não estiver autenticado
    await store.commit('client/init');
    await store.commit('cart/initCart');
}