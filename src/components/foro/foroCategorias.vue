<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-autocomplete :items="categoriaData" item-text="titulo" prepend-inner-icon="search"
             color="black" background-color="white" label="Buscar" clearable>
                <template slot="item" slot-scope="data">
                    <v-list-tile-content @click="goToRoute(data.item.type, data.item.url, data.item.id)">
                        <v-list-tile-title v-html="data.item.titulo"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="data.item.type"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-content @click="goToRoute(data.item.type, data.item.url, data.item.id)">
                        <v-list-tile-title v-html="data.item.descripcion"></v-list-tile-title>
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
                case 'Categoria': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + route)
                    })
                    break;
                }
            }
            this.$store.commit("guardarIdCategoria", id)
        }
        
    },
    computed: {
        categorias () {
            return this.$store.getters.getCategoriasForo
        },
        categoriaData () {
            let aux = []
            this.categorias.forEach(elementCategorias => {
                aux.push(elementCategorias)
            });
            return aux
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadCategories")
        this.urlSaga = this.$route.params.urlSaga
    }
}
</script>

<style>

</style>