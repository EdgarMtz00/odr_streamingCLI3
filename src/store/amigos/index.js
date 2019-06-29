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
        },
    },
    actions: {
        loadAmigos ({commit, getters, dispatch}, idUsuario) {
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
                setTimeout(() => {
                    // Cuando cargue los amigos ps tambien cargamos sus estados
                    dispatch('loadEstados')
                }, 500);
            }).catch(error => {
                console.log(error)
            })
        },
        async loadChats ({commit, getters}, idChat) {
            let chat = {
                idChat: idChat,
                mensajes: [],
            }
            
            await firebase.database().ref('chats/' + idChat).on("value", function(response) {
                console.log("response val chats", response.val())
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
        // async removeFriend ({commit}, friend) {
        //     commit('removeFriend', friend)
        // },
        addFriend ({commit, getters}, friend) {
            let urlBase = getters.urlBase
            let formData = new FormData()
            formData.set('idUser', friend.idUsuario)
            formData.set('idFriend', friend.idProfile)
            axios.post(urlBase + 'connections/socialNetwork/addFriend.php', formData).then(response => {
                console.log("Response:", response.data)
                let data = response.data
                if (data.status == "OK") {
                    alert("Amigo añadido!!")
                    firebase.database().ref('chats/').child(data.idChat).once("value", response1 => {
                        if (!response1.exists()){
                            firebase.database().ref('chats/' + data.idChat).set('').then(response => {
                                alert('Chat creado')
                                // Crear la notificacion
                                firebase.database().ref('notificaciones/').push({
                                    idUsuario: friend.idProfile, // Como la notificacion es para el contacto, se pone la id del otro
                                    idContacto: friend.idUsuario,
                                    nombre: friend.nombre,
                                    tipoContenido: 'contacto',
                                    tipoNotificacion: 'contacto',
                                    timestamp: (new Date().getTime() / 1000), /*Un timestamp para poder ordenarlos por fecha*/
                                    visto: false,
                                }).then(elThen => {
                                    firebase.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)
                                })
                            })
                        } else {
                            alert('El chat si existe')
                        }
                    })
                    commit('addFriend', friend)
                }
                else
                    alert("Error al añadir amigo")
            }).catch(error => {
                console.log(error)
            })
        },
        // Especificamente usado para "contactarUsuario" en la tienda
        async addMutualFriend ({commit, getters, dispatch}, payload) {
            let urlBase = getters.urlBase
            // Añadir primer amigo
            let formData = new FormData()
            formData.set('idUser', payload.idUsuario)
            formData.set('idFriend', payload.idProfile)

            // Debido a que estoy reutilizando la rutina de añadir amigo, cada cez que se mande
            // un mensaje se registran como amigos de nuevos y se duplican, asi que los eliminamos una
            // vez para despues añadirlos de nuevo
            let f1 = {
                idUsuario: payload.idUsuario,
                idProfile: payload.idProfile
            }
            let f2 = {
                idUsuario: payload.idProfile,
                idProfile: payload.idUsuario
            }

            await dispatch('removeFriend', f1)

            axios.post(urlBase + 'connections/socialNetwork/addFriend.php', formData).then(async response => {
                let data = response.data
                dispatch('loadChats', data.idChat)
                // Este timeout es porque no me pinches sale hacer que espere  aque loadChats cargue los chats con await
                setTimeout(async() => {
                    if (data.status == "OK") {
                    // checar si el idChat ya esta creado como nodo en firebase
                    firebase.database().ref('chats/').child(data.idChat).once("value",async  response1 => {
                        //Sino existe se crea
                        if (!response1.exists()){
                            firebase.database().ref('chats/' + data.idChat).set('').then(response => {
                            })
                        }
                    })
                    // Añadir segundo amigo
                    await dispatch('removeFriend', f2)
                    
                    let formData1 = new FormData()
                    formData1.set('idUser', payload.idProfile)
                    formData1.set('idFriend', payload.idUsuario)
                    axios.post(urlBase + 'connections/socialNetwork/addFriend.php', formData1).then(res => {
                        commit('addFriend', {idProfile: payload.idUsuario, idUsuario: payload.idProfile})
                        // Enviar el mensaje
                        // Esta es la rutina de enviar mensaje que esta en chat.vue
                        let user = getters.getUserData
                        let chats = getters.getChats
                        console.log("Chats", chats)
                        let cantidad;
                        
                        let aux = chats.find(auxFind => {
                            return auxFind.idChat == data.idChat
                        })
                        chats.forEach(element => {
                            console.log("k mrda",element, data.idChat)
                        });

                        console.log("aux", aux)

                        if (aux)
                            cantidad = aux.mensajes.length
                        else
                            cantidad = 0

                        let chat = {
                            idChat: data.idChat,
                            idUser: user.id,
                            nickname: user.configuration.nickname,
                            message: payload.mensaje,
                            id: cantidad,
                        }
                        console.log('El mensaje de contacto', chat)
                        dispatch('sendMessage', chat)
                        alert('mensaje enviado')
                    })
                    commit('addFriend', {idProfile: payload.idProfile, idUsuario: payload.idUsuario})
                }
                else
                    alert("Error al añadir amigo")
                }, 1000);
            })
        },
        async removeFriend ({commit, getters}, payload) {
            let urlBase = getters.urlBase
            let amigos = getters.getAmigos
            let formData = new FormData()

            formData.set('idUser', payload.idUsuario)
            formData.set('idFriend', payload.idProfile)

            await axios.post(urlBase + 'connections/socialNetwork/removeFriend.php', formData).then(response => {
                if (response.data.status == "OK") {
                    // alert("Amigo removido")
                    let friend = amigos.find(auxFind => {
                        return auxFind.IdAmigo == payload.idProfile
                    })
                    if (friend) {
                        commit('removeFriend', friend)
                    }

                }
                else
                    alert("Error al removido amigo")
            }).catch(error => {
                console.log(error)
            })
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
