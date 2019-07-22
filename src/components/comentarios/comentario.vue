<template>
    <div>
        <v-layout row wrap>
            <v-flex xs2 md1 lg1>
                <v-layout column justify-center align-center class="ml-2 mr-2" 
                style="background-color: rgba(0,0,0,0.3); border-radius: 10px;">
                    <v-avatar size="50">
                        <img :src="comentario.urlImagen">
                    </v-avatar>
                    <v-tooltip bottom>
                        <v-btn color="red" icon slot="activator" @click="reportComment = !reportComment"><v-icon>report</v-icon></v-btn>
                        <span>{{reportar[currLanguaje]}}</span>
                    </v-tooltip>
                    <v-tooltip bottom v-if="isOwner">
                        <v-btn color="primary" icon slot="activator" @click="eliminarComentario">
                            <v-icon>remove</v-icon>
                        </v-btn>
                        <span>{{eliminar[currLanguaje]}}</span>
                    </v-tooltip>
                </v-layout>
            </v-flex>

            <v-flex xs10 md11 class="pl-2 pa-2 mb-2" style="background-color: rgba(0,0,0,0.3); border-radius: 10px;">
                <div class="title" style="cursor: pointer;" @click="gotoToPage('profileView/' + comentario.idUsuario)">
                    {{comentario.nickname}}: 
                </div>
                <div :class="{'thinComment': thinComment, 'fullComent': !thinComment}">
                    {{comentario.comentario}}
                    <v-btn color="white" flat small block style="margin-bottom: 0px;" v-if="!thinComment"
                    @click="thinComment = true">
                        {{verMenos[currLanguaje]}}
                    </v-btn>
                </div>
                <v-btn color="white" flat small block style="margin-bottom: 0px;" v-if="thinComment"
                @click="thinComment = false">
                    {{verMas[currLanguaje]}}
                </v-btn>
            </v-flex>

            <v-flex xs10 md11 class="pl-2 pa-2 mb-2" style="background-color: rgba(0,0,0,0.3); border-radius: 10px;" v-if="reportComment">
                    <div>
                        <h2>{{formularioTxt[currLanguaje]}}</h2>
                        <v-text-field name="reporte" :label="reportTxt[currLanguaje]" v-model="reporte"></v-text-field>
                        <v-btn color="success" @click="reportarComentario">{{sendReportTxt[currLanguaje]}}</v-btn>
                    </div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        comentario: {
            type: Object
        },
        reportComment: true,
        reporte: ""
    },
    data () {
        return {
            thinComment: true,
            // Placeholders
            verMas: ['Ver mas...', 'Show more...'],
            verMenos: ['Ver menos...', 'Show less...'],
            reportar: ['Reportar', 'Report'],
            eliminar: ['Eliminar', 'Remove'],
            formularioTxt: ['Formulario de reporte: ', 'Report text: '],
            reportTxt: ['Escribe tu reporte', 'Write your report'],
            sendReportTxt: ['Enviar reporte', 'Send report'],
            confirmEliminar: ['¿Estas seguro de que deseas eliminar tu comentario?', 'Do you want to delete your comment?'],
            confirmReportar: ['¿Estas seguro de que deseas reportar este comentario?', 'Do you want to report this comment?']
        }
    },
    methods: {
        eliminarComentario () {
            let confirmar = confirm(this.confirmEliminar[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                url: this.$route.fullPath,
                comentario: this.comentario
            }
            this.$store.dispatch('eliminarComentario', payload)
        },
        gotoToPage (page) {
            this.$router.push('/' + page)
        },
        reportarComentario () {
            let confirmar = confirm(this.confirmReportar[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                url: this.$route.fullPath,
                comentario: this.comentario,
                usuarioReporte: this.user.id,
                reporte: this.reporte
            }
            this.$store.dispatch('reportarComentario', payload)
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            user: 'getUserData'
        }),
        isOwner () {
            let id = this.$store.getters.getUserData.id
            if (id == this.comentario.idUsuario) {
                return true
            } else {
                return false
            }
        },
    }
}
</script>

<style>
    .thinComment {
        height: 80px;
        overflow-y: hidden;
    }

    .fullComment {
        height: auto;
    }
</style>
