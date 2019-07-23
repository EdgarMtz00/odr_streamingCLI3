// Aqui solo se manejan cosas relacionadas con el login y la configuracion del usuario
import axios from 'axios'
import router from '../../router'
import * as firebase from 'firebase'
import moment from 'moment'

export default({
    state: {
        user: {},
        manualLogin: false,
        reputacion: 0,
        reputacionForo: {},
    },
    mutations: {
        setUserData (state, payload) {
            state.user.id = payload.id
            state.user.email = payload.email
        },
        setUserConfig (state, payload) {
            state.user.cuenta = payload.cuenta
            state.user.configuration.nombre = payload.NombreUsuario
            state.user.configuration.nickname = payload.Nickname
            state.user.configuration.descripcion = payload.Descripcion
            state.user.configuration.sexo = payload.Sexo
            state.user.configuration.ubicacion = payload.Ubicacion
            state.user.configuration.imagen = payload.Imagen
            state.user.configuration.edad = payload.Edad
            state.user.configuration.notificaciones = (payload.NotificacionCorreo == 0)? false:true;
            state.user.configuration.idioma = payload.IdiomaPreferido
            state.user.configuration.configInicial = payload.ConfiguracionInicial
        },
        clearCurrUser (state) {
            // Reiniciar el objeto
            state.user = {
                id: '',
                email: '',
                configuration: {
                    nombre: '',
                    nickname: '',
                    descripcion: '',
                    sexo: '',
                    ubicacion: '',
                    imagen: 'https://homuapp.000webhostapp.com/Imagenes/4-1-2019-22-24-45.jpg',
                    edad: '',
                    notificaciones: false,
                    idioma: '0',
                    configInicial: false,
                }
            }

        },
        setManualLogin (state, payload) {
          state.manualLogin = payload
        },
        setReputacion (state, payload) {
            state.reputacion = payload
        },
        setReputacionForo (state, payload) {
            state.reputacionForo = payload
        }
    },
    actions: {
        googleSignIn ({commit, getters}) {
            commit ('setManualLogin', true)
            commit ('setLoading', true)

            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({
                prompt: 'select_account'
            });
            let bodyFormData = new FormData ()

            firebase.auth().signInWithPopup(provider).then(response => {
                console.log("user email", response.user.email)
                console.log("user id", response.user.uid)
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = response.user.uid
                user.email = response.user.email

                commit('setUserData', user)
                // Crear el nodo en firebase para manejar los estados, por si no existia ya, en cada login lo checa
                firebase.database().ref('estados/').push({
                    estado: 'Online',
                    idUsuario: user.id,
                }).then(snapshot => {
                    alert("Estado!")
                })

            }).catch(error => {
                console.log(error)
                commit ('setLoading', false)
            })
        },
        facebookSignIn ({commit, getters, state}) {
          commit ('setManualLogin', true)
            let provider = new firebase.auth.FacebookAuthProvider()
            provider.setCustomParameters({
                'display': 'popup'
            });

            firebase.auth().signInWithPopup(provider).then(response => {
                console.log("Facebook login")
                console.log("user email", response.user.email)
                console.log("user id", response.user.uid)
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = response.user.uid
                user.email = response.user.email

                commit('setUserData', user)
                // Crear el nodo en firebase para manejar los estados, por si no existia ya, en cada login lo checa
                firebase.database().ref('estados/').push({
                    estado: 'Online',
                    idUsuario: user.id,
                }).then(snapshot => {
                    alert("Estado!")
                })

                // Aqui estaba el query a saveUser.php pero por el estado del auth firebase lo puse en donde
                // este cambia
            }).catch(error => {

            })
        },
        autoSignIn ({commit, dispatch, state, getters}, payload) {
            let urlBase = getters.urlBase
            if (payload) {
                let bodyFormData = new FormData ()
                commit ('clearCurrUser')
                //Asignar a user sus variables
                let user = {
                    id: '',
                    email:''
                }
                user.id = payload.uid
                user.email = payload.email
                commit('setUserData', user)

                let hora = moment().format('YYYY-MM-DD')
                bodyFormData.set('hora', hora)

                bodyFormData.set('userId', user.id)
                bodyFormData.set('userEmail', user.email)

                // Como siempre al iniciar sesion manualmente o al cerrar y abrir la pestaña cambia el estado
                // del auth firebase pues llamo aca al metodo de save
                axios.post(urlBase + "connections/userConnections/saveUser.php", bodyFormData).then(response => {
                    dispatch('fetchUserConfiguration')
                    commit ('setLoading', false)
                }).catch(error => {
                    console.log(error)
                    dispatch('fetchUserConfiguration')
                    router.push('/')
                    commit ('setLoading', false)
                })
                console.log("STATE",state.user)
            }
        },
        // Llena el objeto configuration de user
        fetchUserConfiguration ({getters, commit, dispatch}) {
            console.log("SI PUSE USER, MIERDA")
            
            let bodyFormData = new FormData ()
            let urlBase = getters.urlBase
            let estados = getters.getEstados

            let user = getters.getUserData
            bodyFormData.set('userId', user.id)
            axios.post(urlBase + "connections/userConnections/getUserConfig.php", bodyFormData).then(response => {
                let data = response.data
                data.Imagen = urlBase + 'Profiles/' + user.id + "/profile.jpg"
                commit('setUserConfig', data)
                console.log("DATA USER", data)
                dispatch('loadHoldersSubs')
                if (data.response == "error" || data.ConfiguracionInicial == '0') {
                    router.push("/profileConfiguration")
                } else if (data.response != "error" && data.ConfiguracionInicial != '0' && getters.getManualLogin){
                    router.push("/")
                }
                commit ('setManualLogin', false)
            }).catch(error => {
                alert('Nel no sirve')
                console.log("Error", error)
            })
        },
        saveUserConfiguration ({commit, getters}) {
            let urlBase = getters.urlBase
            let bodyFormData = new FormData ()
            commit ('setLoading', true)

            let user = {...getters.getUserData}
            let image = user.configuration.imagen
            user.configuration.id = user.id
            user.configuration.configInicial = 1

            user.configuration.base64 = image.substr(image.indexOf(',') + 1)

            console.log('user', user)
            // Moficacion del 28/06/19 ya no solo se gurada la opcion de notificaciones por correo e idioma en la base SQL sino tambien
            // En Firebase porque para hacer peticiones externas desde cloud functions para traer la info de los usuarios (entre ellas
            // El idioma y las notificaciones de correo) se tenia que pagar y ps nomms xd nel
            let configCorreo = {
                activado: user.configuration.notificaciones,
                correo: user.email,
                idioma: (user.configuration.idioma == 0)? 'español':'ingles',
            }

            bodyFormData.set('configuration', JSON.stringify(user.configuration))

            axios.post(urlBase + "connections/userConnections/saveConfiguration.php", bodyFormData).then(response => {
                firebase.database().ref('correo/' + user.id).set(configCorreo).then(response => {
                    alert("Actualizado correctamente")
                })
                commit ('setLoading', false)
            }).catch(error => {
                commit ('setLoading', false)
                console.log(error)
            })
        },
        logout ({commit}) {
            commit ('setLoading', true)
            console.log('logout')
            firebase.auth().signOut().then(response => {
                router.push('/')
                router.push('login')
                commit ('clearCurrUser')
                // Quitar la informacion de sus sucripciones
                commit ('clearSubsData')
                commit ('setLoading', false)
            })
        },
        cambiarTipoDeCuenta ({commit, getters}, payload) {
            let urlBase = getters.urlBase
            let bodyFormData = new FormData ()
            let tipo = 0

            if (payload.cuenta == "Dios") {
                return // NO PUEDE HABER MAS DIOSES
            } else if (payload.cuenta == "CDC") {
                tipo = 2
            } else if (payload.cuenta == "Moderador") {
                tipo = 3
            } else if (payload.cuenta == "Consumidor") {
                tipo = 4
            } 

            console.log("datos: ", payload.idUsuario, tipo)

            bodyFormData.set('idUsuario', payload.idUsuario)
            bodyFormData.set('tipo', tipo)
            axios.post(urlBase + "connections/userConnections/cambiarTipoDeCuenta.php", bodyFormData).then(response => {
                let data = response.data
                if (data.status.includes('OK')) {
                    //alert("Actualizado correctamente")
                } else {
                    //alert("Error al actualizar")
                }
            }).catch(error => {
                console.log(error)
            })
        },
        loadReputacion ({commit}, idProfile) {
            firebase.database().ref('reputacionVentas/').orderByChild("idUsuario").equalTo(idProfile).on('value', snapshot => {
                console.log("reputacion", snapshot.val())
                if (snapshot.val()) {
                    // Misma rutina de siempre para guardar los resultados del snapshot
                    let returnArr = [];
                    snapshot.forEach(childSnapshot => {
                        let item = childSnapshot.val();
                        item.key = childSnapshot.key;
                        returnArr.push(item);
                    });
                    let payload = {
                        thumbsup: returnArr[0].thumbsup,
                        thumbsdown: returnArr[0].thumbsdown
                    }
                    console.log("reputacion payload", payload)
                    commit('setReputacion', payload)
                } else {
                    commit('setReputacion', {thumbsup: 1, thumbsdown: 0})
                }
                
            })
        },
        registrarReputacion ({commit, getters}, payload) {
            let urlBase = getters.urlBase
            firebase.database().ref('reputacionVentas/').orderByChild("idUsuario").equalTo(payload.idUsuario).once('value', snapshot => {
                let val = null
                let returnArr = [];
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    returnArr.push(item);
                });
                val = returnArr[0]

                console.log("reputacion up", val)
                // Si no tiene hecho su nodo de reputacion se crea
                if (!val) {
                    if (payload.reputacion == 'good') {
                        firebase.database().ref('reputacionVentas/').push({idUsuario: payload.idUsuario, thumbsup: 1, thumbsdown: 0}).then(res => {
                            alert("Reputacion creada")
                        })
                    } else if (payload.reputacion == 'bad') {
                        firebase.database().ref('reputacionVentas/').push({idUsuario: payload.idUsuario, thumbsup: 0, thumbsdown: 1}).then(res => {
                            alert("Reputacion creada")
                        })
                    }
                } else {
                    if (payload.reputacion == 'good') {
                        val.thumbsup += 1;
                        console.log("reputacion", snapshot.ref)
                        firebase.database().ref(snapshot.ref).child(val.key).set(val).then(res => {
                            alert('registrado')
                        })
                    } else if (payload.reputacion == 'bad') {
                        val.thumbsdown += 1;
                        console.log("reputacion", snapshot.ref)
                        firebase.database().ref(snapshot.ref).child(val.key).set(val).then(res => {})
                    }
                }

                if (payload.tipo == 'comprador') {
                    // Despues de haber registrado su calificacion es necesario borrarlo del nodo de tiendaCompradores para que no pueda volver
                    // A entrar a la pagina de calificar al vendedor por su producto de nuevo y como el producto ya ha sido borrado pues no podra votar dos veces
                    // Solo obtenemos la refencia 
                    firebase.database().ref('tiendaCompradores/').orderByChild("idProducto").equalTo(payload.idProducto).once('value', snapshot => {
                        snapshot.ref.remove().then(res => {
                            //Volver a la pagina principal
                            router.push('/shop')
                        })
                    })
                } else if (payload.tipo == 'vendedor') {
                    let formData = new FormData ()
                    formData.set('idProducto', payload.idProducto)
                    // En caso de que sea el vendedor quien esta calificando al comprador entonces se debe borrar el producto porque ya ha sido vendido
                    axios.post(urlBase + 'connections/productos/productoVendido.php', formData).then(response => {
                        let data = response.data
                        alert(JSON.stringify(data))
                        if (data.status.includes('OK')) {
                            router.push('/shop')
                        } else {
                            alert('ERROR AL BORRAR PRODUCTO!')
                        }
                    }).catch(error => {
                        alert('ERROR AL BORRAR PRODUCTO!-> ' + error)
                    })
                }
            })
        },
        loadReputacionForo ({commit, getters}, idProfile) {
            let reputacion = { // Inicializacion
                thumbsup: 0,
                thumbsdown: 0,
            }
            firebase.database().ref("reputacion/" + idProfile).on("value", snapshot => {
                console.log('aca, ira nomas', "reputacion/" + idProfile)
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val();
                    if (item) {
                        reputacion.thumbsup++
                    } else {
                        reputacion.thumbsdown++
                    }
                });
            })
            commit ("setReputacionForo", reputacion)
        }
    },
    getters: {
        getUrlBase (state) {
            return state.urlBase
        },
        getUserData (state) {
            return state.user
        },
        getUserConfig (state) {
            return state.user.configuration
        },
        getManualLogin (state){
          return state.manualLogin
        },
        getUserData (state) {
            return state.user
        },
        getUserLang (state) {
            if (state.user.configuration)
                return Number(state.user.configuration.idioma)
            else
                return 0
        },
        getReputacion (state) {
            return state.reputacion
        },
        getReputacionForo (state) {
            let reput = state.reputacionForo
            return ( (reput.thumbsup) / (reput.thumbsup + reput.thumbsdown) )
        }
    }
})
