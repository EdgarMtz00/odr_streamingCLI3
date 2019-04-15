<template>
    <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn color="info" v-on="on" @click="$emit('setEditProduct')">
                    <v-icon>edit</v-icon> Edit product
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>Editing  product</v-toolbar-title>
                <v-spacer></v-spacer>
                </v-toolbar>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-layout row wrap justify-center>
                            <shop-images-selector-carousel :preview="true" loadText="Edit Product"
                            v-on:passImages="editarProducto ($event)"
                            class="pa-2">
                            </shop-images-selector-carousel>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 class="pa-3">
                        <v-text-field
                            label="Title"
                            :rules="[rules.required]"
                            box solo clearable
                            v-model="title"
                            id="id"
                        ></v-text-field>
                        <v-textarea
                            label="Description"
                            :rules="[rules.required]"
                            box solo rows="4"
                            resizable clearable
                            v-model="description"
                            id="id"
                        ></v-textarea>
                        <v-text-field
                            label="Stock"
                            clearable :rules="[rules.required]"
                            box solo type="number"
                            v-model="stock" 
                            id="id"
                        ></v-text-field>
                        <v-text-field
                            label="Category"
                            :rules="[rules.required]"
                            box solo clearable
                            v-model="category"
                            id="id"
                        ></v-text-field>
                        <v-text-field
                            label="Price"
                            :rules="[rules.required]"
                            box solo number clearable
                            v-model="precio"
                            id="id"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap justify-center>
                            <v-subheader><v-icon>info</v-icon> You need to select at least an image to create a product</v-subheader>
                        </v-layout>
                        <v-layout row wrap justify-center>
                            <v-subheader><v-icon>info</v-icon> The pictures you choosed will overwrite the old pictures</v-subheader>
                        </v-layout>
                        <v-layout row wrap justify-center v-if="upload">
                            <v-btn color="success" :disabled="true" :loading="cargando">
                                {{status}}
                            </v-btn>
                        </v-layout>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap justify-center>
                            <v-btn color="red" @click="borrarProducto ()">DELETE PRODUCT</v-btn>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <div style="display: none;" >{{producto}}</div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            dialog: false,
            title: '',
            description: '',
            stock: '',
            category: '',
            precio: '',
            upload: false,
            rules: {
                required: value => !!value || 'Required.',
            }
        }
    },
    computed: {
        producto () {
            let aux = this.$store.getters.getEditableProducto
            if (aux.id) {
                this.title = aux.titulo
                this.description = aux.descripcion
                this.stock = aux.stock
                this.category = aux.categoria
                this.precio = aux.precio
                this.id = aux.id
            }
        },
        cargando () {
            return this.$store.getters.getCargando
        },
        status () {
            return this.$store.getters.getStatusUpload
        },
        ...mapGetters({
            user: 'getUserData',
        }),
    },
    methods: {
        editarProducto ($event) {
            if (this.title.length < 1 && this.description.length < 1 &&
                this.stock.length < 1 && this.category.length < 1) {
                    alert('Fill all the text fields')
            } else {
                this.upload = true
                let imagenes = $event
                let imagenesNoHeader = []
                //Quitar header del base64
                imagenes.forEach(imagen => {
                    imagenesNoHeader.push(this.removeBase64Headers(imagen.src))
                });
                let newProduct = {
                    titulo: this.title,
                    descripcion: this.description,
                    stock: this.stock,
                    precio: this.precio,
                    imagenes: imagenesNoHeader,
                    categoria: this.category,
                    id: this.id
                }

                // let aux = {
                //        id: newProducto.idProducto,
                //        titulo: newProducto.nombreProducto,
                //        stock: newProducto.cantidad,
                //        precio: newProducto.precio,
                //        descripcion: newProducto.descripcion,
                //        categoria: newProducto.categoria,
                //        imagenes: auxUrls,
                //        idUsuario: newProducto.idUsuario,
                //        nickname: newProducto.Nickname,
                //        type: type,
                //        profilePic: urlBase + 'Profiles/' + newProducto.idUsuario + "/profile.jpg"
                //    }
                
                this.$store.dispatch('editarProducto', newProduct)
                this.$nextTick(() => {
                    console.log('Revisa a ver si ya funca')
                }, 0)
            }
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
        borrarProducto () {
            this.$store.dispatch('eliminarProducto', this.id)
        }
    }
}
</script>