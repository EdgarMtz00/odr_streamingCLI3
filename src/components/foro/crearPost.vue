<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-card>
                    <v-card>
                        <v-btn @click="formatearTexto('Italic')"><i>I</i></v-btn>
                        <v-btn @click="formatearTexto('Bold')"><b>B</b></v-btn>
                        <v-btn @click="formatearTexto('Link')">{{linkTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Align')">{{alignTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Font')">{{changeFontTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Underline')">{{underlineTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Cross')">{{crossTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Bullet')">{{bulletTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="formatearTexto('Break')">{{lineBreakTxt[currLanguaje]}}</v-btn>
                    </v-card>
                    <v-card>
                        <v-text-field v-model="newPost.post" label="Post" outline></v-text-field>
                        <div v-if="this.postElegido.status">
                            <p>{{quotedMsgTxt[currLanguaje]}}</p>
                            <p v-html="this.postElegido.contenido"></p>
                            <p>{{this.postElegido.nickname}}</p>
                        </div>
                        <v-btn @click="createPost">{{createPostTxt[currLanguaje]}}</v-btn>
                        <v-btn @click="back()">{{returnTxt[currLanguaje]}}</v-btn>
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
            },
            linkTxt: ['Enlace', 'Link'],
            alignTxt: ['Alineación', 'Align'],
            changeFontTxt: ['Cambiar fuente', 'Change font'],
            underlineTxt: ['Subrayar', 'Underline'],
            crossTxt: ['Tachar texto', 'Cross text'],
            bulletTxt: ['Viñetas', 'Bullets'],
            lineBreakTxt: ['Salto de línea', 'Line break'],
            quotedMsgTxt: ['Mensaje citado: ', 'Quoted Message: '],
            createPostTxt: ['Crear post', 'Create post'],
            returnTxt: ['Regresar', 'Return'],
            boldMsgTxt: [' *escribe tu mensaje entre los asteriscos*', ' *write your message between the asterisks*'],
            italicMsgTxt: [' _escribe tu mensaje entre los guiones bajos_', ' _write your message between the underscores_'],
            linkMsgTxt: [' <a href="URL">escribe tu mensaje aqui y la url donde dice URL</a>', ' <a href="URL">write your message here and the url where it says URL</a>'],
            alignMsgTxt: [' "jtf/lft/ctr/rgt"escribe tu mensaje aquí y elije el mismo de cada lado, no borres las comillas"jtf/lft/ctr/rgt"', ' "jtf/lft/ctr/rgt"write your message here and choose one in both sides (must be the same), leave the quotes"jtf/lft/ctr/rgt"'],
            fontMsgTxt: [' "a3/a6/t3/t6"escribe tu mensaje aquí y elije el mismo de cada lado, no borres las comillas"a3/a6/t3/t6"', ' "a3/a6/t3/t6"write your message here and choose one in both sides (must be the same), leave the quotes"a3/a6/t3/t6"'],
            underlineMsgTxt: [' $escribe tu mensaje entre los signos de dinero$', ' $write your message between the money signs$'],
            crossMsgTxt: [' ~escribe tu mensaje entre las líneas curvas~', ' ~write your message between the curly lines~'],
            bulletMsgTxt: [' |°escribe los elementos de la lista entre los circulos, la lista tiene que estar rodeada de signos de valor absoluto°°elemento 2°°elemento 3°|', ' |°write your list elements between the circles, the list must be surrounded by absolute value symbols°°element 2°°element 3°|'],
            breakMsgTxt: [' #escribe tu mensaje entre los gatos, aparecerá en una nueva línea#', ' #write your message between the sharp symbols, it will appear in a new line#']
        }
    },
    methods: {
        createPost () {
            let formData = new FormData();
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var self = this

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
                self.back()
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
                    this.newPost.post = this.newPost.post + this.boldMsgTxt[this.currLanguaje]
                    break;
                case 'Italic':
                    this.newPost.post = this.newPost.post + this.italicMsgTxt[this.currLanguaje]
                    break;
                case 'Link':
                    this.newPost.post = this.newPost.post + this.linkMsgTxt[this.currLanguaje]
                    break;
                case 'Align':
                    this.newPost.post = this.newPost.post + this.alignMsgTxt[this.currLanguaje]
                    break;
                case 'Font':
                    this.newPost.post = this.newPost.post + this.fontMsgTxt[this.currLanguaje]
                    break;
                case 'Underline':
                    this.newPost.post = this.newPost.post + this.underlineMsgTxt[this.currLanguaje]
                    break;
                case 'Cross':
                    this.newPost.post = this.newPost.post + this.crossMsgTxt[this.currLanguaje]
                    break;
                case 'Bullet':
                    this.newPost.post = this.newPost.post + this.bulletMsgTxt[this.currLanguaje]
                    break;
                case 'Break':
                    this.newPost.post = this.newPost.post + this.breakMsgTxt[this.currLanguaje]
                    break;
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
            currLanguaje: 'getUserLang'
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
