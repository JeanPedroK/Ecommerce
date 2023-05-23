<template>
	<div>
		<top-bar :company="company"></top-bar>
		<logo-banner></logo-banner>
		<menu-bar></menu-bar>
		<Nuxt />
		<cookies-bar></cookies-bar>
		<footer-bar :company="company"></footer-bar>
	</div>
</template>
<script>
export default {
	name: "IndexPage",
	data() {
		return {
			company: {}
		};
	},
	mounted() {
		this.company = window.empr || {
			email: "contato@kunsler.com.br",
			usermail: "contato@kunsler.com.br",
			titulo: "K\u00fcnsler Moda \u00cdntima",
			slogan: "",
			logo: "https:\/\/www.kunsler.com.br\/admin\/arquivos\/imgs\/KUNSLER_LOGO.png",
			icon: "https:\/\/www.kunsler.com.br\/admin\/arquivos\/imgs\/KUNSLER_ICON.png",
			limiteporpagina: 16,
			parcelaminima: 30,
			qtdparcelas: 6,
			keywords:
				"Kunsler , Kunsler Moda \u00cdntima, loja online, Kunsler referencias, Kunsler opinioes, Kunsler alguem ja comprou, Kunsler \u00e9 boa, Kunsler seguro, Kunsler \u00e9 confiavel, Kunsler.com.br, www.Kunsler.com.br, Moda \u00cdntima, Moda Feminina, Moda intima",
			description: "K\u00fcnsler Moda \u00cdntima conforto e qualidade",
			twitter: "",
			facebook: "KunslerModaIntima",
			instagram: "kunsler_moda_intima",
			telefone: "(47) 3333-1889",
			whatsapp: "(47) 98820-6579",
			endereco: "R. Minas Gerais, 855 - Estados, Indaial - SC, 89087-000",
			maps: "https:\/\/www.google.com.br\/maps\/place\/K%C3%BCnsler+Moda+intima\/@-26.9074234,-49.2345667,17z\/data=!3m1!4b1!4m5!3m4!1s0x94df02ee76e67dbb:0x5e7276cdbd214c92!8m2!3d-26.9074282!4d-49.232378",
			empr: 2,
			cep: "89087000",
		};
	},
};
</script>


<style lang="scss" >
@import '../assets/variables.scss';
</style>

