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
                        <v-text-field v-model="newTopic.title" label="Topic" outline></v-text-field>
                        <v-text-field v-model="newTopic.post" label="Post" outline></v-text-field>
                        <v-btn @click="createTopic">{{createPostTxt[currLanguaje]}}</v-btn>
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
            newTopic: {
                title: "",
                post: "",
                fecha: ""
            },
            linkTxt: ['Enlace', 'Link'],
            alignTxt: ['Alineación', 'Align'],
            changeFontTxt: ['Cambiar fuente', 'Change font'],
            underlineTxt: ['Subrayar', 'Underline'],
            crossTxt: ['Tachar texto', 'Cross text'],
            bulletTxt: ['Viñetas', 'Bullets'],
            lineBreakTxt: ['Salto de línea', 'Line break'],
            quotedMsgTxt: ['Mensaje citado: ', 'Quoted Message: '],
            createPostTxt: ['Crear topic', 'Create topic'],
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
        createTopic () {
            let formData = new FormData();
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            var self = this

            this.$store.dispatch("formatoAlTexto", this.newTopic.post)

            formData.set('TituloThread', this.newTopic.title)
            formData.set('ContenidoPost', this.nuevoPost)
            formData.set('IdUsuario', this.user.id)
            formData.set('IdSaga', this.sagaElegida)
            formData.set('IdCategoria', this.categoriaElegida)
            formData.set('FechaDeCreacion', date)

            this.axios.post("http://localhost/Odr/connections/forum/createTopic.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
                self.back()
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
                    this.newTopic.post = this.newTopic.post + this.boldMsgTxt[this.currLanguaje]
                    break;
                case 'Italic':
                    this.newTopic.post = this.newTopic.post + this.italicMsgTxt[this.currLanguaje]
                    break;
                case 'Link':
                    this.newTopic.post = this.newTopic.post + this.linkMsgTxt[this.currLanguaje]
                    break;
                case 'Align':
                    this.newTopic.post = this.newTopic.post + this.alignMsgTxt[this.currLanguaje]
                    break;
                case 'Font':
                    this.newTopic.post = this.newTopic.post + this.fontMsgTxt[this.currLanguaje]
                    break;
                case 'Underline':
                    this.newTopic.post = this.newTopic.post + this.underlineMsgTxt[this.currLanguaje]
                    break;
                case 'Cross':
                    this.newTopic.post = this.newTopic.post + this.crossMsgTxt[this.currLanguaje]
                    break;
                case 'Bullet':
                    this.newTopic.post = this.newTopic.post + this.bulletMsgTxt[this.currLanguaje]
                    break;
                case 'Break':
                    this.newTopic.post = this.newTopic.post + this.breakMsgTxt[this.currLanguaje]
                    break;
            }
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUserData',
            currLanguaje: 'getUserLang'
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
