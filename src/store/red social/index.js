
import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        sagasRed: [],
        redes: [],
        idSaga: "",
        idHub: "",
    },
    mutations: {
        setSagasRed (state, payload) {
            state.sagasRed = payload
        },
        setRedes (state, payload) {
            state.redes = payload
        },
        guardarIdSaga (state, payload) {
            state.idSaga = payload
        },
        guardarIdHub (state, payload) {
            state.idHub = payload
        }
    },
    actions: {
        loadSagas ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post("http://localhost/Odr/connections/forum/getSagas.php").then(function (response) {
                console.log("Las sagas son: ", response.data)
                let data = response.data
                let sagas = []
                sagas.push({header: 'Sagas'})
                if (Array.isArray(data.sagas)) {
                    data.sagas.forEach(elementSagas => {
                        sagas.push({
                            id: elementSagas.IdSaga,
                            thumbnail: urlBase + '/resources/' + elementSagas.ThumbnailSaga,
                            titulo: elementSagas.TituloSaga,
                            url: elementSagas.URLSaga,
                            type: 'Saga',
                        })
                    });
                }
                console.log("Lo que se va al commit de sagas: ", sagas)
                commit('setSagasRed', sagas)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getSagas", error)
            })
        },
        loadRedes ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post("http://localhost/Odr/connections/socialNetwork/getHubs.php").then(function (response) {
                console.log("Los Hubs son: ", response.data)
                let data = response.data
                let hubs = []
                hubs.push({header: 'Hubs'})
                if (Array.isArray(data.hubs)) {
                    data.hubs.forEach(elementHubs => {
                        hubs.push({
                            url: elementHubs.IdHub,
                            titulo: elementHubs.TituloHub,
                            idSaga: elementHubs.IdSaga,
                            idPersonaje: elementHubs.IdPersonaje,
                            creador: elementHubs.Nickname,
                            type: 'Hub',
                        })
                    });
                }
                console.log("Lo que se va al commit de Hubs: ", hubs)
                commit('setRedes', hubs)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /socialNetwork/getHubs", error)
            })
        },
        loadProductos ({commit, getters}) {
            let urlBase = getters.urlBase

            let bodyFormData = new FormData()
            bodyFormData.set('idHub', idHub)
            axios.post(urlBase + '/connections/socialNetwork/')
        }
    },
    getters: {
        getSagasRed (state) {
            return state.sagasRed
        },
        getRedes (state) {
            return state.redes
        },
        getIdSaga (state) {
            return state.idSaga
        },
        getIdHub (state) {
            return state.idHub
        }
    }
})