// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { store } from './store'
import * as firebase from 'firebase'
import moment from 'moment'
import Unity from 'vue-unity-webgl'

import 'vuetify/dist/vuetify.min.css'
import { mapGetters } from 'vuex'

//Importar componentes
import contentTabItem from './components/contentTabItem.vue'
import CreateHolderDialog from './components/dialogs/createHolder.vue'
import CreateSagaDialog from './components/dialogs/createSaga.vue'
import CreateCharacterDialog from './components/dialogs/createCharacter.vue'
import ImagesInformation from './components/uploadContent/components/imagesInfo.vue'
import ImagesSelector from './components/uploadContent/components/imagesSelector.vue'
import SelectImage from './components/common/selectImage.vue'
import VideoUploader from './components/uploadContent/components/videoUploader.vue'
import AudioUploader from './components/uploadContent/components/audioUploader.vue'
import CommentsBox from './components/comentarios/comments.vue'
import Buscador from './components/common/buscador.vue'
import RowContent from './components/streaming main page/rowContent.vue'
import Toolbar from './components/common/toolbar.vue'
import TabsPerfil from './components/profile/tabsPerfil.vue'
import Comment from './components/comentarios/comentario.vue'

import Producto from "./components/tienda/producto.vue";
import MainCarrito from "./components/tienda/carrito/mainCarrito.vue";
import CrearProducto from "./components/tienda/crearProducto.vue";
import EditarProducto from './components/tienda/editarProducto.vue'
import ContactarUsuario from './components/tienda/contactarUsuario.vue'
import ShopImagesSelector from './components/tienda/imagesSelector.vue'

//Implementar componentes
Vue.component('content-tab-item', contentTabItem)
Vue.component('create-holder-dialog', CreateHolderDialog)
Vue.component('create-saga-dialog', CreateSagaDialog)
Vue.component('create-character-dialog', CreateCharacterDialog)
Vue.component('select-image', SelectImage)
Vue.component('images-selector-carousel', ImagesSelector)
Vue.component('images-information', ImagesInformation)
Vue.component('video-uploader', VideoUploader)
Vue.component('audio-uploader', AudioUploader)
Vue.component('comments', CommentsBox)
Vue.component('buscador', Buscador)
Vue.component('row-content', RowContent)
Vue.component('unity', Unity)
Vue.component('toolbar-component', Toolbar)
Vue.component('tabs-perfil-component', TabsPerfil)
Vue.component('comentario-component', Comment)

Vue.component("producto-component", Producto);
Vue.component("carrito-component", MainCarrito);
Vue.component("crear-producto-component", CrearProducto);
Vue.component('editar-producto-component', EditarProducto)
Vue.component('contactar-usuario-component', ContactarUsuario)
Vue.component('shop-images-selector-carousel', ShopImagesSelector)

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.prototype.moment = moment

Vue.use(Vuetify, { theme: {
  primary: '#9D7E69',
  secondary: '#D5C0AF',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
  skin: '#f2d5c0',
  gem: '#482648',
  darkergem: '#9D7E69',
  clothing: '#D5C0AF',
  blush: '#9D7E69'
}})

firebase.initializeApp({
  apiKey: "AIzaSyCt8KOVPcyBES6-vVSBIZQgedl7fBPfR_w",
  authDomain: "odr-streaming.firebaseapp.com",
  databaseURL: "https://odr-streaming.firebaseio.com",
  projectId: "odr-streaming",
  storageBucket: "odr-streaming.appspot.com",
  messagingSenderId: "50680997374"
});

firebase.auth().onAuthStateChanged(user => {
  /* eslint-disable no-new */
  if (user){
    console.log("el user we")
    store.dispatch('autoSignIn', user)
  } else {
    console.log("No u,u")
    store.dispatch('autoSignIn', null)
  }
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
    created () {
      // store.dispatch('loadAmigos', this.user.id)
    },
    mounted () {
      // Solicitar permiso para notificaciones
      Notification.requestPermission(function(status) {
          console.log('Notification permission status:', status);
      });
      // Registrar el SW
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(res => {
          console.log("JAJAJA")
        }).catch(error => {
          console.log("No sirve")
        })
      } else {
        alert ('NO')
      }

      // fetch('https://jsonplaceholder.typicode.com/todos/')
      // .then(response => console.log('api response', response))
      // .then(data => {
      //     let people = data;
          
      // })

      // fetch('http://localhost/Odr/connections/streamingContent/getSagaContent.php')
      // .then(response => response.json())
      // .then(data => {
      //     let people = data;
      //     console.log("[FETCH] Data", data)
      // })

      // axios.post('http://localhost/Odr/connections/productos/getAllProductos.php').then(res => {
      //   console.log("[AXIOS] Data", res)
      // })
      
    },
    computed: {
      ...mapGetters({
            estados: 'getEstados',
            user: 'getUserData',
        }),
    },
    watch: {
      // Watch a estados cargados, que contiene el estado del usuario
      estados: {
        handler: function (val, oldVal) {
          if (val.length > 0 && this.user.id) {
            // Cuando carguen se obtiene la referencia dle estado del usuario
            let auxFind = val.find(iterator => {
                return this.user.id == iterator.idUsuario
            })
            console.log("debug auxfind", auxFind)
            if(auxFind.estado.includes("Reproduciendo medios")) {
              return
            }
            let payload = {
                key: auxFind.key, // key del firebase
                newEstado: 'Online' // Se pone como online
            }
            store.dispatch('actualizarEstado', payload)
          }
        },
        deep: true
      },
      user: {
        handler: function (val, oldVal) {
          if (val.id) {
            store.dispatch('loadAmigos', val.id)
          }
        },
        deep: true
      },
      '$route.path': {
        handler: function (val, oldVal) {
          // Cuando carguen se obtiene la referencia dle estado del usuario
          let auxFind = this.estados.find(iterator => {
              return this.user.id == iterator.idUsuario
          })

          // Si entra a reproducir un medio...
          if (val.includes("/sagas/")) {
            let payload = {
                key: auxFind.key, // key del firebase
                newEstado: 'Reproduciendo medios' // Se pone como online
            }
            store.dispatch('actualizarEstado', payload)
            alert("Acualizado el estado de medios")
          } else if (oldVal.includes("/sagas/") && !val.includes("/sagas/")) {
            let payload = {
                key: auxFind.key, // key del firebase
                newEstado: 'Online' // Se pone como online
            }
            store.dispatch('actualizarEstado', payload)
            alert("Acualizado el estado a online")
          }
          // SI salio de reproducir un mdio
        }
      }
    },
  })
});

// const messaging = firebase.messaging(); npm run serve -s dist

// messaging.usePublicVapidKey('BMapW914m-WtfzTIMoe7h7qU8F9CRILOcV1dooCBQa4ldPzGRemC4a5Bmpoi8-vgI_Jm6SlOX1upo8M9OU48YN8');

// messaging.requestPermission().then(function () {
//   console.log('Permiso de notificaciones concedido');

//   messaging.getToken().then(function (currentToken) {
//     console.log(currentToken);
//   }).catch(function (error) {
//     console.log('Ocurrio un error con el token', error);
//   });
// }).catch(function (error) {
//   console.log('No se concedio permiso para recibir notificaciones', error);
// });
