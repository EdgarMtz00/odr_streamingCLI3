import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'

export default({
    state: {
        mensajes: {
            contenido: ['Un contenido al que sigues estreno un nuevo elemento: <strong>---</strong>', 
            'A content you are following has new media: <strong>---</strong>'],
            personaje: ['Un personaje al que sigues: <strong>***</strong> aparecera en el nuevo contenido <strong>---</strong> ', 
            'A character you are following: <strong>***</strong> will appear in a this new content: <strong>---</strong>'],
            contacto: ['El usuario: <strong>***</strong> te ha añadido de contacto, añadelo tambien para comenzar a chatear! ', 
            'The user: <strong>***</strong> has added you as contact, add him too to start chating!'],
        },
        notificaciones: []
    },
    mutations: {
        setNotificacion (state, payload) {
            let notificacion = payload.notificacion
            let notificaciones = payload.notificaciones
            let aux = notificaciones.find(auxFind => {
                return auxFind.idNotificacion == notificacion.idNotificacion
            })

            firebase.database().ref('notificaciones/' + aux.idNotificacion).child('visto').set(true)

            aux.visto = true
            router.push('/')
            router.push('/' + aux.url)
        },
        setNotificaciones (state, payload) {
            state.notificaciones = payload
        }
    },
    actions: {
        loadNotificaciones ({commit, getters}) {
            let user = getters.getUserData
            // Si esta logeado
            if (user.id) {
                firebase.database().ref('notificaciones/').orderByChild("idUsuario").equalTo(user.id).on("value", (snapshot) => {
                    
                    let returnArr = [];
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        returnArr.push(item);
                    });

                    returnArr.sort((a, b) => {
                        var key1 = a.timestamp;
                        var key2 = b.timestamp;

                        if (key1 > key2) {
                            return -1;
                        } else if (key1 == key2) {
                            return 0;
                        } else {
                            return 1;
                        }
                    })

                    commit('setNotificaciones', returnArr)
                })
            }
        }
    },
    getters: {
        getNotificaciones (state) {
            return state.notificaciones
        },
        getNotificacionesMensajes (state) {
            return state.mensajes
        },
    }
})
