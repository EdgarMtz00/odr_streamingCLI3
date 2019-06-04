<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Sagas</v-card-text>
                </v-card>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-data-table :items="sagaData" hide-actions hide-headers no-data-text="¿¡No hay nada!?">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.id)" ma-2 style="cursor: pointer;">
                            <td><v-img :src="data.item.thumbnail"></v-img></td>
                            <td class="text-xs-left my-1">{{ data.item.id }}</td>
                            <td class="text-xs-left my-1">{{ data.item.titulo }}</td>
                            <td class="text-xs-left my-1">{{ data.item.type }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Personajes</v-card-text>
                </v-card>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-data-table :items="personajes" hide-actions hide-headers no-data-text="¿¡No hay nada!?">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.id)" ma-2 style="cursor: pointer;">
                            <td class="text-xs-left my-1">{{ data.item.id }}</td>
                            <td class="text-xs-left my-1">{{ data.item.nombre }}</td>
                            <td class="text-xs-left my-1">{{ data.item.type }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-btn @click="goToRoute('New', 'createHub')">New Hub</v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            
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
            personajes: 'getPersonajesRed'
        }),
        sagas () {
            return this.$store.getters.getSagasRed
        },
        sagaData () {
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
        this.$store.dispatch("loadPersonajes")
        this.$store.dispatch("clear")
    }
}
</script>

<style>

</style>