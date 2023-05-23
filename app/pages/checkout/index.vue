<template>
	<div class="checkout bgList">
		<div class="container">
			<!-- ALEX LINE -->
			<div class="wizard card-round shadow">
				<div class="wizard-inner">
					<div class="connecting-line"></div>
					<div class="connecting-line-progress"
						:style="{ width: (((step) * 100) / 5) + (step >= 4 ? 0 : 10) + '%' }">
					</div>
					<ul class="nav nav-tabs" role="tablist">
						<li role="presentation" class="nav-item">
							<a data-toggle="tab" aria-controls="step1" role="tab" title="Step 1"
								class="nav-link disabled" :class="{ active: (step >= 0) }">
								<span class="round-tab" :class="{ shadow: (step == 0) }">
									<b-icon icon="person-lines-fill" shift-v="2"></b-icon>
								</span>
							</a>
						</li>
						<li role="presentation" class="nav-item">
							<a data-toggle="tab" aria-controls="step2" role="tab" title="Step 2"
								class="nav-link disabled" :class="{ active: (step >= 1) }">
								<span class="round-tab" :class="{ shadow: (step == 1) }">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
										class="bi bi-house-heart" viewBox="0 0 16 16" style="margin-bottom: 15px;">
										<path
											d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z" />
										<path
											d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
									</svg>
								</span>
							</a>
						</li>
						<li role="presentation" class="nav-item">
							<a data-toggle="tab" aria-controls="step3" role="tab" title="Step 3"
								class="nav-link disabled" :class="{ active: (step >= 2) }">
								<span class="round-tab" :class="{ shadow: (step == 2) }">
									<b-icon icon="credit-card-fill" shift-v="1"></b-icon>
								</span>
							</a>
						</li>
						<li role="presentation" class="nav-item">
							<a data-toggle="tab" aria-controls="step4" role="tab" title="Step 4"
								class="nav-link disabled" :class="{ active: (step >= 3) }">
								<span class="round-tab" :class="{ shadow: (step == 3) }">
									<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
										class="bi bi-clipboard2-check" viewBox="0 0 16 16" style="margin-bottom: 14px;">
										<path
											d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z" />
										<path
											d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z" />
										<path
											d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z" />
									</svg>
								</span>
							</a>
						</li>
						<li role="presentation" class="nav-item">
							<a data-toggle="tab" aria-controls="step5" role="tab" title="Step 5"
								class="nav-link disabled" :class="{ active: (step >= 4) }">
								<span class="round-tab" :class="{ shadow: (step == 4) }">
									<b-icon icon="bag-check-fill" shift-v="2"></b-icon>
								</span>
							</a>
						</li>

					</ul>
				</div>
			</div>
			<br>
			<div class="row">
				<!-- LOGIN -->
				<div class="col-md-8 mb-4" v-if="step == 0">
					<div class="row col-12 ml-0">
						<div class="col-6 home">
							<nuxt-link to="/Login?r=checkout">
								<div class="card-roud shadow text-center selectOption">
									<span class="lead">
										<strong>Já possuo cadastro</strong>
									</span>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
											fill="currentColor" class="bi bi-person-check-fill" viewBox="0 0 16 16">
											<path fill-rule="evenodd"
												d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
											<path
												d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
										</svg>
									</div>
								</div>
							</nuxt-link>

						</div>

						<div class="col-6 home">
							<nuxt-link to="/cadastro?r=checkout">
								<div class="card-roud shadow text-center selectOption">
									<span class="lead">
										<strong>
											Cadastre-se agora
										</strong>
									</span>
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
											fill="currentColor" style="margin-left:1px" class="bi bi-person-plus-fill"
											viewBox="0 0 16 16">
											<path
												d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
											<path fill-rule="evenodd"
												d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
										</svg>
									</div>
								</div>
							</nuxt-link>

						</div>
					</div>
				</div>

				<!-- CARRINHO -->
				<div class="col-md-4 order-2 mb-4" v-if="step <= 3">
					<h4 class="d-flex justify-content-between align-items-center mb-3 ml-0">
						<span class="text-muted">Carrinho</span>
						<span class="badge badge-secondary badge-pill">{{ carrinho.produtos.length }}</span>
					</h4>

					<ul class="list-group mb-3">
						<li v-for="(prod, pdt) in carrinho.produtos" :key="pdt"
							class="list-group-item d-flex justity-content-between lh-condensed">
							<div>
								<h6 class="my-0">{{ prod.titulo }}</h6>
								<small class="text-muted"><b>Cor:</b> {{ prod.cor.titulo }}</small><br>
								<small class="text-muted"><b>Tamanho:</b> {{ prod.tamanho.tam }}</small><br>
								<small class="text-muted"><b>Quantidade:</b> {{ prod.qtd }}</small><br>
							</div>
							<span class="text-muted col-sm-4 price-position">R$ {{ prod.valorTotal | formatValue
							}}</span>
						</li>
						<li class="list-group-item d-flex justify-content-between" v-if="carrinho.cupom?.codigo">
							<div :class="{ 'text-success': carrinho.desconto, 'text-warning': !carrinho.desconto }">
								<h6 v-if="carrinho.desconto" class="my-0">Cupom</h6>
								<h6 v-else class="my-0">Cupom Inválido</h6>
								<small>{{ carrinho.cupom.cupom }}</small>
								<span v-if="carrinho.cupom.tipo_valor == '1'"
									:class="{ 'text-success': carrinho.desconto, 'text-warning': !carrinho.desconto }">
									<small>| - R$ {{ carrinho.cupom.valor | formatValue }}</small>
								</span>
								<span v-if="carrinho.cupom.tipo_valor == '2'"
									:class="{ 'text-success': carrinho.desconto, 'text-warning': !carrinho.desconto }">
									<small>| {{ carrinho.cupom.valor }} % OFF</small>
									<br>
								</span>
							</div>
							<span v-if="carrinho.desconto" class="text-success ml-4">
								- R$ {{ carrinho.desconto | formatValue }}
							</span>

							<span class="remove-btn mt-0" @click="setCupom(false)">Alterar</span>
						</li>
						<li class="list-group-item d-flex justify-content-between " v-if="carrinho.frete?.descricao">
							<div :class="{ 'text-success': carrinho.frete }">
								<h6 v-if="carrinho.frete" class="my-0">Frete: {{ carrinho.frete.descricao }}
								</h6>
								<small class="text-muted">
									Prazo: {{ carrinho.frete.prazo }} Dia(s)
								</small>
								<br>
							</div>
							<span class="text-secondary price-position  col-sm-4"> R$ {{ carrinho.frete.valor |
									formatValue
							}}</span>

							<span @click="setFrete()" class="remove-btn">Alterar</span>
						</li>

						<li class="list-group-item d-flex justify-content-between">
							<span>Total </span>
							<strong>R$ {{ carrinho.valorTotal | formatValue }}</strong>
						</li>
					</ul>

					<div class="card p-2 mb-3">
						<div class="input-group">
							<input name="cupom" id="cupom" type="text" class="form-control" v-model="cupom"
								@keyup.enter="rescueCode()" placeholder="Código promocional">
							<div class="input-group-append" @click="rescueCode()">
								<button type="button" class="btn btn-secondary">Resgatar</button>
							</div>
						</div>
					</div>
					<ul class="list-group mb-3">
						<li v-for="(trans, trs) in delivery" :key="trs" @click="setFrete(trans)"
							class="list-group-item d-flex justify-content-between lh-condensed frete">
							<div>
								<h6 class="my-0">{{ trans.descricao }}</h6>
								<small class="text-muted"> <b>Prazo:</b> {{ trans.prazo }} Dia(s) </small><br>
							</div>
							<span v-if="trans.valor" class="text-muted"> <b>Valor:</b> {{ trans.valor |
									formatValue
							}} </span>
							<span v-else class="text-muted"> <b>Grátis</b></span>
						</li>
					</ul>


				</div>

				<!-- ENDEREÇO -->
				<div class="col-md-8 order-md-1" v-if="step == 1">

					<h4 class="ml-0 mb-3">
						<span class="text-muted">Endereço de entrega</span>
					</h4>

					<ClientAdress @set-address="setAddress" @toggleEdit="setEdit" />

					<hr>

					<div class="ml-0 row col-12">
						<div class="col-3"></div>
						<button type="button" :disabled="validateStep" class="btn btn-outline-success col-6"
							@click="next()">
							Próximo<b-icon icon="chevron-double-right"></b-icon>
						</button>
					</div>
					<hr class="mb-4">

				</div>

				<!-- PAGAMENTO -->
				<div class="col-md-8 order-md-1" v-if="step == 2">

					<form class="needs-validation" name="pay" action="pay">

						<h4 class="ml-0 mb-3 mb-0">
							<span class="text-muted">Pagamento</span>
						</h4>
						<div>
							<div v-for="(payment, i) in paymentMethods" :key="i"
								class="card-roud ml-0 btn card-endereco p-1 mr-3 mt-3" @click="setPayment(i)"
								:class="{ 'shadow': (i == selectedPayment), 'active': (i == selectedPayment) }"
								style="max-width: 10rem; min-width:10rem;">
								<div class="card-body p-2 limit-text">
									<h5 class="card-title limit-text">
										{{ payment.name }}
									</h5>
									<svg v-if="payment.icon == 'cart'" xmlns="http://www.w3.org/2000/svg" width="28"
										height="28" fill="currentColor" class="bi bi-credit-card" viewBox="0 0 16 16">
										<path
											d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
										<path
											d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
									</svg>
									<svg v-if="payment.icon == 'paper'" xmlns="http://www.w3.org/2000/svg" width="28"
										height="28" fill="currentColor" class="bi bi-upc-scan" viewBox="0 0 16 16">
										<path
											d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
									</svg>
									<svg v-if="payment.icon == 'qrcode'" xmlns="http://www.w3.org/2000/svg" width="28"
										height="28" fill="currentColor" class="bi bi-qr-code-scan" viewBox="0 0 16 16">
										<path
											d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0v-3Zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5ZM.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5Zm15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5ZM4 4h1v1H4V4Z" />
										<path d="M7 2H2v5h5V2ZM3 3h3v3H3V3Zm2 8H4v1h1v-1Z" />
										<path d="M7 9H2v5h5V9Zm-4 1h3v3H3v-3Zm8-6h1v1h-1V4Z" />
										<path
											d="M9 2h5v5H9V2Zm1 1v3h3V3h-3ZM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8H8Zm2 2H9V9h1v1Zm4 2h-1v1h-2v1h3v-2Zm-4 2v-1H8v1h2Z" />
										<path d="M12 9h2V8h-2v1Z" />
									</svg>
								</div>
							</div>
						</div>

						<div class="row" v-if="paymentMethod == 'CREDIT_CARD'">

							<div class="col-md-6 mb-3 mt-4">
								<label for="nameCard">Nome no cartão</label>
								<input type="text" class="form-control" id="nameCard" name="nameCard" placeholder=""
									v-model="dados.nameCard" required>
								<small class="text-muted">Nome conforme impresso no cartão</small>
							</div>

							<div class="col-md-6 mb-3 mt-4">
								<label for="numCard">Número do cartão</label>
								<input type="text" class="form-control" id="numCard" name="numCard"
									v-model="dados.numCard"
									@change="setState({ name: 'cardNumber', value: dados.numCard })" placeholder=""
									required>
								<img class="cardImg" :src="brandCard">
							</div>

							<div class="col-md-3 mb-3">
								<label for="validCard">Validade</label>
								<input type="text" v-model="dados.validCard" class="form-control" id="validCard"
									v-mask="['##/##', '##/####']" name="validCard" placeholder="12/2030" required>
								<small class="text-muted">Ex: "05/2025"</small>
							</div>

							<div class="col-md-3 mb-3">
								<label for="codSegCard">CVV</label>
								<input type="text" class="form-control" id="codSegCard" name="codSegCard" placeholder=""
									v-model="dados.codSegCard" required>
								<small class="text-muted">Código de segurança</small>
							</div>

							<div class="col-md-6 mb-6">
								<label for="parcela">Parcelas</label>
								<span v-if="!installments.length">
									<br>
									1x <strong>R$ {{ carrinho.valorTotal | formatValue }}</strong> -
									<a @click="showInstallments()" class="fake-link">Alterar</a>
								</span>

								<span v-if="installments.length">
									<select v-model="dados.parcela" type="text" class="form-control" id="parcela"
										name="parcela">
										<option v-for="(parc, i) in installments" :key="i" :value="i + 1">
											{{ parc.quantity }}x R$
											{{ parc | formatInstallment }}
										</option>
									</select>
								</span>

							</div>
							<div class="site-seg">
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green"
									class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
									<path fill-rule="evenodd"
										d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z" />
								</svg>
								<a> Ambiente 100% seguro</a>
							</div>
						</div>

						<div class="ml-0 row col-12 mb-3 mt-5 text-center">
							<div class="boleto" v-if="paymentMethod == 'BOLETO'">
								<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
									class="bi bi-file-earmark-check" viewBox="0 0 16 16">
									<path
										d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
									<path
										d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
								</svg>
								<p> Seu boleto será gerado e enviado via e-mail!</p>
							</div>
							<div class="pix" v-if="paymentMethod == 'PIX'">
								<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor"
									class="bi bi-qr-code" viewBox="0 0 16 16">
									<path d="M2 2h2v2H2V2Z" />
									<path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z" />
									<path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z" />
									<path
										d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z" />
									<path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z" />
								</svg>
								<p>Seu QR code para pagamento será gerado após
									a conferência
									final da compra!</p>
							</div>
						</div>

						<hr>
						<div class="ml-0 row col-12">
							<button type="button" class="btn btn-outline-danger col-5" @click="prev()">
								<b-icon icon="chevron-double-left"></b-icon>Voltar
							</button>
							<div class="col-2"></div>
							<button type="button" class="btn btn-outline-success col-5" @click="updatePayment()">
								Próximo<b-icon icon="chevron-double-right"></b-icon>
							</button>
						</div>
						<hr class="mb-4">

					</form>
				</div>

				<!-- CONFERENCIA DE DADOS -->
				<div class="col-md-8 order-md-1" v-if="step == 3">

					<h4 class="mb-3 ml-0">
						<span class="text-muted">Dados do pedido</span>
					</h4>

					<div class="row">
						<!-- DADOS DO CLIENTE -->
						<h6 style="margin-left: 16px" class="mb-1">Dados Pessoais</h6>

						<div class="col-12">

							<div class="ml-0 card-roud shadow p-0 col-12">
								<div class="card-body p-3 row  mt-2">
									<div class="col-12 col-sm-12 col-md-4">
										<p class="text-muted mb-0" v-if="client.cnpj == null">Nome
											Completo:
											<br>
											<span class="text-uppercase"><b> {{ client.nome }}</b> </span>
										</p>
										<p class="text-muted" v-else> Razão Social:
											<span class="text-uppercase"><b> {{ client.nome }}</b></span>
										</p>


									</div>
									<div class=" col-6 col-sm-12 col-md-4">
										<p class="text-muted" v-if="client.cnpj == null">CPF:
											<br>
											<span><b>{{ client.cpf }}</b></span>
										</p>

										<p class="text-muted" v-else>CNPJ:
											<br>
											<span><b>{{ client.cnpj }}</b></span>
										</p>

									</div>
									<div class="col-6 col-sm-12 col-md-4">
										<p class="text-muted">RG/IE:
											<br>
											<span><b>{{ client.rg }}</b></span>
										</p>

									</div>
									<div class="col-6 col-sm-12 col-md-6">
										<p class="text-muted">Data Nascimento:
											<br>
											<span><b>{{ client.data_nascimento | dateFormat }}</b></span>
										</p>

									</div>
									<div class="col-6 col-sm-12 col-md-6">
										<p class="text-muted">Telefone:
											<br>
											<span><b>{{ client.telefone }}</b></span>
										</p>
									</div>
									<div class="col-12 col-sm-12 col-md-12">
										<p class="text-muted">E-mail:
											<br>
											<span><b>{{ client.email }}</b></span>
										</p>
									</div>
								</div>
							</div>

						</div>
						<!-- ENDEREÇO -->
						<h6 style="margin-left: 16px" class="mb-1 mt-3">Dados da entrega</h6>

						<div class="col-12">
							<div class="ml-0 card-roud shadow p-0 col-12">
								<div class="card-body p-3 row mt-2">

									<div class="col-4">
										<p class="text-muted">Descrição:
											<br>
											<span><b>{{ selectedAddress.nome }}</b></span>
										</p>
									</div>

									<div class="col-6 col-sm-4">
										<p class="text-muted">Cep:
											<br>
											<span><b>{{ selectedAddress.cep }}</b></span>
										</p>
									</div>

									<div class="col-6 col-sm-4">
										<p class="text-muted">Estado:
											<br>
											<span><b>{{ selectedAddress.estado }}</b></span>
										</p>
									</div>

									<div class="col-12 col-sm-4">
										<p class="text-muted">Cidade:
											<br>
											<span><b>{{ selectedAddress.cidade }}</b></span>
										</p>
									</div>

									<div class="col-12 col-sm-4">
										<p class="text-muted">Bairro:
											<br>
											<span><b>{{ selectedAddress.bairro }}</b></span>
										</p>
									</div>

									<div class="col-4">
										<p class="text-muted">Rua:
											<br>
											<span><b>{{ selectedAddress.logradouro }}</b></span>
										</p>
									</div>

									<div class="col-4 col-sm-4">
										<p class="text-muted">Número:
											<br>
											<span><b>{{ selectedAddress.numero }}</b></span>
										</p>
									</div>

									<div class="col-12 col-sm-4">
										<p class="text-muted">Complemento:
											<br>
											<span><b>{{ selectedAddress.complemento }}</b></span>
										</p>
									</div>

								</div>
							</div>
						</div>
						<!-- PAGAMENTO -->
						<h6 style="margin-left: 16px" class="mb-1 mt-3">Dados do Pagamento</h6>

						<div class="col-12">
							<div class="ml-0 card-roud shadow p-0 col-12">
								<div class="card-body p-3 row ">
									<div class="col-12">
										<p class="text-muted">Forma de pagamento:
											<br>
											<span v-if="paymentMethod == 'BOLETO'"><b>BOLETO</b>
												<br>
												<p> *Seu boleto será gerado e enviado via e-mail!</p>
											</span>

											<span v-if="paymentMethod == 'CREDIT_CARD'"><b>CARTÃO DE CREDITO</b>
												<br>
												<p> *<b>{{ dados.parcela }}x</b> no cartão de Credito com final
													<b>{{ dados.numCard.slice(-4) }}</b>
												</p>
											</span>

											<span v-if="paymentMethod == 'PIX'"><b>PIX</b>
												<br>
												<p> *Seu QR code para pagamento será gerado após a conferência final da
													compra!</p>
											</span>
										</p>
									</div>

								</div>
							</div>
						</div>
					</div>

					<hr class="mb-4">
					<div class="ml-0 row col-12">
						<button type="button" class="btn btn-outline-danger col-5" @click="prev()">
							<b-icon icon="chevron-double-left"></b-icon>Voltar
						</button>
						<div class="col-2"></div>
						<button type="button" class="btn btn-outline-success col-5" @click="next()">
							Próximo<b-icon icon="chevron-double-right"></b-icon>
						</button>
					</div>
					<hr class="mb-4">
				</div>

				<!-- PEDIDO CONCLUIDO -->
				<div class="col-12 order-md-1" v-if="step == 4">
					<div class="mb-3 ml-0 text-center text-success">
						<div>
							<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor"
								class="bi bi-bag-check mb-2" viewBox="0 0 16 16">
								<path fill-rule="evenodd"
									d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
								<path
									d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
							</svg>
						</div>
						<p class="text-muted ">Pedido concluído com sucesso!</p>
						<a class="btn btn-success" v-if="urlBoleto != '' && paymentMethod == 'BOLETO'" :href="urlBoleto"
							target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
								class="bi bi-upc-scan" viewBox="0 0 16 16">
								<path
									d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" />
							</svg>
							Baixar boleto!
						</a>
					</div>

					<!-- <div class="text-center homepg">
						<b-button variant="outline" href="/">
							<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"
								class="bi bi-house-heart" viewBox="0 0 16 16">
								<path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982Z" />
								<path
									d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
							</svg>
						</b-button>
					</div> -->

				</div>

			</div>

		</div>
	</div>

</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import ClientAdress from '~/components/ClientAdress.vue';
export default {
	middleware: ['initialize', 'checkout'],
	data() {
		return {
			cliente: {
				codigo: 0
			},
			dados: {
				parcela: 1
			},
			selectedAddress: {},
			selectedAddressIndex: 0,
			cupom: "",
			delivery: [],
			edditing: false,
			selectedPayment: 0,
			paymentMethod: "CREDIT_CARD",
			paymentMethods: [
				{
					name: "Cartão de Credito",
					type: "CREDIT_CARD",
					icon: "cart"
				},
				{
					name: "Boleto",
					type: "BOLETO",
					icon: "paper"
				},
				{
					name: "Pix",
					type: "PIX",
					icon: "qrcode"
				}
			],
			parcelas: [],
			step: 0,
			showParcelas: false,
			urlBoleto: '',
			internval: null
		};
	},
	computed: {
		...mapGetters({
			client: "client/getClient",
			carrinho: "cart/getCart",
			brandCard: "payment/brandCard",
			installments: "payment/getInstallments",
			senderHash: "payment/getSanderHash"
		}),
		validateStep() {
			if (this.step == 1) {
				if (this.edditing) return this.edditing
				return !(!!this.carrinho.frete?.descricao);
			}
			return true;
		}
	},
	destroyed() {
		if (this.internval) {
			clearInterval(this.internval);
			this.$nextTick(() => { this.$nuxt.$loading.finish(); });
		}
	},
	mounted() {
		this.$nextTick(async () => {
			this.$nuxt.$loading.start();

			this.internval = setInterval(() => {

				console.log(this.client);

				if (this.client.initialized) {
					if (this.client.codigo) {
						this.step = 1;
					}

					this.$nuxt.$loading.finish();
					clearInterval(this.internval);
				}
			}, 100);

			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = "https://stc" + (window.ENV.SANDBOX == true ? ".sandbox" : "") + ".pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js";
			document.body.appendChild(script);
			var self = this;

			script.addEventListener("load", async (r) => {
				var PagSeguroDirectPayment = window["PagSeguroDirectPayment"] || window["_PagSeguroDirectPayment"];

				if (PagSeguroDirectPayment) {
					window.pGatway = PagSeguroDirectPayment;
					setTimeout(() => {
						this.$nuxt.$loading.finish();
						self.startSession();
					}, 50);
				}
			});

			this.setState({ name: 'amount', value: this.carrinho.valorTotal });

			if (window.ENV.SANDBOX == true) {

				this.dados.numCard = '4111111111111111';              //ex: '4111111111111111'
				this.dados.validCard = '12/2030';              //ex: '4111111111111111'
				this.dados.mesValidadeCard = '12';      // ex: '12';
				this.dados.anoValidadeCard = '2030';      // ex: '2030';
				this.dados.codSegCard = '123';

				this.setState({ name: 'cardNumber', value: this.dados.numCard });
				this.setState({ name: 'cvv', value: this.dados.codSegCard });
				this.setState({ name: 'expirationMonth', value: 12 });
				this.setState({ name: 'expirationYear', value: 2030 });
			}
		});
	},
	methods: {
		...mapMutations({
			frete: "cart/setFrete",
			setCupom: "cart/setCupom",
			reinitCart: "cart/reinit",
			setState: "payment/setState"
		}),
		...mapActions({
			getCupom: "cart/getCupom",
			checkCep: "cart/checkCep",
			calcFrete: "cart/getFrete",
			startSession: "payment/startSession",
			getInstallments: "payment/getInstallments",
			makePayment: "payment/makePayment",
			createCardToken: "payment/createCardToken",
			setStoreAddress: "payment/setAddress"
		}),
		setFrete(val) {

			this.delivery = [];
			this.frete(val);

			if (!val) {
				this.validaCep(this.selectedAddress.cep);
			}
		},
		setAddress({ address, index }) {
			this.frete(null);
			this.validaCep(address.cep);
			this.selectedAddress = address;
			this.selectedAddressIndex = index;
			this.setStoreAddress({ address, codpedido: this.carrinho.codpedido, cliente: this.client });
		},
		setEdit(val) {
			this.edditing = val;
		},
		async showInstallments() {
			this.setState({ name: 'amount', value: parseFloat(this.carrinho.valorTotal) });
			await this.setState({ name: 'cardNumber', value: this.dados.numCard });
			this.getInstallments();
		},
		async rescueCode() {
			if (this.cupom != "") {
				this.$toast.info(`Validando cupom (${this.cupom}) ... `);
				var valid = await this.getCupom(this.cupom);
				if (valid !== false) {
					this.setCupom(valid);
				}
				else {
					this.$toast.error(`Cupom (${this.cupom}) Invalido! `);
				}
			}
		},
		async validaCep(cepNumber) {
			this.delivery = [];

			const cep = await this.checkCep(cepNumber);
			if (cep?.erro) {
				this.$toast.error(`CEP invalido... `);
			}
			else {
				this.$toast.info(`Calculando opções de frete... `);
				let frete = await this.calcFrete({ cep });
				frete = frete.map((f) => {
					f.valor = parseFloat(f.valor);
					return f;
				});
				this.delivery = [...new Map(frete.map(item => [item.descricao, item])).values()];
			}
		},
		next() {
			if (this.step < 3) return this.step++;
			this.checkout();
		},
		prev() {

			let x = this.step;

			x--;

			if (this.client.codigo > 0 && this.client.initialized && !x) {
				x++;
			}
			this.step = x;
		},
		setPayment(index) {
			this.selectedPayment = index;
			this.paymentMethod = this.paymentMethods[index].type;
		},
		updatePayment() {

			if (this.paymentMethod == 'CREDIT_CARD') {

				// validate all fields of card and validate card after perform payment
				let expiration = this.dados.validCard.split('/');

				if (parseInt(expiration[1]) < 100) {
					expiration[1] = parseInt('20' + expiration[1]);
				}

				this.setState({ name: 'cvv', value: this.dados.codSegCard });
				this.setState({ name: 'expirationMonth', value: expiration[0] });
				this.setState({ name: 'expirationYear', value: expiration[1] });
				this.setState({ name: 'cardNumber', value: this.dados.numCard });
				this.setState({ name: 'nameCard', value: this.dados.nameCard });

				this.createCardToken();

			}

			this.next();
		},
		async checkout() {

			this.$nuxt.$loading.start();

			try {

				let payment = await this.makePayment({
					codpedido: this.carrinho.codpedido,
					pedido: this.carrinho,
					extra: {
						paymentMethod: this.paymentMethod,
						endereco: this.selectedAddress,
						parcelas: this.dados.parcela,
						senderHash: this.senderHash,
						dados: this.client
					}
				});

				this.reinitCart();

				if (this.paymentMethod == 'BOLETO') {
					this.urlBoleto = payment.url;
				}

				this.step++;
				this.$nuxt.$loading.finish();

			} catch (error) {

				console.error(error);

				this.$toast.error(`erro no servidor, tente novamente mais tarde`);

				this.step--;
				this.$nuxt.$loading.finish();

			}

		}
	},
	components: { ClientAdress }
}
</script>

<style lang="scss">
.checkout {

	padding-top: 20px;
	padding-bottom: 20px;

	.fake-link {
		cursor: pointer;
	}

	.price-position {
		position: absolute;
		top: 10px;
		margin-right: 0;
		right: 0px;
		width: fit-content;
	}

	.site-seg {
		margin-left: 40%;

		svg {
			margin-bottom: 5px;
		}

		a {
			margin-left: 5px;
			color: green;
		}
	}

	.boleto,
	.pix {

		width: 100%;

		svg {
			color: green;
			margin-bottom: 2%;
		}
	}

	.orderdone {
		svg {
			margin-left: 48%;
			color: green;
			margin-bottom: 2%;
		}

		span {
			margin-left: 35%;
		}
	}

	.homepg {
		a {
			margin-left: 3px;
			margin-top: 10px;
			border: 2px solid var(--primary-color);
		}

		svg {
			margin-bottom: 4px;
			color: var(--primary-color);
		}
	}

	@media screen and (max-width: 414px) {
		.boleto {
			margin-top: 1%;

			svg {
				color: green;
				margin-bottom: 2%;
			}

		}

		.pix {
			margin-top: 1%;

			svg {
				color: green;
				margin-bottom: 2%;
			}

		}

		.site-seg {
			margin-left: 26%;
			margin-top: 1%;
		}

		.homepg {
			a {
				margin-left: 5%;
				margin-top: 10px;
				border: 2px solid var(--primary-color);
			}

			svg {
				margin-bottom: 4px;
				color: var(--primary-color);
			}
		}
	}

	.remove-btn {
		cursor: pointer;
		height: 25px;
		background-color: transparent;
		border-radius: 5px;
		padding: 1px 4px 6px 4px;
		color: red;
		position: absolute;
		top: 47%;
		right: 13px;

		&:hover {
			background-color: red !important;
			color: white;
		}
	}

	.card-roud {
		background-color: #fff;
		border-radius: 5px;
	}

	.wizard {
		margin: 20px auto;
		background: #fff;
		border-radius: 5px;

		* {
			// transition: all 500ms;
			transition: all 300ms ease-in-out;
		}

		>div {
			&.wizard-inner {
				position: relative;
				// transition: all 500ms ease-in-out;

			}
		}

		.nav-tabs {
			margin: 40px auto;
			position: relative;
			margin-bottom: 0;
			border-bottom-color: #e0e0e0;

			>li {
				width: 20%;

				a {
					width: 50px;
					height: 50px;
					margin: 20px auto;
					border-radius: 100%;
					padding: 0;
					position: relative;

					&:hover {
						background: transparent;
					}
				}

				&.active {
					>a {
						cursor: default;
						border: 0;
						border-bottom-color: transparent;

						&:hover {
							cursor: default;
							border: 0;
							border-bottom-color: transparent;
						}

						&:focus {
							cursor: default;
							border: 0;
							border-bottom-color: transparent;
						}
					}
				}
			}
		}

		li {
			a {

				&.active span.round-tab {
					background: #fff;
					border: 2px solid var(--first-color);
					color: var(--first-color);
				}

				&:after {
					content: " ";
					position: relative;
					left: 46%;
					top: -20px;
					opacity: 0;
					margin: 0 auto;
					bottom: 0px;
					border: 5px solid transparent;
					border-bottom-color: var(--first-color);
					// transition: all 50ms ease-in-out !important;
				}
			}

			&.active.nav-item:after {
				content: " ";
				position: relative;
				left: 46%;
				top: -20px;
				opacity: 1;
				margin: 0 auto;
				bottom: 0px;
				border: 10px solid transparent;
				border-bottom-color: var(--first-color);
				// transition: all 50ms ease-in-out !important;

			}
		}

		.tab-pane {
			position: relative;
			padding-top: 50px;
		}

		h3 {
			margin-top: 0;
		}
	}

	.connecting-line {
		height: 2px;
		background: #a0a0a0;
		position: absolute;
		width: 80%;
		margin: 0 auto;
		left: 0;
		right: 0;
		top: 50%;
		z-index: 1;
	}

	.connecting-line-progress {
		height: 2px;
		background: var(--first-color);
		position: absolute;
		width: 10%;
		left: 10%;
		right: 0;
		top: 50%;
		z-index: 1;
	}

	span {
		&.round-tab {
			width: 50px;
			height: 50px;
			line-height: 50px;
			display: inline-block;
			border-radius: 100px;
			background: #fff;
			border: 2px solid #a0a0a0;
			z-index: 2;
			position: absolute;
			left: 0;
			text-align: center;
			font-size: 25px;
		}
	}

	.nav-link.active {
		border-color: transparent;
	}

	@media (max-width: 585px) {
		.wizard {
			width: 90%;
			height: auto !important;

			li.active:after {
				content: " ";
				position: absolute;
				left: 35%;
			}

			.nav-tabs>li a {
				width: 50px;
				height: 50px;
				line-height: 50px;
			}
		}

		span.round-tab {
			font-size: 16px;
			width: 50px;
			height: 50px;
			line-height: 50px;
		}
	}

	.card-endereco {
		background-color: var(--first-color-text);
		color: var(--secondary);
		font-size: 0.75rem;

		h5 {
			font-size: 1rem !important;
		}

		&.active {
			background-color: var(--first-color);
			color: var(--first-color-text);
		}

	}

	.frete {
		cursor: pointer;
		transition: all 200ms;

		&:hover {
			background-color: var(--first-color);
			color: var(--first-color-text);
		}
	}

	@media only screen and (max-width: 600px) {
		i.fa {
			font-size: x-large;
		}
	}

	.cardImg {
		position: absolute;
		top: 36px;
		right: 17px;
		opacity: 0.7;
	}

	.limit-text {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.adressList {
		margin-bottom: 10px;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		flex-wrap: nowrap !important;
		padding-bottom: 17px;
	}

	.home a {
		text-decoration: none !important;
		color: black;

		svg {
			margin-top: -3px;
			margin-left: 2px;
			color: var(--first-color);
		}

		&:hover {
			color: #fff;

			svg {
				color: #fff;
			}
		}
	}

	.selectOption {
		padding: 20%;
		transition: all 300ms;
		transform: scale(90%);
		cursor: pointer;

		&:hover {
			background-color: var(--first-color);
			transform: scale(100%);
			box-shadow: 0 2rem 2rem rgba(0, 0, 0, 0.1) !important;
		}
	}
}
</style>