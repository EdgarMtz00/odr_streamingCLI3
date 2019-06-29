<template>
    <div>
        <v-navigation-drawer v-model="drawer" app fixed temporary class='secondary'>
            <v-list subheader>
                <!-- --------------------------------------------------- -->
                <v-subheader>{{descubrirSub[prefLanguaje]}}</v-subheader>

                <v-list-tile avatar @click="gotoToPage('')">
                    <v-list-tile-avatar><v-icon>airplay</v-icon></v-list-tile-avatar>
                    <v-list-tile-content><v-list-tile-title>{{todosLosMedios[prefLanguaje]}}</v-list-tile-title></v-list-tile-content>
                </v-list-tile>

                <div v-if="isUserLogged">
                    <v-divider></v-divider>
                    <!-- --------------------------------------------------- -->
                    <v-subheader>{{crearSub[prefLanguaje]}}</v-subheader>
                    <!-- Tuve que escribir la condicion del tipo de cuenta aqui, los computed no funcionan bien -->
                    <v-list-tile avatar @click="gotoToPage('uploadContent')" v-show="(user.cuenta === 'CDC') || (user.cuenta === 'Dios')">
                        <v-list-tile-avatar><v-icon>create</v-icon></v-list-tile-avatar>
                        <v-list-tile-content><v-list-tile-title>{{nuevoMedio[prefLanguaje]}}</v-list-tile-title></v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar @click="addProductShortcut()" v-if="isUserLogged">
                        <v-list-tile-avatar><v-icon>create</v-icon></v-list-tile-avatar>
                        <v-list-tile-content><v-list-tile-title>{{nuevoProducto[prefLanguaje]}}</v-list-tile-title></v-list-tile-content>
                    </v-list-tile>
                </div>

                <v-divider></v-divider>
                <!-- --------------------------------------------------- -->
                <v-subheader>{{cuentaSub[prefLanguaje]}}</v-subheader>

                <v-list-tile avatar @click="gotoToPage('login')" v-if="!isUserLogged">
                    <v-list-tile-avatar><v-icon>input</v-icon></v-list-tile-avatar>
                    <v-list-tile-content><v-list-tile-title>{{iniciarSesion[prefLanguaje]}}</v-list-tile-title></v-list-tile-content>
                </v-list-tile>

                <v-list-tile avatar @click="logout()" v-else>
                    <v-list-tile-avatar><v-icon>exit_to_app</v-icon></v-list-tile-avatar>
                    <v-list-tile-content><v-list-tile-title>{{cerrarSesion[prefLanguaje]}}</v-list-tile-title></v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <v-toolbar color='primary' fixed app>
            <template slot="extension" v-if="buscar">
                <v-layout row wrap justify-center>
                <buscador></buscador>
                <v-btn color="primary" v-show="xsOnly" icon fab @click="buscar = !buscar">
                    <v-icon v-if="!buscar">search</v-icon>
                    <v-icon v-if="buscar">close</v-icon>
                </v-btn>
                </v-layout>
            </template>
            <v-toolbar-side-icon class='white--text' @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-avatar
                size='40px'>
                <img src='../../../static/unnamed.png' alt='logo'>
                </v-avatar>
                <v-toolbar-title class='text-sm-right white--text font-weight-thin headline' v-if="!xsOnly">
                Mershe!
                </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
                <buscador v-show="!xsOnly && streamingActive" class="mt-1"></buscador>

                <v-btn flat class="white--text" @click="gotoToPage('profileConfiguration')" v-if="isUserLogged"
                :icon="xsOnly"> 
                <v-layout row wrap fill-height justify-center align-center :class="{'mr-2': 1}">
                    <v-avatar
                    size="40"
                    color="red">
                    <img :src="userData.imagen" alt="alt">
                    </v-avatar>
                </v-layout>
                <div v-show="!xsOnly">{{userData.nickname}}</div>
                </v-btn>

                <carrito-component class="mt-2 ml-3" v-show="isUserLogged && tiendaActive"></carrito-component>

                <crear-producto-component ref="AddProduct" class="mt-2" v-show="isUserLogged && tiendaActive"></crear-producto-component>

                <v-btn color="primary" v-show="xsOnly && streamingActive" icon fab @click="buscar = !buscar">
                    <v-icon v-if="!buscar">search</v-icon>
                    <v-icon v-if="buscar">close</v-icon>
                </v-btn>
                <!-- Activador de las notificaciones -->
                <v-btn color="primary" icon @click.stop="notifications = !notifications" v-if="isUserLogged">
                    <v-badge right>
                        <template v-slot:badge>
                            <span class="yellow--text">{{notificacionNuevas}}</span>
                        </template>
                        <v-icon>notifications</v-icon>
                    </v-badge>
                </v-btn>
                
                <v-btn :icon="xsOnly" flat class="white--text" @click="logout" v-show="isUserLogged && !xsOnly"> 
                    <v-icon>exit_to_app</v-icon><div>{{shortLogoutLabel[prefLanguaje]}}</div>
                </v-btn>

                <v-btn flat class="white--text" @click="gotoToPage('login')" v-show="!isUserLogged">
                    {{shortSignInLabel[prefLanguaje]}} <v-icon>input</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <!-- ------------------------- DRAWER DE NOTIFICACIONES ------------------------------------  -->
        <v-navigation-drawer right v-model="notifications" fixed :temporary="false" class='secondary' disable-resize-watcher>
            <v-toolbar class="primary">
                <v-toolbar-title class='text-sm-right white--text font-weight-thin title'>
                    {{notifLabel[prefLanguaje]}}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="">
                    <v-btn flat @click.stop="notifications = !notifications"><v-icon>close</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-layout column class="items">
                <v-flex xs12>
                    <v-card :dark="!notificacion.visto" @click="verNotificacion(notificacion)" v-for="(notificacion, index) in notificaciones" :key="index">
                        <v-card-text v-html="notificacion.cuerpo">
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-navigation-drawer>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            drawer: false,
            notifications: false,
            buscar: false,
            descubrirSub: ["Descubrir", "Discover"],
            todosLosMedios: ['Todos los medios', 'All stream media'],
            crearSub: ["Crear", "Create"],
            nuevoMedio: ['Nuevo medio', 'New stream media'],
            nuevoProducto: ['Nuevo producto', 'New producto'],
            cuentaSub: ["Cuenta", "Account"],
            cerrarSesion: ['Cerrar sesion', 'Logout'],
            iniciarSesion: ['Iniciar sesion', 'Sign in'],
            notifLabel: ['Notificaciones', 'Notifications'],
            shortLogoutLabel: ['Salir', 'Logout'],
            shortSignInLabel: ['Entrar', 'Sign in']

        }
    },
    created () {
        this.$store.dispatch('loadNotificaciones')
        console.log("El usuario", this.user)
    },
    methods: {
        gotoToPage (page) {
            this.$nextTick(() => {
                
                console.log("[App.vue] Push")
                // this.$router.push('/')
                this.$router.push('/' + page)
            })
        },
        verNotificacion (notificacion) {
            let payload = {
                notificacion: notificacion,
                notificaciones: this.notificaciones
            }
            this.$store.commit('setNotificacion', payload)
        },
        logout () {
            this.$store.dispatch('logout')
            this.actualizarEstado('Offline')
        },
        actualizarEstado (newEstado) {
            let auxFind = this.estados.find(iterator => {
                return this.user.id == iterator.idUsuario
            })
            let payload = {
                key: auxFind.key, // key del firebase
                newEstado: newEstado
            }
            this.$store.dispatch('actualizarEstado', payload)
        },
        addProductShortcut () {
            console.log("[Toolbar] Action by ref", this.$refs.AddProduct.$refs.btnAddProduct)
            this.$refs.AddProduct.$refs.btnAddProduct.$el.click()
        },
        displayNotification(title, options) {
            if (Notification.permission == 'granted') {
                navigator.serviceWorker.getRegistration().then(function(reg) {
                reg.showNotification(title, options);
                });
            }
        }
    },
    computed: {
        ...mapGetters({
            systemMensajes: 'getNotificacionesMensajes',
            prefLanguaje: 'getUserLang',
            estados: 'getEstados',
            user: 'getUserData',
        }),
        isUserLogged () {
            let id = this.$store.getters.getUserData.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
        userData () {
            let data = this.$store.getters.getUserConfig
            if (data)
                return data
            else 
                return ""
        },
        xsOnly () {
            return this.$vuetify.breakpoint.xsOnly
        },
        tiendaActive () {
            return (this.$route.name == 'Tienda')
        },
        streamingActive () {
            return (this.$route.name == 'Main page' || this.$route.fullPath.includes('sagas') || this.$route.fullPath.includes('character'))
        },
        notificaciones () {
            let auxNotificaciones = this.$store.getters.getNotificaciones
            let notificaciones = []
            console.log("Notificaciones WARD", auxNotificaciones)
        
            if (auxNotificaciones.length > 0) {
                // Generar el mensaje de la notificacion
                auxNotificaciones.forEach(notificacion => {
                    let auxNotif = null
                    if (notificacion.tipoNotificacion == 'contenido') {
                        // Esta parte es un poco larga, ya que se genera el mensaje dependiendo
                        // Del tipo de notificacion y contenido que se tenga
                        if (notificacion.tipoNotificacion == 'contenido') {
                            if (notificacion.tipoContenido == 'holder') {
                                // Reemplazar los --- por el titulo
                                let auxCuerpo = this.systemMensajes.contenido[this.prefLanguaje].split('---').join(notificacion.titulo);
                                auxNotif = {
                                    // Ward de idioma
                                    idNotificacion: notificacion.idNotificacion,
                                    cuerpo: auxCuerpo,
                                    titulo: notificacion.titulo,
                                    url: "sagas/" + notificacion.urlSaga + "/" + notificacion.urlHolder + "/" + notificacion.urlMedia + "/1",
                                    visto: notificacion.visto
                                }
                            } else if (notificacion.tipoContenido == 'saga') {
                                let auxCuerpo = this.systemMensajes.contenido[this.prefLanguaje].split('---').join(notificacion.titulo);
                                auxNotif = {
                                    // Ward de idioma
                                    idNotificacion: notificacion.idNotificacion,
                                    cuerpo: auxCuerpo,
                                    titulo: notificacion.titulo,
                                    url: "sagas/" + notificacion.urlSaga + "/" + notificacion.urlHolder + "/",
                                    visto: notificacion.visto
                                }
                            } else if (notificacion.tipoContenido == 'personaje') {
                                // Generar el nombre del personaje en el mensaje // Ward de idioma
                                let auxCuerpoPers = this.systemMensajes.personaje[this.prefLanguaje].split('***').join(notificacion.personaje);
                                // Ya que esta el personaje ahora sigue el titulo del holder
                                let auxCuerpo = auxCuerpoPers.split('---').join(notificacion.tituloHolder);
                                auxNotif = {
                                    idNotificacion: notificacion.idNotificacion,
                                    cuerpo: auxCuerpo,
                                    titulo: '',
                                    url: "sagas/" + notificacion.urlSaga + "/" + notificacion.urlHolder + "/",
                                    visto: notificacion.visto
                                }
                            }
                        }
                    } else if (notificacion.tipoContenido == 'contacto') {
                        // Generar el nombre del usuario en el mensaje
                        let auxCuerpo = this.systemMensajes.contacto[this.prefLanguaje].split('***').join(notificacion.nombre);
                        auxNotif = {
                            idNotificacion: notificacion.idNotificacion,
                            cuerpo: auxCuerpo,
                            titulo: '',
                            url: "profileView/" + notificacion.idContacto + "/",
                            visto: notificacion.visto
                        }
                    }
                    if (auxNotif)
                        notificaciones.push(auxNotif)
                });
                console.log("Notificaciones generadas", notificaciones)
                return notificaciones
            } else {
                return [{
                    cuerpo: "",
                    titulo: "",
                    url: "",
                    visto: ""
                }]
            }
        },
        notificacionNuevas () {
            let aux = 0
            this.notificaciones.forEach(notificacion => {
                if (!notificacion.visto) {
                    aux++
                }
            });
            return aux
        },
    },
    watch: {
        notificaciones: {
            handler: function (val, oldVal) {
                console.log("val", val, "oldval", oldVal)
                if (val.length > 1 && (val.length > oldVal.length && oldVal.length > 1)) {
                    var options = {
                        body: val[0].cuerpo,
                        icon: 'images/icons/icon-72x72.png',
                        vibrate: [100, 50, 100],
                        data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1,
                        url: val[0].url
                        },
                        actions: [
                        {action: 'explore', title: 'Ver ahora'},
                        {action: 'close', title: 'Cerrar'},
                        ]
                    }
                    let title = "Buenas noticias!"
                    this.displayNotification(title, options)
                }
            },
            deep: true
        }
    },
}
</script>

<style>
    .items {
        max-height: 87vh;
        overflow: auto;
    }
</style>