<template>
    <v-layout row wrap justify-center>
        <v-flex xs12 sm12 md12>
            <v-card class="py-5 vCardStyle elevation-10">
                <v-layout row wrap :justify-center="smAndDown" text-xs-center>
                    <v-flex xs10 sm10 md4>
                        <v-img contain max-height="500" :class="{'mx-5' : !xsOnly}"
                        :src="currentContent.thumbnail">
                        </v-img>
                    </v-flex>
                    <v-flex xs10 md7 >
                        <v-layout row wrap :justify-center="smAndDown" :justify-space-between="!smAndDown" :class="{'mt-4' : xsOnly}">
                            <v-flex xs12 md6>
                                <v-layout row wrap :justify-center="smAndDown">
                                    <div :class="{'display-1': !xsOnly, 'title': xsOnly}">
                                        {{currentContent.name}}
                                    </div>
                                </v-layout>
                            </v-flex>
                            <v-spacer v-if="!xsOnly"></v-spacer>
                            
                            <v-flex xs12 md5 v-if="isUserLogged">

                                    <v-btn color="primary" flat outline @click="seguirHolder" v-if="!isHolderSuscrito">
                                        {{follow[lang]}}
                                    </v-btn>
                                    <v-btn color="red" @click="dejarDeSeguirHolder" flat outline v-else>
                                        {{unfollow[lang]}}
                                    </v-btn>


                                    <v-btn color="primary" flat outline @click="addToWatchlist" v-if="!isInWatchlist">
                                        Watchlist +
                                    </v-btn>
                                    <v-btn color="primary" flat outline @click="removeToWatchlist" v-else>
                                        Watchlist -
                                    </v-btn>

                            </v-flex>
                        </v-layout>
                        <v-divider class="mt-2 mb-1" style="background: #000"></v-divider>
                        <v-layout row wrap align-center>
                                <v-flex xs12 class="mt-1" v-if="currentContent.type.length > 0">
                                    <v-layout row wrap align-center>
                                        <div class="body-1 font-weight-medium" >{{typePH[lang]}}: </div>
                                        <v-chip class="ml-1" :small="xsOnly">{{currentContent.type}}</v-chip>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 class="mt-1" v-if="currentContent.Tags.length > 0">
                                    <v-divider class="mb-1"></v-divider>
                                    <v-layout row wrap align-center>
                                        <div class="body-1 font-weight-medium">Tags:</div>
                                        <v-chip class="" :small="xsOnly" v-for="(aux, index) in currentContent.Tags" :key="index">
                                            {{ aux }}
                                        </v-chip>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 class="mt-1" v-if="currentContent.Descripcion.length > 0">
                                    <v-divider class="mb-1"></v-divider>
                                    <v-layout row wrap align-center>
                                        <div class="body-1 font-weight-medium mr-1">{{descriptionPH[lang]}}: </div>
                                        <div class="body-1"> {{currentContent.Descripcion}} </div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 class="mt-1" v-if="currentContent.Personajes.length > 0">
                                    <v-layout row wrap align-center>
                                        <v-flex xs12>
                                            <v-divider class="mb-1"></v-divider>
                                            <v-layout row wrap>
                                                <div class="body-1 font-weight-medium mr-1">{{personajesPH[lang]}}: </div>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12 class="mt-2 ml-2">
                                            <v-layout row class="myContainer">
                                                <!-- Componente avatar ?   -->
                                                <v-flex xs3 md3 lg2 xl1 v-for="(aux, index) in currentContent.Personajes" :key="index"
                                                    :class="{'ml-4' : index > 1 && xsOnly, 'ml-3' : index > 1 && !xsOnly}">
                                                    <v-layout column align-center >
                                                        <v-avatar
                                                            size="60"
                                                            color="white"
                                                            style="cursor: pointer; overflow: hidden;"
                                                            tile
                                                            @click="goToCharacter (aux.urlpersonaje)">
                                                            <img style="height: 80px; width: 60px;"
                                                            :src="aux.thumbnail" alt="alt">
                                                        </v-avatar>
                                                        <div class="body-1 mx-1" style="background-color: rgba(0,0,0,0.2)">
                                                            {{aux.nombrepersonaje}}
                                                        </div>
                                                    </v-layout>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <!-- Seccion que muestra el contenido del holder -->
        <v-flex xs12 md12>
            <v-card class="vCardStyle mt-3 elevation-10">
                <!-- Si son scans -->
                <v-layout row wrap class="pa-3" justify-center v-if="isScan">
                    <v-flex xs12 sm4 md3 xl2 v-for="(aux, index) in currentContent.content" :key="index">
                        <v-layout row wrap align-center fill-height @click="goToScan (aux.URLContenido)">
                            <v-img :height="heightHolderItems" class="ma-1"  :src="aux.thumbnail">
                                <v-layout row wrap fill-height align-end>
                                    <v-flex xs12>
                                        <v-layout row wrap style="background-color: rgba(0,0,0,0.5);" justify-center>
                                            <div :class="{'headline': !smAndDown, 'body-1': smAndDown, 'white--text': 1}">{{aux.TituloContenido}}</div>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <!-- Si es video -->
                <v-layout row wrap class="pa-3" justify-center v-if="isVideo">
                    <v-flex xs5 sm4 md3 xl3 v-for="(aux, index) in currentContent.content" :key="index">
                        <v-layout row wrap align-center fill-height @click="goToScan (aux.URLContenido)">
                            <v-img :height="heightHolderItems" class="ma-1"  src="https://homuapp.000webhostapp.com/Imagenes/15-1-2019-2-20-45.jpg">
                                <v-layout row wrap fill-height align-end>
                                    <v-flex xs12>
                                        <v-layout row wrap style="background-color: rgba(0,0,0,0.5);" justify-center>
                                            <div :class="{'headline': !smAndDown, 'body-1': smAndDown, 'white--text': 1}">{{aux.TituloContenido}}</div>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <!-- Si es audio -->
                <v-layout row wrap class="pa-3" justify-center v-if="isAudio">
                    <v-flex xs5 sm4 md3 xl2 v-for="(aux, index) in currentContent.content" :key="index">
                        <v-layout row wrap align-center fill-height @click="goToScan (aux.URLContenido)">
                            <v-img contain :height="heightHolderItems"
                            class="ma-1"  :src="currentContent.thumbnail">
                                <v-layout row wrap fill-height align-end>
                                    <v-flex xs12>
                                        <v-layout row wrap style="background-color: rgba(0,0,0,0.5);" justify-center>
                                            <div :class="{'headline': !smAndDown, 'body-1': smAndDown, 'white--text': 1}">{{aux.TituloContenido}}</div>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-img>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
        <v-flex xs12 mt-2>
            <comments :enDialog="false"></comments>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            xsOnly: this.$vuetify.breakpoint.xsOnly,
            smAndDown: this.$vuetify.breakpoint.smAndDown,
            urlSaga: '',
            urlHolder: '',
            videos: ['Anime'],
            // Placeholders
            typePH: ['Tipo', 'Type'],
            descriptionPH: ['Descripcion', 'Description'],
            personajesPH: ['Personajes', 'Characters'],
            follow: ['Seguir', 'Follow'],
            unfollow: ['Dejar de seguir', 'Unfollow'],
        }
    },
    created () {
        this.urlHolder = this.$route.params.urlHolder
        this.urlSaga = this.$route.params.urlSaga

        // Comprobar que ya se haya cargado una saga y que esta tenga la misma id que a la que se entro
        if (Object.keys(this.saga).length === 0 && this.saga.constructor === Object) {
            console.log('No se tenia ninguna saga cargada')
            this.$store.dispatch('loadSagaData', this.urlSaga)
        } else {
            if (this.$store.getters.getSagaData.urlSaga !== this.urlSaga) {
                this.$store.dispatch('loadSagaData', this.urlSaga)
                console.log('Se tenia cargada otra saga')
            } else
                console.log('La misma saga cargada')
        }
    },
    mounted () {
        // Que cargue los comentarios
        let url = this.$route.fullPath
        this.$store.dispatch('loadComentarios', url)
        
        this.$store.dispatch('loadWatchlist', this.user.id)
    },
    computed: {
        ...mapGetters({
            holdersSuscritos: 'getHoldersSuscrito',
            watchlist: 'getWatchlist',
            lang: 'getUserLang',
            user: 'getUserData',
        }),
        isHolderSuscrito () {
            let aux = this.holdersSuscritos.find(auxFind => {
                return auxFind.idHolder == this.currentContent.IdHolder
            })
            if (aux){
                return true
            } else {
                return false
            }
        },
        isInWatchlist () {
            let aux = this.watchlist.find(auxFind => {
                return auxFind.idHolder == this.currentContent.IdHolder
            })
            if (aux){
                return true
            } else {
                return false
            }
        },
        saga () {
            return this.$store.getters.getSagaData
        },
        currentContent () {
            console.log("QUE PEDO", this.saga.content)
            if (this.saga.content){
                console.log("Current Content",this.saga.content.find((element) => {
                    return element.url === this.urlHolder
                }))
                return this.saga.content.find((element) => {
                    return element.url === this.urlHolder
                })
            }
            else
                return []
        },
        heightHolderItems () {
            if (this.isScan) {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '220px'
                    case 'sm': return '400px'
                    case 'md': return '220px'
                    case 'lg': return '300px'
                    case 'xl': return '320px'
                }
            } else if (this.isVideo) {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '100px'
                    case 'sm': return '200px'
                    case 'md': return '200px'
                    case 'lg': return '150px'
                    case 'xl': return '200px'
                }
            } else if (this.isAudio) {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': return '100px'
                    case 'sm': return '200px'
                    case 'md': return '200px'
                    case 'lg': return '150px'
                    case 'xl': return '250px'
                }
            }
        },
        isScan () {
            return (this.currentContent.type === 'Manga')
        },
        isVideo () {
            return (this.currentContent.type === 'Anime')
        },
        isAudio () {
            return (this.currentContent.type === 'Musica')
        },
        isUserLogged () {
            let id = this.$store.getters.getUserData.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        goToScan (urlScan) {
            this.$router.push(this.urlHolder + "/" + urlScan + "/1")
        },
        goToCharacter (urlChar) {
            this.$router.push("/characters/" + urlChar)
        },
        seguirHolder () {
            this.$store.dispatch('suscribirHolder', this.currentContent.IdHolder)
        },
        dejarDeSeguirHolder () {
            let aux = this.holdersSuscritos.find(auxFind => {
                return auxFind.idHolder == this.currentContent.IdHolder
            })
            this.$store.dispatch('quitarHolderSubs', aux)
        },
        addToWatchlist () {
            let aux = {...this.currentContent}
            aux.urlSaga = this.urlSaga
            aux.idUsuario = this.user.id
            console.log("El watchlist", aux)
            this.$store.dispatch('addToWatchlist', aux)
        },
        removeToWatchlist () {
            let aux = this.watchlist.find(auxFind => {
                return auxFind.idHolder == this.currentContent.IdHolder
            })
            aux.idUsuario = this.user.id
            this.$store.dispatch('removeToWatchlist', aux)
        }
    }
}
</script>

<style>
    .vCardStyle {
        border-radius: 30px;
    }

    .myContainer{
        overflow-y: hidden;
        overflow-x: auto;
    }
</style>
