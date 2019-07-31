<template>
    <v-layout row wrap>
        <v-flex>
            <v-layout row wrap justify-center="">
                <v-card class="text-xs-left my-1">
                    <v-card-title>{{socialNetworkTxt[currLanguaje]}}</v-card-title>
                </v-card>
                <v-icon @click="goToRoute('New', 'createHub')">add_circle</v-icon>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-flex>
                    <v-layout row wrap justify-center>
                        <v-card class="text-xs-left my-1">
                            <v-card-text>Sagas</v-card-text>
                        </v-card>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-data-table :items="sagaData" hide-headers :no-data-text="noDataTxt[currLanguaje]">
                            <template slot="items" slot-scope="data">
                                <td>
                                <v-card @click="goToRoute(data.item.type, data.item.id)" class="my-1 cursorChido">
                                    <v-img :src="data.item.thumbnail"></v-img>
                                    <v-card-text>{{ data.item.titulo }}</v-card-text>
                                </v-card>
                                </td>
                            </template>
                        </v-data-table>
                    </v-layout>
                </v-flex>
                <v-flex>
                    <v-layout row wrap justify-center>
                        <v-card class="text-xs-left my-1">
                            <v-card-text>{{personajesTxt[currLanguaje]}}</v-card-text>
                        </v-card>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-data-table :items="personajeData" hide-headers :no-data-text="noDataTxt[currLanguaje]">
                            <template slot="items" slot-scope="data">
                                <td>
                                <v-card @click="goToRoute(data.item.type, data.item.id)" class="my-1 cursorChido">
                                    <v-img :src="data.item.thumbnail" small></v-img>
                                    <v-card-text>{{data.item.nombre}}</v-card-text>
                                </v-card>
                                </td>
                            </template>
                        </v-data-table>
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
            socialNetworkTxt: ['Red Social', 'Social Network'],
            noDataTxt: ['¡¿No Hay nada?!', 'There is nothing?!'],
            personajesTxt: ['Personajes', 'Characters']
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'Saga': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + route)
                    })
                    this.$store.commit("guardarIdSaga", route)
                    break;
                }
                case 'Personaje': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + route)
                    })
                    this.$store.commit("guardarIdPersonaje", route)
                    break;
                }
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/' + route)
                    })
                    break;
                }
            }
        }
        
    },
    computed: {
        ...mapGetters ({
            currLanguaje: 'getUserLang',
            personajes: 'getPersonajesRed'
        }),
        sagas () {
            return this.$store.getters.getSagasRed
        },
        sagaData () {
            let aux = []
            this.sagas.forEach(elementSagas => {
                if (elementSagas.titulo != null) {
                    aux.push(elementSagas)
                }
            });
            return aux
        },
        personajeData () {
            let aux = []
            this.personajes.forEach(elementPersonajes => {
                if (elementPersonajes.nombre != null) {
                    aux.push(elementPersonajes)
                }
            });
            return aux
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadSagas")
        this.$store.dispatch("loadPersonajes")
        this.$store.dispatch("clear")
    }
}
</script>

<style>

</style>