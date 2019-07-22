<template>
    <v-layout row wrap justify-center>
        <v-flex xs12>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>{{forosTxt[currLanguaje]}}</v-card-text>
                </v-card>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-data-table :items="foroData" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                        <v-card @click="goToRoute(data.item.type, data.item.url, data.item.id)" min-width="1" max-width="1280" min-height="1" max-height="1920">
                            <v-img :src="data.item.thumbnail" class="cursorChido"></v-img>
                            <v-card-title class="text-xl-center my-1 cursorChido">{{data.item.titulo}}</v-card-title>
                        </v-card>
                    </template>
                </v-data-table>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            forosTxt: ['Foros', 'Forums'],
            noDataTxt: ['¡¿No hay sagas?!', 'No registered sagas?!']
        }
    },
    methods: {
        goToRoute (type, route, id) {
            switch (type){
                case 'Saga': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + route)
                    })
                    break;
                }
            }
            this.$store.commit("guardarIdSaga", id)
        }
        
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang'
        }),
        sagas () {
            return this.$store.getters.getSagasForo
        },
        foroData () {
            let aux = []
            this.sagas.forEach(elementSagas => {
                if (elementSagas.titulo != null) {
                    aux.push(elementSagas)
                }
            });
            return aux
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadSagas")
    }
}
</script>

<style>

</style>