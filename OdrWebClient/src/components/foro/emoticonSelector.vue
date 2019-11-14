<template>
<div>
  <b-button v-b-toggle.collapse-1 variant="primary">Emoticon</b-button>
  <b-collapse id="collapse-1" class="mt-2">
    <b-card>
      <p class="card-text">Emoticones</p>
      <b-button v-b-toggle.collapse-1-inner size="sm"><script>
</b-button>
      <b-collapse id="collapse-1-inner" class="mt-2">
        <b-card>Hello!</b-card>
      </b-collapse>
    </b-card>
  </b-collapse>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    props: {
    },
    data () {
        return {
            showMenu: false,
            productoStatus: ['Añadir a carrito', 'Add to Cart'],
            iconStatus: 'add',
            colorStatus: 'success',
            contanctUser: ['Contactar usuario', 'Contact user'],
            reportBool: false,
            reportButttonTxt: ['Reportar objeto', 'Report object'],
            reportLabelTxt: ['Escribe tu reporte aquí', 'Write your report here'],
            enviarTxt: ['Enviar reporte', 'Send report'],
            userReport: ''
        }
    },
    methods: {
     //todo: poner emote
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
            user: 'getUserData'
        }),
        isUserLogged () {
            let id = this.$store.getters.getUserData.id
            if (id !== '' && id !== undefined) {
                return true
            } else {
                return false
            }
        },
    }
}
</script>