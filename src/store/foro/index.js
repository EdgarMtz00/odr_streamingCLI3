
import axios from 'axios'
import * as firebase from 'firebase'
import { stat } from 'fs';

export default ({
    state: {
        sagasForo: [],
        categoriasForo: [],
        topicsCategoria: [],
        postsTopic: [],
        sagaElegida: "",
        categoriaElegida: "",
        topicElegido: "",
        postElegido: {
            contenido: '',
            nickname: '',
            fecha: '',
            status: false
        },
        threadElegido: {}
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
        setPostsTopic (state, payload) {
            state.postsTopic = payload
        },
        setPostElegido (state, payload){
            console.log("Lo de postElegido ", payload)
            state.postElegido.contenido = payload.content
            state.postElegido.nickname = payload.nickname
            state.postElegido.fecha = payload.date
            state.postElegido.status = payload.status
        },
        guardarIdSaga (state, payload) {
            state.sagaElegida = payload
        },
        guardarIdCategoria (state, payload) {
            state.categoriaElegida = payload
        },
        guardarIdThread (state, payload) {
            console.log("El id del thread: ", payload)
            state.topicElegido = payload
        },
        guardarThread (state, payload) {
            state.threadElegido = payload
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
                            contenidoThread: elementTopics.ContenidoThread,
                            fecha: elementTopics.FechaDeCreacion,
                            url: elementTopics.IdThread,
                            nickname: elementTopics.Nickname,
                            type: 'Topic'
                        })       
                    });
                }
                console.log("Lo que se va al commit de topics: ", topics)
                commit('setTopicsCategoria', topics)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getTopics", error)
            })
        },
        loadPosts ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post("http://localhost/Odr/connections/forum/getPosts.php").then(function (response) {
                console.log("Los posts son: ", response.data)
                let data = response.data
                let posts = []
                posts.push({header: 'Posts'})
                if (Array.isArray(data.posts)) {
                    data.posts.forEach(elementPosts => {
                        posts.push({
                            idPost: elementPosts.IdPost,
                            contenidoPost: elementPosts.ContenidoPost,
                            fecha: elementPosts.FechaDeCreacion,
                            idThread: elementPosts.IdThread,
                            nickname: elementPosts.Nickname,
                            type: 'Post'
                        })       
                    });
                }
                console.log("Lo que se va al commit de posts: ", posts)
                commit('setPostsTopic', posts)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /forum/getPosts", error)
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
        getPostsTopic (state) {
            return state.postsTopic
        },
        getSagaElegida (state) {
            return state.sagaElegida
        },
        getCategoriaElegida (state) {
            return state.categoriaElegida
        },
        getTopicElegido (state) {
            return state.topicElegido
        },
        getPostElegido (state) {
            return state.postElegido
        },
        getThread (state){
            return state.threadElegido
        }
    }
})