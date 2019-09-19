import axios from 'axios'

export default({
    state: {
        logros: [
            {
                idLogro: '50',
                descripcion: 'H3lltronik',
                progreso: 10,
                repeticiones: 10
            }
        ]
    },
    mutations: {
        setLogros (state, payload) {
            state.logros = payload
        }
    },
    actions: {
        loadLogros({commit}, idUsuario){
            axios.get("http://localhost/Odr/connections/logros.php?idUsuario=" + idUsuario).then(function (response) {
                let data = response.data;
                commit('setLogros', data)
            }).catch(function (error) {
                console.log("Hubo un error en el GET a /logros.php", error)
            });
        }

    },
    getters: {
        getLogros (state) {
            return state.logros
        },
        getComentariosReportados (state) {
            return state.comentariosReportados
        }
    }
})