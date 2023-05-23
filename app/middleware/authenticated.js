export default async function ({ store, redirect }) {
    // Se o usuário não estiver autenticado
    const authenticated = await store.dispatch('client/authenticated');

    if (authenticated) {

        if (window.location.pathname != '/minha-conta') {
            redirect('/minha-conta');
        }

        // window.location.pathname = '/minha-conta';

    } else  if (window.location.pathname) {

        if (window.location.pathname == '/minha-conta') {
            window.location.pathname = '/';
            redirect('/');
        }
    }
}