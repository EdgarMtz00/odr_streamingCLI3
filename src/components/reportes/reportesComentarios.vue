<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>{{reportesTxt[currLanguaje]}}</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="reporteData" hide-actions hide-headers :no-data-text="noReportTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                        <v-layout>
                            <v-card>
                                <v-card-text>{{contenidoReportadoTxt[currLanguaje]}}</v-card-text>
                                <v-card-text v-html="data.item.comentarioReportado"></v-card-text>
                                <v-img v-if="data.item.type == 'Imagen'" :src="data.item.thumbnail"></v-img>
                                <v-card-text>{{idUsuarioContenidoTxt[currLanguaje]}}{{data.item.idUsuarioDelComentario}}</v-card-text>
                                <v-card-text>{{detallesTxt[currLanguaje]}}</v-card-text>
                                <v-card-text>{{data.item.textoDelReporte}}</v-card-text>
                                <v-card-text>{{idUsuarioReporteTxt[currLanguaje]}}{{data.item.idUsuarioDelReporte}}</v-card-text>
                                <v-card-actions><v-btn @click="eliminarContenido (data.item)">{{eliminarTxt[currLanguaje]}}</v-btn><v-btn @click="ignorarReporte (data.item)">{{ignorarTxt[currLanguaje]}}</v-btn></v-card-actions>
                            </v-card>
                        </v-layout>
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
            reportesTxt: ['Reportes', 'Reports'],
            contenidoReportadoTxt: ['Contenido reportado', 'Reported Content'],
            detallesTxt: ['Detalles del reporte', 'Report details'],
            eliminarTxt: ['Eliminar contenido', 'Delete content'],
            ignorarTxt: ['Ignorar reporte', 'Ignore report'],
            noReportTxt: ['No hay más reportes por mostrar', 'There are no reports left to show'],
            confirmEliminar: ['¿Deseas eliminar este contenido?', 'Do you want to delete this content?'],
            confirmIgnorar: ['¿Deseas ignorar este reporte?', 'Do you want to ignore this report?'],
            idUsuarioContenidoTxt: ['ID del usuario reportado: ', 'ID of the reported user: '],
            idUsuarioReporteTxt: ['ID del usuario que generó el reporte: ', 'ID of the user who reported the content: ']
        }
    },
    methods: {
        eliminarContenido (contenido) {
            console.log("El objeto contenido: ", contenido)
            let confirmar = confirm(this.confirmEliminar[this.currLanguaje])
            if (!confirmar) {
                return
            }
            if (contenido.type == 'Comentario') {
                let payload = {
                    url: contenido.urlComentario,
                    comentario: contenido
                }
                this.$store.dispatch('eliminarReporteComentario', payload)
            } else {
                this.$store.dispatch("eliminarReporte", contenido)
            }
        },
        ignorarReporte (reporte) {
            let confirmar = confirm(this.confirmIgnorar[this.currLanguaje])
            if (!confirmar) {
                return
            }
            this.$store.dispatch("ignorarReporte", reporte)
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            user: 'getUserData'
        }),
        reportes () {
            return this.$store.getters.getReportesComentarios
        },
        reporteData () {
            let aux = []
            this.reportes.forEach(elementReporte => {
                if (elementReporte.textoDelReporte != null) {
                    aux.push(elementReporte)
                }
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