<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-data-table :items="imagenesHub" rows-per-page-text="Imagenes por página">
                    <template slot="items" slot-scope="data">
                        <v-layout>
                            <v-card @click="goToRoute('Image', data.item.id)">
                                <v-img :src="data.item.thumbnail"></v-img>
                                <v-card-text v-html="data.item.titulo"></v-card-text>
                                <v-card-text> {{ data.item.nickname }} {{ data.item.fecha }}</v-card-text>
                            </v-card>
                        </v-layout>
                    </template>
                </v-data-table>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('Back', '')"> Return </v-btn>
                <v-btn @click="goToRoute('New', 'createImage')">Crear Imagen</v-btn>
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
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/' + route)
                    })
                    break;
                }
                case 'Back': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga)
                    })
                    break;
                }
                case 'Image': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga + '/' + this.urlHub + '/' + route)
                    })
                    this.$store.commit("guardarIdImage", route)
                    break;
                }
            }
        }
    },
    computed: {
        ...mapGetters ({
            imagenes: 'getImagenes',
            urlSaga: 'getIdSaga',
            urlHub: 'getIdHub'
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