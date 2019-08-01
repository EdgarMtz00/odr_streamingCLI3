<template>
    <div>
        <v-tabs v-model="tabs" color="primary" dark slider-color="green" grow centered>
            <v-tab href="#tab-watchlist">
                {{tabsLabels.watchlist[lang]}}
            </v-tab>
            <v-tab href="#tab-estadisticas">
                {{tabsLabels.estadisticas[lang]}}
            </v-tab>
            <!-- TAB DE WATCHLIST -->
            <v-tab-item value="tab-watchlist">
                <v-layout row wrap v-if="watchlist.length > 0">
                    <v-flex xs12 md12 lg12 v-for="(item, index) in watchlist" :key="index" class="pa-1">
                        <v-card flat>
                            <v-card-text>
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-list>
                                            <v-list-tile avatar two-line>
                                                <v-list-tile-avatar tile>
                                                    <img :src="item.urlImagen">
                                                </v-list-tile-avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title style="cursor: pointer;"
                                                    @click="gotoToPage('sagas/' + item.urlHolder)">
                                                        #{{item.orden+1}} {{item.titulo}}
                                                    </v-list-tile-title>
                                                    <v-list-tile-sub-title>{{item.categoria}}</v-list-tile-sub-title>
                                                </v-list-tile-content>
                                                <v-list-tile-action>
                                                    <v-layout row wrap v-if="sameAsUser">
                                                        <v-flex xs12>
                                                            <v-layout row wrap justify-space-between>
                                                                <v-btn color="primary" icon flat small outline
                                                                @click="cambiarOrdenMas(item)">
                                                                    <v-icon>arrow_downward</v-icon>
                                                                </v-btn>
                                                                <v-btn color="primary" icon flat small outline
                                                                @click="cambiarOrdenMenos(item)">
                                                                    <v-icon>arrow_upward</v-icon>
                                                                </v-btn>
                                                            </v-layout>
                                                        </v-flex>
                                                        <v-flex xs12 class="mt-3">
                                                            <v-layout row wrap justify-center>
                                                                <v-btn color="red" icon  flat small outline
                                                                @click="eliminarDelWatchlist(item)">
                                                                    <v-icon>remove</v-icon>
                                                                </v-btn>
                                                            </v-layout>
                                                        </v-flex>
                                                    </v-layout>
                                                    <v-layout row wrap v-else justify-end>
                                                        <v-btn color="primary" icon flat small outline
                                                        @click="gotoToPage('sagas/' + item.urlHolder)">
                                                            <v-icon>explore</v-icon>
                                                        </v-btn>
                                                    </v-layout>
                                                </v-list-tile-action>
                                            </v-list-tile>
                                        </v-list>
                                    </v-flex>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
                <!-- // Si no tiene ninguna wea en watchlist -->
                <v-layout row wrap justify-center v-else>
                    <div class="headline"><v-icon>cancel</v-icon> {{tabsLabels.emptyWatchlist[lang]}}</div>
                </v-layout>
            </v-tab-item>
            <!-- TAB DE ESTADISTICAS -->
            <v-tab-item value="tab-estadisticas">
                <v-card>
                    <v-card-text>
                        {{tabsLabels.reputacionText[lang]}}: {{reputacion}}% {{tabsLabels.from[lang]}} ({{(reput.thumbsup + reput.thumbsdown).toFixed(2)}}  {{tabsLabels.personas[lang]}})
                        <br> <v-icon :color="starColor">star</v-icon> {{tabsLabels.reputacionForoText[lang]}}: {{(reputForo * 100).toFixed(2)}}%
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as firebase from 'firebase'
export default {
    props: {
        idProfile: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            tabs: '',
            tabsLabels: {
                watchlist: ['Watchlist', 'Watchlist'],
                estadisticas: ['Estadisticas', 'Statistics'],
                emptyWatchlist: ['Watchlist vacia', 'Empty watchlist'],
                reputacionText: ['Puntos de reputacion [Tienda]', 'Reputation points [Shop]'],
                reputacionForoText: ['Puntos de reputacion [Social]', 'Reputation points [Social]'],
                personas: ['Personas', 'People'],
                from: ['De', 'From']
            },
        }
    },
    created () {
        this.$store.dispatch('loadWatchlist', this.idProfile)
        this.$store.dispatch('loadReputacion', this.idProfile)
        this.$store.dispatch('loadReputacionForo', this.idProfile)
    },
    methods: {
        cambiarOrdenMenos (elemento) {
            let auxElemento = {...elemento}
            auxElemento.idUsuario = this.user.id
            // Obtener la key del nodo de firebase del elemento (ordenado por orden xd) anterior
            let auxKey = this.watchlist[auxElemento.orden-1]
            if (auxKey) {
                auxElemento.keyAnterior = auxKey.key
                console.log("Elemento", auxElemento)
                this.$store.commit('cambiarOrdenMenos', auxElemento)
            }
        },
        cambiarOrdenMas (elemento) {
            let auxElemento = {...elemento}
            auxElemento.idUsuario = this.user.id
            // Obtener la key del nodo de firebase del elemento (ordenado por orden xd) siguiente
            let auxKey = this.watchlist[auxElemento.orden+1]
            if (auxKey) {
                auxElemento.keySiguiente = auxKey.key
                console.log("Elemento", auxElemento)
                this.$store.commit('cambiarOrdenMas', auxElemento)
            }
        },
        eliminarDelWatchlist (elemento) {
            let auxElemento = {...elemento}
            auxElemento.idUsuario = this.user.id
            let keysSiguientes = []
            // Iterar todos los elementos siguientes a el que se va a quitar y obtener su key
            for(let i = auxElemento.orden + 1; i < this.watchlist.length; i++) {
                keysSiguientes.push({
                    key: this.watchlist[i].key,
                    orden: this.watchlist[i].orden
                })
            }
            auxElemento.keysSiguientes = keysSiguientes
            this.$store.commit('eliminarDelWatchlist', auxElemento)
        },
        gotoToPage (page) {
            this.$nextTick(() => {
                // this.$router.push('/')
                this.$router.push('/' + page)
            })
        },
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
            user: 'getUserData',
            reput: 'getReputacion',
            reputForo: 'getReputacionForo',
        }),
        watchlist () {
            let aux = this.$store.getters.getWatchlist
            if (aux.length > 0) {
                aux.sort((a, b) => {
                    var key1 = a.orden;
                    var key2 = b.orden;

                    if (key1 < key2) {
                        return -1;
                    } else if (key1 == key2) {
                        return 0;
                    } else {
                        return 1;
                    }
                })
            }
            return aux
        },
        sameAsUser () {
            if (this.idProfile == this.user.id) {
                return true
            } else {
                return false
            }
        },
        reputacion () {
            let reputacion = this.$store.getters.getReputacion
            return ((reputacion.thumbsup / (reputacion.thumbsup + reputacion.thumbsdown)) * 100)
        },
        starColor () {
            let reputacion = this.reputForo
            if (reputacion < .20) {
                return "#e8170c" // Rojo
            } else if (reputacion > .20 && reputacion < .40) {
                return "#000" // Negro
            }  else if (reputacion < .40  && reputacion < .60) {
                return "#1d1ac9" // Azul
            }  else if (reputacion < .60  && reputacion < .80) {
                return "#10e01e" // Verde
            }  else if (reputacion > .80) {
                return "#fffb00" // Amarillo
            }
        }
    }
}
</script>