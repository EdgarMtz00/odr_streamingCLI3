<template>
    <div>
        <v-navigation-drawer v-model="drawer" app fixed temporary class='secondary'>
            <v-list subheader>
                <div v-for="(item, index) in navDrawerItems" :key="index">
                    <v-subheader v-if="item.type === 'header'">
                        {{item.name[prefLanguaje]}}
                    </v-subheader>

                    <v-list-tile avatar @click="gotoToPage(item.url)" v-else-if="item.type === 'tile'">
                    <v-list-tile-avatar>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>{{item.name[prefLanguaje]}}</v-list-tile-title>
                    </v-list-tile-content>
                    </v-list-tile>

                    <v-divider v-if="item.type === 'divider'"></v-divider>
                </div>

            </v-list>
            </v-navigation-drawer>

            <v-toolbar color='primary' fixed app>
            <template slot="extension" v-if="buscar">
                <v-layout row wrap justify-center>
                <buscador></buscador>
                </v-layout>
            </template>
            <v-toolbar-side-icon class='white--text' @click.stop="drawer = !drawer"></v-toolbar-side-icon>
                <v-avatar
                size='40px'>
                <img src='../../../static/unnamed.png' alt='logo'>
                </v-avatar>
                <v-toolbar-title class='text-sm-right white--text font-weight-thin headline' v-if="!xsOnly">
                Mershe!
                </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>

                <buscador v-if="!xsOnly" class="mt-1"></buscador>

                <v-btn flat class="white--text" @click="gotoToPage('profileConfiguration')" v-if="isUserLogged"
                :icon="xsOnly"> 
                <v-layout row wrap fill-height justify-center align-center :class="{'mr-2': 1}">
                    <v-avatar
                    size="40"
                    color="red">
                    <img :src="userData.imagen" alt="alt">
                    </v-avatar>
                </v-layout>
                <div v-if="!xsOnly">{{userData.nickname}}</div>
                </v-btn>

                <carrito-component class="mt-2 ml-3" v-if="isUserLogged"></carrito-component>

                <crear-producto-component class="mt-2" v-if="isUserLogged"></crear-producto-component>

                <v-btn color="primary" v-if="xsOnly" icon fab @click="buscar = !buscar">
                <v-icon v-if="!buscar">search</v-icon>
                <v-icon v-if="buscar">close</v-icon>
                </v-btn>
                
                <v-btn :icon="xsOnly" flat class="white--text" @click="logout" v-if="isUserLogged"> 
                <v-icon>exit_to_app</v-icon><div v-if="!xsOnly">Logout</div>
                </v-btn>

                <v-btn flat class="white--text" @click="gotoToPage('login')" v-if="!isUserLogged">
                Sign in <v-icon>input</v-icon>
                </v-btn>
            </v-toolbar-items>
            
        </v-toolbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drawer: false,
            buscar: false,
            prefLanguaje: 0,
            navDrawerItems: [
                {
                    type: 'header',
                    name: ["Descubrir", "Discover"],
                },
                {
                    type: 'tile',
                    icon: 'airplay',
                    name: ['Todos los medios', 'All stream media'],
                    url: "",
                },
                {type: 'divider',},
                {
                    type: 'header',
                    name: ["Crear", "Create"],
                },
                {
                    type: 'tile',
                    icon: 'create',
                    name: ['Nuevo medio', 'New stream media'],
                    url: "uploadContent",
                },
                {type: 'divider',},
            ]
        }
    },
    methods: {
        gotoToPage (page) {
            this.$nextTick(() => {
                sessionStorage.setItem("bottomNav", page)
                console.log("[App.vue] Push")
                this.$router.push('/')
                this.$router.push('/' + page)
            })
        },
        logout () {
            this.$store.dispatch('logout')
        }
    },
    computed: {
        isUserLogged () {
            let id = this.$store.getters.getUserData.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
        userData () {
            let data = this.$store.getters.getUserConfig
            if (data)
                return data
            else 
                return ""
        },
        xsOnly () {
            return this.$vuetify.breakpoint.xsOnly
        },
    }
}
</script>