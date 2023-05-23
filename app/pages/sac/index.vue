<template>
  <div>
    <div class="container">
      <div class="col-12 col-sm-12">
        <p style="margin-top: 10px">
          <span class="text-secondary" style="margin-left:-20px;">
            <b-icon icon="caret-right"></b-icon> Fale Conosco
          </span>
        </p>

        <div class="row">
          <div class="col-12 row">
            <form action="" method="post" role="form"></form>
            <div class="col-6">
              <div class="form-group has-feedback">
                <label class="control-label" for="nome">Seu Nome: </label>
                <div class="form-group has-feedback">
                  <input
                    class="form-control ng-untouched ng-pristine ng-valid"
                    type="text"
                    data-rule-minlength="5"
                    placeholder="Seu nome"
                    data-rule-required="true"
                    id="nome"
                    name="nome"
                  />
                </div>
              </div>
              <div class="form-group has-feedback">
                <label for="email" class="control-label">E-mail: </label>
                <div>
                  <input
                    class="form-control ng-untouched ng-pristine ng-valid"
                    type="email"
                    placeholder="Seu e-mail"
                    data-rule-email="true"
                    data-rule-required="true"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
              <div class="form-group has-feedback">
                <label for="fone" class="control-label"> Telefone: </label>
                <div>
                  <input
                    class="form-control ng-untouched ng-pristine ng-valid"
                    type="tel"
                    v-mask="'(##) #####-####'"
                    placeholder="Seu telefone"
                    data-rule-required="true"
                    id="fone"
                    name="fone"
                    maxlength="15"
                  />
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="form-group has-feedback">
                <label for="mensagem" class="control-label"> Mensagem </label>
                <div>
                  <textarea
                    class="form-control ng-untouched ng-pristine ng-valid"
                    name="mensagem"
                    id="mensagem"
                    placeholder="Sua mensagem"
                    data-rule-minlength="3"
                    data-rule-required="true"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <button type="button" class="btn btn-outline-secondary">
                ENVIAR MENSAGEM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.form-group{
  margin-bottom: 1rem;
}

</style>
