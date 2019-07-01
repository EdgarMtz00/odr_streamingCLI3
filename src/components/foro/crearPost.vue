<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-card>
                    <v-card>
                        <v-btn @click="formatearTexto('Italic')"><i>I</i></v-btn>
                        <v-btn @click="formatearTexto('Bold')"><b>B</b></v-btn>
                        <v-btn @click="formatearTexto('Link')"> Link </v-btn>
                        <v-btn @click="formatearTexto('Align')"> Align </v-btn>
                        <v-btn @click="formatearTexto('Font')"> Change font </v-btn>
                        <v-btn @click="formatearTexto('Underline')"> Underline </v-btn>
                        <v-btn @click="formatearTexto('Cross')"> Cross </v-btn>
                        <v-btn @click="formatearTexto('Bullet')"> Bullet </v-btn>
                        <v-btn @click="formatearTexto('Break')"> Line break </v-btn>
                    </v-card>
                    <v-card>
                        <v-text-field v-model="newPost.post" label="Post" outline></v-text-field>
                        <div>
                            <p>Preview post: </p>
                            <p v-html="newPost.post"></p>
                        </div>
                        <div v-if="this.postElegido.status">
                            <p>Mensaje citado: </p>
                            <p v-html="this.postElegido.contenido"></p>
                            <p>{{this.postElegido.nickname}}</p>
                        </div>
                        <v-btn @click="createPost"> Create Post </v-btn>
                        <v-btn @click="back()"> Return </v-btn>
                    </v-card>
                </v-card>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            newPost: {
                post: ""
            }
        }
    },
    methods: {
        createPost () {
            let formData = new FormData();
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

            this.$store.dispatch("formatoAlTexto", this.newPost.post)

            if (this.postElegido.status) {
                this.newPost.post = '<div>' + this.nuevoPost + '</div>' + '<div>' + '<p>' + this.postElegido.contenido + '</p>' + '<p>' + this.postElegido.nickname + '</p>' + '</div>'
                this.$store.commit("setCitaTextual", this.newPost.post)
            }

            formData.set('ContenidoPost', this.nuevoPost)
            formData.set('IdUsuario', this.user.id)
            formData.set('FechaDeCreacion', date)
            formData.set('IdThread', this.topicElegido)

            this.axios.post("http://localhost/Odr/connections/forum/createPost.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        },
        back () {
            this.$nextTick(() => {
                this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory + '/' + this.urlThread)
            })
        },
        formatearTexto (type) {
            switch (type) {
                case 'Bold':
                    this.newPost.post = this.newPost.post + ' !b!Message!b!'
                    break;
                case 'Italic':
                    this.newPost.post = this.newPost.post + ' !i!Message!i!'
                    break;
                case 'Link':
                    this.newPost.post = this.newPost.post + ' <a href="URL">Mensaje</a>'
                    break;
                case 'Align':
                    this.newPost.post = this.newPost.post + ' "jtf/lft/ctr/rgt"Message"jtf/lft/ctr/rgt"'
                    break;
                case 'Font':
                    this.newPost.post = this.newPost.post + ' "a3/a6/t3/t6"Message"a3/a6/t3/t6"'
                    break;
                case 'Underline':
                    this.newPost.post = this.newPost.post + ' !u!Message!u!'
                    break;
                case 'Cross':
                    this.newPost.post = this.newPost.post + ' !s!Message!s!'
                    break;
                case 'Bullet':
                    this.newPost.post = this.newPost.post + ' !l!!e!Message 1!e!!e!Message 2!e!!e!Message 3!e!!l!'
                    break;
                case 'Break':
                    this.newPost.post = this.newPost.post + ' !j!Message!j!'
                    break;
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
        }),
        topicElegido () {
            return this.$store.getters.getTopicElegido
        },
        postElegido () {
            return this.$store.getters.getPostElegido
        },
        nuevoPost () {
            return this.$store.getters.getNuevoPost
        }
    },
    watch: {

    },
    mounted () {
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
        this.urlThread = this.$route.params.urlThread
    },
    destroyed () {
        this.postElegido.status = false
    }
}
</script>

<style>

</style>
