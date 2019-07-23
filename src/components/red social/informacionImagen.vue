<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout row wrap justify-center>
                {{imagen[0]}}
                <v-card height="600" width="400" max-height="auto" max-width="auto" class="text-xs-left my-1">
                    <v-img :src="imagen[0].imagenes[0].src"></v-img>
                    <v-card-text>{{imagen[0].titulo}}</v-card-text>
                    <v-card-text>{{imagen[0].nickname}} {{imagen[0].fecha}}</v-card-text>
                    <v-card-actions v-show="hayUsuario">
                        <v-btn color="red" icon @click="reputacionDown (imagen[0])">
                            <v-icon>thumb_down</v-icon>
                        </v-btn>
                        <v-btn color="success" icon @click="reputacionUp (imagen[0])">
                            <v-icon>thumb_up</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>    
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('Back', '')">{{returnTxt[currLanguaje]}}</v-btn>
            </v-layout>
            <v-layout justify-center>
                <comments :enDialog="false"></comments>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            returnTxt: ['Regresar', 'Return']
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
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
                    console.log("la imagen", this.imagen)
                    break;
                }
            }
        },
        reputacionUp (publicacion) {
            let id = publicacion.id + "-" + publicacion.idHub + "-" + publicacion.idUsuario + "-" + this.usuario.id
            let payload = {
                thumbup: true, // Para decirle que va a ser un thumbup
                idUsuario: publicacion.idUsuario,
                id: id
            }
            this.$store.dispatch('reputacion', payload)
        },
        reputacionDown (publicacion) {
            let id = publicacion.id + "-" + publicacion.idHub + "-" + publicacion.idUsuario + "-" + this.usuario.id
            let payload = {
                thumbdown: true, // Para decirle que va a ser un thumbdown
                idUsuario: publicacion.idUsuario,
                id: id
            }
            this.$store.dispatch('reputacion', payload)
        }
    },
    computed: {
        ...mapGetters ({
            currLanguaje: 'getUserLang',
            imagenes: 'getImagenes',
            urlSaga: 'getIdSaga',
            urlHub: 'getIdHub',
            urlImage: 'getIdImage',
            urlPersonaje: 'getIdPersonaje',
            usuario: 'getUserData'
        }),
        imagen () {
            let resultado = []
            this.imagenes.forEach(imagen => {
                if (imagen.id === this.urlImage) {
                    resultado.push(imagen)
                }
            });
            return resultado
        },
        hayUsuario () {
            return (this.usuario.id != null)
        }
    },
    watch: {

    },
    created () {
        
    },
    mounted () {
        let url = this.$route.fullPath
        this.$store.dispatch('loadComentarios', url)
    }
}
</script>