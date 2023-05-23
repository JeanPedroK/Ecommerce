import Vue from 'vue'

Vue.filter('dateFormat', (value) => {
    const date = new Date(value);

    date.setTime(date.getTime() + 3 * 60 * 60 * 1000);

    return date.toLocaleDateString('pt-BR', {
        date: 'dd/MM/yy'
    })
})

