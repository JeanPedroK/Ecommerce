<template>
	<nav id="top-bar" class="navbar navbar-dark bg-dark color-primary">
		<div id="contact-box-icons">
			<a :href="'mailto:' + company.email" target="_blank" style="margin-right: 10px;">
				<b-icon icon="envelope" class="h6 mb-2"></b-icon>
				<span class="d-none d-sm-inline"> {{ company.email }} </span>
			</a>
			<a :href="'https://api.whatsapp.com/send?phone=' + company.whatsapp + '&text=Olá, vim pelo site!'"
				target="_blank">
				<b-icon icon="whatsapp" class="h6 mb-2"></b-icon>
				<span class="d-none d-sm-inline"> {{ company.whatsapp }} </span>
			</a>
		</div>
		<div id="social-box-icons" class="navbar-text d-none d-sm-block">
			<a :href="'https://pt-br.facebook.com/Kunslermodaintima/' + company.facebook" target="_blank">
				<b-icon icon="facebook" class="h6 mb-2 mr-1" shift-v="-9"></b-icon>
			</a>

			<a :href="'https://www.instagram.com/kunsler_moda_intima/' + company.instagram" target="_blank">
				<b-icon icon="instagram" class="h6 mb-2" shift-v="-9"></b-icon>
			</a>
		</div>
		<!-- mobile -->
		<div class="form-input">
			<form class="form-inline" v-show="showSearch">
				<input class="form-control" type="search" placeholder="Busca" aria-label="Busca" name="busca-sm"
					id="busca-sx" />
			</form>
		</div>
		<div id="tool-box" class="tool-box navbar-text d-block d-sm-none">
			<a class="search" @click="showSearch = !showSearch">
				<b-icon icon="search" class="h5 mb-2" shift-v="-3"></b-icon>
			</a>
			<MenuCart />
			<UserMenu />
		</div>
	</nav>
</template>

<script>

export default {
	name: "TopBar",
	data() {
		return {
			showSearch: false,
		};
	},
	props: {
		company: {
			type: Object,
			required: true
		}
	}
};

</script>

<style lang="scss" scoped>

#top-bar {
	width: 100vw;
	margin-left: 0px;
	margin-right: 0px;

	padding-left: 0 !important;
	padding-right: 0 !important;

	&.navbar.navbar-dark.bg-dark.color-primary {
		position: fixed;
		// width: 100%;
		z-index: 10;
		// margin-top: -20px;
		padding-bottom: 0px;
		padding-top: 0px;

		// padding-top: 13px;

		svg {
			color: var(--primary-color);
			vertical-align: - .7em !important;
		}

		span {
			color: var(--primary-color);
		}
	}

	// mobile
	.search {
		margin-right: 8px;
		margin-left: -8px;
	}

	#social-box-icons {
		margin-top: -40px;
		margin-left: calc(100% - 75px);
		padding-bottom: 12px;
	}

	#contact-box-icons {
		margin-left: 10px;
		margin-bottom: -10px;

		a {
			text-decoration: none !important;
		}
	}

	.tool-box {
		width: 100px;

		.navbar-text {
			margin-bottom: 4px;
		}
	}

	// mobile
	@media screen and (max-width: 414px) {

		.navbar {
			padding: 5px 5px 5px 0;
		}

		&.navbar.navbar-dark.bg-dark.color-primary {
			position: fixed;
			width: 100%;
			z-index: 10;
			margin-top: -5px;
			padding-bottom: 0px;
			padding-top: 5px;

			svg {
				color: var(--primary-color);
				vertical-align: - 0.5em !important;
			}
		}

		.search {
			margin-right: -6px;
			// margin-left: -16px;


		}

		.h6 {
			font-size: 1.3rem;
		}

		:root {
			--icon-size: 1.5rem;
		}


		#contact-box-icons {
			margin-left: 10px;
			margin-top: -3px;
		}

		.form-input {
			width: 45%;
		}
	}

	@media screen and (min-width: 576px) {
		.navbar.navbar-dark.bg-dark.color-primary {
			position: fixed;
			width: 100%;
			z-index: 10;
			padding: 0px;
			margin-top: 0px;

			svg {
				color: var(--primary-color);
			}

			span {
				color: var(--primary-color);
			}
		}

		#social-box-icons {
			margin-bottom: 8px;
			margin-top: -2px;
		}

		#contact-box-icons {
			margin-left: 10px;
			margin-bottom: -59px;
		}
	}
}
</style>