<template>
    <v-card>
        <v-card>
            <v-card-title primary-title text-xs-center>
                <div class="headline">{{titleTxt[currLanguaje]}}</div>
            </v-card-title>
            <v-card-text>
                <v-text-field v-model="newContent.description" :label="descriptionTxt[currLanguaje]"></v-text-field>
            </v-card-text>
        </v-card>
        <v-card-title primary-title text-xs-center>
            <div class="headline">{{filesTxt[currLanguaje]}}</div>
        </v-card-title>
        <v-card-text>
            <images-selector-carousel :preview="true" v-on:passImages="getImages($event)">
            </images-selector-carousel>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" :disabled="!uploadBtnEnabled" @click="uploadContent">{{btnText}}</v-btn>
            <v-btn @click="goToRoute('Back', '')">{{returnTxt[currLanguaje]}}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            newContent: {
                description: '',
                images: [],
                imagesNoHeader: [],
            },
            uploadBtnEnabled: true,
            btnText: 'Subir contenido',
            titleTxt: ['Subir una imagen', 'Upload an image'],
            descriptionTxt: ['Descripción de la imagen', 'Image descrption'],
            filesTxt: ['Elige el archivo', 'Choose your file'],
            returnTxt: ['Regresar', 'Return']
        }
    },
    methods: {
        getImages ($event) {
            this.newContent.images = $event
        },
        uploadContent () {
            this.btnText = "Subiendo"
            this.uploadBtnEnabled = false
            this.uploadImages()
        },
        uploadImages () {
            var bodyFormData = new FormData();
            let urlBase = this.$store.getters.urlBase
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
            let time = new Date();
            let currentTime = time.getHours() + '-' + time.getMinutes() + '-' + time.getSeconds();
            //Reset array
            this.newContent.imagesNoHeader = []
            //Quitar header del base64
            this.newContent.images.forEach(element => {
                this.newContent.imagesNoHeader.push(this.removeBase64Headers(element.src))
            });
            let thumbnail = this.newContent.images.find((element) => {
                return (element.thumbnail === true)
            })
            bodyFormData.set('Scans', JSON.stringify(this.newContent.imagesNoHeader))
            bodyFormData.set('fechaDeCreacion', date)
            bodyFormData.set('tiempo', currentTime)
            bodyFormData.set('idHub', this.urlHub)
            bodyFormData.set('idUsuario', this.user.id)
            bodyFormData.set('nImagenes', this.newContent.imagesNoHeader.length)
            bodyFormData.set('pieImagen', this.newContent.description)
            bodyFormData.set('thumbnailScans', this.removeBase64Headers(thumbnail.src))
            console.log("Lo del bodyForm del Hub")
            for (var pair of bodyFormData.entries()) {
                console.log(pair[0], pair[1]);
            }

            this.axios.post(urlBase + 'connections/socialNetwork/createImage.php', bodyFormData).then(response => {
                console.log(response.data)
                alert(response.data)
                this.btnText = "Subido"
            }).catch(error => {
                console.log("Hubo un error en el POST a /socialNetwork/createImage", error)
                this.btnText = "ERROR!!!"
            })
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
        goToRoute (type, route){
            switch (type) { 
                case 'Back': {
                    if (this.urlSaga) {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlSaga + '/' + this.urlHub)
                        })
                    } else {
                        this.$nextTick(() => {
                            this.$router.push('/social/' + this.urlPersonaje + '/' + this.urlHub)
                        })
                    }
                    break;
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            currLanguaje: 'getUserLang',
            user: 'getUserData',
            urlHub: 'getIdHub',
            urlSaga: 'getIdSaga',
            urlPersonaje: 'getIdPersonaje'
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