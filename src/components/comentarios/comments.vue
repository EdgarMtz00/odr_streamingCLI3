<template>
    <div>
        <v-dialog v-model="dialog" :fullscreen="xsOnly" v-if="enDialog"
            scrollable persistent
            max-width="800px"
            transition="dialog-bottom-transition">

            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">
                    {{verComentarios[currLanguaje]}}
                </v-btn>
            </template>

            <v-card>
                <v-toolbar color="primary">
                    <v-toolbar-title><h3 class="headline mb-0">{{titulo[currLanguaje]}}</h3></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="black" icon flat @click="dialog = !dialog"><v-icon>close</v-icon></v-btn>
                </v-toolbar>
                <v-card-title primary-title>
                    <v-layout row wrap>
                        
                        <v-flex xs12 v-if="isUserLogged">
                            <v-layout row wrap>
                                <v-text-field box v-model="comentarioModel" :label="tuComentario[currLanguaje]">
                                    <v-avatar slot="prepend"
                                        size="30">
                                        <img :src="user.configuration.imagen">
                                    </v-avatar>
                                </v-text-field>
                                <v-flex xs12>
                                    <v-btn color="primary" block @click="publicarComentario">
                                        {{publicar[currLanguaje]}}
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <v-card-text style="padding-top: 0px !important; height: 100%">
                    
                    <v-divider class="mt-2 mb-3"></v-divider>
                    <v-layout row wrap fill-height align-center justify-center v-if="comentarios <= 0">
                        <v-flex xs4>
                            <v-img contain
                            src="../static/noComments.png"></v-img>
                        </v-flex>
                        <v-flex xs8>
                            <div class="headline">{{noComments[currLanguaje]}}</div>
                        </v-flex>
                    </v-layout>
                    <v-flex xs12 v-for="(comentario, index) in comentarios" :key="index" v-else>
                        <comentario-component :comentario="comentario"></comentario-component>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                </v-card-actions>
            </v-card>
            
        </v-dialog>

        <v-layout row wrap v-else>
            <v-card style="width: 100%;">
                <v-layout row wrap>
                    <v-toolbar color="primary">
                        <v-toolbar-title><h3 class="headline mb-0">{{titulo[currLanguaje]}}</h3></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-title style="width: 100%;">
                        <v-layout row wrap>
                            <v-flex xs12 v-if="isUserLogged">
                                <v-layout row wrap>
                                    <v-text-field box v-model="comentarioModel" :label="tuComentario[currLanguaje]">
                                        <v-avatar slot="prepend"
                                            size="30">
                                            <img :src="user.configuration.imagen">
                                        </v-avatar>
                                    </v-text-field>
                                    <v-flex xs12>
                                        <v-btn color="primary" block @click="publicarComentario">
                                            {{publicar[currLanguaje]}}
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-title>
                    <v-card-text style="padding-top: 0px !important; height: 100%">
                        
                        <v-divider class="mt-2 mb-3"></v-divider>
                        <v-layout row wrap fill-height align-center justify-center v-if="comentarios <= 0">
                            <v-flex xs4>
                                <v-img contain
                                src="https://i.pinimg.com/originals/84/26/6d/84266d79b541f8221b5c8cb230083fd4.png"></v-img>
                            </v-flex>
                            <v-flex xs8>
                                <div class="headline">{{noComments[currLanguaje]}}</div>
                            </v-flex>
                        </v-layout>
                        <v-flex xs12 v-for="(comentario, index) in comentarios" :key="index" v-else>
                            <comentario-component :comentario="comentario"></comentario-component>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                    </v-card-actions>
                </v-layout>
            </v-card>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        enDialog: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            comentarioModel: '',
            dialog: false,
            // Placeholders
            verComentarios: ['Ver comentarios', 'Show comments'],
            titulo: ['Comentarios', 'Comments'],
            publicar: ['Publicar', 'Comment'],
            tuComentario: ['Tu comentario...', 'Your comment...'],
            noComments: ['No hay comentarios para mostrar :c', 'No comments to show :c'],
        }
    },
    methods: {
        publicarComentario () {
            let payload = {
                url: this.$route.fullPath,
                comentario: {
                    idUsuario: this.user.id,
                    comentario: this.comentarioModel,
                    nickname: this.user.configuration.nickname,
                    urlImagen: this.user.configuration.imagen
                }
            }
            this.comentarioModel = ''
            this.$store.dispatch('comentar', payload)
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            comentarios: 'getComentarios',
            user: 'getUserData'
        }),
        xsOnly () {
            return this.$vuetify.breakpoint.xsOnly
        },
        isUserLogged () {
            let id = this.user.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
    }
}
</script>

<style>
    
</style>