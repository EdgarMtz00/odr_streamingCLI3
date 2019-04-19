<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-btn @click="back()"> Return </v-btn>
            <v-text-field v-model="newTopic.title" label="Title">
            </v-text-field>
            <v-text-field v-model="newTopic.post" label="Post">
            </v-text-field>
            <v-btn @click="createTopic()"> Create Thread </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            newTopic: {
                title: "",
                post: "",
                fecha: ""
            }
        }
    },
    methods: {
        createTopic () {
            let formData = new FormData();
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();

            formData.set('TituloThread', this.newTopic.title)
            formData.set('ContenidoPost', this.newTopic.post)
            formData.set('IdUsuario', this.user.id)
            formData.set('IdSaga', this.sagaElegida)
            formData.set('IdCategoria', this.categoriaElegida)
            formData.set('FechaDeCreacion', date)

            this.axios.post("http://localhost/Odr/connections/forum/createTopic.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        },
        back () {
            this.$nextTick(() => {
                this.$router.push('/forums/' + this.urlSaga + '/' + this.urlCategory)
            })
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
        }),
        sagaElegida () {
            return this.$store.getters.getSagaElegida
        },
        categoriaElegida () {
            return this.$store.getters.getCategoriaElegida
        },
    },
    watch: {

    },
    mounted () {
        this.urlSaga = this.$route.params.urlSaga
        this.urlCategory = this.$route.params.urlCategory
    }
}
</script>

<style>

</style>
