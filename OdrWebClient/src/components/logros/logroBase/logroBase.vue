<template>
    <v-layout row wrap justify-center>
        <v-flex xs12>
            <!--
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>{{forosTxt[currLanguaje]}}</v-card-text>
                </v-card>
            </v-layout>-->
            <v-layout row wrap justify-center>
                <v-data-table :items="logros">
                    <template slot="items" slot-scope="data">
                        <td>
                        <v-card min-width="1" max-width="1280" min-height="1" max-height="1920">
                            <!-- TODO: LOGRO -->
                            <p>{{data.item.IdLogro}}</p>
                        </v-card>
                        </td>
                    </template>
                </v-data-table>
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
        
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            user: 'getUserData'
        }),
        logros () {
            let aux = []
            this.$store.getters.getLogros.forEach(logro => {
                aux.push(logro)
            });
            return aux
        }
    },
    mounted () {
        this.$store.dispatch("loadLogros", this.user.id)
    }
}
</script>