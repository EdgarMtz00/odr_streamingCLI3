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
            let etiqueta = "";
            let negrita = 0, italica = 0, underline = 0, strike = 0, broke = 0, lista = 0, elemento = 0, posicion = 0;
            let formData = new FormData();
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            
            for (let i = 0; i <= this.newTopic.post.length; i++) {
                if (this.newTopic.post.search(/!b!/) != -1) {
                    etiqueta = 'B'
                } else if (this.newTopic.post.search(/!i!/) != -1) {
                    etiqueta = 'I'
                } else if (this.newTopic.post.search(/!u!/) != -1) {
                    etiqueta = 'U'
                } else if (this.newTopic.post.search(/!s!/) != -1) {
                    etiqueta = 'S'
                } else if (this.newTopic.post.search(/!j!/) != -1) {
                    etiqueta = 'Br'
                } else if (this.newTopic.post.search(/!l!/) != -1) {
                    etiqueta = 'L'
                } else if (this.newTopic.post.search(/!e!/) != -1) {
                    etiqueta = 'E'
                } else if (this.newTopic.post.search(/"ctr"/i) != -1) {
                    etiqueta = 'Center'
                } else if (this.newTopic.post.search(/"lft"/i) != -1) {
                    etiqueta = 'Left'
                } else if (this.newTopic.post.search(/"rgt"/i) != -1) {
                    etiqueta = 'Right'
                } else if (this.newTopic.post.search(/"jtf"/i) != -1) {
                    etiqueta = 'Justify'
                } else {
                    etiqueta = ''
                }
                switch (etiqueta) {
                    case 'B':
                        if (negrita == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!b!/, "</b>")
                            negrita = 0
                        } else if (negrita == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!b!/, "<b>")
                            negrita = 1
                        }
                        break;
                    case 'I':
                        if (italica == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!i!/, "</i>")
                            italica = 0
                        } else if (italica == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!i!/, "<i>")
                            italica = 1
                        }
                        break;
                    case 'U':
                        if (underline == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!u!/, "</u>")
                            underline = 0
                        } else if (underline == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!u!/, "<u>")
                            underline = 1
                        }
                        break;
                    case 'S':
                        if (strike == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!s!/, "</strike>")
                            strike = 0
                        } else if (strike == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!s!/, "<strike>")
                            strike = 1
                        }
                        break;
                    case 'Br':
                        if (broke == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!j!/, "</br>")
                            broke = 0
                        } else if (broke == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!j!/, "<br>")
                            broke = 1
                        }
                        break;
                    case 'L':
                        if (lista == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!l!/, "</ul>")
                            lista = 0
                        } else if (lista == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!l!/, "<ul>")
                            lista = 1
                        }
                        break;
                    case 'E':
                        if (elemento == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/!e!/, "</li>")
                            elemento = 0
                        } else if (elemento == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/!e!/, "<li>")
                            elemento = 1
                        }
                        break;
                    case 'Center':
                        if (posicion == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/"ctr"/, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/"ctr"/, '<p align="center">')
                            posicion = 1
                        }
                        break;
                    case 'Left':
                        if (posicion == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/"lft"/, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/"lft"/, '<p align="left">')
                            posicion = 1
                        }
                        break;
                    case 'Right':
                        if (posicion == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/"rgt"/, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/"rgt"/, '<p align="right">')
                            posicion = 1
                        }
                        break;
                    case 'Justify':
                        if (posicion == 1) {
                            this.newTopic.post = this.newTopic.post.replace(/"jtf"/, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            this.newTopic.post = this.newTopic.post.replace(/"jtf"/, '<p align="justify">')
                            posicion = 1
                        }
                        break;
                    case '':
                        break;
                }
            }

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
                    this.newTopic.post = this.newTopic.post + ' <a href="URL"> Message </a>'
                    break;
                case 'Align':
                    this.newTopic.post = this.newTopic.post + ' "jtf/lft/ctr/rgt"Message"jtf/lft/ctr/rgt"'
                    break;
                case 'Font':
                    this.newTopic.post = this.newTopic.post + ' <font size="3" face="Arial"> Message </font>'
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
