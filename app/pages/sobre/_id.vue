<template>
  <div class="container">
    <br />
    <h4>{{ title }}:</h4>
    <div class="row" v-if="content">
      <p v-html="content"></p>
    </div>
  </div>
</template>

<style>
h4 {
  margin-left: -15px;
}
</style>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      code: "",
      content: "",
      title: "",
    };
  },
  mounted() {
    this.code = this.$route.params.id;
    this.title = this.code.replace("_", " ");
    this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1).toLowerCase();
    this.load();
  },
  methods: {
    ...mapActions({
      getText: "texto/getText",
    }),
    async load() {
      const txt = await this.getText(this.code);
      this.content = txt;
    },
  },
};
</script>
