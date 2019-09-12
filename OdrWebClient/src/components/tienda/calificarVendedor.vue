<template>
    <div>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{calificarVendedor[lang]}}</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
                <v-layout row wrap justify-center>
                    <!-- Seccion se calificar al usuario -->
                    <v-layout row wrap>
                        <v-flex xs12 md6>
                            <producto-component :titulo="producto.titulo" 
                                :precio="producto.precio" :imagen="producto.imagenes[0].src" 
                                :descripcion="producto.descripcion" :imagenes="producto.imagenes"
                                :stock="Number(producto.stock)" :id="producto.id" :categoria="producto.categoria"
                                :ref="'producto'" :type="producto.type" :nickname="producto.nickname" 
                                :idUsuario="producto.idUsuario" :profilePic="producto.profilePic" :viewOnly="true"/>
                        </v-flex>
                        <v-flex xs12 md6>
                            <v-layout row wrap>
                                <v-flex xs12 class="mt-3">
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
                                        <v-btn color="success" :disabled="!valido" @click="calificar ()">
                                            {{calificarText[lang]}}
                                        </v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-layout>
            </v-card-text>

            <v-divider></v-divider>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            calificarVendedor: ["Califica al vendedor", "Rate the seller's service"],
            calificacionText: ['Califica el servicio con este usuario', 'Rate this user'],
            calificacion: null,
            calificarText: ['Calificar', 'Rate'],
            producto: {}
        }
    },
    created () {
        let payload = {
            idProducto: this.$route.params.idProducto,
            idUsuario: this.usuario.id,
        }
        this.$store.dispatch('cargarComprador', payload).then(res => {
            let formData = new FormData ()
            formData.set('idProducto', payload.idProducto)
            // Cargar los datos del producto
            this.axios.post('http://localhost/Odr/connections/productos/getProduct.php', formData).then(response => {
                let data = response.data
                if (data.status.includes('OK')) {
                    this.$store.dispatch('cargarProducto', data.producto).then(res => {
                        this.producto = res
                    })
                }
            })
        })
    },
    methods: {
        calificar () {
            let payload = {
                idUsuario: this.$route.params.idVendedor,
                idProducto: this.$route.params.idProducto,
                reputacion: this.calificacion,
                tipo: 'comprador',
            }
            this.$store.dispatch('registrarReputacion', payload)
        }
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
            usuario: 'getUserData',
        }),
        // Para cuidar que todos los campos se llenen antes de marcar como vendido
        valido () {
            if (this.calificacion) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>