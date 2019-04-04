<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-text-field v-model="newPost.post" label="Post">
            </v-text-field>
            <v-text-field v-model="newPost.idUsuario" label="Id Usuario">
            </v-text-field>
            <v-text-field v-model="newPost.idThread" label="Id Thread">
            </v-text-field>
            <v-text-field v-model="newPost.fecha" label="Fecha">
            </v-text-field>
            <v-btn @click="createPost">
                New Topic
            </v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            newPost: {
                post: "",
                idUsuario: "",
                idThread: "",
                fecha: ""
            }
        }
    },
    methods: {
        createPost(){
            let formData = new FormData();

            formData.set('ContenidoPost', this.newPost.post)
            formData.set('IdUsuario', this.newPost.idUsuario)
            formData.set('FechaDeCreacion', this.newPost.fecha)
            formData.set('IdThread', this.newPost.idThread)

            this.axios.post("http://localhost/Odr/connections/forum/createPost.php", formData).then(function (response) {
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
