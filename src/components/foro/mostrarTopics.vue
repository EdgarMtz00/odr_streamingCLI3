<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-data-table :items="topicData" rows-per-page-text="Topics por página">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url)">
                            <!--<td class="text-xs-right">{{ data.item.titulo }}</td>
                            <td class="text-xs-right" v-html="data.item.contenidoThread"></td>
                            <td class="text-xs-right">{{ data.item.nickname }}</td>
                            <td class="text-xs-right">{{ data.item.fecha }}</td>-->
                            <v-card>
                                <v-card-title>{{ data.item.titulo }}</v-card-title>
                                <v-card-text v-html="data.item.contenidoThread"></v-card-text>
                                <v-card-text>{{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                            </v-card>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
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
        goToRoute (type, route) {
            switch (type){
                case 'Topic': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/' + route)
                    })
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