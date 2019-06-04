<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>Crear un Hub</v-card-text>
                </v-card>
            </v-layout>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-text-field v-model="newHub.title" label="Title"></v-text-field>
                    <v-select :items="this.sagas" item-text="titulo" item-value="id" v-model="newHub.idSaga" label="Saga"></v-select>
                    <v-select :items="this.personajes" item-text="nombre" item-value="id" v-model="newHub.idPersonaje" label="Personaje"></v-select>
                    <v-btn @click="back()"> Return </v-btn>
                    <v-btn @click="createHub()"> Create Hub </v-btn>
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
                this.$router.push('/social/' + this.urlSaga)
            })
        },
        print () {
            console.log ("Lo de las sagas y personajes", this.sagas, this.personajes)
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
            urlSaga: 'getIdSaga',
            sagas: 'getSagasRed',
            personajes: 'getPersonajesRed'
        }),
    },
    watch: {

    },
    mounted () {
        this.$store.dispatch("loadSagas")
        this.$store.dispatch("loadPersonajes")
    }
}
</script>

<style>

</style>
