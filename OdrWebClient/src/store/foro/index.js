
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
        threadElegido: {},
        postProcesado: ''
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
        },
        setNuevoPost (state, nuevoPost) {
            state.postProcesado = nuevoPost
        },
        setCitaTextual (state, citaTextual) {
            state.postProcesado = citaTextual
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
                            thumbnail: urlBase + 'resources/' + elementSagas.ThumbnailSaga,
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
                            idUsuario: elementTopics.IdUsuario,
                            nickname: elementTopics.Nickname,
                            report: false,
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
                            idUsuario: elementPosts.IdUsuario,
                            nickname: elementPosts.Nickname,
                            report: false,
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
        formatoAlTexto ({commit}, newPost) {
            let etiqueta = "";
            let negrita = 0, italica = 0, underline = 0, strike = 0, broke = 0, lista = 0, elemento = 0, posicion = 0, tamaño = 0;

            for (let i = 0; i <= newPost.length; i++) {
                if (newPost.search(/\*/i) != -1) {
                    etiqueta = 'B'
                } else if (newPost.search(/\_/i) != -1) {
                    etiqueta = 'I'
                } else if (newPost.search(/\$/i) != -1) {
                    etiqueta = 'U'
                } else if (newPost.search(/\~/i) != -1) {
                    etiqueta = 'S'
                } else if (newPost.search(/\#/i) != -1) {
                    etiqueta = 'Br'
                } else if (newPost.search(/\|/i) != -1) {
                    etiqueta = 'L'
                } else if (newPost.search(/\°/i) != -1) {
                    etiqueta = 'E'
                } else if (newPost.search(/"ctr"/i) != -1) {
                    etiqueta = 'Center'
                } else if (newPost.search(/"lft"/i) != -1) {
                    etiqueta = 'Left'
                } else if (newPost.search(/"rgt"/i) != -1) {
                    etiqueta = 'Right'
                } else if (newPost.search(/"jtf"/i) != -1) {
                    etiqueta = 'Justify'
                } else if (newPost.search(/"a3"/i) != -1) {
                    etiqueta = 'A3'
                } else if (newPost.search(/"a6"/i) != -1) {
                    etiqueta = 'A6'
                } else if (newPost.search(/"t3"/i) != -1) {
                    etiqueta = 'T3'
                } else if (newPost.search(/"t6"/i) != -1) {
                    etiqueta = 'T6'
                } else {
                    etiqueta = ''
                }
                switch (etiqueta) {
                    case 'B':
                        if (negrita == 1) {
                            newPost = newPost.replace(/\*/i, "</b>")
                            negrita = 0
                        } else if (negrita == 0) {
                            newPost = newPost.replace(/\*/i, "<b>")
                            negrita = 1
                        }
                        break;
                    case 'I':
                        if (italica == 1) {
                            newPost = newPost.replace(/\_/i, "</i>")
                            italica = 0
                        } else if (italica == 0) {
                            newPost = newPost.replace(/\_/i, "<i>")
                            italica = 1
                        }
                        break;
                    case 'U':
                        if (underline == 1) {
                            newPost = newPost.replace(/\$/i, "</u>")
                            underline = 0
                        } else if (underline == 0) {
                            newPost = newPost.replace(/\$/i, "<u>")
                            underline = 1
                        }
                        break;
                    case 'S':
                        if (strike == 1) {
                            newPost = newPost.replace(/\~/i, "</strike>")
                            strike = 0
                        } else if (strike == 0) {
                            newPost = newPost.replace(/\~/i, "<strike>")
                            strike = 1
                        }
                        break;
                    case 'Br':
                        if (broke == 1) {
                            newPost = newPost.replace(/\#/i, "</br>")
                            broke = 0
                        } else if (broke == 0) {
                            newPost = newPost.replace(/\#/i, "<br>")
                            broke = 1
                        }
                        break;
                    case 'L':
                        if (lista == 1) {
                            newPost = newPost.replace(/\|/i, "</ul>")
                            lista = 0
                        } else if (lista == 0) {
                            newPost = newPost.replace(/\|/i, "<ul>")
                            lista = 1
                        }
                        break;
                    case 'E':
                        if (elemento == 1) {
                            newPost = newPost.replace(/\°/i, "</li>")
                            elemento = 0
                        } else if (elemento == 0) {
                            newPost = newPost.replace(/\°/i, "<li>")
                            elemento = 1
                        }
                        break;
                    case 'Center':
                        if (posicion == 1) {
                            newPost = newPost.replace(/"ctr"/i, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            newPost = newPost.replace(/"ctr"/i, '<p align="center">')
                            posicion = 1
                        }
                        break;
                    case 'Left':
                        if (posicion == 1) {
                            newPost = newPost.replace(/"lft"/i, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            newPost = newPost.replace(/"lft"/i, '<p align="left">')
                            posicion = 1
                        }
                        break;
                    case 'Right':
                        if (posicion == 1) {
                            newPost = newPost.replace(/"rgt"/i, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            newPost = newPost.replace(/"rgt"/i, '<p align="right">')
                            posicion = 1
                        }
                        break;
                    case 'Justify':
                        if (posicion == 1) {
                            newPost = newPost.replace(/"jtf"/i, "</p>")
                            posicion = 0
                        } else if (posicion == 0) {
                            newPost = newPost.replace(/"jtf"/i, '<p align="justify">')
                            posicion = 1
                        }
                        break;
                    case 'A3':
                        if (tamaño == 1) {
                            newPost = newPost.replace(/"a3"/i, "</font>")
                            tamaño = 0
                        } else if (tamaño == 0) {
                            newPost = newPost.replace(/"a3"/i, '<font size="3" face="Arial">')
                            tamaño = 1
                        }
                        break;
                    case 'A6':
                        if (tamaño == 1) {
                            newPost = newPost.replace(/"a6"/i, "</font>")
                            tamaño = 0
                        } else if (tamaño == 0) {
                            newPost = newPost.replace(/"a6"/i, '<font size="6" face="Arial">')
                            tamaño = 1
                        }
                        break;
                    case 'T3':
                        if (tamaño == 1) {
                            newPost = newPost.replace(/"t3"/i, "</font>")
                            tamaño = 0
                        } else if (tamaño == 0) {
                            newPost = newPost.replace(/"t3"/i, '<font size="3" face="Times New Roman">')
                            tamaño = 1
                        }
                        break;
                    case 'T6':
                        if (tamaño == 1) {
                            newPost = newPost.replace(/"t6"/i, "</font>")
                            tamaño = 0
                        } else if (tamaño == 0) {
                            newPost = newPost.replace(/"t6"/i, '<font size="6" face="Times New Roman">')
                            tamaño = 1
                        }
                        break;
                    case '':
                        break;
                }
            }
            commit('setNuevoPost', newPost)
        },
        reportarPost ({commit, getters}, postReportado) {
            let urlBase = getters.urlBase
            let usuario = getters.getUserData

            let formData = new FormData()
            formData.set('idUsuarioDelReporte', usuario.id)
            formData.set('idUsuarioDelComentario', postReportado.content.idUsuario)
            formData.set('idComentario', postReportado.content.idPost)
            formData.set('comentarioReportado', postReportado.content.contenidoPost)
            formData.set('textoDelReporte', postReportado.report)
            formData.set('urlComentario', 'N/A')
            formData.set('tipoReporte', 'Post')

            axios.post(urlBase + "connections/comments/sendReport.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        },
        reportarTopic ({commit, getters}, topicReportado) {
            let urlBase = getters.urlBase
            let usuario = getters.getUserData

            let formData = new FormData()
            formData.set('idUsuarioDelReporte', usuario.id)
            formData.set('idUsuarioDelComentario', topicReportado.content.idUsuario)
            formData.set('idComentario', topicReportado.content.url)
            formData.set('comentarioReportado', 'Topic: ' + topicReportado.content.titulo + ' Cont: ' + topicReportado.content.contenidoThread)
            formData.set('textoDelReporte', topicReportado.report)
            formData.set('urlComentario', 'N/A')
            formData.set('tipoReporte', 'Topic')

            axios.post(urlBase + "connections/comments/sendReport.php", formData).then(function (response) {
                console.log("Lo que se envia al server: ", response)
            }).catch(function (error) {
                console.log("Ocurrio un error enviando al server: ", error)
            })
        }
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
        getThread (state) {
            return state.threadElegido
        },
        getNuevoPost (state) {
            return state.postProcesado
        }
    }
})