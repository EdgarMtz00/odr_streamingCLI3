<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-btn @click="back"> Return </v-btn>
                <v-data-table :items="categoriaData" rows-per-page-text="Categorías por página">
                    <template slot="items" slot-scope="data">
                            <td class="text-xs-right my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.id }}</td>
                            <td class="text-xs-right my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.nombre }}</td>
                            <td class="text-xs-right my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.descripcion }}</td>
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
        },
        back  () {
            this.$nextTick(() => {
                this.$router.push('/forums/')
            })
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
    .cursorChido {
        cursor: pointer;
    }
</style>