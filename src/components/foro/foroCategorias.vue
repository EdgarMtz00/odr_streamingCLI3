<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout>
                <v-flex>
                    <v-layout row wrap justify-center>
                        <v-card class="text-xs-left my-1">
                            <v-card-text>Categorías</v-card-text>
                        </v-card>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-data-table :items="categoriaData" hide-actions hide-headers no-data-text="Ha ocurrido un error">
                            <template slot="items" slot-scope="data">
                                <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.id }}</td>
                                <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.nombre }}</td>
                                <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.descripcion }}</td>
                            </template>
                        </v-data-table>
                        <v-btn @click="back()"> Return </v-btn>
                    </v-layout>
                </v-flex>
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