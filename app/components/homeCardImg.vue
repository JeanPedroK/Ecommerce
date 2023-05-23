<template>

	<component :class="classObj" :style="styleObj" :href="line.link" :is="isObj">

		<span v-if="line.text">{{ line.text }}</span>
		<component v-if="line.type" :is="'home-' + line.type" :list="line"></component>
		<component v-else-if="line.tag" :is="line.tag">line</component>
		<home-card-img v-else v-for="(row, idx) in line.child" :key="idx" :line="row"></home-card-img>
		
	</component>

</template>

<script>
export default {
	data: function () {
		return {
			forceEdit: false,
		};
	},
	props: {
		line: Object,
		edit: {
			type: Boolean,
			required: false,
			default: false,
		},
		prew: {
			type: Boolean,
			required: false,
			default: false,
		},
		id: String,
		context: Array,
		model: {
			type: [Number, String],
			required: false,
			default: 0,
		},
		prof: {
			type: [Number, String],
			required: false,
			default: 0,
		},
		col: {
			type: [Number, String],
			required: false,
			default: 0,
		},
	},
	mounted: function () { },
	methods: {
		addimg: function (item, row) {

		},
		showprev: function () {
			return {};
		},
	},
	computed: {
		isObj: function () {
			return this.line.link ? 'a' : 'div';
		},
		classObj: function () {

			let obj = {};

			if (this.line.type && this.line.type != 'banner') {
				obj['container'] = true;
			}

			if (this.line.tag && this.line.tag == "img") {
				return {
					"front-image": true,
				};
			}

			if (!this.line.class) return obj;

			var c = this.line.class.split(" ");

			c.forEach((e) => {
				obj[`${e}`] = true;
			});

			if (this.id) {
				obj[`${this.id}`] = true;
			}

			return obj;
		},
		styleObj: function () {
			if (this.line.tag && this.line.tag == "img") {
				return {
					"--margin": this.prof * -80 + "px",
					"background-image": `url(${this.line.src})`,
				};
			}

			if (this.line?.text) {
				return {
					'margin-top': '-35px',
					'margin-bottom': '35px'
				}
			}

			if (!this.line.img) return {};

			let link = this.line.img;

			if (link.indexOf('http') == -1) {
				link = `https://beta.kunsler.com.br${link}`
			}

			console.log({ link });

			return {
				"background-image": `url(${link})`,
			};
		},
		lin: function () {
			var lin = this.id || "";

			lin = lin.replaceAll(["show", "prew"], "");

			lin = lin.split("-");

			return parseInt(lin[1] || 0);
		},
	},
}
</script>

<style lang="scss" scoped>
.banner-type {
	padding: 0 !important;
	margin: 0 !important
}

.card-img-1x1 {
	margin-top: 30px;
	padding-top: 100%;
	max-height: calc(100% - 45px);
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

.title {
	font-weight: 600;
	font-size: 1.06rem;
}

.sub-title {
	font-weight: 400;
	font-size: 0.85rem;
}

.bg-none {
	background-color: transparent !important;
}


.rowpn {
	display: -webkit-box;
	display: flex;
	flex-wrap: wrap;
}

.row-pn {
	display: -webkit-box;
	display: flex;
	flex-wrap: wrap;
	padding: 0px !important;
}
</style>