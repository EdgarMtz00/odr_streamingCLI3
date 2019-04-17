<template>
    <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon flat v-on="on" ref="btnAddProduct">
            <v-icon color="white" >add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Add a new product</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-layout row wrap>
            <v-flex xs12 md6>
                <v-layout row wrap justify-center>
                    <shop-images-selector-carousel :preview="true" loadText="Create Product"
                    v-on:passImages="crearProducto ($event)"
                    class="pa-2">
                    </shop-images-selector-carousel>
                </v-layout>
            </v-flex>
            <v-flex xs12 md6 class="pa-3">
                <v-text-field
                    label="Title"
                    :rules="[rules.required]"
                    box solo clearable
                    v-model="title"
                ></v-text-field>
                <v-textarea
                    label="Description"
                    :rules="[rules.required]"
                    box solo rows="4"
                    resizable clearable
                    v-model="description"
                ></v-textarea>
                <v-text-field
                    label="Initial stock" clearable
                    :rules="[rules.required]"
                    box solo type="number"
                    v-model="stock" 
                ></v-text-field>
                <v-text-field
                    label="Category"
                    :rules="[rules.required]"
                    box solo clearable
                    v-model="category"
                ></v-text-field>
                <v-text-field
                    label="Price"
                    :rules="[rules.required]"
                    box solo number clearable
                    v-model="precio"
                ></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-layout row wrap justify-center>
                    <v-subheader><v-icon>info</v-icon> You need to select at least an image to create a product</v-subheader>
                </v-layout>
                <v-layout row wrap justify-center v-if="upload">
                    <v-btn color="success" :disabled="true" :loading="cargando">
                        {{status}}
                    </v-btn>
                </v-layout>
            </v-flex>
        </v-layout>
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
    methods: {
        crearProducto ($event) {
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
                    idUsuario: this.user.id,
                    titulo: this.title,
                    descripcion: this.description,
                    stock: this.stock,
                    precio: this.precio,
                    imagenes: imagenesNoHeader,
                    categoria: this.category,
                    idUsuario: this.user.id,
                    nickname: this.user.configuration.nickname,
                    type: this.user.cuenta,
                }
                this.$store.dispatch('crearProducto', newProduct)
            }
        },
        removeBase64Headers (base64) {
            return base64.substr(base64.indexOf(',') + 1)
        },
    },
    computed: {
        cargando () {
            return this.$store.getters.getCargando
        },
        status () {
            return this.$store.getters.getStatusUpload
        },
        ...mapGetters({
            user: 'getUserData',
        }),
    }
}
</script>