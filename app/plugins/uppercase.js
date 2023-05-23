import Vue from 'vue'


Vue.filter('uppercase', function (value) {
	return value.toUpperCase()
})
