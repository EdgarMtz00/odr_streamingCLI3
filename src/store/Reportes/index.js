
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
                            type: 'Reporte'
                        })
                    });
                }
                console.log("Lo que se va al commit de reportes: ", reportes)
                commit('setReportesComentarios', reportes)
            }).catch(function (error) {
                console.log("Hubo un error en el POST a /comments/getReports", error)
            })
        }
    },
    getters: {
        getReportesComentarios (state) {
            return state.reportesComentarios
        }
    }
})