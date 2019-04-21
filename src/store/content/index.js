import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        sagas: [],
        saga: {},
        categorys: [],
        tags: [],
    },
    mutations: {
        setSagaData (state, payload) {
            state.saga = {...payload}
            console.log("state.saga", state.saga)
        },
        setSagas (state, payload) {
            payload.forEach(element => {
                state.sagas.push(element)
            });
        },
        setCategorys (state, payload) {
            payload.forEach(element => {
                state.categorys.push(element)
            });
        },
        setTags (state, payload) {
            state.tags = payload
        },
        clearSagas (state) {
            state.sagas = []
        },
    },
    actions: {
        loadSagasInfo ({commit, getters}) {
            let urlBase = getters.urlBase
            commit('clearSagas')
            // axios.post(urlBase + "connections/streamingContent/getSaga.php").then(response => {
            //     commit('setSagas', response.data)
            // })

            fetch(urlBase + "connections/streamingContent/getSaga.php")
            .then(res => res.json())
            .then(data => {
                commit('setSagas', data)
            });
        },
        loadCategorys ({commit, getters}) {
            let urlBase = getters.urlBase
            // axios.post(urlBase + "connections/streamingContent/getCategorys.php").then(response => {
            //     commit('setCategorys', response.data)
            // })

            fetch(urlBase + "connections/streamingContent/getCategorys.php")
            .then(res => res.json())
            .then(data => {
                commit('setCategorys', data)
            });
        },
        loadSagaData ({commit, getters, dispatch}, urlSaga) {
            commit('clearSagas')
            let bodyFormData = new FormData()
            let urlBase = getters.urlBase
            let saga = {
                urlSaga: urlSaga,
                name: '',
                photoInfo: {},
                categorys: [],
                content: []
            }
            bodyFormData.set('urlSaga', urlSaga)
            axios.post(urlBase + 'connections/streamingContent/getSagaContent.php', bodyFormData).then(response => {
                console.log('Sagas response', response)
                let data = response.data
                // La base de datos guarda la url de las imagenes com http://locahost y ps hay que corregir
                saga.name = data.TituloSaga
                saga.idSaga = data.IdSaga
                // console.log('Ps hay que cambiarle ptm', data)
                saga.photoInfo = {
                    thumbnail: urlBase + 'resources/' + data.ThumbnailSaga,
                    background: urlBase + 'resources/' + data.BackgroundSaga,
                }

                //Obtener categorias
                let categs = []
                if (Array.isArray(data.categorias)) {
                    data.categorias.forEach(elementCategs => {
                        categs.push(elementCategs.NombreCategoria)
                    });
                }
                saga.categorys = categs
                // console.log("categs", categs)

                if (Array.isArray(data.holders)) {
                    data.holders.forEach(element => {
                        let rutaBase = urlBase;
                        let rutaThumbnail = '';
                        rutaThumbnail = rutaBase + element.NombreCategoria + '/' + element.URLHolder + '/thumbnail.jpg'
                        //obtener tags
                        let tagsT = []
                        if (Array.isArray(element.tags)) {
                            element.tags.forEach(elementTag => {
                                tagsT.push(elementTag.NombreTag)
                            });
                        }
                        //Obtener scans
                        let contenidos = []
                        let contContenidos = 0
                        
                        if (Array.isArray(element.contenidos)) {
                            element.contenidos.forEach(elementContenidos => {
                                elementContenidos.thumbnail = rutaBase + element.NombreCategoria + "/" + 
                                    element.URLHolder + "/" + elementContenidos.URLContenido + "/thumbnail.jpg"
                                contenidos.push(elementContenidos)
                            });
                        }

                        // Obtener personajes
                        let personajes = []
                        if (Array.isArray(element.personajes)) {
                            element.personajes.forEach(elementPersonajes => {
                                elementPersonajes.thumbnail = rutaBase + "/Characters/" + elementPersonajes.urlpersonaje + "/profile.jpg"
                                personajes.push(elementPersonajes)
                            });
                        }

                        // Incluir todo los elementos sacados anteriormente
                        saga.content.push({
                            IdHolder: element.IdHolder,
                            name: element.TituloHolder,
                            Descripcion: element.DescripcionHolder,
                            content: contenidos,
                            thumbnail: rutaThumbnail,
                            type: element.NombreCategoria,
                            url: element.URLHolder,
                            Tags: tagsT,
                            Personajes: personajes
                        })
                    });
                }

                console.log("Final saga:", saga)
                commit('setSagaData', saga)
                // Cargar los holders a las que el usuario este suscrito
            })
        },
        loadTags ({commit, getters}) {
            let urlBase = getters.urlBase
            axios.post(urlBase + 'connections/streamingContent/creating/getAllTags.php').then(response => {
                let data = response.data
                let tags = []
                data.forEach(element => {
                    tags.push(element)
                });
                commit('setTags', tags)
            }).catch(error => {
                console.log(error)
            })
        },
    },
    getters: {
        getSagaData (state) {
            return state.saga
        },
        getSagas (state) {
            return state.sagas
        },
        getCategorys (state) {
            return state.categorys
        },
        getTags (state) {
            return state.tags
        },
    }
})
