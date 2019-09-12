<template>
    <div>
        <v-dialog v-model="dialog" width="600" hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn color="success" dark v-on="on" @click="marcarVendido()">
                    {{vendido[lang]}}
                </v-btn>
            </template>

            <v-card>
                <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{vendido[lang]}}</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-layout row wrap justify-center>
                        <!-- Cuerpo -->
                        <v-flex xs12>
                            <!-- Seccion de seleccion de usuario -->
                            <v-layout row wrap align-center class="mb-2">
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <v-icon class="mr-1">info</v-icon> <div class="subheading">{{seleccionarComprador[lang]}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-divider class="my-2"></v-divider>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select :items="usuariosContactados" item-text="nickname" return-object v-model="comprador" label="Usuarios"></v-select>
                                </v-flex>
                            </v-layout>
                            <!-- Seccion se calificar al usuario -->
                            <v-layout row wrap align-center>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <v-icon class="mr-1">info</v-icon> <div class="subheading">{{calificacionText[lang]}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-divider class="my-2"></v-divider>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap justify-center align-center justify-space-between>
                                        <div class="subheading">{{calificacionText[lang]}}</div>
                                        <v-btn-toggle v-model="calificacion">
                                            <v-btn flat value="bad">
                                                <v-icon>thumb_down</v-icon>
                                            </v-btn>
                                            <v-btn flat value="good">
                                                <v-icon>thumb_up</v-icon>
                                            </v-btn>
                                        </v-btn-toggle>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                            <v-layout row wrap justify-center class="mt-2">
                                <v-btn color="success" :disabled="!valido" @click="venderProducto ()">{{vendido[lang]}}</v-btn>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        idProducto: {
            default: '0'
        },
        idUsuario: {
            default: '0'
        },
        nombreProducto: {
            type: String
        }
    },
    data () {
        return {
            dialog: false,
            vendido: ['Marcar como vendido', 'Mark as sold'],
            seleccionarComprador: ['Seleccionar al usuario comprador', 'Select the user who bought this item'],
            calificacionText: ['Califica el servicio con este usuario', 'Rate this user'],
            comprador: {},
            calificacion: null,
        }
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
            usuariosContactados: 'getUsuariosContactados',
            usuario: 'getUserData',
        }),
        sameUser () {
            let user = this.$store.getters.getUserData
            console.log("Usuarios contactados user", user)
            if (this.idUsuario == user.id) {
                return true
            } else {
                return false
            }
        },
        // Para cuidar que todos los campos se llenen antes de marcar como vendido
        valido () {
            if (this.comprador.idUsuario && this.calificacion) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        // Solo para cargar los datos de firebase
        marcarVendido () {
            // Proteccion extra: checar si el usuario es el mismo que creo que objeto
            if (this.sameUser) {
                // Traer usuarios que contactaron al creador
                this.$store.dispatch('cargarUsuariosContactados', this.idProducto)
            } else {
                let errorMarcar = ["Solo el usuario creador del objeto y los dioses pueden marcar como vendido", "Only user creater and gods can change this product current status"]
                this.dialog = false
                alert(errorMarcar[this.lang])
            }
        },
        // Esta ya realiza el procedimiento de venta
        venderProducto () {
            // Lo primero que se hace es borrar el producto de la tabla de productos y ponerla el productos vendidos

            let payload = {
                comprador: this.comprador,
                idProducto: this.idProducto,
                idVendedor: this.usuario.id,
                producto: this.nombreProducto,
            }
            // Marcar al usuario como comprador de este producto en el nodo de firebase donde se guardan que usuario compro que, en tiendaCompradores
            this.$store.dispatch('indicarComprador', payload)

            // Crear el nuevo tipo de notificacion "calificar"
            this.$store.dispatch('crearNotificacionVenta', payload)

            // Registrar su reputacion
            let payloadReputacion = {
                idUsuario: this.comprador.idUsuario,
                idProducto: this.idProducto,
                reputacion: this.calificacion,
                tipo: 'vendedor',
            }
            this.$store.dispatch('registrarReputacion', payloadReputacion)
        }
    },
}
</script>