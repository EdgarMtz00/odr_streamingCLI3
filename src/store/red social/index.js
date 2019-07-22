
import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        sagasRed: [],
        redes: [],
        idSaga: "",
        idHub: "",
        imagenes: [],
        idImage: "",
        personajesRed: [],
        idPersonajeElegido: ""
    },
    mutations: {
        setSagasRed (state, payload) {
            state.sagasRed = payload
        },
        setRedes (state, payload) {
            state.redes = payload
            console.log("Lo del setRedes ", state.redes)
        },
        setImagenes (state, imagen) {
            state.imagenes = imagen
        },
        setPersonajesRed (state, payload) {
            state.personajesRed = payload
        },
        guardarIdSaga (state, payload) {
            state.idSaga = payload
        },
        guardarIdPersonaje (state, payload) {
            state.idPersonajeElegido = payload
        },
        guardarIdHub (state, payload) {
            state.idHub = payload
        },
        guardarIdImage (state, payload) {
            state.idImage = payload
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
                            idUsuario: elementHubs.IdUsuario,
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
        loadImages ({commit, getters, state}) {
            let urlBase = getters.urlBase

            fetch(urlBase + 'connections/socialNetwork/getImages.php')
            .then(res => res.json())
            .then(data => {
                console.log("El fetch", data)
                if (data.status.includes('OK')) {
                    let newImagenes = []
                    data.imagenes.forEach(imagen => {
                    // Generar la url de las imagenes
                    /*La base almacena la cantidad de imagenes que tiene un objeto por lo que
                    en la carpeta idHub/idPost/ hay n imagenes asi que se obtiene
                    la url de la siguiente forma: */
                    // Auxiliar para guardar las url generadas
                    let auxUrls = []
                    for(let i = 1; i <= imagen.NumeroElemento; i++) {
                        auxUrls.push({
                            src: urlBase + 'Hub/' + state.idHub + '/' + imagen.URLImagen + '/' + i + '.jpg'
                        })
                    }

                    let aux = {
                        id: imagen.IdImagen,
                        titulo: imagen.PieImagen,
                        fecha: imagen.FechaDeCreacion,
                        imagenes: auxUrls,
                        idUsuario: imagen.IdUsuario,
                        nickname: imagen.Nickname,
                        idHub: imagen.IdHub,
                        thumbnail: urlBase + 'Hub/' + state.idHub + '/' + imagen.URLImagen + '/' + 'thumbnail.jpg',
                        url: imagen.URLImagen
                    }
                    newImagenes.push(aux)
                    });
                console.log("Imagenes", newImagenes)
                commit('setImagenes', newImagenes)
                }
            });
        },
        loadPersonajes ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post(urlBase + "connections/socialNetwork/getPersonajes.php").then(function (response) {
                console.log("Las sagas son: ", response.data)
                let data = response.data
                let personajes = []
                personajes.push({header: 'Personajes'})
                if (Array.isArray(data.personajes)) {
                    data.personajes.forEach(elementPersonajes => {
                        personajes.push({
                            id: elementPersonajes.IdPersonaje,
                            nombre: elementPersonajes.NombrePersonaje,
                            thumbnail: urlBase + 'Characters/' + elementPersonajes.URLPersonaje + '/' + 'profile.jpg',
                            type: 'Personaje',
                        })
                    });
                }
                console.log("Lo que se va al commit de personajes: ", personajes)
                commit('setPersonajesRed', personajes)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /socialNetwork/getPersonajes", error)
            })
        },
        clear ({commit}) {
            let arrVacio = []
            let strVacio = ""
            commit('setRedes', arrVacio)
            commit('setImagenes', arrVacio)
            commit('guardarIdPersonaje', strVacio)
            commit('guardarIdHub', strVacio)
            commit('guardarIdImage', strVacio)
            commit('guardarIdSaga', strVacio)
        },
        reportarImagen ({commit, getters, dispatch}, imagenReportada) {
            let urlBase = getters.urlBase
            let usuario = getters.getUserData

            let formData = new FormData()
            formData.set('idUsuarioDelReporte', usuario.id)
            formData.set('idUsuarioDelComentario', imagenReportada.content.idUsuario)
            formData.set('idComentario', imagenReportada.content.id)
            formData.set('comentarioReportado', 'Desc: ' + imagenReportada.content.titulo + ' Img: ' + imagenReportada.content.thumbnail)
            formData.set('textoDelReporte', imagenReportada.report)
            formData.set('urlComentario', 'N/A')
            formData.set('tipoReporte', 'Img')

            axios.post(urlBase + "connections/comments/sendReport.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
                dispatch('crearNotificacionReporte', 'imagen')
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        },
        reportarHub ({commit, getters, dispatch}, hubReportado) {
            let urlBase = getters.urlBase
            let usuario = getters.getUserData

            let formData = new FormData()
            formData.set('idUsuarioDelReporte', usuario.id)
            formData.set('idUsuarioDelComentario', hubReportado.content.idUsuario)
            formData.set('idComentario', hubReportado.content.url)
            formData.set('comentarioReportado', hubReportado.content.titulo)
            formData.set('textoDelReporte', hubReportado.report)
            formData.set('urlComentario', 'N/A')
            formData.set('tipoReporte', 'Hub')

            axios.post(urlBase + "connections/comments/sendReport.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
                dispatch('crearNotificacionReporte', 'hub')
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        }
    },
    getters: {
        getSagasRed (state) {
            return state.sagasRed
        },
        getPersonajesRed (state) {
            return state.personajesRed
        },
        getRedes (state) {
            return state.redes
        },
        getIdSaga (state) {
            return state.idSaga
        },
        getIdPersonaje (state) {
            return state.idPersonajeElegido
        },
        getIdHub (state) {
            return state.idHub
        },
        getImagenes (state) {
            return state.imagenes
        },
        getIdImage (state) {
            return state.idImage
        }
    }
})