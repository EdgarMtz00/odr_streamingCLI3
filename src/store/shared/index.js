import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        urlBase: 'http://192.168.43.134/Odr/',
        loading: false,
        notificationsDrawer: false,
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
        },
        setNotificationsDrawer (state, payload) {
            state.notificationsDrawer = payload
        }
    },
    actions: {
    },
    getters: {
        getLoading (state) {
            return state.loading
        },
        urlBase (state) {
            return state.urlBase
        },
        getNotificationsDrawer (state) {
            return state.notificationsDrawer
        }
    }
})
