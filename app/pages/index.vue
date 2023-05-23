<template>
	<div class="bgList">
		<div v-for="(item, iitem) in homePage" :class="classObject(item)" :key="iitem">
			<home-card-img v-for="(line, idx) in item" :key="idx" :line="line"></home-card-img>
		</div>
	</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
	name: "homePage",
	data() {
		return {
			homePage: {},
			resposta: {},
			resposta2: {}
		};
	},
	mounted() {
		this.homePage = window.homeTpl || [];
	},
	methods: {
		...mapMutations({
			setHeaders: 'api/setHeaders',
		}),
		...mapActions({
			get: 'api/get',
			post: 'api/post',
		}),
		classObject(item) {
			let obj = {};

			let t = item.find((i) => (i.type && i.type == 'banner'));

			if (t?.type) {
				obj['rowpn'] = true;
			} else {
				obj['container'] = true;
				obj['row'] = true;
				obj['rowpn'] = true;
				obj['mx-auto'] = true;
				obj['pb-2'] = true;



			}

			return obj
		}
	}
};
</script> 

<style lang="scss" scoped>
.rowpn {
	display: -webkit-box;
	display: flex;
	flex-wrap: wrap;
	// padding: 0;
	// margin: 0;
}

.card-img-1x1 {
	margin-top: 30px;
	padding-top: calc(100% - 30px);
	max-height: calc(100% - 30px);
	background-size: cover;
	overflow: hidden;
}

.card-img-16x9 {
	margin-top: 30px;
	padding-top: calc(50% - 15px);
	max-height: calc(100% - 45px);
	background-size: cover;
	overflow: hidden;
}

.card-img-9x16 {
	margin-top: 30px;
	padding-top: calc(200% + 30px);
	height: calc(100% - 30px);
	background-size: cover;
	overflow: hidden;
}
</style>