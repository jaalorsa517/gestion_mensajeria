<template lang="pug">
  form#form-basic(@submit.prevent="onSubmit")
    .info(v-show="messages.length")
      ul(v-for="msg in messages")
        li {{msg}}
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
      messages: [],
      isRequest: false,
    };
  },
  methods: {
    onSubmit: function() {
      if (this.validate(this.username) && this.validate(this.password)) {
        this.isRequest = true;
        post(this.$route.path, {
          username: this.username,
          password: this.password,
        })
          .then((response) => {
            switch(this.$route.path){
              case "/signin":
                if (response.data.code == 201){
                  this.$router.push('/login')
                }
                break;
              case "/login":
                if (response.data.code == 200){
                  sessionStorage.setItem('username',this.username)
                  sessionStorage.setItem('password',this.password)
                  this.$router.push("/dashboard")
                }
                break;
            }
            this.isRequest = false;
          })
          .catch((error) => {
            if (error.response.status === 401) {
              this.showInfo(error.response.data.message);
              this.isRequest = false;
            }
          });
      } else {
        this.showInfo("Rellene los campos");
      }
    },
    validate: (data) => (data ? true : false),
    showInfo: function(msg) {
      this.messages.push(msg);
      setTimeout(() => {
        this.messages.pop();
      }, 3000);
    },
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
