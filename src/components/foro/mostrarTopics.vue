<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Topics</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="topicData" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                            <v-card class="text-xs-left cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item)">
                                <v-card-title>{{ data.item.titulo }}</v-card-title>
                                <v-card-text v-html="data.item.contenidoThread"></v-card-text>
                                <v-card-text>{{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                            </v-card>
                            <v-card>
                                <v-btn @click="reportarBool = !reportarBool">{{reportTopicTxt[currLanguaje]}}</v-btn>
                                <div v-if="reportarBool == true">
                                    <v-text-field :label="reportLabelTxt[currLanguaje]" v-model="userReport"></v-text-field>
                                    <v-btn @click="reportarTopic(data.item)">{{enviarTxt[currLanguaje]}}</v-btn>
                                </div>
                            </v-card>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()">{{returnTxt[currLanguaje]}}</v-btn>
                <v-btn @click="goToRoute('New', 'createTopic')">{{newTxt[currLanguaje]}}</v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            reportarBool: false,
            userReport: '',
            reportLabelTxt: ['Escribe tu reporte aquí', 'Write your report here'],
            enviarTxt: ['Enviar Reporte', 'Send Report'],
            noDataTxt: ['No hay topics (aún)', 'No topics (yet)'],
            reportTopicTxt: ['Reportar Topic', 'Report Topic'],
            returnTxt: ['Regresar', 'Return'],
            newTxt: ['Nuevo Topic', 'New Topic'],
            confirmTxt: ['¿Quieres reportar este Topic?', 'Do you want to report this topic?']
        }
    },
    methods: {
        goToRoute (type, route, thread) {
            switch (type){
                case 'Topic': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/' + route)
                    })
                    this.$store.commit("guardarThread", thread)
                    this.$store.commit("guardarIdThread", route)
                    break;
                }
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/createTopic')
                    })
                    break;
                }
            }
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/forums/' + this.urlSaga)
            })
        },
        reportarTopic (reportedTopic) {
            let confirmar = confirm(this.confirmTxt[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                report: this.userReport,
                content: reportedTopic
            }
            this.$store.dispatch("reportarTopic", payload)
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang'
        }),
        topics () {
            return this.$store.getters.getTopicsCategoria
        },
        topicData () {
            let aux = []
            this.topics.forEach(elementTopics => {
                if (elementTopics.idSaga == this.sagaElegida && elementTopics.idCategoriaForo == this.categoriaElegida) {
                    aux.push(elementTopics)
                }
            });
            return aux
        },
        sagaElegida () {
            return this.$store.getters.getSagaElegida
        },
        categoriaElegida () {
            return this.$store.getters.getCategoriaElegida
        },
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadTopics")
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
    }
}
</script>

<style>

</style>