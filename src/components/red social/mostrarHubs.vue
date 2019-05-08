<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-data-table :items="redData" rows-per-page-text="Hubs por página">
                    <template slot="items" slot-scope="data">
                        <v-layout @click="goToRoute(data.item.type, data.item.url)" ma-2>
                            <td class="text-xs-right">{{ data.item.url }}</td>
                            <td class="text-xs-right">{{ data.item.titulo }}</td>
                            <td class="text-xs-right">{{ data.item.creador }}</td>
                            <td class="text-xs-right">{{ data.item.type }}</td>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-btn @click="goToRoute('New', 'createHub', 0)"> New Hub </v-btn>
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
                case 'Hub': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga + '/' + route)
                    })
                    this.$store.commit("guardarIdHub", route)
                    break;
                }
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/' + route)
                    })
                    break;
                }
            }
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/social/')
            })
        }
    },
    computed: {
        ...mapGetters ({
            urlSaga: 'getIdSaga'
        }),
        redes () {
            return this.$store.getters.getRedes
        },
        redData () {
            let aux = []
            this.redes.forEach(elementRedes => {
                if (elementRedes.idSaga == this.idSaga){
                    aux.push(elementRedes)
                }
            });
            return aux
        },
        idSaga () {
            return this.$store.getters.getIdSaga
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadRedes")
    }
}
</script>

<style>

</style>