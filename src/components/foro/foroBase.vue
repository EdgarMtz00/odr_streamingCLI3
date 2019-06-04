<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout>
                <v-flex>
                    <v-layout row wrap justify-center>
                        <v-card class="text-xs-left my-1">
                            <v-card-text>Foros</v-card-text>
                        </v-card>
                    </v-layout>
                    <v-layout row wrap justify-center>
                        <v-data-table :items="foroData" hide-actions hide-headers no-data-text="¡¿No hay sagas?!">
                            <template slot="items" slot-scope="data">
                                <v-layout @click="goToRoute(data.item.type, data.item.url, data.item.id)">
                                    <td class="text-xs-left my-1 cursorChido"><v-img :src="data.item.thumbnail"></v-img></td>
                                    <td class="text-xs-left my-1 cursorChido">{{ data.item.id }}</td>
                                    <td class="text-xs-left my-1 cursorChido">{{ data.item.titulo }}</td>
                                    <td class="text-xs-left my-1 cursorChido">{{ data.item.type }}</td>
                                </v-layout>
                            </template>
                        </v-data-table>
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