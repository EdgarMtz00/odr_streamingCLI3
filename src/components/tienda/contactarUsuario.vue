<template>
    <div>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
            <template v-slot:activator="{ on }">
                <v-btn color="info" v-on="on" @click="$emit('contactUser')">
                    <v-icon class="mr-2">message</v-icon> {{button[currLanguaje]}}
                </v-btn>
            </template>
            <v-card>
                <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-toolbar-title>{{title[currLanguaje]}}</v-toolbar-title>
                <v-spacer></v-spacer>

                {{amigos[0]}}

                </v-toolbar>
                <v-layout row wrap>
                    <v-flex xs6>
                        <v-layout row wrap justify-center>
                            <v-carousel>
                                <v-carousel-item
                                v-for="(imagen,i) in imagenes" :key="i"
                                :src="imagen.src"
                                ></v-carousel-item>
                            </v-carousel>
                        </v-layout>
                    </v-flex>
                    <v-flex xs6 class="pa-3">
                        <v-sheet class="pa-2 mb-3" color="grey lighten-3" >
                            <v-layout row wrap fill-height align-center>
                                <v-flex xs4 lg3 xl2>
                                    <div class="title">{{userInfo[currLanguaje]}} </div>
                                </v-flex>
                                <v-flex xs6 lg9 xl10>
                                    <v-list>
                                        <v-list-tile avatar @click="goToProfle (publicadorData.idUsuario)">
                                        <v-list-tile-avatar>
                                            <img :src="publicadorData.profilePic">
                                        </v-list-tile-avatar>

                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="publicadorData.nickname"></v-list-tile-title>
                                        </v-list-tile-content>
                                        </v-list-tile>
                                    </v-list>
                                </v-flex>
                            </v-layout>
                        </v-sheet>
                        <v-text-field
                            :label="labels[0].nombre[currLanguaje]"
                            :rules="[rules.required]"
                            box solo clearable
                            v-model="values[0].nombre"
                            id="id"
                        ></v-text-field>
                        <v-text-field
                            :label="labels[1].correo[currLanguaje]"
                            :rules="[rules.required]"
                            box solo clearable
                            v-model="values[1].correo"
                            id="id"
                        ></v-text-field>
                        <v-text-field
                            :label="labels[2].numero[currLanguaje]"
                            :rules="[rules.required]"
                            box solo clearable
                            v-model="values[2].numero"
                            id="id"
                        ></v-text-field>
                        <v-textarea
                            :label="labels[3].descripcion[currLanguaje]"
                            :rules="[rules.required]"
                            box solo rows="4"
                            resizable clearable
                            v-model="values[3].descripcion"
                            id="id"
                        ></v-textarea>
                        <v-btn color="success" @click="contactarUsuario">
                            <v-icon class="mr-2">message</v-icon> {{button[currLanguaje]}}
                        </v-btn>
                    </v-flex>
                    <v-flex xs12>
                        <v-layout row wrap justify-center>
                            <v-subheader><v-icon>info</v-icon> {{information[currLanguaje]}}</v-subheader>
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
    props: {
        imagenes: {
            type: Array,
            default: function () { return [] }
        },
        titulo: {
            type: String
        }
    },
    data () {
        return {
            labels: [
                {nombre: ['Tu nombre', 'Your name']},
                {correo: ['Tu correo', 'Your email']},
                {numero: ['Tu numero', 'Your number']},
                {descripcion: ['Mensaje', 'Message']}
            ],
            values: [
                {nombre: ''},
                {correo: ''},
                {numero: ''},
                {descripcion: ''}
            ],
            dialog: false,
            rules: {
                required: value => !!value || 'Required.',
            },
            information: ['Contactaras al usuario para acordar la compra', 'You will contact the user who posted this to arrange the purchase'],
            title: ['Contactar usuario', 'Contacting user'],
            button: ['Contactar usuario', 'Contact user'],
            userInfo: ['Publicado por:', 'Posted by:'],

        }
    },
    computed: {
        ...mapGetters({
            publicadorData: 'getComprarProducto',
            amigos: 'getAmigos',
            user: 'getUserData',
            currLanguaje: 'getUserLang',
        }),
    },
    methods: {
        goToProfle (IdAmigo) {
            this.$router.push('/profileView/' + IdAmigo)
        },
        contactarUsuario () {
            let payload = {
                idProfile: this.publicadorData.idUsuario,
                idUsuario: this.user.id,
                mensaje: "Re: " + this.titulo + ': ' + this.values[0].nombre + " - " + this.values[1].correo + " - " +
                this.values[2].numero + " - \n" + this.values[3].descripcion,
            }
            this.$store.dispatch('addMutualFriend', payload)
        }
    }
}
</script>