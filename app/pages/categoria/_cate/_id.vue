<template>
	<div class="bgList">
		<div class="container">
			<div class="row p-2 mb-2">
				<div class="card-roud shadow col-12 p-3">
					<span class="text-secondary">
						<b-icon icon="caret-right-fill"></b-icon> Produtos
					</span>
				</div>
			</div>
			<div class="rowpn ">
				<div class="row justify-content-center">
					<div class="col-12 row">
						<client-only v-for="(bread, i) in breadcrumb" :key="i">
							<span class="active" aria-current="page">/
							</span>
						</client-only>
					</div>
					<client-only v-for="(prod, si) in produtos" :key="si">
						<div class="col-6 col-xs-6 col-sm-4 col-md-3 produtoPai">
							<product-card :prod="prod"></product-card>
						</div>
					</client-only>
					<div class="col-12 ">
						<div class="text-center" v-if="(next != '')">
							<button type="button" @click="loadMoreProducts()"
								class="btn btn-outline-secondary">Mais</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	data() {
		return {
			code: "",
			produtos: [],
			breadcrumb: [],
			next: "",
		};
	},
	mounted() {
		this.$nextTick(async () => {
			this.$nuxt.$loading.start();

			this.code = this.$route.params.cate;
			this.produtos = await this.getProdutos(this.code);

			this.$nuxt.$loading.finish();
		});
	},
	methods: {
		...mapActions({
			getProdutos: "produtos/getProdutos"
		}),
		loadMoreProducts() {

		}
	},
};
</script>
<style lang="scss" scoped>
.card.shadow {
	input {
		outline: none;
		border: none;

		&::-webkit-input-placeholder {
			color: #acacac;

		}

		&:-moz-placeholder {
			color: #acacac;

		}

		&::-moz-placeholder {
			color: #acacac;

		}

		&:-ms-input-placeholder {
			color: #acacac;

		}
	}

}

.text-secondary {
	color: #6c757d !important;
}

.card-roud {
	background-color: #fff;
	border-radius: 5px;
}

.produtoPai {
	margin-bottom: 30px;
}

.btnComprar {
	width: 85%;
	position: absolute;
	bottom: 17px;
	align-self: center;
	margin: auto;
	padding-top: 5px;
}

.bgList {
	background-color: var(--back-body);
}
</style>