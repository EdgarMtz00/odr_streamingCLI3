
import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        sagasForo: [],
        categoriasForo: [],
        topicsCategoria: [],
        sagaElegida: "",
        categoriaElegida: ""
    },
    mutations: {
        setSagasForo (state, payload) {
            state.sagasForo = payload
        },
        setCategoriasForo (state, payload) {
            state.categoriasForo = payload
        },
        setTopicsCategoria (state, payload) {
            state.topicsCategoria = payload
        },
        guardarIdSaga (state, payload) {
            console.log("El id de la saga: ", payload)
            state.sagaElegida = payload
        },
        guardarIdCategoria (state, payload) {
            console.log("El id de la categoria: ", payload)
            state.categoriaElegida = payload
        }
    },
    actions: {
        loadSagas ({commit, getters}){
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
                commit('setSagasForo', sagas)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getSagas", error)
            })
        },
        loadCategories ({commit, getters}){
            let urlBase = getters.urlBase

            axios.post("http://localhost/Odr/connections/forum/getCategories.php").then(function (response) {
                console.log("Las categorias son: ", response.data)
                let data = response.data
                let categorias = []
                categorias.push({header: 'Categorias'})
                if (Array.isArray(data.categorias)) {
                    data.categorias.forEach(elementCategorias => {
                        categorias.push({
                            id: elementCategorias.IdCategoriaForo,
                            nombre: elementCategorias.NombreCategoria,
                            descripcion: elementCategorias.Descripcion,
                            url: elementCategorias.URLCategoria,
                            type: 'Categoria',
                        })       
                    });
                }
                console.log("Lo que se va al commit de categorias: ", categorias)
                commit('setCategoriasForo', categorias)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getCategories", error)
            })
        },
        loadTopics ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post("http://localhost/Odr/connections/forum/getTopics.php").then(function (response) {
                console.log("Los topics son: ", response.data)
                let data = response.data
                let topics = []
                topics.push({header: 'Topics'})
                if (Array.isArray(data.topics)) {
                    data.topics.forEach(elementTopics => {
                        topics.push({
                            idSaga: elementTopics.IdSaga,
                            idCategoriaForo: elementTopics.IdCategoriaForo,
                            titulo: elementTopics.TituloThread,
                            fecha: elementTopics.FechaDeCreacion,
                            url: elementTopics.IdThread,
                            type: 'Topic',
                        })       
                    });
                }
                console.log("Lo que se va al commit de topics: ", topics)
                commit('setTopicsCategoria', topics)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getTopics", error)
            })
        },
    },
    getters: {
        getSagasForo (state) {
            return state.sagasForo
        },
        getCategoriasForo (state) {
            return state.categoriasForo
        },
        getTopicsCategoria (state) {
            return state.topicsCategoria
        },
        getSagaElegida (state) {
            return state.sagaElegida
        },
        getCategoriaElegida (state) {
            return state.categoriaElegida
        }
    }
})