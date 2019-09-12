<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-flex xs12 md10 lg6>
                    <v-card class="text-xs-left my-1">
                        <v-card-text>{{respuestasTxt[currLanguaje]}}</v-card-text>
                        <v-card-title primary-title>{{ threadElegido.titulo }}</v-card-title>
                        <v-card-text v-html="threadElegido.contenidoThread"></v-card-text>
                        <v-card-text>{{ threadElegido.nickname }} {{ threadElegido.fecha }}</v-card-text>
                        <v-card-actions v-show="hayUsuario">
                            <v-btn color="red" icon @click="reputacionDown (threadElegido)">
                                <v-icon>thumb_down</v-icon>
                            </v-btn>
                            <v-btn color="success" icon @click="reputacionUp (threadElegido)">
                                <v-icon>thumb_up</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="postData" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                        <td>
                        <v-layout row wrap justify-center>
                            <v-flex xs12>
                                <v-card class="text-xs-left my-1">
                                    <v-card-actions>
                                        <v-btn color="red" icon @click="reputacionDown (data.item)"
                                        v-show="hayUsuario">
                                            <v-icon>thumb_down</v-icon>
                                        </v-btn>
                                        <v-btn color="success" icon @click="reputacionUp (data.item)"
                                        v-show="hayUsuario">
                                            <v-icon>thumb_up</v-icon>
                                        </v-btn>
                                    </v-card-actions>

                                    <v-card-text v-html="data.item.contenidoPost"></v-card-text>
                                    <v-card-text> {{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                                    
                                    <v-card-actions>
                                        <v-btn @click="citarPost(data.item.contenidoPost, data.item.nickname, data.item.fecha)">{{quoteTxt[currLanguaje]}}</v-btn>
                                        <v-btn v-if="usuario.id != data.item.idUsuario" @click="data.item.report = !data.item.report">{{reportTxt[currLanguaje]}}</v-btn>
                                    </v-card-actions>
                                </v-card>
                                <v-card v-if="data.item.report == true">
                                    <v-text-field :label="reportLabelTxt[currLanguaje]" v-model="userReport"></v-text-field>
                                    <v-btn @click="reportarPost(data.item)">{{enviarTxt[currLanguaje]}}</v-btn>
                                </v-card>
                            </v-flex>
                        </v-layout>
                        </td>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()">{{returnTxt[currLanguaje]}}</v-btn>
                <v-btn @click="goToRoute('New', 'createPost')">{{newTxt[currLanguaje]}}</v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            quote: {
                content: '',
                nickname: '',
                date: '',
                status: false
            },
            userReport: '',
            respuestasTxt: ['Repuestas del Topic: ', 'Topic replies: '],
            quoteTxt: ['Citar Post', 'Quote Post'],
            reportTxt: ['Reportar Post', 'Report Post'],
            enviarTxt: ['Enviar Reporte', 'Send Report'],
            reportLabelTxt: ['Escribe tu reporte aquí', 'Write your report here'],
            returnTxt: ['Regresar', 'Return'],
            newTxt: ['Nuevo Post', 'New Post'],
            confirmTxt: ['¿Deseas reportar este Post?', 'Do you want to report this Post?'],
            noDataTxt: ['No hay respuestas (aún)', 'There are no replies (yet)']
        }
    },
    created () {
        // Cargar la reputacion desde que se crea el componente
        this.$store.dispatch('loadReputacion', this.usuario.id)
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/' + this.urlThread + '/' + route)
                    })
                    break;
                }
            }
        },
        back () {
            this.$nextTick(() => {
                    this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory)
            })
        },
        citarPost (content, nickname, fecha) {
            this.quote.content = content
            this.quote.nickname = nickname
            this.quote.date = fecha
            this.quote.status = true
            this.$store.commit('setPostElegido', this.quote)
            this.goToRoute('New', 'createPost')
        },
        reportarPost (reportedPost) {
            let confirmar = confirm(this.confirmTxt[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                report: this.userReport,
                content: reportedPost
            }
            this.$store.dispatch("reportarPost", payload)
        },
        reputacionUp (publicacion) {
            let payload
            let id
            if (publicacion.type == "Topic") { // Es el hilo principal
                id = publicacion.url + "-" + publicacion.idUsuario + "-" + this.usuario.id
            } else if (publicacion.type == "Post") { // Son repsuestas al hilo
                id = publicacion.idPost + "-" + publicacion.idUsuario + "-" + this.usuario.id
            }
            payload = {
                thumbup: true, // Para decirle que va a ser un thumbup
                idUsuario: publicacion.idUsuario,
                id: id
            }
            this.$store.dispatch('reputacion', payload)
        },
        reputacionDown (publicacion) {
            let payload
            let id
            if (publicacion.type == "Topic") { // Es el hilo principal
                id = publicacion.url + "-" + publicacion.idUsuario + "-" + this.usuario.id
            } else if (publicacion.type == "Post") { // Son repsuestas al hilo
                id = publicacion.idPost + "-" + publicacion.idUsuario + "-" + this.usuario.id
            }
            payload = {
                thumbdown: true, // Para decirle que va a ser un thumbdown
                idUsuario: publicacion.idUsuario,
                id: id
            }
            this.$store.dispatch('reputacion', payload)
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            usuario: 'getUserData'
        }),
        posts () {
            return this.$store.getters.getPostsTopic
        },
        postData () {
            let aux = []
            this.posts.forEach(elementPosts => {
                if (elementPosts.idThread == this.topicElegido) {
                    aux.push(elementPosts)
                }
            });
            return aux
        },
        topicElegido () {
            return this.$store.getters.getTopicElegido
        },
        threadElegido () {
            return this.$store.getters.getThread
        },
        hayUsuario () {
            return (this.usuario.id != null)
        }
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadPosts")
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
        this.urlThread = this.$route.params.urlThread
        this.quote.status = false
    }
}
</script>

<style>

</style>