import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        amigos: [],
        chats: [],
    },
    mutations: {
        setAmigos (state, payload) {
            state.amigos = payload
        },
        addChat (state, payload) {
            let chatRef = state.chats.find(auxFind => {
                return auxFind.idChat == payload.idChat
            })
            if (chatRef) {
                chatRef = payload
            } else {
                state.chats.push(payload)
            }
        },
        addMessage (state, payload) {
            state.chats.find(aux => {
                return aux.idChat == payload.idChat
            }).mensajes.push(payload.mensajes)
        },
        clearAmigos (state) {
            state.amigos = []
        },
        removeFriend (state, payload) {
            let index = state.amigos.indexOf(payload)
            state.amigos.splice(index,1);
        },
        addFriend (state, payload) {
            state.amigos.push(payload)
        }
    },
    actions: {
        loadAmigos ({commit, getters}, idUsuario) {
            commit('clearAmigos')
            let url = getters.urlBase
            let formData = new FormData()
            formData.set('idUser', idUsuario)
            axios.post(url +'connections/socialNetwork/getFriends.php', formData).then(response => {
                let amigos = response.data.data
                amigos.forEach(elementAmigo => {
                    elementAmigo.imagen = url + 'Profiles/' + elementAmigo.IdAmigo + '/profile.jpg';
                });
                commit('setAmigos', amigos)
            }).catch(error => {
                console.log(error)
            })
        },
        loadChats ({commit, getters}, idChat) {
            let chat = {
                idChat: idChat,
                mensajes: [],
            }
            
            firebase.database().ref('chats/' + idChat).on("value", function(response) {
                console.log("response val", response.val())
                chat.mensajes = response.val()
                // response.forEach(element => {
                //     chat.mensajes.push(element.val())
                // });
                commit('addChat', chat)
            })
        },
        sendMessage ({commit}, chat) {
            let newChat = {
                idChat: chat.idChat,
                mensajes: {}
            }
            newChat.mensajes = {
                idUsuario: chat.idUser,
                nombre: chat.nickname,
                mensaje: chat.message,
            }
            firebase.database().ref('chats/' + chat.idChat).child(chat.id).set(newChat.mensajes).then(response => {
                // commit('addMessage', newChat)
            })
        },
        removeFriend ({commit}, friend) {
            commit('removeFriend', friend)
        },
        addFriend ({commit}, friend) {
            commit('addFriend', friend)
        }

    },
    getters: {
        getAmigos (state) {
            return state.amigos
        },
        getChats (state) {
            return state.chats
        }
    }
})
