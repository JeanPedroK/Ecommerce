import Vue from 'vue'

Vue.filter('formatInstallment', (parc) => {
    const value = parseFloat(parc.installmentAmount).toFixed(2).toString().replace('.', ',');
    return value + (parc.interestFree ? '- sem juros' : '');
});
