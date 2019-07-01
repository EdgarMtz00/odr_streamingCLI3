
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
        eliminarReporte ({commit, getters}, reporte) {
            let urlBase = getters.urlBase

            let formData = new FormData()
            formData.set('tipoReporte', reporte.type)
            formData.set('idContenido', reporte.idComentario)

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
            }
        },
    },
    getters: {
        getReportesComentarios (state) {
            return state.reportesComentarios
        }
    }
})