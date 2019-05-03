import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        holdersSuscrito: [],
        sagasSuscrito: [],
        personajesSuscrito: [],
    },
    mutations: {
        setHoldersSuscrito (state, payload) {
            state.holdersSuscrito = payload
        },
        setPersonajesSuscrito (state, payload) {
            state.personajesSuscrito = payload
        },
        setSagasSuscrito (state, payload) {
            state.sagasSuscrito = payload
        },
        // Para cuando el usuario salga de la sesion
        clearSubsData (state) {
            state.holdersSuscrito = []
            state.sagasSuscrito = []
            state.personajesSuscrito = []
        }
    },
    actions: {
        // ------------------------------------ Holders --------------------------------- >
        loadHoldersSubs ({commit, getters}) {
            let user = getters.getUserData
            if (!user){
                return
            }

            firebase.database().ref('suscripciones/contenido/holders').orderByChild("idUsuario").equalTo(user.id)
            .on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log("Suscripciones holders", returnArr)
                commit('setHoldersSuscrito', returnArr)
            })
        },
        quitarHolderSubs ({commit, getters}, holder) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/holders/' + holder.key).remove().then(res => {
                alert("Suscripcion anulada")
            })
        },
        suscribirHolder ({commit, getters}, idHolder) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/holders/').push({
                idHolder: idHolder,
                idUsuario: user.id
            })
        },
        // ------------------------------------ Personajes --------------------------------- >
        loadPersonajesSubs ({commit, getters}) {
            let user = getters.getUserData
            if (!user){
                return
            }

            firebase.database().ref('suscripciones/contenido/personajes').orderByChild("idUsuario").equalTo(user.id)
            .on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log("Suscripciones personajes", returnArr)
                commit('setPersonajesSuscrito', returnArr)
            })
        },
        quitarPersonajeSubs ({commit, getters}, personaje) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/personajes/' + personaje.key).remove().then(res => {
                alert("Suscripcion anulada")
            })
        },
        suscribirPersonaje ({commit, getters}, idPersonaje) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/personajes/').push({
                idPersonaje: idPersonaje,
                idUsuario: user.id
            })
        },
        // ------------------------------------ Sagas --------------------------------- >
        loadSagasSubs ({commit, getters}) {
            let user = getters.getUserData
            if (!user){
                return
            }

            firebase.database().ref('suscripciones/contenido/sagas').orderByChild("idUsuario").equalTo(user.id)
            .on("value", (snapshot) => {
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                console.log("Suscripciones sagas", returnArr)
                commit('setSagasSuscrito', returnArr)
            })
        },
        quitarSagaSubs ({commit, getters}, saga) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/sagas/' + saga.key).remove().then(res => {
                alert("Suscripcion anulada")
            })
        },
        suscribirSaga ({commit, getters}, idSaga) {
            let user = getters.getUserData
            if (!user){
                return
            }
            firebase.database().ref('suscripciones/contenido/sagas/').push({
                idSaga: idSaga,
                idUsuario: user.id
            })
        }
    },
    getters: {
        getHoldersSuscrito (state) {
            return state.holdersSuscrito
        },
        getPersonajessSuscrito (state) {
            return state.personajesSuscrito
        },
        getSagassSuscrito (state) {
            return state.sagasSuscrito
        }
    }
})
