<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-autocomplete :items="foroData" item-text="titulo" prepend-inner-icon="search"
             color="black" background-color="white" label="Buscar" clearable>
                <template slot="item" slot-scope="data">
                    <v-list-tile-avatar  @click="goToRoute(data.item.type, data.item.url, data.item.id)">
                        <img :src="data.item.thumbnail">
                    </v-list-tile-avatar>
                    <v-list-tile-content @click="goToRoute(data.item.type, data.item.url, data.item.id)">
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
        sagas () {
            return this.$store.getters.getSagasForo
        },
        foroData () {
            let aux = []
            this.sagas.forEach(elementSagas => {
                aux.push(elementSagas)
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