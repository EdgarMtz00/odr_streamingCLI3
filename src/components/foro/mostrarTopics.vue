<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Topics</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="topicData" hide-actions hide-headers no-data-text="No hay topics">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url, data.item)">
                            <v-card class="text-xs-left my-1 cursorChido">
                                <v-card-title>{{ data.item.titulo }}</v-card-title>
                                <v-card-text v-html="data.item.contenidoThread"></v-card-text>
                                <v-card-text>{{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                            </v-card>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-btn @click="goToRoute('New', 'createTopic')"> New Thread </v-btn>
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
        }
    },
    computed: {
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