<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Hubs</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="redData" hide-actions hide-headers no-data-text="No hay Hubs">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url)" ma-2 style="cursor: pointer;">
                            <td class="text-xs-left my-1">{{ data.item.url }}</td>
                            <td class="text-xs-left my-1">{{ data.item.titulo }}</td>
                            <td class="text-xs-left my-1">{{ data.item.creador }}</td>
                            <v-btn @click="reportarHub(data.item)">Report Hub</v-btn>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'Hub': {
                    if (this.urlSaga) {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlSaga + '/' + route)
                        })
                    } else {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.idPersonaje + '/' + route)
                        })
                    }
                    this.$store.commit("guardarIdHub", route)
                    break;
                }
            }
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/social/')
            })
        },
        reportarHub (reportedHub) {
            this.$store.dispatch("reportarHub", reportedHub)
        }
    },
    computed: {
        ...mapGetters ({
            urlSaga: 'getIdSaga'
        }),
        redes () {
            return this.$store.getters.getRedes
        },
        redData () {
            let aux = []
            this.redes.forEach(elementRedes => {
                if (elementRedes.idSaga == this.idSaga || elementRedes.idPersonaje == this.idPersonaje){
                    aux.push(elementRedes)
                }
            });
            return aux
        },
        idSaga () {
            return this.$store.getters.getIdSaga
        },
        idPersonaje () {
            return this.$store.getters.getIdPersonaje
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadRedes")
    }
}
</script>

<style>

</style>