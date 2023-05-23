export const state = () => ({
    cache: {},
    headers: {
        // 'Referer': 'https://beta.kunsler.com.br/',
    }
})

export const getters = {
    getHeaders(state) {
        return state.headers
    }
}

export const mutations = {
    setHeaders(state, { name, value }) {
        console.log({ name, value })

        return state.headers[name] = value;
    },
    removeHeaders(state, { name }) {
        delete state.headers[name]
    }
}

export const actions = {
    async get({ state }, { base, path, params, secure }) {

        if (!path) path = '';
        if (!params) params = {};
        let headers = {};

        if (secure) {
            headers = state.headers;
        }

        const res = await this.$axios.$get(base + path, { params, headers }, { progress: false });
        return res;
    },
    async delete({ state }, { base, path, params, secure }) {

        if (!path) path = '';
        if (!params) params = {};
        let headers = {};

        if (secure) {
            headers = state.headers;
        }

        const res = await this.$axios.$delete(base + path, { params, headers }, { progress: false });
        return res;
    },
    post({ state }, { base, path, body }) {

        if (!path) path = '';
        if (!body) body = {};

        const data = body;

        for (const key of Object.keys(state.headers)) {
            console.log(key);
            this.$axios.setHeader(key, state.headers[key]);
        }

        return this.$axios.$post(base + path, { ...data }, { progress: false });
    },
    put({ state }, { base, path, body }) {

        if (!path) path = '';
        if (!body) body = {};

        const data = body;

        for (const key of Object.keys(state.headers)) {
            console.log(key);
            this.$axios.setHeader(key, state.headers[key]);
        }

        return this.$axios.$put(base + path, { ...data }, { progress: false });
    },
    patch({ state }, { base, path, body }) {

        if (!path) path = '';
        if (!body) body = {};

        const data = body;

        for (const key of Object.keys(state.headers)) {
            console.log(key);
            this.$axios.setHeader(key, state.headers[key]);
        }

        return this.$axios.patch(base + path, { ...data }, { progress: false });
    }
}