<template>
	<div class="bgList">
		<div class="container login">
			<div class="row md-3 p-3">
				<div class="card-roud shadow col-12 p-3">
					<span class="text-secondary">
						<b-icon icon="caret-right-fill"></b-icon> MINHA CONTA
					</span>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-lg-6">
					<div class="card shadow">
						<form class="card-body validate-form" style="padding-top: 38px;">
							<span class="login100-form-title p-b-55"> Minha conta </span>
							<div class="wrap-input100 validate-input m-b-16"
								data-validate="Valid email is required: ex@abc.xyz">
								<input class="input100" type="text" name="email" placeholder="Email"
									v-model="login.user" />
								<span class="focus-input100"></span>
								<span class="symbol-input100">
									<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
										class="bi bi-envelope" viewBox="0 0 16 16">
										<path
											d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
									</svg>
								</span>
							</div>
							<div class="wrap-input100 validate-input m-b-16" data-validate="Password is required">
								<input class="input100" type="password" name="pass" v-model="login.pass"
									placeholder="Password" />
								<span class="focus-input100"></span>
								<span class="symbol-input100">
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
										class="bi bi-lock" viewBox="1 0 16 16">
										<path
											d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
									</svg>
								</span>
							</div>
							<div class="form-check">
								<input type="checkbox" class="form-check-input" id="materialUnchecked" />
								<label class="form-check-label" for="materialUnchecked">Permanecer conectado</label>
							</div>
							<div class="container-login100-form-btn p-t-25">
								<button class="login100-form-btn" type="button"
									@click="doLogin({ ...login, callback: redirect })">
									Login
								</button>
							</div>
							<div>
								<div class="row" style="margin-left: 1px">
									<a style="cursor:pointer;color: #acacac" @click="recoverPassword()">Esqueceu a
										senha?</a>
								</div>
							</div>

							<div class="title-sep">
								<span>&nbsp; Não possue conta? &nbsp;</span>
							</div>
							<div>
								<div class="container-btn-oldguy">
									<nuxt-link class="btn-oldguy" :to="'/cadastro'">
										<button class="btn-oldguy">Cadastre-se agora!</button>
									</nuxt-link>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div class="col-12 col-lg-6">
					<div class="card shadow">
						<div class="card-body validate-form">
							<p class="lead">
								Cadastre-se agora
								<span class="text-sucess">GRÁTIS!</span>
							</p>
							<ul class="list-unstyled">
								<li>
									<p class="h5 mb-4">
										<b-icon icon="check-lg" variant="sucess"></b-icon> Acompanhe
										seus pedidos
									</p>
								</li>
								<li>
									<p class="h5 mb-4">
										<b-icon icon="check-lg" variant="sucess"></b-icon> Salve
										seus favoritos
									</p>
								</li>
								<li>
									<p class="h5 mb-4">
										<b-icon icon="check-lg" variant="sucess"></b-icon> Agilize
										suas compras
									</p>
								</li>
								<li>
									<p class="h5 mb-4">
										<b-icon icon="check-lg" variant="sucess"></b-icon> Compre
										mais rápido
									</p>
								</li>
								<li>
									<p class="h5 mb-4">
										<b-icon icon="check-lg" variant="sucess"></b-icon> Vantagens
										exclusivas
									</p>
								</li>
							</ul>
							<div class="container-cad-form-btn">
								<nuxt-link :to="'/cadastro'" class="cad-form-btn">
									<button class="cad-form-btn">Cadastre-se agora!</button>
								</nuxt-link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { BIcon, BIconArrowUp, BIconArrowDown } from "bootstrap-vue";
import { mapActions } from "vuex";

export default {
	components: {
		BIcon,
		BIconArrowUp,
		BIconArrowDown,
	},
	middleware: 'authenticated',
	props: {},
	data() {
		return {
			login: {
				user: "",
				pas: "",
			},
		};
	},
	methods: {
		...mapActions({
			doLogin: "client/login",
			recoverPsw: 'client/recoverPassword'
		}),
		recoverPassword() {
			this.$swal({
				font: 'sans-serif',
				title: 'Digite seu e-mail cadastrado',
				input: 'email',
				icon: 'info',
				showCancelButton: true,
				cancelButtonText: 'Cancelar'
			}).then(async ({ isConfirmed, value }) => {

				if (isConfirmed) {
					this.$nuxt.$loading.start();

					try {

						const result = await this.recoverPsw(value)

						if (result) {
							this.$swal({
								font: 'sans-serif',
								title: 'Um e-mail de recuperação foi enviado para você!',
								showconfirmButton: true,
								icon: 'success'
							});
						} else {
							this.$swal({
								font: 'sans-serif',
								title: 'E-mail informado inválido',
								showconfirmButton: true,
								icon: 'error'
							});
						}

					} catch (error) {

					}

					this.$nuxt.$loading.finish();

				}
			});

		},
		redirect(auth) {

			let path = this.$route.query.r;

			if (!path) {
				path = 'minha-conta';
			}

			path = `/${path}`;

			this.$router.push({ path });
		}
	},
};
</script>
<style lang="scss">
.login {
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

	.form-check {
		margin-bottom: 14px;
		color: #9b9797;
	}

	.container-cad-form-btn {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		text-decoration: none !important;
	}

	.cad-form-btn {
		font-size: 16px;
		line-height: 1.5;
		color: #fff;
		text-transform: uppercase;
		width: 100%;
		height: 62px;
		border-radius: 3px;
		background: #d33f8d;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25px;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;
		text-decoration: none !important;

		&:hover {
			background: var(--prodv-color);
		}
	}

	.list-unstyled {
		list-style: none;
		padding-top: 50px;
		padding-bottom: 40px;
		padding-left: 40px;
		padding-right: 20px;
		line-height: 2;
	}

	.text-sucess {
		color: green;
	}

	.card-body {
		.lead {
			font-size: 1.25rem;
			font-weight: 300;
			text-align: center;
			padding-top: 12px;

			& p {
				font-size: 14px;
				line-height: 1.7;
				color: #666666;
				margin: 0px;
			}

			& ul,
			li {
				margin: 0px;
				list-style-type: none;
			}
		}
	}

	button {
		outline: none !important;
		border: none;
		background: transparent;

		&:hover {
			cursor: pointer;
		}
	}

	.container-login100 {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		padding: 15px;
		position: relative;
		max-height: max-content;
		z-index: 1;
	}

	.card {
		border: none;
		border-radius: 0.5rem;
		width: 70%;
		height: max-content;
		min-width: 380px;
		max-width: 100%;
		margin: 6% auto 6% auto;
	}

	.login100-form-title {
		font-size: 25px;
		margin-top: 10px;
		margin-bottom: -15px;
		color: #333333;
		line-height: 1.2;
		text-transform: uppercase;
		text-align: center;
		width: 100%;
		display: block;

		&.p-b-55 {
			padding-bottom: 55px;
		}
	}

	.wrap-input100 {
		position: relative;
		width: 100%;
		z-index: 1;

		&.validate-input {
			position: relative;
		}

		&.m-b-16 {
			margin-bottom: 16px;
		}
	}

	.input100 {
		font-size: 18px;
		line-height: 1.2;
		color: #686868;
		display: block;
		width: 100%;
		background: #e6e6e6;
		height: 62px;
		border-radius: 3px;
		padding: 0 30px 0 65px;
	}

	.focus-input100 {
		display: block;
		position: absolute;
		border-radius: 3px;
		bottom: 0;
		left: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
		box-shadow: 0px 0px 0px 0px;
		color: rgba(211, 63, 141, 0.6);
	}

	.input100:focus+.focus-input100 {
		-webkit-animation: anim-shadow 0.5s ease-in-out forwards;
		animation: anim-shadow 0.5s ease-in-out forwards;
	}

	@-webkit-keyframes anim-shadow {
		to {
			box-shadow: 0px 0px 60px 20px;
			opacity: 0;
		}
	}

	@keyframes anim-shadow {
		to {
			box-shadow: 0px 0px 60px 20px;
			opacity: 0;
		}
	}

	.symbol-input100 {
		font-size: 24px;
		color: #999999;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		position: absolute;
		border-radius: 25px;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding-left: 23px;
		padding-bottom: 5px;
		pointer-events: none;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;
	}

	.input100:focus+.focus-input100+.symbol-input100 {
		color: #d33f8d;
		padding-left: 18px;
	}

	.container-login100-form-btn {
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.login100-form-btn {
		font-size: 16px;
		line-height: 1.5;
		color: #fff;
		text-transform: uppercase;
		width: 100%;
		height: 62px;
		border-radius: 3px;
		background: #d33f8d;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25px;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		transition: all 0.4s;

		&:hover {
			background: var(--prodv-color);
		}
	}

	.title-sep {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		padding-top: 3%;
		padding-bottom: 3%;
		width: 100%;

		&::before {
			display: inline-block;
			content: "";
			flex: 1;
			width: 100%;
			height: 1px;
			background: #c7c7c7;
			margin-top: 3px;
		}

		&::after {
			margin-top: 3px;
			display: inline-block;
			content: "";
			flex: 1;
			width: 100%;
			height: 1px;
			background: #c7c7c7;
		}

		&span {
			font-size: 10;
			color: #8a8787;
			margin: 0 0.5rem;
		}
	}

	.container-btn-oldguy {
		margin-top: 1%;
		width: 100%;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.btn-oldguy {
		font-size: 18px;
		line-height: 1.2;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 40px;
		border-radius: 3px;
		border: 1px solid #e6e6e6;
		background-color: #fff;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		color: rgb(95, 94, 94);
		transition: all 0.4s;
		text-decoration: none;
		color: #d33f8d;

		&:hover {
			border-color: #d33f8d;
			color: #fff;
			background-color: #d33f8d;
		}
	}

	.row-social {
		display: flex;
		flex-wrap: wrap;
		margin-right: 0px;
		margin-left: 0px;
	}

	.btn-face,
	.btn-google {
		font-size: 18px;
		line-height: 1.2;
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		justify-content: center;
		align-items: center;
		width: calc((100% - 10px) / 2);
		height: 40px;
		border-radius: 3px;
		border: 1px solid #e6e6e6;
		background-color: #fff;
		-webkit-transition: all 0.4s;
		-o-transition: all 0.4s;
		-moz-transition: all 0.4s;
		color: rgb(95, 94, 94);
		transition: all 0.4s;
		text-decoration: none;

		&:hover {
			border-color: #d33f8d;
			color: #d33f8d;
		}
	}

	.alert-validate {
		&::before {
			content: attr(data-validate);
			position: absolute;
			max-width: 70%;
			background-color: white;
			border: 1px solid #c80000;
			border-radius: 3px;
			padding: 4px 25px 4px 10px;
			top: 50%;
			-webkit-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);
			right: 8px;
			pointer-events: none;

			font-family: Raleway-SemiBold;
			color: #c80000;
			font-size: 13px;
			line-height: 1.4;
			text-align: left;

			visibility: hidden;
			opacity: 0;

			-webkit-transition: opacity 0.4s;
			-o-transition: opacity 0.4s;
			-moz-transition: opacity 0.4s;
			transition: opacity 0.4s;
		}

		&::after {
			content: "\f12a";
			font-family: FontAwesome;
			display: block;
			position: absolute;
			color: #c80000;
			font-size: 15px;
			top: 50%;
			-webkit-transform: translateY(-50%);
			-moz-transform: translateY(-50%);
			-ms-transform: translateY(-50%);
			-o-transform: translateY(-50%);
			transform: translateY(-50%);
			right: 13px;
		}

		&:hover:before {
			visibility: visible;
			opacity: 1;
		}
	}
}
</style>