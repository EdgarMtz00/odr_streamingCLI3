
import axios from 'axios'
import * as firebase from 'firebase'

export default ({
    state: {
        posts: []
    },
    mutations: {
        setPosts (state, payload) {
            alert("Entre al setter")
            console.log("Imprimiendo payload", payload)
            state.posts = payload
        }
    },
    actions: {
        loadPosts ({commit}){
            let formData = new FormData()
            //commit ("setPosts")
            //formData.set("idUsuario", 1)
            formData.append("idUsuario", "putoelquelolea")
            axios.post("http://localhost/Odr/connections/socialNetwork/getFriends.php", formData).then(function (response) {
                console.log("La prueba es: ", response.data)
                let posts = [
                    {
                        idPost: 1,
                        titulo: "Algo"
                    },
                    {
                        idPost: 2,
                        titulo: "Algo 2"
                    }
                ]
                commit("setPosts", posts)
            }).catch(function (error) {
                console.log("Hubo un error en el test", error)
            })
        }
    },
    getters: {
        getPosts (state) {
            alert("Entre al getter")
            console.log("Imprimiendo payload en getter", state.posts)
            return state.posts
        }
    }
})