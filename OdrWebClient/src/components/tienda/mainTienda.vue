<template>
    <div>
        <v-layout row wrap>
            <!-- <v-flex xs1 lg2>
                <v-card>
                    <v-card-title primary-title>
                        Aside derecho
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="primary">text</v-btn>
                        <v-btn flat color="primary">text</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex> -->
            <v-flex xs12 lg12>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs6 md3 xl2 v-for="(item, index) in productosFiltrados" :key="index">
                                <producto-component :titulo="item.titulo" 
                                :precio="item.precio" :imagen="item.imagenes[0].src" 
                                :descripcion="item.descripcion" :imagenes="item.imagenes"
                                :stock="Number(item.stock)" :id="item.id" :categoria="item.categoria"
                                :ref="'producto' + index" :type="item.type" :nickname="item.nickname" 
                                :idUsuario="item.idUsuario" :profilePic="item.profilePic"/>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
            <!-- <v-flex xs1 lg2>
                <v-card>
                    <v-card-title primary-title>
                        Aside derecho
                    </v-card-title>
                    <v-card-actions>
                        <v-btn flat color="primary">text</v-btn>
                        <v-btn flat color="primary">text</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex> -->
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
        }
    },
    methods: {
    },
    created () {
        this.$store.dispatch('cargarProductos')
    },
    computed: {
        ...mapGetters({
            productos: 'getProductos',
        }),
        filtro () {
            let filter = this.$store.getters.getProductos
            if (filter.length > 0)
                return filter
            else {
                return {}
            }
        },
        productosFiltrados () {
            let resultado = []
            let filtroCategoria = this.$store.getters.getFiltro.categoria

            if (filtroCategoria != ' ' && filtroCategoria != 'Todo') {
                this.productos.forEach(producto => {
                    if (producto.categoria == filtroCategoria) {
                        resultado.push(producto)
                    }
                });
            } else {
                resultado = this.productos
            }

            return resultado
        },
    }
}
</script>