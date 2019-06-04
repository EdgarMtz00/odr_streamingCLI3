<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-data-table :items="reporteData" rows-per-page-text="Reportes por página">
                    <template slot="items" slot-scope="data">
                        <v-layout>
                            <v-card>
                                <v-card-text>Comentario reportado</v-card-text>
                                <v-card-text>{{ data.item.comentarioReportado }}</v-card-text>
                                <v-card-text>{{ data.item.idUsuarioDelComentario }} {{ data.item.idComentario }}</v-card-text>
                                <v-card-text>Detalles del reporte</v-card-text>
                                <v-card-text>{{ data.item.textoDelReporte }}</v-card-text>
                                <v-card-text>{{ data.item.nickname }} {{ data.item.urlComentario }}</v-card-text>
                                <v-card-actions><v-btn @click="eliminarComentario (urlComentario, data.item)">Eliminar comentario</v-btn><v-btn @click="ignorarReporte">Ignorar reporte</v-btn></v-card-actions>
                            </v-card>
                        </v-layout>
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
        eliminarComentario (route, comment) {
            let payload = {
                url: route,
                comentario: comment
            }
            this.$store.dispatch('eliminarComentario', payload)
        },
        ignorarReporte () {

        }
    },
    computed: {
        reportes () {
            return this.$store.getters.getReportesComentarios
        },
        reporteData () {
            let aux = []
            this.reportes.forEach(elementReporte => {
                aux.push(elementReporte)
            });
            return aux
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadReportesComentarios")
    }
}
</script>

<style>

</style>