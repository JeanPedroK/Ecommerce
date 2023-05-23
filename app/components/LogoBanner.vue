<template>
	<div id="logo-banner" class="logo-banner">
		<a href="/">
			<img src="http://beta.kunsler.com.br/assets/logosite.png" alt="logo" class="rounded mx-auto mt-4" id="imgLogo" />
		</a>
		<div class="tool-box d-none d-sm-flex">
			<form class="form-inline mr-3">
				<input class="form-control mr-sm-2" type="search" placeholder="Busca" aria-label="busca" id="busca-sm"
					name="busca-sm" />
				<b-button variant="outline-secondary" type="submit" id="outline">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
						class="bi bi-search-heart" viewBox="0 0 15 16" style="">
						<path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z" />
						<path
							d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z" />
					</svg>
				</b-button>
			</form>
			<MenuCart />
			<UserMenu />
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
	name: "LogoBanner",
	created() {
		this.init();
	},
	asyncData() {
		return { content: "Created at: " + new Date() };
	},
	computed: {
		...mapGetters({
			amount: 'cart/getProductsAmount'
		})
	},
	methods: {
		...mapMutations({
			init: 'cart/initCart'
		}),
		refresh() {
			this.$nuxt.refresh();
		},
	},
};
</script>

<style lang="scss">
#logo-banner {
	padding-top: 5px;
	padding-bottom: 25px;

	.btn {
		&.btn-link {
			border: none;

			&:hover {
				border: none;
			}
		}

		&.btn-outline-secondary {
			border-color: var(--primary-color);

			&:hover {
				background-color: var(--prodv-color);
				border-color: white;


			}
		}
	}

	&.logo-banner #imgLogo {
		width: auto;
		max-width: 80%;
		min-width: 80px;
		max-height: 150px;
		margin: auto;
		padding-top: 47px;
		display: flex;
		cursor: pointer;
	}

	//mobile
	@media screen and (max-width: 896px) {
		.logo-banner img {
			max-width: 40%;
			padding-top: 60px;
		}
	}

	.tool-box {
		margin-top: -34px;

		&.d-none {
			&.d-sm-flex {
				float: right;

				.h5 {
					font-size: 1.6rem;
					margin-left: -3px;
				}

				.form-inline {
					margin-bottom: -1em;

					svg {
						color: var(--primary-color);
						font-size: 1.2rem;

						&:hover {
							color: white;
						}
					}

				}

				#outline {
					color: var(--primary-color);
				}

				.login-bot {
					.h5 {
						color: var(--primary-color);
						margin-right: 18px;
						margin-left: 5px;
						cursor: pointer;
					}

					h5:hover {
						color: var(--prodv-color);
					}
				}
			}
		}
	}

	@media screen and (min-width: 1900px) {
		.logo-banner img {
			max-width: 400px;
			width: 100%;
			max-height: 200px;
			padding-top: 70px;
		}
	}
}
</style>
