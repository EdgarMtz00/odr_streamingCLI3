<template>
    <div>
        <v-card>
            <v-card-text>
                <!-- user: {{profileData}} <br> -->
                <!-- tipo de cuenta: {{tipoDeCuenta}} <br> -->
                <v-layout row wrap justify-start="">
                        <v-flex xs12 md4 xl4>
                            <v-img :src="profileData.Imagen" :height="profilePicHeight" contain></v-img>
                        </v-flex>
                        <v-flex xs12 md8 xl8 class="pl-2">
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-layout row wrap align-center>
                                        <div class="headline">{{profileData.Nickname}}</div>
                                        <!-- <span class="ml-2">(El webos)</span> -->
                                        <v-spacer></v-spacer>
                                        
                                        <!-- Si es el perfil del usuario no se muestra el agregar -->
                                        <div v-if="!sameAsUser && isUserLogged">
                                            <!-- Si ya lo tiene de amigo se muestra eliminar -->
                                            <div v-if="!alreadyAFriend">
                                                <v-btn color="primary" outline flat small v-if="this.$vuetify.breakpoint.xsOnly"
                                                    @click="addFriend">
                                                    <v-icon>add</v-icon>{{labels.agregarAmigoCorto[preferedLang]}}
                                                </v-btn>
                                                <v-btn color="primary" outline flat v-else @click="addFriend">
                                                    {{labels.agregarAmigo[preferedLang]}}
                                                </v-btn>
                                            </div>
                                            <!-- Aca esta el eliminar -->
                                            <div v-else>
                                                <v-btn color="primary" outline flat small v-if="this.$vuetify.breakpoint.xsOnly"
                                                    @click="addFriend">
                                                    <v-icon>remove</v-icon>{{labels.removerAmigoCorto[preferedLang]}}
                                                </v-btn>
                                                <v-btn color="primary" outline flat v-else @click="removeFriend">
                                                    {{labels.removerAmigo[preferedLang]}}
                                                </v-btn>
                                            </div>
                                        </div>
                                        <!-- Apartado para cambiar el tipo de cuenta de alguien -->
                                        <!-- Solo un dios lo puede ver y si la cuenta que se ve es de
                                        un dios solo dice "dios" -->
                                        <div v-if="user.cuenta == 'Dios' && profileData.TipoDeUsuario != 'Dios' && !sameAsUser" 
                                        class="mx-auto">
                                            <v-btn-toggle class="primary" v-model="tipoDeCuenta">
                                            <v-btn value="CDC">
                                                CDC
                                            </v-btn>
                                            <v-btn value="Moderador">
                                                Moderador
                                            </v-btn>
                                            <v-btn value="Consumidor">
                                                Consumidor
                                            </v-btn>
                                            </v-btn-toggle>
                                        </div>
                                        <!-- Si es un dios solo dice "dios" el tipo de usuario 1 es dios -->
                                        <div v-if="profileData.TipoDeUsuario == 1">
                                            <v-btn color="red" disabled>Dios</v-btn>
                                        </div>
                                    </v-layout>
                                    <v-divider class="my-2"></v-divider>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.descripcion[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.Descripcion}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.sexo[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.Sexo}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.ubicacion[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.Ubicacion}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.idioma[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.IdiomaPreferido}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.edad[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.Edad}}</div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12>
                                    <v-layout row wrap>
                                        <div class="body-1">{{labels.fechaReg[preferedLang]}}: </div>
                                        <div class="ml-2">{{profileData.FechaDeRegistro}}</div>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
        
        <tabs-perfil-component :idProfile="idProfile"></tabs-perfil-component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            idProfile: '',
            preferedLang: 0,
            labels: {
                nombre: ['Nombre real', 'Real name'],
                nickname: ['Nombre de usuario', 'Nickname'],
                descripcion: ['Descripcion', 'Description'],
                sexo: ['Sexo', 'Gender'],
                ubicacion: ['Ubicacion', 'Location'],
                fechaReg: ['Fecha de registro', 'Registration date'],
                idioma: ['Idioma', 'Languaje'],
                edad: ['Edad','Age'],
                agregarAmigo: ['Añadir a contactos', 'Add as contact'],
                agregarAmigoCorto: ['Añadir', 'Add'],
                removerAmigo: ['Quitar contacto', 'Remove contact'],
                removerAmigoCorto: ['Quitar', 'Remove'],
            },
            profileData: {

            },
            tipoDeCuenta: String,
        }
    },
    methods: {
        addFriend () {
            let friend = {
                idProfile: this.idProfile,
                idUsuario: this.user.id
            }
            this.$store.dispatch('addFriend', friend)
        },
        removeFriend () {
            let user = this.$store.getters.getUserData
            
            let friend = {
                idUsuario: user.id,
                idProfile: this.idProfile
            }
            this.$store.dispatch('removeFriend', friend)
        }
    },
    created () {
        this.idProfile = this.$route.params.idProfile
        let urlBase = this.$store.getters.urlBase
        let userId = this.user.id
        this.$store.dispatch('loadAmigos', userId)
        //Obtener data del usuario
        let formData = new FormData()
        formData.set('idProfile', this.idProfile)
        this.axios.post(urlBase + 'connections/userConnections/getUserData.php', formData).then(response => {
            let data = response.data.response
            console.log('response selected user:', data)
            // La base de datos guarda en http://localhost la imagen y ps hay que modificar
            data.Imagen = urlBase + 'Profiles/' + this.idProfile + '/profile.jpg';
            this.profileData = {...data}
        }).catch(error => {
            console.log(error)
        })
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
        }),
        profilePicHeight () {
            switch (this.$vuetify.breakpoint.name) {
            case 'xs': return 300
            case 'sm': return 300
            case 'md': return 400
            case 'lg': return 400
            case 'xl': return 500
          }
        },
        sameAsUser () {
            let user = this.user
            if (user.id == this.profileData.IdUsuario)
                return true
            else
                return false
        },
        alreadyAFriend () {
            let idOtro = this.profileData.IdUsuario
            let amigos = this.amigos
            if (!this.sameAsUser && Array.isArray(amigos)) {
                let already = amigos.find(auxFind => {
                    return auxFind.IdAmigo == idOtro
                })
                if (already)
                    return true
                else 
                    return false
            } else {
                return false
            }
        },
        amigos () {
            let aux = this.$store.getters.getAmigos
            if (aux[0]){
                return aux
            } else {
                return {
                    Imagen: '',
                }
            }
        },
        user () {
            return this.$store.getters.getUserData
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
    watch: {
        profileData: {
            handler: function(user) {
                if (user.TipoDeUsuario) {
                    if (user.TipoDeUsuario == 1) {
                        this.tipoDeCuenta = "Dios"
                    } else if (user.TipoDeUsuario == 2) {
                        this.tipoDeCuenta = "CDC"
                    } else if (user.TipoDeUsuario == 3) {
                        this.tipoDeCuenta = "Moderador"
                    } else if (user.TipoDeUsuario == 4) {
                        this.tipoDeCuenta = "Consumidor"
                    }
                }
            },
            deep: true,
        },
        tipoDeCuenta: {
            handler: function(cuenta) {
                let payload = {
                    idUsuario: this.idProfile,
                    cuenta: cuenta,
                }
                this.$store.dispatch('cambiarTipoDeCuenta', payload)
            },
        }
    }
}
</script>

<style>
    
</style>
