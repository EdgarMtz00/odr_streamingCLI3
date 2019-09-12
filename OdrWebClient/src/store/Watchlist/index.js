import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        watchlist: []
    },
    mutations: {
        // ------------------------------ WATCHLIST --------------------------- //
        setWatchlist (state, payload) {
            state.watchlist = payload
        },
        cambiarOrdenMenos (state, payload) {
            if (payload.orden > 0) {
                console.log("Cambiar orden WARD", payload)
                // Para cambiar el orden del elemento actual, se le resta uno
                firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.key).
                child('orden').set(payload.orden-1)
                // Y al anterior se le deja el que se tenia
                firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.keyAnterior).
                child('orden').set(payload.orden)
            }
        },
        cambiarOrdenMas (state, payload) {
            console.log("Cambiar orden WARD", payload)
            // Para cambiar el orden del elemento actual, se le suma uno
            firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.key).
            child('orden').set(payload.orden+1)
            // Y al anterior se le asigna el que ya se tenia
            firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.keySiguiente).
            child('orden').set(payload.orden)
        },
        eliminarDelWatchlist (state, payload) {
            firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.key).remove().then(res => {
                // Iterar todas las keys que posteriores segun el orden
                payload.keysSiguientes.forEach(element => {
                    firebase.database().ref('watchlists/' + payload.idUsuario + '/' + element.key).child('orden').set(element.orden-1)
                });
            })
        }
    },
    actions: {
        // ------------------------------ WATCHLIST --------------------------- //
        loadWatchlist ({commit, getters}, idUsuario) {
            firebase.database().ref('watchlists/' + idUsuario).on('value', (snapshot) => {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                commit('setWatchlist', returnArr)
            })
        },
        addToWatchlist ({commit, getters}, payload) {
            let urlBase = getters.urlBase
            let auxOrden = 0
            let auxElement = {
                idHolder: payload.IdHolder,
                urlHolder: (payload.urlSaga + '/' + payload.url),
                urlImagen: payload.thumbnail,
                titulo: payload.name,
                categoria: payload.type,
            }
            // Esta primera llamada a firebase es para obtener el tamaño del nodo err la cantidad 
            // De elementos en esa watchlist para asignar el orden del nuevo elemento que es +1
            firebase.database().ref('watchlists/' + payload.idUsuario).once('value', (snapshot) => {
                auxOrden = snapshot.numChildren()
                // Una vez consigo el orden del nuevo elemento ps se ingresa xd
                firebase.database().ref('watchlists/' + payload.idUsuario).push(auxElement).then(res => {
                    // Hasta despues de creado el elemento se pone el orden
                    firebase.database().ref('watchlists/' + payload.idUsuario + '/' + res.key).child('orden').set(auxOrden)
                })
            })
            // Al inicio iba a usar php y la base pero me arrepenti xd
            // axios.post(urlBase + 'connections/streamingContent/content/addToWatchlist.php').then(response => {
            //     let data = response.data
            //     if (data.status.includes('OK')) {
            //         // Commit quitar
                    
            //     } else {
            //         alert('No se pudo actualizar la lista')
            //     }
            // }).catch(error => {
            //     console.log(error)
            // })
        },
        removeToWatchlist ({commit}, payload) {
            console.log("payload", payload)
            firebase.database().ref('watchlists/' + payload.idUsuario + '/' + payload.key).remove().then(res => {
            })
        }
    },
    getters: {
        getWatchlist (state) {
            return state.watchlist
        }
    }
})
