<template>
    <v-layout row wrap justify-center>
        <v-flex mx-1 my-1>
            <v-card>
                <v-btn @click="back()"> Return </v-btn>
                <v-text-field v-model="newHub.title" label="Title">
                </v-text-field>
                <v-text-field v-model="newHub.idSaga" label="Id Saga">
                </v-text-field>
                <v-text-field v-model="newHub.idPersonaje" label="Id Personaje">
                </v-text-field>
                <v-btn @click="createHub()"> Create Hub </v-btn>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            newHub: {
                title: "",
                idSaga: "",
                idPersonaje: ""
            }
        }
    },
    methods: {
        createHub () {
            let formData = new FormData();

            formData.set('TituloHub', this.newHub.title)
            formData.set('IdUsuario', this.user.id)
            formData.set('IdSaga', this.newHub.idSaga)
            formData.set('IdPersonaje', this.newHub.idPersonaje)

            this.axios.post("http://localhost/Odr/connections/socialNetwork/createHub.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        },
        back () {
            this.$nextTick(() => {
                this.$router.push('/social/')
            })
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
        }),
    },
    watch: {

    },
    mounted () {

    }
}
</script>

<style>

</style>
