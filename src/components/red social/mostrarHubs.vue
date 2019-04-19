<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-data-table :items="redData" rows-per-page-text="Foros por página">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url)">
                            <td class="text-xs-right">{{ data.item.url }}</td>
                            <td class="text-xs-right">{{ data.item.titulo }}</td>
                            <td class="text-xs-right">{{ data.item.creador }}</td>
                            <td class="text-xs-right">{{ data.item.type }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'Hub': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga + '/' + route)
                    })
                    break;
                }
            }
            this.$store.commit("guardarIdHub", route)
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/social/')
            })
        }
    },
    computed: {
        redes () {
            return this.$store.getters.getRedes
        },
        redData () {
            let aux = []
            this.redes.forEach(elementRedes => {
                if (elementRedes.idSaga == this.idSaga){
                    aux.push(elementRedes)
                }
            });
            return aux
        },
        idSaga () {
            return this.$store.getters.getIdSaga
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadRedes")
        this.urlSaga = this.$route.params.urlSaga
    }
}
</script>

<style>

</style>