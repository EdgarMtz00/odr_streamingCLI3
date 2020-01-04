import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        urlBase: 'https://odrstreaming.000webhostapp.com/Odr/',
        //urlBase: 'http://localhost:80/Odr/',
        loading: false,
        notificationsDrawer: false,
    },
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setNotificationsDrawer(state, payload) {
            state.notificationsDrawer = payload
        },
    },
    actions: {
        reputacion({ commit, getters }, payload) {
            let idUsuario = payload.idUsuario
            let idThumb = payload.id
            if (payload.thumbup) {
                firebase.database().ref("reputacion/" + idUsuario + "/" + idThumb).set(true).then(res => {
                    alert("reputacion guardada")
                })
            } else if (payload.thumbdown) {
                firebase.database().ref("reputacion/" + idUsuario + "/" + idThumb).set(false).then(res => {
                    alert("reputacion guardada")
                })
            }
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        },
        urlBase(state) {
            return state.urlBase
        },
        getNotificationsDrawer(state) {
            return state.notificationsDrawer
        },
    }
})