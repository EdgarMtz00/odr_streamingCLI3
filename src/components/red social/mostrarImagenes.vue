<template>
    <v-layout row wrap justify-center>
        <v-flex>
            <v-layout justify-center>
                <v-btn @click="goToRoute('New', 'createImage')">Crear Imagen</v-btn>
            </v-layout>
            <v-layout justify-center>
                <v-btn @click="goToRoute('Back', '')"> Return </v-btn>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        goToRoute (type, route) {
            switch (type){
                case 'New': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga + '/' + this.urlHub + '/' + route)
                    })
                    break;
                }
                case 'Back': {
                    this.$nextTick(() => {
                        this.$router.push('/social/' + this.urlSaga)
                    })
                    break;
                }
            }
        }
    },
    computed: {
        
    },
    watch: {

    },
    mounted () {
        this.urlSaga = this.$route.params.urlSaga
        this.urlHub = this.$route.params.urlHub
    }
}
</script>

<style>

</style>