<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-text-field v-model="newTopic.title" label="Title">
            </v-text-field>
            <v-text-field v-model="newTopic.post" label="Post">
            </v-text-field>
            <v-text-field v-model="newTopic.idUsuario" label="Id Usuario">
            </v-text-field>
            <v-text-field v-model="newTopic.idSaga" label="Id Saga">
            </v-text-field>
            <v-text-field v-model="newTopic.idCategoria" label="Id Categoria">
            </v-text-field>
            <v-text-field v-model="newTopic.fecha" label="Fecha">
            </v-text-field>
            <v-btn @click="createTopic">
                New Topic
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            newTopic: {
                title: "",
                post: "",
                idUsuario: "",
                idSaga: "",
                idCategoria: "",
                fecha: ""
            }
        }
    },
    methods: {
        createTopic(){
            let formData = new FormData();

            formData.set('TituloThread', this.newTopic.title)
            formData.set('ContenidoPost', this.newTopic.post)
            formData.set('IdUsuario', this.newTopic.idUsuario)
            formData.set('IdSaga', this.newTopic.idSaga)
            formData.set('IdCategoria', this.newTopic.idCategoria)
            formData.set('FechaDeCreacion', this.newTopic.fecha)

            this.axios.post("http://localhost/Odr/connections/forum/createTopic.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })

        }
    },
    computed: {
        
    },
    watch: {

    },
    created () {

    }
}
</script>

<style>

</style>
