import Vue from 'vue'

Vue.filter('formatDate', (value) => {
    const date = new Date(value)
    return date.toLocaleString(['pt-BR'], {
        year: 'numeric',
    })
})

