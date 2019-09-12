<template>
    <div>
        <v-layout row wrap justify-center>
            <v-icon>info</v-icon>
            <v-flex xs12 md6>
                <div v-html="instrucciones[lang]">
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap justify-center>
            <v-btn color="success" @click="loadUserData">{{loadData[lang]}}</v-btn>
        </v-layout>
        <v-layout row wrap justify-center class="mt-3">
            <unity unityLoader="Build/UnityLoader.js" src="Build/Avatar.json" width="1000" height="600" ref="unityAvatar"/>
        </v-layout>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data () {
        return {
            instrucciones: [
                "1.- Click en el boton 'Cargar informacion del usuario' para que el editor de avatar obtenga los datos de su cuenta para guardar la imagen correctamente. <br>2.- Modifique el avatar y el fondo a su gusto.<br>3.- Cuando este listo, haga click en el boton del fondo del editor del avatar<br>4.- Si estas usando Chrome, puede que tome un tiempo en mostrarse el cambio de la imagen",
                "1.- Click the button 'Load user data' to load into the Avatar editor your profile data so it can save the picture correctly. <br>2.- Modify the avatar and background as you like.<br>3.- When you're done, click the button at the bottom of the editor to save the picture.<br>4.- If you are using Chrome, it may get some time to show the current change"
            ],
            loadData: ["Cargar informacion del usuario", "Load user data"],
        }
    },
    methods: {
        loadUserData () {
            let userId = this.$store.getters.getUserData.id
            console.log(userId)
            this.$refs.unityAvatar.message("Screenshot", "setProfileFolder", userId)
        }
    },
    computed: {
        ...mapGetters({
            lang: 'getUserLang',
        }),
    }
}
</script>