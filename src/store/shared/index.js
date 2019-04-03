import axios from 'axios'
import * as firebase from 'firebase'

export default({
    state: {
        urlBase: 'https://localhost/Odr/',
        loading: false
    },
    mutations: {
        setLoading (state, payload) {
            state.loading = payload
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
        }
    }
})
