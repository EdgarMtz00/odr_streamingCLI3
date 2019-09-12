<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                <v-card class="text-xs-left my-1">
                    <v-card-text>{{imagenesTxt[currLanguaje]}}</v-card-text>
                </v-card>
            </v-layout>
            <v-layout justify-center>
                <v-data-table :items="imagenesHub" hide-actions hide-headers :no-data-text="noDataTxt[currLanguaje]">
                    <template slot="items" slot-scope="data">
                        <td>
                        <v-card @click="goToRoute('Image', data.item.id)" style="cursor: pointer;" class="text-xs-left my-1">
                            <v-img :src="data.item.thumbnail"></v-img>
                            <v-card-text v-html="data.item.titulo"></v-card-text>
                            <v-card-text> {{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                        </v-card>
                        <v-btn v-if="user.id != data.item.idUsuario" @click="data.item.report = !data.item.report">{{reportImageTxt[currLanguaje]}}</v-btn>
                        <div v-if="data.item.report == true">
                            <v-text-field :label="labelTxt[currLanguaje]" v-model="userReport"></v-text-field>
                            <v-btn @click="reportarImagen(data.item)">{{enviarTxt[currLanguaje]}}</v-btn>
                        </div>
                        </td>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('Back', '')">{{returnTxt[currLanguaje]}}</v-btn>
                <v-btn @click="goToRoute('New', 'createImage')">{{createTxt[currLanguaje]}}</v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            imagenesTxt: ['Imágenes del Hub', 'Hub images'],
            noDataTxt: ['No hay imágenes en este hub', 'There are no images in this hub'],
            reportImageTxt: ['Reportar Imagen', 'Report Image'],
            enviarTxt: ['Enviar Reporte', 'Send Report'],
            returnTxt: ['Regresar', 'Return'],
            createTxt: ['Crear Imagen', 'Create Image'],
            labelTxt: ['Escribe tu reporte aquí', 'Write your report here'],
            reportBool: false,
            userReport: '',
            confirmTxt: ['¿Estás seguro de reportar esta imagen?', 'Do you really want to report this image?']
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/' + route)
                    })
                    break;
                }
                case 'Back': {
                    if (this.urlSaga) {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlSaga)
                        })
                    } else {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlPersonaje)
                        })
                    }
                    break;
                }
                case 'Image': {
                    if (this.urlSaga) {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlSaga + '/' + this.urlHub + '/' + route)
                        })
                    } else {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlPersonaje + '/' + this.urlHub + '/' + route)
                        })
                    }
                    this.$store.commit("guardarIdImage", route)
                    break;
                }
            }
        },
        reportarImagen (reportedImage) {
            let confirmar = confirm(this.confirmTxt[this.currLanguaje])
            if (!confirmar) {
                return
            }
            let payload = {
                report: this.userReport,
                content: reportedImage
            }
            this.$store.dispatch("reportarImagen", payload)
        }
    },
    computed: {
        ...mapGetters ({
            currLanguaje: 'getUserLang',
            imagenes: 'getImagenes',
            urlSaga: 'getIdSaga',
            urlHub: 'getIdHub',
            urlPersonaje: 'getIdPersonaje',
            user: 'getUserData'
        }),
        imagenesHub () {
            let resultado = []
            this.imagenes.forEach(imagen => {
                if (imagen.idHub === this.urlHub) {
                    resultado.push(imagen)
                }
            });
            return resultado
        }
    },
    watch: {

    },
    created () {
        this.$store.dispatch('loadImages')
    },
    mounted () {
        
    }
}
</script>

<style>

</style>