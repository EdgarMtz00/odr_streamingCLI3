
import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        reportesComentarios: []
    },
    mutations: {
        setReportesComentarios (state, payload) {
            state.reportesComentarios = payload
        }
    },
    actions: {
        loadReportesComentarios ({commit, getters}) {
            let urlBase = getters.urlBase

            axios.post(urlBase + 'connections/comments/getReports.php').then(function (response) {
                console.log("Los reportes de comentarios son: ", response.data)
                let data = response.data
                let reportes = []
                reportes.push({header: 'Reportes'})
                if (Array.isArray(data.reportes)) {
                    data.reportes.forEach(elementReportes => {
                        reportes.push({
                            key: elementReportes.idReporte,
                            idUsuarioDelReporte: elementReportes.idUsuarioDelReporte,
                            idUsuarioDelComentario: elementReportes.idUsuarioDelComentario,
                            idComentario: elementReportes.idComentario,
                            comentarioReportado: elementReportes.comentarioReportado,
                            textoDelReporte: elementReportes.textoDelReporte,
                            urlComentario: elementReportes.urlComentario,
                            //nickname: elementReportes.Nickname,
                            type: elementReportes.tipoReporte
                        })
                    });
                }
                console.log("Lo que se va al commit de reportes: ", reportes)
                commit('setReportesComentarios', reportes)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /comments/getReports", error)
            })
        },
        eliminarReporte ({commit, getters, dispatch}, reporte) {
            let urlBase = getters.urlBase

            let formData = new FormData()
            formData.set('tipoReporte', reporte.type)
            formData.set('idContenido', reporte.idComentario)

            // Informacion para generar la notificacion del usuario acerca de la resolucion
            // De su reporte
            let payloadReporte = {
                idUsuario: reporte.idUsuarioDelReporte,
                resolucion: 'si' // resolucion: 'no' para no se borro, 'si' para si se borro
            }
            dispatch("crearNotificacionUsuario", payloadReporte)

            switch (reporte.type) {
                case 'Post':
                    axios.post(urlBase + 'connections/comments/deletePost.php', formData).then(function (response) {
                        console.log("No hubo problema", response)
                    }).catch(function (error) {
                        console.log("Hubo un error en el POST a /comments/deletePost", error)
                    })
                    break;
                case 'Topic':
                    axios.post(urlBase + 'connections/comments/deleteTopic.php', formData).then(function (response) {
                        console.log("No hubo problema", response)
                    }).catch(function (error) {
                        console.log("Hubo un error en el POST a /comments/deleteTopic", error)
                    })
                    break;
                case 'Imagen':
                    axios.post(urlBase + 'connections/comments/deleteImagen.php', formData).then(function (response) {
                        console.log("No hubo problema", response)
                    }).catch(function (error) {
                        console.log("Hubo un error en el POST a /comments/deleteImagen", error)
                    })
                    break;
                case 'Hub':
                    axios.post(urlBase + 'connections/comments/deleteHub.php', formData).then(function (response) {
                        console.log("No hubo problema", response)
                    }).catch(function (error) {
                        console.log("Hubo un error en el POST a /comments/deleteHub", error)
                    })
                    break;
                case 'Producto':
                    axios.post(urlBase + 'connections/comments/deleteProduct.php', formData).then(function (response) {
                        console.log("No hubo problema", response)
                    }).catch(function (error) {
                        console.log("Hubo un error en el POST a /comments/deleteProduct", error)
                    })
                    break;
            }
        },
        ignorarReporte ({commit, getters, dispatch}, reporte) {
            let urlBase = getters.urlBase

            let formData = new FormData()
            formData.set('tipoReporte', reporte.type)
            formData.set('idContenido', reporte.idComentario)

            axios.post(urlBase + 'connections/comments/deleteReporte.php', formData).then(function (response) {
                console.log("No hubo problema", response)

                // Informacion para generar la notificacion del usuario acerca de la resolucion
                // De su reporte
                let payloadReporte = {
                    idUsuario: reporte.idUsuarioDelReporte,
                    resolucion: 'no' // resolucion: 'no' para no se borro, 'si' para si se borro
                }
                dispatch("crearNotificacionUsuario", payloadReporte)
                
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /comments/deleteReporte", error)
            })
        },
        crearNotificacionReporte ({commit, getters}, tipo) {
            let urlBase = getters.urlBase
            // Obtener a los usuarios moderadores
            axios.post(urlBase + 'connections/userConnections/getModeradores.php').then(function (response) {
                let moderadores = response.data.usuarios
                // Iterar todos los moderadores para enviarles notificacion
                moderadores.forEach(aux => {
                    // Terminar de llenar la notificacion
                    let notificacion = {
                        idUsuario: aux.IdUsuario,
                        timestamp: (new Date().getTime() / 1000),
                        tipoContenido: tipo,
                        tipoNotificacion: 'reporte',
                        visto: false,
                    }

                    firebase.database().ref('notificaciones/').push(notificacion).then(elThen => {
                        firebase.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)            
                    })
                });
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /comments/deletePost", error)
            })
        },
        crearNotificacionUsuario ({commit, getters}, payload) {
            let notificacion = {
                idUsuario: payload.idUsuario,
                timestamp: (new Date().getTime() / 1000),
                tipoNotificacion: 'resolucion',
                resolucion: payload.resolucion,
                visto: false,
            }
            firebase.database().ref('notificaciones/').push(notificacion).then(elThen => {
                firebase.database().ref('notificaciones/' + elThen.key).child('idNotificacion').set(elThen.key)            
            })
        },
        eliminarReporteComentario ({dispatch, commit, getters}, comment) {
            console.log("El comentario ya en la store: ", comment)
            let payload = {
                url: comment.comentario.urlComentario,
                comentario: {
                    key: comment.comentario.idComentario
                }
            }
            console.log("El comentario saliendo de la store: ", payload)
            dispatch('eliminarComentario', payload)
            dispatch('ignorarReporte', comment.comentario)
        }
    },
    getters: {
        getReportesComentarios (state) {
            return state.reportesComentarios
        }
    }
})