import Vue from 'vue'

Vue.filter('formatValue', (value) => {
    return parseFloat(value).toFixed(2).toString().replace('.', ',');
});

Vue.filter('placeholder', (value, placeholder) => {
    return (!value || value == "") ? placeholder : value;
});