const endPoint = "https://preliquidadortest.azurewebsites.net/api/TariffPositions";

const vp = new Vue({
    el: '#app',
    data: {
        options: []
    }
    ,
    mounted() {
        this.getTp();
    },
    methods: {
        getTp() {
            var dataout = localStorage.getItem('tp');
            if(dataout == null)
            {
                axios.get(endPoint)
                .then((response) => {
                    localStorage.setItem('tp',JSON.stringify(response.data));
                    this.options = response.data;
                }).catch((error) => {
                    console.log(error);
                })
            }else{
                var tp = localStorage.getItem('tp');
                this.options = JSON.parse(tp);
            }
        }
    }
});