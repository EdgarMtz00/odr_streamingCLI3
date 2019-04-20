<template>
  <v-container grid-list-xs v-resize="onResize">
    <v-layout row wrap justify-center>
      <v-flex xs12 md12>
        <v-layout column>
          <v-btn color="success" @click="displayNotification">Prueba notificacion</v-btn>
          <!-- Linea de sagas -->
          <!--------------------------------------------------------  -------------------------->
          <v-flex xs12>
            <div class="title black--text font-weight-light my-2">Sagas</div>
            <v-layout row text-xs-center :justify-center="0"
              class="verticalSlider" v-if="sagasLength >= 0">
              <v-img :height="sagaItemHeight" :width="sagaItemWidth" max-width="300"
              v-for="aux in sagaItems" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (sagas[aux-1].URLSaga)"
              :src="sagas[aux-1].ThumbnailSaga">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{sagas[aux-1].TituloSaga}}
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-layout>
            <v-divider class="my-2 "></v-divider>
          </v-flex>
          <!-- Linea de Manga -->
          <!--------------------------------------------------------  -------------------------->
          <v-flex xs12 v-if="manga.length > 0">
            <div class="title black--text font-weight-light my-2">Manga</div>
            <v-layout row text-xs-center :justify-center="0"
              class="verticalSlider" v-if="manga.length >= 0">
              <v-img :height="sagaItemHeight" :width="sagaItemWidth" max-width="300"
              v-for="aux in (manga.length < 6)? manga.length : 6" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (manga[aux-1].url)"
              :src="manga[aux-1].thumbnail">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{manga[aux-1].titulo}}
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-layout>
            <v-divider class="my-2 "></v-divider>
          </v-flex>
          <!-- Linea de Anime -->
          <!--------------------------------------------------------  -------------------------->
          <v-flex xs12 v-if="anime.length > 0">
            <div class="title black--text font-weight-light my-2" >Anime</div>
            <v-layout row text-xs-center :justify-center="0"
              class="verticalSlider" v-if="anime.length >= 0">
              <v-img :height="sagaItemHeight" :width="sagaItemWidth" max-width="300"
              v-for="aux in (anime.length < 6)? anime.length : 6" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (anime[aux-1].url)"
              :src="anime[aux-1].thumbnail">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{anime[aux-1].titulo}}
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-layout>
            <v-divider class="my-2 "></v-divider>
          </v-flex>
          <!--  -->
          <!-- Linea de Comics -->
          <!--------------------------------------------------------  -------------------------->
          <v-flex xs12 v-if="comic.length > 0">
            <div class="title black--text font-weight-light my-2" >Comic</div>
            <v-layout row text-xs-center :justify-center="0"
              class="verticalSlider" v-if="comic.length >= 0">
              <v-img :height="sagaItemHeight" :width="sagaItemWidth" max-width="300"
              v-for="aux in (comic.length < 6)? comic.length : 6" :key="aux" class="mr-3 boxContent"
              @click="goToSaga (comic[aux-1].url)"
              :src="comic[aux-1].thumbnail">
                <v-layout row wrap fill-height align-end>
                  <div style="background-color: rgba(0, 0, 0, 0.5); width: 100%;">
                    <div class="title white--text font-weight-bold ml-2">
                      {{comic[aux-1].titulo}}
                    </div>
                  </div>
                </v-layout>
              </v-img>
            </v-layout>
            <v-divider class="my-2 "></v-divider>
          </v-flex>
          <!--  -->
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      xsOnly: this.$vuetify.breakpoint.xsOnly,
      // Elementos del scroll horizontal donde se muestran las sagas
      sagaItemWidth: 200,
      sagaItemHeight: 160,
      sagaItems: 6,
      windowSize: {
        x: 0,
        y: 0
      },
    }
  },
  created () {
    if (this.sagasLength === 0) {
      this.$store.dispatch('loadSagasInfo')
    }
    this.$store.dispatch('loadBuscadorData')
  },
  methods: {
    goToSaga (URLSaga) {
      if (URLSaga !== '' && URLSaga !== undefined)
        this.$router.push("sagas/" + URLSaga)
    },
    //Para obtener las medidas de la ventana
    onResize () {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    displayNotification() {
      if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
          var options = {
            body: 'Here is a notification body!',
            icon: 'images/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
              dateOfArrival: Date.now(),
              primaryKey: 1,
              url: 'equisde.com'
            },
            actions: [
              {action: 'explore', title: 'Explore this new world'},
              {action: 'close', title: 'Close notification'},
            ]
          };
          reg.showNotification('Hello world!', options);
        });
      }
    }
    },
  computed: {
    sagasLength () {
      return this.$store.getters.getSagas.length
    },
    sagas () {
      let aux = []
      let urlBase = this.$store.getters.urlBase
      
      for (let i = 0; i < this.sagaItems; i++){
        aux.push({
          tituloSaga: "",
          idSaga: "",
          thumbnailSaga: "",
          backgroundSaga: ""
        })
      }
      let loadedArray = this.$store.getters.getSagas
      if (this.sagasLength > 0){
        for (let i = 0; i < this.sagasLength; i++){
          aux[i] = {...loadedArray[i]}
          aux[i].BackgroundSaga = urlBase + 'resources/' + aux[i].BackgroundSaga
          aux[i].ThumbnailSaga = urlBase + 'resources/' + aux[i].ThumbnailSaga
        }
        return aux
      }else{
        return aux
      }
    },
    holders () {
      let aux = this.$store.getters.getBuscadorHolders
      let holders = []
      aux.forEach(element => {
        if (element.type) {
          holders.push(element)
        }
      });
      return holders
    },
    anime () {
      let anime = []
      this.holders.forEach(element => {
        if (element.type == 'Anime') {
          anime.push(element)
        }
      });
      return anime
    },
    manga () {
      let manga = []
      this.holders.forEach(element => {
        if (element.type == 'Manga') {
          manga.push(element)
        }
      });
      return manga
    },
    comic () {
      let comic = []
      this.holders.forEach(element => {
        if (element.type == 'Comic') {
          comic.push(element)
        }
      });
      return comic
    },
    // Si el tamaño de la ventana es menor al del total del tamaño de todas las sagas
    sagasJustifyCenter () {
      // el tamaño del horizontal slide es de flex10 asi que al tamaño del windows.x se le resta
      // flex2
      let flex1 = (this.windowSize.x / 12)
      let sagaSlide = (this.windowSize.x - (flex1*2))
      if (sagaSlide < (this.sagaItems * this.sagaItemWidth)) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {

  }
}
</script>

<style>
  .boxContent {
    border-radius: 5px;
    cursor: pointer;
  }

  .verticalSlider {
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>
