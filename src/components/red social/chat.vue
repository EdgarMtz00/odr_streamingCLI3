<template>
    <div>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 md3 xl3 v-if="!xsOnly || (xsOnly && selectAmigo)">
                                <v-list>
                                    <v-list-tile v-for="(aux, index) in amigos" :key="index" @click="selectChat(aux)">
                                        <v-list-tile-avatar>
                                            <img :src="aux.imagen">
                                        </v-list-tile-avatar>
                                        <v-list-tile-content>
                                            <v-list-tile-title v-html="aux.Nickname"></v-list-tile-title>
                                        </v-list-tile-content>
                                        <v-list-tile-action>
                                            <v-icon>chat_bubble</v-icon>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </v-list>
                            </v-flex>
                            <v-divider vertical v-if="!xsOnly"></v-divider>
                            <v-flex xs12 md8 xl8 style="height: 84.3vh;" class="mx-auto" v-if="!xsOnly || (xsOnly && !selectAmigo)">
                                <v-card class="elevation-0">
                                    <v-card-title primary-title style="padding: 0px !important;">
                                        <v-btn color="primary" icon fab flat v-if="xsOnly" 
                                        @click="selectAmigo = true">
                                            <v-icon>arrow_back</v-icon>
                                        </v-btn>
                                        <v-list>
                                            <v-list-tile @click="goToProfle (selectedChat.IdAmigo)">
                                                <v-list-tile-avatar>
                                                    <img :src="selectedChat.imagen">
                                                </v-list-tile-avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title class="headline">
                                                        {{selectedChat.Nickname}}
                                                    </v-list-tile-title>
                                                </v-list-tile-content>
                                            </v-list-tile>
                                        </v-list>
                                    </v-card-title>
                                    <v-divider></v-divider>
                                    <v-card-text>
                                        <v-layout row wrap fill-height align-end="">
                                            <v-flex xs12>
                                                <v-layout row wrap class="chatContent" id="chatContainer">
                                                    <v-flex xs12>
                                                        <v-layout row wrap v-for="(aux, index) in mensajes" :key="index" class="pa-2 my-2"
                                                        :justify-start="aux.type == 0" :justify-end="aux.type == 1" align-center>
                                                            <v-icon v-if="aux.type == 0">keyboard_arrow_right</v-icon>
                                                            <v-flex xs8>
                                                                <v-sheet :color="aux.color"
                                                                class="pa-2">
                                                                    <div class="body-1 ">{{aux.mensaje}}</div>
                                                                </v-sheet>
                                                            </v-flex>
                                                            <v-icon v-if="aux.type == 1">keyboard_arrow_left</v-icon>
                                                        </v-layout>

                                                    </v-flex>
                                                </v-layout>
                                            </v-flex>
                                            <v-flex xs12 class="mt-2">
                                                <v-text-field
                                                    box v-model="message"
                                                    single-line
                                                    prepend-inner-icon="message"
                                                    append-icon="send"
                                                    @click:append="sendMessage"
                                                    v-on:keydown="keyInspector ($event)">
                                                </v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    // El tipo de mensaje 1 son mensajes de uno mismo
    data () {
        return {
            selectAmigo: true,
            selectedChat: '',
            message: '',
        }
    },
    created () {
        this.$store.dispatch('loadAmigos', this.user.id)
    },
    methods: {
        selectChat (chat) {
            console.log("Chat", chat)
            this.selectedChat = chat
            this.selectAmigo = false
            this.$store.dispatch('loadChats', chat.idChat)
        },
        sendMessage () {
            let nickname = this.user.configuration.nickname
            let idChat = this.selectedChat.idChat
            
            let aux = this.chats.find(auxFind => {
                return auxFind.idChat == idChat
            })
            let cantidad;
            console.log('MENSJAES XD', aux)
            if (aux)
                cantidad = aux.mensajes.length
            else
                cantidad = 0

            let chat = {
                idChat: idChat,
                idUser: this.user.id,
                nickname: nickname,
                message: this.message,
                id: cantidad,
            }
            this.$store.dispatch('sendMessage', chat)
            this.message = ''
        },
        keyInspector ($event) {
            if ($event.key == "Enter")
                this.sendMessage ()
        },
        goToProfle (IdAmigo) {
            this.$router.push('/profileView/' + IdAmigo)
        }
    },
    computed: {
        user () {
            console.log('user data xd', this.$store.getters.getUserData)
            return this.$store.getters.getUserData
        },
        amigos () {
            let aux = this.$store.getters.getAmigos
            if (aux[0]){
                this.selectChat(aux[0])
                return aux
            } else {
                return {
                    Imagen: '',
                }
            }
        },
        mensajes () {
            let aux = this.currentChat
            console.log("Current CHAT", aux)
            if (aux !== undefined){
                if (aux.mensajes !== undefined) {
                    if (Array.isArray(aux.mensajes))
                    aux.mensajes.forEach(elementMsg => {
                        if (elementMsg.nombre.toLowerCase() === this.user.configuration.nickname.toLowerCase()) {
                            elementMsg.type = 1
                            elementMsg.color = 'blue lighten-1'
                        } else {
                            elementMsg.type = 0
                            elementMsg.color = 'deep-purple lighten-1'
                        }
                    });
                    return aux.mensajes
                } else 
                    return ''
            } else {
                return ''
            }
        },
        xsOnly () {
            return this.$vuetify.breakpoint.xsOnly
        },
        currentChat () {
            let selected = this.selectedChat
            return this.chats.find(element => {
                return element.idChat == selected.idChat
            })
        },
        chats () {
            return this.$store.getters.getChats
        }
    },
    watch: {
        mensajes: {
            handler: function (val, oldVal) {
                setTimeout(() => {
                     // Mandar al fondo el scroll
                    var container = this.$el.querySelector("#chatContainer");
                    container.scrollTop = container.scrollHeight;
                    // Le tuve que poner 200ms porque no lo mandaba hasta abajo sin el, solo hasta el penultimo mensaje
                }, 200);
            },
        deep: true
        }
  },
}
</script>

<style>
    .chatContent {
        height: 66vh;
        max-height: 65vh;
        overflow-y: auto;
    }

    @media screen and (max-width: 1300px) {
        .chatContent {
            height: 63vh;
            max-height: 65vh;
            overflow-y: auto;
        }
    }

    @media screen and (max-width: 800px) {
        .chatContent {
            height: 61vh;
            max-height: 65vh;
            overflow-y: auto;
        }
    }
</style>
