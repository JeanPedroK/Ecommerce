import Vue from 'vue'

const mixin = {
    data() {
        return {
            loadingActive: false,
            loadingFullPage: true,
            loadingHeight: 100,
            loadingWidth: 100,
            loadingColor: 'var(--primary-color)',
            loadingCanCancel: false
        }
    },
    methods: {
        setLoad(load) {
            if (load) {
                this.loadingActive = true;
                console.log({ load })
            } else {
                // this.loadingActive = false;
                console.log({ load })
            }
        },
        getLocal(cname) {
            return window.localStorage.getItem(cname);
        },
        setLocal(cname, data) {
            window.localStorage.setItem(cname, JSON.stringify(data));
        },
        delLocal(cname) {
            window.localStorage.removeItem(cname);
        },
        b64decode(str) {
            return decodeURIComponent(atob(str));
        },
        b64encode(str) {
            return btoa(encodeURIComponent(str));
        }
    },
}

Vue.mixin(mixin)