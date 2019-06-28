import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        comentarios: [
            {
                idUsuario: '',
                idComentario: '50',
                nickname: 'H3lltronik',
                comentario: 'No me gusto la parte en la que THE GAME',
                urlImagen: "https://homuapp.000webhostapp.com/Imagenes/24-11-2018-14-54-14.jpg",
            }
        ]
    },
    mutations: {
        setComentarios (state, payload) {
            state.comentarios = payload
        }
    },
    actions: {
        loadComentarios ({commit}, ruta) {
            console.log("Cargando comentarios ruta: ", ruta)
            // Firebase no me dejaba usar '/' en las ids de los nodos asi que use '***'
            // Las ids son las urls, cada url tiene los comentarios de ese contenido
            // Se puede poner cualquier url y al acceder a ella cargara sus comentarios
            let codedUrl = ruta.split('/').join('***')
            firebase.database().ref("comentarios/" + codedUrl).on("value", snapshot => {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                commit('setComentarios', returnArr)
                console.log("Comentarios: ", returnArr)
            })
        },
        comentar ({commit}, payload) {
            let codedUrl = payload.url.split('/').join('***')
            firebase.database().ref("comentarios/" + codedUrl).push(payload.comentario).then(res => {
                firebase.database().ref('comentarios/' + codedUrl + "/" + res.key)
                .child('idComentario').set(res.key)
            })
        },
        eliminarComentario ({commit}, payload) {
            let codedUrl = payload.url.split('/').join('***')
            let key = payload.comentario.key
            console.log("El comentario", payload)
            firebase.database().ref('comentarios/' + codedUrl + '/' + key).remove()
        }
    },
    getters: {
        getComentarios (state) {
            return state.comentarios.reverse()
        }
    }
})
