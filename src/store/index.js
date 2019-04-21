import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as firebase from 'firebase'

import Content from './content'
import User from './user'
import Shared from './shared'
import Buscador from './buscador'
import Amigos from './amigos'
import Foro from './foro'
import Tienda from './tienda'
import Carrito from './Carrito'
import Notificaciones from './Notificaciones'
import Suscripciones from './Suscripciones'
import Watchlist from './Watchlist'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        content: Content,
        user: User,
        shared: Shared,
        buscador: Buscador,
        amigos: Amigos,
        foro: Foro,
        tienda: Tienda,
        carrito: Carrito,
        notificaciones: Notificaciones,
        suscripciones: Suscripciones,
        watchlist: Watchlist,
    }
})
