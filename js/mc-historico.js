"use strict";

const paqBaseUrl = "https://fpaq.azurewebsites.net/api/packages/";
const paqBaseUrlDetail =
  "https://fpaq.azurewebsites.net/api/Packages/GetPackageDetail";

Vue.filter("formatDate", function (value) {
  if (value) {
    return moment(value).subtract(5, "h").format("DD/MM/YYYY hh:mm a");
  }
});

Vue.filter("formatNumber", function (value) {
  return value.toFixed();
});

const vhis = new Vue({
  el: "#appHis",
  data: {
    results: [],
    tracking: {},
  },
  mounted() {
    this.getPaqs();
  },
  methods: {
    mouseover: function () {
      this.results.DeclaredValue = "Good!";
    },
    mouseleave: function () {
      this.results.DeclaredValue = "Hover Me!";
    },
    getPaqs() {
      var dataout = JSON.parse(sessionStorage.getItem("appData"));
      let url = `${paqBaseUrl + dataout.C}/1000`;
      axios
        .get(url, {
          headers: {
            Authorization: "Bearer " + dataout.T,
          },
        })
        .then((response) => {
          this.loading = false;
          this.results = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(packageId) {
      var dataout = JSON.parse(sessionStorage.getItem("appData"));
      let url = paqBaseUrlDetail + "/" + packageId + "/" + dataout.N;
      axios
        .get(url, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: "Bearer " + dataout.T,
          },
        })
        .then((response) => {
          let objResponse = response.data;
          let tracking = objResponse.Tracking;
          tracking.sort(
            (a, b) => new Date(b.DateState) - new Date(a.DateState)
          );
          this.tracking = objResponse;
        })
        .catch((error) => {
          console.log(error);
        });
      window.location = "#modal1";
    },
  },
});
