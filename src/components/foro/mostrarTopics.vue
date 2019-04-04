<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-autocomplete :items="topicData" item-text="titulo" prepend-inner-icon="search"
             color="black" background-color="white" label="Buscar" clearable>
                <template slot="item" slot-scope="data">
                    <v-list-tile-avatar  @click="goToRoute(data.item.type, data.item.url)">
                        <img :src="data.item.thumbnail">
                    </v-list-tile-avatar>
                    <v-list-tile-content @click="goToRoute(data.item.type, data.item.url)">
                        <v-list-tile-title v-html="data.item.titulo"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.type"></v-list-tile-sub-title>
                    </v-list-tile-content>
                </template>
            </v-autocomplete>
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
                    break;
                }
            }
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