"use strict";

const paqBaseUrl = "https://fpaq.azurewebsites.net/api/packages/";

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).locale('es').format('LLL')
    }
});

Vue.filter("formatNumber", function (value) {
    return (value).toFixed();
});

const vhis = new Vue({
    el: '#appHis',
    data: {
        results: []
    },
    mounted() {
        this.getPaqs();
    },
    methods: {
        mouseover: function () {
            this.results.DeclaredValue = 'Good!'
        },
        mouseleave: function () {
            this.results.DeclaredValue = 'Hover Me!'
        },
        getPaqs() {
            var dataout = JSON.parse(sessionStorage.getItem('appData'));
            let url = `${paqBaseUrl + dataout.C}/1000`;
            axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + dataout.T
                    }
                })
                .then((response) => {
                    this.loading = false;
                    this.results = response.data;
                    console.log(response.data);
                }).catch((error) => {
                    console.log(error);
                });
        }
    }
});