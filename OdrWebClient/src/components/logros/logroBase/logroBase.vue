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
                        <md-card min-width="1" max-width="1280" min-height="1" max-height="1920">
                            <!-- Avance -->
                            <md-card-expand>
                                <md-card-header>
                                    <div class="md-title">{{data.item.titulo}}</div>
                                    <md-card-actions md-alignment="space-between">
                                        <md-card-expand-trigger>
                                            <md-button class="md-primary">Ver Mas</md-button>
                                        </md-card-expand-trigger>
                                    </md-card-actions>
                                </md-card-header>
                                <md-card-expand-content>
                                    <md-card-content md-alignment="space-between">
                                    <div>{{data.item.descripcion}}</div>
                                    <div>Recompensa: {{data.item.recompensa}} <i class="material-icons">monetization_on</i></div>
                                    </md-card-content>
                                </md-card-expand-content>
                                <v-progress-linear
                                color="light-green darken-4"
                                height="10"
                                :value= "(data.item.progreso * 100) / data.item.repeticiones "
                                striped></v-progress-linear>
                            </md-card-expand>
                            <!-- Avance -->
                        </md-card>
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