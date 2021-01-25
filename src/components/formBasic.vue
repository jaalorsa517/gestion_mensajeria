<template lang="pug">
  form#form-basic(@submit.prevent="onSubmit")
    .info(v-show="errors.length")
      ul(v-for="error in errors")
        li {{error}}
    h2 {{title}}
    input.username(autocomplete="username" name="username" v-model="username" placeholder="Nombre de usuario")
    input.password(type="password" name="username" v-model="password" placeholder="Contraseña")
    input.submit(v-if="!isRequest" type="submit" value="Confirmar" ) 
    spinner(v-else line-bg-color="#eaac7f" line-fg-color="#91684a")
    slot
</template>

<script>
import { post, get } from "@scripts/consumer_api.js";
import Spinner from "vue-simple-spinner";

export default {
  name: "FormBasic",
  components: {
    Spinner,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data: function() {
    return {
      username: "",
      password: "",
      response: null,
      errors: [],
      isRequest: false,
    };
  },
  methods: {
    onSubmit: function() {
      // console.log(this.$router.path);
      if (this.validate(this.username) && this.validate(this.password)) {
        this.isRequest = true;
        get("/").then((response) => {
          console.log(response);
          this.isRequest = false;
        });
        // post(this.$router.path, {
        //   username: this.username,
        //   password: this.password,
        // })
        //   .then((response) => console.log("respuesta es " + response))
        //   .catch((error) => console.log(error.toJSON()));
      } else {
        this.errors.push("Rellene los campos");
        setTimeout(() => {
          this.errors.pop();
        }, 3000);
      }
    },
    validate: (data) => (data ? true : false),
  },
};
</script>

<style lang="stylus">

#form-basic
	column-center()
	size-box(300px,auto)
	min-width 300px
	max-width 300px
	margin auto
	padding 10px
	border-radius 10px
	border-top 10px solid color-1
	shadow-box()

	input
		margin-roof-floor(10px)

	.submit
		font-weight bold
.info
	size-box(100%,auto)
	font-size 1em
	text-align start
	color color-2
	border-radius 15px
	background-color color-1
</style>
