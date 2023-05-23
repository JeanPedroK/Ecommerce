export default async function ({ store, redirect }) {
	if (!store.getters['cart/getProductsAmount']) {
		redirect('/carrinho');
	}
}