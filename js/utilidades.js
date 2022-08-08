new Vue({
  el: "#appEcommerce",
  data: {
    ecommerce: false,
  },
  mounted() {
    this.getEcommerceFlag();
  },
  methods: {
    getEcommerceFlag() {
      let dataOut = JSON.parse(sessionStorage.getItem("appData"));
      this.ecommerce = dataOut.Ecommerce;
    },
  },
});
