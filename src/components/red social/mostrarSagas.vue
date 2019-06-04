<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-data-table :items="sagaData" rows-per-page-text="Sagas por página">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url, data.item.id)" ma-2>
                            <td><v-img :src="data.item.thumbnail"></v-img></td>
                            <td class="text-xs-right">{{ data.item.id }}</td>
                            <td class="text-xs-right">{{ data.item.titulo }}</td>
                            <td class="text-xs-right">{{ data.item.type }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('New', 'createHub', 0)"> New Hub </v-btn>
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
                        this.$router.push('/social/' + route)
                    })
                    this.$store.commit("guardarIdSaga", id)
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
    }
}
</script>

<style>

</style>