<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>{{respuestasTxt[currLanguaje]}}</v-card-text>
                    <v-card-title primary-title>{{ threadElegido.titulo }}</v-card-title>
                    <v-card-text v-html="threadElegido.contenidoThread"></v-card-text>
                    <v-card-text>{{ threadElegido.nickname }} {{ threadElegido.fecha }}</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="postData" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                        <v-layout row wrap justify-center>
                            <v-card class="text-xs-left my-1">
                                <v-card-text v-html="data.item.contenidoPost"></v-card-text>
                                <v-card-text> {{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                                <v-btn @click="citarPost(data.item.contenidoPost, data.item.nickname, data.item.fecha)">{{quoteTxt[currLanguaje]}}</v-btn>
                                <v-btn @click="reportarBool = !reportarBool">{{reportTxt[currLanguaje]}}</v-btn>
                            </v-card>
                            <v-card v-if="reportarBool == true">
                                <v-text-field :label="reportLabelTxt[currLanguaje]" v-model="userReport"></v-text-field>
                                <v-btn @click="reportarPost(data.item)">{{enviarTxt[currLanguaje]}}</v-btn>
                            </v-card>
                        </v-layout>
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
            reportarBool: false,
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
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang'
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