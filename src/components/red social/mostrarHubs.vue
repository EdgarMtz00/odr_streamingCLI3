<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Hubs</v-card-text>
                </v-card>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-data-table :items="redData" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                            <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url)">{{ data.item.titulo }}</td>
                            <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url)">{{ data.item.creador }}</td>
                            <td class="text-xs-left my-1"><v-icon @click="report = !report">report</v-icon></td>
                            <td class="text-xs-left my-1" v-if="report == true"><v-text-field :label="reportTxt[currLanguaje]" v-model="userReport"></v-text-field><v-btn @click="reportarHub(data.item)">{{enviarTxt[currLanguaje]}}</v-btn></td>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()">{{returnTxt[currLanguaje]}}</v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            noDataTxt: ['No hay hubs para este contenido', 'No hubs for this content'],
            returnTxt: ['Regresar', 'Return'],
            confirmTxt: ['¿Quieres reportar este Hub?', 'Do you want to report this Hub?'],
            userReport: '',
            report: false,
            reportTxt: ['Escribe tu reporte aquí', 'Write your report here'],
            enviarTxt: ['Enviar Reporte', 'Send Report']
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
            let confirmar = confirm(this.confirmTxt[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                report: this.userReport,
                content: reportedHub
            }
            this.$store.dispatch("reportarHub", payload)
        }
    },
    computed: {
        ...mapGetters ({
            currLanguaje: 'getUserLang',
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