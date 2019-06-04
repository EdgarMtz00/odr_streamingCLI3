<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Respuestas del topic:</v-card-text>
                    <v-card-title primary-title>{{ threadElegido.titulo }}</v-card-title>
                    <v-card-text v-html="threadElegido.contenidoThread"></v-card-text>
                    <v-card-text>{{ threadElegido.nickname }} {{ threadElegido.fecha }}</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="postData" hide-actions hide-headers no-data-text="No hay respuestas">
                    <template slot="items" slot-scope="data">
                        <v-layout row wrap justify-center>
                            <v-card class="text-xs-left my-1">
                                <v-card-text v-html="data.item.contenidoPost"></v-card-text>
                                <v-card-text> {{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                                <v-btn @click="citarPost(data.item.contenidoPost, data.item.nickname, data.item.fecha)">Quote post</v-btn>
                            </v-card>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="back()"> Return </v-btn>
                <v-btn @click="goToRoute('New', 'createPost')"> New Post </v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            quote: {
                content: '',
                nickname: '',
                date: '',
                status: false
            }
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
        }
    },
    computed: {
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