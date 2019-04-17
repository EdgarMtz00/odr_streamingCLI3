<template>
  <v-app style='background-color: #f2d5d0;'>
    <v-navigation-drawer v-model="drawer" app fixed temporary class='clothing'>
      <v-list subheader>
        <v-subheader>Descubrir</v-subheader>

        <v-list-tile avatar @click="gotoToPage('')">
          <v-list-tile-avatar>
            <img src="https://66.media.tumblr.com/3a3c059a676ef5ff516f84f155422429/tumblr_ol4548ZaNP1uylzwto1_250.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Manga</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-subheader>Añadir</v-subheader>

        <v-list-tile avatar @click="gotoToPage('uploadContent')">
          <v-list-tile-avatar>
            <img src="https://66.media.tumblr.com/3a3c059a676ef5ff516f84f155422429/tumblr_ol4548ZaNP1uylzwto1_250.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Manga</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

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
          <img src='../static/logo.svg' alt='logo'>
        </v-avatar>
        <v-toolbar-title class='text-sm-right white--text font-weight-thin headline' v-if="!xsOnly">
          HomuApp!
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

        <carrito-component class="mt-2 ml-3"></carrito-component>

        <crear-producto-component class="mt-2"></crear-producto-component>

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
    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    
    <v-bottom-nav
      fixed
      :value="true"
      :active.sync="bottomNav"
      app shift
      :color="bottomNavColor">
      <div v-for="(aux, index) in bottomBtns" :key="index">
        <v-btn flat dark :value='aux.value' :color="aux.color"
          @click="gotoToPage(aux.url)">
          <span>{{aux.name[preferedLang]}}</span>
          <v-icon>{{aux.icon}}</v-icon>
        </v-btn>
      </div>
    </v-bottom-nav>
  </v-app>
</template>

<script>
export default {
  data () {
    return  {
      drawer: false,
      buscar: false,
      bottomNav: 'content',
      preferedLang: 0,
      bottomBtns: [
        {
          name: ['Chat','Chat'],
          icon: 'message',
          value: 'chat',
          color: 'teal',
          url: 'chat',
        },
        {
          name: ['Contenido','Content'],
          icon: 'theaters',
          value: 'content',
          color: 'teal',
          url: '',
        },
        {
          name: ['Foro','Forum'],
          icon: 'vertical_split',
          value: 'forum',
          color: 'teal',
          url: 'forums'
        },
        {
          name: ['Tienda','Shop'],
          icon: 'shopping_cart',
          value: 'shop',
          color: 'teal',
          url: 'shop'
        },
        {
          name: ['Hub','Hub'],
          icon: 'art_track',
          value: 'hub',
          color: 'teal'
        }
      ]
    }
  },
  name: 'App',
  methods: {
    setFontLoaded () {
      this.$emit('font-loaded')
    },
    gotoToPage (page) {
      this.$nextTick(() => {
        this.$router.replace('/' + page)
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
      console.log("weewewewe", data)
      if (data)
        return data
      else 
        return ""
    },
    xsOnly () {
      return this.$vuetify.breakpoint.xsOnly
    },
    bottomNavColor () {
        switch (this.bottomNav) {
          case 'chat': return 'green lighten-1'
          case 'content': return 'light-green lighten-1'
          case 'forum': return 'lime lighten-1'
          case 'shop': return 'cyan lighten-4'
          case 'hub': return 'orange lighten-3'
        }
      }
  }
}
</script>
