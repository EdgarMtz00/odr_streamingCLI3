<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-btn @click="back()"> Return </v-btn>
            <v-text-field v-model="newPost.post" label="Post">
            </v-text-field>
            <v-btn @click="createPost"> Create Post </v-btn>
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

            formData.set('ContenidoPost', this.newPost.post)
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
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
        }),
        topicElegido () {
            return this.$store.getters.getTopicElegido
        }
    },
    watch: {

    },
    mounted () {
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
        this.urlThread = this.$route.params.urlThread
    }
}
</script>

<style>

</style>
