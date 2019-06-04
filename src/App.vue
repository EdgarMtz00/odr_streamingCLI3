<template>
  <v-app class='secondary'>
    <toolbar-component></toolbar-component>

    <v-content>
      <router-view :key="$route.fullPath"></router-view>
    </v-content>
    
    <v-bottom-nav
      fixed :value="true" :active.sync="bottomNav"
      app shift :color="bottomNavColor">
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
          value: 'forums',
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
          color: 'teal',
          url: 'social'
        }
      ]
    }
  },
  name: 'App',
  created () {
    // let auxNav = sessionStorage.getItem("bottomNav")
    // if (auxNav == "login")
    //   auxNav = ""
    // console.log("[App.vue] auxNav", auxNav)
    // if (auxNav) {
    //   this.bottomNav = auxNav
    //   this.gotoToPage (auxNav)
    // } else {
    //   this.gotoToPage ('')
    // }
  },
  methods: {
    setFontLoaded () {
      this.$emit('font-loaded')
    },
    gotoToPage (page) {
      this.$nextTick(() => {
        sessionStorage.setItem("bottomNav", page)
        console.log("[App.vue] Push")
        // this.$router.push('/')
        this.$router.push('/' + page)
      })
    },
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
    bottomNavColor () {
        switch (this.bottomNav) {
          case 'chat': return 'green lighten-1'
          case 'content': return 'light-green lighten-1'
          case 'forums': return 'lime lighten-1'
          case 'shop': return 'cyan lighten-4'
          case 'hub': return 'orange lighten-3'
        }
    },
    
  },
  watch: { 
     '$route.fullPath': {
        handler: function(search) {
           console.log("[App.vue] Watch", search)
           if (search.includes('sagas')) {
             this.bottomNav = 'content'
           } else {
             switch (search) {
              case '/chat': {this.bottomNav = 'chat'; break}
              case '/': {this.bottomNav = 'content'; break}
              case '/forums': {this.bottomNav = 'forums'; break}
              case '/shop': {this.bottomNav = 'shop'; break}
              case '/hub': {this.bottomNav = 'hub'; break}
            }
           }
        },
        deep: true,
        immediate: true
      }
  }

}
</script>
