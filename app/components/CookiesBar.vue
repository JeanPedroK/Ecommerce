<template>
	<div class="cookie-modal" v-if="hasCookie">
		<div class="row flex-row justify-content-between align-items-center card cookie p-2">
			<div class="col-12 col-sm-9 flex-row">
				<span>Utilizamos cookies para melhorar a sua experiência em nosso site.
					Ao continuar navegando você concorda com a nossa
					<a href="/sobre/privacidade" class="lk">Politica de privacidade.</a>
				</span>
			</div>
			<div class="col-12 col-sm-3 text-center mt-2 mt-sm-0">
				<button class="btn btn-dark" type="button" @click="acceptCookie()">Aceitar e continuar</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "CookiesBar",
	data() {
		return {
			hasCookie: true
		}
	},
	mounted() {
		let cookies = JSON.parse(this.getLocal("hasCookie"));
		this.hasCookie = !(cookies == 'true')
	},
	methods: {
		acceptCookie() {
			this.hasCookie = false;
			this.setLocal("hasCookie", "true");
		}
	},
}
</script>

<style lang="scss" scoped>
.cookie-modal {
	display: block;
	position: sticky;
	bottom: 20px;
	width: 60%;
	margin-top: 1%;
	margin-left: auto;
	margin-right: auto;
	// padding-left: 15px;
	// padding-right: 15px;
	// margin-left: 20%;
	// margin-right: 20%;
	margin-bottom: 15px;
	font-size: 14px;


	.cookie.p-2 {
		border-radius: 0;
		box-shadow: 0px 0px 40px 0px rgba(0, 0, 0, 0.55);
		z-index: 10;
	}

	.lk {
		color: blue;
		text-decoration: none;
		cursor: pointer;
	}
}


@media (max-width: 576px) {

	.cookie-modal {
		width: calc(100% - 30px);
		padding-left: 15px;
		padding-right: 15px;
		margin-left: 15px;
		margin-right: 15px;
		margin-bottom: 15px;
		font-size: 12px;
	}
}
</style>

