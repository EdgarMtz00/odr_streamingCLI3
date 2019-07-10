<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-data-table :items="reporteData" hide-actions hide-headers no-data-text="No hay reportes">
                    <template slot="items" slot-scope="data">
                        <v-layout>
                            <v-card>
                                <v-card-text>Contenido reportado</v-card-text>
                                <v-card-text v-html="data.item.comentarioReportado"></v-card-text>
                                <v-img v-if="data.item.type == 'Imagen'" :src="data.item.thumbnail"></v-img>
                                <v-card-text>{{ data.item.idUsuarioDelComentario }} {{ data.item.idComentario }}</v-card-text>
                                <v-card-text>Detalles del reporte</v-card-text>
                                <v-card-text>{{ data.item.textoDelReporte }}</v-card-text>
                                <v-card-text>{{ data.item.nickname }} {{ data.item.urlComentario }} {{ data.item.type }}</v-card-text>
                                <v-card-actions><v-btn @click="eliminarContenido (data.item)">Eliminar contenido</v-btn><v-btn @click="ignorarReporte (data.item)">Ignorar reporte</v-btn></v-card-actions>
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
        eliminarContenido (contenido) {
            console.log("El objeto contenido: ", contenido)
            if (contenido.type == 'Comentario') {
                this.eliminarComentario(contenido)
            } else {
                this.$store.dispatch("eliminarReporte", contenido)
            }
        },
        eliminarComentario (comment) {
            let payload = {
                url: comment.urlComentario,
                comentario: comment
            }
            this.$store.dispatch('eliminarComentario', payload)
        },
        ignorarReporte (reporte) {
            this.$store.dispatch("ignorarReporte", reporte)
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