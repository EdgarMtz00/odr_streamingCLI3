<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-card height="600" width="400" max-height="auto" max-width="auto">
                    <v-img :src="imagen[0].imagenes[0].src"></v-img>
                    <v-card-text>{{imagen[0].titulo}}</v-card-text>
                    <v-card-text>{{imagen[0].nickname}} {{imagen[0].fecha}}</v-card-text>
                </v-card>    
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('Back', '')"> Return </v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'Back': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga + '/' + this.urlHub)
                    })
                    console.log("la imagen", this.imagen)
                    break;
                }
            }
        }
    },
    computed: {
        ...mapGetters ({
            imagenes: 'getImagenes',
            urlSaga: 'getIdSaga',
            urlHub: 'getIdHub',
            urlImage: 'getIdImage'
        }),
        imagen () {
            let resultado = []
            this.imagenes.forEach(imagen => {
                if (imagen.id === this.urlImage) {
                    resultado.push(imagen)
                }
            });
            return resultado
        }
    },
    watch: {

    },
    created () {
        
    },
    mounted () {
        
    }
}
</script>