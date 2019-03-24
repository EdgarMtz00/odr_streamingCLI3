import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        sagasBuscador: [],
        holdersBuscador: [],
        personajesBuscador: [],
        usuariosBuscador: [],
    },
    mutations: {
        setBuscadorSagas (state, payload) {
            state.sagasBuscador = payload
        },
        setBuscadorHolders (state, payload) {
            state.holdersBuscador = payload
        },
        setBuscadorPersonajes (state, payload) {
            state.personajesBuscador = payload
        },
        setBuscadorUsuarios (state, payload) {
            state.usuariosBuscador = payload
        }
    },
    actions: {
        loadBuscadorData ({commit, getters, dispatch}) {
            let urlBase = getters.urlBase
            let user = getters.getUserData

            axios.post(urlBase + 'connections/streamingContent/buscador/getAll.php').then(response => {
                console.log("response buscador",response.data)
                let data = response.data
                let sagas = []
                let holders = []
                let personajes = []
                let usuarios = []
                // Añadiendo sagas
                sagas.push({header: 'Sagas'})
                if (Array.isArray(data.sagas)) {
                    data.sagas.forEach(elementSagas => {
                        sagas.push({
                            thumbnail: urlBase + '/resources/' + elementSagas.ThumbnailSaga,
                            titulo: elementSagas.TituloSaga,
                            url: elementSagas.URLSaga,
                            type: 'Saga',
                        })       
                    });
                }
                // Añadiendo holders
                holders.push({header: 'Holders'})
                if (Array.isArray(data.holders)) {
                    data.holders.forEach(elementHolders => {
                        holders.push({
                            thumbnail: urlBase + elementHolders.NombreCategoria + '/' + elementHolders.URLHolder + '/' + 'thumbnail.jpg',
                            titulo: elementHolders.TituloHolder,
                            url: elementHolders.URLSaga + '/' + elementHolders.URLHolder,
                            type: elementHolders.NombreCategoria,
                        })       
                    });
                }
                // Añadiendo personajes
                personajes.push({header: 'Personajes'})
                if (Array.isArray(data.personajes)) {
                    data.personajes.forEach(elementPersonajes => {
                        personajes.push({
                            thumbnail: urlBase + 'Characters/' + elementPersonajes.URLPersonaje + '/' + 'profile.jpg',
                            titulo: elementPersonajes.NombrePersonaje,
                            url: elementPersonajes.URLPersonaje,
                            type: 'Character',
                        })       
                    });
                }
                // Añadiendo usuarios
                usuarios.push({header: 'Usuarios'})
                if (Array.isArray(data.usuarios)) {
                    data.usuarios.forEach(elementUsuarios => {
                        
                        usuarios.push({
                            thumbnail: urlBase + 'Profiles/' + elementUsuarios.IdUsuario + '/' + 'profile.jpg',
                            titulo: elementUsuarios.nickname,
                            url: '/profileView/' + elementUsuarios.IdUsuario,
                            type: 'User',
                        })       
                    });
                }

                console.log("Buscador data", sagas, holders, personajes, usuarios)
                commit('setBuscadorSagas', sagas)
                commit('setBuscadorHolders', holders)
                commit('setBuscadorPersonajes', personajes)
                commit('setBuscadorUsuarios', usuarios)
            }).catch(error => {

            })
        }
    },
    getters: {
        getBuscadorSagas (state) {
            return state.sagasBuscador
        },
        getBuscadorHolders (state) {
            return state.holdersBuscador
        },
        getBuscadorPersonajes (state) {
            return state.personajesBuscador
        },
        getBuscadorUsuarios (state) {
            return state.usuariosBuscador
        }
    }
})
