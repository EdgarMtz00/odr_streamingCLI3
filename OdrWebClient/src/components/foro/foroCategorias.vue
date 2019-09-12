<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout>
                <v-flex>
                    <v-layout row wrap justify-center>
                        <v-card class="text-xs-left my-1">
                            <v-card-text>{{categoriaTxt[currLanguaje]}}</v-card-text>
                        </v-card>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-data-table :items="categoriaData" hide-headers :no-data-text="noCategoryTxt[currLanguaje]">
                            <template slot="items" slot-scope="data">
                                <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.nombre }}</td>
                                <td class="text-xs-left my-1 cursorChido" @click="goToRoute(data.item.type, data.item.url, data.item.id)">{{ data.item.descripcion }}</td>
                            </template>
                        </v-data-table>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-btn @click="back()">{{returnTxt[currLanguaje]}}</v-btn>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            categoriaTxt: ['Menú de categorías', 'Category Menu'],
            noCategoryTxt: ['¿¡No hay categorias?!', 'No categorys?!'],
            returnTxt: ['Regresar', 'Return']
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
        ...mapGetters({
            currLanguaje: 'getUserLang'
        }),
        categorias () {
            return this.$store.getters.getCategoriasForo
        },
        categoriaData () {
            let aux = []
            this.categorias.forEach(elementCategorias => {
                if (elementCategorias.nombre != null) {
                    aux.push(elementCategorias)
                }
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