<template>
    <div>
        <v-menu
        v-model="showMenu"
        offset-y absolute :close-on-content-click="false"
        style="max-width: 600px"
        >
        <template v-slot:activator="{ on }">
            <v-hover>
                <v-card v-on="on" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 0}`" class="mx-2 px-2 my-2" :height="450 + xsResPenalty">
                    <v-layout column style="cursor: pointer;" class="mt-2" fill-height>
                        
                        <v-flex xs12>
                            <v-img :height="299 + xsResPenalty" :max-height="300 + xsResPenalty" contain class="mt-2"
                            :src="imagen"/>
                            <v-divider class="mt-2"></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <div class="subheading font-weight-regular mt-2 tituloProducto">
                                {{titulo}}
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <div style="font-size: 9pt;" class="grey--text autorProducto">
                                {{nickname}}
                            </div>
                        </v-flex>
                        <v-flex xs12 class="align-baseline">
                            <v-divider class="my-2"></v-divider>
                            <v-layout row wrap class="headline">
                                ${{precio}}<div class="body-3 ml-2">MXN</div>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-hover>
        </template>
        <!-- Este es el que se abre al dar click en el producto -->
        <v-card width="600" max-height="650">
            <v-card-text>
                <v-layout column style="cursor: pointer;" class="mt-2" fill-height>
                    <v-flex xs12>
                        <v-layout row class="my-2 myContainer">
                            <v-flex xs12 lg4 v-for="(img, index) in imagenes" :key="index" class="mx-3">
                                <v-img contain width="220" height="250"
                                    :src="img.src">
                                </v-img>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <v-flex xs10>
                        <v-layout row wrap fill-height align-center>
                            <v-flex xs12 class="mt-3">
                                <v-divider></v-divider>
                            </v-flex>

                            <v-flex xs4>
                                <v-layout row wrap class="headline" align-center fill-height>
                                    ${{precio}}<div class="body-3 ml-2">MXN</div>
                                </v-layout>
                            </v-flex>
                            
                            <v-flex xs8>
                                <div class="subheading font-weight-regular mt-2 tituloProducto">
                                    {{titulo}}
                                </div>
                                <div style="font-size: 9pt;" class="grey--text autorProducto">
                                     {{nickname}}
                                </div>
                            </v-flex>

                            <v-flex xs12 class="mt-2">
                                <v-divider></v-divider>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <!-- Descripcion del producto -->
                    <v-flex xs12 class="mt-2" v-html="descripcion">
                    </v-flex>
                    <v-flex xs12 class="mt-2" v-if="!isFromUser">
                        <div class="body-2">
                            Stock: {{stock}}
                        </div>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions v-if="!viewOnly">
                <v-layout row wrap justify-space-between>
                    <!-- <v-btn :color="colorStatus" @click="" v-if="isFromUser">
                        <v-icon class="mr-1">message</v-icon>{{contanctUser}}
                    </v-btn> -->
                    <v-flex xs12 md4>
                        <contactar-usuario-component v-if="!sameUser" :idProducto="id"
                        :imagenes="imagenes" :titulo="titulo" v-on:contactUser="setComprarProducto">
                        </contactar-usuario-component>
                        <!-- Boton marcar como vendido -->
                        <marcar-vendido-component :idProducto="id" :nombreProducto="titulo" :idUsuario="idUsuario" v-if="sameUser"></marcar-vendido-component>
                    </v-flex>
                    <v-flex xs12 md4>
                        <editar-producto-component v-if="puedeEditar"
                        v-on:setEditProduct="setEditarProducto">
                        </editar-producto-component>
                    </v-flex>
                    <!-- <v-btn v-else-if="!isFromUser"
                    :color="colorStatus" @click="añadirCarrito ()" :disabled="!disponibilidad">
                        <v-icon class="mr-1">{{iconStatus}}</v-icon>{{productoStatus[lang]}}
                    </v-btn> -->
                    <v-btn @click="reportarProducto()">Report Object</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
        </v-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        titulo: {
            type: String
        },
        precio: {
            type: String
        },
        url: {
            type: String
        },
        imagen: {
            type: String
        },
        descripcion: {
            type: String
        },
        imagenes: {
            type: Array,
            default: function () { return [] }
        },
        stock : {
            type: Number
        },
        id: {
            type: String
        },
        categoria: {
            type: String
        },
        type: {
            type: String
        },
        idUsuario: {
            type: String
        },
        nickname: {
            type: String
        },
        profilePic: {
            type: String
        },
        viewOnly: {
            default: false
        }
    },
    data () {
        return {
            showMenu: false,
            productoStatus: ['Añadir a carrito', 'Add to Cart'],
            iconStatus: 'add',
            colorStatus: 'success',
            contanctUser: ['Contactar usuario', 'Contact user'],
        }
    },
    methods: {
        añadirCarrito () {
            if (!this.isUserLogged) {
                // this.$router.push('/')
                this.$router.push('/login')
            } else {
                let newProducto = {
                    titulo: this.titulo,
                    precio: this.precio,
                    url: this.url,
                    imagen: this.imagen,
                    descripcion: this.descripcion,
                    imagenes: this.imagenes,
                    stock: this.stock,
                    id: this.id,
                    nickname: this.nickname
                }
                this.$store.commit('addCarrito', newProducto)
                this.$store.commit('subStock', newProducto)

                this.changeStatus()
            }
        },
        changeStatus: function(){
            this.productoStatus = 'Added to Cart'
            this.iconStatus = 'check'
            this.colorStatus = 'orange'
            setTimeout(() => {
                this.productoStatus = 'Add to Cart'
                this.iconStatus = 'add'
                this.colorStatus = 'success'
            }, 2000);
        },
        setEditarProducto () {
            let editProducto = {
                titulo: this.titulo,
                precio: this.precio,
                url: this.url,
                imagen: this.imagen,
                categoria: this.categoria,
                descripcion: this.descripcion,
                imagenes: this.imagenes,
                stock: this.stock,
                id: this.id,
            }
            this.$store.commit('setEditarProducto', editProducto)
        },
        setComprarProducto () {
            let producto = {
                idUsuario: this.idUsuario,
                nickname: this.nickname,
                profilePic: this.profilePic,
            }
            this.$store.commit('setProductoComprar', producto)
        },
        reportarProducto () {
            let productReport = {
                idUsuario: this.idUsuario,
                idContenido: this.id,
                contenido: 'Titulo: ' + this.titulo + ' Descripcion: ' + this.descripcion + ' Imagen: ' + this.imagen,
            }
            this.$store.dispatch('reportProduct', productReport)
        }
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
        }),
        xsResPenalty () {
            if (this.$vuetify.breakpoint.smAndDown)
                return -100
            else
                return 0
        },
        disponibilidad () {
            return (this.stock > 0)
        },
        isFromUser () {
            return (this.type == 'user')
        },
        puedeEditar () {
            let user = this.$store.getters.getUserData
            if (this.sameUser || user.cuenta == 'Moderador' || user.cuenta == 'Dios') {
                return true
            } else {
                return false
            }
        },
        sameUser () {
            let user = this.$store.getters.getUserData
            if (this.idUsuario == user.id) {
                return true
            } else {
                return false
            }
        },
        isUserLogged () {
            let id = this.$store.getters.getUserData.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
    }
}
</script>

<style>
    /* styles for '...' */ 
    /* mixin for multiline */
.tituloProducto {
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 3.6em;
  text-align: justify;
  padding-right: 1em;
}
.tituloProducto:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
.tituloProducto:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}

.autorProducto {
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 2.4em;
  text-align: justify;
  padding-right: 1em;
}
.autorProducto:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
.autorProducto:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
    .myContainer{
        overflow-y: hidden;
        overflow-x: auto;
    }
</style>
