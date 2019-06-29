import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        estados: []
    },
    mutations: {
        setEstados (state, payload) {
            state.estados = payload
            // Nel no funciono, state solo funciona en el modulo, no en todo el store, rootState es el state de todo el store pero no devuelve referencias
            // // Accedemos al state del store amigos
            // state.amigos.forEach(amigo => {
            //     // Iterar los amigos encontrados y asignarle un atributo de estado a cada uno
            //     let aux = payload.find(auxFind => {
            //         return amigo.IdAmigo == auxFind.idUsuario
            //     })
            //     alert('Ward')
            //     if (aux) {
            //         amigo.estado = aux.estado
            //         alert('Estado!')
            //     }
            // });
        }
    },
    actions: {
        loadEstados ({commit, getters}) {
            let amigos = getters.getAmigos
            let idUsuario = getters.getUserData.id
            // Se trae todos los estados
            firebase.database().ref('estados').on('value',(snapshot) => {
                let returnArr = []; // Este array tiene todos los estados e ids de los amigos
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    // Si el id del usuario coincide con alguno de los amigos del usuario logeado
                    let aux = amigos.find(auxFind => {
                        return (item.idUsuario == auxFind.IdAmigo || item.idUsuario == idUsuario)
                    })
                    if (aux)
                        returnArr.push(item);
                });
                commit('setEstados', returnArr)
                console.log("Estados", returnArr)
            })
        },
        actualizarEstado ({commit, getters}, payload) {
            firebase.database().ref('estados/' + payload.key).child('estado').set(payload.newEstado).then(res => {
            })
        },
        crearEstado ({commit, getters}, payload) {
            firebase.database().ref('estados/').once('value').then(snapshot => {
                console.log("Estados cantidad", snapshot.val().length)
            })
        },
    },
    getters: {
        getEstados (state) {
            return state.estados
        }
    }
})
