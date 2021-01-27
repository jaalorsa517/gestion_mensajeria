<template lang="pug">
	.dashboard-container
		.info(v-show="messages.length")
			ul(v-for="msg in messages")
				li {{msg}}
</template>

<script>
import { get } from "@/scripts/consumer_api.js";

export default {
  name: "dashboard",
  data: function() {
    return {
      messages: [],
      deliveries: [],
    };
  },
  created: function() {
    if (sessionStorage.getItem("username")) {
      get("/deliveries", {
        username: sessionStorage.getItem("username"),
        password: sessionStorage.getItem("password"),
      })
        .then((response) => {
			this.deliveries= response.data.data
			console.log(this.deliveries)
        })
        .catch((error) => {
          this.showInfo(error.response.data);
        });
    } else {
      this.$router.push("/login");
    }
  },
  methods: {
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
.info
	size-box(100%,auto)
	font-size 1em
	text-align start
	color color-2
	border-radius 15px
	background-color color-1
</style>
