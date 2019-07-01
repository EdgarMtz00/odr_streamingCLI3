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
                        <v-text-field v-model="newTopic.title" label="Title" outline></v-text-field>
                        <v-text-field v-model="newTopic.post" label="Post" outline></v-text-field>
                        <div>
                            <p>Preview post: </p>
                            <p>{{newTopic.title}}</p>
                            <p v-html="newTopic.post"></p>
                        </div>
                        <v-btn @click="createTopic"> Create Post </v-btn>
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

            this.$store.dispatch("formatoAlTexto", this.newTopic.post)

            formData.set('TituloThread', this.newTopic.title)
            formData.set('ContenidoPost', this.nuevoPost)
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
        },
        formatearTexto (type) {
            switch (type) {
                case 'Bold':
                    this.newTopic.post = this.newTopic.post + ' !b!Message!b!'
                    break;
                case 'Italic':
                    this.newTopic.post = this.newTopic.post + ' !i!Message!i!'
                    break;
                case 'Link':
                    this.newTopic.post = this.newTopic.post + '<a href="URL">Mensaje</a>'
                    break;
                case 'Align':
                    this.newTopic.post = this.newTopic.post + ' "jtf/lft/ctr/rgt"Message"jtf/lft/ctr/rgt"'
                    break;
                case 'Font':
                    this.newTopic.post = this.newTopic.post + ' "a3/a6/t3/t6"Message"a3/a6/t3/t6"'
                    break;
                case 'Underline':
                    this.newTopic.post = this.newTopic.post + ' !u!Message!u!'
                    break;
                case 'Cross':
                    this.newTopic.post = this.newTopic.post + ' !s!Message!s!'
                    break;
                case 'Bullet':
                    this.newTopic.post = this.newTopic.post + ' !l!!e!Message 1!e!!e!Message 2!e!!e!Message 3!e!!l!'
                    break;
                case 'Break':
                    this.newTopic.post = this.newTopic.post + ' !j!Message!j!'
                    break;
            }
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
        nuevoPost () {
            return this.$store.getters.getNuevoPost
        }
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
